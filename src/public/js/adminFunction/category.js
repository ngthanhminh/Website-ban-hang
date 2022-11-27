    
    // get all category
    var getCategories = function() {
        var header = 
            `<h2>Category</h2><hr>
			<div><input type="button" value="Add category"/></div><br>
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
                            <th>${val.idCategory}</th>
                            <th>${val.categoryName}</th>
                            <th>${val.forGender}</th>
                            <th>	
                                <input type="button" value="Detail" onclick="detailCategory(${val.idCategory})" />
                                <input type="button" value="Delete" onclick="deleteCategory(${val.idCategory})" />
                            </th>
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
            url: `/category/${id}`,
            type: 'GET',
        })
        .then(data=>{
            if(data){
                var detail = 
                    `<form class="detailCategory">
                        <div class="form-content">
                            <h3>Category Details</h3>
                            <div class="formElement">
                                <label>Id</label><input type="text" value="${data.category[0].idCategory}" name="idCategory" id="idCategory" />
                            </div>
                            <div class="formElement">
                                <label>Name</label><input type="text" value="${data.category[0].categoryName}" name="categoryName" id="categoryName" />
                            </div>
                            <div class="formElement">
                                <label>Gender</label><input type="text" value="${data.category[0].forGender}" name="forGender" id="forGender" />
                            </div>
                            <div class="formElement">
                                <label></label><input type="button" name="" id="update_Category" value="Update" />
                                <input type="button" name="" id="" value="Back" onclick="getCategories()"/>
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

    // delete category
    function detailCategory(id){
        $.ajax({
            url: `/category/${id}`,
            type: 'GET',
        })
        .then(data=>{
            if(data){
                var detail = 
                    `<form class="detailCategory">
                        <div class="form-content">
                            <h3>Category Details</h3>
                            <div class="formElement">
                                <label>Id</label><input type="text" value="${data.category[0].idCategory}" name="idCategory" id="idCategory" />
                            </div>
                            <div class="formElement">
                                <label>Name</label><input type="text" value="${data.category[0].categoryName}" name="categoryName" id="categoryName" />
                            </div>
                            <div class="formElement">
                                <label>Gender</label><input type="text" value="${data.category[0].forGender}" name="forGender" id="forGender" />
                            </div>
                            <div class="formElement">
                                <label></label><input type="button" name="" id="update_Category" value="Update" />
                                <input type="button" name="" id="" value="Back" onclick="getCategories()"/>
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