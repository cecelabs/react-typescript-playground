"use client";

import React, {useState} from "react";
import MesaCard from "@/app/components/MesaCard";
import MesaModal from "@/app/components/MesaModal";
import OrdenModal from "@/app/components/OrdenesModal";
import EditarMesaModal from "@/app/components/EditarMesaModal";
import {useMesas} from "@/src/common/application/mesas-store";
import {Mesa} from "@/src/common/domain/entities";
import NuevaMesaModal from "@/app/components/NuevaMesaModal";

export default function OrdenesPage() {
    const [mesaSeleccionada, setMesaSeleccionada] = useState<Mesa | null>(null);
    const [mostrarModalNuevaMesa, setMostrarModalNuevaMesa] = useState<boolean>(false); // ⬅️ antes mostrarModalNuevaMesa
    const [mostrarEditar, setMostrarEditar] = useState<boolean>(false);
    const {numeroMesas, setNumeroMesas, mesas, setMesas} = useMesas();

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
        setNumeroMesas(numeroMesas + 2);
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
            <h1>Gestión de Órdenes</h1>

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
                    showMesero={false}

                />
            )}

            {mostrarModalNuevaMesa && (
                <NuevaMesaModal
                    mesa={{
                        id: Date.now(),
                        numero: mesas.length + 1,
                        mesero: "",
                        cantidadPersonas: 0,
                        disponible: true,
                        ordenes: []
                    }}
                    onClose={() => setMostrarModalNuevaMesa(false)}
                    onSave={(mesa: Mesa) => setMesas([...mesas, mesa])}
                    showMesero={false}
                    showCantidadPersonas
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