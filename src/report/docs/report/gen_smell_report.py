# Description: Generates a report of the smells in the code

import json
import os

# UI Components for MKDocs
# Generates a table with headers and data.
def table(headers, data):
    table_output = "\n\t"
    table_output += f"| Attributes | Values |"
    table_output += "\n\t"

    table_output += f"| --- | --- |"
    table_output += "\n\t"

    for i in range(1, len(headers)):
        if headers[i] != "Start" and headers[i] != "End":
            table_output += f"| {headers[i]} | {data[1][i-1]} |"
        else:
            table_output += f"| {headers[i]} | **Line:** {data[1][i-1]['line']} , **Column:** {data[1][i-1]['column']} |"
        table_output += "\n\t"

    return table_output

# Generates adomination block
def adomination(atype, content, title):
    return f'\n??? {atype} \"{title}\"\n\t{content}\n'

# Counts the number of occurences of each category and returns a dictionary
def create_graph(data):
    graph_data = {}
    for item in data:
        if item["category"] in graph_data.keys():
            graph_data[item["category"]] += 1
        else:
            graph_data[item["category"]] = 1
    return graph_data

# Generate the report from the json file
def main():
    print("Generating report...")
    current_dir = os.getcwd()
    json_path = os.path.join(current_dir, "test_json", "global.json")
    
    # Check if the global.json exists
    if os.path.exists(json_path):
        print('global.json exists')
    else:
        print('global.json does not exist')
    print(json_path)
    
    # Load the json file
    json_file = open(json_path, "r")
    data = json.load(json_file)
    
    # Sort the data based on category
    data = sorted(data, key=lambda x: x["category"])
    
    # Categories of smells
    categories = ["Inline Style Smell", 
                  "Lazy Loading Smell",
                  "Web Unsafe fonts", 
                  "Unoptimized Images", 
                  "Client Side Logging Smell", 
                  "Async Load Script Smell", 
                  "Anonymous Event Handler Smell"]
    
    # Map the categories to the type of adomination
    dict_map = {
        "Anonymous Event Handler Smell": "danger",
        "Inline Style Smell": "danger",
        "Client Side Logging Smell": "warning",
        "Lazy Loading Smell": "warning",
        "Async Load Script Smell": "warning",
        "Web Unsafe fonts": "tip",
        "Unoptimized Images": "tip",
    }

    # Generate the report from the json file
    final_output = ""
    final_output += "## Category Wise Smells Report\n"
    
    # Based on the category, generate the report
    for category in categories:
        final_output += "\n"
        final_output += f"### {category}\n"
        
        # Count the number of occurences of each category
        final_output += "**Occurences   : **" + \
            str(len([item for item in data if item["category"] == category])) + "\n\n"
        
        # Count the number of unique files for each category
        final_output += "**Unique Files : **" + \
            str(len(set([item["filepath"]
                for item in data if item["category"] == category]))) + "\n"
        
        for item in data:
            # If the category matches, generate based on the type of Smell
            # Attributes depend on the type of Smell
            
            if item["category"] == category:
                if item["category"] == "Unoptimized Images" or item["category"] == "Web Unsafe fonts":
                    table_data = table(["Category", "Filename", "Filepath", "Attributes Type"], [
                                       item["category"], [item["filename"], item["filepath"], item["attributesType"]]])
                    final_output += adomination(
                        dict_map[category], table_data, f"{item['filename']}")
                else:
                    table_data = table(["Category", "Filename", "Filepath", "Start", "End", "Attributes Type"], [
                                       item["category"], [item["filename"], item["filepath"], item["start"], item["end"], item["attributesType"]]])
                    final_output += adomination(dict_map[category], table_data,
                                                f"{item['filename']} - *line: {item['start']['line']}, column: {item['start']['column']}*")

    final_output += "\n---\n"
    
    # Generate file wise report
    final_output += "## File Wise Smells Report\n"
    
    # Sort based on ext and then filename
    data = sorted(data, key=lambda x: (
        x["filename"].split(".")[-1], x["filename"]))

    for file in set([item["filename"] for item in data]):
        smells = [item for item in data if item["filename"] == file]
        final_output += f"### {file}\n"
        final_output += "** Unique Smells: **" + \
            str(len(set([item["category"] for item in smells]))) + "\n"

        for item in smells:
            category = item["category"]
            if item["category"] == "Unoptimized Images" or item["category"] == "Web Unsafe fonts":
                table_data = table(["Category", "Filename", "Filepath", "Attributes Type"], [
                                   item["category"], [item["filename"], item["filepath"], item["attributesType"]]])
                final_output += adomination(dict_map[category],
                                            table_data, f"{item['filename']}")
            else:
                table_data = table(["Category", "Filename", "Filepath", "Start", "End", "Attributes Type"], [
                                   item["category"], [item["filename"], item["filepath"], item["start"], item["end"], item["attributesType"]]])
                final_output += adomination(dict_map[category], table_data,
                                            f"{item['filename']} - *line: {item['start']['line']}, column: {item['start']['column']}*")

    final_output += "\n---\n"
    
    # Copy the template into Analysis Report.md
    with open("template", "r") as template:
        final_output = template.read() + final_output

    open("Analysis Report.md", "w").write(final_output)
    print("Report generated successfully!")

    # -- Generate Category Wise Graphs --
    graph_data = create_graph(data)
    graph_output = "### Category Wise Smells\n\n"
    graph_output += "<div>\n"
    graph_output += "```mermaid\npie showData\n"
    graph_output += "title Smell Category Wise Occurences\n"

    for key in graph_data.keys():
        graph_output += f"\t\"{key}\" : {graph_data[key]}\n"

    graph_output += "```\n"
    graph_output += "</div>\n\n"

    graph_output += "### Graph Data\n"
    graph_output += "\n"
    graph_output += f"| Category | Occurences |\n"
    graph_output += "| --- | --- |\n"
    for key in graph_data.keys():
        graph_output += f"\t| *{key}* | {graph_data[key]} |\n"

    open("Category Graph.md", "w").write(graph_output)
    # -----------------------------------

    # READ ALL THE FILES IN test_json and generate download links for each of them in the report
    download_links = "### Download Links\n"
    download_links += "\n Contains ASTs & SmellsList of all the files and their corresponding smells.\n"
    download_links += "\n"
    download_links += "| File | Link |\n"
    download_links += "| --- | --- |\n"
    # [Subscribe to our newsletter](#){ .md-button }
    for file in os.listdir("test_json"):
        download_links += f"\t| {file} | [Download](test_json\{file}) |\n"

    open("Download Links.md", "w").write(download_links)


if __name__ == "__main__":
    main()
