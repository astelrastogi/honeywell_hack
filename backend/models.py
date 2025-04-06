import sqlite3

def get_latest_status():
    conn = sqlite3.connect("db.sqlite3")
    conn.row_factory = sqlite3.Row  # To access columns by name
    cursor = conn.cursor()

    cursor.execute("""
        SELECT timestamp, temperature, pressure, soundLevel, waterLevel, distance, potentiometer, status, uptime, efficiency, operator
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

