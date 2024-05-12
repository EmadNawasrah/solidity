$(() => {
    testProcut();
});
const testProcut = () => {
    let target = $("#testProudct");
    if (target.length == 0) return 0;
    target.off("click");
    target.on("click", function () {
        $(".resultLoader").removeClass("d-none")
        $(".result").addClass("d-none")
        $(".hamas").addClass("d-none")
        
        if($(".result .row").hasClass("padProduct") || $(".result .row").hasClass("goodProduct")){
            $(".result .row").removeClass("padProduct") 
            $(".result .row").removeClass("goodProduct") 
        }

        const productName = $("#selctBox").val();
        $('#myTable').DataTable().clear();
        $.post('http://localhost:3000/checkProduct', { product: productName }, function (response) {
            if(response.status!==200){
                $(".resultLoader").addClass("d-none")
                $(".result").removeClass("d-none")
            $(".hamas").removeClass("d-none")
            $(".productName").text("NOT FOUND");

    
                return 0;
            }
            $(".productName").text((JSON.parse(response.data)[0]));
            if (JSON.parse(response.data)[2] === "no") {
                $(".result .row").addClass("goodProduct")
                $(".productType").text("Not Moqat3")
            }
            if (JSON.parse(response.data)[2] === "yes") {
                $(".result .row").addClass("padProduct")
                $(".productType").text("Moqat3")

            }
            $(".resultLoader").addClass("d-none")
            $(".result").removeClass("d-none")
        $(".hamas").removeClass("d-none")


        });
    });
}