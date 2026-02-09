import {
  TextField,
  Label,
  Input as AriaInput,
  type TextFieldProps as AriaTextFieldProps,
  FieldError,
  Text,
} from 'react-aria-components';
import { cn } from '../../lib/utils';

export interface InputProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string;
  className?: string;
  placeholder?: string;
}

export function Input({
  label,
  description,
  errorMessage,
  className,
  placeholder,
  ...props
}: InputProps) {
  return (
    <TextField {...props} className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
      )}
      <AriaInput
        placeholder={placeholder}
        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      {description && (
        <Text slot="description" className="text-xs text-gray-500">
          {description}
        </Text>
      )}
      {errorMessage && (
        <FieldError className="text-xs text-red-600">{errorMessage}</FieldError>
      )}
    </TextField>
  );
}
