# ft_transcendence - A Social Gaming Platform (42 Common Core Final Project)


Transcendence is a web-based social gaming platform developed as the final project for the 42 Common Core curriculum.  It is built using Django, Channels (for WebSockets), and PostgreSQL.  The platform allows users to register, create profiles, manage friends, play classic arcade games (Pong and Tic-Tac-Toe), and participate in tournaments. The project is containerized using Docker and Docker Compose for easy deployment and development.  The frontend utilizes HTML, CSS (with a well-structured, component-based approach), and JavaScript (including libraries like Three.js for game rendering and Chart.js for data visualization).

**This project demonstrates proficiency in:**

*   Full-Stack Web Development (Django, Python)
*   Database Management (PostgreSQL)
*   Real-time Communication (WebSockets, Django Channels)
*   Containerization (Docker, Docker Compose)
*   Frontend Development (HTML, CSS, JavaScript, Three.js)
*   API Design and Implementation
*   Version Control (Git, GitHub)

**Key Features (Implemented):**

*   **User Authentication:**  Supports both standard username/password registration and login, as well as OAuth integration with 42 (using their API).
*   **Profile Management:**  Users can create and edit profiles, including setting aliases, avatars, and personal information.
*   **Friend System:**  Users can send, accept, and manage friend requests.
*   **Real-time Communication:**  WebSockets (via Django Channels) enable real-time features like in-game communication, and notifications.
*   **Games:**
    *   **Pong:** A classic 2D Pong game implemented using Three.js for 3D rendering.
    *   **Tic-Tac-Toe:**  A classic Tic-Tac-Toe game, also using Three.js.
*   **Leaderboards:**  Displays player rankings for each game.
*   **Responsive Design:**  The web application is designed to be responsive and work well on different screen sizes.
*   **Dockerized:**  The entire application is containerized, making setup and deployment straightforward.
*   **Notifications:** The web application sends notification for friend request and response.


## Setup and Installation

### Prerequisites

