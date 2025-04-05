import requests
import random
import time

def generate_and_post_mock_data():
    while True:
        # Generate mock sensor data
        data = {
            "temperature": round(random.uniform(65, 85), 1),  # 65-85 °C
            "pressure": round(random.uniform(120, 150), 1),   # 120-150 PSI
            # "vibration": round(random.uniform(0.1, 0.5), 2),  # 0.1-0.5 mm/s
            # "power": round(random.uniform(45, 65), 1),        # 45-65 kW
            # "status": "operational",
            # "uptime": "14d 6h 23m",
            # "efficiency": round(random.uniform(80, 95), 1),   # 80-95%
            # "operator": "OP-4872"
        }

        # Post the data to the /api/sensor-data endpoint
        try:
            response = requests.post('http://localhost:5002/api/sensor-data', json=data)
            if response.status_code == 200:
                print("Successfully posted sensor data:", data)
            else:
                print("Failed to post sensor data:", response.json())
        except Exception as e:
            print("Error posting sensor data:", e)

        # Wait for 5 seconds before generating the next data point
        time.sleep(5)

if __name__ == "__main__":
    generate_and_post_mock_data()