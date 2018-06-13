

const customForm = document.getElementById('customForm');

// Add event listener to submit
customForm.addEventListener('submit', (e) => {
    //Prevents page reloading
    e.preventDefault(); 
    // Assign inoput to variable
    const searchQuery = this.searchArticle.value;
    // If search query entered
    if(searchQuery !== ''){
        // Call fetch function
        getArticles(searchQuery);
        // Fire off toast
        Materialize.toast('Search submitted!', 1000, 'green');
        // Clear search form
        document.getElementById('searchArticle').value = '';
    } else {
        // Fire off toast
        Materialize.toast('Please enter searh term', 3000, 'red');
    }
});

// Using fetch data from Wikipedia API
function getArticles(searchQuery){
    const remoteUrlWithOrigin = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`
    fetch(remoteUrlWithOrigin)
    .then((res) => res.json())
    .then((data) => {
        // Instantiate output as empty sting literal
        let output = ``; 
        // Assign data object to variable 
        let searchResults = data.query.search;
        // Loop through assigned data object
        searchResults.forEach(function(item){
            // Set each value to variable 
            let itemTitle = item.title;
            let itemSnippet = item.snippet;
            let itemid = item.pageid;
            let itemLink = `https://en.wikipedia.org/?curid=${itemid}`;
            // Create elements for each item (+= appends)
            output += `<a href="${itemLink}" target="_blank" class="collection-item black-text"><h5>${itemTitle}</h5><br><span class=" grey-text">${itemSnippet}<span>...</a>`;
        });
        // Add items to dom
        document.getElementById('output').innerHTML = output;
    })
    // Console log error if fetch fails
    .catch(error => console.error('Error:', error));
}

