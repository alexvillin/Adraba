const Home = {
    template:"#home",
    //props: ['favourites', 'genres'],
    data: function(){
        return{
            movies: [],
            search: shared.search,
            favourites: shared.favourites,
//            items: [],
            genres: shared.genres,
            genresMap: shared.genresMap,
            genre: shared.genre,
            //favourites: [],
            isLoading: true,
        }
    },
    created: function(){
        var vm = this;
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
        vm.genres.forEach(function (obj) {
            vm.genresMap[obj.id] = obj.name;
        })
    },
    
    watch: {
        genre: function(val){
            shared.genre = val;
        }
    },
    computed: {
        filteredItems: function () {
            var vm = this;
            var search = shared.search.toLowerCase();
            var items = this.movies;
            var genre = shared.genre;
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
   

};