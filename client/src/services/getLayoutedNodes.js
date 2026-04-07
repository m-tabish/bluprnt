import dagre from 'dagre';

const nodeWidth = 1000;
const nodeHeight = 100;

// Function to layout nodes and edges using Dagre
export const getLayoutedElements = (nodes, edges,) => {
    const direction = "TB"
    const dagreGraph = new dagre.graphlib.Graph();
    const isHorizontal = direction === 'LR';

    dagreGraph.setGraph({ rankdir: "TB" });
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });
    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);

        return {
            ...node,
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
            type: 'customNode'
        };
    });

    return { nodes: layoutedNodes, edges };
};
