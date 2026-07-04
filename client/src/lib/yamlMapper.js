import YAML from 'yaml';

export function mapYamlToReactFlow(rawYamlString) {
    // 1. Parse the YAML string into a Javascript Object
    let parsedData;
    try {
        parsedData = YAML.parse(rawYamlString);
    } catch (error) {
        console.error("Failed to parse YAML:", error);
        return { nodes: [], edges: [] };
    }

    if (!parsedData || !parsedData.nodes || !parsedData.edges) {
        return { nodes: [], edges: [] };
    }

    // 2. Map the minified YAML Nodes to React Flow Nodes
    const nodes = parsedData.nodes.map((node, index) => {
        return {
            id: node.id,
            type: node.t, // Maps your 'gateway', 'compute', etc. to custom node components

            // React Flow requires custom payloads to live inside the 'data' object
            data: {
                label: node.lbl,
                description: node.r, // Mapping 'r' (role) to description
                code: node.c,        // The multi-line code block
                resources: node.urls || []
            },

            // Auto-layout grid so nodes don't stack at (0,0)
            position: {
                x: (index % 3) * 350,
                y: Math.floor(index / 3) * 200
            }
        };
    });

    // 3. Map the minified YAML Edges to React Flow Edges
    const edges = parsedData.edges.map((edge) => {
        return {
            id: edge.id,
            source: edge.s, // 's' becomes 'source'
            target: edge.t, // 't' becomes 'target'
            label: edge.lbl,
            type: 'smoothstep',
            animated: true
        };
    });

    return { nodes, edges };
}