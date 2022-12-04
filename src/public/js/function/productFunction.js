    var numberLoad = 0;
    var numberLoadCP = 0;

    // load product for all product 
    function loadMore(page){
    $.ajax({
        url: `/product/page/${page + numberLoad}`,
        type: 'GET',
    })
    .then(data=>{
        if(data.products.length > 0){
            $('#products').append(`<div class="row p-b-30">`)
            data.products.forEach(val=>{
                var product = $(`
                        <div class="block2 col-lg-3 col-md-6 col-12" id="${val.idProduct}" onclick="getProductDetail(this)">
                            <div class="block2-pic hov-img0">
                                <img src="image/${val.productImage}" alt="IMG-PRODUCT">
        
                                <a href="#Product Overview"
                                    class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                    Quick View
                                </a>
                            </div>
        
                            <div class="block2-txt flex-w flex-t p-t-14">
                                <div class="block2-txt-child1 flex-col-l ">
                                    <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                        ${val.productName}
                                    </a>
        
                                    <span class="stext-105 cl3">
                                        ${val.productPrice}
                                    </span>
                                </div>
        
                                <div class="block2-txt-child2 flex-r p-t-3">
                                    <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                        <img class="icon-heart1 dis-block trans-04" src="image/icons/icon-heart-01.png"
                                            alt="ICON">
                                        <img class="icon-heart2 dis-block trans-04 ab-t-l" src="image/icons/icon-heart-02.png"
                                            alt="ICON">
                                    </a>
                                </div>
                            </div>
                        </div>
                `)
                $('#products .row:last').append(product)
            })
            numberLoad++
        }
            // console.log(numberLoad)
    })
    .catch(err=>{
            console.log('error: ', err)
    })
    }


    // load more product in a category 
    function loadMoreCP(idCategory, page){
       $.ajax({
        url: `/product/page/${page + numberLoadCP}/category/${idCategory}/`,
        type: 'GET',
       })
       .then(data=>{
        if(data.products.length > 0){
            $('#products').append(`<div class="row ">`)
            data.products.forEach(val=>{
                var product = $(`
                        <div class="block2 col-lg-3 col-md-6 col-12 p-b-30" id="${val.idProduct}" onclick="getProductDetail(this)">
                            <div class="block2-pic hov-img0">
                                <img src="image/${val.productImage}" alt="IMG-PRODUCT">
        
                                <a href="#Product Overview"
                                    class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                    Quick View
                                </a>
                            </div>
        
                            <div class="block2-txt flex-w flex-t p-t-14">
                                <div class="block2-txt-child1 flex-col-l ">
                                    <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                        ${val.productName}
                                    </a>
        
                                    <span class="stext-105 cl3">
                                        ${val.productPrice}
                                    </span>
                                </div>
        
                                <div class="block2-txt-child2 flex-r p-t-3">
                                    <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                        <img class="icon-heart1 dis-block trans-04" src="image/icons/icon-heart-01.png"
                                            alt="ICON">
                                        <img class="icon-heart2 dis-block trans-04 ab-t-l" src="image/icons/icon-heart-02.png"
                                            alt="ICON">
                                    </a>
                                </div>
                            </div>
                        </div>
                `)
                $('#products .row:last').append(product)
            })
        }
            numberLoadCP++
            // console.log(numberLoad)
       })
       .catch(err=>{
            console.log('error: ', err)
       })
    }

    // get product in a category
    function getproductFor(category){
        $.ajax({
            url: `/product/category/${category.getAttribute('id')}`,
            type: 'GET',
        })
        .then(data=>{
                $('#products').children().remove()
                $('#products').append(`<div class="row ">`)
                data.products.forEach(val=>{
                    var product = $(`
                            <div class="block2 col-lg-3 col-md-6 col-12 p-b-30" id="${val.idProduct}" onclick="getProductDetail(this)">
                                <div class="block2-pic hov-img0">
                                    <img src="image/${val.productImage}" alt="IMG-PRODUCT">
            
                                    <a href="#"
                                        class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>
            
                                <div class="block2-txt flex-w flex-t p-t-14">
                                    <div class="block2-txt-child1 flex-col-l ">
                                        <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            ${val.productName}
                                        </a>
            
                                        <span class="stext-105 cl3">
                                           $ ${val.productPrice}
                                        </span>
                                    </div>
            
                                    <div class="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img class="icon-heart1 dis-block trans-04" src="image/icons/icon-heart-01.png"
                                                alt="ICON">
                                            <img class="icon-heart2 dis-block trans-04 ab-t-l" src="image/icons/icon-heart-02.png"
                                                alt="ICON">
                                        </a>
                                    </div>
                                </div>
                            </div>
                    `)
                    $('#products .row:last').append(product)
                })
                $('#btnLoadMore').hide()
                $('#btnLoadMoreCP').remove()
                if( data.products.length >= 8 ){
                    var btnLoadMoreCP = $(`
                            <button href="" id="btnLoadMoreCP" class="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04" onclick="loadMoreCP(${category.getAttribute('id')},3)">
                                Load More
                            </button>
                    `) 
                    $('#loadmore').append(btnLoadMoreCP)
                }
            })
        numberLoad = 0;
        numberLoadCP = 0;
    }

    // get all product 
    function getAllProduct(){
        $.ajax({
            url: `/product/category/all`,
            type: 'GET',
        })
        .then(data=>{
                $('#products').children().remove()
                $('#products').append(`<div class="row ">`)
                data.products.forEach(val=>{
                    var product = $(`
                            <div class="block2 col-lg-3 col-md-6 col-12" id="${val.idProduct}" onclick="getProductDetail(this)">
                                <div class="block2-pic hov-img0">
                                    <img src="image/${val.productImage}" alt="IMG-PRODUCT">
            
                                    <a href="#"
                                        class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>
            
                                <div class="block2-txt flex-w flex-t p-t-14">
                                    <div class="block2-txt-child1 flex-col-l ">
                                        <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            ${val.productName}
                                        </a>
            
                                        <span class="stext-105 cl3">
                                            ${val.productPrice}
                                        </span>
                                    </div>
            
                                    <div class="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img class="icon-heart1 dis-block trans-04" src="image/icons/icon-heart-01.png"
                                                alt="ICON">
                                            <img class="icon-heart2 dis-block trans-04 ab-t-l" src="image/icons/icon-heart-02.png"
                                                alt="ICON">
                                        </a>
                                    </div>
                                </div>
                            </div>
                    `)
                    $('#products .row:last').append(product)
                })

                if(data.products.length >= 8){
                    $('#btnLoadMore').show()
                    $('#btnLoadMoreCP').remove()
                    
                }
            })
        numberLoad = 0;
        numberLoadCP = 0;
    }

    // get product detail
    function getProductDetail(idProduct){
        console.log('a')
        $.ajax({
            url: `/product/${idProduct.getAttribute('id')}`,
            type: 'GET',
        })
        .then(data=>{
                $('#products').children().remove()
                data.product.forEach(val=>{
                    var product = $(`
                        <section class="sec-product-detail bg0 p-t-65 p-b-60">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-6 col-lg-7 p-b-30">
                                        <div class="p-l-25 p-r-30 p-lr-0-lg">
                                            <div class="wrap-slick3 flex-sb flex-w">
                                                <div class="wrap-slick3-dots"></div>
                                                <div class="wrap-slick3-arrows flex-sb-m flex-w"></div>

                                                <div class="slick3 gallery-lb">
                                                    <div class="item-slick3" data-thumb="image/${val.productImage}">
                                                        <div class="wrap-pic-w pos-relative">
                                                            <img src="image/${val.productImage}" alt="IMG-PRODUCT">

                                                            <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="image/${val.productImage}">
                                                                <i class="fa fa-expand"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        
                                    <div class="col-md-6 col-lg-5 p-b-30">
                                        <div class="p-r-50 p-t-5 p-lr-0-lg">
                                            <h4 class="mtext-105 cl2 js-name-detail p-b-14">
                                                ${val.productName}
                                            </h4>

                                            <span class="mtext-106 cl2">
                                                $ ${val.productPrice}
                                            </span>

                                            <p class="stext-102 cl3 p-t-23">
                                                ${val.productInfo}
                                            </p>
                                            
                                            <!--  -->
                                            <div class="p-t-33 ">
                                                <div class="flex-w flex-r-m p-b-10">
                                                    <div class="d-flex flex-column .align-items-center size-204 flex-w flex-m respon6-next">
                                                        <div class="wrap-num-product flex-w m-r-20 m-tb-10">
                                                            <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m" id="minus-product">
                                                                <i class="fs-16 zmdi zmdi-minus"></i>
                                                            </div>

                                                            <input class="mtext-104 cl3 txt-center num-product" type="number" id="product_count"
                                                                    name="num-product1" value="1">

                                                            <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m " id="plus-product">
                                                                <i class="fs-16 zmdi zmdi-plus"></i>
                                                            </div>
                                                        </div>
                                                        <div class="p-t-30" id="${val.idProduct}" onclick="add_to_cart(this)">
                                                            <button class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04" >
                                                                Add to cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>	
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </section>
                    `)
                    $('#products').append(product)

                    // button minus product
                    document.getElementById('minus-product').onclick = function(){
                        var count = Number($('#product_count').attr('value')) - 1
                        $('#product_count').attr('value', count)
                        if(count < 0){
                            $('#product_count').attr('value', 0)
                        }
                    }

                    // button plus product
                    document.getElementById('plus-product').onclick = function(){
                        var count = Number($('#product_count').attr('value')) + 1
                        $('#product_count').attr('value', count)
                        if(count > val.productCount){
                            $('#product_count').attr('value', val.productCount)
                        }
                    }
                })
            })

            // show button loadmore
            $('#btnLoadMore').show()
            $('#btnLoadMoreCP').remove()
            numberLoad = Math.floor(Math.random() * 3);
            numberLoadCP = 0;
    }

    // search product 
    function getproductSearch(){
        $('#search_product').keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                var keysearch = $('#search_product').val()
                $.ajax({
                    url: `/product/search/${keysearch}`,
                    type: 'GET',
                })
                .then(data=>{
                        if(data.products.length != 0){
                            $('#products').children().remove()
                            $('#products').append(`<div class="row ">`)
                            data.products.forEach(val=>{
                                var product = $(`
                                        <div class="block2 col-lg-3 col-md-6 col-12" id="${val.idProduct}" onclick="getProductDetail(this)">
                                            <div class="block2-pic hov-img0">
                                                <img src="image/${val.productImage}" alt="IMG-PRODUCT">
                        
                                                <a href="#"
                                                    class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                                    Quick View
                                                </a>
                                            </div>
                        
                                            <div class="block2-txt flex-w flex-t p-t-14">
                                                <div class="block2-txt-child1 flex-col-l ">
                                                    <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                                        ${val.productName}
                                                    </a>
                        
                                                    <span class="stext-105 cl3">
                                                        ${val.productPrice}
                                                    </span>
                                                </div>
                        
                                                <div class="block2-txt-child2 flex-r p-t-3">
                                                    <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                                        <img class="icon-heart1 dis-block trans-04" src="image/icons/icon-heart-01.png"
                                                            alt="ICON">
                                                        <img class="icon-heart2 dis-block trans-04 ab-t-l" src="image/icons/icon-heart-02.png"
                                                            alt="ICON">
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                `)
                                $('#products .row:last').append(product)
                            })
                        }else{
                            $('#products').children().remove()
                            $('#products').append(`<h4>Cannot found !</h4>`)
                        }
                })

                $('#btnLoadMore').hide()
                $('#btnLoadMoreCP').hide()
                numberLoad = 0;
                numberLoadCP = 0;
                }
            })
    }

    // add product to cart
    function add_to_cart(id){
        var number = ($('#product_count').attr('value'))
        var idUser = getCookie('user_token')
        console.log(idUser)
        if(idUser){
            $.ajax({
                url: `/cart`,
                type: 'POST',
                data: {
                    idProduct : id.getAttribute('id'),
                    idUser: idUser,
                    number: number,
                }
            })
        }else{
            document.location.href = 'http://localhost:3000/login'
        }
    }