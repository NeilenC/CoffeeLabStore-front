import dynamic from 'next/dynamic';

const Map = dynamic(()=> import('./Map'), {
  ssr:false // Deshabilitamos ssr en map component 
});

export default Map;