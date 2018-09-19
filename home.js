const Home = {
    template: "#home",
    //props: ['favourites', 'genres'],
    data: function () {
        return {
            movies: [],
            search: '',
            genre: '',
            isLoading: true,
        }
    },
    created: function () {
        var vm = this;
        //vm.genres = ;
        api().movies.popular().then(function (v) {
            v.results.forEach(function (item) {
                utils.prepareData(item);
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
        genres: function(){
          return shared.genres;   
        },
        favourites: function(){
            return shared.favourites;
        }
        

    },



};
