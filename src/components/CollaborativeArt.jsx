import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const CollaborativeArt = () => {
  const { user } = useAuth();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('brush');
  const [currentColor, setCurrentColor] = useState('#6366f1');
  const [brushSize, setBrushSize] = useState(5);
  const [canvasHistory, setCanvasHistory] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [showContributors, setShowContributors] = useState(false);
  const [artworkTitle, setArtworkTitle] = useState('Healing Together');
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  // Predefined healing colors
  const healingColors = [
    '#6366f1', // Calming blue
    '#8b5cf6', // Peaceful teal
    '#f59e0b', // Warm yellow
    '#ef4444', // Expressive red
    '#8b5cf6', // Spiritual purple
    '#10b981', // Growth green
    '#f97316', // Energy orange
    '#8b5cf6', // Compassionate pink
    '#6b7280', // Grounding gray
    '#000000', // Deep black
    '#ffffff'  // Pure white
  ];

  // Brush types for different expressions
  const brushTypes = [
    { id: 'brush', name: 'Soft Brush', icon: '🖌️' },
    { id: 'pencil', name: 'Pencil', icon: '✏️' },
    { id: 'marker', name: 'Marker', icon: '🖊️' },
    { id: 'spray', name: 'Spray', icon: '💨' },
    { id: 'eraser', name: 'Eraser', icon: '🧽' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    // Set initial background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Load existing artwork from localStorage
    const savedArtwork = localStorage.getItem('collaborativeArtwork');
    const savedContributors = localStorage.getItem('artworkContributors');
    
    if (savedArtwork) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = savedArtwork;
    }
    
    if (savedContributors) {
      setContributors(JSON.parse(savedContributors));
    }
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLastPosition({ x, y });
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize * 2;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentColor;
    }

    // Different brush effects
    switch (currentTool) {
      case 'brush':
        ctx.globalAlpha = 0.8;
        break;
      case 'pencil':
        ctx.globalAlpha = 1;
        ctx.lineWidth = Math.max(1, brushSize / 2);
        break;
      case 'marker':
        ctx.globalAlpha = 0.6;
        ctx.lineWidth = brushSize * 1.5;
        break;
      case 'spray':
        drawSpray(ctx, x, y, brushSize, currentColor);
        setLastPosition({ x, y });
        return;
      default:
        ctx.globalAlpha = 0.8;
    }

    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    setLastPosition({ x, y });
  };

  const drawSpray = (ctx, x, y, size, color) => {
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = color;
    
    for (let i = 0; i < 20; i++) {
      const offsetX = (Math.random() - 0.5) * size * 2;
      const offsetY = (Math.random() - 0.5) * size * 2;
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveContribution();
      saveArtwork();
    }
  };

  const saveContribution = () => {
    const newContributor = {
      id: Date.now(),
      name: user?.name || 'Anonymous',
      timestamp: new Date().toISOString(),
      color: currentColor,
      tool: currentTool
    };

    const updatedContributors = [...contributors, newContributor];
    setContributors(updatedContributors);
    localStorage.setItem('artworkContributors', JSON.stringify(updatedContributors));
  };

  const saveArtwork = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    localStorage.setItem('collaborativeArtwork', dataURL);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setContributors([]);
    localStorage.removeItem('collaborativeArtwork');
    localStorage.removeItem('artworkContributors');
  };

  const downloadArtwork = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `${artworkTitle.replace(/\s+/g, '_')}_collaborative_art.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="collaborative-art-container">
      <div className="art-header">
        <div className="art-title-section">
          <h2>🎨 Peer Support Through Collaborative Art</h2>
          <p>A digital canvas where people experiencing similar challenges contribute to evolving artwork together. Each person adds brushstrokes, colors, or elements, creating something beautiful from collective struggle.</p>
          
          <div className="artwork-title">
            <input
              type="text"
              value={artworkTitle}
              onChange={(e) => setArtworkTitle(e.target.value)}
              className="title-input"
              placeholder="Name this collaborative artwork..."
            />
          </div>
        </div>

        <div className="contributors-info">
          <button 
            className="contributors-btn"
            onClick={() => setShowContributors(!showContributors)}
          >
            👥 {contributors.length} Contributors
          </button>
          
          {showContributors && (
            <div className="contributors-list">
              <h4>Recent Contributors:</h4>
              {contributors.slice(-10).reverse().map((contributor, index) => (
                <div key={contributor.id} className="contributor-item">
                  <div 
                    className="contributor-color" 
                    style={{ backgroundColor: contributor.color }}
                  ></div>
                  <span className="contributor-name">{contributor.name}</span>
                  <span className="contributor-tool">{contributor.tool}</span>
                  <span className="contributor-time">
                    {new Date(contributor.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="art-workspace">
        <div className="art-tools">
          <div className="tool-section">
            <h4>🖌️ Brushes</h4>
            <div className="brush-types">
              {brushTypes.map(brush => (
                <button
                  key={brush.id}
                  className={`tool-btn ${currentTool === brush.id ? 'active' : ''}`}
                  onClick={() => setCurrentTool(brush.id)}
                  title={brush.name}
                >
                  {brush.icon}
                </button>
              ))}
            </div>
          </div>

          <div className="tool-section">
            <h4>🎨 Healing Colors</h4>
            <div className="color-palette">
              {healingColors.map(color => (
                <button
                  key={color}
                  className={`color-btn ${currentColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCurrentColor(color)}
                  title={color}
                />
              ))}
            </div>
            
            <div className="custom-color">
              <input
                type="color"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                className="color-picker"
              />
            </div>
          </div>

          <div className="tool-section">
            <h4>📏 Brush Size</h4>
            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(e.target.value)}
              className="size-slider"
            />
            <span className="size-display">{brushSize}px</span>
          </div>

          <div className="tool-section">
            <h4>🛠️ Actions</h4>
            <button className="action-btn save-btn" onClick={downloadArtwork}>
              💾 Save Artwork
            </button>
            <button className="action-btn clear-btn" onClick={clearCanvas}>
              🗑️ Start Fresh
            </button>
          </div>
        </div>

        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            className="art-canvas"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          
          <div className="canvas-overlay">
            <div className="current-tool-indicator">
              {brushTypes.find(b => b.id === currentTool)?.icon} {currentTool}
            </div>
          </div>
        </div>
      </div>

      <div className="art-inspiration">
        <h3>💭 Artistic Expression Prompts</h3>
        <div className="inspiration-cards">
          <div className="inspiration-card">
            <h4>🌅 Hope</h4>
            <p>Draw what hope looks like to you today</p>
          </div>
          <div className="inspiration-card">
            <h4>🌊 Flow</h4>
            <p>Let your emotions flow through colors and shapes</p>
          </div>
          <div className="inspiration-card">
            <h4>🤝 Connection</h4>
            <p>Add something that connects to others' contributions</p>
          </div>
          <div className="inspiration-card">
            <h4>🌱 Growth</h4>
            <p>Express how you're growing through challenges</p>
          </div>
        </div>
      </div>

      <div className="peer-support-info">
        <h3>🤗 How Collaborative Art Helps</h3>
        <div className="benefits-grid">
          <div className="benefit-item">
            <span className="benefit-icon">🎨</span>
            <h4>Creative Expression</h4>
            <p>Express feelings that are hard to put into words</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🤝</span>
            <h4>Shared Experience</h4>
            <p>Feel connected to others facing similar challenges</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🌟</span>
            <h4>Collective Beauty</h4>
            <p>Create something beautiful from individual struggles</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">💪</span>
            <h4>Empowerment</h4>
            <p>See how your contribution matters to the whole</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeArt;