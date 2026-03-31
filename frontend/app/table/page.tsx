"use client";

import React, { useState, useMemo } from 'react';

// Definir tipos para los datos de la tabla
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  pais: string;
  estado: boolean;
  fechaRegistro: string;
  saldo: number;
}

type Orden = 'asc' | 'desc';
type CampoOrden = keyof Usuario;

export default function TablaDatos() {
  // Datos iniciales de ejemplo
  const datosIniciales: Usuario[] = [
    { id: 1, nombre: 'Ana García', email: 'ana@example.com', telefono: '+34 600 111 222', ciudad: 'Madrid', pais: 'España', estado: true, fechaRegistro: '2024-01-15', saldo: 1250.75 },
    { id: 2, nombre: 'Carlos López', email: 'carlos@example.com', telefono: '+52 55 1234 5678', ciudad: 'Ciudad de México', pais: 'México', estado: true, fechaRegistro: '2024-02-10', saldo: 850.50 },
    { id: 3, nombre: 'María Rodríguez', email: 'maria@example.com', telefono: '+57 300 456 7890', ciudad: 'Bogotá', pais: 'Colombia', estado: false, fechaRegistro: '2024-01-28', saldo: 0 },
    { id: 4, nombre: 'Juan Pérez', email: 'juan@example.com', telefono: '+54 911 5555 1234', ciudad: 'Buenos Aires', pais: 'Argentina', estado: true, fechaRegistro: '2024-03-05', saldo: 2100.00 },
    { id: 5, nombre: 'Laura Fernández', email: 'laura@example.com', telefono: '+34 699 888 777', ciudad: 'Barcelona', pais: 'España', estado: true, fechaRegistro: '2024-02-22', saldo: 750.25 },
    { id: 6, nombre: 'Pedro Martínez', email: 'pedro@example.com', telefono: '+52 55 8765 4321', ciudad: 'Guadalajara', pais: 'México', estado: false, fechaRegistro: '2024-03-12', saldo: 150.00 },
    { id: 7, nombre: 'Sofía Gómez', email: 'sofia@example.com', telefono: '+57 310 222 3333', ciudad: 'Medellín', pais: 'Colombia', estado: true, fechaRegistro: '2024-01-30', saldo: 1800.50 },
    { id: 8, nombre: 'Diego Sánchez', email: 'diego@example.com', telefono: '+54 911 4444 5555', ciudad: 'Córdoba', pais: 'Argentina', estado: true, fechaRegistro: '2024-02-18', saldo: 950.75 },
  ];

  // Estados
  const [datos, setDatos] = useState<Usuario[]>(datosIniciales);
  const [orden, setOrden] = useState<{ campo: CampoOrden; direccion: Orden }>({
    campo: 'id',
    direccion: 'asc'
  });
  const [busqueda, setBusqueda] = useState('');
  const [filtroPais, setFiltroPais] = useState<string>('todos');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [paginaActual, setPaginaActual] = useState(1);
  const [filasPorPagina, setFilasPorPagina] = useState(5);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);

  // Obtener países únicos para el filtro
  const paises = useMemo(() => {
    const paisesUnicos = Array.from(new Set(datosIniciales.map(usuario => usuario.pais)));
    return ['todos', ...paisesUnicos];
  }, []);

  // Filtrar y ordenar datos
  const datosFiltrados = useMemo(() => {
    let resultado = [...datos];

    // Aplicar filtro de búsqueda
    if (busqueda) {
      const termino = busqueda.toLowerCase();
      resultado = resultado.filter(usuario =>
        usuario.nombre.toLowerCase().includes(termino) ||
        usuario.email.toLowerCase().includes(termino) ||
        usuario.ciudad.toLowerCase().includes(termino)
      );
    }

    // Aplicar filtro por país
    if (filtroPais !== 'todos') {
      resultado = resultado.filter(usuario => usuario.pais === filtroPais);
    }

    // Aplicar filtro por estado
    if (filtroEstado !== 'todos') {
      const estadoBool = filtroEstado === 'activos';
      resultado = resultado.filter(usuario => usuario.estado === estadoBool);
    }

    // Ordenar datos
    resultado.sort((a, b) => {
      const aValor = a[orden.campo];
      const bValor = b[orden.campo];

      if (typeof aValor === 'string' && typeof bValor === 'string') {
        return orden.direccion === 'asc'
          ? aValor.localeCompare(bValor)
          : bValor.localeCompare(aValor);
      }

      if (typeof aValor === 'number' && typeof bValor === 'number') {
        return orden.direccion === 'asc' ? aValor - bValor : bValor - aValor;
      }

      return 0;
    });

    return resultado;
  }, [datos, busqueda, filtroPais, filtroEstado, orden]);

  // Paginación
  const totalPaginas = Math.ceil(datosFiltrados.length / filasPorPagina);
  const indiceInicio = (paginaActual - 1) * filasPorPagina;
  const datosPagina = datosFiltrados.slice(indiceInicio, indiceInicio + filasPorPagina);

  // Manejar ordenación
  const manejarOrdenacion = (campo: CampoOrden) => {
    setOrden(prev => ({
      campo,
      direccion: prev.campo === campo && prev.direccion === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Manejar cambio de estado
  const toggleEstado = (id: number) => {
    setDatos(prev => prev.map(usuario =>
      usuario.id === id ? { ...usuario, estado: !usuario.estado } : usuario
    ));
  };

  // Eliminar usuario
  const eliminarUsuario = (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      setDatos(prev => prev.filter(usuario => usuario.id !== id));
    }
  };

  // Formatear fecha
  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Formatear moneda
  const formatearMoneda = (valor: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(valor);
  };

  // Estilos
  const estilos = {
    contenedor: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    } as React.CSSProperties,
    titulo: {
      color: '#1f2937',
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '8px'
    } as React.CSSProperties,
    subtitulo: {
      color: '#6b7280',
      fontSize: '16px',
      marginBottom: '24px'
    } as React.CSSProperties,
    controles: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      flexWrap: 'wrap' as const,
      gap: '16px'
    } as React.CSSProperties,
    busqueda: {
      flex: '1',
      minWidth: '300px',
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      transition: 'border-color 0.2s'
    } as React.CSSProperties,
    filtros: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center'
    } as React.CSSProperties,
    select: {
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      backgroundColor: 'white'
    } as React.CSSProperties,
    tablaContenedor: {
      overflowX: 'auto' as const,
      marginBottom: '24px'
    } as React.CSSProperties,
    tabla: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      fontSize: '14px'
    } as React.CSSProperties,
    th: {
      backgroundColor: '#f9fafb',
      padding: '16px',
      textAlign: 'left' as const,
      fontWeight: '600',
      color: '#374151',
      borderBottom: '1px solid #e5e7eb',
      cursor: 'pointer',
      userSelect: 'none' as const
    } as React.CSSProperties,
    td: {
      padding: '16px',
      borderBottom: '1px solid #f3f4f6',
      color: '#4b5563'
    } as React.CSSProperties,
    fila: {
      transition: 'background-color 0.2s'
    } as React.CSSProperties,
    estado: {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600'
    } as React.CSSProperties,
    estadoActivo: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    } as React.CSSProperties,
    estadoInactivo: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
    } as React.CSSProperties,
    acciones: {
      display: 'flex',
      gap: '8px'
    } as React.CSSProperties,
    boton: {
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      border: 'none',
      transition: 'background-color 0.2s'
    } as React.CSSProperties,
    botonActivar: {
      backgroundColor: '#10b981',
      color: 'white'
    } as React.CSSProperties,
    botonDesactivar: {
      backgroundColor: '#ef4444',
      color: 'white'
    } as React.CSSProperties,
    botonEliminar: {
      backgroundColor: '#f3f4f6',
      color: '#374151'
    } as React.CSSProperties,
    paginacion: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '24px'
    } as React.CSSProperties,
    paginacionControles: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    } as React.CSSProperties,
    botonPagina: {
      padding: '8px 16px',
      borderRadius: '6px',
      border: '1px solid #d1d5db',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s'
    } as React.CSSProperties,
    botonPaginaActiva: {
      backgroundColor: '#3b82f6',
      color: 'white',
      borderColor: '#3b82f6'
    } as React.CSSProperties,
    selectFilas: {
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      backgroundColor: 'white'
    } as React.CSSProperties,
    resumen: {
      color: '#6b7280',
      fontSize: '14px'
    } as React.CSSProperties
  };

  return (
    <div style={estilos.contenedor}>
      <h1 style={estilos.titulo}>Gestión de Usuarios</h1>
      <p style={estilos.subtitulo}>
        Total: {datosFiltrados.length} usuarios encontrados
        {filtroPais !== 'todos' && ` • Filtrado por: ${filtroPais}`}
        {filtroEstado !== 'todos' && ` • ${filtroEstado === 'activos' ? 'Solo activos' : 'Solo inactivos'}`}
      </p>

      {/* Controles de búsqueda y filtros */}
      <div style={estilos.controles}>
        <input
          type="text"
          placeholder="Buscar por nombre, email o ciudad..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1);
          }}
          style={estilos.busqueda}
        />

        <div style={estilos.filtros}>
          <select
            value={filtroPais}
            onChange={(e) => {
              setFiltroPais(e.target.value);
              setPaginaActual(1);
            }}
            style={estilos.select}
          >
            {paises.map(pais => (
              <option key={pais} value={pais}>
                {pais === 'todos' ? 'Todos los países' : pais}
              </option>
            ))}
          </select>

          <select
            value={filtroEstado}
            onChange={(e) => {
              setFiltroEstado(e.target.value);
              setPaginaActual(1);
            }}
            style={estilos.select}
          >
            <option value="todos">Todos los estados</option>
            <option value="activos">Solo activos</option>
            <option value="inactivos">Solo inactivos</option>
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div style={estilos.tablaContenedor}>
        <table style={estilos.tabla}>
          <thead>
            <tr>
              <th style={estilos.th} onClick={() => manejarOrdenacion('id')}>
                ID {orden.campo === 'id' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th style={estilos.th} onClick={() => manejarOrdenacion('nombre')}>
                Nombre {orden.campo === 'nombre' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th style={estilos.th} onClick={() => manejarOrdenacion('email')}>
                Email {orden.campo === 'email' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th style={estilos.th} onClick={() => manejarOrdenacion('ciudad')}>
                Ciudad {orden.campo === 'ciudad' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th style={estilos.th} onClick={() => manejarOrdenacion('pais')}>
                País {orden.campo === 'pais' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th style={estilos.th} onClick={() => manejarOrdenacion('estado')}>
                Estado {orden.campo === 'estado' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th style={estilos.th} onClick={() => manejarOrdenacion('fechaRegistro')}>
                F. Registro {orden.campo === 'fechaRegistro' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th style={estilos.th} onClick={() => manejarOrdenacion('saldo')}>
                Saldo {orden.campo === 'saldo' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th style={estilos.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datosPagina.map((usuario) => (
              <tr key={usuario.id} style={estilos.fila}>
                <td style={estilos.td}>#{usuario.id}</td>
                <td style={{ ...estilos.td, fontWeight: '600' }}>{usuario.nombre}</td>
                <td style={estilos.td}>{usuario.email}</td>
                <td style={estilos.td}>{usuario.ciudad}</td>
                <td style={estilos.td}>{usuario.pais}</td>
                <td style={estilos.td}>
                  <span style={{
                    ...estilos.estado,
                    ...(usuario.estado ? estilos.estadoActivo : estilos.estadoInactivo)
                  }}>
                    {usuario.estado ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td style={estilos.td}>{formatearFecha(usuario.fechaRegistro)}</td>
                <td style={{ ...estilos.td, fontWeight: '600' }}>{formatearMoneda(usuario.saldo)}</td>
                <td style={estilos.td}>
                  <div style={estilos.acciones}>
                    <button
                      onClick={() => toggleEstado(usuario.id)}
                      style={{
                        ...estilos.boton,
                        ...(usuario.estado ? estilos.botonDesactivar : estilos.botonActivar)
                      }}
                    >
                      {usuario.estado ? 'Desactivar' : 'Activar'}
                    </button>
                    <button
                      onClick={() => eliminarUsuario(usuario.id)}
                      style={{ ...estilos.boton, ...estilos.botonEliminar }}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div style={estilos.paginacion}>
        <div style={estilos.resumen}>
          Mostrando {indiceInicio + 1} - {Math.min(indiceInicio + filasPorPagina, datosFiltrados.length)} de {datosFiltrados.length} usuarios
        </div>

        <div style={estilos.paginacionControles}>
          <select
            value={filasPorPagina}
            onChange={(e) => {
              setFilasPorPagina(Number(e.target.value));
              setPaginaActual(1);
            }}
            style={estilos.selectFilas}
          >
            <option value={5}>5 filas</option>
            <option value={10}>10 filas</option>
            <option value={20}>20 filas</option>
            <option value={50}>50 filas</option>
          </select>

          <button
            onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
            disabled={paginaActual === 1}
            style={{
              ...estilos.botonPagina,
              opacity: paginaActual === 1 ? 0.5 : 1,
              cursor: paginaActual === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Anterior
          </button>

          {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
            let paginaMostrar;
            if (totalPaginas <= 5) {
              paginaMostrar = i + 1;
            } else if (paginaActual <= 3) {
              paginaMostrar = i + 1;
            } else if (paginaActual >= totalPaginas - 2) {
              paginaMostrar = totalPaginas - 4 + i;
            } else {
              paginaMostrar = paginaActual - 2 + i;
            }

            return (
              <button
                key={paginaMostrar}
                onClick={() => setPaginaActual(paginaMostrar)}
                style={{
                  ...estilos.botonPagina,
                  ...(paginaActual === paginaMostrar && estilos.botonPaginaActiva)
                }}
              >
                {paginaMostrar}
              </button>
            );
          })}

          <button
            onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
            disabled={paginaActual === totalPaginas}
            style={{
              ...estilos.botonPagina,
              opacity: paginaActual === totalPaginas ? 0.5 : 1,
              cursor: paginaActual === totalPaginas ? 'not-allowed' : 'pointer'
            }}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}