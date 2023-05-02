#!/usr/bin/env sh

trap 'exit' ERR

BASE=$(pwd)
for test_file in $(find python -name testsuite.py) 
do
    python3 -m unittest ${test_file}
done
