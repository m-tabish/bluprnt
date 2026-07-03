export function getPrompt({ projectName, projectDescription, language }) {
    return `You are an expert backend systems architect.
Generate a structured, non-linear backend system architecture and software roadmap for:
- Project Name: ${projectName}
- Project Description: ${projectDescription}
- Main Language/Technology: ${language}

### GRAPH LAYOUT & STRUCTURE RULES:
1. The graph MUST represent a clean hierarchical tree or Directed Acyclic Graph (DAG) branching out from a single root node (e.g., API Gateway or Client Entrypoint).
2. **NO DUPLICATE OR PARALLEL EDGES**: Do not define more than one edge between the same two nodes.
3. **NO BYPASS EDGES**: Avoid redundant direct connections. For example, if node A connects to node B, and B connects to C, do not connect A directly to C unless there is an actual direct secondary interaction.
4. Every node MUST have a unique ID using the format 'n1', 'n2', 'n3', etc.
5. Every edge's 'source' and 'target' MUST strictly match an existing node's 'nodeId'. Do not create dangling edges.

### HARD CONSTRAINTS:
1. **NODE COUNT**: You MUST generate at least 10 to 15 distinct, logical architectural components/nodes. Do not stop early.
2. Do NOT include deployment, DevOps, or monitoring nodes (e.g., Docker, Kubernetes, CI/CD, Prometheus). Focus strictly on application-level backend architecture (e.g., Auth Service, Processing Workers, Cache, Search Index, Databases).
3. For each node/step:
   - Provide a short, clear description of the component's role.
   - Provide 5 to 10 lines of real, syntactically correct code in ${language} showing how to configure or use that specific component (e.g. database schema definition, route controller, queue consumer configuration). Do not use mock comments or empty placeholders.
   - Provide 1 to 2 realistic official documentation URLs under 'resources' (e.g. https://expressjs.com, https://redis.io/docs).

4. The overall JSON structure must adhere to:
   - 'technologies': array of max 4 primary technologies.
   - 'description': short summary of the generated architecture.
   - 'steps': containing 'nodes' and 'edges'.
`;
}
