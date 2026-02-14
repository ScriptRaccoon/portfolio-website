CREATE TABLE IF NOT EXISTS page_visits (
    id INTEGER PRIMARY KEY,
    path TEXT NOT NULL,
    month TEXT NOT NULL,
    visits INTEGER NOT NULL DEFAULT 0,
    UNIQUE (path, month)
);

CREATE TABLE IF NOT EXISTS page_visit_logs (
    id INTEGER PRIMARY KEY,
    path TEXT NOT NULL,
    date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    city TEXT,
    country TEXT
);

CREATE TRIGGER IF NOT EXISTS keep_last_100_visits AFTER INSERT ON page_visit_logs BEGIN
DELETE FROM page_visit_logs
WHERE
    id NOT IN (
        SELECT
            id
        FROM
            page_visit_logs
        ORDER BY
            date DESC
        LIMIT
            100
    );

END;