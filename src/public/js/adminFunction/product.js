   
    // get all product
    var getAllProducts = function() {
        var header = 
            `<h2>Products</h2><hr>
			<div><input type="button" value="Add product" onclick="loadFormAddProduct()"/>
                <div class="app-search-box col">
					<input type="text" placeholder="Search..." name="search" class="form-control search-input" id="productSearch" onclick="getProductSearch()">
		        </div>
            </div><br>
            <table id="categories">
                <th>Id Product</th>
                <th>Name</th>
                <th>Image</th>
                <th>Number</th>
                <th>Price</th>
                <th>Function</th>
            </table>`
        $('#content').children().remove()
        $('#content').append(header)
        $.ajax({
            url: `/admin/product`,
            type: 'GET'
        })
        .then(data=>{
            if(data){
                data.products.forEach(val=>{
                    let category = 
                        `<tr>
                            <td>${val.idProduct}</td>
                            <td>${val.productName}</td>
                            <td><img src="/image/${val.productImage}" alt="${val.productName}" width="40" height="50"></td>
                            <td>${val.productCount}</td>
                            <td>${val.productPrice}</td>
                            <td>	
                                <input type="button" value="Detail" onclick="detailProduct(${val.idProduct},this)" />
                                <input type="button" value="Delete" onclick="deleteProduct(${val.idProduct},this)" />
                            </td>
                        </tr>`
                    $('#categories').append(category)
                })
            }else{
                $('#categories').append(`<p>No category ...</p>`)
            }
        })
        .catch(err=>{
            console.log('Error: ', err)
        })
    }
    $('#product').click(getAllProducts)


    // get details product 
    function detailProduct(id){
        $.ajax({
            url: `/admin/product/${id}`,
            type: 'GET',
        })
        .then(data=>{
            if(data){
                var detail = 
                    `<h2>Details Product</h2><hr><br>
                    <form class="detailCategory">
                        <div class="form-content">
                            <div class="formElement">
                                <label>Id</label><input type="text" value="${data.product[0].idProduct}" name="idProduct" id="idProduct" disabled/>
                            </div>
                            <div class="formElement">
                                <label>Name</label><input type="text" value="${data.product[0].productName}" name="productName" id="productName" />
                            </div>
                            <div class="formElement ">
                                <label>Image</label>
                                <div class="productImage">
                                    <input type="image" src="/image/${data.product[0].productImage}" alt="${data.product[0].productName}" width="40" height="50">
                                    <input type="file" id="productImage" name="productImage"/>
                                </div>
                            </div>
                            <div class="formElement">
                                <label>Number</label><input type="text" value="${data.product[0].productCount}" name="productCount" id="productCount" />
                            </div>
                            <div class="formElement">
                                <label>Price</label><input type="text" value="${data.product[0].productPrice}" name="productPrice" id="productPrice" />
                            </div>
                            <div class="formElement">
                                <label>Decription</label><textarea name="productInfo" id="productInfo">${data.product[0].productInfo}</textarea>
                            </div>
                            <div class="formElement">
                                <label></label><input type="button" name="" id="update_Category" value="Update" onclick="updateProduct(${data.product[0].idProduct})" />
                                <input type="button" name="" id="" value="Back" onclick="getAllProducts()"/>
                            </div><br>
                            <div class="formElement">
                                <label></label><span class="message"></span>
                            </div>
                        </div>
                    </form>`
                    $('#content').children().remove()
                    $('#content').append(detail)
            }else{
                console.log('Cant get detail category ...')
            }
        })
    }

    // load form add category
    function loadFormAddProduct(){
        var formAdd = 
                `<h2>Add Product</h2><hr><br>
                    <form class="detailCategory">
                        <div class="form-content">
                            <div class="formElement">
                                <label>Id</label><input type="text" value="" name="idCategory" id="idCategory" />
                            </div>
                            <div class="formElement">
                                <label>Name</label><input type="text" value="" name="productName" id="productName" />
                            </div>
                            <div class="formElement ">
                                <label>Image</label>
                                <div class="productImage">
                                    <input type="file" id="productImage" name="productImage"/>
                                </div>
                            </div>
                            <div class="formElement">
                                <label>Number</label><input type="text" value="" name="productCount" id="productCount" />
                            </div>
                            <div class="formElement">
                                <label>Price</label><input type="text" value="" name="productPrice" id="productPrice" />
                            </div>
                            <div class="formElement">
                                <label>Decription</label><textarea name="productInfo" id="productInfo"></textarea>
                            </div>
                            <div class="formElement">
                                <label></label><input type="button" name="" id="update_Category" value="Update" onclick="addProduct()" />
                                <input type="button" name="" id="" value="Back" onclick="getAllProducts()"/>
                            </div><br>
                            <div class="formElement">
                                <label></label><span class="message"></span>
                            </div>
                        </div>
                    </form>`
        $('#content').children().remove()
        $('#content').append(formAdd)
    }

    // add category
    function addProduct(){
        $.ajax({
            url: `/admin/product`,
            type: 'POST',
            data: {
                idCategory: $('#idCategory').val(),
                categoryName: $('#categoryName').val(),
                forGender: $('select#gender').val(),
            }
        })
        .then(data=>{
            if(data){
                $('.message').text(data.message)
            }else{
                console.log('Add category finished...')
            }
        })
        .catch(err=>{
                console.log('Error: ', err)
        })
    }

    // update category
    function updateProduct(id){
        $.ajax({
            url: `/admin/product/${id}`,
            type: 'PUT',
            data: {
                idProduct: $('#idProduct').val(),
                productName: $('#productName').val(),
                productImage: $('#productImage').val(),
                productCount: $('#productCount').val(),
                productPrice: $('#productPrice').val(),
                productInfo: $('textarea#productInfo').val(),
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

    // delete category
    function deleteProduct(id,product){
        var del = confirm("Delete product ?")
        if(del == true){
            product.parentElement.parentElement.remove()
            $.ajax({
                url: `/admin/product/${id}`,
                type: 'DELETE',
            })
            .then(data=>{
                
            })
            .catch(err=>{
                console.log('Error: ', err)
            })
        }
    }

    function getProductSearch(){
        
    }