"use client";
interface ActionButtonProps {
  onClick?: () => void;
  title: string;
  className?: string;
  children: React.ReactNode;
}

export function ActionButton({
  onClick,
  title,
  className,
  children,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      title={title}
    >
      {children}
    </button>
  );
}
