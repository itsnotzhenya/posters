let cinema;
function poster() {
    document.getElementById('images').innerHTML = '';
    let input = document.getElementById('title');
    let url = 'http://www.omdbapi.com/?apikey=2d10a7d&s=' + input.value;

    if (input.value == null || input.value == "") { alert("Пустые строки"); }

    getPoster(url)
        .then(result => {
            console.log(input.value);
            console.log(url);
            cinema = JSON.parse(result);

            for (let i = 0; i < cinema.Search.length; i++) {
                let img = document.createElement("img");
                // let h2 = document.createElement("h2");
                // let p = document.createElement("p");
                img.src = cinema.Search[i].Poster
                // h2.src = cinema.Search[i].Title
                // p.src = cinema.Search[i].Year
                if (cinema.Search[i].Poster == 'N/A') {
                    continue;
                };
                console.log(result);
                document.getElementById("images").appendChild(img);
                // document.getElementById("title").appendChild(h2);
                // document.getElementById("year").appendChild(p);
            }
        })
        .catch((e) => {
            alert("Ничего не найдено");
        });

}

function getPoster(url) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
                data = JSON.parse(this.response);
                // console.log(user);
                return data.Search;
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        request.onerror = function () {
            reject(new Error("Network Error"));
        };

        request.send();
    })
}