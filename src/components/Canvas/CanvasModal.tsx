import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { Modal } from 'antd';

interface CanvasModalProps {
  open: boolean;
  onClose: () => void;
}

const initialNodes = [
  { id: '1', position: { x: 50, y: 60 }, data: { label: 'Начало' }, type: 'input' },
  { id: '2', position: { x: 250, y: 200 }, data: { label: 'Ветка 1' } },
  { id: '3', position: { x: 250, y: 320 }, data: { label: 'Ветка 2' } },
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
];

export const CanvasModal: React.FC<CanvasModalProps> = ({ open, onClose }) => (
  <Modal
    open={open}
    onCancel={onClose}
    footer={null}
    width={900}
    bodyStyle={{ height: 540, padding: 0 }}
    title="Холст"
    destroyOnClose
  >
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      fitView
      style={{ width: '100%', height: 520 }}
    >
      <Background />
      <Controls />
    </ReactFlow>
  </Modal>
);
