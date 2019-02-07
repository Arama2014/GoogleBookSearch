var data;
var authors = [];
var imageLinks = [];
var publishers = [];
var titles = [];
var titlesDisplay = [];
var authorsDisplay = [];
var imageLinksDisplay = []
var publishersDisplay = []
var infoLinks = []

function start() {

    //Initializes the Javascript client library 

    gapi.client.init({
        'apiKey': 'AIzaSyCgFZf1U1tOvHM1_zaviPr_hbjEoRZMYeI'


    }).then(function() {

        //Initialize and make the API request
        return gapi.client.request({
            'path': 'https://www.googleapis.com/books/v1/volumes?q=' + searchTarget + '&maxResults=40&startIndex=' + searchIndex // 
        })

    }).then(function(response) {



        resetBookDataArrays();

        parseBookData(response.result);

        displayBookData();




        //console.log(response.result);
    }, function(reason) {
        console.log('Error:' + reason.result.error.message);
    });
};
// load the javascriptclient library.

var searchTarget;
var searchIndex;

function startSearch() {
    searchIndex = 0;
    var error = document.getElementById("Error");
    error.innerHTML = ""; // clear out old error messages not pertinent for a new search 
    document.getElementById('SearchResults').innerHTML = ""; // search results acts as container we can clear easily before a new search
    searchTarget = document.getElementById('mySearch').value; //retrives the value of user input stores into searchTarget variable
    document.getElementById('searchtext').innerHTML = "Search results for '" + searchTarget + "'"; //displays what user is searching for
    gapi.load('client', start); //calls gapi function which calls start function

}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log("bottom");
        gapi.load('client', start); //calls gapi function which calls start function
    }
};



function resetBookDataArrays() {

    //clearing out arrays so they can hold new search information
    authors = [];
    imageLinks = [];
    publishers = [];
    titles = [];
    titlesDisplay = [];
    authorsDisplay = [];
    imageLinksDisplay = []
    publishersDisplay = []
    infoLinks = []
    infoLinksDisplay = []


}


function parseBookData(data) {
    if (!data.items) {
        var error = document.getElementById("Error");
        error.innerHTML = "No Results";
    } else {
        for (i = 0; i < data.items.length; i++) {
            // grabbing each property from data.items json and pushing it to it's respective array
            titles.push(data.items[i].volumeInfo.title);

            if (!data.items[i].volumeInfo.authors) {
                authors.push("n/a")
            } else {
                authors.push(data.items[i].volumeInfo.authors);
            }
            if (!data.items[i].volumeInfo.imageLinks) // 
            {
                imageLinks.push("404.png")
            } else {
                imageLinks.push(data.items[i].volumeInfo.imageLinks.thumbnail);
            }

            if (!data.items[i].volumeInfo.publisher) {
                publishers.push("n/a")
            } else {
                publishers.push(data.items[i].volumeInfo.publisher);
            }

            infoLinks.push(data.items[i].volumeInfo.infoLink);
        }
    }
}

function displayBookData() {
    var numberOfSearchResults = titles.length;
    for (var i = 0; i < numberOfSearchResults; i++) {
        //dynamically inserts html to contain search results 
        document.getElementById('SearchResults').innerHTML += "<div class='image'><img class ='imageLinksDisplay'></img></div><div class = 'text'><p class ='titlesDisplay'></p><p class ='authorsDisplay'> </p><p class ='publishersDisplay'></p><a class = 'infoLinksDisplay'  > <button>  Read More</button></a></div><hr /></div>";
        titlesDisplay = document.getElementsByClassName('titlesDisplay')
        titlesDisplay[searchIndex].innerHTML = titles[i];

        authorsDisplay = document.getElementsByClassName('authorsDisplay')
        authorsDisplay[searchIndex].innerHTML = 'by: ' + authors[i];

        publishersDisplay = document.getElementsByClassName('publishersDisplay')
        publishersDisplay[searchIndex].innerHTML = 'published by: ' + publishers[i];

        imageLinksDisplay = document.getElementsByClassName('imageLinksDisplay')
        imageLinksDisplay[searchIndex].src = imageLinks[i];

        infoLinksDisplay = document.getElementsByClassName('infoLinksDisplay')
        infoLinksDisplay[searchIndex].href = infoLinks[i];
        searchIndex++;
    }
}