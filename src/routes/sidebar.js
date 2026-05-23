/**
 * ⚠ These are physical routes you want to be visible in sidebar
 * For internal routes and parameters, sub routes use lines for dynamic
 */
const routes = [
  {
    path: '/app/dashboard',
    icon: 'HomeIcon',
    name: 'Dashboard',
  },
  {
    path: '/app/users',
    icon: 'UserIcon',
    name: 'Usuarios',
  },
  {
    path: '/app/roles',
    icon: 'OutlineCogIcon',
    name: 'Roles',
  },
  {
    path: '/app/permissions',
    icon: 'OutlineShieldIcon',
    name: 'Permisos',
  },
  {
    path: '/app/materiales',
    icon: 'FormsIcon',
    name: 'Material Bibliográfico',
  },
  {
    path: '/app/reservas',
    icon: 'FormsIcon',
    name: 'Reservas',
  }
]

export default routes