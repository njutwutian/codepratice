CREATE TABLE gm_source_system (
    id BIGINT NOT NULL AUTO_INCREMENT,
    source_code VARCHAR(64) NOT NULL,
    source_name VARCHAR(128) NOT NULL,
    source_status VARCHAR(32) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_gm_source_system_code (source_code)
);

CREATE TABLE gm_event_record (
    id BIGINT NOT NULL AUTO_INCREMENT,
    request_id VARCHAR(64) NOT NULL,
    source_id BIGINT NOT NULL,
    source_code VARCHAR(64) NOT NULL,
    event_type VARCHAR(64) NOT NULL,
    event_status VARCHAR(32) NOT NULL,
    event_time TIMESTAMP NOT NULL,
    payload_count INT NOT NULL,
    payload_summary VARCHAR(512),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_gm_event_record_request_id (request_id),
    KEY idx_event_source_code (source_code),
    KEY idx_event_time (event_time),
    CONSTRAINT fk_event_source_id FOREIGN KEY (source_id) REFERENCES gm_source_system(id)
);