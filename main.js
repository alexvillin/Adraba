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



var app = new Vue({
    el: "#main",
    router: router,
    data: {
        shared: shared,
    },

    created: function () {
        var vm = this;
        api().favourites.get().then(function(response){
            vm.shared.favourites = response;
        });

        api().genres().then(function (v) {
            vm.shared.genres = v.genres;
            v.genres.forEach(function (obj) {
                vm.shared.genresMap[obj.id] = obj.name;
            })
        })
    },


});
