from flask import Flask, jsonify, session
from flask_cors import CORS
from dotenv import load_dotenv
from werkzeug.middleware.proxy_fix import ProxyFix
import os

load_dotenv()

from api.gallery_api import gallery_api

app = Flask(__name__, static_folder="static")
app.secret_key = os.getenv("SECRET_KEY", "super-secret-key")

# ✅ Session cookie settings
app.config.update(
    SESSION_COOKIE_SAMESITE="None",
    SESSION_COOKIE_SECURE=True,
    SESSION_COOKIE_HTTPONLY=True
)

# ✅ Trust headers from Render
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# ✅ CORS config
CORS(app,
     supports_credentials=True,
     origins=[
         "https://event-planner-website-one.vercel.app",
         "http://localhost:5173"
     ],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

# ✅ Blueprint
app.register_blueprint(gallery_api)

@app.route("/")
def home():
    return "Welcome to Catering Backend"

@app.route("/ping")
def ping():
    return {"message": "pong"}

# ✅ Debug session route
@app.route("/api/debug-session")
def debug_session():
    return jsonify({
        "admin_session": session.get("admin", False)
    })

if __name__ == "__main__":
    app.run(debug=True)
