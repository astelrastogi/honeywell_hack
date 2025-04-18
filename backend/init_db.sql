DROP TABLE IF EXISTS machine_status;

CREATE TABLE machine_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT,
    temperature REAL,
    pressure REAL,
    soundLevel REAL,
    waterLevel REAL,
    distance REAL,
    potentiometer REAL,
    status TEXT,
    uptime TEXT,
    efficiency REAL,
    operator TEXT
);


-- Dummy data

INSERT INTO machine_status (timestamp, temperature, pressure, soundLevel, waterLevel, distance, potentiometer, status, uptime, efficiency, operator)
VALUES (
    datetime('now'), 72.4, 143.2, 55, 1, 20, 0.5, 'Operational', '14d 6h 23m', '87%', 'OP-4872'
);
