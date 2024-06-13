document.addEventListener('DOMContentLoaded', () => {
    // Your existing code here...
    
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.carousel-card');

    let currentIndex = 0;
    const totalCards = cards.length;

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
});

function searchMovies(event) {
    event.preventDefault();
    const apiKey = 'b0f9a07b3aa449d86c954798a13896a2';
    const searchQuery = document.querySelector('.search-input').value;
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const searchResults = document.querySelector('.search-results');
            searchResults.innerHTML = '';

            data.results.forEach(movie => {
                const title = movie.title;
                const releaseDate = movie.release_date;
                const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'img/pic3.png';

                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');
                movieElement.innerHTML = `
                    <img src="${posterPath}" alt="${title}">
                    <div class="movie-details">
                        <h2>${title}</h2>
                        <p>Release Date: ${releaseDate}</p>
                    </div>
                `;
                searchResults.appendChild(movieElement);
            });
        })
        .catch(error => console.log('Error fetching data:', error));
}

function autocompleteMovies() {
    const apiKey = 'b0f9a07b3aa449d86c954798a13896a2';
    const searchQuery = document.querySelector('.search-input').value;
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const autocompleteResults = document.querySelector('.autocomplete-results');
            autocompleteResults.innerHTML = '';

            data.results.forEach(movie => {
                const title = movie.title;

                const resultElement = document.createElement('div');
                resultElement.classList.add('autocomplete-result');
                resultElement.textContent = title;
                resultElement.addEventListener('click', () => {
                    document.querySelector('.search-input').value = title;
                    autocompleteResults.innerHTML = '';
                });
                autocompleteResults.appendChild(resultElement);
            });
        })
        .catch(error => console.log('Error fetching data:', error));
}

// Event listener for signup form
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!validateEmail(email)) {
            console.log('Invalid email format');
            // Display error message to the user
            return;
        }

        // Save user data to local storage
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        console.log('User signed up:', userData);
    });
});

// Event listener for login form
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const recaptchaResponse = grecaptcha.getResponse();

        if (!recaptchaResponse) {
            console.log('Please complete the reCAPTCHA');
            return;
        }

        // Simulate reCAPTCHA verification
        setTimeout(() => {
            const success = Math.random() > 0.5; // Simulate a 50% chance of success
            if (success) {
                // Retrieve user data from local storage
                const userData = JSON.parse(localStorage.getItem('userData'));

                if (userData && userData.email === email && userData.password === password) {
                    console.log('User logged in:', userData);
                    // Redirect or perform further actions after successful login
                } else {
                    console.log('Invalid email or password');
                    // Display error message to the user
                }
            } else {
                console.log('reCAPTCHA verification failed');
            }
        }, 1000);
    });
});
