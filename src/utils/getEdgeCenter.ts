// src/utils/getEdgeCenter.ts
export function getEdgeCenter({
  sourceX,
  sourceY,
  targetX,
  targetY,
}: {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}): [number, number] {
  return [
    sourceX + (targetX - sourceX) / 2,
    sourceY + (targetY - sourceY) / 2,
  ];
}
