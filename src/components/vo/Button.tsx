import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const PRIMARY_SHADOW =
  '0 1px 2px 0 rgba(5,26,36,0.1), 0 4px 4px 0 rgba(5,26,36,0.09), 0 9px 6px 0 rgba(5,26,36,0.05), 0 17px 7px 0 rgba(5,26,36,0.01), 0 26px 7px 0 rgba(5,26,36,0), inset 0 2px 8px 0 rgba(255,255,255,0.5)';

const SECONDARY_SHADOW =
  '0 0 0 0.5px rgba(0,0,0,0.05), 0 4px 30px rgba(0,0,0,0.08)';

const TERTIARY_SHADOW =
  '0 1px 2px 0 rgba(5,26,36,0.06), 0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  onClick,
  href,
  className = '',
  style,
  id,
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-medium text-sm cursor-pointer transition-all duration-200 whitespace-nowrap select-none hover:opacity-90 active:scale-[0.98]';

  const variantStyles: Record<ButtonVariant, { className: string; boxShadow: string }> = {
    primary: {
      className: 'bg-[#051A24] text-white px-7 py-3',
      boxShadow: PRIMARY_SHADOW,
    },
    secondary: {
      className: 'bg-white text-[#051A24] px-7 py-3',
      boxShadow: SECONDARY_SHADOW,
    },
    tertiary: {
      className: 'bg-white text-[#051A24] px-7 py-3',
      boxShadow: TERTIARY_SHADOW,
    },
  };

  const { className: variantClass, boxShadow } = variantStyles[variant];

  const combinedStyle: React.CSSProperties = { boxShadow, ...style };

  if (href) {
    return (
      <a
        id={id}
        href={href}
        className={`${base} ${variantClass} ${className}`}
        style={combinedStyle}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      id={id}
      onClick={onClick}
      className={`${base} ${variantClass} ${className}`}
      style={combinedStyle}
    >
      {children}
    </button>
  );
};
