import requests
import random
import time

def generate_and_post_mock_data():
    while True:
        # Generate mock sensor data
        data = {
            "temperature": round(random.uniform(65, 85), 1),  # 65-85 °C
            "pressure": round(random.uniform(120, 150), 1),   # 120-150 PSI
            "soundLevel": round(random.uniform(50, 70), 1),   # 50-70 dB
            "waterLevel": round(random.uniform(0, 100), 1),   # 0-100%
            "distance": round(random.uniform(0, 10), 1),      # 0-10 m
            "potentiometer": round(random.uniform(0, 100), 1), # 0-100%
            "status": random.choice(["running", "scheduled", "stopped"]),
            "uptime": f"{random.randint(1, 72)} hrs",
            "efficiency": round(random.uniform(80, 95), 1),
            "operator": f"OP-{random.randint(0, 4999)}",      # Random operator ID
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