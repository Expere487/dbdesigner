import { memo, useMemo } from "react";
import {
  BaseEdge,
  EdgeProps,
  getSmoothStepPath,
  Position,
} from "@xyflow/react";

function SchemaEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  // Memoized path calculation - only recalculate when positions change
  const edgePath = useMemo(() => {
    const [path] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition: sourcePosition || Position.Bottom,
      targetX,
      targetY,
      targetPosition: targetPosition || Position.Top,
      borderRadius: 8, // Increased border radius for smoother corners
    });
    return path;
  }, [sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition]);

  return <BaseEdge path={edgePath} style={style} markerEnd={markerEnd} />;
}

export default memo(SchemaEdge);
