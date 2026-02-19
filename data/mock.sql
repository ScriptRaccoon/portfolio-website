-- -----------------------
-- sessions_live (10)
-- -----------------------
INSERT
OR REPLACE INTO sessions_live (id, created_at, referrer, user_agent, browser, os, country, city, theme, aggregated_at)
VALUES
    (
        'sess_1',
        '2026-01-05 10:12:00',
        'https://google.com',
        'Mozilla/5.0 (...) Chrome/121.0',
        'Chrome',
        'macOS',
        'DE',
        'Berlin',
        'dark',
        NULL
    ),
    (
        'sess_2',
        '2026-01-07 14:22:10',
        'https://bing.com',
        'Mozilla/5.0 (...) Firefox/122.0',
        'Firefox',
        'Windows',
        'US',
        'New York',
        'light',
        NULL
    ),
    (
        'sess_3',
        '2026-01-15 09:03:44',
        'https://twitter.com',
        'Mozilla/5.0 (...) Safari/17.0',
        'Safari',
        'iOS',
        'FR',
        'Paris',
        'dark',
        NULL
    ),
    (
        'sess_4',
        '2026-02-02 18:45:21',
        'https://news.ycombinator.com',
        'Mozilla/5.0 (...) Chrome/121.0',
        'Chrome',
        'Linux',
        'NL',
        'Amsterdam',
        'light',
        NULL
    ),
    (
        'sess_5',
        '2026-02-11 07:55:02',
        'https://reddit.com',
        'Mozilla/5.0 (...) Firefox/122.0',
        'Firefox',
        'Android',
        'GB',
        'London',
        'dark',
        NULL
    ),
    (
        'sess_6',
        '2026-02-19 20:14:33',
        'https://duckduckgo.com',
        'Mozilla/5.0 (...) Edge/121.0',
        'Edge',
        'Windows',
        'CA',
        'Toronto',
        'light',
        NULL
    ),
    (
        'sess_7',
        '2026-03-01 12:00:00',
        'https://google.com',
        'Mozilla/5.0 (...) Chrome/121.0',
        'Chrome',
        'macOS',
        'DE',
        'Munich',
        'dark',
        NULL
    ),
    (
        'sess_8',
        '2026-03-05 16:30:45',
        'https://linkedin.com',
        'Mozilla/5.0 (...) Safari/17.0',
        'Safari',
        'macOS',
        'US',
        'San Francisco',
        'light',
        NULL
    ),
    (
        'sess_9',
        '2026-03-09 11:11:11',
        'https://reddit.com',
        'Mozilla/5.0 (...) Firefox/122.0',
        'Firefox',
        'Linux',
        'SE',
        'Stockholm',
        'dark',
        NULL
    ),
    (
        'sess_10',
        '2026-03-10 08:08:08',
        'https://google.com',
        'Mozilla/5.0 (...) Chrome/121.0',
        'Chrome',
        'Windows',
        'DE',
        'Hamburg',
        'light',
        NULL
    ),
    (
        'sess_11',
        '2026-03-11 09:10:11',
        'https://google.com',
        'Mozilla/5.0 (...) Chrome/122.0',
        'Chrome',
        'Windows',
        'DE',
        'Cologne',
        'dark',
        NULL
    ),
    (
        'sess_12',
        '2026-03-11 09:15:42',
        'https://reddit.com',
        'Mozilla/5.0 (...) Firefox/123.0',
        'Firefox',
        'Linux',
        'US',
        'Austin',
        'light',
        NULL
    ),
    (
        'sess_13',
        '2026-03-11 10:01:03',
        'https://twitter.com',
        'Mozilla/5.0 (...) Safari/17.1',
        'Safari',
        'macOS',
        'FR',
        'Lyon',
        'dark',
        NULL
    ),
    (
        'sess_14',
        '2026-03-11 10:33:27',
        'https://news.ycombinator.com',
        'Mozilla/5.0 (...) Chrome/122.0',
        'Chrome',
        'macOS',
        'NL',
        'Rotterdam',
        'light',
        NULL
    ),
    (
        'sess_15',
        '2026-03-11 11:45:55',
        'https://google.com',
        'Mozilla/5.0 (...) Edge/122.0',
        'Edge',
        'Windows',
        'GB',
        'Manchester',
        'dark',
        NULL
    ),
    (
        'sess_16',
        '2026-03-11 12:12:12',
        'https://bing.com',
        'Mozilla/5.0 (...) Chrome/122.0',
        'Chrome',
        'Android',
        'ES',
        'Madrid',
        'light',
        NULL
    ),
    (
        'sess_17',
        '2026-03-11 13:00:00',
        'https://duckduckgo.com',
        'Mozilla/5.0 (...) Firefox/123.0',
        'Firefox',
        'Windows',
        'IT',
        'Rome',
        'dark',
        NULL
    ),
    (
        'sess_18',
        '2026-03-11 13:44:21',
        'https://linkedin.com',
        'Mozilla/5.0 (...) Safari/17.1',
        'Safari',
        'iOS',
        'SE',
        'Gothenburg',
        'light',
        NULL
    ),
    (
        'sess_19',
        '2026-03-11 14:22:08',
        'https://google.com',
        'Mozilla/5.0 (...) Chrome/122.0',
        'Chrome',
        'Linux',
        'PL',
        'Warsaw',
        'dark',
        NULL
    ),
    (
        'sess_20',
        '2026-03-11 15:05:19',
        'https://reddit.com',
        'Mozilla/5.0 (...) Firefox/123.0',
        'Firefox',
        'macOS',
        'DE',
        'Stuttgart',
        'light',
        NULL
    ),
    (
        'sess_21',
        '2026-03-11 15:45:45',
        'https://google.com',
        'Mozilla/5.0 (...) Chrome/122.0',
        'Chrome',
        'Windows',
        'US',
        'Seattle',
        'dark',
        NULL
    ),
    (
        'sess_22',
        '2026-03-11 16:01:09',
        'https://twitter.com',
        'Mozilla/5.0 (...) Edge/122.0',
        'Edge',
        'Windows',
        'CA',
        'Vancouver',
        'light',
        NULL
    ),
    (
        'sess_23',
        '2026-03-11 16:33:33',
        'https://bing.com',
        'Mozilla/5.0 (...) Chrome/122.0',
        'Chrome',
        'macOS',
        'CH',
        'Zurich',
        'dark',
        NULL
    ),
    (
        'sess_24',
        '2026-03-11 17:10:10',
        'https://news.ycombinator.com',
        'Mozilla/5.0 (...) Firefox/123.0',
        'Firefox',
        'Linux',
        'AT',
        'Vienna',
        'light',
        NULL
    ),
    (
        'sess_25',
        '2026-03-11 17:55:55',
        'https://google.com',
        'Mozilla/5.0 (...) Safari/17.1',
        'Safari',
        'iOS',
        'DK',
        'Copenhagen',
        'dark',
        NULL
    ),
    (
        'sess_26',
        '2026-03-11 18:12:34',
        'https://reddit.com',
        'Mozilla/5.0 (...) Chrome/122.0',
        'Chrome',
        'Android',
        'NO',
        'Oslo',
        'light',
        NULL
    ),
    (
        'sess_27',
        '2026-03-11 18:44:44',
        'https://duckduckgo.com',
        'Mozilla/5.0 (...) Firefox/123.0',
        'Firefox',
        'Windows',
        'FI',
        'Helsinki',
        'dark',
        NULL
    ),
    (
        'sess_28',
        '2026-03-11 19:20:20',
        'https://google.com',
        'Mozilla/5.0 (...) Chrome/122.0',
        'Chrome',
        'macOS',
        'BE',
        'Brussels',
        'light',
        NULL
    ),
    (
        'sess_29',
        '2026-03-11 19:59:59',
        'https://linkedin.com',
        'Mozilla/5.0 (...) Edge/122.0',
        'Edge',
        'Windows',
        'IE',
        'Dublin',
        'dark',
        NULL
    ),
    (
        'sess_30',
        '2026-03-11 20:30:30',
        'https://twitter.com',
        'Mozilla/5.0 (...) Firefox/123.0',
        'Firefox',
        'Linux',
        'PT',
        'Lisbon',
        'light',
        NULL
    );

