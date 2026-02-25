import React from "react";
import CarruselImagenes from '@/app/components/Carousel';
import FormularioContactoPage from "@/app/components/Formulario";
import MesasPage from "@/app/components/Mesas";
import CocinaPage from "@/app/components/Cocina"
import OrdenesPage from "@/app/components/Ordenes"

const ComponentA = () => (
  <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-xl mb-4">
    <h2 className="text-3xl font-bold mb-2">🚀 Component A: Dashboard Overview</h2>
    <p className="text-lg">This section provides a comprehensive overview of your key metrics. Stay informed at a glance with our intuitive design.</p>
  </div>
);
const ComponentB = () => (
  <div className="p-6 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-xl mb-4">
    <h2 className="text-3xl font-bold mb-2">📈 Component B: Performance Analytics</h2>
    <p className="text-lg">Dive deep into your performance data with advanced analytics. Track trends, identify opportunities, and optimize your strategy.</p>
  </div>
);
const ComponentC = () => (
  <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg shadow-xl mb-4">
    <h2 className="text-3xl font-bold mb-2">⚙️ Component C: Settings & Configuration</h2>
    <p className="text-lg">Manage your application settings and tailor your experience. Customize every detail to fit your workflow perfectly.</p>
  </div>
);
const ActiveComponent = ({ activeComponent }) => {
    let ComponenteMostrar;
    switch (activeComponent) {
        case 'A':
            ComponenteMostrar = <ComponentA/>;
            break;
        case 'B':
            ComponenteMostrar = <CarruselImagenes/>;
            break;
        case 'C':
            ComponenteMostrar = <FormularioContactoPage/>;
            break;
        case 'D':
            ComponenteMostrar = <MesasPage/>;
            break;
        case 'E':
            ComponenteMostrar = <OrdenesPage/>;
            break;
        case 'F':
            ComponenteMostrar = <CocinaPage/>;
            break;
        default:
            ComponenteMostrar = <ComponentA/>;
    }

    return (
        <div className="h-screen flex-1 overflow-y-auto">
            {ComponenteMostrar}
        </div>
    );
};

export default ActiveComponent