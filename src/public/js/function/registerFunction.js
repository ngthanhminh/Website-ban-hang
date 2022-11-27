

    $('#signup').click(function(){
        $('#message').text("")
        $.ajax({
            url: "/register",
            type: "POST",
            data: {
                "name": $('#name').val(),
                "email": $('#email').val(),
                "username": $('#username').val(),
                "password": $('#password').val()
            }
        })
        .then(data => {
            if(data){
                console.log(data.message)
                $('#message').text(data.message)
                if(data.status == 'done'){
                    console.log(data.done)
                    setTimeout(function(){
                        document.location.href = 'http://localhost:3000/login'
                    }, 2000)
                    
                }
            }

        })
        .catch(err=>{
            console.log("Error: ", err)
        })
    })