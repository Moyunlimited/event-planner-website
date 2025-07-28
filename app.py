from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from werkzeug.middleware.proxy_fix import ProxyFix
import os

# ✅ Load environment variables
load_dotenv()

# ✅ Import your route blueprints
from api.gallery_api import gallery_api
from api.auth_api import auth_api  # make sure you import this if it's in a separate file

# ✅ Create app
static_path = os.path.join(os.path.dirname(__file__), "static")
app = Flask(__name__, static_folder=static_path)

# ✅ Secret key for session
app.secret_key = os.getenv("SECRET_KEY", "super-secret-key")

# ✅ Cookie/session configuration (cross-origin mobile-friendly)
app.config["SESSION_COOKIE_SAMESITE"] = "None"     # ✅ Fix for mobile login
app.config["SESSION_COOKIE_SECURE"] = True         # ✅ Required for Samesite=None
app.config["SESSION_COOKIE_HTTPONLY"] = True

# ✅ Ensure proxy headers are trusted (Render specific)
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# ✅ CORS setup
CORS(app,
     supports_credentials=True,
     origins=[
         "http://localhost:5173",
         "https://event-planner-website-one.vercel.app"
     ],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

# ✅ Register all blueprints
app.register_blueprint(gallery_api)
app.register_blueprint(auth_api)

# ✅ Routes
@app.route("/")
def home():
    return "🎉 Welcome to the Catering Backend!"

@app.route("/ping", methods=["GET"])
def ping():
    return {"message": "pong"}, 200

@app.route("/debug-session")
def debug_session():
    from flask import session
    return {"admin": session.get("admin", False)}

# ✅ Run app (only for local testing)
if __name__ == "__main__":
    app.run(debug=True)
