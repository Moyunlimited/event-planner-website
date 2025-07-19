# ✅ app.py (updated with session fix for mobile)
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from werkzeug.middleware.proxy_fix import ProxyFix
import os

# ✅ Load .env variables
load_dotenv()

# ✅ Import blueprint
from api.gallery_api import gallery_api

# ✅ Create app and set static folder
static_path = os.path.join(os.path.dirname(__file__), "static")
app = Flask(__name__, static_folder=static_path)

# ✅ Secret key from .env
app.secret_key = os.getenv("SECRET_KEY", "super-secret-key")

# ✅ Session cookie config (mobile-friendly)
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"  # Use "Lax" for mobile compatibility
app.config["SESSION_COOKIE_SECURE"] = True
app.config["SESSION_COOKIE_HTTPONLY"] = True

# ✅ Trust proxy headers from Render
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# ✅ CORS config with DELETE method allowed
CORS(app,
     supports_credentials=True,
     origins=[
         "http://localhost:5173",
         "https://event-planner-website-one.vercel.app"
     ],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

# ✅ Register blueprint
app.register_blueprint(gallery_api)

# ✅ Root route
@app.route("/")
def home():
    return "Welcome to the Catering Backend"

# ✅ Ping route for uptime monitoring
@app.route("/ping", methods=["GET"])
def ping():
    return {"message": "pong"}, 200

# ✅ Optional: Debug route for testing session
@app.route("/debug-session")
def debug_session():
    from flask import session
    return {"admin": session.get("admin", False)}

# ✅ Run app
if __name__ == "__main__":
    app.run(debug=True)
