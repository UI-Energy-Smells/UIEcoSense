# Change directory to the current directory print the current directory
cd "$(dirname "$0")"
echo "Current directory: $(pwd)"

# Clear all files in test_json
rm -rf ./test_json/*

# Clear all files in report/docs/report/test_json
rm -rf ./report/docs/report/test_json/*

# Check whether the directory exists ortherwise create it
if [ ! -d "./test_json" ]; then
  mkdir -p "./test_json"
fi

# Check whether the directory exists ortherwise create it
if [ ! -d "./report/docs/report/test_json" ]; then
  mkdir -p "./report/docs/report/test_json"
fi

# Run main.js
node main.js

# Clear all files in report/docs/report/test_json
rm -rf ./report/docs/report/test_json/*

# Copy all files in test_json to report/docs/report/test_json
cp -r ./test_json/* ./report/docs/report/test_json/

# Change directory to report/docs/report
cd ./report/docs/report

# Run script to generate report
python gen_smell_report.py

# Change directory report
cd ../../../
cd ./report

# Run mkdocs serve
mkdocs serve
