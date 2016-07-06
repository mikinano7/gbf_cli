'use strict';

const Electron = require('electron');
const {app, BrowserWindow} = Electron;
const Config = require('config');

let win;

const twitter = require('twitter');
const client = new twitter({
    consumer_key: Config.consumer_key,
    consumer_secret: Config.consumer_secret,
    access_token_key: Config.access_token_key,
    access_token_secret: Config.access_token_secret
});

app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', function() {
    win = new BrowserWindow({width: 800, height: 600});
    win.loadURL('file://' + __dirname + '/index.html');

    setInterval(
        function() {
            client.get('search/tweets', {q: '参加者募集！参戦ID'}, function(error, tweets, response) {
                win.webContents.send('tweet', JSON.stringify(tweets));
            })
        },
        5000
    );

    // filter が日本語に対応してない（クソ）
    // client.stream('statuses/filter', {track: '救援'},  function(stream) {
    //     stream.on('data', function(tweet) {
    //         win.webContents.send('tweet', JSON.stringify(tweet));
    //     });
    //
    //     stream.on('error', function(error) {
    //         console.log(error);
    //     });
    // });

    win.on('closed', function() {
        win = null;
    });
});
