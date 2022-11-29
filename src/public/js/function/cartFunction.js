    // // delete product in cart 
    // function deleteProductCart(Product){
    //     var id = Product.getAttribute('id')
    //     var idCustomer = getCookie('user_token')
    //     Product.parentElement.remove()
    //     $('.header-cart-total').remove()
    //     $.ajax({
    //         url: `/cart`,
    //         type: 'DELETE',
    //         data: {
    //             idProduct: id,
    //             idUser: idCustomer,
    //         }
    //     })
        
    // }

    // get cart header
    function getCart(){
        var idUser = getCookie('user_token')
        if( idUser ) {
            $.ajax({
                url: `/cart/${idUser}`,
                type: 'GET'
            })
            .then(data => {
                if(data.cart.length > 0){
                    var total = 0
                    $('#cart-product').children().remove()
                    data.cart.forEach(val=>{
                        total += (parseFloat(val.countBuy) * parseFloat(val.productPrice))
                        var product = $(`
                            <li class="header-cart-item flex-w flex-t m-b-12" >
                                <div class="header-cart-item-img " id="${val.idProduct}" onclick="deleteProductCart(this)">
                                    <img src="image/${val.productImage}" alt="IMG">
                                </div>

                                <div class="header-cart-item-txt p-t-8">
                                    <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                                        <${val.productName}
                                    </a>
                                    <span class="header-cart-item-info">
                                        ${val.countBuy} x $ ${val.productPrice}
                                    </span>
                                </div>
                            </li>
                        `)
                        $('#cart-product').append(product)
                    })
                    $('#cart-product').append($(`
                        <div class="header-cart-total w-full p-tb-40">
                            <h4>Total: $ ${Math.round(total*100)/100}</h4>
                        </div>
                    `))
                }else{
                    $('#cart-product').append($(`
                        <p>No product in cart !</p>
                    `))
                }
            })
        }else{
            document.location.href = 'http://localhost:3000/login'
        }
    }

    // delete product 
    function deleteProductCart(Product){
        var id = Product.getAttribute('id')
        var idUser = getCookie('user_token')
        Product.parentElement.remove()
        $('.header-cart-total').remove()
        $.ajax({
            url: `/cart`,
            type: 'DELETE',
            data: {
                idProduct: id,
                idUser: idUser,
            }
        })
    }

    function minusProduct(node) {
        let price = node.parentElement.parentElement.previousElementSibling.innerHTML.slice(2)
        var total = Number(node.parentElement.parentElement.nextElementSibling.innerHTML.slice(2))
        let number = Number(node.nextElementSibling.getAttribute('value'))
        number -= 1
        if(number < 1){
            number = 0
        }
        price = Number(price)
        node.nextElementSibling.setAttribute('value', number)
        node.parentElement.parentElement.nextElementSibling.innerHTML = '$ ' + (Math.round(number * price * 100)/100)
        let subtotal = Number($('#subtotal').text())
        $('#subtotal').text(subtotal + ((Math.round(number * price * 100)/100) - total))
        $('#subtotal2').text(subtotal + ((Math.round(number * price * 100)/100) - total))

    }

    function plusProduct(node){
        let price = node.parentElement.parentElement.previousElementSibling.innerHTML.slice(2)
        var total = Number(node.parentElement.parentElement.nextElementSibling.innerHTML.slice(2))
        let number = Number(node.previousElementSibling.getAttribute('value'))
        number += 1
        price = Number(price)
        node.previousElementSibling.setAttribute('value', number)
        node.parentElement.parentElement.nextElementSibling.innerHTML = '$ ' + (Math.round(number * price * 100)/100)
        let subtotal = Number($('#subtotal').text())
        $('#subtotal').text(subtotal + ((Math.round(number * price * 100)/100) - total))
        $('#subtotal2').text(subtotal + ((Math.round(number * price * 100)/100) - total))

    }

    // update cart 
    function updateCart(){
        var idUser = getCookie('user_token')
        $('.table_row').each(function(){
            let id = $(this).children('.column-1').attr('id')
            let number = $(this).children('.column-4').children().children('#numberProduct').attr('value')
            $.ajax({
                url: `/cart`,
                type: 'PUT',
                data: {
                    idUser: idUser,
                    idProduct : id,
                    number: number,
                }
            })
        })
    }