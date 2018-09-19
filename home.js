const Home = {
    template:"#home",
    props: ['favourites', 'genres'],
    data: function(){
        return{
            movies: [],
            search: '',
//            favourites: shared.favourites,
//            items: [],
//            genres: shared.genres,
            genresMap: {},
            genre: '',
            //favourites: [],
            isLoading: true,
        }
    },
    created: function(){
        var vm = this;
        vm.genres.forEach(function (obj) {
            vm.genresMap[obj.id] = obj.name;
        })
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
            vm.isLoading = false;
        });

    },
    computed: {
        filteredItems: function () {
//            var vm = this;
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

        },
       
    },
    methods: {
    
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