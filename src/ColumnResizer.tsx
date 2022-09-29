import {createRegion} from 'region-core';
import {useRef, useLayoutEffect} from 'react';
import styled from "@emotion/styled";

const resizerLeftRegion = createRegion(Math.floor((window.innerWidth - 10) / 2));

export const useResizerLeft = resizerLeftRegion.useValue;

const setResizerLeft = resizerLeftRegion.set;

const StyledAnchor = styled.div`
  width: 10px;
  background-color: #111;
  cursor: col-resize;
`;

function ColumnResizer() {
  const ref = useRef(null);

  useLayoutEffect(
    () => {
      let down = false;
      const handleMouseMove = (e: MouseEvent) => {
        if (down) {
          const {clientX} = e;
          setResizerLeft(clientX);
        }
      };
      const handleMouseDown = (e: MouseEvent) => {
        // Resizer 被左键点击
        if (e.target === ref.current && e.buttons === 1) {
          down = true;
        }
      };
      const handleMouseUp = () => {
        down = false;
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    },
    []
  );

  return <StyledAnchor ref={ref} />
}

export default ColumnResizer;
