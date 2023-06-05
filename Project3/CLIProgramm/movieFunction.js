
import prompt from 'prompt-sync';
const input = prompt();
import movies from './movieClass.js';
import { readDataFromFile, writeDataToFile } from './fileHandler.js'
import { main } from './mainMovie.js';

function displayData(movieArrayToRead) {
    movieArrayToRead.forEach(element => {
        console.log(`Movie information ==> id: ${element.id}, title: ${element.title},  release year: ${element.year}, director: ${element.director}, runTime: ${element.runtime}, genre: ${element.genre}
        `);
    });
}

export async function displayMovies() {
    try {
        const redingMovies = await readDataFromFile('movieData.json')
        console.log("Movies Catalog: ")
        console.log("************************************")
        displayData(redingMovies);
        console.log("************************************");
    } catch (error) {
        console.log("An error happened while reading data")
        console.log(error);
    }
    main();
}

function readDataFromUser() {
    const title = input("Enter movie Title: ");
    const releaseYear = input("Enter release year for the movie: ");
    const directory = input("Enter movie directory: ");
    const runtime = input("Enter runtime for the movie: ");
    const genre = input("Enter movie genre: ");
    return [title, releaseYear, directory, runtime, genre]
}//to avoid repeating same code

export async function addMovie() {
    console.log("you want to add a new movie please tell us its information as required ")
    try {
        const redingMovies = await readDataFromFile('movieData.json');
        let movieId;
        do {
            movieId = input("Enter movie ID: ");
            const isIdUnique = redingMovies.every((m) => m.id !== movieId)
            if (!isIdUnique) {
                console.log("Movie ID already exists. Please provide a unique ID.");
            } else break;
        } while (true);
        const [title, releaseYear, directory, runtime, genre] = readDataFromUser()
        const newMovie = new movies(movieId, title, releaseYear, directory, runtime, genre);
        redingMovies.push(newMovie);
        await writeDataToFile('movieData.json', redingMovies);
        console.log('Movie added successfully!');
    } catch (error) {
        console.log("An error happened while adding new movie")
        console.log(error);
    }
    main();
}

export async function updateMovie() {
    try {
        const idToUpdate = input("Enter movies's id that you want to update: ")
        const readingMovies = await readDataFromFile('movieData.json');
        const movieToUpdate = readingMovies.find((i) => i.id === idToUpdate)
        if (movieToUpdate) {
            console.log("You want to edit a movie information,\nPlease enter the new information that you want to modify and rewrite the same values ​​for the attributes that you do not want to modify")
            let movieId;
            do {
                movieId = input("Enter movie id: ");
                const isIdUnique = readingMovies.every((m) => m.id !== movieId)
                if (!isIdUnique && movieToUpdate.id !== movieId) {
                    console.log("Movie ID already exists. Please provide a unique ID.")
                } else break;
            } while (true)
            const [title, releaseYear, directory, runtime, genre] = readDataFromUser()
            const updatedMovie = new movies(movieId, title, releaseYear, directory, runtime, genre);
            Object.assign(movieToUpdate, updatedMovie);
            await writeDataToFile('movieData.json', readingMovies);
            console.log('Movie updated successfully!');
        } else {
            console.log("The movie that you want to update not found");
        }
    } catch (error) {
        console.log("An error has happened while updating movie's info")
        console.log(error);
    }
    main();
}

export async function deleteMovie() {
    try {
        const idToDelete = input("Enter movies's id that you want to delete: ")
        const readingMovies = await readDataFromFile('movieData.json');
        const movieToDelete = readingMovies.find((i) => i.id === idToDelete)
        if (movieToDelete) {
            const remainMovies = readingMovies.filter((m) => m.id !== idToDelete)
            await writeDataToFile('movieData.json', remainMovies);
            console.log("Movie has deleted successfully");
        } else {
            console.log("Id movie doesn't exist")
        }
    } catch (error) {
        console.log("An error has happened while deleting movie")
    }
    main();
}

export async function searchMovies() {//this function will return if the search Term include in a specific criterion
    let criteriaToSearch
    do {
        criteriaToSearch = input('Enter the criterion that you want to search by using it, the optional criteria: title, year, directory, genre, please chose one: ')
        if (criteriaToSearch !== "title" && criteriaToSearch !== "year" && criteriaToSearch !== "directory" && criteriaToSearch !== "genre") {
            console.log("You have entered invalid criteria, please try again")
        } else break;
    } while (true)
    const searchTermTInput = input("Enter the search term: ");
    const searchTerm = searchTermTInput.toLowerCase().trim();
    try {
        const movie = await readDataFromFile('movieData.json');
        const searchResult = movie.filter((movie) => {
            if (criteriaToSearch.trim().toLowerCase() === "title") {
                const titleMatch = movie.title.toLowerCase().includes(searchTerm);
                return titleMatch
            } else if (criteriaToSearch.trim().toLowerCase() === "year") {
                const yearMatch = movie.year.toLowerCase().includes(searchTerm);
                return yearMatch;
            } else if (criteriaToSearch.trim().toLowerCase() === "directory") {
                const directorMatch = movie.director.toLowerCase().includes(searchTerm);
                return directorMatch;
            } else {
                const genreMatch = movie.genre.toLowerCase().includes(searchTerm);
                return genreMatch;
            }
        });
        if (searchResult.length === 0) {
            console.log('No movies found matching the search term.');
        } else {
            console.log('Search Result:');
            displayData(searchResult);
        }
    } catch (err) {
        console.error('Error searching movies:', err);
    }
    main();
}

export async function filterMovie() {
    let criteriaToFilter
    do {
        criteriaToFilter = input('Enter the criterion that you want to filter movie by using it, the optional criteria: genre, year, please chose one: ')
        if (criteriaToFilter !== "genre" && criteriaToFilter !== "year") {
            console.log("You have entered invalid criteria, please try again")
        } else break;
    } while (true);
    const criterionTermInput = input("Enter the search term: ");
    const criterionTerm = criterionTermInput.toLowerCase().trim();
    try {
        const movie = await readDataFromFile('movieData.json');
        const searchResult = movie.filter((movie) => {
            if (criteriaToFilter.trim().toLowerCase() === "genre") {
                return movie.genre === criterionTerm
            } else {
                return movie.year === criterionTerm
            }
        });
        if (searchResult.length === 0) {
            console.log('No movies found matching the filter criterion.');
        } else {
            console.log('Search Result:');
            displayData(searchResult);
        }
    } catch (error) {
        console.log("An error happened while filtering movie")
        console.log(error);
    }
    main();
}