$(document).ready(function () {
    let access_key = 'bKeOHddLP8vaJSPE6nqb7YVljWVSHa92wSvNC5G7_7c';
    let responsive = $(document).width()
    let params = window.location.search
    let param = params.split('category=')
    let statusOnline = navigator.onLine;


    let dataApi = {
        per_page: 30,
        page: 1,
        query: param[1] ?? 'natural',
        // order_by: 'latest',
        orientation: 'portrait'
    }
    statusOnline ? fetchApi('https://api.unsplash.com/search/photos/?client_id=bKeOHddLP8vaJSPE6nqb7YVljWVSHa92wSvNC5G7_7c', dataApi) : fetchApi('/data.json', {});

    //Get Api Image from Unsplash
    function fetchApi(urlApi, dataApi) {
        $.ajax({
            url: urlApi,
            data: dataApi,
            dataType: 'json',
            method: 'get',
            success: (response) => {
                let selection = response.results.length / 3;
                if (responsive < 1024) {
                    selection = response.results.length / 2;
                }
                response.results.map((item, index) => {
                    if (responsive > 1024) {
                        // for dekstop
                        if (index < selection) {
                            $('#content #row-1').append(`<img src="${item.urls.regular}" alt="" srcset="" class="object-contain w-full shadow-xl">`)
                        } else if (index < selection * 2) {
                            $('#content #row-2').append(`<img src="${item.urls.regular}" alt="" srcset="" class="object-contain w-full shadow-xl">`)
                        } else {
                            $('#content #row-3').append(`<img src="${item.urls.regular}" alt="" srcset="" class="object-contain w-w-full shadow-xl">`)
                        }
                    } else {
                        // for mobile
                        if (index < selection) {
                            $('#content #row-1').append(`<img src="${item.urls.regular}" alt="" srcset="" class="object-contain w-full shadow-xl">`)
                        } else {
                            $('#content #row-2').append(`<img src="${item.urls.regular}" alt="" srcset="" class="object-contain w-full shadow-xl">`)
                        }
                    }
                })
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    // Load cache from serviceWorker
    if ('serviceWorker' in navigator) {
        $(window).on('load', function () {
            navigator.serviceWorker.register('serviceworker.js')
                .then((registration) => {
                    console.log('Service Worker tersedia di: ', registration.scope);
                }, (err) => {
                    console.log('Registratio ServiceWorker failed: ', err);
                });
        })
    }

})

//Show Hide menu in mobile
function showMenu() {
    $('#menuMobile').css('top', 0);
    $('#menuMobile').css('left', 0);
}
function closeMenu() {
    $('#menuMobile').css('top', '-100%');
    $('#menuMobile').css('left', '-100%');
}

//Service Worker
