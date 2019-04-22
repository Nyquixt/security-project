$(function(){
    $('#diffie-btn').click(e => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/prime',
            method: 'POST',
            data: {
                prime: $('#prime').val()
            },
            success: function(data){
                console.log(data);
            }
        });
    });
});