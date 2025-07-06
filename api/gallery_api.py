from flask import Blueprint, request, jsonify, session
from flask_cors import cross_origin
from werkzeug.utils import secure_filename
import os

# Blueprint setup
gallery_api = Blueprint("gallery_api", __name__)

# Configuration
UPLOAD_FOLDER = "static/gallery"
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}
ADMIN_CREDENTIALS = {
    "email": "admin@example.com",
    "password": "admin123"  # 🔒 Change before production
}

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Helpers
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 🔐 Admin Auth Routes
@gallery_api.route('/api/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    data = request.json
    if data["email"] == ADMIN_CREDENTIALS["email"] and data["password"] == ADMIN_CREDENTIALS["password"]:
        session["admin"] = True
        return jsonify({ "msg": "Login successful" }), 200
    return jsonify({ "msg": "Unauthorized" }), 401

@gallery_api.route('/api/logout', methods=['POST'])
@cross_origin(supports_credentials=True)
def logout():
    session.pop("admin", None)
    return jsonify({ "msg": "Logged out" })

@gallery_api.route('/api/is_admin', methods=['GET'])
@cross_origin(supports_credentials=True)
def is_admin():
    return jsonify({ "admin": session.get("admin", False) })

# 📸 Gallery Image Endpoints
@gallery_api.route('/api/gallery', methods=['GET'])
@cross_origin()
def get_gallery_images():
    try:
        files = os.listdir(UPLOAD_FOLDER)
        urls = [f"/static/gallery/{file}" for file in files if allowed_file(file)]
        return jsonify({ "images": urls })
    except Exception as e:
        return jsonify({ "error": str(e) }), 500

@gallery_api.route('/api/gallery/upload', methods=['POST'])
@cross_origin(supports_credentials=True)
def upload_image():
    if not session.get("admin"):
        return jsonify({ "error": "Unauthorized" }), 401

    if 'file' not in request.files:
        return jsonify({ "error": "No file part" }), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({ "error": "No selected file" }), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        return jsonify({ "msg": "Upload successful", "url": f"/static/gallery/{filename}" }), 200

    return jsonify({ "error": "File not allowed" }), 400

# 🗑️ DELETE image endpoint for admin
@gallery_api.route('/api/gallery/delete/<filename>', methods=['DELETE'])
@cross_origin(supports_credentials=True)
def delete_image(filename):
    if not session.get("admin"):
        return jsonify({ "error": "Unauthorized" }), 401

    file_path = os.path.join(UPLOAD_FOLDER, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return jsonify({ "msg": "Deleted successfully" }), 200
    else:
        return jsonify({ "error": "File not found" }), 404

# 💬 Feedback
@gallery_api.route('/api/feedback', methods=['POST'])
@cross_origin()
def receive_feedback():
    data = request.json
    name = data.get('name')
    message = data.get('message')

    try:
        with open("feedback.txt", "a") as f:
            f.write(f"{name}: {message}\n")
        return jsonify({ "msg": "Feedback received" }), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 500

@gallery_api.route('/api/feedback', methods=['GET'])
@cross_origin()
def get_feedback():
    try:
        with open("feedback.txt", "r") as f:
            lines = f.readlines()
        feedback_list = []
        for line in lines:
            if ":" in line:
                name, message = line.split(":", 1)
                feedback_list.append({ "name": name.strip(), "message": message.strip() })
        return jsonify({ "testimonials": feedback_list }), 200
    except FileNotFoundError:
        return jsonify({ "testimonials": [] }), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 500
