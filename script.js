
// -------- the constants that I am going to use 
const searchInput = document.getElementById('searchInput');
const searchButton = document.querySelector('.search');
const resultsDiv = document.getElementById('allResult');
const youtubeResults = document.getElementById('videoResult');
// ====================================


// -------- search button code 
searchButton.addEventListener('click', function() {
    const query = searchInput.value.trim();
    if (query === '') {
        alert('Please enter a topic to search for!');
        return;
    }
  
    searchResources(query);
    searchYoutube(query);
})

searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchButton.click();
    }

})
//==================================




// ----------- my library resource API => first API
function searchResources(query) {
    resultsDiv.textContent = 'Loading books...';


    const url = 'https://openlibrary.org/search.json?q=' + encodeURIComponent(query) + '&limit=8';
    fetch(url)
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Book search failed');
        }
        return response.json();
    })

    .then(function(data) {
        resultsDiv.innerHTML = '';

        if (!data.docs || data.docs.length ===  0) {
            resultsDiv.textContent = ' No books found.';
            return;
        }


        data.docs.forEach(function(book) {

            // the card of the books. 
            const card = document.createElement('div');               
            card.className = 'result-card';   
            
            // title of the books. 
            const title = document.createElement('h3' );
            title.textContent = book.title || 'Unknown title';

            // the result structure.  
            const author = book.author_name ? book.author_name[0] : 'Unknown author';
            const year = book.first_publish_year || 'Unknown';
            const info = document.createElement('p');

            // the unformation of the result. 
            info.textContent = 'Author: ' + author + ' | Year: ' + year;
            card.appendChild(title);
            card.appendChild(info);

            // the book key source 
            if (book.key) {
                const link = document.createElement('a' );
                link.href = 'https://openlibrary.org' + book.key;
                link.textContent = 'View Book';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                card.appendChild(link);
            }

            resultsDiv.appendChild(card);
            });
        })

        .catch(function(error) {
            resultsDiv.textContent = 'Unable to load books. Please try again.';
            console.log(error);


        });

    }
//-------------- My youtube API => Second API


const YOUTUBE_API_KEY =  'AIzaSyAfTNM0wQ_-X8nAFI0zmmuynTg00FhW8Kk';

function searchYoutube(query) {
    youtubeResults.textContent = 'Loading YouTube videos...';

    
    const url = 'https://www.googleapis.com/youtube/v3/search' + '?part=snippet&type=video&maxResults=6' + '&q=' + encodeURIComponent(query + ' educational tutorial') + '&key=' + encodeURIComponent(YOUTUBE_API_KEY);
    fetch(url)
    .then(function(response) {
            
        if (!response.ok) {             
            throw new Error('YouTube search failed');           
        }
        return response.json();
        
    })
    .then(function(data) {     
        youtubeResults.innerHTML = '';

            
        if (!data.items || data.items.length === 0) {              
            youtubeResults.textContent = 'No videos found.';               
            return;           
        }

            
        data.items.forEach(function(video) {
            // the card where the result will be    
            const card = document.createElement('div');                
            card.className = 'result-card';
            
            // the image snippet of the video result
            const image = document.createElement('img');              
            image.src = video.snippet.thumbnails.medium.url;               
            image.alt = video.snippet.title;               
            image.style.width = '100%';

            // the title of the result
            const title = document.createElement('h3');       
            title.textContent = video.snippet.title;


            // the video code
            const channel = document.createElement('p');
            channel.textContent ='Channel: ' + video.snippet.channelTitle;

            // the link of the youtube resource
            const link = document.createElement('a'); 
            link.href = 'https://www.youtube.com/watch?v=' + video.id.videoId;               
            link.textContent = 'Watch Video';       
            link.target = '_blank';              
            link.rel = 'noopener noreferrer';
               
            card.appendChild(image);               
            card.appendChild(title);                
            card.appendChild(channel);                
            card.appendChild(link)
                
            youtubeResults.appendChild(card);           
        });
        
    })

        
    .catch(function(error) {
        youtubeResults.textContent ='Unable to load videos. Check your API key.';
        console.log(error);
        
    });
}
//------------------------------------------------------

