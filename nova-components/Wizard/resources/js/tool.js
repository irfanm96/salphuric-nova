Nova.booting((Vue, router, store) => {
    router.addRoutes([
        {
            name: 'wizard',
            path: '/wizard',
            component: require('./components/Tool'),
        },
    ])
})
