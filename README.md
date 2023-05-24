# Projectify
This is a <b>MEAN Stack</b> project that allows users to store and manage project details. The project includes features such as displaying projects based on their completion status, adding files with auto-fill functionality for project details, pagination, search functionality, route management, and user authentication. All project data is stored in MongoDB, and the application interacts with the database using APIs.

Prerequisites
Before running this project, ensure that you have the following installed:
<ul>
<li>Node.js</li>
<li>Angular CLI</li>
  <li>MongoDB</li>
</ul>

# Getting Started

To get started with this project, follow the steps below:

## Clone the repository:
```
git clone repo_name
```

## Navigate to the project directory:
```
cd backend to run server first and then frontend
```
## Install the dependencies:
```
npm install
```
## Start the backend server:
```
npm run server
```
## In a separate terminal, start the frontend development server:
```
npm start
```
## Open your web browser and visit http://localhost:4200 to access the application.


# Usage
## User Authentication: 
The application supports user authentication. Users can create an account, log in, and log out. Certain features, such as adding/editing projects, are only accessible to authenticated users.

## Project Listing: 
The application displays a list of projects, categorized based on their completion status (active or completed). Projects are retrieved from the MongoDB database and displayed on the appropriate pages.

## Project Details: 
Clicking on a project from the list will navigate to the project details page. Here, users can view and edit the project details. The details are retrieved from the MongoDB database and pre-filled in the form.

## Adding a Project:
Authenticated users can add new projects by clicking on the "Add Project" button. They can provide the necessary details, such as project name, description, completion status, etc. The project is then stored in the MongoDB database.

## Pagination: 
The project list is paginated to enhance performance and improve the user experience. Use the pagination controls to navigate through the pages.

## Search: 
The application provides a search functionality that allows users to search for specific projects. Simply enter keywords in the search input field, and the application will filter the projects accordingly.

# Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

- Fork the repository.
- Create a new branch for your feature/fix: 
```
git checkout -b feature-name.
```
- Make your changes and commit them: 
```
git commit -m "Add your message here".
```
- Push the changes to your forked repository: 
```
git push origin feature-name.
```
- Open a pull request on the original repository, describing your changes in detail.
