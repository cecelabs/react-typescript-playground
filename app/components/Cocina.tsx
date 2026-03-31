"use client";

import React, {useState} from "react";
import MesaCard from "@/app/components/MesaCard";
import MesaModal from "@/app/components/MesaModal";
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
                        onClick={(mesa) => {
                            setMesaSeleccionada(mesa);
                            setMostrarEditar(true);
                        }}
                    />
                ))}
            </div>

            {/*{mesaSeleccionada && (*/}
            {/*    <MesaModal*/}
            {/*        mesa={mesaSeleccionada}*/}
            {/*        onClose={() => setMesaSeleccionada(null)}*/}
            {/*        onDelete={eliminarMesa}*/}
            {/*        onEdit={() => setMostrarEditar(true)}*/}
            {/*        showMesero={false}*/}
            {/*        showDelete={false}*/}

            {/*    />*/}
            {/*)}*/}

            {mostrarModalNuevaMesa && (
                <EditarMesaModal
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
                    showMesero={true}
                    showCantidadPersonas
                    showEstado={true}
                    showOrdenes={false}
                />
            )}

            {mostrarEditar && mesaSeleccionada && (
                <EditarMesaModal
                    mesa={mesaSeleccionada}
                    onClose={() => setMostrarEditar(false)}
                    onSave={actualizarMesa}
                    showMesero={false}
                    showCantidadPersonas={false}
                    showEstado={false}
                    showAgregarOrden={false}
                />
            )}
        </div>
    );
}
