"use client"

import { ResponsiveGeoMap } from "@nivo/geo";
import worldCountries from "./../data/world_countries.json";
import { useEffect, useRef, useState } from "react";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const RotatableGeoMap: React.FC = () => {
  const [projectionRotation, setProjectionRotation] = useState<[number, number, number]>([155, -13, 134]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startRotation, setStartRotation] = useState<[number, number]>([0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: MouseEvent) => {
    setIsDragging(true);
    setStartRotation([event.clientX, event.clientY]);
  };

  const handleTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      setIsDragging(true);
      setStartRotation([touch.clientX, touch.clientY]);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && containerRef.current) {
      const { clientX, clientY } = event;
      const deltaX = clientX - startRotation[0];
      const deltaY = clientY - startRotation[1];
      const lambda = (deltaX / containerRef.current.clientWidth) * 360;
      const phi = (deltaY / containerRef.current.clientHeight) * 180;
      setProjectionRotation([projectionRotation[0] + lambda, projectionRotation[1] - phi, projectionRotation[2]]);
      setStartRotation([clientX, clientY]);
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (isDragging && containerRef.current && event.touches.length === 1) {
      const touch = event.touches[0];
      const deltaX = touch.clientX - startRotation[0];
      const deltaY = touch.clientY - startRotation[1];
      const lambda = (deltaX / containerRef.current.clientWidth) * 360;
      const phi = (deltaY / containerRef.current.clientHeight) * 180;
      setProjectionRotation([projectionRotation[0] + lambda, projectionRotation[1] - phi, projectionRotation[2]]);
      setStartRotation([touch.clientX, touch.clientY]);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mouseleave', handleMouseUp);

      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchmove', handleTouchMove);
      container.addEventListener('touchend', handleTouchEnd);
      container.addEventListener('touchcancel', handleTouchEnd);

      return () => {
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mouseleave', handleMouseUp);

        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
        container.removeEventListener('touchcancel', handleTouchEnd);
      };
    }
  }, [isDragging, startRotation, projectionRotation]);

  return (
    <div ref={containerRef} style={{ height: '700px' }}>
      <ResponsiveGeoMap
        features={worldCountries.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        projectionTranslation={[0.5, 0.5]}
        projectionType="naturalEarth1"
        projectionScale={350}
        projectionRotation={[ 0, 0, 0 ]}
        // projectionRotation={projectionRotation}
        fillColor="#eeeeee"
        borderWidth={0.5}
        borderColor="#333333"
        enableGraticule={true}
        graticuleLineColor="#666666"
      />
    </div>
  );
};

export default RotatableGeoMap;


