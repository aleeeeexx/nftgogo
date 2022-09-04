#!/bin/sh

set -e

su-exec nonroot mkdir -p prometheus_data

if [[ "$1" = "test_app" ]]; then
    su-exec nonroot do something

elif [[ "$1" = "prod_app" ]]; then
    su-exec nonroot do something

fi

exec "$@"
