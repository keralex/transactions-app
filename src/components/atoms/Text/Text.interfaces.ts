import type { HTMLAttributes, ReactNode, ElementType } from 'react';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'button';
  weight?: 'regular' | 'semibold';
  as?: ElementType;
  className?: string;
}
