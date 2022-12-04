    // search 
    function search(){
        $('#header-search').keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which)
            if (keycode == '13') {
                var keysearch = $('#header-search').val()
                $.ajax({
                    url: `/product/search/${keysearch}`,
                    type: 'GET',
                })
                .then(data=>{
                    $('#main').children().remove()
                    $('#main').append(`<div class="container" id="products" style="padding-top: 120px; padding-bottom: 160px;"></div>`)
                    $('#products').append(`<h3 class="ltext-103 cl5 p-b-50 ">Your search results </h3>`)
                    if(data.products.length > 0){
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
                        $('#close').click() = true
                    }else{
                        $('#products').children().remove()
                        $('#products').append(`<h4>Cannot found !</h4>`)
                        $('#close').click() = true
                    }
                })

                $('#btnLoadMore').hide()
                $('#btnLoadMoreCP').hide()
                numberLoad = 0;
                numberLoadCP = 0;
                }
            })
    }