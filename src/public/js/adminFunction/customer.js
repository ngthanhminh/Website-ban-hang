    
    // get all category
    var getcustomers = function() {
        var header = 
            `<h2>Customer</h2><hr>
			<div>
                <input type="button" value="Add customer" onclick="loadFormAddCustomer()"/>
                <div class="app-search-box col">
					<input type="text" placeholder="Search..." name="search" class="form-control search-input" id="customerSearch" onclick="getCustomerSearch()">
		        </div>
            </div><br>
            <table id="customers">
                <th>Id customer</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Phone number</th>
                <th>Email</th>
                <th>Function</th>
            </table>`
        $('#content').children().remove()
        $('#content').append(header)
        $.ajax({
            url: `/admin/customer`,
            type: 'GET'
        })
        .then(data=>{
            if(data){
                data.customers.forEach(val=>{
                    let customer = 
                        `<tr>
                            <td>${val.idUser}</td>
                            <td>${val.Name}</td>
                            <td>${val.Gender}</td>
                            <td>${val.Address}</td>
                            <td>${val.Phone}</td>
                            <td>${val.Email}</td>
                            <td>	
                                <input type="button" value="Detail" onclick="detailCustomer(${val.idUser},this)" />
                                <input type="button" value="Delete" onclick="deleteCustomer(${val.idUser},this)" />
                                <input type="button" value="Cart" onclick="detailCart(${val.idUser},this)" />
                            </td>
                        </tr>`
                    $('#customers').append(customer)
                })
            }else{
                $('#customers').append(`<p>No customer ...</p>`)
            }
        })
        .catch(err=>{
            console.log('Error: ', err)
        })
    }
    $('#customer').click(getcustomers)


    // get details customer 
    function detailCustomer(id){
        $.ajax({
            url: `/admin/customer/${id}`,
            type: 'GET',
        })
        .then(data=>{
            if(data){
                var detail = 
                    `<h2>Details Customer</h2><hr><br>
                    <form class="detailCustomer">
                        <div class="form-content">
                            <div class="formElement">
                                <label>Id</label><input required type="text" value="${data.customer[0].idUser}" name="idUser" id="idUser" disabled/>
                            </div>
                            <div class="formElement">
                                <label>Name</label><input required type="text" value="${data.customer[0].Name}" name="Name" id="Name" />
                            </div>
                            <div class="formElement">
                                <label>Brithday</label><input required type="date" value="${data.customer[0].Brithday}" name="Birthday" id="Birthday" />
                            </div>
                            <div class="formElement">
                                <label>Gender</label>
                                <select name="gender" id="gender">
                                    <option value="${data.customer[0].Gender}">${data.customer[0].Gender}</option>
                                    <option value="man">man</option>
                                    <option value="woman">woman</option>
                                </select>
                            </div>
                            <div class="formElement">
                                <label>Address</label><input required type="text" value="${data.customer[0].Address}" name="Address" id="Address" />
                            </div>
                            <div class="formElement">
                                <label>Phone</label><input required type="text" value="${data.customer[0].Phone}" name="Phone" id="Phone" />
                            </div>
                            <div class="formElement">
                                <label>Email</label><input required type="email" value="${data.customer[0].Email}" name="Email" id="Email" />
                            </div>
                            <div class="formElement">
                                <label>Username</label><input required type="text" value="${data.customer[0].username}" name="username" id="username" />
                            </div>
                            <div class="formElement">
                                <label>Password</label><input required type="text" value="${data.customer[0].password}" name="password" id="password" />
                            </div>
                            <div class="formElement">
                                <label></label><input type="button" name="" id="update_customer" value="Update" onclick="updateCustomer(${data.customer[0].idUser})" />
                                <input type="button" name="" id="" value="Back" onclick="getcustomers()"/>
                                
                            </div><br>
                            <div class="formElement">
                                <label></label><span class="message"></span>
                            </div>
                        </div>
                    </form>`
                    $('#content').children().remove()
                    $('#content').append(detail)
            }else{
                console.log('Cant get detail customer ...')
            }
        })
    }

    // load form add category
    function loadFormAddCustomer(){
        var formAdd = 
            `<h2>Add Customer</h2><hr><br>
            <form class="detailCustomer">
                        <div class="form-content">
                            <div class="formElement">
                                <label>Id</label><input required type="text" value="" name="idUser" id="idUser"/>
                            </div>
                            <div class="formElement">
                                <label>Name</label><input required type="text" value="" name="Name" id="Name" />
                            </div>
                            <div class="formElement">
                                <label>Brithday</label><input required type="date" value="" name="Birthday" id="Birthday" />
                            </div>
                            <div class="formElement">
                                <label>Gender</label>
                                <select name="gender" id="gender">
                                    <option value="man">man</option>
                                    <option value="woman">woman</option>
                                </select>
                            </div>
                            <div class="formElement">
                                <label>Address</label><input required type="text" value="" name="Address" id="Address" />
                            </div>
                            <div class="formElement">
                                <label>Phone</label><input required type="text" value="" name="Phone" id="Phone" />
                            </div>
                            <div class="formElement">
                                <label>Email</label><input required type="email" value="" name="Email" id="Email" />
                            </div>
                            <div class="formElement">
                                <label>Username</label><input required type="text" value="" name="username" id="username" />
                            </div>
                            <div class="formElement">
                                <label>Password</label><input required type="text" value="" name="password" id="password" />
                            </div>
                            <div class="formElement">
                                <label></label><input type="button" name="" id="add_Customer" value="Add" onclick="addCustomer()" />
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

    // load customer cart
    function detailCart(id, customer){
        var header = 
            `<h2>Customer Cart</h2><hr>
			<div>
                <input type="button" value="Add product" onclick="loadAddProductCart(${id})"/>
                <input type="button" name="" id="back" value="Back" onclick="getcustomers()"/>
                <div class="app-search-box col">
					<input type="text" placeholder="Search..." name="search" class="form-control search-input" id="productSearch" onclick="getProductSearch()">
		        </div>
            </div><br>
            <table id="products">
                <th>Id Product</th>
                <th>Name</th>
                <th>Image</th>
                <th>Number</th>
                <th>Price</th>
                <th>Nubmer</th>
                <th>Function</th>
            </table>`
        $('#content').children().remove()
        $('#content').append(header)
        $.ajax({
            url: `/admin/product/customer/${id}`,
            type: 'GET'
        })
        .then(data=>{
            if(data){
                data.products.forEach(val=>{
                    let product = 
                        `<tr>
                            <td>${val.idProduct}</td>
                            <td>${val.productName}</td>
                            <td><img src="/image/${val.productImage}" alt="${val.productName}" width="40" height="50"></td>
                            <td>${val.productCount}</td>
                            <td>${val.productPrice}</td>
                            <td>${val.countBuy}</td>
                            <td>	
                                <input type="button" value="Delete" onclick="deleteProductCart(${val.idProduct}, ${id}, this)" />
                            </td>
                        </tr>`
                    $('#products').append(product)
                })
            }else{
                $('#products').append(`<p>No category ...</p>`)
            }
        })
        .catch(err=>{
            console.log('Error: ', err)
        })
    }
    // $('#product').click(getAllProducts)

    // add customer
    function addCustomer(){
        $.ajax({
            url: `/admin/customer`,
            type: 'POST',
            data: {
                idUser: $('#idUser').val(),
                Name: $('#Name').val(),
                Birthday: $('#Birthday').val(),
                Address: $('#Address').val(),
                Phone: $('#Phone').val(),
                Email: $('#Email').val(),
                username: $('#username').val(),
                password: $('#password').val(),
                Gender: $('select#gender').val(),
            }
        })
        .then(data=>{
            if(data){
                $('.message').text(data.message)
            }else{
                console.log('Add customer finished...')
            }
        })
        .catch(err=>{
                console.log('Error: ', err)
        })
    }

    // update customer
    function updateCustomer(id){
        console.log($('#Birthday').val())
        $.ajax({
            url: `/admin/customer/${id}`,
            type: 'PUT',
            data: {
                Name: $('#Name').val(),
                Birthday: $('#Birthday').val(),
                Address: $('#Address').val(),
                Phone: $('#Phone').val(),
                Email: $('#Email').val(),
                username: $('#username').val(),
                password: $('#password').val(),
                Gender: $('select#gender').val(),
            }
        })
        .then(data=>{
            if(data){
                $('.message').text(data.message)
            }else{
                console.log('Cant update category ...')
            }
        })
        .catch(err=>{
            console.log('Error: ', err)
        })
    }

    // delete customer
    function deleteCustomer(id,customer){
        var del = confirm("Delete customer ?")
        if(del == true){
            customer.parentElement.parentElement.remove()
            $.ajax({
                url: `/admin/customer/${id}`,
                type: 'DELETE',
            })
            .then(data=>{
                // $('.message').text(data.message)
            })
            .catch(err=>{
                console.log('Error: ', err)
            })
        }
    }

    // search category
    function getCustomerSearch(){
        $('#customerSearch').keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                var keysearch = $('#customerSearch').val()
                $.ajax({
                    url: `/admin/customer/search/${keysearch}`,
                    type: 'GET',
                })
                .then(data=>{
                    if(data){
                        $('#customers').children().remove()
                        data.customers.forEach(val=>{
                            let customer = 
                                `<tr>
                                <td>${val.idUser}</td>
                                <td>${val.Name}</td>
                                <td>${val.Gender}</td>
                                <td>${val.Address}</td>
                                <td>${val.Phone}</td>
                                <td>${val.Email}</td>
                                <td>	
                                    <input type="button" value="Detail" onclick="detailCustomer(${val.idUser},this)" />
                                    <input type="button" value="Delete" onclick="deleteCustomer(${val.idUser},this)" />
                                    <input type="button" value="Cart" onclick="detailCart(${val.idUser},this)" />
                                </td>
                            </tr>`
                            $('#customers').append(customer)
                        })
                    }else{
                        $('#customers').append(`<p>No customer ...</p>`)
                    }
                })
            }

        })
    }