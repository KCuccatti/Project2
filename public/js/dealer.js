var dealerName = '';
var dealerAddress = '';
var dealerCity = '';
var dealerState = '';
var dealerZip = '';
var dealerPhone = '';
var dealerPhoneExt = '';



$('#btnAddDealer').on('click', function () {
    dealerName = $('#dealerName').val(); 
    dealerAddress = $('#dealerAddress').val();
    alert(dealerAddress);
    dealerCity = $('#dealerCity').val();
    dealerState = $('#dealerState').val();
    dealerZip = $('#dealerZip').val();
    dealerPhone = $('#dealerPhone').val();
    dealerPhoneExt = $('#dealerPhoneExt').val();
    
    $.when(ajaxAddDealer()).done(function (a1) {
        alert('Done adding dealer');
    })
})


// Call the API to add dealer info to db
function ajaxAddDealer() {
    console.log('Getting ready to add dealer...');
    alert(dealerAddress);
    return $.ajax({
        type: "POST",
        url: `/api/AddDealer/${dealerName}&${dealerAddress}&${dealerCity}&${dealerState}&${dealerZip}&${dealerPhone}&${dealerPhoneExt}`,
        datatype: "json",
        success: addDealer,
    });
}





function addDealer(response) {
    console.log('Made it to add dealer function');
}