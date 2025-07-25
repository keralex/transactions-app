export const headerContainerClass =
  'fixed bg-white p-2 border-b border-[#DEE2EC] rounded-bl-[32px] h-corner z-200';

export const cornerStyle = `
    .h-corner::after {
        content: '';
        position: absolute;
        top: 56px;
        right: 0;
        width: 32px;
        height: 32px;
        background-image: url('/app/assets/icons/h-corner.svg');
        background-size: contain;
        background-repeat: no-repeat;
        pointer-events: none;
    }
`;

export const menuItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Métricas', href: '/metrics' },
];
