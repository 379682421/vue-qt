// 模拟

export const menus = [
    {
        path: '/permission',
        component: 'Layout',
        redirect: '/permission/page',
        name: 'Permission',
        meta: {
            title: '权限',
            icon: 'dashboard',
            roles: ['admin'] // you can set roles in root nav
        },
    },
]