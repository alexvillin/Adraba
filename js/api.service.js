const image_url = 'https://image.tmdb.org/t/p/w500';
const image_default = 'img/default.png';
var api = function () {
    const url = 'https://api.themoviedb.org/3';
    const key = '?api_key=ef963e24f0dc29f7a9347e404b8c5b62';

    function _get(url) {
//        console.log(url);
        return axios.get(url)
            .then((response) => {
                return response.data;
            }).catch((e) => {
                console.log(e);
                app.$toastr.error(e.message);
            });
    }

    return {
        movies: {
            baseUrl: url + "/movie/",
            popular(page = 1) {
                return _get(this.baseUrl + 'popular' + key + '&page=' + page);
            },
            getById(id) {
                return _get(this.baseUrl + id + key);
            },
            related(id) {
                return _get(this.baseUrl + id + '/similar' + key);
            },
        },
        genres() {
            return _get(url + '/genre/movie/list' + key);
        },
        favourites: {
            //todo with async
            get() {
                return new Promise((resolve, reject) => {
                    if (typeof (Storage) !== "undefined") {
                        resolve(JSON.parse(localStorage.getItem('favourites') || "[]"));
                    } else {
                        reject(new Error('Sorry! No Web Storage support..'));
                    }
                })

            },
            set(favourites) {
                app.$toastr.success('Favourites changed');
                localStorage.setItem('favourites', JSON.stringify(favourites));
                return favourites;

            },
            add(id) {
                var vm = this;
                return vm.get().then((val) => {
                    val.push(id);
                    return vm.set(val);
                });
            },

            remove(index) {
                var vm = this;
                return vm.get().then((val) => {
                    val.splice(index, 1);
                    return vm.set(val);
                })
            },
        },
    }

}
