const image_url = 'https://image.tmdb.org/t/p/w500';
const image_default = 'img/default.png';
var api = function () {
    const url = 'https://api.themoviedb.org/3';
    const key = '?api_key=ef963e24f0dc29f7a9347e404b8c5b62';
    return {
        movies: {

            popular: function () {
                return axios.get(url + '/movie/popular' + key)
                    .then(function (response) {
                        return response.data;
                    }).catch(function (e) {
                        console.log(e);
                    });
            },
            getById: function (id) {
                return axios.get(url + '/movie/' + id + key)
                    .then(function (response) {
                        return response.data;
                    }).catch(function (e) {
                        console.log(e);
                    });
            },
            related: function (id) {
                return axios.get(url + '/movie/' + id + '/similar' + key)
                    .then(function (response) {
                        return response.data;
                    }).catch(function (e) {
                        console.log(e);
                    });
            },
        },
        genres: function () {
            return axios.get(url + '/genre/movie/list' + key)
                .then(function (response) {
                    return response.data;
                }).catch(function (e) {
                    console.log(e);
                });
        },
        favourites: {
            //todo with async
            get: function () {
                return new Promise(function(resolve, reject) {
                    if (typeof (Storage) !== "undefined") {
                        resolve(JSON.parse(localStorage.getItem('favourites') || "[]"));
                    } else {
                        reject(new Error('Sorry! No Web Storage support..'));
                    }
                })

            },
            set: function (favourites) {
                localStorage.setItem('favourites', JSON.stringify(favourites));
                return favourites;

            },
            add: function (id) {
                var vm = this;
                return vm.get().then(function (val) {
                    val.push(id);
                    return vm.set(val);
                });
            },

            remove: function (index) {
                var vm = this;
                return vm.get().then(function (val) {
                    val.splice(index, 1);
                    return vm.set(val);
                })
            },
        },



    }

}
