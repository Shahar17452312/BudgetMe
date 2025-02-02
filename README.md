# BudgetMe

BudgetMe is a modern full-stack application designed to help users efficiently manage their budgets, track expenses, and monitor financial goals.

## Features

### Frontend
- Built using **React** with **Vite** for fast and efficient development.
- Responsive design to ensure usability across devices.
- User-friendly interface for budget tracking.

### Backend
- Developed using **Express.js**.
- Secure and scalable architecture.
- Implements a RESTful API for managing budgets, expenses, and authentication.

## Installation

### Prerequisites
- **Node.js** (v16 or higher).
- **npm** or **yarn**.
- A running instance of a supported database (e.g., PostgreSQL).

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Shahar17452312/BudegetMe.git
   cd BudgetMe
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```env
     SERVER_PORT=5000
     DB_HOST=localhost
     DB_USER=<your-database-user>
     DB_PASSWORD=<your-database-password>
     DB_NAME=budgetme
     ```

4. Start the development servers:
   - Backend:
     ```bash
     npm run dev
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm run dev
     ```

5. Open the app in your browser:
   ```
http://localhost:3000
   ```

## Folder Structure

### Frontend
- `src`: Contains all the React components and logic.
- `public`: Static assets.

### Backend
- `controllers`: Application logic for various endpoints.
- `routes`: API route definitions.
- `utils`: Utility functions.
- `config`: Database configuration.

## Future Improvements
- Add more analytics and reporting tools.
- Implement notifications for budget overspending.
- Add multi-language support.

## Contributing
Contributions are welcome! Please follow the standard Git workflow:
1. Fork the repository.
2. Create a feature branch.
3. Submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
