    $('#customer').click(function(){
        var header = 
            `<h2>Customer</h2>
			<div><input type="button" value="Add Customer"/></div>`
        $('#content').children().remove()
        $('#content').append(header)
    })