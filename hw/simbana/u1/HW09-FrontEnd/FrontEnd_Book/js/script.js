document.addEventListener('DOMContentLoaded', () => {
    const bookInput = document.getElementById('bookInput');
    const searchButton = document.getElementById('searchButton');
    const bookResults = document.getElementById('bookResults');

    const BASE_API_URL = 'https://openlibrary.org/search.json?';

    const clearResults = () => {
        bookResults.innerHTML = '';
    };

    const displayError = (message) => {
        clearResults();
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = `Error: ${message}`;
        bookResults.appendChild(errorMessage);
    };

    const displayBooks = (docs) => {
        clearResults();

        if (!docs || docs.length === 0) {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.classList.add('no-results');
            noResultsMessage.textContent = 'No books found for your search.';
            bookResults.appendChild(noResultsMessage);
            return;
        }

        docs.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');

            const image = document.createElement('img');
            image.src = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : 'https://via.placeholder.com/128x195?text=No+Cover';
            image.alt = `Portada de ${book.title || 'libro'}`;

            const info = document.createElement('div');
            info.classList.add('book-info');

            const title = document.createElement('h2');
            title.classList.add('title');
            title.textContent = book.title || 'Title not available';

            const authors = document.createElement('p');
            authors.classList.add('author');
            authors.textContent = `Author(s): ${book.author_name ? book.author_name.join(', ') : 'Unknown'}`;

            const publishedDate = document.createElement('p');
            publishedDate.classList.add('meta');
            publishedDate.textContent = `First published: ${book.first_publish_year || 'Unknown'}`;

            const viewLink = document.createElement('a');
            const bookId = book.key ? book.key.replace('/works/', '') : (book.isbn && book.isbn[0]);
            if (book.key) {
                viewLink.href = `https://openlibrary.org${book.key}`;
                viewLink.textContent = 'View on Open Library';
            } else if (book.isbn && book.isbn[0]) {
                viewLink.href = `https://openlibrary.org/isbn/${book.isbn[0]}`;
                viewLink.textContent = 'View on Open Library (ISBN)';
            } else {
                viewLink.href = '#';
                viewLink.textContent = 'View more';
                viewLink.style.opacity = '0.6';
                viewLink.style.cursor = 'not-allowed';
            }
            viewLink.target = '_blank';

            info.appendChild(title);
            info.appendChild(authors);
            info.appendChild(publishedDate);
            info.appendChild(viewLink);

            bookCard.appendChild(image);
            bookCard.appendChild(info);
            bookResults.appendChild(bookCard);
        });

    };

    const searchBooks = async () => {
        const searchTerm = bookInput.value.trim();
        if (!searchTerm) {
            displayError('Please enter a search term.');
            return;
        }

        clearResults();
        bookResults.innerHTML = '<p style="text-align: center;">Loading books...</p>';

        const encodedSearchTerm = encodeURIComponent(searchTerm);
        const requestUrl = `${BASE_API_URL}q=${encodedSearchTerm}&limit=20`;

        try {
            const response = await fetch(requestUrl);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            if (data && data.docs) {
                displayBooks(data.docs);
            } else {
                displayBooks([]);
            }
        } catch (error) {
            displayError(error.message);
        }
    };

    searchButton.addEventListener('click', searchBooks);
    bookInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchBooks();
        }
    });

    bookInput.value = 'The Hobbit';
    searchBooks();
});