import { useState } from "react";
import Node from "./Node";

function NodeContainer() {
    const nodes = [
        { id: 1, bodyHead: "Node 1", bodyText: "This is Node 1" }, 
    ];

    const [activeNodeId, setActiveNodeId] = useState(null);

    return (
        <div className="flex gap-6 p-4">
            {nodes.map((node) => (
                <Node
                    key={node.id}
                    bodyHead={node.bodyHead}
                    bodyText={node.bodyText}
                    isActive={activeNodeId === node.id}
                    onClick={() => setActiveNodeId(node.id)}
                />
            ))}
        </div>
    );
}

export default NodeContainer;
