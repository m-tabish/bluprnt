import YAML from "yaml";

import fs from 'fs';
const rawYamlString = fs.readFileSync('./sample.yml', 'utf8');
const parsedData = YAML.parse(rawYamlString);

// Verify the code block parsed correctly with all formatting intact
console.log("Database Code Node:");
console.log(JSON.stringify(parsedData));