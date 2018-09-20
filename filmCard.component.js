Vue.component('FilmCard', {
//    name: 'FilmCard',
    template: "#film-card",
    props: {
        item: Object,
    },
    data: function () {
        return {
            
        }
    },
    computed: {
        favourites: function(){
            return shared.favourites;
        },
        genres: function(){
            return shared.genresMap;
        }
    },
    methods: {

        setFavourite: function (item) {
            item.isFavourite = !item.isFavourite;
            var index = this.favourites.indexOf(item.id);
            var promise;
            if (index !== -1) {
                promise = api().favourites.remove(index);

            } else {
                promise = api().favourites.add(item.id);
            }
            promise.then(function(response){
                shared.favourites = response;
            });
        },

    }


});
