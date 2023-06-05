
import prompt from 'prompt-sync';
const input = prompt();
import { displayMovies, addMovie, updateMovie, deleteMovie, searchMovies, filterMovie } from './movieFunction.js';

async function showMenu() {
    console.log(
        `
        welcome to movie catalog
        ******************************
        1. Display Movie Catalog
        2. Add New Movie
        3. Update Movie Details
        4. Delete Movie
        5. Search for movies
        6. Filter movie
        7. Exit
        ******************************
        What\'s your choice?'
        `)
}

export async function main() {
    showMenu();
    const choice = input("Enter Choice Number:");
    switch (choice) {
        case "1":
            console.log(`You have chosen to display movies\n________________________________________`)
            await displayMovies();
            break;
        case "2":
            console.log(`You have chosen to add a movie\n________________________________________`)
            await addMovie();
            break;
        case "3":
            console.log(`You have chosen to update a movie\n________________________________________`)
            await updateMovie();
            break;
        case "4":
            console.log(`You have chosen to delete a movie\n________________________________________`)
            await deleteMovie();
            break;
        case "5":
            console.log(`\nYou have chosen to search for a movie\n________________________________________`)
            await searchMovies();
            break;
        case "6":
            console.log(`You have chosen to filter movies\n________________________________________`)
            filterMovie();
            break;
        case "7":
            console.log('Exiting Movie Catalog CLI Application.');
            process.exit(0);
        default:
            console.log("\n-----------------------------------------");
            console.log("invalid choice,Please look carefully at menu and try again");
            console.log("-----------------------------------------");
            main();
    }
}






