const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home'
        },
        {
            path: '/favourites',
            component: Favourites,
            name: 'favourites'
        },
        {
            path: '/details/:id',
            component: Details,
            name: 'details'
        }
    ],
    scrollBehavior: function(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }

})
