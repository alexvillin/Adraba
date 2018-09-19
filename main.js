function prepareData(v){
    if (v.backdrop_path) {
                    v.image_url = image_url + v.backdrop_path;
                } else {
                    v.image_url = image_default;
                }
                v.isFavourite = vm.favourites.indexOf(v.id) !== -1;
    
}

const Favourites = {
    template:"#favourites",
};

var shared = {
    favourites: [],
    genres: [],
    genresMap: {},
    genre: '',
    search: '',
};

const router = new VueRouter({
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/favourites', component: Favourites, name: 'favourites' },
    { path: '/details/:id', component: Details, name: 'details' }
  ]
})

var app = new Vue({
    el: "#main",
    router: router,
    data: {
        shared: shared,
    },
//    components: {
//        'home': Home,
//        'favourites': Favourites,
//        //'film-card': FilmCard,
//    },
    created: function () {
        var vm = this;
        vm.shared.favourites = api().favourites.get();

        api().genres().then(function (v) {
            vm.shared.genres = v.genres;
            
        })

    },

});