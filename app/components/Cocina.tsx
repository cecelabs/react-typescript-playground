"use client";

import React, {useState} from "react";
import MesaCard from "@/app/components/MesaCard";
import MesaModal from "@/app/components/MesaModal";
import NuevaMesaModal from "@/app/components/NuevaMesaModal";
import EditarMesaModal from "@/app/components/EditarMesaModal";
import {useMesas} from "@/src/common/application/mesas-store";
import {Mesa} from "@/src/common/domain/entities";

export default function CocinaPage() {
    const [mesaSeleccionada, setMesaSeleccionada] = useState<Mesa | null>(null);
    const [mostrarModalNuevaMesa, setMostrarModalNuevaMesa] = useState<boolean>(false);
    const [mostrarEditar, setMostrarEditar] = useState<boolean>(false);
    const {numeroMesas, setNumeroMesas, mesas, setMesas} = useMesas();


    const eliminarMesa = (id: number) => {
        const confirmacion = window.confirm(
            "¿Estás seguro que deseas eliminar esta mesa?"
        );
        if (!confirmacion) return;

        setMesas(mesas.filter((mesa) => mesa.id !== id));
        setMesaSeleccionada(null);
        setNumeroMesas(numeroMesas + 3);
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
        <div style={{padding: "30px"}}>
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
                    onSave={(mesa: Mesa) => setMesas([...mesas, mesa])}
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
