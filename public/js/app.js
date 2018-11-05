// Declare global variables
var yearHtml = '';
var makelHtml = '';
var modelHtml = '';
var year = '';
var make = '';
var model = '';
var income = '';
var matchingCarsHtml = '';

// Hide necessary elements on page load
$('.btnSearchMore').hide();
$('.incomeBox').hide();


// When ajax call for vehicle years is done, populate the vehicle year dropdown
$.when(ajaxGetVehicleYears()).done(function (a1) {
    $('.yearDiv').html(yearHtml);
});


// On change of vehicle year drop down, populate vehicle make dropdown based on 
// the year the user selected
$(document).on('change', '.year', function () {
    year = $(this).find('option:selected').val();

    $('.make').removeAttr('disabled');
    $.when(ajaxGetMakesForYear()).done(function (a1) {
        $('.makeDiv').html(makeHtml);
    })

    // On change of vehicle make drop down, populate vehicle model dropdown based on 
    // the make the user selected
    $(document).on('change', '.make', function () {
        make = $(this).find('option:selected').val();
        $.when(ajaxGetModelsForYearAndMake()).done(function (a1) {
            $('.modelDiv').html(modelHtml);
        })
    })

    // On change of vehicle model, show the income div
    $(document).on('change', '.model', function () {
        $('.incomeBox').show();
    })
})

// On click of 'Find Vehicles' button, hide and show necessary elements and get vals for necessary user inputs
$('#btnFindVehicles').on('click', function () {
    $('#btnFindVehicles').hide();
    $('.incomeBox').hide();
    $('.vehicleDropDiv').hide();
    $('.btnSearchMore').show();
    income = $('.income').val();
    model = $('.model').find('option:selected').val();

    // When ajax call for finding car(s) is done, populate carMatch div with html for matching cars
    // and show the 'Search again' button
    $.when(ajaxFindCar()).done(function (a1) {
        $('.carMatch').html(matchingCarsHtml);
        $('.btnSearchMore').show();
    })
})

// On click of the 'Search again' button, hide and show necessary elements, and set values for 
// necessary user inputs to nothing
$('.btnSearchMore').on('click', function () {
    $('.btnSearchMore').hide();
    $('#btnFindVehicles').show();
    $('.incomeBox').show();
    $('.vehicleDropDiv').show();
    $('.carMatch').empty();
    $('.year').val(''); 
    $('.make').val('');
    $('.model').val('');
    $('.income').val('');
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


// Populate html drop down for available vehicle years
function getVehicleYears(response) {
    yearHtml = `<select class="w3-select w3-border w3-animate-zoom year">`;
    yearHtml += `<option value="" disabled selected>Year</option>`;
    for (let i = 0; i < response.length; i++) {
        yearHtml += `<option class="w3-bar-item w3-button">${response[i].year}</option>`;
    }
    yearHtml += `</select>`;
}


// Call back end to get list of available makes for the selected year
function ajaxGetMakesForYear() {
    return $.ajax({
        type: "GET",
        url: `/api/GetMakesForYear/${year}`,
        datatype: "json",
        success: getMakesForYear,
    });
}

// Populate html drop down with available vehicle makes based on selected year
function getMakesForYear(response) {
    makeHtml = `<select class="w3-select w3-border w3-animate-zoom make">`;
    makeHtml += `<option value="" disabled selected>Make</option>`;
    for (let i = 0; i < response.length; i++) {
        makeHtml += `<option class="w3-bar-item w3-button">${response[i].make}</option>`;
    }
    makeHtml += `</select>`;
}

// Call back end to get list of available models for the selected vehicle make
function ajaxGetModelsForYearAndMake() {
    return $.ajax({
        type: "GET",
        url: `/api/GetModelsForYearAndMake/${year}&${make}`,
        datatype: "json",
        success: getModelsForYearAndMake,
    });
}

// Populate html drop down with available vehicle models based on selected make
function getModelsForYearAndMake(response) {
    modelHtml = `<select class="w3-select w3-border w3-animate-zoom model">`;
    modelHtml += `<option value="" disabled selected>Model</option>`;
    for (let i = 0; i < response.length; i++) {
        modelHtml += `<option class="w3-bar-item w3-button">${response[i].model}</option>`;
    }
    modelHtml += `</select>`;

}


// Call the back end to find car for user
function ajaxFindCar() {
    return $.ajax({
        type: "GET",
        url: `/api/FindCar/${year}&${make}&${model}&${income}`,
        datatype: "json",
        success: findCar,
    });
}

// Populate html for a car match. Also check if another dealer has the same 
// make and model for selected car. If so, display only the image of car, price, 
// mileage and stock number. If not, continue to the next dealer if there is one.
function findCar(response) {
    let prevDealer = '';
    matchingCarsHtml = `<h1>${year} / ${make} / ${model}</h1>`;

    for (let i = 0; i < response.length; i++) {
        if (response[i].name != prevDealer) {
            prevDealer = response[i].name;
            matchingCarsHtml += `<h2 class="dealerName">${response[i].name}<h2>`;
            matchingCarsHtml += response[i].address + "<br>";
            matchingCarsHtml += `${response[i].city}&nbsp;&bull;&nbsp${response[i].state}&nbsp;&bull;&nbsp${response[i].zip}<br>`;
            matchingCarsHtml += `${response[i].phone}`;
            if (response[i].phoneExt != null) {
                matchingCarsHtml += ` / ${response[i].phoneExt}<br>`;
            }
            else {
                matchingCarsHtml += "<br>";
            }
        }
        matchingCarsHtml += `<img src='${response[i].image}' width='200px;'/><br>`;
        matchingCarsHtml += `Price: $${response[i].price}<br>`;
        matchingCarsHtml += `Mileage: ${response[i].mileage}<br>`;
        matchingCarsHtml += `Stock Number: ${response[i].stock_number}<br>`;
        matchingCarsHtml += "<hr style='border: 2px solid blue'>";
    }
}


// Used to toggle the navbar on small screens 
function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}
