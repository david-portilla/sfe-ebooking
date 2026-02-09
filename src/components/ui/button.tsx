import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';
import { cn } from '../../lib/utils';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends AriaButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 pressed:bg-blue-800',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 pressed:bg-gray-300',
  outline:
    'border border-gray-300 bg-transparent hover:bg-gray-50 pressed:bg-gray-100',
  ghost: 'bg-transparent hover:bg-gray-100 pressed:bg-gray-200',
  danger: 'bg-red-600 text-white hover:bg-red-700 pressed:bg-red-800',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={() =>
        cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className,
        )
      }
    />
  );
}
