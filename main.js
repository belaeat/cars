"use strict";
/* getting the elements from the HTML */
const addCarForm = document.querySelector("#addCar");
const searchCarForm = document.querySelector("#searchCar");

/* the car array should be empty by default and when user make any input it will be added to this array. */

const cars = [];

/* created Car class with constructor */
class Car {
  constructor(license, maker, model, owner, price, color) {
    this.license = license;
    this.maker = maker;
    this.model = model;
    this.owner = owner;
    this.price = parseFloat(price);
    this.color = color;
  }
}

/* this function takes input value from the inputs and deliver the data to the Car class*/
const addCar = (e) => {
  e.preventDefault(); // this is used to stop auto-reload of the webpage

  const license = document.querySelector("#license").value.trim();
  const maker = document.querySelector("#maker").value.trim();
  const model = document.querySelector("#model").value.trim();
  const owner = document.querySelector("#owner").value.trim();
  const price = document.querySelector("#price").value.trim();
  const color = document.querySelector("#color").value;

  const newCar = new Car(license, maker, model, owner, price, color);

  /* this funtion reset the form and make it empty */
  addCarForm.reset();

  /* pushing the input value form the form and push it to the array! */
  cars.push(newCar);

  /* calling the displayTable function to make visible the car details */
  displayTable();
};

/* displayTable function take the HTML element and manipulate the HTML data with JS and insert the data to the carsTable */
const displayTable = () => {
  const table = document.querySelector("#carsTable");

  table.innerHTML = table.rows[0].innerHTML;

  cars.forEach((car) => {
    const row = table.insertRow(-1);

    Object.values(car).forEach((text) => {
      const cell = row.insertCell(-1);
      cell.textContent = text;
    });
  });
};

/* searchCar function taking the input value from the search input and then apply find method to match the data from the carstable and inserting data to the HTML element with JS and showing it to the UI */
const searchCar = (e) => {
  e.preventDefault(); // this is used to stop auto-reload of the webpage
  const searchInput = document.querySelector("#search").value;
  const foundCar = cars.find(
    (car) => car.license.toLowerCase() === searchInput.toLowerCase()
  );

  const searchResult = document.querySelector("#searchResult");
  if (foundCar) {
    searchResult.innerHTML = `
          <p>Maker: ${foundCar.maker}</p>
          <p>Model: ${foundCar.model}</p>
          <p>Owner: ${foundCar.owner}</p>
          <p>Price: ${foundCar.price.toFixed(2)}€</p>
        `;
  } else {
    searchResult.innerHTML =
      "<p>No car found with the given license plate.</p>";
  }
};

/* adding addEventListener to listen the events that user doing! */
addCarForm.addEventListener("submit", addCar);
searchCarForm.addEventListener("submit", searchCar);
