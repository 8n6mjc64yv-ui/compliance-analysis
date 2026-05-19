
import os
from flask import Blueprint, render_template, request, make_response
from werkzeug.utils import secure_filename
from app.text_processor import process_file
from app.rule_engine import assess_compliance
from app.scoring import calculate_score
from app.report_generator import generate_report

main_bp = Blueprint('main', __name__)

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'csv'}
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'data', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@main_bp.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@main_bp.route('/analyze', methods=['POST'])
def analyze():
    if 'file' not in request.files:
        return render_template('index.html', error="No file part")
    
    file = request.files['file']
    if file.filename == '':
        return render_template('index.html', error="No selected file")
        
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        
        try:
            # 1. Processing
            sentences, cleaned_text = process_file(filepath)
            
            # 2. Rule Engine
            results = assess_compliance(sentences, cleaned_text)
            
            # 3. Scoring
            score, risk_level = calculate_score(results)
            
            # 4. Report Generation
            report_html = generate_report(results, score, risk_level, filename)
            
            # Cleanup (optional, keeping for now)
            # os.remove(filepath) 
            
            return report_html
            
        except Exception as e:
             return render_template('index.html', error=f"Error analyzing file: {str(e)}")
            
    return render_template('index.html', error="Invalid file type")

@main_bp.route('/download/<filename>', methods=['GET'])
def download_report(filename):
    # This is a placeholder as the report is dynamic. 
    # In a real app we might cache the last report.
    # For now, we rely on the user saving the page or we could re-run analysis if stateless.
    return "To download, please use the 'Print' feature of your browser and save as PDF."
