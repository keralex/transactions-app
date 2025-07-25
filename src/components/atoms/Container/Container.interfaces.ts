// src/components/atoms/Container/types.ts

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  margin?: 'none' | 'sm' | 'md' | 'lg';
  isFlex?: boolean;
  direction?: 'row' | 'column';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'stretch';
  gap?: number;
  isGrid?: boolean;
  columns?: keyof typeof import('./Container.styles').columnOptions;
  wrap?: boolean;
  hasBorder?: boolean;
  borderColor?: 'gray' | 'primary';
  disableBaseStyles?: boolean;
  isAuto?: boolean;
}
