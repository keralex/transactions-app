export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: number;
  customClass?: string;
  ariaLabel?: string;
  role?: string;
}
