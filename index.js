const indiaStates = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Kochi",
  "Ahmedabad",
  "Goa",
  "Pune",
  // Some cities with both domestic and international airports
  "Jaipur",
  "Lucknow",
  "Guwahati",
  "Patna",
  "Chandigarh",
  "Ranchi",
  // More cities with airports
  "Varanasi",
  "Bhubaneswar",
  "Amritsar",
  "Thiruvananthapuram",
  "Indore",
  "Nagpur",
  "Visakhapatnam",
  "Coimbatore",
  "Dehradun",
];

const urlParams = new URLSearchParams(window.location.search);
let filteredFlightes = [];
let filteredOnwardFlightes = [];
let filteredReturnFlightes = [];

function selectTripType(tripType) {
  var i;
  var tabContents = document.getElementsByClassName("tabs");
  for (i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }

  var tabLinks = document.getElementsByClassName("booking-head-item");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove("active-trip");
  }

  document.getElementById(tripType).style.display = "flex";
  event.currentTarget.classList.add("active-trip");
}

function populateSelect() {
  const origins = document.getElementsByClassName("stateSelect-origin");
  const destinations = document.getElementsByClassName(
    "stateSelect-destination"
  );

  for (let i = 0; i < origins.length; i++) {
    indiaStates.forEach(function (state) {
      const option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      origins[i].appendChild(option);
    });
  }

  for (let i = 0; i < destinations.length; i++) {
    indiaStates.forEach(function (state) {
      const option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      destinations[i].appendChild(option);
    });
  }
}

populateSelect();

const origins = document.getElementsByClassName("stateSelect-origin");

for (let m = 0; m < origins.length; m++) {
  origins[m].addEventListener("change", function () {
    const originValue = this.value;
    const destinationSelects = document.getElementsByClassName(
      "stateSelect-destination"
    );

    for (let x = 0; x < destinationSelects.length; x++) {
      const destinationSelect = destinationSelects[x];
      for (let i = 0; i < destinationSelect.options.length; i++) {
        if (destinationSelect.options[i].value === originValue) {
          destinationSelect.options[i].disabled = true;
        } else {
          destinationSelect.options[i].disabled = false;
        }
      }
    }
  });
}

const destinations = document.getElementsByClassName("stateSelect-destination");

for (let d = 0; d < destinations.length; d++) {
  destinations[d].addEventListener("change", function () {
    const destinationValue = this.value;
    const originSelects = document.getElementsByClassName("stateSelect-origin");

    for (let x = 0; x < originSelects.length; x++) {
      const originSelect = originSelects[x];
      for (let i = 0; i < originSelect.options.length; i++) {
        if (originSelect.options[i].value === destinationValue) {
          originSelect.options[i].disabled = true;
        } else {
          originSelect.options[i].disabled = false;
        }
      }
    }
  });
}

// slider
const rangeInput = document.querySelectorAll(".range-input input");
const priceInput = document.querySelectorAll(".price-input input");
const progress = document.querySelector(".slider .progress");
const priceGap = 2000;
let minVal = 2000;
let maxVal = 20000;
rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    minVal = parseInt(rangeInput[0].value);
    maxVal = parseInt(rangeInput[1].value);
    setRangeFilterData(minVal, maxVal);
    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});

