const utils = {
    prepareData: function (v) {
        if (v.backdrop_path) {
            v.image_url = image_url + v.backdrop_path;
        } else {
            v.image_url = image_default;
        }
        v.isFavourite = shared.favourites.indexOf(v.id) !== -1;
    }
}

const shared = {

    genres: [],
    favourites: [],
    genresMap: {}
}


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
  ]
})

var app = new Vue({
    el: "#main",
    router: router,
    data: {
        shared: shared,
    },

    created: function () {
        var vm = this;
        vm.shared.favourites = api().favourites.get();

        api().genres().then(function (v) {
            vm.shared.genres = v.genres;
            v.genres.forEach(function (obj) {
                vm.shared.genresMap[obj.id] = obj.name;
            })
        })
    },


});
