from flask import Flask
from flask_cors import CORS
import os
from api.gallery_api import gallery_api

static_path = os.path.join(os.path.dirname(__file__), "static")
app = Flask(__name__, static_folder=static_path)
app.secret_key = os.environ.get("SECRET_KEY", "super-secret-key")

# ✅ Session Cookie Config
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True  # Only works with HTTPS

# ✅ CORS Config: allow local dev + production
CORS(app, supports_credentials=True, origins=[
    "http://localhost:5173",
    "https://yourdomain.com"
])

# Register API
app.register_blueprint(gallery_api)

@app.route("/")
def home():
    return "Welcome to the Catering Backend"

if __name__ == "__main__":
    app.run(debug=True)
