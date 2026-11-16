import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A050B] disabled:opacity-50 disabled:cursor-not-allowed select-none overflow-hidden';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 font-mono',
    md: 'text-sm px-5 py-2.5 gap-2 font-sans font-semibold',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-sans font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-mint hover:bg-mint/90 text-[#0A050B] font-bold shadow-glow-mint border border-white/20 focus:ring-mint',
    gradient:
      'bg-gradient-to-r from-wine via-teal to-mint text-white font-bold shadow-glow-wine border border-white/20 focus:ring-mint',
    secondary:
      'bg-[#130A15] hover:bg-[#1B0E1E] text-white border border-lavender/30 hover:border-mint/60 shadow-card-dark focus:ring-mint',
    outline:
      'bg-transparent hover:bg-[#130A15] text-white border border-lavender/35 hover:border-mint focus:ring-mint',
    ghost:
      'bg-transparent hover:bg-[#130A15] text-neutral-300 hover:text-white focus:ring-mint',
  };

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { scale: 1.03, y: -2 }}
      whileTap={disabled || isLoading ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}

      <span>{children}</span>

      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </motion.button>
  );
};
