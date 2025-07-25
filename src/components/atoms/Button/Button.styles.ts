// src/components/atoms/Button/Button.styles.ts

export const buttonBaseStyles =
  'rounded-[24px] inline-flex items-center justify-center cursor-pointer transition-shadow disabled:cursor-not-allowed';

export const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const buttonVariants = {
  primary: 'bg-primary text-white hover:shadow-lg',
  secondary: 'bg-gray-100 text-gray-900 hover:shadow-lg',
  ghost: 'bg-transparent',
  outline: 'bg-transparent text-primary border border-primary hover:shadow-lg',
};

export const buttonDisabled = {
  primary:
    'disabled:bg-neutral-lighter disabled:text-white disabled:hover:shadow-none',
  secondary:
    'disabled:bg-neutral-lighter disabled:text-white disabled:hover:shadow-none',
  ghost:
    'disabled:bg-neutral-lighter disabled:text-white disabled:hover:shadow-none',
  outline:
    'disabled:bg-transparent disabled:text-neutral-lighter disabled:border-neutral-lighter disabled:hover:shadow-none',
};

export const iconDimensions = {
  sm: 16,
  md: 20,
  lg: 24,
};
