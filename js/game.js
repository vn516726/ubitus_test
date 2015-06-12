var ubitusGamesContentUrl = "https://tw.ugamenow.com/gamecontent/games";
httpGet(ubitusGamesContentUrl, gamesContentHandler);

function httpGet(url, gamesContentHandler) {
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open("GET", url, true)
    xmlHttp.onreadystatechange = function() {
        // Request done
        if (xmlHttp.readyState == 4) {
            try {

                if (xmlHttp.status == 200) {
                    // May throw parse error
                    var res = JSON.parse(xmlHttp.responseText);
                    if (res.code != 0) {
                        throw "response with error code : " + res.code;
                    } else {
                        gamesContentHandler(res.games);
                    }
                } else
                    throw "Http request error. Error code : " + xmlHttp.status;

            } catch (err) {
                //exclude request cancel
                if (xmlHttp.status != 0) {
                    alert(err);
                }
            }
        }
    }
    xmlHttp.send();
}

function gamesContentHandler(games) {
    var isJustOneThumbTransit = true;
    var transThumbIdx = 1;

    var itemCount = 31;
    games = games.slice(0, itemCount);

    var baseUrl = "https://tw.ugamenow.com/images/ubilive/";
    var container = document.getElementById("container");

    for (var i = 0, len = games.length; i < len; i++) {
        // gameItem in gameItemLink
        var gameItem = document.createElement("div");
        gameItem.setAttribute("class", "game-item");

        // gameItemImg in gameItem
        var imgUrl = baseUrl + games[i].label + '/' + games[i].attributes["thumbnail-cover-200x272"];
        var gameItemImg = document.createElement("img");
        gameItemImg.setAttribute("src", imgUrl);

        gameItem.appendChild(gameItemImg);
        if (!isJustOneThumbTransit || i == transThumbIdx) {
            // itemLink for transit to description page
            var gameItemDescUrl = "game_desc.html?" + "name=" + games[i].name + "&desc=" + games[i].description;
            var gameItemLink = document.createElement("a");
            gameItemLink.setAttribute("href", gameItemDescUrl);
            gameItemLink.appendChild(gameItem);
            container.appendChild(gameItemLink);
        } else {
            container.appendChild(gameItem);
        }

    }
}