-- -----------------------
-- sessions_monthly (3)
-- -----------------------
INSERT
OR REPLACE INTO sessions_monthly (month, counter)
VALUES
    ('2026-01', 42),
    ('2026-02', 37),
    ('2026-03', 58);

-- -----------------------
-- referrers_total (5)
-- -----------------------
INSERT
OR REPLACE INTO referrers_total (referrer, counter)
VALUES
    ('https://google.com', 120),
    ('https://reddit.com', 45),
    ('https://twitter.com', 18),
    ('https://bing.com', 12),
    ('https://duckduckgo.com', 9);

-- -----------------------
-- browsers_total (4)
-- -----------------------
INSERT
OR REPLACE INTO browsers_total (browser, counter)
VALUES
    ('Chrome', 150),
    ('Firefox', 60),
    ('Safari', 40),
    ('Edge', 15);

-- -----------------------
-- os_total (5)
-- -----------------------
INSERT
OR REPLACE INTO os_total (os, counter)
VALUES
    ('Windows', 110),
    ('macOS', 95),
    ('Linux', 35),
    ('iOS', 25),
    ('Android', 30);

-- -----------------------
-- countries_total (6)
-- -----------------------
INSERT
OR REPLACE INTO countries_total (country, counter)
VALUES
    ('DE', 130),
    ('US', 90),
    ('FR', 25),
    ('GB', 40),
    ('CA', 22),
    ('NL', 18);

-- -----------------------
-- themes_total (2)
-- -----------------------
INSERT
OR REPLACE INTO themes_total (theme, counter)
VALUES
    ('light', 140),
    ('dark', 160);

-- -----------------------
-- visits_live (10)
-- -----------------------
INSERT
OR REPLACE INTO visits_live (id, session_id, path, created_at, aggregated_at)
VALUES
    (1, 'sess_1', '/', '2026-01-05 10:12:05', NULL),
    (2, 'sess_1', '/blog', '2026-01-05 10:13:10', NULL),
    (3, 'sess_2', '/', '2026-01-07 14:22:15', NULL),
    (4, 'sess_3', '/projects', '2026-01-15 09:04:10', NULL),
    (5, 'sess_4', '/', '2026-02-02 18:46:00', NULL),
    (6, 'sess_5', '/blog', '2026-02-11 07:56:00', NULL),
    (7, 'sess_6', '/contact', '2026-02-19 20:15:00', NULL),
    (8, 'sess_7', '/', '2026-03-01 12:00:10', NULL),
    (9, 'sess_8', '/projects', '2026-03-05 16:31:00', NULL),
    (10, 'sess_9', '/blog', '2026-03-09 11:12:00', NULL);

-- -----------------------
-- visits_monthly (6)
-- -----------------------
INSERT
OR REPLACE INTO visits_monthly (id, month, path, counter)
VALUES
    (1, '2026-01', '/', 20),
    (2, '2026-01', '/blog', 15),
    (3, '2026-02', '/', 18),
    (4, '2026-02', '/contact', 9),
    (5, '2026-03', '/', 25),
    (6, '2026-03', '/projects', 12);