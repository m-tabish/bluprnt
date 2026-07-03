import { GoogleGenAI } from "@google/genai";
import { configDotenv } from "dotenv";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { getPrompt } from "./prompt.js";
configDotenv();

const nodeSchema = z.object({
  nodeId: z.string().describe("Unique node identifier."),
  process: z.string().describe("Step title."),
  description: z.string().describe("What this step does."),
  code: z.string().describe("Real code in the specified language (5-10 lines)."),
  resources: z.array(z.string()).describe("Documentation links."),
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
    nodes: z.array(nodeSchema).min(10).describe("List of at least 10 architecture nodes/components."),
    edges: z.array(edgeSchema).min(9).describe("List of connections between components. Must connect the 10+ nodes in a clean tree structure."),
  }),
});

const ai = new GoogleGenAI({ api_key: process.env.GEMINI_API_KEY });

export const generateContent = async (payload) => {
  try { 
    const projectName = payload.projectName || payload.projectname || "Untitled Project";
    const projectDescription = payload.projectDescription || "";
    const language = payload.language || (payload.tags && payload.tags[0]) || "General";

    
    const prompt = getPrompt({ projectName, projectDescription, language });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: zodToJsonSchema(roadmapSchema),
      },
    });

    const roadmap = roadmapSchema.parse(JSON.parse(response.text));

    return roadmap;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};

// old prompt
// const prompt = `
// You are an API that returns ONLY valid JSON.
// Do NOT include explanations, markdown, or comments outside JSON.

// Generate a NON-LINEAR software roadmap with STRICT LIMITS.

// ### HARD CONSTRAINTS (DO NOT VIOLATE):
// - Minimum 15 nodes
// - Maximum 30 nodes
// - Each code block: 5–10 lines ONLY
// - Total output must fit safely in response limits
// - Output MUST be valid JSON
// - Include BOTH nodes AND edges

// ### INPUT
// projectname: ${projectname}
// projectDescription: ${projectDescription}
// language: ${language}

// ### REQUIRED JSON FORMAT
// {
//   "technologies": ["max 4 items"],
//   "description": "short summary",
//   "steps": {
//     "nodes": [
//       {
//         "nodeId": "n1",
//         "process": "Step title",
//         "description": "What this step does",
//         "code": "real ${language} code (5–10 lines)",
//         "resources": [
//           "https://official-docs-homepage.com"
//         ],
//         "target": ["n2", "n3"]
//       }
//     ],
//     "edges": [
//       {
//         "source": "n1",
//         "target": "n2",
//         "label": "depends on"
//       }
//     ]
//   }
// }

// Rules:
// - Nodes must form a tree (not a straight line)
// - No deployment or DevOps steps
// - Use realistic official documentation links
// - JSON must parse without errors
 
// `