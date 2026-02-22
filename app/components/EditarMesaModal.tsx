"use client";

import React, { useState } from "react";
import { Mesa, Orden } from "./MesaCard";

interface EditarMesaModalProps {
  mesa: Mesa;
  onClose: () => void;
  onSave: (mesaActualizada: Mesa) => void;
}

export default function EditarMesaModal({
  mesa,
  onClose,
  onSave,
}: EditarMesaModalProps) {
  const [mesero, setMesero] = useState(mesa.mesero);
  const [cantidadPersonas, setCantidadPersonas] = useState(
    mesa.cantidadPersonas
  );
  const [disponible, setDisponible] = useState(mesa.disponible);
  const [ordenes, setOrdenes] = useState<Orden[]>(mesa.ordenes);

  const actualizarOrden = (
    index: number,
    campo: keyof Orden,
    valor: string | number
  ) => {
    const nuevasOrdenes = [...ordenes];
    nuevasOrdenes[index] = {
      ...nuevasOrdenes[index],
      [campo]: valor,
    };
    setOrdenes(nuevasOrdenes);
  };

  const agregarOrden = () => {
    setOrdenes([
      ...ordenes,
      {
        id: Date.now(),
        plato: "",
        cantidad: 1,
        estado: "pendiente",
      },
    ]);
  };

  const guardarCambios = () => {
    const mesaActualizada: Mesa = {
      ...mesa,
      mesero,
      cantidadPersonas,
      disponible,
      ordenes,
    };

    onSave(mesaActualizada);
    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Editar Mesa #{mesa.numero}</h2>

        <label>Mesero:</label>
        <input
          value={mesero}
          onChange={(e) => setMesero(e.target.value)}
          style={inputStyle}
        />

        <label>Cantidad de Personas:</label>
        <input
          type="number"
          value={cantidadPersonas}
          onChange={(e) => setCantidadPersonas(Number(e.target.value))}
          style={inputStyle}
        />

        <label>Estado:</label>
        <select
          value={disponible ? "disponible" : "ocupada"}
          onChange={(e) =>
            setDisponible(e.target.value === "disponible")
          }
          style={inputStyle}
        >
          <option value="disponible">Disponible</option>
          <option value="ocupada">Ocupada</option>
        </select>

        <h3>Órdenes</h3>

        {ordenes.map((orden, index) => (
          <div key={orden.id} style={{ marginBottom: "10px" }}>
            <input
              placeholder="Plato"
              value={orden.plato}
              onChange={(e) =>
                actualizarOrden(index, "plato", e.target.value)
              }
              style={inputStyle}
            />
            <input
              type="number"
              value={orden.cantidad}
              onChange={(e) =>
                actualizarOrden(index, "cantidad", Number(e.target.value))
              }
              style={inputStyle}
            />
            <select
              value={orden.estado}
              onChange={(e) =>
                actualizarOrden(index, "estado", e.target.value)
              }
              style={inputStyle}
            >
              <option value="pendiente">Pendiente</option>
              <option value="preparacion">Preparación</option>
              <option value="entregado">Entregado</option>
            </select>
          </div>
        ))}

        <button onClick={agregarOrden} style={buttonStyle}>
          + Agregar Orden
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <button onClick={onClose} style={buttonStyle}>
            Cancelar
          </button>
          <button onClick={guardarCambios} style={saveButtonStyle}>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "12px",
  width: "500px",
  maxHeight: "90vh",
  overflowY: "auto",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  marginBottom: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle: React.CSSProperties = {
  padding: "8px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#6c757d",
  color: "white",
  cursor: "pointer",
};

const saveButtonStyle: React.CSSProperties = {
  padding: "8px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#28a745",
  color: "white",
  cursor: "pointer",
};
