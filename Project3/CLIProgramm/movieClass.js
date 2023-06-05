class movies {
    id;
    title;
    year;
    directory;
    runtime;
    genre;
    constructor(id, title = "", year = 0, directory = "", runtime = 0, genre = "") {
        this.id = id;
        this.title = title;
        this.year = year;
        this.directory = directory;
        this.runtime = runtime;
        this.genre = genre;
    }
}

export default movies;