const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const nodeSchema = z.object({
  nodeId: z.string().describe("Unique node identifier."),
  process: z.string().describe("Step title."),
  description: z.string().describe("What this step does."),
  code: z.string().describe("Real code in the specified language (5-10 lines)."),
  resources: z.array(z.string()).describe("Documentation links."),
  target: z.array(z.string()).describe("IDs of dependent nodes."),
});

const edgeSchema = z.object({
  source: z.string().describe("Source node ID."),
  target: z.string().describe("Target node ID."),
  label: z.string().describe("Relationship label."),
});

const roadmapSchema = z.object({
  technologies: z.array(z.string()).describe("Max 4 technologies."),
  description: z.string().describe("Short summary."),
  steps: z.object({
    nodes: z.array(nodeSchema),
    edges: z.array(edgeSchema),
  }),
});

const ai = new GoogleGenAI({ api_key: process.env.GEMINI_API_KEY });
console.log(process.env.GEMINI_API_KEY)
const generateContent = async ({ projectname, projectDescription, language }) => {
  try {
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

    const response = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: zodToJsonSchema(roadmapSchema),
      },
    });

    const roadmap = roadmapSchema.parse(JSON.parse(response.text));
    console.log(JSON.stringify(roadmap));
    return roadmap;
  } catch (error) {
    console.error(error.message);
  }
};

const requestBody = {
  projectname: "testing wizard", projectDescription: "   ", language: " javascript"
}
generateContent({ ...requestBody })
module.exports = { generateContent }