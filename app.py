from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

# 🔐 Load environment variables from .env
load_dotenv()

# 📦 Import your unified blueprint
from api.gallery_api import gallery_api

# 🛠️ Create app and static folder path
static_path = os.path.join(os.path.dirname(__file__), "static")
app = Flask(__name__, static_folder=static_path)

# 🔑 Secret Key for sessions
app.secret_key = os.getenv("SECRET_KEY", "super-secret-key")

# 🔐 Session Cookie Settings (production-ready)
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True  # Only use True if using HTTPS

# 🔗 CORS Setup (Frontend URLs)
CORS(app, supports_credentials=True, origins=[
    "http://localhost:5173",
    "https://event-planner-website-one.vercel.app"
])

# 📘 Register Blueprint
app.register_blueprint(gallery_api)

# ✅ Home route
@app.route("/")
def home():
    return "Welcome to the Catering Backend"

# ▶️ Run the app
if __name__ == "__main__":
    app.run(debug=True)
