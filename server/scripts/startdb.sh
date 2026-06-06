#!/usr/bin/env bash

source .env
docker pull postgres:18
docker stop postgres-db
docker rm -f postgres-db
docker run --name postgres-db \
	-e POSTGRES_PASSWORD=$DB_PASSWORD \
	-e POSTGRES_USER=$DB_USER \
	-e POSTGRES_DB=$DB_DB \
	-p $DB_PORT:5432 \
	-v $PG_LOCAL_DATA_FOLDER:/var/lib/postgresql/18/docker \
	-d postgres:18
