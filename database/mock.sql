-- -----------------------
-- sessions_live
-- -----------------------
INSERT
OR REPLACE INTO sessions_live (
    id,
    created_at,
    referrer,
    user_agent,
    browser,
    os,
    country,
    theme,
    device_type,
    aggregated_at
)
VALUES
    (
        '550e8400-e29b-41d4-a716-446655440001',
        '2026-02-20 10:01:00',
        'https://google.com',
        'UA1',
        'Chrome',
        'Windows',
        'Germany',
        'dark',
        'desktop',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440002',
        '2026-02-20 10:05:12',
        'https://bing.com',
        'UA2',
        'Firefox',
        'Linux',
        'Germany',
        'light',
        'desktop',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440003',
        '2026-02-20 10:08:44',
        'https://twitter.com',
        'UA3',
        'Safari',
        'macOS',
        'France',
        'dark',
        'desktop',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440004',
        '2026-02-20 10:15:09',
        'https://reddit.com',
        'UA4',
        'Edge',
        'Windows',
        'United States',
        'light',
        'desktop',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440005',
        '2026-02-20 10:18:33',
        'unknown',
        'UA5',
        'Chrome',
        'Android',
        'Germany',
        'dark',
        'mobile',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440006',
        '2026-02-20 10:21:17',
        'https://news.ycombinator.com',
        'UA6',
        'Safari',
        'iOS',
        'United States',
        'light',
        'mobile',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440007',
        '2026-02-20 10:25:42',
        'https://linkedin.com',
        'UA7',
        'Chrome',
        'Windows',
        'India',
        'dark',
        'desktop',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440008',
        '2026-02-20 10:29:58',
        'https://facebook.com',
        'UA8',
        'Chrome',
        'Android',
        'Brazil',
        'light',
        'mobile',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440009',
        '2026-02-20 10:34:11',
        'https://google.com',
        'UA9',
        'Firefox',
        'Windows',
        'Canada',
        'dark',
        'desktop',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440010',
        '2026-02-20 10:39:26',
        'unknown',
        'UA10',
        'Safari',
        'macOS',
        'United Kingdom',
        'light',
        'desktop',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440011',
        '2026-02-20 10:44:02',
        'https://duckduckgo.com',
        'UA11',
        'Chrome',
        'Android',
        'Spain',
        'dark',
        'mobile',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440012',
        '2026-02-20 10:48:37',
        'https://instagram.com',
        'UA12',
        'Safari',
        'iOS',
        'Italy',
        'light',
        'mobile',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440013',
        '2026-02-20 10:52:55',
        'https://google.com',
        'UA13',
        'Edge',
        'Windows',
        'Netherlands',
        'dark',
        'desktop',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440014',
        '2026-02-20 10:57:19',
        'unknown',
        'UA14',
        'Firefox',
        'Linux',
        'Sweden',
        'light',
        'desktop',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440015',
        '2026-02-20 11:01:43',
        'https://reddit.com',
        'UA15',
        'Chrome',
        'ChromeOS',
        'United States',
        'dark',
        'desktop',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440016',
        '2026-02-20 11:05:28',
        'https://youtube.com',
        'UA16',
        'Safari',
        'iOS',
        'Japan',
        'light',
        'mobile',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440017',
        '2026-02-20 11:09:14',
        'https://google.com',
        'UA17',
        'Chrome',
        'Android',
        'Australia',
        'dark',
        'mobile',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440018',
        '2026-02-20 11:13:50',
        'https://bing.com',
        'UA18',
        'Edge',
        'Windows',
        'South Africa',
        'light',
        'desktop',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440019',
        '2026-02-20 11:18:22',
        'unknown',
        'UA19',
        'Firefox',
        'Linux',
        'Switzerland',
        'dark',
        'desktop',
        NULL
    ),
    (
        '550e8400-e29b-41d4-a716-446655440020',
        '2026-02-20 11:22:47',
        'https://news.ycombinator.com',
        'UA20',
        'Chrome',
        'Android',
        'Singapore',
        'light',
        'mobile',
        NULL
    );

-- -----------------------
-- sessions_monthly
-- -----------------------
INSERT
OR REPLACE INTO sessions_monthly (month, counter)
VALUES
    ('2026-01', 42),
    ('2026-02', 37),
    ('2026-03', 58);

-- -----------------------
-- visits_live
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
-- visits_monthly
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