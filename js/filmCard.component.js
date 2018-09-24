Vue.component('FilmCard', {
    //    name: 'FilmCard',
    template: "#film-card",
    props: {
        item: Object,
        //        small: {
        //            type: Boolean,
        //            default: false,
        //        },
    },
    data: function () {
        return {

        }
    },
    created: function () {
//        console.log(this.small);
    },

    computed: {
        favourites() {
            return shared.favourites;
        },
        genres() {
            return shared.genresMap;
        }
    },
    methods: {

        setFavourite(item) {
            var index = this.favourites.indexOf(item.id);
            var promise;
            if (index !== -1) {
                promise = api().favourites.remove(index);
            } else {
                promise = api().favourites.add(item.id);
            }
            promise.then((response) => {
                shared.favourites = response;
                item.isFavourite = !item.isFavourite;
            });
        },

    }


});
