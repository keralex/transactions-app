export interface LinkProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  href?: string;
  to?: string;
  isExternal?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
  color?: 'dark' | 'white' | 'primary' | 'success' | 'gray' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  isBold?: boolean;
  iconName?: string;
  iconSide?: 'left' | 'right';
  iconSize?: number;
}
