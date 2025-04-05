from flask import Blueprint, jsonify
from models import get_latest_status

api = Blueprint('api', __name__)

@api.route('/api/dashboard', methods=['GET'])
def dashboard():
    row = get_latest_status()
    if not row:
        return jsonify({"error": "No data found"}), 404

    return jsonify({
        "machine": {
            "status": row["status"],
            "uptime": row["uptime"],
            "efficiency": row["efficiency"],
            "operator": row["operator"]
        },
        "metrics": {
            "temperature": f"{row['temperature']} °C",
            "pressure": f"{row['pressure']} PSI",
            "vibration": f"{row['vibration']} mm/s",
            "power": f"{row['power']} kW"
        },
        "maintenance": {
            "next": "Scheduled lubrication and bearing inspection",
            "date": "2025-04-12"
        },
        "suggestions": [
            {
                "title": "Hydraulic System Pressure Alert",
                "level": "high",
                "description": "Hydraulic pressure is trending outside optimal range. Consider inspecting relief valve and checking for leaks.",
                "impacts": [
                    "Prevent unexpected downtime (est. 4–8 hours)",
                    "Avoid potential damage to pump components",
                    "Maintain optimal production efficiency"
                ]
            },
            {
                "title": "Schedule Oil Change",
                "level": "medium",
                "description": "Oil quality has degraded to 87%. Recommend scheduling oil change within 14 days.",
                "impacts": [
                    "Extend component lifespan by up to 15%",
                    "Improve energy efficiency by 2–3%",
                    "Requires 2 hour maintenance window"
                ]
            },
            {
                "title": "Bearing Wear Detected",
                "level": "low",
                "description": "Early signs of wear detected on main drive bearings. Consider inspection during next scheduled maintenance.",
                "impacts": [
                    "Extend bearing life by addressing early",
                    "Inspect during next scheduled maintenance"
                ]
            }
        ]
    })
