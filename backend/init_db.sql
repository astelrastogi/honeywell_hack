DROP TABLE IF EXISTS machine_status;

CREATE TABLE machine_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT,
    temperature REAL,
    pressure REAL
);
-- vibration REAL,
    -- power REAL,
    -- status TEXT,
    -- uptime TEXT,
    -- efficiency TEXT,
    -- operator TEXT

-- Dummy data
INSERT INTO machine_status (timestamp, temperature, pressure)
-- vibration, power, status, uptime, efficiency, operator

VALUES (
    datetime('now'), 72.4, 143.2
);
 -- 0.32, 57.3, 'Operational', '14d 6h 23m', '87%', 'OP-4872'