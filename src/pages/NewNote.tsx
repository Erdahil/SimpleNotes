import { useRef, useEffect, useState } from 'react';
import { supabase } from '../services/supabase.ts'; 
import { v4 as uuidv4 } from 'uuid'; 
import './NewNote.css';

export default function NewNote() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [title, setTitle] = useState('Nowa Notatka');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 0.9;
      canvas.height = 500;
      const context = canvas.getContext('2d');
      if (context) {
        context.lineWidth = 2;
        context.strokeStyle = '#000';
        context.lineCap = 'round';
        setCtx(context);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getCoords(e);
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !ctx) return;
    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleSave = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
        alert("Musisz być zalogowany, żeby zapisać notatkę!");
        return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    const blob = await (await fetch(dataUrl)).blob();
    const fileName = `${user.id}/${uuidv4()}.png`;

    const { error: uploadError } = await supabase.storage
        .from('notes')
        .upload(fileName, blob, {
        contentType: 'image/png',
        upsert: true,
        });

    if (uploadError) {
        console.error('Błąd zapisu obrazu:', uploadError.message);
        alert('Wystąpił błąd przy zapisie notatki.');
        return;
    }

    const { error: dbError } = await supabase
        .from('notes')
        .insert({
        user_id: user.id,
        title: title,
        image_path: fileName,
        });

    if (dbError) {
        console.error('Błąd zapisu do tabeli:', dbError.message);
        alert('Wystąpił błąd przy zapisie metadanych.');
        return;
    }

    alert('Notatka zapisana w Supabase!');
    };

  const handleTitleEdit = () => {
    setTempTitle(title);
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    setTitle(tempTitle);
    setIsEditingTitle(false);
  };

  const handleTitleCancel = () => {
    setTempTitle(title);
    setIsEditingTitle(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      handleTitleCancel();
    }
  };

  const handleBlur = () => {
    handleTitleSave();
  };

  return (
    <div className="new-note-container">
      <div className="title-container">
        {isEditingTitle ? (
          <input
            type="text"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
            className="title-input"
            autoFocus
          />
        ) : (
          <>
            <h2 className="title">{title}</h2>
            <button
              onClick={handleTitleEdit}
              className="edit-button"
              title="Edytuj tytuł"
            >
              ✏️
            </button>
          </>
        )}
      </div>
      
      <canvas
        ref={canvasRef}
        className="drawing-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
      />
      <br />
      <button onClick={handleSave} className="save-button">Zapisz</button>
    </div>
  );
}