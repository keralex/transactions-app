export const icons = Object.fromEntries(
  Object.entries(
    import.meta.glob('../../../assets/icons/*.svg', { as: 'raw', eager: true })
  ).map(([path, svg]) => {
    const name = path.split('/').pop()?.replace('.svg', '') ?? '';
    return [name, svg];
  })
);
