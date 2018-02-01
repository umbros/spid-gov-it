let _CACHE = null;

const emptyCache = () => (_CACHE = null);

//Get this data from your twitter apps dashboard
const config = {
    "consumerKey": "7anjDTnJwu3NzQzXIq98XtpdE",
    "consumerSecret": "J4Lg5zRD9CNlikjcyuzTxvopOh1Lcn8ZTUayBp5lBXAmH7NVVq",
    "accessToken": "2383600026-HkWpev9CQJqfCTcVpoOOPu1JnTltg1IUZCKqfPM",
    "accessTokenSecret": "EkZkwPzrPpS96F7f3iUXeJRBlJJb77XbbmKFm3PbI5VUz",
}

const Twitter = require('twitter-node-client').Twitter
const twitter = new Twitter(config);

const success = function(data) {
    const ret = JSON.parse(data);
    _CACHE = []
    ret.statuses.forEach((status) => {
        const d = new Date(status.created_at);

        _CACHE.push({
            name: status.user.screen_name,
            text: status.text,
            date: d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes(),
            url: 'https://twitter.com/statuses/' + status.id_str
        })
    })
    return _CACHE
};

const error = function(err, response, body) {
    // console.log('ERROR [%s]', err);
};

const twits = (user, hash, count) => {
    if (_CACHE) {
        return _CACHE
    }
    twitter.getSearch({
        'q': '#' + hash + ' from:' + user,
        'count': count,
        'screen_name': user,
        'result\_type': 'recent'
    }, error, success)
    return null
}

module.exports = {
    emptyCache,
    twits,
}
