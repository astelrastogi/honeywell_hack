import sqlite3

def get_latest_status():
    conn = sqlite3.connect("db.sqlite3")
    conn.row_factory = sqlite3.Row  # To access columns by name
    cursor = conn.cursor()

    cursor.execute("""
<<<<<<< Updated upstream
        SELECT timestamp, temperature, pressure
=======
        SELECT timestamp, temperature, pressure, soundLevel, waterLevel, distance, potentiometer, status, uptime, efficiency, operator
>>>>>>> Stashed changes
        FROM machine_status
        ORDER BY timestamp DESC
        LIMIT 1
    """)
    # vibration, power, status, uptime, efficiency, operator
    row = cursor.fetchone()
    conn.close()

    if not row:
        return None
    return dict(row)
<<<<<<< Updated upstream
    # return {
    #     "timestamp": row["timestamp"],
    #     "temperature": f"{row['temperature']} °C",
    #     "pressure": f"{row['pressure']} PSI",
    #     "vibration": f"{row['vibration']} mm/s",
    #     "power": f"{row['power']} kW",
    #     "status": row["status"],
    #     "uptime": row["uptime"],
    #     "efficiency": row["efficiency"],
    #     "operator": row["operator"],
    #     "message": "Data loaded from database!"
    # }
=======
>>>>>>> Stashed changes

