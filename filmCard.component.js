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


});
