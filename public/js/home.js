$(function(){
    // encryption
    $('#enc').click(e => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/enc-aes',
            method: 'POST',
            data: {
                plaintxt: $('#plaintxt').val(),
                algo: $('#algo').val(),
                passwd: $('#passwd').val()
            },
            success: function(data){
                console.log(data);
                $('#ciphertxt').val(data);
            }
        })
    });

    // decryption
    $('#dec').click(e => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/dec-aes',
            method: 'POST',
            data: {
                algo: $('#algo').val(),
                passwd: $('#passwd').val(),
                ciphertxt: $('#ciphertxt').val()
            },
            success: function(data){
                console.log(data);
                $('#plaintxt').val(data);
            }
        })
    });
});