$(function(){
    $('#alice-genkey').click(e => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/genkey',
            method: 'GET',
            success: function(data) {
                console.log(data);
                $('#alice-public').text(data.publicKey);
                $('#alice-private').text(data.privateKey);
            }
        });
    });

    $('#bob-genkey').click(e => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/genkey',
            method: 'GET',
            success: function(data) {
                console.log(data);
                $('#bob-public').text(data.publicKey);
                $('#bob-private').text(data.privateKey);
            }
        });
    });
});