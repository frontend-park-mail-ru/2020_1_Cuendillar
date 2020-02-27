// транспортная логика ajax
(function () {
    const noop = () => void 0;

    class AjaxModule {

        ajaxGet = ({
                       url = '/',
                       body = null,
                       callback = noop,
                   } = {}) => {
            this._ajax({method: 'GET', url, body, callback});
        };

        ajaxPost = ({
                        url = '/',
                        body = null,
                        callback = noop,
                        async = true,
                    } = {}) => {
            this._ajax({method: 'POST', url, body, callback, async});
        };

        _ajax = ({
                     method = 'GET',
                     url = '/',
                     body = null,
                     callback = noop,
                     async = true,
                 } = {}) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, async);
            xhr.withCredentials = true;

            xhr.addEventListener('readystatechange', function() {
                if (xhr.readyState !== xhr.DONE) return;

                callback(xhr.status, xhr.responseText);
            });

            if (body) {
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
                xhr.send(JSON.stringify(body));
                return;
            }
            xhr.send();
        };
    }

    globalThis.AjaxModule = new AjaxModule();

})();

