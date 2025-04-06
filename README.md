# Orbitrons

Factories need to evolve into smart, automated, and data-driven environments. Current systems lack real-time monitoring, leading to downtime, inefficient resource use, and poor visibility into machine health.
 
## The challenge:
Use IoT sensors and smart devices to collect and utilize real-time machine and environmental data, enabling better operational insights, predictive maintenance, saving on cost and time, and improved decision-making.


# Set up instructions 

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

The dashboard will be available on [localhost:3000](http://localhost:3000/)
