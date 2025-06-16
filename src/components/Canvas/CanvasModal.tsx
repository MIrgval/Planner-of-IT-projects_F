import React, { useEffect, useState } from 'react';
import { Modal, Spin } from 'antd';
import { ProjectCanvas } from '../Canvas/ProjectCanvas';
import { Node, Edge } from 'reactflow';

interface CanvasModalProps {
  open: boolean;
  onClose: () => void;
}

export const CanvasModal: React.FC<CanvasModalProps> = ({ open, onClose }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      setLoading(true);
      import('../../pages/Holst/test-canvas-data.json')
        .then((data) => {
          setNodes(data.nodes || []);
          setEdges(data.edges || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Ошибка загрузки JSON:', err);
          setLoading(false);
        });
    }
  }, [open]);

  return (
    <Modal
      title="Просмотр холста проекта"
      open={open}
      onCancel={onClose}
      footer={null}
      width="90vw"
      style={{ top: 20 }}
      bodyStyle={{ height: '80vh', padding: 0 }}
      destroyOnClose
    >
      {loading ? (
        <Spin style={{ display: 'block', margin: '40px auto' }} />
      ) : (
        <ProjectCanvas readOnly nodes={nodes} edges={edges} />
      )}
    </Modal>
  );
};
