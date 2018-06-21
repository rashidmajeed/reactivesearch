function URL(url) {
    var pattern = RegExp("^(([^:/?#]*)?://)?(((.*)?@)?([^/?#]*)?)([^?#]*)(\\?([^#]*))?(#(.*))?");
    var matches = url.match(pattern);

    return {
        protocol: matches[2],
        auth: matches[5],
        host: matches[6],
        path: matches[7],
        query: matches[9],
        hash: matches[11]
    };
}

module.exports = URL;
