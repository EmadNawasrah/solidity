var category="gum";
$(() => {
    testProcut();
   $("#test").on("click",function(){
    test();
   })
});
const test=()=>{
    var settings = {
        "url": "http://localhost:3000/getProductsByCategoryNotBoycott",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "categoryName": category
        }),
    };

    $.ajax(settings).done(function (response) {
        $(".test").html(JSON.stringify(response));
    });
}
const testProcut = () => {
    let target = $("#testProudct");
    if (target.length == 0) return 0;
    target.off("click");
    target.on("click", function () {
        $(".resultLoader").removeClass("d-none")
        $(".result").addClass("d-none")
        $(".hamas").addClass("d-none")

        if ($(".result .row").hasClass("padProduct") || $(".result .row").hasClass("goodProduct")) {
            $(".result .row").removeClass("padProduct")
            $(".result .row").removeClass("goodProduct")
        }

        const productName = $("#selctBox").val();
        
        // $('#myTable').DataTable().clear();
        $.post('http://localhost:3000/checkProduct', { product: productName }, function (response) {
            if (response.status !== 200) {
                $(".resultLoader").addClass("d-none")
                $(".result").removeClass("d-none")
                $(".hamas").removeClass("d-none")
                $(".productName").text("NOT FOUND");
                $(".productType").text("")

                return 0;
            }
            $(".productName").text(((response.data)[0]));
            category=(response.data)[1]
            if ((response.data)[2] === "no") {
                $(".result .row").addClass("goodProduct")
                $(".productType").text("Not Boycott")
            }
            if ((response.data)[2] === "yes") {
                $(".result .row").addClass("padProduct")
                $(".productType").text(" Boycott")

            }
            $(".resultLoader").addClass("d-none")
            $(".result").removeClass("d-none")
            $(".hamas").removeClass("d-none")


        });
    });
}