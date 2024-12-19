import React, { useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";

const MaskingTool = () => {
  const maskCanvasRef = useRef<CanvasDraw>(null);
  const [originalImagePath] = useState("/sample.png"); 
  const [maskDataURL, setMaskDataURL] = useState<string | null>(null);

  const exportMask = () => {
    if (maskCanvasRef.current) {
      const drawingCanvas = maskCanvasRef.current.canvas.drawing;

      const maskData = drawingCanvas.toDataURL("image/png");
      setMaskDataURL(maskData);

      localStorage.setItem("maskImage", maskData);
    }
  };

  return (
    <div>
      <h2>Image Masking Tool</h2>
      <div style={{ position: "relative", width: 500, height: 500, border: "1px solid #ccc" }}>
        <CanvasDraw
          ref={maskCanvasRef}
          brushColor="#FFFFFF"        
          brushRadius={10}            
          lazyRadius={1}
          canvasWidth={500}
          canvasHeight={500}
          hideGrid={true}
          imgSrc={originalImagePath}  
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>

      <button onClick={exportMask} style={{ marginTop: "20px" }}>
        Export Mask
      </button>

      {maskDataURL && (
        <div style={{ marginTop: "20px" }}>
          <h3>Original Image and Mask</h3>
          <div style={{ display: "flex", gap: "20px" }}>
            <div>
              <h4>Original Image</h4>
              <img src={originalImagePath} alt="Original" width={250} />
            </div>
            <div>
              <h4>Mask Image</h4>
              <img src={maskDataURL} alt="Mask" width={250} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaskingTool;
