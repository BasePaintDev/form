# BasePaint Form

This project is a starter project that provides a pre-configured setup for building a form builder application with authentication, database integration, and server actions. The main purpose of this project is to allow users to create and share forms, as well as track form submissions.

## Features

- Authentication: The project includes pre-configured authentication functionality to secure user access and manage user accounts.
- Database Integration: It leverages the power of Prisma and PostgreSQL to provide a robust and scalable database solution for storing form data and user information.
- Form Builder: The project includes a no-code form builder that allows users to easily create custom forms without writing any code. This feature enables users to define form fields, validation rules, and submission actions.
- Submission Tracking: The project provides functionality to track form submissions, allowing users to view and analyze the data collected through the forms.
- Dev Container: The project comes with a pre-configured development container that sets up an app container for Next.js and Prisma, as well as a separate PostgreSQL database container. This containerized setup ensures consistency and ease of development across different environments.
- Precommit Hooks: The project includes precommit hooks that protect the main branch and enforce code quality standards. These hooks automatically remove whitespace and perform other checks to ensure clean and consistent code.
- Next.js App Router: The project utilizes the Next.js App Router for handling routing and navigation within the application.
- Server Actions: The project uses server actions with Prisma to communicate with the PostgreSQL database. This allows for efficient and secure data retrieval, modification, and deletion.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Set up the necessary environment variables for authentication and database configuration. See `.env.example`.
4. Run the development server using the command `npm run dev`.
5. Access the application in your browser at [http://localhost:3000](http://localhost:3000).
6. Run the prisma studio using the command `npm run db:studio`.
7. Access the prisma studio in your browser at [http://localhost:5555](http://localhost:5555).

## Available Commands

The following npm commands are available for this project:

- `npm run db:push`: Pushes the changes in the Prisma schema to the database.
- `npm run db:seed`: Seeds the database with initial data using the Prisma seed script.
- `npm run db:studio`: Opens Prisma Studio, a visual interface for exploring and managing the database.
- `npm run dev`: Starts the development server using Next.js.
- `npm run build`: Builds the production-ready version of the application.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs the Next.js linter to check for code style and formatting issues.
- `npm run prettier`: Formats the code using Prettier.
- `npm run prettier:check`: Checks if the code meets the Prettier formatting rules.

Make sure to install the required dependencies by running `npm install` before using these commands.

## Contributing

Contributions to this project are welcome. If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
