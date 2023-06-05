import { writeDataToFile } from './fileHandler.js'
//I created a new json file to store data because the data in this api is differ from what you required us to add as attribute for movie


async function fetchDataFromAPI() {
  fetch('https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies', { method: 'GET' })
    .then(async response => {
      const data = await response.json();
      writeDataToFile('dataFromAPI.json', data);
      console.log("Data added successfully to json file")
    })
    .catch(error => {
      console.log("failed to get data");
      console.log(error);
    })
}

fetchDataFromAPI();
