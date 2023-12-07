const fs = require("fs");

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const rndInt = randomIntFromInterval(3000, 11000);

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
  "Jaipur",
  "Lucknow",
  "Guwahati",
  "Patna",
  "Chandigarh",
  "Ranchi",
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

const airways = [
  "Spice Jet",
  "Air Asia",
  "Indigo",
  "Jet Airways",
  "Jet Airways India",
  "Jet Airways (India)",
];
const datas = [];
for (let i = 0; i < 100; i++) {
  for (let x = 0; x < indiaStates.length; x++) {
    let otherStates = [...indiaStates];
    otherStates.splice(x, 1);
    for (let y = 0; y < otherStates.length; y++) {
      const first = indiaStates[x];
      const second = otherStates[y];
      const departureDate = new Date(
        Date.now() + randomIntFromInterval(0, 5) * 24 * 60 * 60 * 1000
      );
      const departureTime = new Date(
        new Date(departureDate.toDateString()).getTime() +
          randomIntFromInterval(1, 24) * 30 * 60 * 1000
      );
      const arrivalTime = new Date(
        departureTime.getTime() + randomIntFromInterval(1, 5) * 30 * 60 * 1000
      );
      const data = {
        name: airways[randomIntFromInterval(0, 5)],
        from: first,
        to: second,
        Departure: departureDate.toDateString(),
        depTime: departureTime.toTimeString().substr(0, 5),
        arrTime: arrivalTime.toTimeString().substr(0, 5),
        price: randomIntFromInterval(2000, 20000),
      };
      datas.push(data);
    }
  }
}

//save in file
fs.writeFileSync("data.json", JSON.stringify(datas));
