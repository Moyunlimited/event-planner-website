from flask import Blueprint, request, jsonify, session
from flask_cors import CORS

auth_api = Blueprint("auth_api", __name__)
ALLOWED_EMAIL = "admin@yourcatering.com"
ALLOWED_PASSWORD = "securepassword"

@auth_api.route('/api/login', methods=['POST'])
def login():
    data = request.json
    if data["email"] == ALLOWED_EMAIL and data["password"] == ALLOWED_PASSWORD:
        session["admin"] = True
        return jsonify({ "msg": "Login successful" }), 200
    return jsonify({ "msg": "Unauthorized" }), 401

@auth_api.route('/api/logout', methods=['POST'])
def logout():
    session.pop("admin", None)
    return jsonify({ "msg": "Logged out" })

@auth_api.route('/api/is_admin', methods=['GET'])
def is_admin():
    return jsonify({ "admin": session.get("admin", False) })
