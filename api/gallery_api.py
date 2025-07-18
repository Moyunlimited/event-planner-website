from flask import Blueprint, request, jsonify, session
from flask_cors import cross_origin
from werkzeug.security import check_password_hash
from dotenv import load_dotenv
import os
import json
import cloudinary
import cloudinary.uploader
import cloudinary.api

load_dotenv()

gallery_api = Blueprint("gallery_api", __name__)

# ===== Config =====
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH")

# ===== File paths =====
HOMEPAGE_JSON = "homepage_images.json"
FEEDBACK_JSON = "feedback.json"
SERVICE_IMAGES_JSON = "service_images.json"

# ===== Load/Save Helpers =====
def load_json(path, fallback):
    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)
    return fallback

def save_json(path, data):
    with open(path, "w") as f:
        json.dump(data, f, indent=2)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# ===== Persistent Data Load =====
homepage_images = load_json(HOMEPAGE_JSON, ["", "", "", ""])
service_images = load_json(SERVICE_IMAGES_JSON, {
    "decoration": "",
    "buffet": "",
    "surprise": ""
})

# ===== Admin Auth =====
@gallery_api.route('/api/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if email == ADMIN_EMAIL and check_password_hash(ADMIN_PASSWORD_HASH, password):
        session["admin"] = True
        return jsonify({"msg": "Login successful"}), 200
    return jsonify({"msg": "Unauthorized"}), 401

@gallery_api.route('/api/logout', methods=['POST'])
@cross_origin(supports_credentials=True)
def logout():
    session.pop("admin", None)
    return jsonify({"msg": "Logged out"})

@gallery_api.route('/api/is_admin', methods=['GET'])
@cross_origin(supports_credentials=True)
def is_admin():
    return jsonify({"admin": session.get("admin", False)})

# ===== Gallery =====
@gallery_api.route('/api/gallery', methods=['GET'])
@cross_origin()
def get_gallery_images():
    try:
        result = cloudinary.api.resources(
            type="upload",
            prefix="gallery",  # adjust or remove if no folder used
            max_results=100
        )
        urls = [item['secure_url'] for item in result['resources']]
        return jsonify({"images": urls}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@gallery_api.route('/api/gallery/upload', methods=['POST'])
@cross_origin(supports_credentials=True)
def upload_gallery_image():
    if not session.get("admin"):
        return jsonify({"error": "Unauthorized"}), 401
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file and allowed_file(file.filename):
        try:
            upload_result = cloudinary.uploader.upload(file, folder="gallery")
            image_url = upload_result['secure_url']
            return jsonify({"msg": "Upload successful", "url": image_url}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    return jsonify({"error": "File not allowed"}), 400

@gallery_api.route('/api/gallery/delete', methods=['DELETE'])
@cross_origin(supports_credentials=True)
def delete_gallery_image():
    if not session.get("admin"):
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json()
    image_url = data.get("url")
    if not image_url:
        return jsonify({"error": "No URL provided"}), 400

    try:
        parts = image_url.split('/')
        public_id = parts[-1].split('.')[0]
        cloud_folder = parts[-2] if len(parts) >= 2 else ''
        full_public_id = f"{cloud_folder}/{public_id}" if cloud_folder else public_id

        cloudinary.uploader.destroy(full_public_id)

        return jsonify({"msg": "Deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ===== Homepage Hero =====
@gallery_api.route("/api/homepage-images", methods=["POST"])
@cross_origin(supports_credentials=True)
def upload_homepage_image():
    if not session.get("admin"):
        return jsonify({"error": "Unauthorized"}), 401

    if "file" not in request.files or "index" not in request.form:
        return jsonify({"error": "Missing file or index"}), 400

    file = request.files["file"]
    index = int(request.form["index"])

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    try:
        upload_result = cloudinary.uploader.upload(file, folder="homepage")
        image_url = upload_result["secure_url"]

        if 0 <= index < 4:
            homepage_images[index] = image_url
            save_json(HOMEPAGE_JSON, homepage_images)
            return jsonify({"msg": "Image uploaded", "url": image_url, "index": index}), 200
        else:
            return jsonify({"error": "Invalid index"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@gallery_api.route("/api/homepage/images", methods=["GET"])
@cross_origin()
def get_homepage_images():
    return jsonify({"images": load_json(HOMEPAGE_JSON, ["", "", "", ""])})

# ===== Service Images =====
@gallery_api.route("/api/service-images", methods=["GET"])
@cross_origin()
def get_service_images():
    return jsonify(load_json(SERVICE_IMAGES_JSON, {
        "decoration": "",
        "buffet": "",
        "surprise": ""
    }))

@gallery_api.route("/api/service-images", methods=["POST"])
@cross_origin(supports_credentials=True)
def upload_service_image():
    if not session.get("admin"):
        return jsonify({"error": "Unauthorized"}), 401

    if "file" not in request.files or "section" not in request.form:
        return jsonify({"error": "Missing file or section"}), 400

    section = request.form["section"]
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    try:
        upload_result = cloudinary.uploader.upload(file, folder="services")
        image_url = upload_result["secure_url"]
        service_images[section] = image_url
        save_json(SERVICE_IMAGES_JSON, service_images)
        return jsonify({"msg": "Image updated", "url": image_url}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ===== Feedback =====
@gallery_api.route('/api/feedback', methods=['POST'])
@cross_origin()
def receive_feedback():
    data = request.json
    name = data.get('name')
    message = data.get('message')
    try:
        feedback = load_json(FEEDBACK_JSON, [])
        feedback.append({"name": name, "message": message})
        save_json(FEEDBACK_JSON, feedback)
        return jsonify({"msg": "Feedback received"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@gallery_api.route('/api/feedback', methods=['GET'])
@cross_origin()
def get_feedback():
    try:
        return jsonify({"testimonials": load_json(FEEDBACK_JSON, [])}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@gallery_api.route('/api/feedback/<int:index>', methods=['DELETE'])
@cross_origin(supports_credentials=True)
def delete_feedback(index):
    if not session.get("admin"):
        return jsonify({"error": "Unauthorized"}), 401
    try:
        feedback = load_json(FEEDBACK_JSON, [])
        if 0 <= index < len(feedback):
            del feedback[index]
            save_json(FEEDBACK_JSON, feedback)
            return jsonify({"msg": "Deleted"}), 200
        else:
            return jsonify({"error": "Index out of range"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
