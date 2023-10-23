# Change directory to the current directory print the current directory
Set-Location $PSScriptRoot
Write-Host "Current directory: $PSScriptRoot"

# Clear all files in test_json
Get-ChildItem -Path "./test_json" -Recurse | Remove-Item -Force -Recurse

# Clear all files in report/docs/report/test_json
Get-ChildItem -Path "./report/docs/report/test_json" -Recurse | Remove-Item -Force -Recurse

# Check whether the directory exists ortherwise create it
if (!(Test-Path "./test_json")) { New-Item -ItemType Directory -Path "./test_json" -Force | Out-Null }

# Check whether the directory exists ortherwise create it
if (!(Test-Path "./report/docs/report/test_json")) { New-Item -ItemType Directory -Path "./report/docs/report/test_json" -Force | Out-Null }

# Run main.js
node main.js

# Copy all files in test_json to report/docs/report/test_json
Copy-Item -Path "./test_json/" -Destination "./report/docs/report/" -Recurse -Force

# Change directory to report/docs/report
Set-Location "./report/docs/report"

# Run script to generate report
python.exe gen_smell_report.py

# Change directory report

Set-Location "..\..\.."
Set-Location "./report"

# Show the location of the report
Write-Host "Report location: $PSScriptRoot"

# Run mkdocs serve
python -m mkdocs serve
