import { lazy } from 'react'
import ReservasPage from '../pages/reservas/ReservasPage';

const Page404 = lazy(() => import('../pages/Page404.jsx'))
const Users = lazy(() => import('../pages/Dashboard/users/UsersPage.jsx'))
const Roles = lazy(() => import('../pages/Dashboard/roles/RolesPage.jsx'))
const Permissions = lazy(() => import('../pages/Dashboard/permissions/PermissionsPage.jsx'))
const Materiales = lazy(() => import('../pages/Dashboard/Materiales.jsx'))
const ReservasPage = lazy(() => import('../pages/reservas/ReservasPage.jsx'))

/**
 * ⚠ These are internal routes!
 */
const routes = [
    {
        path: 'users',
        component: Users,
    },
    {
        path: 'roles',
        component: Roles,
    },
    {
        path: 'permissions',
        component: Permissions,
    },
    {
        path: 'materiales',
        component: Materiales,
    },
    {
        path: 'reservations',
        component: ReservasPage,
    },
    
    {
        path: '404',
        component: Page404,
    }
]

export default routes
