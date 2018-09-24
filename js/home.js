const Home = {
    template: "#home",
    data: function () {
        return {
            movies: [],
            search: '',
            genre: '',
            isLoading: true,
            total: 0,
            page: 1,
            orderBy: shared.orderBy,
            orderByValue: '',
        }
    },
    created: function () {
        var vm = this;
        vm.getPopularMovies();

    },
    computed: {
        filteredItems() {
            //            var vm = this;
            var search = this.search.toLowerCase();
            var items = this.movies;
            var genre = this.genre;
            var sorting = this.orderByValue;
            if (search) {
                items = items.filter((item) => {
                    return Object.values(item).join().toLowerCase().indexOf(search) !== -1;
                })
            }
            if (genre) {
                items = items.filter((item) => {
                    return item.genre_ids.indexOf(genre) !== -1;
                })
            }
            if(sorting){
                items = _.orderBy(items, sorting);
            }
            return items;

        },
        genres() {
            return shared.genres;
        },
        favourites() {
            return shared.favourites;

        },
        
        //        error: function () {
        //            var regex = new RegExp("\W+");
        //            if (regex.test(this.search)) {
        //                return "Only for characters";
        //            }
        //            return false;
        //        },


    },
    watch: {
        page(val) {
            this.getPopularMovies(val);
//           router.push('/');
        }

    },
    methods: {
        getPopularMovies(page) {
            var vm = this;
            vm.isLoading = true;
            api().movies.popular(page).then((v) => {
                v.results.forEach((item) => {
                    utils.prepareData(item);
                })
                vm.movies = v.results;
                vm.total = v.total_results;
                vm.isLoading = false;
            });
        }
    }

};
