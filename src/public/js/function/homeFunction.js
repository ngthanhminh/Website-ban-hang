var numberLoad = 0;
    function loadMore(page){
       $.ajax({
        url: `/product/page/${page + numberLoad}`,
        type: 'GET',
       })
       .then(data=>{
            data.products.forEach(val=>{
                var product = $(`
                        <div class="block2" id="${val.idProduct}" onclick="getProductDetail(this)">
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
                $('#products').append(product)
            })
            numberLoad++
            console.log(numberLoad)
       })
       .catch(err=>{
            console.log('error: ', err)
       })
    }

    // get product detail
    function getProductDetail(Product){
        $.ajax({
            url: `/product/${Product.getAttribute('id')}`,
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
                                                    <div class="size-204 flex-w flex-m respon6-next">
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
                                                        <div class="p-t-100" id="${val.idProduct}" onclick="add_to_cart(this)">
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
                    $('#btnLoadMore').hide()
                    $('#btnLoadMoreCP').hide()
                })
            })
    }

    // add product to cart
    function add_to_cart(id){
        var number = ($('#product_count').attr('value'))
        var idCustomer = getCookie('user_token')
        if(idCustomer){
            $.ajax({
                url: `/cart`,
                type: 'POST',
                data: {
                    idProduct : id.getAttribute('id'),
                    idCustomer: idCustomer,
                    number: number,
                }
            })
        }else{
            document.location.href = 'http://localhost:3000/login'
        }
    }