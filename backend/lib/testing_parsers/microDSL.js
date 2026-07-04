 

export const parseMicroDsl = (rawDslString) => {
    const nodes = [];
    const edges = [];
    const lines = rawDslString.split('\n');
    let currentElement = null;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('NODE')) {
            const [_, id, type, label] = trimmed.match(/NODE (\w+) (\w+) "([^"]+)"/) || [];
            currentElement = { id, type, data: { label, code: '' }, position: { x: 0, y: 0 } };
            nodes.push(currentElement);
        } else if (trimmed.startsWith('c:')) {
            if (currentElement) currentElement.data.code = trimmed.replace('c:', '').trim();
        } else if (trimmed.startsWith('EDGE')) {
            const [_, source, target, label] = trimmed.match(/EDGE (\w+) -> (\w+) "([^"]+)"/) || [];
            edges.push({ id: `e-${source}-${target}`, source, target, label, type: 'smoothstep' });
        }
    });

    console.log(nodes, edges);
    // Apply a basic layout offset to positions here before returning
    return { nodes, edges };
}  