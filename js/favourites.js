const Favourites = {
    template: "#favourites",
    data: function () {
        return {
            movies: [],
        }
    },
    created: function () {
        var vm = this;
        api().favourites.get().then(function (f) {
            f.forEach(function (id) {
                api().movies.getById(id).then(function (v) {
                    //set model for movie 
                    utils.prepareData(v);
                    vm.movies.push(v);
                });
            })
        });
    },
    computed: {
        favourites: function () {
            return shared.favourites;
        },
    },

};
