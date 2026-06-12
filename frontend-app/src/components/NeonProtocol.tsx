import React from 'react';
import '../styles/neon-protocol.css';

interface NeonCardProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'error';
  className?: string;
}

export const NeonCard: React.FC<NeonCardProps> = ({
  title,
  children,
  variant = 'default',
  className = '',
}) => {
  const borderColorClass = {
    default: 'border-outline-variant',
    primary: 'border-primary-fixed-dim',
    success: 'border-secondary-fixed-dim',
    error: 'border-error',
  }[variant];

  return (
    <div className={`ascii-border ${borderColorClass} p-4 bg-surface-container-low glitch-hover ${className}`}>
      {title && (
        <div className={`text-outline code-snippet text-[11px] mb-4 ${variant === 'primary' ? 'text-primary-fixed-dim' : ''
          }`}>
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const variantClass = {
    primary: 'border-primary-fixed-dim text-primary-fixed-dim hover:bg-primary-fixed-dim hover:text-on-primary',
    secondary: 'border-secondary-fixed-dim text-secondary-fixed hover:bg-secondary-fixed hover:text-on-secondary-fixed',
    danger: 'border-error text-error hover:bg-error hover:text-on-error',
  }[variant];

  const sizeClass = {
    sm: 'px-3 py-1 text-[11px]',
    md: 'px-4 py-2 text-[12px]',
    lg: 'px-6 py-3 text-[14px]',
  }[size];

  return (
    <button
      className={`border font-code-snippet flex items-center justify-center gap-2 transition-all duration-150 active:opacity-50 ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface NeonStatusTagProps {
  status: 'verified' | 'pending' | 'critical' | 'warning' | 'active';
  children: React.ReactNode;
}

export const NeonStatusTag: React.FC<NeonStatusTagProps> = ({
  status,
  children,
}) => {
  const colorClass = {
    verified: 'border-primary-fixed-dim text-primary-fixed-dim',
    pending: 'border-secondary-fixed-dim text-secondary-fixed',
    critical: 'border-error text-error',
    warning: 'border-secondary-fixed-dim text-secondary-fixed',
    active: 'border-primary-fixed-dim text-primary-fixed-dim',
  }[status];

  return (
    <span className={`px-2 py-0.5 border text-[10px] font-code-snippet ${colorClass}`}>
      {children}
    </span>
  );
};

interface NeonProgressBarProps {
  value: number; // 0-100
  color?: 'primary' | 'secondary' | 'error';
  className?: string;
}

export const NeonProgressBar: React.FC<NeonProgressBarProps> = ({
  value,
  color = 'primary',
  className = '',
}) => {
  const colorClass = {
    primary: 'bg-primary-fixed-dim',
    secondary: 'bg-secondary-fixed',
    error: 'bg-error',
  }[color];

  return (
    <div className={`w-full bg-surface-container-highest h-1.5 overflow-hidden ${className}`}>
      <div
        className={`${colorClass} h-full transition-all duration-300`}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
};

interface NeonHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

export const NeonHeader: React.FC<NeonHeaderProps> = ({
  title,
  subtitle,
  icon,
  actions,
}) => {
  return (
    <div className="mb-8 border-l-4 border-primary-fixed-dim pl-4 flex justify-between items-start">
      <div>
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary-fixed-dim text-[20px]">{icon}</div>}
          <h1 className="headline-lg text-primary uppercase">{title}</h1>
        </div>
        {subtitle && (
          <p className="code-snippet text-on-surface-variant mt-2">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex gap-2">
          {actions}
        </div>
      )}
    </div>
  );
};

interface NeonInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const NeonInput: React.FC<NeonInputProps> = ({
  label,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="label-sm text-outline uppercase">{label}</label>
      )}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-fixed-dim">
          &gt;
        </span>
        <input
          className={`w-full bg-surface-container-low border border-outline-variant rounded-none pl-6 pr-4 py-2 text-code-snippet text-on-surface focus:ring-0 focus:border-primary-fixed-dim focus:outline-none transition-colors ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};
