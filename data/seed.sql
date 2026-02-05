CREATE TABLE IF NOT EXISTS page_stats (
    id INTEGER PRIMARY KEY,
    path TEXT NOT NULL,
    month TEXT NOT NULL,
    visits INTEGER NOT NULL DEFAULT 0,
    UNIQUE (path, month)
);