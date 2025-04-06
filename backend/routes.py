import random
from flask import Blueprint, request, jsonify
import sqlite3
from models import get_latest_status
from datetime import datetime, timedelta

api = Blueprint('api', __name__)
def generate_sensor_history(current_value: float, unit: str, steps: int = 10):
    history = []
    now = datetime.now()
    for i in range(steps):
        timestamp = (now - timedelta(minutes=(steps - i) * 3)).strftime("%H:%M")
        # add small variation around current value
        value = round(current_value + random.uniform(-1.5, 1.5), 2)
        history.append({"timestamp": timestamp, "value": value})
    return history

@api.route('/api/sensor-data', methods=['POST'])
def ingest_sensor_data():
    data = request.get_json()
    print(data)
    required_fields = ["temperature", "pressure", "soundLevel", "waterLevel", "distance", "potentiometer", "status", "uptime", "efficiency", "operator"]

    if not all(k in data for k in required_fields):
        return jsonify({"error": "Missing one or more fields"}), 400

    conn = sqlite3.connect("db.sqlite3")
    cursor = conn.cursor()
    # vibration, power, status, uptime, efficiency, operator
    # ?, ?, ?, ?, ?, ?
    # cursor.execute("""
    #     INSERT INTO machine_status (timestamp, temperature, pressure, soundLevel, waterLevel, distance, potentiometer, status, uptime, efficiency, operator)
    #     VALUES (datetime('now'), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    # """, (
    #     data["temperature"],
    #     data["pressure"],
    #     data["soundLevel"],
    #     data["waterLevel"],
    #     data["distance"],
    #     data["potentiometer"],
    #     data["status"],
    #     data["uptime"],
    #     data["efficiency"],
    #     data["operator"]
    # ))
    cursor.execute("""
        INSERT INTO machine_status (timestamp, temperature, pressure, soundLevel, waterLevel, distance, potentiometer, status, uptime, efficiency, operator)
        VALUES (datetime('now'), :temperature, :pressure, :soundLevel, :waterLevel, :distance, :potentiometer, :status, :uptime, :efficiency, :operator)
    """, {
        'temperature': data["temperature"],
        'pressure': data["pressure"],
        'soundLevel': data["soundLevel"],
        'waterLevel': data["waterLevel"],
        'distance': data["distance"],
        'potentiometer': data["potentiometer"],
        'status': data["status"],
        'uptime': data["uptime"],
        'efficiency': data["efficiency"],
        'operator': data["operator"]
    })
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
            "state": latest_status["status"],
            "uptime": latest_status["uptime"],
            "efficiency": float(latest_status["efficiency"].replace('%', '')) if isinstance(latest_status["efficiency"], str) else float(latest_status["efficiency"]),
            "operatorId": latest_status["operator"],
            "lastUpdate": latest_status["timestamp"],
            "waterLevel": float(latest_status["waterLevel"])
        },
        "criticalMetrics": [
            {"name": "Temperature", "value": float(latest_status["temperature"]), "unit": "°C", "status": "normal" if float(latest_status["temperature"]) < 80 else "warning"},
            {"name": "Pressure", "value": float(latest_status["pressure"]), "unit": "PSI", "status": "normal" if float(latest_status["pressure"]) < 140 else "warning"},
            {"name": "SoundLevel", "value": float(latest_status["soundLevel"]), "unit": "dB", "status": "normal" if float(latest_status["soundLevel"]) < 60 else "warning"}
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
                "history": generate_sensor_history(float(latest_status["temperature"]), "°C")

            },
            {
                "id": "sensor-002",
                "name": "Hydraulic Pressure",
                "value": float(latest_status["pressure"]),
                "unit": "PSI",
                "status": "normal" if float(latest_status["pressure"]) < 140 else "warning",
                "history": generate_sensor_history(float(latest_status["pressure"]), "PSI")
            },
            {
                "id": "sensor-003",
                "name": "Sound Level Sensor",
                "value": float(latest_status["soundLevel"]),
                "unit": "dB",
                "status": "normal" if float(latest_status["soundLevel"]) < 60 else "warning",
            "history": generate_sensor_history(float(latest_status["soundLevel"]), "dB")
            },
        ],
        "performance": {
            "overallEfficiency": round(random.uniform(80, 95), 1),
            "productionRate": 142,
            "qualityRate": 98.3,
            "downtime": 3.2,
            "trends": {
                "daily": [],
                "weekly": [],
                "monthly": []
            }
        },
        "maintenanceHistory": [
    {
        "id": "maint-101",
        "type": "Corrective",
        "description": "Emergency repair on conveyor system",
        "date": "2025-01-05T08:45:00Z",
        "technician": "R. Davis",
        "duration": 180
    },
    {
        "id": "maint-102",
        "type": "Preventive",
        "description": "Monthly inspection and calibration",
        "date": "2024-12-10T13:30:00Z",
        "technician": "S. Wilson",
        "duration": 150
    },
    {
        "id": "maint-103",
        "type": "Corrective",
        "description": "Sensor replacement and recalibration",
        "date": "2024-11-22T09:15:00Z",
        "technician": "L. Martinez",
        "duration": 120
    }
]
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

    # Check for low water level
    if float(latest_status["waterLevel"]) < 20:
        suggestions.append({
            "id": "sug-003",
            "title": "Low Water Level Alert",
            "description": f"Water level is at {latest_status['waterLevel']}%, which may affect cooling.",
            "priority": "medium",
            "impacts": [
                {"type": "positive", "description": "Prevent overheating and maintain system integrity"},
                {"type": "negative", "description": "Requires immediate attention"}
            ]
        })

    return jsonify(suggestions), 200