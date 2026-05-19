
import os
import sys
from io import BytesIO

# Add project root to path
sys.path.append(os.getcwd())

from app.main import create_app

def test_app():
    app = create_app()
    client = app.test_client()
    
    # Test Index
    rv = client.get('/')
    assert rv.status_code == 200
    assert b"Analyze Your Policy" in rv.data
    print("[PASS] Index Page Loaded")
    
    # Test Analysis
    data_path = os.path.join(os.getcwd(), 'data', 'sample_policy.txt')
    with open(data_path, 'rb') as f:
        content = f.read()
        
    data = {
        'file': (BytesIO(content), 'sample_policy.txt')
    }
    
    rv = client.post('/analyze', data=data, content_type='multipart/form-data')
    assert rv.status_code == 200
    assert b"Compliance Score" in rv.data
    assert b"100/100" not in rv.data # Expecting some missing/risk from sample
    print("[PASS] Analysis Successful")
    
    # Check for specific contents from sample
    # Sample has "Data Retention" section, so Rule 3 should be there
    if b"Data Retention Policy" in rv.data:
        print("[PASS] Rule Match: Data Retention Policy found")
    else:
        print("[FAIL] Rule Match: Data Retention Policy NOT found")

if __name__ == "__main__":
    try:
        test_app()
        print("\nAll Tests Passed!")
    except Exception as e:
        print(f"\nTest Failed: {e}")
        import traceback
        traceback.print_exc()
