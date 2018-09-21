const utils = {
    prepareData: function (v) {
        if (v.backdrop_path) {
            v.image_url = image_url + v.backdrop_path;
        } else {
            v.image_url = image_default;
        }
        v.isFavourite = shared.favourites.indexOf(v.id) !== -1;
        v.rating = Math.ceil(v.vote_average);
    }
}

const shared = {

    genres: [],
    favourites: [],
    genresMap: {},
    orderBy: [
        {text: "Title", value: "title"},
        {text: "Date", value: "release_date"},
        {text: "Popularity", value: "popularity"},
        {text: "Rating", value: "vote_average"},
    ]
}



var app = new Vue({
    el: "#main",
    router: router,
    data: {
        shared: shared,
    },

    created: function () {
        var vm = this;
        api().favourites.get().then(function (response) {
            vm.shared.favourites = response;
        });

        api().genres().then(function (v) {
            vm.shared.genres = v.genres;
            v.genres.forEach(function (obj) {
                vm.shared.genresMap[obj.id] = obj.name;
            })
        })
    },
    computed: {
        favourites: function () {
            return shared.favourites;
        }
    },


});
