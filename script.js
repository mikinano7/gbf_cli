var $ = jQuery = require("./jquery-2.1.4.min.js");

const ipcRenderer = require('electron').ipcRenderer;

function printArrayElement(tweet, index, array) {
    //TODO: 無限に追加されてくので置き換え必要
    $('#tweet').prepend('<p id="tw_' + tweet.id_str + '"></p>');
    $('#tw_' + tweet.id_str).text('@' + tweet.user.screen_name + ': ' + tweet.text);
}

$(function(){
    ipcRenderer.on('tweet', function(event, arg) {
        JSON.parse(arg).statuses.forEach(printArrayElement);
    });
});
