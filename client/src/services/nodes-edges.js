import api from "./api.js";

export default async function getData({ id }) {
  let initialNodes = [];
  let initialEdges = [];
  const edgeColors = [
    "#facc15", // Neon Yellow
    "#c9c9c9", // black
    "#ff7849", // Neon Orange
    "#4ade80", // Bright Green
    "#f43f5e", // Bright Rose/Red
    "#a5f3fc", // Ice Blue / Light Cyan
    "#c084fc", // Light Lavender
    "#a3e635", // Bright Lime
    "#fda4af", // Light Coral Pink
    "#fed7aa"  // Peach
  ];
  let edgeIndex = 0;
  try {
    const response = await api.get(`/projects/${id}`);

    if (response) {
      const children = response.data[0].steps;


      // Mapping nodes
      initialNodes = children.nodes.map((item) => {
        const nodeId = (item.nodeId || item.id)?.toString() || null;
        if (nodeId) {
          const numericId = parseInt(nodeId.replace(/\D/g, ""), 10) || 0;
          return {
            id: nodeId,
            // Passing item object in the custom-node
            data: { label: JSON.stringify(item) || { project: "stepx", language: "python" } },
            position: { x: 0, y: numericId * 100 }, // Set default position
            draggable: true,
            resizing: true,
            nodeType: "group",
          };
        }
        return null;
      }).filter(Boolean);

      // Mapping edges (with bidirectional merging)
      const edgeKeys = new Map();
      const edgesTemp = [];
      children.edges.forEach((item) => {
        const source = item.source || item.src || item.s;
        const target = item.target || item.tgt || item.t;

        if (source && target) {
          // Sort keys alphabetically to match both A->B and B->A
          const sortedKey = [source, target].sort().join("-");

          if (edgeKeys.has(sortedKey)) {
            // Bidirectional connection detected! Merge it.
            const existingEdgeIndex = edgeKeys.get(sortedKey);
            const existingEdge = edgesTemp[existingEdgeIndex];
            const newLabel = item.label || item.lbl || "";

            if (newLabel && existingEdge.label && !existingEdge.label.includes(newLabel)) {
              existingEdge.label = `${existingEdge.label} ⇄ ${newLabel}`;
            }

            // Add arrow marker to the start of the line to make it double-headed
            existingEdge.markerStart = { type: "arrowclosed" };
            return;
          }

          const color = edgeColors[edgeIndex % edgeColors.length];
          edgeIndex++;

          const newEdge = {
            id: `${source}-${target}`,
            source: source,
            target: target,
            label: item.label || item.lbl || "",
            type: "smoothstep",
            animated: true,
            markerEnd: { type: "arrowclosed" },
            style: { stroke: color, strokeWidth: 2 },
            labelStyle: { fill: "#000000", fontSize: 10, fontWeight: 500 },
            labelBgStyle: { fill: color, fillOpacity: 1, rx: 4 },
            labelBgPadding: [6, 4]
          };

          edgesTemp.push(newEdge);
          edgeKeys.set(sortedKey, edgesTemp.length - 1);
        }
      });
      initialEdges = edgesTemp;

      return { initialNodes, initialEdges };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
