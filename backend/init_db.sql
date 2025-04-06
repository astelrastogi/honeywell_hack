DROP TABLE IF EXISTS machine_status;

CREATE TABLE machine_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT,
    temperature REAL,
<<<<<<< Updated upstream
    pressure REAL
=======
    pressure REAL,
    soundLevel REAL,
    waterLevel REAL,
    distance REAL,
    potentiometer REAL,
    status TEXT,
    uptime TEXT,
    efficiency REAL,
    operator TEXT
>>>>>>> Stashed changes
);
-- vibration REAL,
    -- power REAL,
    -- status TEXT,
    -- uptime TEXT,
    -- efficiency TEXT,
    -- operator TEXT

-- Dummy data
<<<<<<< Updated upstream
INSERT INTO machine_status (timestamp, temperature, pressure)
-- vibration, power, status, uptime, efficiency, operator

VALUES (
    datetime('now'), 72.4, 143.2
=======
INSERT INTO machine_status (timestamp, temperature, pressure, soundLevel, waterLevel, distance, potentiometer, status, uptime, efficiency, operator)
VALUES (
    datetime('now'), 72.4, 143.2, 55, 1, 20, 0.5, 'Operational', '14d 6h 23m', '87%', 'OP-4872'
>>>>>>> Stashed changes
);
 -- 0.32, 57.3, 'Operational', '14d 6h 23m', '87%', 'OP-4872'