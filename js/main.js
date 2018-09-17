Vue.config('debug', true)
    //var NotFound = {
    //    template: '<p>Страница не найдена</p>'
    //}
    //var Home = {
    //    template: '<p>главная</p>'
    //}
    //var About = {
    //    template: '<p>о нас</p>'
    //}
    //
    //var routes = {
    //    '/': Home,
    //    '/about': About
    //}
const User = {
    template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
};

const UserHome = {
    template: '<div>Home</div>'
};
const Home = {
    template: '<div>Profile</div>'
};
const About = {
    template: '<div>Posts</div>'
};
const routes = {
    '/': Home,
    '/about': About
};
//import VueResource from 'vue-resource';
//Vue.use(VueResource);


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

new Vue({
    el: "#first",
    created: function () {
        this.getItems();
        //        this.items = [];
    },
    data: {
        items: [],
        search: '',
        currentRoute: '/' //window.location.pathname,
    },
    computed: {
        ViewComponent() {
            console.log(this.currentRoute);
            return routes[this.currentRoute];
        }
    },
    render: function (h) {
        console.log(this.ViewComponent);
        return "<div>Profile</div>";
    },
    //    watch: {
    //        search: function (val) {
    //            this.items = Array.prototype.filter.call(this.items, function (item) {
    //
    //                console.log(item);
    //                return item.title.indexOf(val);
    //            });
    //        },
    //    },
    //    computed: {
    //        ViewComponent: function () {
    //            return routes[this.currentRoute] || NotFound
    //        }
    //    },
    //    render: function (h) {
    //        return h(this.ViewComponent)
    //    },
    methods: {
        getItems: function () {
            return this.$http.get('./items.json').then(function (response) {
                //console.log(this.items);
                var current = [].slice.call(this.items);
                return this.items = current.concat(response.body);
                //    console.log(this.items);
            }, function (error) {

                //            console.log(error);
            });
        },
        upadetItems() {
            //                ;
            var newItems = this.getItems();
            var current = [].slice.call(this.items);
            this.items = current.concat(newItems);
            //                this.items.concat(this.getItems());
            console.log(this.items);
        },
        searchItems: function () {
            //we can use here som custom request with parameters for backend sorting
            //    return this.$http.get('./items.json')
            //console.log(this.items);

            var items = [].slice.call(this.items);
            items.filter(function (obj) {
                return obj.title.indexOf(1);
            });
        }

    }

});