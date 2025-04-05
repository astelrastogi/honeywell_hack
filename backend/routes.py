from flask import Blueprint, request, jsonify
import sqlite3
from models import get_latest_status
from datetime import datetime, timedelta

api = Blueprint('api', __name__)

@api.route('/api/sensor-data', methods=['POST'])
def ingest_sensor_data():
    data = request.get_json()
    print(data)
    required_fields = ["temperature", "pressure", 
                    #    "vibration", "power", "status", "uptime", "efficiency", "operator"
                    ]
    if not all(k in data for k in required_fields):
        return jsonify({"error": "Missing one or more fields"}), 400

    conn = sqlite3.connect("db.sqlite3")
    cursor = conn.cursor()
    # vibration, power, status, uptime, efficiency, operator
    # ?, ?, ?, ?, ?, ?
    cursor.execute("""
        INSERT INTO machine_status (timestamp, temperature, pressure)
        VALUES (datetime('now'), ?, ?)
    """, (
        data["temperature"],
        data["pressure"],
        # data["vibration"],
        # data["power"],
        # data["status"],
        # data["uptime"],
        # data["efficiency"],
        # data["operator"]
    ))
    conn.commit()
    conn.close()

    return jsonify({"message": "Sensor data stored successfully"}), 200

@api.route('/api/machine-data', methods=['GET'])
def get_machine_data():
    latest_status = get_latest_status()
    if not latest_status:
        return jsonify({"error": "No data found"}), 404

    machine_data = {
        "status": {
            "name": "Production Line A",
            # "state": latest_status["status"],
            # "uptime": latest_status["uptime"],
            # "efficiency": float(latest_status["efficiency"]),
            # "operatorId": latest_status["operator"],
            "lastUpdate": latest_status["timestamp"]
        },
        "criticalMetrics": [
            {"name": "Temperature", "value": float(latest_status["temperature"]), "unit": "°C", "status": "normal" if float(latest_status["temperature"]) < 80 else "warning"},
            {"name": "Pressure", "value": float(latest_status["pressure"]), "unit": "PSI", "status": "normal" if float(latest_status["pressure"]) < 140 else "warning"},
            # {"name": "Vibration", "value": float(latest_status["vibration"]), "unit": "mm/s", "status": "normal" if float(latest_status["vibration"]) < 0.4 else "warning"},
            # {"name": "Power Usage", "value": float(latest_status["power"]), "unit": "kW", "status": "normal" if float(latest_status["power"]) < 60 else "warning"}
        ],
        "nextMaintenance": {
            "description": "Scheduled lubrication and bearing inspection",
            "date": (datetime.now() + timedelta(days=7)).isoformat()
        },
        "sensors": [
            {
                "id": "sensor-001",
                "name": "Main Motor Temperature",
                "value": float(latest_status["temperature"]),
                "unit": "°C",
                "status": "normal" if float(latest_status["temperature"]) < 80 else "warning",
                "history": []
            },
            {
                "id": "sensor-002",
                "name": "Hydraulic Pressure",
                "value": float(latest_status["pressure"]),
                "unit": "PSI",
                "status": "normal" if float(latest_status["pressure"]) < 140 else "warning",
                "history": []
            },
            # {
            #     "id": "sensor-003",
            #     "name": "Main Shaft Vibration",
            #     "value": float(latest_status["vibration"]),
            #     "unit": "mm/s",
            #     "status": "normal" if float(latest_status["vibration"]) < 0.4 else "warning",
            #     "history": []
            # },
            # {
            #     "id": "sensor-004",
            #     "name": "Power Consumption",
            #     "value": float(latest_status["power"]),
            #     "unit": "kW",
            #     "status": "normal" if float(latest_status["power"]) < 60 else "warning",
            #     "history": []
            # }
        ],
        # "performance": {
        #     "overallEfficiency": float(latest_status["efficiency"]),
        #     "productionRate": 142,
        #     "qualityRate": 98.3,
        #     "downtime": 3.2,
        #     "trends": {
        #         "daily": [],
        #         "weekly": [],
        #         "monthly": []
        #     }
        # },
        "maintenanceHistory": []
    }

    return jsonify(machine_data), 200

@api.route('/api/suggestions', methods=['GET'])
def get_suggestions():
    latest_status = get_latest_status()
    if not latest_status:
        return jsonify({"error": "No data found"}), 404

    suggestions = []

    # Check for high pressure
    if float(latest_status["pressure"]) > 140:
        suggestions.append({
            "id": "sug-001",
            "title": "Hydraulic System Pressure Alert",
            "description": f"Hydraulic pressure is at {latest_status['pressure']} PSI, which is above the optimal range.",
            "priority": "high",
            "impacts": [
                {"type": "positive", "description": "Prevent unexpected downtime (est. 4-8 hours)"},
                {"type": "positive", "description": "Avoid potential damage to pump components"},
                {"type": "positive", "description": "Maintain optimal production efficiency"}
            ]
        })

    # Check for high temperature
    if float(latest_status["temperature"]) > 80:
        suggestions.append({
            "id": "sug-002",
            "title": "High Temperature Warning",
            "description": f"Temperature is at {latest_status['temperature']} °C, which may indicate cooling issues.",
            "priority": "medium",
            "impacts": [
                {"type": "positive", "description": "Prevent overheating and extend component lifespan"},
                {"type": "negative", "description": "Requires 1-2 hour maintenance window"}
            ]
        })

    # Check for high vibration
    # if float(latest_status["vibration"]) > 0.4:
    #     suggestions.append({
    #         "id": "sug-003",
    #         "title": "Bearing Wear Detected",
    #         "description": f"Vibration is at {latest_status['vibration']} mm/s, indicating potential bearing wear.",
    #         "priority": "low",
    #         "impacts": [
    #             {"type": "positive", "description": "Extend bearing life by addressing early"},
    #             {"type": "positive", "description": "Optimize maintenance scheduling"},
    #             {"type": "positive", "description": "Prevent unexpected failures"}
    #         ]
    #     })

    return jsonify(suggestions), 200