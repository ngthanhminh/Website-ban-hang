    $('#cart').click(function(){
        var header = 
            `<h2>Cart</h2>
			<div><input type="button" value="Add cart"/></div>`
        $('#content').children().remove()
        $('#content').append(header)
    })