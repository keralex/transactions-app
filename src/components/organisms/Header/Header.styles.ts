export const headerContainerClass =
  ' bg-white p-2 rounded-bl-[32px] h-corner-bottom z-200';

export const cornerStyle = `
  .h-corner-bottom::after {
    content: '';
    position: absolute;
    top: 56px;
    right: 0;
    width: 32px;
    height: 32px;
    background-image: url('src/assets/icons/b-corner.svg'); 
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
  }
`;

export const menuItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Métricas', href: '/metrics' },
];
