// Business Logic for Ticket ---------
function Ticket() {
    this.movies = {};
    this.currentId = 0;
}

Ticket.prototype.addMovie = function (movie) {
    movie.id = this.assignId();
    this.movies[movie.id] = movie;
};

Ticket.prototype.assignId = function () {
    this.currentId += 1;
    return this.currentId;
};

Ticket.prototype.findMovie = function (id) {
    if (this.movies[id] != undefined) {
        return this.movies[id];
    }
    return false;
};

Ticket.prototype.deleteMovie = function (id) {
    if (this.movies[id] === undefined) {
        return false;
    }
    delete this.movies[id];
    return true;
};

// Business Logic for Contacts ---------
function Movie(movieName, movieSeat, movieTime) {
    this.movieName = movieName;
    this.movieSeat = movieSeat;
    this.movieTime = movieTime;
}

Movie.prototype.movieDetails = function () {
    return this.movieName + " " + this.movieSeat + " " + this.movieTime;
    ;
};





// User Interface Logic ---------
let ticket = new Ticket();
function displayMovieDetails(ticketToDisplay) {
    let movieList = $("ol#movies");
    let htmlForMovieInfo = "";
    Object.keys(ticketToDisplay.movies).forEach(function (key) {
        const movie = ticketToDisplay.findMovie(key);
        htmlForMovieInfo += "<li id=" + movie.id + ">" + movie.movieName + " " + movie.movieSeat + " " + movie.movieTime + "</li>";
    });
    console.log(htmlForMovieInfo);

    movieList.html(htmlForMovieInfo);
}

function showMovie(movieId) {
    const movie = ticket.findMovie(movieId);
    $("#show-movie").show();
    $(".m-name").text(movie.movieName);
    $(".m-seat").html(movie.movieSeat);
    $(".m-time").html(movie.movieTime);
    let buttons = $("#buttons");
    buttons.empty();
    buttons.append("<button class='deleteButton' id=" + " " + movie.id + ">Delete</button>");
    if (movie.movieName === "thor") {
        $(".m-price").html("#3000");
    } else if (movie.movieName === "Doctor Strange") {
        $(".m-price").html("#2500");
    } else if (movie.movieName === "Captain Marvel") {
        $(".m-price").html("#1000");
    } else if (movie.movieName === "Avenger") {
        $(".m-price").html("#1500");
    }
    else {
        $(".m-price").html("#0000");
    }
}

function attachContactListeners() {
    $("ol#movies").on("click", "li", function () {
        showMovie(this.id);
    });
    $("#buttons").on("click", ".deleteButton", function () {
        ticket.deleteMovie(this.id);
        $("#show-movie").hide();
        displayMovieDetails(ticket);
    });
    $(".s-movie").on("click", function () {
        window.location.href = "ticket.html"
    });
}

$(document).ready(function () {
    attachContactListeners();
    $("form").submit(function (event) {
        event.preventDefault();
        const inputtedFirstName = $("select#m-name").val();
        const inputtedLastName = parseInt($("select#m-seat").val());
        const inputtedPhoneNumber = $("select#m-time").val();
        console.log(inputtedFirstName);
        $("select#m-name").val("");
        $("select#m-seat").val("");
        $("select#m-time").val("");
        let newMovie = new Movie(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
        ticket.addMovie(newMovie);
        displayMovieDetails(ticket);
        console.log(ticket.movies);



        if (inputtedFirstName === "thor") {
            $("#table").text("<li >" + inputtedFirstName + " " + inputtedLastName + " " + inputtedPhoneNumber + "#3000" + "</li>");
        } else if (inputtedFirstName === "Doctor Strange") {
            $("#table").html("<li >" + inputtedFirstName + " " + inputtedLastName + " " + inputtedPhoneNumber + "#2500" + "</li>");
        } else if (inputtedFirstName === "Avenger") {
            $("#table").html("<li >" + inputtedFirstName + " " + inputtedLastName + " " + inputtedPhoneNumber + "#4000" + "</li>");
        } else if (inputtedFirstName === "Captain Marvel") {
            $("#table").html("<li >" + inputtedFirstName + " " + inputtedLastName + " " + inputtedPhoneNumber + "#1500" + "</li>");
        } else {

        }

    });
});