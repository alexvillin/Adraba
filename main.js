const Home = {
    template:"#home",
    data: function(){
        return{
            movies: [],
            search: '',
            items: [],
            genres: [],
            genresMap: {},
            genre: '',
            favourites: [],
        }
    },

    created: function () {
        var vm = this;
        vm.favourites = api().favourites.get();
        api().movies.popular().then(function (v) {
            v.results.forEach(function (item) {
                if (item.backdrop_path) {
                    item.image_url = image_url + item.backdrop_path;
                } else {
                    item.image_url = image_default;
                }
                item.isFavourite = vm.favourites.indexOf(item.id) !== -1;
            })
            vm.movies = v.results;
        });
        api().genres().then(function (v) {
            vm.genres = v.genres;
            vm.genres.map(function (obj) {
                vm.genresMap[obj.id] = obj.name;
            })
        })
//        api().favourites().then(function (v) {
//            vm.favourites = v;
//        })

    },
    watch: {
        
    },
    computed: {
        filteredItems: function () {
            //var vm = this;
            var search = this.search.toLowerCase();
            var items = this.movies;
            var genre = this.genre;
            if (search) {
                items = items.filter(function (item) {
                    return Object.values(item).join().toLowerCase().indexOf(search) !== -1;
                })
            }
            if (genre) {
                items = items.filter(function (item) {
                    return item.genre_ids.indexOf(genre) !== -1;
                })
            }
            return items;

        }
    },
    methods: {
        getItems: function () {

        },
        setFavourite: function (item) {
            item.isFavourite = !item.isFavourite;
            var index = this.favourites.indexOf(item.id);
            var done = false;
            if (index !== -1) {
                api().favourites.remove(item.id);
                //                .then(function(){
                                    this.favourites.splice(index, 1);
                //                });

            } else {
                api().favourites.add(item.id);
                //                .then(function(){
                                    this.favourites.push(item.id);
                //                });
            }
        },

    }

};
const Favourites = {
    template:"#favourites"
};


const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/favourites', component: Favourites }
  ]
})



const image_url = 'https://image.tmdb.org/t/p/w500';
const image_default = 'img/default.png';
var api = function () {
    const url = 'https://api.themoviedb.org/3';
    const key = '?api_key=ef963e24f0dc29f7a9347e404b8c5b62';
    return {
        movies: {

            popular: function () {
                return axios.get(url + '/movie/popular' + key)
                    .then(function (response) {
                        return response.data;
                    }).catch(function (e) {
                        console.log(e);
                    });
            }
        },
        genres: function () {
            return axios.get(url + '/genre/movie/list' + key)
                .then(function (response) {
                    return response.data;
                }).catch(function (e) {
                    console.log(e);
                });
        },
        favourites: {
            //todo with async
            get: function () {
                if (typeof (Storage) !== "undefined") {
                    return JSON.parse(localStorage.getItem('favourites') || "[]");
                } else {
                    console.log('Sorry! No Web Storage support..');
                }
            },
            set: function (favourites) {
                localStorage.setItem('favourites', JSON.stringify(favourites));
                return favourites.length;

            },
            add: function (id) {
                var favourites = this.get();
                favourites.push(id);
                return this.set(favourites);
            },

            remove: function (id) {
                var favourites = this.get();
                favourites.splice(favourites.indexOf(id), 1);
                return this.set(favourites);
                
            },
        },



    }

}


var app = new Vue({
    el: "#main",
    router: router,
    components: {
        'home': Home,
        'favourites': Favourites,
    },


});
