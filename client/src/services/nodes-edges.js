import api from "./api.js";

export default async function getData({ id }) {
  let initialNodes = [];
  let initialEdges = [];
  try {
    const response = await api.get(`/projects/${id}`);

    if (response) {
      const children = response.data[0].steps;


      // Mapping nodes
      initialNodes = children.nodes.map((item) => {
        const nodeId = item.nodeId ? item.nodeId.toString() : null;
        if (nodeId) {
          return {
            id: nodeId,
            // Passing item object in the custom-node
            data: { label: JSON.stringify(item) || { project: "stepx", language: "python" } },
            position: { x: 0, y: parseInt(nodeId) * 100 }, // Set default position
            draggable: false,
            resizing: true,
            nodeType: "group",
          };
        }
        return null; // Filter out invalid nodes
      }).filter(Boolean); // Remove null entries

      // Mapping edges (with deduplication)
      const edgeKeys = new Set();
      initialEdges = children.edges.map((item) => {
        const source = item.source;
        const target = item.target;

        if (source && target) {
          const key = `${source}-${target}`;
          if (edgeKeys.has(key)) return null; // Skip duplicates
          edgeKeys.add(key);

          return {
            id: key,
            source: source,
            target: target,
            type: "smoothstep",
            markerEnd: { type: "arrowclosed" },
            style: { stroke: "#cbd5e1", strokeWidth: 2 }
          };
        }
        return null; // Filter out invalid edges
      }).filter(Boolean); // Remove null entries

      return { initialNodes, initialEdges };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
