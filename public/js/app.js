var yearHtml = '';
var makelHtml = '';
var modelHtml = '';
var year = '';
var model = '';

$.when(ajaxGetVehicleYears()).done(function (a1) {
    $('#yearDiv').html(yearHtml);
});

$(document).on('change', '#vehicleYear', function () {   
    year = $(this).find('option:selected').val();
    $('#vehicleMake').removeAttr('disabled');
     // THIS IS THE EXACT SPOT WHERE YOU NOW WOULD MAKE AN AJAX CALL TO GET THE AVAILABLE
    // MAKES FOR THE SELECT YEAR, REMEMBER THAT WHEN YOU CALL THE AJAX API, THIS TIME YOU PASS A YEAR PARAMETER
    // SIMILAR TO HOW WE DID THE UPDATE IN PREV PROF
    $.when(ajaxGetMakesForYear()).done(function (a1) {
        $('#makeDiv').html(makeHtml);
    })

    $(document).on('change', '#make', function() {
        model = $(this).find('option:selected').val();
        $.when(ajaxGetModelsForYearAndMake()).done(function (a1) {
            $('#modelDiv').html(modelHtml);
        })
    })
})

// Call the back end to get list of available vehicle years
function ajaxGetVehicleYears() {
    return $.ajax({
        type: "GET",
        url: `/api/VehicleYears`,
        datatype: "json",
        success: getVehicleYears,
    });
}

// Loop through product inventory response json & creates html to be displayed
function getVehicleYears(response) {
    yearHtml = `<select class="w3-select w3-border w3-animate-zoom" id="vehicleYear" style="width:9%; margin-top:2%;">`;
    yearHtml += `<option value="" disabled selected>Year</option>`;
    for (let i = 0; i < response.length; i++) {
        yearHtml += `<option class="w3-bar-item w3-button">${response[i].year}</option>`;
    }
    yearHtml += `</select>`;
}


 // Call the API to update db displaying an informative message as to whether
// or not the order was able to be fulfilled
function ajaxGetMakesForYear() {
    console.log('Getting ready to get makes...')
    return $.ajax({
        type: "GET",
        url: `/api/GetMakesForYear/${year}`,
        datatype: "json",
        success: getMakesForYear,
    });
}

function getMakesForYear(response) {
    makeHtml = `<select class="w3-select w3-border w3-animate-zoom" id="make" style="width:9%; margin-top:2%;">`;
    makeHtml += `<option value="" disabled selected>Make</option>`;
    for (let i = 0; i < response.length; i++) {
        makeHtml += `<option class="w3-bar-item w3-button">${response[i].make}</option>`;
    }
    makeHtml += `</select>`;
}


 // Call the API to update db displaying an informative message as to whether
// or not the order was able to be fulfilled
function ajaxGetModelsForYearAndMake() {
    console.log('Getting ready to call backend for models...');
    return $.ajax({
        type: "GET",
        url: `/api/GetModelsForYearAndMake/${year}&${model}`,
        datatype: "json",
        success: getModelsForYearAndMake,
    });
}

function getModelsForYearAndMake(response) {
    console.log("GEtting ready to populate html for models...")
    modelHtml = `<select class="w3-select w3-border w3-animate-zoom" id="modelYear" style="width:9%; margin-top:2%;">`;
    modelHtml += `<option value="" disabled selected>Model</option>`;
    for (let i = 0; i < response.length; i++) {
        modelHtml += `<option class="w3-bar-item w3-button">${response[i].model}</option>`;
    }
    modelHtml += `</select>`;
   
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
