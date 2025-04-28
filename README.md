# movies
The Movies API is a production-ready RESTful API built with Node.js and SQLite to manage movie and rating data. It supports functionality to fetch all movies, get movie details, and paginate results. The project follows modular design principles and adheres to best practices for scalability and maintainability.

Features
List all movies with pagination.

Get detailed information about a specific movie.

Built-in error handling and edge case handling.

Fully tested with unit and integration tests.

Prerequisites
Ensure you have the following installed:

Node.js (version 14+)

npm (comes with Node.js)

SQLite3 CLI (optional for database exploration)

Installation
Clone the repository:

bash
git clone https://github.com/adityaranuva/movies.git

Navigate to the project directory:
bash
cd movies
Install dependencies:

bash
npm install
Ensure the following files exist in the db/ folder:

movies.db (SQLite database for movies)

ratings.db (SQLite database for ratings)


Run in Development Mode
Start the server with hot reloading:

bash
npm run dev
Run in Production Mode
Start the server:

bash
npm start
The API will be available at http://localhost:3000.

API Endpoints
1. List All Movies
URL: GET /movies

Query Parameters:

page: Page number for pagination (default: 1).

Response:

json
[
  {
    "imdbId": "tt1234567",
    "title": "Sample Movie",
    "genres": "Action, Comedy",
    "releaseDate": "2023-04-01",
    "budget": "$50,000,000"
  }
]
2. Movie Details
URL: GET /movies/:id

Path Parameter:

id: IMDb ID of the movie.

Response:

json
{
  "imdbId": "tt1234567",
  "title": "Sample Movie",
  "description": "Movie description here.",
  "releaseDate": "2023-04-01",
  "budget": "$50,000,000",
  "runtime": 120,
  "genres": "Action, Comedy",
  "original_language": "en",
  "production_companies": "Sample Studio",
  "average_rating": 4.5
}
3. Error Handling
Invalid query or missing parameters will return an appropriate error message:

json
{
  "error": "Invalid page parameter."
}
Testing
Run Automated Tests
Ensure dependencies are installed.

Run the test suite:

bash
npm test
Manual Testing
Tools:
Use Postman or cURL for sending HTTP requests.

Use the SQLite CLI to query the databases directly.

Steps:
List Movies:

Request: GET /movies?page=1

Expected Response:

HTTP Status: 200 OK

JSON array of movies (max 50 per page).

Edge Cases:

Invalid page parameter: ?page=abc (should return 400).

Movie Details:

Request: GET /movies/:id (e.g., /movies/tt1234567).

Expected Response:

HTTP Status: 200 OK

JSON object with movie details.

Edge Cases:

Invalid id: /movies/invalidId (should return 404).


