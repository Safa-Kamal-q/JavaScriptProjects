const apiUrl = 'https://type.fit/api/quotes';//I use this api instead of the api that you give because the last dose not work

async function fetchData(url) {
    try {
        const response = await fetch(url);
        return response.json();

    } catch (error) {
        throw Error("Failed to fetch data");
    }
}

function filterQuotes(quotes, searchText) {
    return quotes.filter(quote => quote.text.toLowerCase().includes(searchText.toLowerCase()));
}

function displayQuotes(quotes) {
    const quoteList = document.getElementById("quoteList");
    quoteList.innerHTML = '';
    quotes.forEach(quote => {
        const listItem = document.createElement('li');
        listItem.textContent = quote.text;
        quoteList.appendChild(listItem);
    });
}

fetchData(apiUrl)
    .then(data => {

        displayQuotes(data);

        const searchInput = document.getElementById('searchInput');

        searchInput.addEventListener('input', () => {
            const searchText = searchInput.value;
            const filteredQuotes = filterQuotes(data, searchText);
            displayQuotes(filteredQuotes);
        });
    })
    .catch(error => {
        console.log(error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "Failed to get Data, try again";
        document.body.append(errorMessage);
    });
