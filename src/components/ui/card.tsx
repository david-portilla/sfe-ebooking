import { cn } from '../../lib/utils';

export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
