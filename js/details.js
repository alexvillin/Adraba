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
        favourites () {
            return shared.favourites;
        }
    },
    methods: {
        loadData (id) {
            var vm = this;
            api().movies.getById(id).then((v) => {
                //set model for movie 
                utils.prepareData(v);
                vm.item = v;
            });
            api().movies.related(id).then((v) => {
                v.results.forEach((item) => {
                    utils.prepareData(item);
                })
                vm.related = v.results;
            });
        }
    }


};
