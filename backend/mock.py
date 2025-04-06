import random
import requests
import time
import serial
import json

SERIAL_PORT = '/dev/tty.usbmodem11201'  # Update if needed
BAUD_RATE = 9600
API_URL = 'http://localhost:5002/api/sensor-data'  # Update if needed

# Record the start time for uptime calculation
start_time = time.time()

def get_uptime():
    """Calculate uptime since the script started."""
    elapsed = time.time() - start_time
    hours, rem = divmod(elapsed, 3600)
    minutes, seconds = divmod(rem, 60)
    return f"{int(hours)}h {int(minutes)}m {int(seconds)}s"

def read_from_arduino(ser):
    try:
        raw_line = ser.readline()
        line = raw_line.decode('utf-8', errors='ignore').strip()
        if "<json>" in line and "</json>" in line:
            json_str = line.split("<json>")[1].split("</json>")[0]
            try:
                data = json.loads(json_str)
                return data  # Return full dict
            except json.JSONDecodeError as e:
                print("🚫 JSON parsing failed:", e)
        else:
            print("⚠️ Ignored non-JSON line:", line)
    except Exception as e:
        print("🚫 Error reading/parsing line:", e)
    return None

def read_latest_from_arduino(ser):
    """Drains the serial buffer and returns the latest valid JSON data."""
    latest_data = None
    while ser.in_waiting:
        data = read_from_arduino(ser)
        if data:
            latest_data = data
    return latest_data

def add_extra_sensor_data(data):
    # Set fixed values and calculate uptime
    data["status"] = random.choice(["running", "scheduled", "stopped"])
    data["uptime"] = f"{random.randint(1, 72)} hrs"
    data["efficiency"] = round(random.uniform(80, 95), 1)      # Fixed efficiency, change if needed
    data["operator"] = f"OP-{random.randint(0, 4999)}" # Fixed operator, change if needed
    # "status": random.choice(["running", "scheduled", "stopped"]),
    #         "uptime": f"{random.randint(1, 72)} hrs",
    #         "efficiency": round(random.uniform(80, 95), 1),
    #         "operator": f"OP-{random.randint(0, 4999)}",      # Random operator ID
    return data

def post_sensor_data(data):
    try:
        response = requests.post('http://localhost:5002/api/sensor-data', json=data)
        print(response.text)

        if response.status_code == 200:
            print("✅ Posted to API:", data)
        else:
            print("❌ Failed to post:", response.status_code, response.text)
    except Exception as e:
        print("🚫 Error posting sensor data:", e)

def main():
    try:
        with serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=0.5) as ser:
            print("📡 Listening to Arduino on", SERIAL_PORT)
            time.sleep(2)  # Let Arduino reset
            while True:
                # Drain the buffer and keep only the most recent valid message
                sensor_data = read_latest_from_arduino(ser)
                if sensor_data:
                    sensor_data = add_extra_sensor_data(sensor_data)
                    post_sensor_data(sensor_data)
                time.sleep(0.1)  # Faster polling to reduce lag
    except serial.SerialException as e:
        print("🔌 Serial connection error:", e)

if __name__ == "__main__":
    main()
# def generate_and_post_mock_data():
#     while True:
#         # Generate mock sensor data
#         data = {
#             "temperature": round(random.uniform(65, 85), 1),  # 65-85 °C
#             "pressure": round(random.uniform(120, 150), 1),   # 120-150 PSI
#             "soundLevel": round(random.uniform(50, 70), 1),   # 50-70 dB
#             "waterLevel": round(random.uniform(0, 100), 1),   # 0-100%
#             "distance": round(random.uniform(0, 10), 1),      # 0-10 m
#             "potentiometer": round(random.uniform(0, 100), 1), # 0-100%
#             "status": random.choice(["running", "scheduled", "stopped"]),
#             "uptime": f"{random.randint(1, 72)} hrs",
#             "efficiency": round(random.uniform(80, 95), 1),
#             "operator": f"OP-{random.randint(0, 4999)}",      # Random operator ID
#         }

#         # Post the data to the /api/sensor-data endpoint
#         try:
#             response = requests.post('http://localhost:5002/api/sensor-data', json=data)
#             if response.status_code == 200:
#                 print("Successfully posted sensor data:", data)
#             else:
#                 print("Failed to post sensor data:", response.json())
#         except Exception as e:
#             print("Error posting sensor data:", e)

#         # Wait for 5 seconds before generating the next data point
#         time.sleep(5)

# if __name__ == "__main__":
#     generate_and_post_mock_data()
