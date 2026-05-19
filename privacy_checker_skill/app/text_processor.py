
import re
import pdfplumber
import nltk

# Ensure punkt is downloaded (handled in Dockerfile, but good for local)
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt', quiet=True)

def extract_text_from_pdf(filepath):
    """Extract text from a PDF file."""
    text = ""
    try:
        with pdfplumber.open(filepath) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return ""
    return text

def clean_text(text):
    """Clean the extracted text."""
    # Remove excessive whitespace
    text = re.sub(r'\s+', ' ', text)
    # Remove non-printable characters
    text = "".join([char for char in text if char.isprintable()])
    return text.strip()

def get_sentences(text):
    """Segment text into sentences."""
    if not text:
        return []
    return nltk.sent_tokenize(text)

def process_file(filepath):
    """Main entry point to process a file and return sentences."""
    if filepath.lower().endswith('.pdf'):
        raw_text = extract_text_from_pdf(filepath)
    else:
        # Assume text file
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                raw_text = f.read()
        except UnicodeDecodeError:
             # Try fallback encoding
            with open(filepath, 'r', encoding='latin-1') as f:
                raw_text = f.read()
            
    cleaned_text = clean_text(raw_text)
    sentences = get_sentences(cleaned_text)
    return sentences, cleaned_text
