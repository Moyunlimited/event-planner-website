from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from werkzeug.middleware.proxy_fix import ProxyFix
import os

# ✅ Load environment variables from .env
load_dotenv()

# ✅ Import blueprint
from api.gallery_api import gallery_api

# ✅ Create Flask app and static folder
static_path = os.path.join(os.path.dirname(__file__), "static")
app = Flask(__name__, static_folder=static_path)

# ✅ Secret key for session handling
app.secret_key = os.getenv("SECRET_KEY", "super-secret-key")

# ✅ Session cookie settings (important for mobile + cross-site)
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True
app.config["SESSION_COOKIE_HTTPONLY"] = True

# ✅ Trust proxy headers from Render (fixes HTTPS + cookies)
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# ✅ Enable CORS for frontend origin + credentials
CORS(app,
     supports_credentials=True,
     origins=[
         "http://localhost:5173",
         "https://event-planner-website-one.vercel.app"
     ],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

# ✅ Ensure credentials header is always returned (for mobile login support)
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

# ✅ Register gallery + admin API
app.register_blueprint(gallery_api)

# ✅ Root route
@app.route("/")
def home():
    return "Welcome to the Catering Backend"

# ✅ Ping route (used for uptime monitoring)
@app.route("/ping", methods=["GET"])
def ping():
    return {"message": "pong"}, 200

# ✅ Run app
if __name__ == "__main__":
    app.run(debug=True)
