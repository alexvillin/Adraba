const Details = {
    template: "#details",
    
    data: function () {
        return {
            item: {},
            related: [],
        }
    },
    
    created: function () {
        var id = this.$route.params.id;
        this.loadData(id);

    },
    watch: {
        '$route': function (to, from) {
            this.loadData(to.params.id)
        }
    },
    
    computed: {
        favourites: function () {
            return shared.favourites;
        }
    },
    methods: {
        loadData: function (id) {
            var vm = this;
            api().movies.getById(id).then(function (v) {
                //set model for movie 
                utils.prepareData(v);
                vm.item = v;
            });
            api().movies.related(id).then(function (v) {
                v.results.forEach(function (item) {
                    utils.prepareData(item);
                })
                vm.related = v.results;
            });
        }
    }


};
