Vue.component('FilmCard', {
    name: 'FilmCard',
    template: "#film-card",
    props: {
        item: Object,
//        genres: Object,
        //favourites: Array,
        //genre: String,
    },
    data: function(){
        return {
            favourites: shared.favourites,
            genres: shared.genresMap,
            genre: shared.genre,
            shared: shared
        }
    },
    watch: {
        genre: function(val){
            shared.genre = val;
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