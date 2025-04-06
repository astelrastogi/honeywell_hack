# Real-Time IoT Monitoring and Safety System for Intelligent Machining

Factories need to evolve into smart, automated, and data-driven environments. Current systems lack real-time monitoring, leading to downtime, inefficient resource use, and poor visibility into machine health.

 
## The challenge:
Use IoT sensors and smart devices to collect and utilize real-time machine and environmental data, enabling better operational insights, predictive maintenance, saving on cost and time, and improved decision-making.

## Our Solution
- Orbitron digitizes conventional CNC machines using an Arduino-powered IoT sensor suite.
- It monitors key parameters like temperature, pressure, vibration, leaks, and tool motion in real time.
- Data is transmitted via a Python-Flask API to a centralized dashboard with live alerts and historical logs.
- This enables predictive maintenance, faster fault response, and full machine visibility, aligning directly with Honeywell’s smart factory vision.

![Screenshot 2025-04-06 at 4 29 15 PM](https://github.com/user-attachments/assets/387e9605-686b-486e-9e65-e57c11f83d3b)

# Set-up instructions 

## Installations
`cd frontend`


`npm install`

## Setup sqlite database
`cd backend` 

`sqlite3 db.sqlite3 < init_db.sql`
#### Run backend 
`cd backend`

`python app.py`

#### Run frontend 

`cd frontend`

`npm run dev`

### Send data from IOT sensors to Database 
`cd backend`

`python mock.py`

The dashboard will be available on localhost

![Alt text for screen readers](images/screenshot.png "Optional hover title")
