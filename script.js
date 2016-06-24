var $ = jQuery = require("./jquery-2.1.4.min.js");

const ipcRenderer = require('electron').ipcRenderer;
const multi = {
    'a': '青竜',
    'b': '玄武',
    'c': '朱雀',
    'd': '白虎',
    'aa': 'ゼピュロス',
    'bb': 'ネプチューン',
    'cc': 'アグニス',
    'dd': 'ティターン'
};

//TODO: 無限に追加されてくので置き換え必要
function printArrayElement(tweet, index, array) {
    var tweetElement = $('#tw_' + tweet.id_str);
    Object.keys(multi).forEach(function(key) {
        var keyElement = $('#' + key);
        if (tweet.text.includes(this[key]) && !(tweetElement.is('*'))) {
            var helpNum = tweet.text.match(/[A-Z0-9]{8}/);
            keyElement.prepend('<p id="tw_' + tweet.id_str + '"></p>');
            $('#tw_' + tweet.id_str).text('@' + tweet.user.screen_name + ': ' + tweet.text);
            keyElement.prepend('<span class="' + helpNum + '">' + helpNum + '</span>');
            keyElement.prepend('<button id="' + helpNum + '" class="copy">copy</button>');
        }
    }, multi);
}

$(function(){
    Object.keys(multi).forEach(function(key) {
    $('#tab').prepend('<li><button name="' + key + '">' + this[key] + '</button></li>');
        $('#tweet').prepend('<hr /><div id="' + key + '"></div>');
    }, multi);

    ipcRenderer.on('tweet', function(event, arg) {
        JSON.parse(arg).statuses.forEach(printArrayElement);
    });
});

$(document).on('click', 'li', function() {
    var key = $(this).attr('name');
    var index = $('#tab li').index(this);
    $('#tweet div').css('display', 'none');
    $('hr').css('display', 'none');
    $('#tweet div').eq(index).css('display','block');
});

$(document).on('click', '.copy', function() {
    var range = document.createRange();
    var id = $(this).attr('id');
    var target = $('.' + id)[0];
    range.selectNode(target);

    var selection = window.getSelection();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
});
