
    $.ajax({
        url: `/category`,
        type: 'GET',
    })
    .then(data=>{
        data.categories.forEach(val=>{
            var category = $(`
                <li class="p-b-10">
                    <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                      ${val.categoryName}
                    </a>
                </li>
            `)
            $('#category-footer').append(category)
        })
    })