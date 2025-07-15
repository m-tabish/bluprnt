/* eslint-disable no-unused-vars */
import CustomNode from '@/components/Custom-node';
import getData from '@/Flow/nodes-edges';
import {
    addEdge,
    Background,
    ConnectionLineType,
    Controls,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import "../App.css";
// Function to layout nodes and edges using Dagre
import { TypographyH1 } from '@/components/ui/typography';
const nodeWidth = 1000;
const nodeHeight = 100;
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph();
    const isHorizontal = direction === 'LR';

    dagreGraph.setGraph({ rankdir: direction });
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });
    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    let maxY = 0;
    const layoutedNodes = nodes.map((node) => {
        const { x, y } = dagreGraph.node(node.id);
        if (y > maxY) maxY = y;

        return {
            ...node,
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',
            position: {
                x: x - nodeWidth / 2 + 50,
                y: y - nodeHeight / 2,
            },
            type: 'customNode',
        };
    });

    const totalHeight = maxY + nodeHeight; // Add some margin if needed

    return { nodes: layoutedNodes, edges, height: totalHeight };
};


const Map = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
    const [flowHeight, setFlowHeight] = useState(1000);
    const serverURL = useSelector(state => state.serverURL)
    const [bluprnts, setBluprnts] = useState([])
    useEffect(() => {


        const fetchData = async () => {

            // custom node label

            const projects = await getData({ serverURL, id });
            setBluprnts(projects)
            const { initialNodes, initialEdges } = projects;
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);
            setNodes(layoutedNodes);
            setEdges(layoutedEdges);
            setLoading(false);
        };
        fetchData();

    }, [setNodes, setEdges]);



    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge(
                    { ...params, type: ConnectionLineType.SmoothStep, animated: true },
                    eds
                )
            ),
        [setEdges]
    );

    const onLayout = useCallback(
        (direction) => {
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, direction);
            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);
        },
        [edges, nodes, setEdges, setNodes]
    );
    let selectedProject = ""
    if (Array.isArray(bluprnts)) { selectedProject = bluprnts.find(project => project._id === id); }
    return (
        <div className='w-screen bluprnt-background overflow-x-auto overflow-y-auto pt-20 flex flex-col justify-center items-center'>
            <div className=' w-[90vw]  max-w-full pt-10 pb-2 mb-5  border-neutral-400 border-b-4' style={{ height: `${flowHeight}px`, }}>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    connectionLineType={ConnectionLineType.SmoothStep}

                    snapToGrid={true}
                    fitView
                    fitViewOptions={{
                        padding: 0,
                        includeHiddenNodes: false,
                        minZoom: 0,
                        maxZoom: 1,
                        duration: 200,
                    
                    }}

                    panOnDrag={true}
                    preventScrolling={false}
                    zoomOnScroll={false}
                    panOnScroll={false}
                    translateExtent={[[-1000, -1000], [3000, 3000]]}

                    style={{ background: 'transparent' }}
                    nodeTypes={nodeTypes}
                >
                    <Background bgColor='transparent' color="#fff" variant='none' />
                    <Controls position="top-left" orientation='vertical'></Controls>
                </ReactFlow>
            </div >
            <div className='w-screen h-screen text-white pt-20'>
                <TypographyH1>
                    ProjectName
                </TypographyH1>
            </div>
        </div >
    );
};

export default function ShowMap() {
    return (
        <ReactFlowProvider initialHeight={1500}>
            <Map />
        </ReactFlowProvider>
    );
}
