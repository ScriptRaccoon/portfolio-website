CREATE TABLE IF NOT EXISTS sessions_live (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    referrer TEXT NOT NULL,
    user_agent TEXT NOT NULL,
    browser TEXT,
    os TEXT,
    country TEXT,
    city TEXT,
    theme TEXT NOT NULL,
    device_type TEXT,
    aggregated_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_session_created_at ON sessions_live (created_at);

CREATE TABLE IF NOT EXISTS sessions_monthly (
    month TEXT PRIMARY KEY,
    counter INTEGER NOT NULL DEFAULT 0
    -- aggregated monthly from sessions_live
);

CREATE TABLE IF NOT EXISTS referrers_total (
    referrer TEXT PRIMARY KEY,
    counter INTEGER NOT NULL DEFAULT 0
    -- aggregated instantly from sessions_live
);

CREATE TABLE IF NOT EXISTS browsers_total (
    browser TEXT PRIMARY KEY,
    counter INTEGER NOT NULL DEFAULT 0
    -- aggregated instantly from sessions_live
);

CREATE TABLE IF NOT EXISTS os_total (
    os TEXT PRIMARY KEY,
    counter INTEGER NOT NULL DEFAULT 0
    -- aggregated instantly from sessions_live
);

CREATE TABLE IF NOT EXISTS countries_total (
    country TEXT PRIMARY KEY,
    counter INTEGER NOT NULL DEFAULT 0
    -- aggregated instantly from sessions_live
);

CREATE TABLE IF NOT EXISTS themes_total (
    theme TEXT PRIMARY KEY,
    counter INTEGER NOT NULL DEFAULT 0
    -- aggregated instantly from sessions_live
);

CREATE TABLE IF NOT EXISTS device_types_total (
    device_type TEXT PRIMARY KEY,
    counter INTEGER NOT NULL DEFAULT 0
    -- aggregated instantly from sessions_live
);

CREATE TRIGGER IF NOT EXISTS update_aggregates AFTER INSERT ON sessions_live FOR EACH ROW BEGIN
-- referrer
INSERT INTO
    referrers_total (referrer, counter)
VALUES
    (NEW.referrer, 1) ON CONFLICT (referrer) DO
UPDATE
SET
    counter = counter + 1;

-- browser
INSERT INTO
    browsers_total (browser, counter)
SELECT
    NEW.browser,
    1
WHERE
    NEW.browser IS NOT NULL ON CONFLICT (browser) DO
UPDATE
SET
    counter = counter + 1;

-- os
INSERT INTO
    os_total (os, counter)
SELECT
    NEW.os,
    1
WHERE
    NEW.os IS NOT NULL ON CONFLICT (os) DO
UPDATE
SET
    counter = counter + 1;

-- country
INSERT INTO
    countries_total (country, counter)
SELECT
    NEW.country,
    1
WHERE
    NEW.country IS NOT NULL ON CONFLICT (country) DO
UPDATE
SET
    counter = counter + 1;

-- theme
INSERT INTO
    themes_total (theme, counter)
SELECT
    NEW.theme,
    1
WHERE
    NEW.theme IS NOT NULL ON CONFLICT (theme) DO
UPDATE
SET
    counter = counter + 1;

-- device type
INSERT INTO
    device_types_total (device_type, counter)
SELECT
    NEW.device_type,
    1
WHERE
    NEW.device_type IS NOT NULL ON CONFLICT (device_type) DO
UPDATE
SET
    counter = counter + 1;

END;

CREATE TABLE IF NOT EXISTS visits_live (
    id INTEGER PRIMARY KEY,
    -- session_id is no formal foreign key because we cannot
    -- guarantee that the visit is tracked after the session
    session_id TEXT NOT NULL,
    path TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    aggregated_at TEXT,
    UNIQUE (session_id, path)
);

CREATE INDEX IF NOT EXISTS idx_visit_created_at ON visits_live (created_at);

CREATE INDEX IF NOT EXISTS idx_visit_session_id ON visits_live (session_id);

CREATE TABLE IF NOT EXISTS visits_monthly (
    id INTEGER PRIMARY KEY,
    month TEXT NOT NULL,
    path TEXT NOT NULL,
    counter INTEGER NOT NULL DEFAULT 0,
    UNIQUE (month, path)
    -- aggregated monthly from visits_live
);