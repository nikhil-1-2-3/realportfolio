import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
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
    'relative inline-flex items-center justify-center font-medium transition-all rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-theme-base disabled:opacity-50 disabled:cursor-not-allowed select-none overflow-hidden';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 font-mono',
    md: 'text-sm px-5 py-2.5 gap-2 font-sans font-semibold',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-sans font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-gradient-palette hover:brightness-110 text-white font-semibold shadow-sand hover:shadow-sand-lg border border-white/20 focus:ring-apricot',
    gold:
      'bg-gradient-warm hover:brightness-110 text-white font-bold shadow-sand-sm border border-white/20 focus:ring-cognac',
    secondary:
      'bg-theme-surface hover:bg-theme-hover text-theme-main border border-cognac/25 shadow-sand-sm hover:border-cognac/60 focus:ring-cognac',
    outline:
      'bg-transparent hover:bg-theme-hover text-theme-main border border-cognac/25 hover:border-apricot focus:ring-apricot',
    ghost:
      'bg-transparent hover:bg-theme-hover text-theme-muted hover:text-theme-main focus:ring-cognac',
  };

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { scale: 1.025, y: -1 }}
      whileTap={disabled || isLoading ? undefined : { scale: 0.975 }}
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
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </motion.button>
  );
};
