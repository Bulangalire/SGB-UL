$(document).ready(function () {
  
    $(".errorMoney").ready(function(e) {
        $("#errorMoneyModal").modal("show");
    });
    $("#errorModalFermer").click(function(e) {
        $("#errorMoneyModal").modal("hide");
    });
    
});
