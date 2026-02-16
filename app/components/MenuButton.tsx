import React from 'react';

interface MenuButtonProps {
  label: string;
  value: string;
  activeComponent: string;
  setActiveComponent: (value: string) => void;
  activeColor: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  label,
  value,
  activeComponent,
  setActiveComponent,
  activeColor,
}) => {
  const isActive = activeComponent === value;

  return (
    <button
      onClick={() => setActiveComponent(value)}
      className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ease-in-out ${
        isActive
          ? `${activeColor} text-white shadow-md`
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
};

export default MenuButton;
