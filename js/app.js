

const customForm = document.getElementById('customForm');

// Add event listener to submit
customForm.addEventListener('submit', (e) => {
    //Prevents page reloading
    e.preventDefault(); 
    const searchQuery = this.searchArticle.value;

    if(searchQuery !== ''){
        getArticles(searchQuery);
        // Fire off toast
        Materialize.toast('Search submitted!', 1000, 'green');
        console.log('Search successful');
        // Clear search form
        document.getElementById('searchArticle').value = '';
    } else {
        
        // Fire off toast
        Materialize.toast('Please enter searh term', 3000, 'red');
        console.log('No search term submitted');
    }


});

// Using fetch data from Wikipedia API
function getArticles(searchQuery){
    const remoteUrlWithOrigin = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`
    fetch(remoteUrlWithOrigin)
    .then((res) => res.json())
    .then((data) => {
        
        let output = ``; 
        let searchResults = data.query.search;
        searchResults.forEach(function(item){

            let itemTitle = item.title;
            let itemSnippet = item.snippet;
            let itemid = item.pageid;
            let itemLink = `https://en.wikipedia.org/?curid=${item.pageid}`;
            
            output += `<a href="${itemLink}" target="_blank" class="collection-item black-text"><h5>${itemTitle}</h5><br><span class=" grey-text">${itemSnippet}<span>...</a>`;

            // // Add items to DOM
            
            //document.getElementById('output').innerHTML = `<a href="${itemLink}" target="_blank" class="collection-item">${itemTitle}</a>`;

            
        });

        document.getElementById('output').innerHTML = output;
        
    //    console.log(searchResults);
    })
    .catch(error => console.error('Error:', error));
}

