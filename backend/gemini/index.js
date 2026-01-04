const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateContent({ projectname, projectDescription, language }) {

    const prompt = `
You are an API that returns ONLY valid JSON.
Do NOT include explanations, markdown, or comments outside JSON.

Generate a NON-LINEAR software roadmap with STRICT LIMITS.

### HARD CONSTRAINTS (DO NOT VIOLATE):
- Maximum 30 nodes
- Each code block: 5–10 lines ONLY
- Total output must fit safely in response limits
- Output MUST be valid JSON
- Include BOTH nodes AND edges

### INPUT
projectname: ${projectname}
projectDescription: ${projectDescription}
language: ${language}

### REQUIRED JSON FORMAT
{
  "technologies": ["max 4 items"],
  "description": "short summary",
  "steps": {
    "nodes": [
      {
        "nodeId": "n1",
        "process": "Step title",
        "description": "What this step does",
        "code": "real ${language} code (5–10 lines)",
        "resources": [
          "https://official-docs-homepage.com"
        ],
        "target": ["n2", "n3"]
      }
    ],
    "edges": [
      {
        "source": "n1",
        "target": "n2",
        "label": "depends on"
      }
    ]
  }
}

Rules:
- Nodes must form a tree (not a straight line)
- No deployment or DevOps steps
- Use realistic official documentation links
- JSON must parse without errors
- MAXIMUM 5000 TOKENS OR MORE ONLY IF COMPLETE JSON CAN BE STRICTLY PARSED.
`;

    const model = genAI.getGenerativeModel({
        model: "models/gemini-flash-latest",
        generationConfig: {
            responseMimeType: "application/json",
        }
    });
 
    try {
        const result = await model.generateContent(prompt);
        const response = result.response.text()
        console.log(response)
        return response; // already JSON string
    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
}

module.exports = { generateContent };
