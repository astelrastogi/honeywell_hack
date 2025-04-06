import requests
import time
import serial
import json

SERIAL_PORT = '/dev/tty.usbmodem142201'  # Update if needed
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
    data["status"] = "active"
    data["uptime"] = get_uptime()
    data["efficiency"] = "95%"      # Fixed efficiency, change if needed
    data["operator"] = "Operator A" # Fixed operator, change if needed
    return data

def post_sensor_data(data):
    try:
        response = requests.post(API_URL, json=data)
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
