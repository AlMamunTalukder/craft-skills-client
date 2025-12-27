// src/components/shared/Container.tsx
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`max-w-[1100px] w-full mx-auto px-5 ${className}`}>
      {children}
    </div>
  );
}