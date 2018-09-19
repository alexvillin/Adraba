const Details = {
    template: "#details",
    data: function(){
        return {
            item: {},
            related: [],
        }
    },
    created: function () {
        var vm = this;
        var id = vm.$route.params.id;
        
        vm.favourites = api().favourites.get();
        
        api().movies.getById(id).then(function (v) {
            
                if (v.backdrop_path) {
                    v.image_url = image_url + v.backdrop_path;
                } else {
                    v.image_url = image_default;
                }
                v.isFavourite = vm.favourites.indexOf(v.id) !== -1;
            vm.item = v;
        });
        api().movies.related(id).then(function (v) {
            v.results.forEach(function (item) {
               // prepareData(item);
            })
            vm.related = v.results;
        });

    },
    
};