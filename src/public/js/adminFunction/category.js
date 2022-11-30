    
    // get all category
    var getCategories = function() {
        var header = 
            `<h2>Category</h2><hr>
			<div>
                <input type="button" value="Add category" onclick="loadFormAddCate()"/>
                <div class="app-search-box col">
					<input type="text" placeholder="Search..." name="search" class="form-control search-input" id="categorySearch" onclick="getCategorySearch()">
		        </div>
            </div><br>
            <table id="categories">
                <th>Id Category</th>
                <th>Name</th>
                <th>For Gender</th>
                <th>Function</th>
            </table>`
        $('#content').children().remove()
        $('#content').append(header)
        $.ajax({
            url: `/category`,
            type: 'GET'
        })
        .then(data=>{
            if(data){
                data.categories.forEach(val=>{
                    let category = 
                        `<tr>
                            <td>${val.idCategory}</td>
                            <td>${val.categoryName}</td>
                            <td>${val.forGender}</td>
                            <td>	
                                <input type="button" value="Detail" onclick="detailCategory(${val.idCategory},this)" />
                                <input type="button" value="Delete" onclick="deleteCategory(${val.idCategory},this)" />
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
    $('#category').click(getCategories)


    // get details category 
    function detailCategory(id){
        $.ajax({
            url: `/admin/category/${id}`,
            type: 'GET',
        })
        .then(data=>{
            if(data){
                var detail = 
                    `<h2>Details Category</h2><hr><br>
                    <form class="detailCategory">
                        <div class="form-content">
                            <div class="formElement">
                                <label>Id</label><input required type="text" value="${data.category[0].idCategory}" name="idCategory" id="idCategory" disabled/>
                            </div>
                            <div class="formElement">
                                <label>Name</label><input required type="text" value="${data.category[0].categoryName}" name="categoryName" id="categoryName" />
                            </div>
                            <div class="formElement">
                                <label>Gender</label>
                                <select name="gender" id="gender">
                                    <option value="${data.category[0].forGender}">${data.category[0].forGender}</option>
                                    <option value="man">man</option>
                                    <option value="woman">woman</option>
                                    <option value="kids">kids</option>
                                    <option value="all">all</option>
                                </select>
                            </div>
                            <div class="formElement">
                                <label></label><input type="button" name="" id="update_Category" value="Update" onclick="updateCategory(${data.category[0].idCategory})" />
                                <input type="button" name="" id="" value="Back" onclick="getCategories()"/>
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
    function loadFormAddCate(){
        var formAdd = 
            `<h2>Add Category</h2><hr><br>
            <form class="detailCategory">
                <div class="form-content">
                    <div class="formElement">
                        <label>Id</label><input required type="text" value="" name="idCategory" id="idCategory" />
                    </div>
                    <div class="formElement">
                        <label>Name</label><input required type="text" value="" name="categoryName" id="categoryName" />
                    </div>
                    <div class="formElement">
                        <label>Gender</label>
                        <select name="gender" id="gender">
                            <option value="man">man</option>
                            <option value="woman">woman</option>
                            <option value="kids">kids</option>
                            <option value="all">all</option>
                        </select>
                    </div>
                    <div class="formElement">
                        <label></label><input type="button" name="" id="update_Category" value="Add" onclick="addCategory()" />
                        <input type="button" name="" id="" value="Back" onclick="getCategories()"/>
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
    function addCategory(){
        $.ajax({
            url: `/admin/category`,
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
    function updateCategory(id){
        $.ajax({
            url: `/admin/category/${id}`,
            type: 'PUT',
            data: {
                categoryName: $('#categoryName').val(),
                forGender: $('select#gender').val(),
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
    function deleteCategory(id,product){
        var del = confirm("Delete category ?")
        if(del == true){
            product.parentElement.parentElement.remove()
            $.ajax({
                url: `/admin/category/${id}`,
                type: 'DELETE',
            })
            .then(data=>{
                
            })
            .catch(err=>{
                console.log('Error: ', err)
            })
        }
    }

    // search category
    function getCategorySearch(){
        $('#categorySearch').keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                var keysearch = $('#categorySearch').val()
                $.ajax({
                    url: `/admin/category/search/${keysearch}`,
                    type: 'GET',
                })
                .then(data=>{
                    if(data){
                        $('#categories').children().remove()
                        data.categories.forEach(val=>{
                            let category = 
                                `<tr>
                                    <td>${val.idCategory}</td>
                                    <td>${val.categoryName}</td>
                                    <td>${val.forGender}</td>
                                    <td>	
                                        <input type="button" value="Detail" onclick="detailCategory(${val.idCategory},this)" />
                                        <input type="button" value="Delete" onclick="deleteCategory(${val.idCategory},this)" />
                                    </td>
                                </tr>`
                            $('#categories').append(category)
                        })
                    }else{
                        $('#categories').append(`<p>No category ...</p>`)
                    }
                })
            }

        })
    }