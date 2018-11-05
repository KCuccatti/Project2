// Declare global variables
var dealerName = '';
var dealerAddress = '';
var dealerCity = '';
var dealerState = '';
var dealerZip = '';
var dealerPhone = '';
var dealerShow = '';
var dealerHtml = '';

// Show table on load of page
$('.dealerTableDiv').show();


// On click of Add Dealer' button, hide and show necessary elements 
$('.btnAddDealer').on('click', function() {
    $('.dealerTableDiv').hide();
    $('.dealerInputDiv').show();
    $('.btnUpdateDealer').hide();
})


// On click of 'Save' button, set values for dealer to be added and reload the table
$('.btnSaveDealer').on('click', function () {
    dealerName = $('#dealerName').val();
    dealerAddress = $('#dealerAddress').val();
    dealerCity = $('#dealerCity').val();
    dealerState = $('#dealerState').val();
    dealerZip = $('#dealerZip').val();
    dealerPhone = $('#dealerPhone').val();

    $.when(ajaxAddDealer()).done(function (a1) {
        window.location.href="/AddDealer";
    })
})


// On click of 'Update Dealer' button, show and hide necessary elements, get the values of 
// dealer info to update and reload table
$('.btnUpdateDealer').on('click', function() {
    $('.dealerDiv').show();
    $('.btnAddDealer').hide();
    dealerId = $('#dealerId').val();
    dealerName = $('#dealerName').val();
    dealerAddress = $('#dealerAddress').val();
    dealerCity = $('#dealerCity').val();
    dealerState = $('#dealerState').val();
    dealerZip = $('#dealerZip').val();
    dealerPhone = $('#dealerPhone').val();
    $.when(ajaxUpdateDealer()).done(function (a1) {
        window.location.href="/AddDealer";
    })
})

// On click of 'View Dealers' button, show dealer table
$('.btnViewDealers').on('click', function() {
    window.location.href="/AddDealer";
})


// Call the back end to add dealer info to db
function ajaxAddDealer() {
    return $.ajax({
        type: "POST",
        url: `/api/AddDealer/${dealerName}&${dealerAddress}&${dealerCity}&${dealerState}&${dealerZip}&${dealerPhone}`,
        datatype: "json",
    });
}

// Call back end with request to update existing dealer from db
function ajaxUpdateDealer() {
    alert('ID of record to be updated is: ' + dealerId);
    
    return $.ajax({
        type: "PUT",
        url: `/api/UpdateDealer/${dealerId}&${dealerName}&${dealerAddress}&${dealerCity}&${dealerState}&${dealerZip}&${dealerPhone}`,
        datatype: "json",
    });
}


// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

