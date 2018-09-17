//Vue.component('blog-post', {
//    props: ['post'],
//    template: `
//        <div class="blog-post">
//            <h3>{{ post.title }}</h3>
//            <slot></slot>    
//<button class="btn btn-primary" @click="$emit('growth')">Uptext</button>
//        </div>
//    `
//});//
var movies_url = 'https://api.themoviedb.org/3/movie/popular?api_key=ef963e24f0dc29f7a9347e404b8c5b62';
var favourites = JSON.parse(localStorage.getItem('favourites') || "[]");

new Vue({
    el: "#main",
    data: {
        items: [],
        search: '',
        //favourites: [1, 2, 3],
    },
    created: function () {
        this.getItems();
        //favourites = this.getFavourites();
        console.log(favourites, 123);
        this.items.forEach(function (obj) {
            console.log(obj);
            if (favourites.indexOf(obj.id) > -1)
                obj.isActive = true;
        });
        console.log(this.items);
        //        this.items = [];
    },
    methods: {
        getItems: function () {
            return this.$http.get(movies_url).then(function (response) {
                console.log(response);
                this.items = response.body.results;
                this.data = response;
                return true;
            }, function (error) {
                console.log(error);
            });
        },
        upadetItems: function () {
            //                ;
            var newItems = this.getItems()
            var current = [].slice.call(this.items);
            this.items = current.concat(newItems);
            //                this.items.concat(this.getItems());
            //            console.log(this.items);

        },
        searchItems: function () {
            //we can use here som custom request with parameters for backend sorting
            //    return this.$http.get('./items.json')
            //console.log(this.items);

            var items = [].slice.call(this.items)
            items.filter(function (obj) {
                return obj.title.indexOf(1);
            });


        },
        addFavourites: function (id) {
            if (typeof (Storage) !== "undefined") {
                //var favourites = this.getFavourites();
                console.log(
                    //                    id,
                    //                    this.items,
                    //Array.isArray(this.favourites)
                );
                var exists = favourites.some(function (item, index) {
                    //console.log(item, index);
                    return (item == id) && removeItem(index);
                });

                if (!exists) {
                    this.items.some(function (item, index) {
                        return item.id == id && addItem();
                    });
                }

                function addItem() {
                    favourites.push(id);
                    localStorage.setItem('favourites', JSON.stringify(favourites));

                }

                function removeItem(index) {
                    favourites.splice(index, 1);
                    localStorage.setItem('favourites', JSON.stringify(favourites));
                    return true;
                }
            } else {
                console.log('Sorry! No Web Storage support..');
            }
        },
    }

    //    watch: {
    //        search: function (val) {
    //            this.items = Array.prototype.filter.call(this.items, function (item) {
    //
    //                console.log(item);
    //                return item.title.indexOf(val);
    //            });
    //        },
    //    },


});