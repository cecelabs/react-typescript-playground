import React, {useState} from 'react';
import MenuButton from "@/app/components/MenuButton";

const PanelMenu = ({activeComponent, setActiveComponent}) => {

    return (
        <nav className="w-1/4 bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">Menu</h3>
            <div className="space-y-3">
                <MenuButton
                    label="View A"
                    value="A"
                    activeComponent={activeComponent}
                    setActiveComponent={setActiveComponent}
                    activeColor="bg-blue-600"
                />

                <MenuButton
                    label="View B"
                    value="B"
                    activeComponent={activeComponent}
                    setActiveComponent={setActiveComponent}
                    activeColor="bg-green-600"
                />

                <MenuButton
                    label="View C"
                    value="C"
                    activeComponent={activeComponent}
                    setActiveComponent={setActiveComponent}
                    activeColor="bg-purple-600"
                />
            </div>
            <hr className="my-6 border-gray-700"/>

        </nav>
    );
};

export default PanelMenu;