from flask import Flask
from flask_cors import CORS
from routes import api

app = Flask(__name__)
CORS(app)
app.register_blueprint(api)

@app.route("/")
def home():
    return "✅ Flask server is running. Try /api/dashboard or /api/sensor-data."

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5002)
