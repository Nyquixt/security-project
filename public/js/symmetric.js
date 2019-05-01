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
                algo: $('#des-enc-select').val(),
                passwd: $('#des-passwd').val()
            },
            success: function (data) {
                $('#des-ciphertxt').val(data);
                $('#des-dec-ciphertxt').val(data);
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
                algo: $('#des-dec-select').val(),
                passwd: $('#des-passwd').val(),
                ciphertxt: $('#des-ciphertxt').val()
            },
            success: function (data) {
                $('#des-dec-plaintxt').val(data);
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
                algo: $('#aes-enc-select').val(),
                passwd: $('#aes-passwd').val()
            },
            success: function (data) {
                $('#aes-ciphertxt').val(data);
                $('#aes-dec-ciphertxt').val(data);
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
                algo: $('#aes-dec-select').val(),
                passwd: $('#aes-passwd').val(),
                ciphertxt: $('#aes-dec-ciphertxt').val()
            },
            success: function (data) {
                $('#aes-dec-plaintxt').val(data);
            }
        })
    });

    // rc4
    // enc
    $('#rc4-enc').click(e => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/enc',
            method: 'POST',
            data: {
                plaintxt: $('#rc4-plaintxt').val(),
                algo: $('#rc4-enc-select').val(),
                passwd: $('#rc4-passwd').val()
            },
            success: function (data) {
                $('#rc4-ciphertxt').val(data);
                $('#rc4-dec-ciphertxt').val(data);
            }
        })
    });


    // dec
    $('#rc4-dec').click(e => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/dec',
            method: 'POST',
            data: {
                algo: $('#rc4-dec-select').val(),
                passwd: $('#rc4-passwd').val(),
                ciphertxt: $('#rc4-dec-ciphertxt').val()
            },
            success: function (data) {
                $('#rc4-dec-plaintxt').val(data);
            }
        })
    });
});