function getDataFromQueryParam() {
  const origin = urlParams.get("origin");
  const destination = urlParams.get("destination");
  const departure = urlParams.get("departure");
  const _return = urlParams.get("return");
  const tranvellers = urlParams.get("travelers");
  let slider = document.querySelector(".wrapper");
  const flightList = document.querySelector(".flight-list");

  if (origin) {
    slider.style.display = "block";
    flightList.style.marginTop = "2rem";
  }

  if (_return) {
    let main = `<div class="return-tables">
    <div>
    <div class="table-head"> ${origin} to ${destination} | ${new Date(
      departure
    ).toDateString()} </div>
    <table>
    <thead>
      <th> Airline </th>
      <th> Departure </th>
      <th> Arrival </th>
      <th> Price </th>
    </thead>
    <tbody>
    `;
    filteredOnwardFlightes = flights.filter((flight) => {
      if (
        flight.from === origin &&
        flight.to === destination &&
        new Date(flight.Departure).toDateString() ===
          new Date(departure).toDateString()
      )
        return true;
      return false;
    });
    filteredOnwardFlightes.forEach((flight) => {
      main += `<tr>
        <td>${flight.name}</td>
        <td>${flight.depTime}</td>
        <td>${flight.arrTime}</td>
        <td>₹ ${flight.price}</td>
      </tr>`;
    });

    main += `</tbody>
  </table>
  </div>
  <div>
  <div class="table-head"> ${destination} to ${origin} | ${new Date(
      _return
    ).toDateString()} </div>
  <table>
  <thead>
    <th> Airline </th>
    <th> Departure </th>
    <th> Arrival </th>
    <th> Price </th>
  </thead>
  <tbody>`;

    filteredReturnFlightes = flights.filter((flight) => {
      if (
        flight.from === destination &&
        flight.to === origin &&
        new Date(flight.Departure).toDateString() ===
          new Date(_return).toDateString()
      ) {
        return true;
      }
      return false;
    });
    filteredReturnFlightes.forEach((flight) => {
      main += `<tr>
        <td>${flight.name}</td>
        <td>${flight.depTime}</td>
        <td>${flight.arrTime}</td>
        <td>₹ ${flight.price}</td>
      </tr>`;
    });
    main += `</tbody>
  </table>
  </div>
  </div>`;
    flightList.innerHTML = main;
  } else {
    let table = `
    <div class="table-head" > ${origin} to ${destination} | ${new Date(
      departure
    ).toDateString()} </div>
    <table>
  <thead>
    <th> Airline </th>
    <th> Departure </th>
    <th> Arrival </th>
    <th> Price </th>
  </thead>
  <tbody>`;

    filteredFlightes = flights.filter((flight) => {
      if (
        flight.from.toLowerCase() === origin.toLowerCase() &&
        flight.to.toLowerCase() === destination.toLowerCase() &&
        new Date(flight.Departure).toDateString() ===
          new Date(departure).toDateString()
      )
        return true;
      return false;
    });
    filteredFlightes.forEach((flight) => {
      //&& flight.price >= minVal&& maxVal <= flight.price
      table += `<tr>
        <td>${flight.name}</td>
        <td>${flight.depTime}</td>
        <td>${flight.arrTime}</td>
        <td>₹ ${flight.price}</td>
      </tr>`;
    });
    table += `</tbody></table>
    `;
    flightList.innerHTML = table;
  }
}

getDataFromQueryParam();

function setRangeFilterData(min, max) {
  const flightList = document.querySelector(".flight-list");
  const origin = urlParams.get("origin");
  const destination = urlParams.get("destination");
  const departure = urlParams.get("departure");
  const _return = urlParams.get("return");

  if (_return) {
    let main = `<div class="return-tables">
    <div>
  <div class="table-head" > ${origin} to ${destination} | ${new Date(
      departure
    ).toDateString()} </div>
  <table>
  <thead>
    <th> Airline </th>
    <th> Departure </th>
    <th> Arrival </th>
    <th> Price </th>
  </thead>
  <tbody>
  `;
    let onwardFlights = filteredOnwardFlightes.filter((flight) => {
      if (flight.price >= min && flight.price <= max) {
        return true;
      }
      return false;
    });
    onwardFlights.forEach((flight) => {
      main += `<tr>
        <td>${flight.name}</td>
        <td>${flight.depTime}</td>
        <td>${flight.arrTime}</td>
        <td>₹ ${flight.price}</td>
      </tr>`;
    });
    main += `</tbody>
  </table>
  </div>
  <div>
  <div class="table-head" > ${destination} to ${origin} | ${new Date(
      _return
    ).toDateString()} </div>
  <table>
  <thead>
    <th> Airline </th>
    <th> Departure </th>
    <th> Arrival </th>
    <th> Price </th>
  </thead>
  <tbody>`;

    let returnFlights = filteredReturnFlightes.filter((flight) => {
      if (flight.price >= min && flight.price <= max) {
        return true;
      }
      return false;
    });
    returnFlights.forEach((flight) => {
      main += `<tr>
        <td>${flight.name}</td>
        <td>${flight.depTime}</td>
        <td>${flight.arrTime}</td>
        <td>₹ ${flight.price}</td>
      </tr>`;
    });
    main += `</tbody>
  </table>
  </div>`;
    flightList.innerHTML = main;
  } else {
    let table = `
    <div class="table-head" > ${origin} to ${destination} | ${new Date(
      departure
    ).toDateString()} </div>
    <table>
  <thead>
    <th> Airline </th>
    <th> Departure </th>
    <th> Arrival </th>
    <th> Price </th>
  </thead>
  <tbody>`;
    let _filteredFlightes = filteredFlightes.filter((flight) => {
      if (flight.price >= min && flight.price <= max) {
        return true;
      }
      return false;
    });
    _filteredFlightes.forEach((flight) => {
      table += `<tr>
        <td>${flight.name}</td>
        <td>${flight.depTime}</td>
        <td>${flight.arrTime}</td>
        <td>₹ ${flight.price}</td>
      </tr>`;
    });
    table += `</tbody></table>
    </div>`;
    flightList.innerHTML = table;
  }
}
