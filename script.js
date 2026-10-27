



const searchInput = document.getElementById('searchInput');
const searchButton = document.querySelector('.search');

const resultsDiv = document.getElementById('allResult');
const youtubeResults = document.getElementById('videoResult');


let loggedIn = false;

document.addEventListener('DOMContentLoaded', function (){
    const pages = document.querySelectorAll('#main > .page');
    const getStartedButton = document.querySelector('.getStarted');
    const returnButton = document.querySelector('.return');

    function showPage(index){
        pages.forEach(function (page, i){
            page.style.display = (i === index) ? 'block' : 'none';
        })
    }

    showPage(0);

    if (getStartedButton){
        getStartedButton.addEventListener('click', function (event){
            event.preventDefault();

            showPage(1)
        })
    }


    const loginForm = document.getElementById('logInform');
    const loginButton = document.querySelector('.login');

    if (loginForm && loginButton){
        loginButton.addEventListener('click ', function ( event) {
            event.preventDefault();
            loginForm.requestSubmit();
        });


        loginForm.addEventListener('submit', function ( event){
            event.preventDefault();

            const name = getElementById('username')
            const password = getElementById('password')

            if (name === '' || password === '') {
                alert('please enter your email and password');
                return;
            }

            loggedIn = true;

            showPage(2);
            alert('Welcome to ResocApp, ' + username + '!');
        })

    }

    


    if (returnButton) {
        returnButton.addEventListener('click', function (event) {
            event.preventDefault();
            showPage(0);
        });
    }

});


searchButton.addEventListener('click', function() {
    if (!loggedIn) {
        alert('Please log in first!');
        showPage(1);
        return;
    }

    const query = searchInput.value.trim();

    if (query === '') {
        alert('Please enter a topic to search for!');
        return;
    }

   
    searchResources(query);
    searchYoutube(query);
});



searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchButton.click();


    }
});


// ===== 6. Search for books using Open Library =====

function searchResources(query) {
    resultsDiv.textContent = 'Loading books...';

    const url =
        'https://openlibrary.org/search.json?q=' +
        encodeURIComponent(query) +
        '&limit=8';

    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Book search failed');
            }

            return response.json();
        })

        .then(function(data) {
            resultsDiv.innerHTML = '';

            if (!data.docs || data.docs.length === 0) {
                resultsDiv.textContent = 'No books found.';
                return;
            }

            data.docs.forEach(function(book) {
                const card = document.createElement('div');
                card.className = 'result-card';

                const title = document.createElement('h3');
                title.textContent = book.title || 'Unknown title';

                const author = book.author_name
                    ? book.author_name[0]
                    : 'Unknown author';

                const year = book.first_publish_year || 'Unknown';

                const info = document.createElement('p');
                info.textContent =
                    'Author: ' + author + ' | Year: ' + year;

                card.appendChild(title);
                card.appendChild(info);

                if (book.key) {
                    const link = document.createElement('a');

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
            resultsDiv.textContent =
                'Unable to load books. Please try again.';

            console.log(error);
        });
}


// ===== 7. Search for YouTube videos =====

const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY';


function searchYoutube(query) {
    youtubeResults.textContent = 'Loading YouTube videos...';

    const url =
        'https://www.googleapis.com/youtube/v3/search' +
        '?part=snippet&type=video&maxResults=6' +
        '&q=' + encodeURIComponent(query + ' educational tutorial') +
        '&key=' + encodeURIComponent(YOUTUBE_API_KEY);

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
                const card = document.createElement('div');
                card.className = 'result-card';

                const image = document.createElement('img');
                image.src = video.snippet.thumbnails.medium.url;
                image.alt = video.snippet.title;
                image.style.width = '100%';

                const title = document.createElement('h3');
                title.textContent = video.snippet.title;

                const channel = document.createElement('p');
                channel.textContent =
                    'Channel: ' + video.snippet.channelTitle;

                const link = document.createElement('a');
                link.href =
                    'https://www.youtube.com/watch?v=' +
                    video.id.videoId;

                link.textContent = 'Watch Video';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';

                card.appendChild(image);
                card.appendChild(title);
                card.appendChild(channel);
                card.appendChild(link);

                youtubeResults.appendChild(card);
            });
        })

        .catch(function(error) {
            youtubeResults.textContent =
                'Unable to load videos. Check your API key.';

            console.log(error);
        });
}


// ===== 8. Return button =====

returnButton.addEventListener('click', function() {
    showPage(0);
});



