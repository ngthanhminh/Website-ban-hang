    $('#product').click(function(){
        var header = 
            `<h2>Product</h2>
			<div><input type="button" value="Add product"/></div>`
        $('#content').children().remove()
        $('#content').append(header)
    })