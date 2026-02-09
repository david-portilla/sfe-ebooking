import { cn } from '../../lib/utils';

export function Container({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function Grid({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}
      {...props}
    >
      {children}
    </div>
  );
}
