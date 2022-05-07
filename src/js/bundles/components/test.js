export default () => {
    (function (test) {
        "use strict";   

        const fetchApi = () => {
            fetch('/collections/men?view=json')
            .then((resp) => {
                resp.json()
            })
            .then((data) => {
                console.log(data)
            })
        }

        const bindUIActions = () => {
            fetchApi()
        };

        const init = () => {
            bindUIActions();
        };

        test.init = init;

    })((window.test = window.test || {}));
};