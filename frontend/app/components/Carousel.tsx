"use client";

import React, { useState, useEffect, useCallback } from 'react';

// Definir tipo para las imágenes
interface Imagen {
  id: number;
  url: string;
  titulo: string;
  descripcion: string;
  categoria: string;
}

export default function CarruselImagenes() {
  // Datos de imágenes de ejemplo
  const imagenesIniciales: Imagen[] = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      titulo: 'Montañas al Amanecer',
      descripcion: 'Paisaje de montañas con los primeros rayos del sol',
      categoria: 'Naturaleza'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
      titulo: 'Ciudad Nocturna',
      descripcion: 'Rascacielos iluminados en una noche estrellada',
      categoria: 'Urbano'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      titulo: 'Aurora Boreal',
      descripcion: 'Luces del norte sobre un lago congelado',
      categoria: 'Naturaleza'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e',
      titulo: 'Desierto Infinito',
      descripcion: 'Dunas de arena al atardecer en el desierto',
      categoria: 'Naturaleza'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      titulo: 'Playas Tropicales',
      descripcion: 'Aguas cristalinas y palmeras en una playa paradisíaca',
      categoria: 'Playa'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e',
      titulo: 'Arquitectura Moderna',
      descripcion: 'Diseño contemporáneo en edificios icónicos',
      categoria: 'Arquitectura'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
      titulo: 'Bosque Encantado',
      descripcion: 'Niebla misteriosa en un bosque antiguo',
      categoria: 'Naturaleza'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
      titulo: 'Atardecer en el Campo',
      descripcion: 'Colores cálidos al final del día en el campo',
      categoria: 'Naturaleza'
    }
  ];

  // Estados
  const [imagenes, setImagenes] = useState<Imagen[]>(imagenesIniciales);
  const [indiceActual, setIndiceActual] = useState(0);
  const [estaAutoReproduciendo, setEstaAutoReproduciendo] = useState(true);
  const [estaPantallaCompleta, setEstaPantallaCompleta] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todos');
  const [tiempoTransicion, setTiempoTransicion] = useState(500);
  const [mostrarMiniaturas, setMostrarMiniaturas] = useState(true);
  const [zoomActivo, setZoomActivo] = useState(false);

  // Obtener categorías únicas
  const categorias = ['todos', ...Array.from(new Set(imagenes.map(img => img.categoria)))];

  // Filtrar imágenes por categoría
  const imagenesFiltradas = categoriaFiltro === 'todos'
    ? imagenes
    : imagenes.filter(img => img.categoria === categoriaFiltro);

  // Auto-reproducción
  useEffect(() => {
    if (!estaAutoReproduciendo) return;

    const intervalo = setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % imagenesFiltradas.length);
    }, 3000);

    return () => clearInterval(intervalo);
  }, [estaAutoReproduciendo, imagenesFiltradas.length]);

  // Navegación
  const siguienteImagen = useCallback(() => {
    setIndiceActual((prev) => (prev + 1) % imagenesFiltradas.length);
  }, [imagenesFiltradas.length]);

  const anteriorImagen = useCallback(() => {
    setIndiceActual((prev) => (prev - 1 + imagenesFiltradas.length) % imagenesFiltradas.length);
  }, [imagenesFiltradas.length]);

  // Teclado shortcuts
  useEffect(() => {
    const manejarTeclado = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') anteriorImagen();
      if (e.key === 'ArrowRight') siguienteImagen();
      if (e.key === ' ') {
        e.preventDefault();
        setEstaAutoReproduciendo(prev => !prev);
      }
      if (e.key === 'f' || e.key === 'F') togglePantallaCompleta();
      if (e.key === 'Escape' && estaPantallaCompleta) togglePantallaCompleta();
    };

    window.addEventListener('keydown', manejarTeclado);
    return () => window.removeEventListener('keydown', manejarTeclado);
  }, [anteriorImagen, siguienteImagen, estaPantallaCompleta]);

  // Pantalla completa
  const togglePantallaCompleta = () => {
    if (!estaPantallaCompleta) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setEstaPantallaCompleta(!estaPantallaCompleta);
  };

  // Manejar cambio de pantalla completa
  useEffect(() => {
    const manejarCambioPantallaCompleta = () => {
      setEstaPantallaCompleta(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', manejarCambioPantallaCompleta);
    return () => document.removeEventListener('fullscreenchange', manejarCambioPantallaCompleta);
  }, []);

  // Añadir imágenes (simulación)
  const agregarImagen = () => {
    const nuevaId = Math.max(...imagenes.map(img => img.id)) + 1;
    const nuevaImagen: Imagen = {
      id: nuevaId,
      url: `https://images.unsplash.com/photo-${1500000000000 + nuevaId}?w=1200&h=800&fit=crop`,
      titulo: `Nueva Imagen ${nuevaId}`,
      descripcion: 'Descripción de la nueva imagen agregada',
      categoria: 'Naturaleza'
    };
    setImagenes([...imagenes, nuevaImagen]);
  };

  // Estilos
  const estilos = {
    contenedor: {
      position: 'relative' as const,
      maxWidth: estaPantallaCompleta ? '100vw' : '1200px',
      margin: estaPantallaCompleta ? '0' : '2rem auto',
      backgroundColor: '#0f172a',
      borderRadius: estaPantallaCompleta ? '0' : '16px',
      overflow: 'hidden',
      boxShadow: estaPantallaCompleta ? 'none' : '0 20px 40px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.3s ease'
    } as React.CSSProperties,
    carrusel: {
      position: 'relative' as const,
      width: '100%',
      height: estaPantallaCompleta ? '100vh' : '600px',
      overflow: 'hidden'
    } as React.CSSProperties,
    imagenContenedor: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: `transform ${tiempoTransicion}ms ease-in-out`,
      transform: `translateX(${zoomActivo ? '0' : '0'}) scale(${zoomActivo ? '1.5' : '1'})`
    } as React.CSSProperties,
    imagen: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      transition: 'transform 0.3s ease'
    } as React.CSSProperties,
    infoOverlay: {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
      color: 'white',
      padding: '2rem',
      transform: 'translateY(0)',
      transition: 'transform 0.3s ease'
    } as React.CSSProperties,
    titulo: {
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
    } as React.CSSProperties,
    descripcion: {
      fontSize: '1rem',
      opacity: 0.9,
      marginBottom: '0.5rem'
    } as React.CSSProperties,
    categoria: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      backgroundColor: '#3b82f6',
      borderRadius: '20px',
      fontSize: '0.875rem',
      fontWeight: '600'
    } as React.CSSProperties,
    controles: {
      position: 'absolute' as const,
      top: '50%',
      left: '0',
      right: '0',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 1rem',
      transform: 'translateY(-50%)',
      zIndex: 10
    } as React.CSSProperties,
    botonNavegacion: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      color: 'white',
      fontSize: '1.5rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.2s ease'
    } as React.CSSProperties,
    indicadores: {
      position: 'absolute' as const,
      bottom: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '0.5rem',
      zIndex: 10
    } as React.CSSProperties,
    indicador: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    } as React.CSSProperties,
    indicadorActivo: {
      backgroundColor: '#3b82f6',
      transform: 'scale(1.2)'
    } as React.CSSProperties,
    controlesSuperiores: {
      position: 'absolute' as const,
      top: '1rem',
      right: '1rem',
      display: 'flex',
      gap: '0.5rem',
      zIndex: 20
    } as React.CSSProperties,
    botonControl: {
      padding: '0.5rem 1rem',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backdropFilter: 'blur(10px)'
    } as React.CSSProperties,
    panelControles: {
      padding: '1.5rem',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    } as React.CSSProperties,
    controlesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '1.5rem'
    } as React.CSSProperties,
    grupoControl: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem'
    } as React.CSSProperties,
    etiqueta: {
      color: '#cbd5e1',
      fontSize: '0.875rem',
      fontWeight: '600'
    } as React.CSSProperties,
    select: {
      padding: '0.5rem',
      backgroundColor: '#1e293b',
      color: 'white',
      border: '1px solid #475569',
      borderRadius: '6px',
      fontSize: '0.875rem'
    } as React.CSSProperties,
    inputRange: {
      width: '100%',
      height: '6px',
      backgroundColor: '#475569',
      borderRadius: '3px',
      outline: 'none'
    } as React.CSSProperties,
    miniaturas: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: '0.5rem',
      marginTop: '1rem',
      maxHeight: '150px',
      overflowY: 'auto' as const,
      padding: '0.5rem'
    } as React.CSSProperties,
    miniatura: {
      width: '100%',
      height: '80px',
      objectFit: 'cover' as const,
      borderRadius: '8px',
      cursor: 'pointer',
      opacity: 0.7,
      transition: 'all 0.2s ease'
    } as React.CSSProperties,
    miniaturaActiva: {
      opacity: 1,
      border: '2px solid #3b82f6',
      transform: 'scale(1.05)'
    } as React.CSSProperties,
    contador: {
      position: 'absolute' as const,
      top: '1rem',
      left: '1rem',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.875rem',
      backdropFilter: 'blur(10px)',
      zIndex: 20
    } as React.CSSProperties
  };

  const imagenActual = imagenesFiltradas[indiceActual];

  return (
    <div style={estilos.contenedor} >
      {/* Contador */}
      <div style={estilos.contador}>
        {indiceActual + 1} / {imagenesFiltradas.length}
      </div>

      {/* Controles superiores */}
      <div style={estilos.controlesSuperiores}>
        <button
          onClick={() => setEstaAutoReproduciendo(!estaAutoReproduciendo)}
          style={estilos.botonControl}
        >
          {estaAutoReproduciendo ? '⏸️ Pausar' : '▶️ Reproducir'}
        </button>
        <button
          onClick={togglePantallaCompleta}
          style={estilos.botonControl}
        >
          {estaPantallaCompleta ? '✕ Salir Pantalla Completa' : '⛶ Pantalla Completa'}
        </button>
        <button
          onClick={() => setZoomActivo(!zoomActivo)}
          style={estilos.botonControl}
        >
          {zoomActivo ? '🔍 Quitar Zoom' : '🔍 Zoom'}
        </button>
      </div>

      {/* Carrusel principal */}
      <div style={estilos.carrusel}>
        <div style={estilos.imagenContenedor}>
          <img
            src={imagenActual.url}
            alt={imagenActual.titulo}
            style={estilos.imagen}
            onClick={siguienteImagen}
          />
          <div style={estilos.infoOverlay}>
            <h2 style={estilos.titulo}>{imagenActual.titulo}</h2>
            <p style={estilos.descripcion}>{imagenActual.descripcion}</p>
            <span style={estilos.categoria}>{imagenActual.categoria}</span>
          </div>
        </div>

        {/* Controles de navegación */}
        <div style={estilos.controles}>
          <button
            onClick={anteriorImagen}
            style={estilos.botonNavegacion}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
          >
            ←
          </button>
          <button
            onClick={siguienteImagen}
            style={estilos.botonNavegacion}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
          >
            →
          </button>
        </div>

        {/* Indicadores */}
        <div style={estilos.indicadores}>
          {imagenesFiltradas.map((_, index) => (
            <div
              key={index}
              onClick={() => setIndiceActual(index)}
              style={{
                ...estilos.indicador,
                ...(index === indiceActual && estilos.indicadorActivo)
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#60a5fa'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index === indiceActual ? '#3b82f6' : 'rgba(255, 255, 255, 0.5)'}
            />
          ))}
        </div>
      </div>

      {/* Panel de controles */}
      <div style={estilos.panelControles}>
        <div style={estilos.controlesGrid}>
          {/* Filtro por categoría */}
          <div style={estilos.grupoControl}>
            <label style={estilos.etiqueta}>Filtrar por Categoría</label>
            <select
              value={categoriaFiltro}
              onChange={(e) => {
                setCategoriaFiltro(e.target.value);
                setIndiceActual(0);
              }}
              style={estilos.select}
            >
              {categorias.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'todos' ? 'Todas las categorías' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Velocidad de transición */}
          <div style={estilos.grupoControl}>
            <label style={estilos.etiqueta}>
              Velocidad de Transición: {tiempoTransicion}ms
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              value={tiempoTransicion}
              onChange={(e) => setTiempoTransicion(Number(e.target.value))}
              style={estilos.inputRange}
            />
          </div>

          {/* Agregar imagen */}
          <div style={estilos.grupoControl}>
            <label style={estilos.etiqueta}>Administrar Imágenes</label>
            <button
              onClick={agregarImagen}
              style={{ ...estilos.botonControl, backgroundColor: '#10b981' }}
            >
              ＋ Agregar Imagen de Ejemplo
            </button>
          </div>
        </div>

        {/* Toggle miniaturas */}
        <button
          onClick={() => setMostrarMiniaturas(!mostrarMiniaturas)}
          style={estilos.botonControl}
        >
          {mostrarMiniaturas ? '▲ Ocultar Miniaturas' : '▼ Mostrar Miniaturas'}
        </button>

        {/* Miniaturas */}
        {mostrarMiniaturas && (
          <div style={estilos.miniaturas}>
            {imagenesFiltradas.map((imagen, index) => (
              <img
                key={imagen.id}
                src={imagen.url}
                alt={`Miniatura ${index + 1}`}
                style={{
                  ...estilos.miniatura,
                  ...(index === indiceActual && estilos.miniaturaActiva)
                }}
                onClick={() => setIndiceActual(index)}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = index === indiceActual ? '1' : '0.7'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}