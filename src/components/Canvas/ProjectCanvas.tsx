import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { TaskNode } from '../TaskNode/TaskNode';

interface ProjectCanvasProps {
  readOnly?: boolean;
  nodes: Node[];
  edges: Edge[];
}

export const ProjectCanvas: React.FC<ProjectCanvasProps> = ({
  readOnly = false,
  nodes,
  edges,
}) => {
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      if (!readOnly) {
        applyNodeChanges(changes, nodes);
      }
    },
    [readOnly, nodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      if (!readOnly) {
        applyEdgeChanges(changes, edges);
      }
    },
    [readOnly, edges]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!readOnly) {
        addEdge(connection, edges);
      }
    },
    [readOnly, edges]
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodeTypes={{ task: TaskNode }}
        nodes={nodes}
        edges={edges}
        onNodesChange={readOnly ? undefined : onNodesChange}
        onEdgesChange={readOnly ? undefined : onEdgesChange}
        onConnect={readOnly ? undefined : onConnect}
        fitView
        nodesDraggable={!readOnly}
        nodesConnectable={!readOnly}
        elementsSelectable={!readOnly}
        proOptions={{ hideAttribution: true }}
      >
        <MiniMap />
        <Controls showInteractive={!readOnly} />
        <Background />
      </ReactFlow>
    </div>
  );
};
