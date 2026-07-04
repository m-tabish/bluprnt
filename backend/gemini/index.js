import { GoogleGenAI } from "@google/genai";
import { configDotenv } from "dotenv";
import { z } from "zod";
import { parseMicroDsl } from "../lib/microDslParse.js";
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
console.log(process.env.GEMINI_API_KEY)
export const generateContent = async (payload) => {
  try {
    const projectName = payload.projectName || payload.projectname;
    const projectDescription = payload.projectDescription;
    const language = payload.language || (payload.tags && payload.tags[0]);

    if (!projectName || !projectDescription || !language) {
      throw new Error("Missing information about project")
    }

    const prompt = getPrompt({ projectName, projectDescription, language });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const parseDsl = parseMicroDsl(response.text);

    if (!response.text || !parseDsl.nodes || parseDsl.nodes.length === 0) {
      throw new Error("Failed to generate or parse backend topology nodes");
    }
    return {
      tags: parseDsl.tags && parseDsl.tags.length > 0 ? parseDsl.tags : [language],
      projectDescription: parseDsl.description || projectDescription,
      steps: {
        nodes: parseDsl.nodes,
        edges: parseDsl.edges
      },
      rawResponse: response.text
    }

  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}; 