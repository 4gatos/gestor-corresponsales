export const apiUrl = 'http://localhost:4200';

export const ROUTES = [
  {
    path: '/gestor/usuario/mi-cuenta',
    icon: 'icon-user',
    title: 'Usuario',
    subtitle: 'Mi cuenta'
  },
  {
    path: '/gestor/usuario/nuevo-usuario',
    icon: 'icon-user',
    title: 'Usuario',
    subtitle: 'Añadir usuario'
  },
  {
    path: '/gestor/usuario/todos',
    icon: 'icon-user',
    title: 'Usuario',
    subtitle: 'Usuarios'
  },
  {
    path: '/gestor/corresponsales/nuevo-corresponsal',
    icon: 'icon-feather',
    title: 'Corresponsales',
    subtitle: 'Añadir corresponsal'
  },
  {
    path: '/gestor/corresponsales/todos',
    icon: 'icon-feather',
    title: 'Corresponsales',
    subtitle: 'Editar corresponsales'
  },
  {
    path: '/gestor/batallas/todas',
    icon: 'icon-swords',
    title: 'Batallas',
    subtitle: 'Editar batallas'
  },
  {
    path: '/gestor/batallas/nueva-batalla',
    icon: 'icon-swords',
    title: 'Batallas',
    subtitle: 'Añadir batalla'
  },
  {
    path: '/gestor/batallas/:slug',
    icon: 'icon-swords',
    title: 'Batallas',
    subtitle: 'Editar batalla'
  },
  {
    path: '/gestor/grupo-de-investigacion',
    icon: 'icon-lens',
    title: 'Grupo de investigación',
    subtitle: 'Editar campos'
  },
  {
    path: '/gestor/marco-historico',
    icon: 'icon-historical-frame',
    title: 'Marco histórico',
    subtitle: 'Editar campos'
  },
];

export function getErrorText(error) {
  switch (error) {
    case 'error_required':
      return 'Campo requerido';
    default:
      return 'Error';
  }
}

export const MAPBOX = 'pk.eyJ1IjoicGxhc28iLCJhIjoiY2puZG0weXZ1Mjl6aDNxcmZybXV0NmV6NCJ9.Vovat6h7DIDOWpa5j4P0_Q';