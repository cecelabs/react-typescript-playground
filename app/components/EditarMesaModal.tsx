"use client";

import React, {useState} from "react";
import {Mesa, Orden, ESTADOS_ORDEN} from "@/src/common/domain/entities";
import OrdenCard from "@/app/components/OrdenCard";

interface EditarMesaModalProps {
    mesa: Mesa;
    onClose: () => void;
    onSave: (mesaActualizada: Mesa) => void;

    showMesero?: boolean;
    showCantidadPersonas?: boolean;
    showEstado?: boolean;
    showOrdenes?: boolean;
    showAgregarOrden?: boolean;
    showGuardar?: boolean;

    isMeseroEditable?: boolean;
    isCantidadEditable?: boolean;
    isEstadoEditable?: boolean;
    isOrdenesEditable?: boolean;
}

export default function EditarMesaModal({
                                            mesa,
                                            onClose,
                                            onSave,

                                            showMesero = true,
                                            showCantidadPersonas = true,
                                            showEstado = true,
                                            showOrdenes = true,
                                            showAgregarOrden = true,
                                            showGuardar = true,

                                            isMeseroEditable = true,
                                            isCantidadEditable = true,
                                            isEstadoEditable = true,
                                            isOrdenesEditable = true,
                                        }: EditarMesaModalProps) {
    const [mesero, setMesero] = useState(mesa.mesero);
    const [cantidadPersonas, setCantidadPersonas] = useState(mesa.cantidadPersonas);
    const [disponible, setDisponible] = useState(mesa.disponible);
    const [ordenes, setOrdenes] = useState<Orden[]>(mesa.ordenes);

    const actualizarOrden = (
        index: number,
        campo: keyof Orden,
        valor: string | number
    ) => {
        if (!isOrdenesEditable) return;

        const nuevasOrdenes = [...ordenes];
        nuevasOrdenes[index] = {...nuevasOrdenes[index], [campo]: valor};
        setOrdenes(nuevasOrdenes);
    };

    const borrarOrden = (index: number) => {
        if (!isOrdenesEditable) return;

        const nuevasOrdenes = [...ordenes];
        nuevasOrdenes.splice(index, 1);
        setOrdenes(nuevasOrdenes);
    };

    const agregarOrden = () => {
        if (!isOrdenesEditable) return;

        const nuevaOrden: Orden = {
            id: Date.now(),
            plato: "",
            cantidad: 1,
            estado: ESTADOS_ORDEN.PENDIENTE,
        };

        setOrdenes((prev) => [...prev, nuevaOrden]);
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

        {showMesero && (
          <>
            <label>Mesero:</label>
            <input
              value={mesero}
              onChange={(e) => setMesero(e.target.value)}
              style={inputStyle}
              disabled={!isMeseroEditable} // 👈 clave
            />
          </>
        )}

        {showCantidadPersonas && (
          <>
            <label>Cantidad de Personas:</label>
            <input
              type="number"
              value={cantidadPersonas}
              onChange={(e) => setCantidadPersonas(Number(e.target.value))}
              style={inputStyle}
              disabled={!isCantidadEditable} // 👈 clave
            />
          </>
        )}

        {showEstado && (
          <>
            <label>Estado:</label>
            <select
              value={disponible ? "disponible" : "ocupada"}
              onChange={(e) => setDisponible(e.target.value === "disponible")}
              style={inputStyle}
              disabled={!isEstadoEditable} // 👈 clave
            >
              <option value="disponible">Disponible</option>
              <option value="ocupada">Ocupada</option>
            </select>
          </>
        )}

        {showOrdenes && (
          <>
            <h3>Órdenes</h3>

            {ordenes.map((orden, index) => (
              <OrdenCard
                key={orden.id}
                orden={orden}
                onActualizar={(campo, valor) =>
                  actualizarOrden(index, campo, valor)
                }
                onBorrar={() => borrarOrden(index)}

              />
            ))}

            {showAgregarOrden && isOrdenesEditable && (
              <button onClick={agregarOrden} style={buttonStyle}>
                + Agregar Orden
              </button>
            )}
          </>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <button onClick={onClose} style={buttonStyle}>
            Cancelar
          </button>

          {showGuardar && (
            <button onClick={guardarCambios} style={saveButtonStyle}>
              Guardar Cambios
            </button>
          )}
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
    marginTop: "80px",
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
