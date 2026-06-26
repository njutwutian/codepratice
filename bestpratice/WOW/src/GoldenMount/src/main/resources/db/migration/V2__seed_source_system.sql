INSERT INTO gm_source_system (source_code, source_name, source_status)
SELECT 'SIMULATOR_A', 'SecretPalace Simulator', 'ACTIVE'
WHERE NOT EXISTS (
    SELECT 1 FROM gm_source_system WHERE source_code = 'SIMULATOR_A'
);

INSERT INTO gm_source_system (source_code, source_name, source_status)
SELECT 'MANUAL_PORTAL', 'NorthToward Portal', 'ACTIVE'
WHERE NOT EXISTS (
    SELECT 1 FROM gm_source_system WHERE source_code = 'MANUAL_PORTAL'
);