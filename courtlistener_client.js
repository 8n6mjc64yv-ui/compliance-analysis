/**
 * CourtListener API Client — lightweight wrapper for legal research integration.
 *
 * Calls the CourtListener REST API v4 (public) to fetch opinions, courts,
 * and case law data relevant to privacy/data-protection compliance analysis.
 *
 * API docs: https://www.courtlistener.com/api/rest-info/v4/
 * Based on: https://github.com/blakeox/courtlistener-mcp
 */

const BASE_URL = 'https://www.courtlistener.com/api/rest/v4';

// Simple in-memory cache to avoid redundant API calls
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached(key) {
    const entry = cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.ts > CACHE_TTL) { cache.delete(key); return null; }
    return entry.data;
}

function setCache(key, data) {
    cache.set(key, { data, ts: Date.now() });
    if (cache.size > 200) {
        const oldest = [...cache.entries()].sort((a, b) => a[1].ts - b[1].ts)[0];
        if (oldest) cache.delete(oldest[0]);
    }
}

async function fetchJSON(url) {
    const res = await fetch(url, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(15000)
    });
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`CourtListener API error ${res.status}: ${text.substring(0, 200)}`);
    }
    return res.json();
}

async function apiCall(endpoint, params = {}) {
    const query = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== null && v !== '') query.append(k, String(v));
    }
    const url = `${BASE_URL}${endpoint}?${query.toString()}`;
    const cached = getCached(url);
    if (cached) return cached;

    const data = await fetchJSON(url);
    setCache(url, data);
    return data;
}

// ============================================================
// Public API
// ============================================================

/**
 * Search CourtListener for opinions matching a query.
 * Returns opinion clusters with metadata.
 */
async function searchOpinions(query, options = {}) {
    const params = {
        q: query,
        ...(options.page && { page: options.page }),
        ...(options.type && { type: options.type }),
        ...(options.order_by && { order_by: options.order_by }),
    };
    return apiCall('/search/', params);
}

/**
 * Search for privacy/data-protection related case law based on law name and jurisdiction.
 */
async function searchPrivacyCaseLaw(lawName, jurisdiction = '') {
    const q = [lawName, 'privacy', 'data protection', jurisdiction].filter(Boolean).join(' ');
    return searchOpinions(q, { order_by: 'dateFiled desc' });
}

/**
 * Look up specific courts by jurisdiction.
 */
async function getCourts(jurisdiction = '') {
    const params = {};
    if (jurisdiction) params.jurisdiction = jurisdiction;
    return apiCall('/courts/', params);
}

/**
 * Get detail for a specific opinion by ID.
 */
async function getOpinion(id) {
    return apiCall(`/opinions/${id}/`);
}

/**
 * Get detail for a specific docket by ID.
 */
async function getDocket(id) {
    return apiCall(`/dockets/${id}/`);
}

/**
 * Enriched legal research: search opinions related to a specific law
 * and return a structured summary suitable for Phase 1 display.
 */
async function legalResearch(lawName, lawAbbr, jurisdiction) {
    const searches = [
        searchPrivacyCaseLaw(lawName, jurisdiction),
        searchPrivacyCaseLaw(lawAbbr, 'compliance violation'),
    ];

    const [caseResults, violationResults] = await Promise.all(searches);

    // Merge and deduplicate by opinion id
    const seen = new Set();
    const allResults = [];
    for (const res of [caseResults, violationResults]) {
        if (!res || !res.results) continue;
        for (const item of res.results) {
            const id = item.id || item.cluster_id;
            if (id && !seen.has(id)) {
                seen.add(id);
                allResults.push(item);
            }
        }
    }

    // Extract key metadata
    const opinions = allResults.slice(0, 10).map(item => ({
        id: item.id || item.cluster_id,
        caseName: item.caseName || item.case_name || 'Unnamed',
        court: item.court || '',
        dateFiled: item.dateFiled || item.date_filed || '',
        snippet: (item.snippet || item.text || '').substring(0, 300),
        status: item.status || '',
        citation: item.citation || '',
        absoluteUrl: item.absolute_url || `https://www.courtlistener.com${item.docket_absolute_url || ''}`,
    }));

    // Count by court
    const courtCounts = {};
    opinions.forEach(o => {
        const court = o.court || 'Unknown';
        courtCounts[court] = (courtCounts[court] || 0) + 1;
    });

    return {
        success: true,
        query: { lawName, lawAbbr, jurisdiction },
        totalFound: allResults.length > 0 ? (caseResults?.count || 0) + (violationResults?.count || 0) : 0,
        opinions,
        courtBreakdown: Object.entries(courtCounts).map(([court, count]) => ({ court, count })),
        source: 'CourtListener API v4 (courtlistener.com)',
    };
}

module.exports = {
    searchOpinions,
    searchPrivacyCaseLaw,
    getCourts,
    getOpinion,
    getDocket,
    legalResearch,
};
