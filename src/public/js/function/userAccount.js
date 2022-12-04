
    // search 
    function loadInfo(){
        if(getCookie('user_token')){
            $.ajax({
                url: `/user/${getCookie('user_token')}`,
                type: 'GET',
            })
            .then(data=>{
                $('#main').children().remove()
                $('#main').append(`<div class="container p-t-120 p-b-160" id="customer"></div>`)
                if(data.customer.length > 0){
                    let date = new Date(data.customer[0].Birthday)
                    let Birthday =  date.getFullYear() + '/' + ((date).getMonth() + 1) + '/' + date.getDate()
                    var form = `
                        <form>
                            <div class="imgcontainer">
                                <img src="/image/img_avatar2.png" alt="Avatar" class="avatar">
                            </div>

                            <div class="container">
                                <div class="form-content">
                                    <label for="Name"><b>Name</b></label>
                                    <input type="text" value="${data.customer[0].Name}" name="Name" required id="Name">
                                </div>

                                <div class="form-content">
                                    <label for="Birthday"><b>Birthday</b></label>
                                    <input type="text" value="${Birthday}" name="Birthday" id="Birthday" required>
                                </div>

                                <div class="form-content ">
                                    <label for="Gender"><b>Gender</b></label>
                                    <select name="gender" id="gender" class="selectGender">
                                        <option value="${data.customer[0].Gender}">${data.customer[0].Gender}</option>
                                        <option value="man">man</option>
                                        <option value="woman">woman</option>
                                    </select>
                                </div>

                                <div class="form-content">
                                    <label for="Address"><b>Address</b></label>
                                    <input type="text" value="${data.customer[0].Address}" name="Address" id="Address" required>
                                </div>

                                <div class="form-content">
                                    <label for="Phone"><b>Phone</b></label>
                                    <input type="text" value="${data.customer[0].Phone}" name="Phone" id="Phone" required>
                                </div>

                                <div class="form-content">
                                    <label for="Email"><b>Email</b></label>
                                    <input type="text" value="${data.customer[0].Email}" name="Email" id="Email" required>
                                </div>
                                
                                <div class="form-content">
                                    <button onclick="updateCustomer()">Update</button>
                                </div>
                                <div>
                                    <p class="message"></p>
                                </div>
                            </div>
                        </form>`
                    $('#customer').append(form)
                    $('#btnLoadMore').hide()
                    $('#btnLoadMoreCP').hide()
                    numberLoad = 0;
                    numberLoadCP = 0;
                    }
                })
        }else{
            document.location.href = `http://localhost:3000/login`
        }
        
    }

    // update customer account 
    function updateCustomer(){
        if(getCookie('user_token')){
            $.ajax({
                url: `/user/${getCookie('user_token')}`,
                type: 'PUT',
                data: {
                    Name: $('#Name').val(),
                    Birthday: $('#Birthday').val(),
                    Address: $('#Address').val(),
                    Phone: $('#Phone').val(),
                    Email: $('#Email').val(),
                    Gender: $('select#gender').val(),
                }
            })
            .then(data=>{
                if(data){
                    $('.message').text(data.message)
                }else{
                    console.log('Cant update ...')
                }
            })
            .catch(err=>{
                console.log('Error: ', err)
            })
        }else{
            document.location.href = `http://localhost:3000/login`
        }

    }

    // check login session
    if(getCookie('user_token')){
        const logout = 
            `<div class="right-top-bar flex-w h-full">
                <a href="/login" class="flex-c-m trans-04 p-lr-25" onclick="logout()">
                    Logout
                </a>
            </div>`
            $('#function').append(logout)
        $('#login').hide()
        $('#register').hide()
    }else{
        $('#login').show()
        $('#register').show()
    }

    // logout 
    function logout(){
        setCookie('user_token', '', 0)
    }