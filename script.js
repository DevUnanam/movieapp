document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.carousel-card');

    if (carousel && prevBtn && nextBtn && cards.length > 0) {
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
    }

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

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!validateEmail(email)) {
                alert('Invalid email address.');
                return;
            }

            if (!validatePassword(password)) {
                alert('Password must be at least 8 characters long and contain at least one number and one letter.');
                return;
            }

            const user = {
                firstName,
                lastName,
                email,
                password
            };

            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful!');
            window.location.href = 'login.html';
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const users = JSON.parse(localStorage.getItem('users')) || [];

            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid email or password.');
            }
        });
    }

    const passwordToggle = document.querySelector('.password-toggle');
    if (passwordToggle) {
        passwordToggle.addEventListener('click', function() {
            const passwordField = document.getElementById('password');
            const passwordFieldType = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', passwordFieldType);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
}
