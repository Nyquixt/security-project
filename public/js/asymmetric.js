$(function () {

    // on load
    $('#toggle-public').hide();
    $('#pub').hide();

    $('#toggle-private').hide();
    $('#pri').hide();

    $('#message').val('');

    //toggle
    $('#toggle-public').click(e => {
        e.preventDefault();
        $('#pub').toggle();
    });

    $('#toggle-private').click(e => {
        e.preventDefault();
        $('#pri').toggle();
    });

    // gen keys
    $('#alice-genkey').click(e => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/genkey',
            method: 'GET',
            success: function (data) {
                $('#alice-public').text(data.publicKey);
                $('#alice-private').text(data.privateKey);
            }
        });
        $('#toggle-public').show();
        $('#toggle-private').show();
    });

    //signature with private key
    $('#alice-sign').click(e => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/sign',
            method: 'POST',
            data: {
                privateKey: $('#alice-private').text(),
                message: $('#message').val()
            },
            success: function (data) {
                $('#enc1').text(data.signedMsg);
            }
        });
    });

    //enc with aes
    $('#enc').click(e => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/enc',
            method: 'POST',
            data: {
                plaintxt: $('#enc1').text(),
                algo: 'aes-192-cbc',
                passwd: 'password'
            },
            success: function (data) {
                $('#enc-msg').text(data);
            }
        });
    });

    //dec with aes
    $('#dec').click(e => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/dec',
            method: 'POST',
            data: {
                algo: 'aes-192-cbc',
                passwd: 'password',
                ciphertxt: $('#enc-msg').text()
            },
            success: function (data) {
                $('#dec-msg').text(data);
            }
        });
    });

    // dec to original
    $('#dec-og').click(e => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/unsign',
            method: 'POST',
            data: {
                decMsg: $('#dec-msg').text(),
                publicKey: $('#alice-public').text()
            },
            success: function (data) {
                $('#original-msg').text(data.unsignedMsg);
            }
        });
    });
});