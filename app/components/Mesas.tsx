"use client";

import React, { useState } from "react";
import MesaCard, { Mesa } from "@/app/components/MesaCard";
import MesaModal from "@/app/components/MesaModal";
import NuevaMesaModal from "@/app/components/NuevaMesaModal";
import EditarMesaModal from "@/app/components/EditarMesaModal";

export default function MesasPage() {
  const [mesaSeleccionada, setMesaSeleccionada] = useState<Mesa | null>(null);
  const [mostrarModalNuevaMesa, setMostrarModalNuevaMesa] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);

  const [mesas, setMesas] = useState<Mesa[]>([
    {
      id: 1,
      numero: 1,
      mesero: "Carlos",
      disponible: false,
      cantidadPersonas: 4,
      ordenes: [
        { id: 1, plato: "Pizza", cantidad: 2, estado: "preparacion" },
        { id: 2, plato: "Refresco", cantidad: 4, estado: "entregado" },
      ],
    },
    {
      id: 2,
      numero: 2,
      mesero: "Ana",
      disponible: true,
      cantidadPersonas: 0,
      ordenes: [],
    },
  ]);

  const guardarNuevaMesa = (mesa: Mesa) => {
    setMesas([...mesas, mesa]);
  };

  const eliminarMesa = (id: number) => {
    const confirmacion = window.confirm(
      "¿Estás seguro que deseas eliminar esta mesa?"
    );
    if (!confirmacion) return;

    setMesas(mesas.filter((mesa) => mesa.id !== id));
    setMesaSeleccionada(null);
  };

  const actualizarMesa = (mesaActualizada: Mesa) => {
    setMesas(
      mesas.map((m) =>
        m.id === mesaActualizada.id ? mesaActualizada : m
      )
    );
    setMesaSeleccionada(mesaActualizada);
  };

  return (
    <div style={{ padding: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Gestión de Mesas</h1>

        <button
          onClick={() => setMostrarModalNuevaMesa(true)}
          style={{
            padding: "10px 15px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Añadir Mesa
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {mesas.map((mesa) => (
          <MesaCard
            key={mesa.id}
            mesa={mesa}
            onClick={setMesaSeleccionada}
          />
        ))}
      </div>

      {mesaSeleccionada && (
        <MesaModal
          mesa={mesaSeleccionada}
          onClose={() => setMesaSeleccionada(null)}
          onDelete={eliminarMesa}
          onEdit={() => setMostrarEditar(true)}
        />
      )}

      {mostrarModalNuevaMesa && (
        <NuevaMesaModal
          onClose={() => setMostrarModalNuevaMesa(false)}
          onSave={guardarNuevaMesa}
          siguienteNumero={mesas.length + 1}
        />
      )}

      {mostrarEditar && mesaSeleccionada && (
        <EditarMesaModal
          mesa={mesaSeleccionada}
          onClose={() => setMostrarEditar(false)}
          onSave={actualizarMesa}
        />
      )}
    </div>
  );
}
