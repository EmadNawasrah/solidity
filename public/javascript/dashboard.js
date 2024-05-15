function removeEmptyStringsFromArray(arr) {
    return arr.filter(str => str.trim() !== "");
  }
const fetchCategories = () => {
    var settings = {
        "url": "/admin/product/getAllCategories",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        }
    };

    $.ajax(settings).done(function (response) {
        if (response.status !== 200) return 0;
        response.categories.forEach((category, index) => {
            $("#category").append(`
                <option value="${category}">${category}</option>
            `);
        })
    });

}
const fetchProducts = () => {
    var settings = {
        "url": "/admin/product/getAllProducts",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        }
    };

    $.ajax(settings).done(function (response) {
        if (response.status !== 200) return 0;
        $(".productsTableContainer , .addProductContainer").removeClass("d-none")
        $(".loaderContainer").addClass("d-none")
        let table = $("#productsTable").DataTable();
        table.clear();
        let products=removeEmptyStringsFromArray(response.data)
        console.log(products)
        products.forEach(function (product) {
            table.row.add([
                product,
                `
                <a  data-all='${product}' class="updateProductButton btn btn-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><path stroke-linecap="round" d="M6 5v25.004h36V5"/><path d="M15 23h4.002l13.85-14.143L28.993 5L15 19.143z"/><path stroke-linecap="round" d="m30 37l-6 6l-6-6m6-7v13"/></g></svg>
                </a>
                <a  data-id="${product}" class=" deleteProductButton  btn btn-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="currentColor" d="M9 17h2V8H9zm4 0h2V8h-2zm-8 4V6H4V4h5V3h6v1h5v2h-1v15z"/></svg>
                </a>
                `,
            ]).draw(false);
        });
        onClickUpdateProductButton();
        onClickDeleteProductButton();
    });

}
const onSubmitAddProduct = () => {
    $("#addProductForm").on("submit", function (event) {
        event.preventDefault();
        let submitButton = $(this).find("button");
        let loader = $(this).find(".loader");
        $(submitButton).addClass("d-none");
        $(loader).removeClass("d-none");

        var form = new FormData($(this)[0]);
        console.log(form)
        var settings = {
            "url": "/admin/product/addNewProduct",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form,
        };
        $.ajax(settings).done(function (response) {
            console.log();
            let table = $("#productsTable").DataTable();
            let rowData = [
                "Data 1",
                "Data 2",
                "Data 3",
                "Data 3",
                `
                <a  data-all='${JSON.stringify(JSON.parse(response).data)}' class="updateProductButton btn btn-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><path stroke-linecap="round" d="M6 5v25.004h36V5"/><path d="M15 23h4.002l13.85-14.143L28.993 5L15 19.143z"/><path stroke-linecap="round" d="m30 37l-6 6l-6-6m6-7v13"/></g></svg>
                </a>
                <a  data-id="${JSON.parse(response).data.id}" class=" deleteProductButton  btn btn-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="currentColor" d="M9 17h2V8H9zm4 0h2V8h-2zm-8 4V6H4V4h5V3h6v1h5v2h-1v15z"/></svg>
                </a>
                `,
                // Add more data here if needed
            ];
            
            // Add the new row to the DataTable
            table.row.add(rowData).draw(false);

            $(submitButton).removeClass("d-none");
            $(loader).addClass("d-none");
        });

    })
}
$(() => {
    onSubmitAddProduct();
    fetchProducts();
    fetchCategories()
    deleteProduct()
})
const onClickUpdateProductButton = () => {
    let target = $('.updateProductButton');
    if (target.length <= 0) return 0;
    target.off("click");
    target.on("click", function (e) {
        let modal = $("#updateProduct");
        let allData = JSON.parse($(this).attr("data-all"));


        $.each(allData, (index, data) => {
            setDataToElement(modal.find("#" + index + ""), data);
        });
        modal.modal("show");
    });
}
const onClickDeleteProductButton = () => {
    let target = $('.deleteProductButton');
    if (target.length <= 0) return 0;
    target.off("click");
    target.on("click", function (e) {
        let modal = $("#delelteProduct");
        $(modal.find("#id")).val($(this).attr("data-id"));
        modal.modal("show");
    });
}
const deleteProduct=()=>{
    $("#delelteProductForm").on("submit",function(e){
        e.preventDefault();
        var settings = {
            "url": "/admin/product/deleteProduct",
            "method": "POST",
            "timeout": 0,
            "data": {productName:$("#id").val()},
        };
        $.ajax(settings).done(function (response) {

        })
    })
}