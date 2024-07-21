import React, { useEffect, useRef, useState } from 'react';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d");

    // Scale canvas for high DPI devices
    const scale = window.devicePixelRatio;
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    if(context){
      context.scale(scale, scale);
      context.lineCap = "round";
      context.strokeStyle = "black";
      context.lineWidth = 5;
      contextRef.current = context;
    }
  }, []);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current!.beginPath();
    contextRef.current!.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    contextRef.current!.closePath();
    setIsDrawing(false);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current!.lineTo(offsetX, offsetY);
    contextRef.current!.stroke();
  };

  const onClear = () => {
    if(contextRef.current && canvasRef.current)
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  return (
    <>
    <div className="can-d-flex can-space-between">
      <h5 style={{marginLeft:"10px", fontSize:"1rem"}}>React app using canvas to draw on screen</h5>
      <button className='clear-btn' onClick={onClear}>Clear</button>
    </div>
      
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        style={{ border: "1px solid black" }}
      />
    </>    
  );
};

export default Canvas;
