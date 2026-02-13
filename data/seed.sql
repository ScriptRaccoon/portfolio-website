CREATE TABLE IF NOT EXISTS page_views (
    id INTEGER PRIMARY KEY,
    path TEXT NOT NULL,
    month TEXT NOT NULL,
    views INTEGER NOT NULL DEFAULT 0,
    UNIQUE (path, month)
);