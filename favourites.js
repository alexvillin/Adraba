const Favourites = {
    template: "#favourites",
    data: function(){
        return {
            movies: [],
        }
    },
    created: function () {

    },
    computed: {
        favourites: function() {
            var vm = this;
            var f = shared.favourites;
            
            f.forEach(function (id) {
                api().movies.getById(id).then(function (v) {
                    //set model for movie 
                    utils.prepareData(v);
                    vm.movies.push(v);
                });
            })
            return f;
        }
    },
    watch: {
        favourites: function (val) {
            var vm = this;
            vm.movies = [];
            val.forEach(function (id) {
                api().movies.getById(id).then(function (v) {
                    //set model for movie 
                    utils.prepareData(v);
                    vm.movies.push(v);
                });
            })
        }
    }
};
