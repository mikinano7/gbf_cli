var $ = jQuery = require("./jquery-2.1.4.min.js");
const ipcRenderer = require('electron').ipcRenderer;

$(function () {
    $.getJSON('resources/multi.json', function (json) {
        var form = $('#multi');
        json.forEach(function (value) {
            form.prepend(value + ': <input type="checkbox" class="select" name="' + value + '" /><br />');
        })
    })
});

$(document).on('click', '#setting_submit', function (event) {
    var setting = [];
    $('.select').each(function () {
        if ($(this).prop('checked')) setting.push($(this).attr('name'));
    });

    ipcRenderer.send('setting_submit', setting);
    event.preventDefault();
});

$(document).on('click', '#setting_sisyo', function () {
    if ($(this).prop('checked')) {
        $.getJSON('resources/sisyo.json', function (json) {
            var form = $('#multi');
            form.prepend('<div id="sisyo"></div>');
            json.forEach(function (value) {
                $('#sisyo').prepend(value + ': <input type="checkbox" class="select" name="' + value + '" /><br />');
            })
        })
    } else {
        $('#sisyo').empty();
    }
});