*   **Docker:**  [Install Docker](https://docs.docker.com/get-docker/)
*   **Docker Compose:** [Install Docker Compose](https://docs.docker.com/compose/install/)

### Steps

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/tham-le/ft_transcendence.git
    cd tham-le-ft_transcendence
    ```

2.  **Create a `.env` File:**

    Create a `.env` file in the root directory of the project (`tham-le-ft_transcendence/.env`) with the following content.  **Fill in the actual values!  Do NOT commit this file to your repository.**

    ```
    DJANGO_SUPERUSER_USERNAME=<your_superuser_username>
    DJANGO_SUPERUSER_PASSWORD=<your_superuser_password>
    DJANGO_SUPERUSER_EMAIL=<your_superuser_email>
    DOMAIN=<your_domain_name>  # e.g., example.com
    IP=<your_server_ip>
    POSTGRES_DB=<your_postgres_db_name>
    POSTGRES_USER=<your_postgres_username>
    POSTGRES_PASSWORD=<your_postgres_password>
    CLIENT_ID=<your_42_client_id>
    CLIENT_SECRET=<your_42_client_secret>
    ```

    *   **`DJANGO_SUPERUSER_...`:** Credentials for the Django admin superuser.
    *   **`DOMAIN` and `IP`:**  The domain name and IP address where your application will be accessible.
    *   **`POSTGRES_...`:** Credentials for the PostgreSQL database.  Docker Compose will use these to set up the database container.
    *   **`CLIENT_ID` and `CLIENT_SECRET`:** Your 42 API client credentials.  You'll need to obtain these from the 42 API dashboard.

3.  **Build and Run the Application with Docker Compose:**

    ```bash
    docker compose up --build
    ```

    This command does the following:

    *   **Builds the Docker images:** It reads the `Dockerfile` in `srcs/` to build the Django application image and uses the `nginx:stable-alpine` image for the Nginx web server.
    *   **Creates the containers:** It creates three containers: `db` (PostgreSQL), `web` (Django), and `nginx` (Nginx).
    *   **Starts the services:** It starts the database, the Django development server, and Nginx, linking them together as defined in `docker-compose.yml`.
    *   **`--build`**: This flag forces Docker Compose to rebuild the images, which is important if you've made changes to your code.

4.  **Access the Application:**

    Once the containers are running, you should be able to access the application in your web browser at `https://localhost:8000` (or `https://<your_domain>:8000` if you've configured DNS and a non-localhost domain).  You might need to accept the self-signed certificate warning in your browser.

5. **Create superuser (alternative if not created by the .env)**
    ```bash
    docker exec -it web python manage.py createsuperuser
    ```
    Then follow the prompts to enter a username, email, and password for the superuser.

## Usage

*   **Login/Registration:** Access the application in your browser.  You can register a new account or log in if you already have one.  You can also use the "Login with 42" option if you have a 42 account.
*   **Profile:** After logging in, you can access your profile page to edit your information, change your avatar, and manage your friends.
*   **Games:** The "Games" page lists the available games (Pong and Tic-Tac-Toe).  Click on a game to start playing.
*   **Matchmaking:** Click the "Matchmaking" button on a game page to be placed in a queue to play against another user.
*   **Tournaments:**  The "Tournaments" page allows you to view, create, and join tournaments for each game.
*   **Dashboard:** The "Dashboard" shows some statistics and leaderboard.

## Development

### Running Locally (Without Docker - For Development)

While Docker is the recommended way to run the application, you can also run it directly on your host machine for development purposes.  This requires setting up a Python environment, installing dependencies, and configuring a PostgreSQL database manually.

1.  **Install Python:**  Make sure you have Python 3.8 or higher installed.

2.  **Create a Virtual Environment (Recommended):**

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  **Install Dependencies:**

    ```bash
    pip install -r srcs/tools/requirements.txt
    ```

4.  **Set Environment Variables:**  You'll need to set the same environment variables as in the `.env` file, but this time directly in your shell or through a tool like `direnv`.

5.  **Database Setup:**

    *   **Install PostgreSQL:**  You'll need a running PostgreSQL server.
    *   **Create a Database and User:** Create a database and user with the credentials you specified in your environment variables.

6.  **Run Migrations:**

    ```bash
    python srcs/app/manage.py migrate
    ```

7.  **Run the Development Server:**

    ```bash
    python srcs/app/manage.py runserver
    ```
    You will need to run the server with the `./srcs/tools/run_server.sh` script, that configure the ssl.

    By default, the development server will run on `http://127.0.0.1:8000`.  _This won't include Nginx or HTTPS, so it's not suitable for production._

### Makefile Commands

The `Makefile` provides several convenient commands:

*   **`make up`:** Starts the application using Docker Compose (same as `docker compose up -d`).
*   **`make down`:** Stops and removes the Docker containers (same as `docker compose down`).
*   **`make build`:** Builds the Docker images (same as `docker compose build`).
*   **`make logs`:**  Views the logs from the containers (same as `docker compose logs -f`).
*   **`make exec`:** Opens a shell inside the `web` container. Useful for running Django management commands.
*   **`make clean`:**  Removes Python cache files and database migrations.
*   **`make fclean`:** Stops and removes containers, and also cleans up Docker volumes and dangling images.  _Be careful with this, as it removes persistent data._
*   **`make reset`:**  Combines `clean`, `down`, `build`, `up`, and `logs`.
* **`make all`:** run clean up and logs.
### API Endpoints

The application provides a REST API for various operations.  Here are some key endpoints (replace `https://localhost:8000` with your actual URL):

*   **Authentication:**
    *   `/api/login/`:  User login (POST).
    *   `/api/login_42/`: 42 OAuth login (GET).
    *   `/api/register_42/`: 42 user registration (POST).
    *   `/api/register/`:  User registration (POST).
    *   `/api/logout/`:  User logout (POST).
*   **User Profile:**
    *   `/api/edit_profile/`: Edit user profile (POST).
    *   `/api/change_password/`: Change user password (POST).
    *   `/api/get_user_name/`: Get the current user's username (GET).
    *   `/api/me/`:  Get the current user's profile data (GET).
    *   `/api/get_user_by_id/<int:id>/`: Get a user by ID (GET).
    *   `/api/get_user_by_username/<str:username>/`: Get a user by username (GET).
    *   `/api/get_all_users/`: Get all users (GET).
    *   `/api/search_user/<str:username>/`: Get a user by a search (GET).
* **Friends**
    *    `/api/get_all_friends/<int:id_user>`: Get a user's friends (GET).
    *   `/api/add_friend/`: send Friend Request (POST).
    *   `/api/delete_friend/<int:id_user>`: Delete Friend(DELETE).
    *   `/api/respond_friend_request/`:  Accept Friend Request (POST).
    *   `/api/get_friend_request/`:  Get Friend Request (GET).
*   **Games:**
    *   `/api/get_game_by_id/<int:id>/`: Get game details by ID (GET).
    *   `/api/get_game_by_name/<str:name>/`: Get game details by name (GET).
    *   `/api/get_all_games/`: Get all games (GET).
    *   `/api/get_stats_by_game/<int:id_game>/`: Get game statistics (GET).
* **Lobbies**
    * `/api/get_all_lobbies/`: Get all lobbies (GET).
    * `/api/get_lobby_by_id/<int:id>/`: Get lobby details by ID (GET).
* **Parties**
    * `/api/get_all_party/`: Get all parties (GET).
* **Tournament**
    * `/api/get_all_tournaments/`: Get all tournaments (GET).
    * `/api/get_tournament_by_id/<int:id>/`: Get tournament by ID (GET).
    * `/api/create_tournament/`: Create a new tournament (POST).
    * `/api/join_tournament/`: Join a tournament (POST).
    * `/api/leave_tournament/`: Leave a tournament (POST).
* **Leaderboard**
    * `/api/get_leaderboard/<int:id_game>`:  Get the leaderboard for a game (GET).
    * `/api/get_leaderboard/<int:id_game>/<int:length>`: Get the leaderboard limited by length (GET).
* **Alias**
    * `/api/alias/`: Change the alias of a user (POST).

## Contributing

Contributions are welcome!  If you'd like to contribute:

1.  **Fork the repository.**
2.  **Create a new branch:** `git checkout -b feature/your-feature-name`
3.  **Make your changes and commit them:** `git commit -m "Add your commit message"`
4.  **Push your branch:** `git push origin feature/your-feature-name`
5.  **Create a Pull Request.**

Please follow good coding practices, write clear commit messages, and include tests for any new functionality.

## License

This project is licensed under no license

## Future Improvements

