# honeywell_hack


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
