    // get all category
    var getAdminInfo = function() {
        $.ajax({
            url: `/admin/info`,
            type: 'POST',
        })
        .then(data=>{
            if(data.admin.length > 0){
                let date = new Date(data.admin[0].Birthday)
                let Birthday =  date.getFullYear() + '/' + ((date).getMonth() + 1) + '/' + date.getDate()
                var formAdd = 
                `<h2 class="detailAdminHead">Your account</h2><hr><br>
                <form class="detailAdmin">
                <div class="form-content">
                    <div class="formElement">
                        <label>Id</label><input required type="text" value="${data.admin[0].idUser}" name="idUser" id="idUser" disabled />
                    </div>
                    <div class="formElement">
                        <label>Name</label><input required type="text" value="${data.admin[0].Name}" name="Name" id="Name" />
                    </div>
                    <div class="formElement">
                        <label>Brithday</label><input required type="text" value="${Birthday}" name="Birthday" id="Birthday" />
                    </div>
                    <div class="formElement">
                        <label>Gender</label>
                        <select name="gender" id="gender">
                            <option value="${data.admin[0].Gender}">${data.admin[0].Gender}</option>
                            <option value="man">man</option>
                            <option value="woman">woman</option>
                        </select>
                    </div>
                    <div class="formElement">
                        <label>Address</label><input required type="text" value="${data.admin[0].Address}" name="Address" id="Address" />
                    </div>
                    <div class="formElement">
                        <label>Phone</label><input required type="text" value="${data.admin[0].Phone}" name="Phone" id="Phone" />
                    </div>
                    <div class="formElement">
                        <label>Email</label><input required type="email" value="${data.admin[0].Email}" name="Email" id="Email" />
                    </div>
                    <div class="formElement">
                        <label></label><input type="button" name="" id="add_Customer" value="Update" onclick="updateAdmin(${data.admin[0].idUser})" />
                        <input type="button" name="" id="" value="Back" onclick="getcustomers()"/>
                        
                    </div><br>
                    <div class="formElement">
                        <label></label><span class="message"></span>
                    </div>
                </div>
            </form>`
            $('#content').children().remove()
            $('#content').append(formAdd)
            }
        })
    }
    $('#adminAccount').click(getAdminInfo)

    // update admin
    function updateAdmin(id){
        $.ajax({
            url: `/admin/${id}`,
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
    }

    // logout 
    function logoutAdmin(){
        setCookie('admin_token', '', 0)
        document.location.href = `http://localhost:3000/login`
    }
