#!/bin/bash

CREATE_TABLES="/tmp/create_tables.sql"
CREATE_DATA="/tmp/create_data.sql"

psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f "$CREATE_TABLES"
psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f "$CREATE_DATA"
