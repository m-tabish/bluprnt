export function parseMicroDsl(rawDslString) {
    const nodes = [];
    const edges = [];
    let description = "";
    let tags = [];
    const lines = rawDslString.split(/\r?\n/);
    let currentElement = null;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        if (trimmed.startsWith("DESCRIPTION:")) {
            description = trimmed.substring("DESCRIPTION:".length).trim();
        } else if (trimmed.startsWith("TAGS:")) {
            const tagsString = trimmed.substring("TAGS:".length).trim();
            tags = tagsString.split("|").map(t => t.trim()).filter(Boolean);
        } else if (trimmed.startsWith("NODE")) {
            const match = trimmed.match(/^NODE\s+(\w+)\s+(\w+)\s+"([^"]+)"/i);
            if (match) {
                const [_, nodeId, type, process] = match;
                currentElement = {
                    nodeId,
                    type,
                    process,
                    label: process,
                    description: '',
                    code: '',
                    resources: [],
                    target: []
                };
                nodes.push(currentElement);
            }
        } else if (trimmed.startsWith("d:")) {
            if (currentElement) {
                currentElement.description = trimmed.substring(2).trim();
            }
        } else if (trimmed.startsWith("c:")) {
            if (currentElement) {
                currentElement.code = trimmed.substring(2).trim();
            }
        } else if (trimmed.startsWith("r:")) {
            if (currentElement) {
                currentElement.resources = trimmed.substring(2).trim()
                    .split(',')
                    .map(url => url.trim())
                    .filter(Boolean);
            }
        } else if (trimmed.startsWith("EDGE")) {
            const match = trimmed.match(/^EDGE\s+(\w+)\s*->\s*(\w+)\s+"([^"]+)"/i);
            if (match) {
                const [_, source, target, label] = match;
                edges.push({
                    source,
                    target,
                    label
                });
            }
        }
    });

    nodes.forEach((node, index) => {
        node.target = edges
            .filter(edge => edge.source === node.nodeId)
            .map(edge => edge.target);

        node.position = {
            x: (index % 3) * 350,
            y: Math.floor(index / 3) * 200
        };
    });

    return { nodes, edges, description, tags };
}
