# 💳 Ualá - Web Developer Challenge

Aplicación web mobile-first que simula una sección de cobros para un comercio, permitiendo al usuario visualizar su saldo, transacciones, aplicar filtros avanzados, exportar movimientos y ver métricas generales. Desarrollado como parte del challenge técnico de Ualá.

---

## 🚀 Tech Stack

- **React** + **Vite** + **TypeScript**
- **Zustand** para manejo de estado
- **React Query** para consumo y caché de datos
- **Tailwind CSS** con tema custom Ualá
- **React Aria Components** para accesibilidad (datepicker)
- **Jest + React Testing Library** para testing
- **ESLint + Prettier** para código limpio

---

## 📦 Instalación y ejecución

```bash
# Clonar el repo
git clone https://github.com/keralex/transactions-app.git
cd transactions-app

# Instalar dependencias
npm install

# Levantar entorno de desarrollo
npm run dev

# Correr tests
npm run test
```

---

## 🧱 Arquitectura del proyecto

La app se estructura siguiendo el enfoque **Atomic Design**, para promover la **reusabilidad**, **modularidad** y **mantenibilidad**:

```
src/
├── components/
│   ├── atoms/         # Elementos básicos (Text, Icon, Button)
│   ├── molecules/     # Combinaciones (FilterGroup, CalendarExport, EmptyState)
│   ├── organisms/     # Secciones grandes (TransactionList, MetricsSection)
├── hooks/             # Custom hooks optimizados
├── services/          # Abstracción del acceso a la API
├── stores/            # Zustand: filtros, fecha, métodos, tarjetas
├── types/             # Tipados globales
├── utils/             # Helpers de fecha, monto, etc.
├── theme/             # Configuración de Tailwind
├── pages/             # Rutas principales
```

---

## 🧠 Principios de diseño aplicados

Se tomaron en cuenta buenas prácticas de arquitectura de software para garantizar escalabilidad y calidad:

- **SOLID**
  - **S**ingle Responsibility: los componentes tienen responsabilidades únicas.
  - **O**pen/Closed: los componentes son fácilmente extensibles sin ser modificados.
  - **L**iskov Substitution: las props se respetan por contrato gracias a TypeScript.
  - **I**nterface Segregation: tipos concisos por feature.
  - **D**ependency Inversion: los servicios son desacoplados (por ejemplo, fetch aislado).

- **Performance**:
  - `useMemo` y `useCallback` aplicados en hooks y componentes donde había cálculos pesados (filtros, totales).
  - `React.memo` usado en componentes atómicos y listas.
  - Separación de lógica de UI para evitar renders innecesarios.

- **Accesibilidad**:
  - Uso de roles e `aria-label` en botones.
  - Date picker accesible con `react-aria-components`.

---

## ⚙️ Decisiones técnicas

- Zustand para filtros por su sencillez y ergonomía.
- React Query para cachear datos y manejar loading/error de forma declarativa.
- Diseño mobile-first basado en Figma con Tailwind y componentes flexibles.
- El filtrado de transacciones es reactivo, calculado por un hook (`useFilteredTransactions`) desacoplado del UI.
- Calendario personalizado para exportar movimientos sin librerías pesadas.

---

## 🧪 Testing

- Se realizaron tests unitarios con Jest + React Testing Library en componentes clave.
- Se testean funciones de formateo, renderizado condicional, y comportamiento de UI.

---

## 🌱 Mejoras futuras

- ✂️ **Mayor componentización de organismos**: separar aún más lógica interna en moléculas o hooks.
- 🎨 **Mejor separación de estilos**: evitar lógica de layout repetida.
- 🧪 **Agregar tests de integración** para flujos completos (ej: aplicar filtros y verificar resultados).
- 💅 **Mejorar botones** con estados `:disabled`, `:hover`, `:focus-visible`, etc.
- ⏳ **Agregar skeletons** de carga para una experiencia más fluida.
- 🧠 **Lazy loading** en componentes pesados como métricas o gráficos (usando `React.lazy` + `Suspense`).
- 🎯 **Paginar o virtualizar** la lista de transacciones si crece mucho.
- 🧹 Mejorar limpieza de filtros para mejorar UX en combinaciones complejas.

---

## 📤 Deploy

Desplegado en

- [Netlify](https://www.netlify.com/)

---

## 📁 API utilizada

Datos mock de transacciones:

```
https://uala-dev-challenge.s3.us-east-1.amazonaws.com/transactions.json
```

---

## 🧑‍💻 Autor

Desarrollado por [Kerlis Aguado](https://github.com/keralex) para el challenge técnico de Ualá 🚀
