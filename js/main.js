/**
 * JS
 *
 * ESERCIZIO VUE BOOLFLIX
 *
 * Milestone 1:
Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere comple
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trova
    1.	Titolo
    2.	Titolo Originale
    3.	Lingua
    4.	Voto

* Milestone 2:
Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di st
Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze v
Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione c

Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prender
Qui un esempio di chiamata per le serie tv:
https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT&

 */

const app = new Vue({
    el: '#app',

    data: {
        searched : '',
        searchResult : {
            movies : [],
            tvSeries : []
        },
        loaded : {
            movies : false,
            tvSeries : false
        },
        baseUrl : ''
    },

    methods: {

        getSearchResult() {
            this.loaded.movies = false;
            this.loaded.tvSeries = false;
            if (this.searched != '') {

                axios
                    .get('https://api.themoviedb.org/3/search/movie', {
                        params: {
                            api_key: '3d0e849266ff79051e7d444d62e65520',
                            query: this.searched
                        }
                    })
                    .then((responseObject) => {

                        this.searchResult.movies = responseObject.data.results;

                        this.loaded.movies = true;
                    });


                axios
                    .get('https://api.themoviedb.org/3/search/tv', {
                        params: {
                            api_key: '3d0e849266ff79051e7d444d62e65520',
                            query: this.searched
                        }
                    })
                    .then((responseObject) => {

                        this.searchResult.tvSeries = responseObject.data.results;

                        this.loaded.tvSeries = true;
                    });
            } else {

                this.searchResult.movies = [];
                this.searchResult.tvSeries = [];
            }
        },
              toStars(vote) {
            return Math.round((vote * 5) / 10);
        }
    },

    mounted() {
        axios
        .get('https://api.themoviedb.org/3/configuration', {
            params: {
                api_key: '3d0e849266ff79051e7d444d62e65520'
            }
        })
        .then((responseObject) => {
            this.baseUrl = responseObject.data.images.base_url;
        });
    }
});
