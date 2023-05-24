import subprocess
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/upload', methods=['POST'])
def extract():
    file_path = request.json['file_path']
    # Invoke your ExtractionScript.py script with the file path
    subprocess.run(['python', 'ExtractionScript.py', file_path])
    return jsonify({'message': 'Extraction complete'})
