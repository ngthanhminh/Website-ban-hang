    // set cookie
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    // get cookie
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
        }
        return "";
    }

    // login request
    function login(){
        $.ajax({
        url: "/login",
        type: "POST",
        data: {
            "username": $('#username').val(),
            "password": $('#password').val()
        }
        })
        .then(data => {
            if(data){
            if(data.tokenUser){
                setCookie('user_token', data.tokenUser, 1)
                document.location.href = 'http://localhost:3000/home'
            }
            else{
                document.getElementById('error').innerHTML = data.message
                document.getElementById('error').style.color = "red"
            }
            
            }else{
            console.log('Khong co data !')
            }
        })
        .catch(err=>{
            console.log("error: ", err)
        })
    }