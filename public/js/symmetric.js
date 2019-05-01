$(function () {

    // des
    // encryption
    $('#des-enc').click(e => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/enc',
            method: 'POST',
            data: {
                plaintxt: $('#des-plaintxt').val(),
                algo: $('#des-select').val(),
                passwd: $('#des-passwd').val()
            },
            success: function (data) {
                $('#des-ciphertxt').val(data);
            }
        })
    });

    // decryption
    $('#des-dec').click(e => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/dec',
            method: 'POST',
            data: {
                algo: $('#des-select').val(),
                passwd: $('#des-passwd').val(),
                ciphertxt: $('#des-ciphertxt').val()
            },
            success: function (data) {
                $('#des-plaintxt').val(data);
            }
        })
    });

    // aes
    // enc
    $('#aes-enc').click(e => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/enc',
            method: 'POST',
            data: {
                plaintxt: $('#aes-plaintxt').val(),
                algo: $('#aes-select').val(),
                passwd: $('#aes-passwd').val()
            },
            success: function (data) {
                $('#aes-ciphertxt').val(data);
            }
        })
    });


    // dec
    $('#aes-dec').click(e => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/dec',
            method: 'POST',
            data: {
                algo: $('#aes-select').val(),
                passwd: $('#aes-passwd').val(),
                ciphertxt: $('#aes-ciphertxt').val()
            },
            success: function (data) {
                $('#aes-plaintxt').val(data);
            }
        })
    });
});