import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold py-2 px-4 rounded-md transition ease-in-out duration-150';

  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    outline: 'bg-transparent border border-gray-400 text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
  };

  const sizeStyles = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg px-6 py-3',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  const allStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

  return (
    <button className={allStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
