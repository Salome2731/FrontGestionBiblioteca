import { lazy } from 'react'

const Page404 = lazy(() => import('../pages/Page404.jsx'))
const Users = lazy(() => import('../pages/Dashboard/users/UsersPage.jsx'))
const Roles = lazy(() => import('../pages/Dashboard/roles/RolesPage.jsx'))
const Permissions = lazy(() => import('../pages/Dashboard/permissions/PermissionsPage.jsx'))
const Materiales = lazy(() => import('../pages/Dashboard/Materiales.jsx'))

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
        path: '404',
        component: Page404,
    }
]

export default routes