import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Background, Controls, MiniMap,
  addEdge, applyNodeChanges, applyEdgeChanges,
  Node, Edge, NodeChange, EdgeChange, Connection, useReactFlow, ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import { useNavigate, useParams } from 'react-router-dom';
import testData from './test-canvas-data.json';
import TaskNode from '../../components/TaskNode/TaskNode';
import CustomEdge from '../../components/CustomEdge/CustomEdge';
import styles from './CanvasPage.module.css';

const nodeTypes = { task: TaskNode };
const edgeTypes = { custom: CustomEdge };

const tasksFromProject = [
  { id: 'task1', name: 'Реализовать поиск', description: 'Добавить поиск по задачам', status: 'open' },
  { id: 'task2', name: 'Сделать отчет', description: 'Генерация PDF', status: 'in_progress' },
  { id: 'task3', name: 'UI review', description: 'Проверить стили', status: 'completed' },
];

const CanvasContent: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(testData.nodes);
  const [edges, setEdges] = useState<Edge[]>(testData.edges.map((edge: any) => ({
    ...edge, type: 'custom'
  })));
  const [panelOpen, setPanelOpen] = useState(true);

  const [availableTasks, setAvailableTasks] = useState(tasksFromProject);

  const navigate = useNavigate();
  const { id } = useParams();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useReactFlow();

  const onDragStart = (event: React.DragEvent, task: any) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(task));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current!.getBoundingClientRect();
      const task = JSON.parse(event.dataTransfer.getData('application/reactflow'));

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      setNodes((nds) => nds.concat({
        id: `${task.id}_${+new Date()}`,
        type: 'task',
        position,
        data: {
          name: task.name,
          description: task.description,
          status: task.status,
        }
      }));

      setAvailableTasks((tasks) => tasks.filter((t) => t.id !== task.id));
    },
    [reactFlowInstance]
  );

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (connection: Edge | Connection) => setEdges((eds) => addEdge({ ...connection, type: 'custom' }, eds)),
    []
  );

  const handleDeleteEdge = useCallback((id: string) => {
    setEdges((eds) => eds.filter((e) => e.id !== id));
  }, []);

  const handleSaveLocal = () => {
    const data = { nodes, edges };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'canvas-data.json');
  };

  const edgesWithDelete = edges.map((edge) => ({
    ...edge,
    data: { ...(edge.data || {}), onDelete: handleDeleteEdge },
  }));

  return (
    <div className={styles.root}>
      {!panelOpen && (
        <Button
          icon={<MenuOutlined />}
          className={styles.openButton}
          type="primary"
          shape="circle"
          size="large"
          onClick={() => setPanelOpen(true)}
        />
      )}

      <div className={`${styles.sidebar} ${!panelOpen ? styles.sidebarClosed : ''}`}>
        {/* Кнопки */}
        <div className={styles.sidebarSection}>
          <div className={styles.sidebarHeader}>
            <h3 className={styles.sidebarTitle}>Панель управления</h3>
            <Button
              icon={<CloseOutlined />}
              type="text"
              size="small"
              onClick={() => setPanelOpen(false)}
              style={{ marginLeft: 6 }}
            />
          </div>
          <Button type="primary" block className={styles.panelButton} onClick={handleSaveLocal}>
            Сохранить (JSON)
          </Button>
          <Button type="default" block className={styles.panelButton} onClick={() => navigate(`/project/${id}`)}>
            Проект
          </Button>
          <Button type="default" block className={styles.panelButton} onClick={() => navigate(`/project/${id}/diagram`)}>
            Диаграмма
          </Button>
        </div>
        <hr className={styles.divider} />
        <div className={styles.sidebarSection}>
          <h4 style={{margin: '6px 0 10px 0', textAlign: 'center'}}>Список задач проекта</h4>
          <ul className={styles.taskList}>
            {availableTasks.length === 0 && (
              <li style={{ color: '#bbb', textAlign: 'center', fontStyle: 'italic' }}>
                Все задачи добавлены на холст
              </li>
            )}
            {availableTasks.map((task) => (
              <li
                className={styles.taskListItem}
                key={task.id}
                draggable
                onDragStart={(e) => onDragStart(e, task)}
              >
                {task.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={styles.canvasArea}
        ref={reactFlowWrapper}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes}
          edges={edgesWithDelete}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodesDraggable
          nodesConnectable
          elementsSelectable
          panOnDrag
          zoomOnScroll
        >
          <MiniMap />
          <Background />
          <Controls showInteractive />
        </ReactFlow>
      </div>
    </div>
  );
};

const CanvasPage: React.FC = () => (
  <ReactFlowProvider>
    <CanvasContent />
  </ReactFlowProvider>
);

export default CanvasPage;
