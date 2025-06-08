import React from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';

const CustomEdge: React.FC<EdgeProps> = (props) => {
  const {
    id, sourceX, sourceY, targetX, targetY, style = {}, markerEnd,
    data,
  } = props;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, targetX, targetY
  });

  const onDelete = data?.onDelete;

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <g
        style={{ cursor: 'pointer', pointerEvents: 'all' }}
        transform={`translate(${labelX}, ${labelY})`}
        onClick={() => onDelete && onDelete(id)}
      >
        <circle r={15} fill="#fff" stroke="#f56c6c" strokeWidth={2} />
        <text
          x="0" y="7"
          textAnchor="middle"
          fontSize="24"
          fill="#f56c6c"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >✕</text>
      </g>
    </>
  );
};

export default CustomEdge;
