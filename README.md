# Clothing Shop



## Features


Ordering: Customers can order using provided tablets at their table.

Product List: Customers can view the Product list on the main screen, which includes each food's name, picture, 
and price.

Cart Management: Customers can add Product items to their cart, specify the order quantity, and view the total price.

Cart Detail Screen: Customers can update the quantity of items in their cart or remove items by setting the quantity to zero.

Order Submission: Customers can submit their orders directly from the Cart Detail screen.

## Technologies Used

- Frontend: React.js with Vite

- Backend: Node.js with Express.js

- Database: PostgreSQL

- State Management: Redux

## Unit Testing:

- Frontend: Vitest

- Backend: Jest


# Getting Started

## Prequisites

- Node.js and npm/yarn installed

- PostgreSQL database setup

## Installation
- Clone the Repository:

```bash
git clone https://github.com/dowmar/ris-cloth-shop
cd ris-cloth-shop
```
- Install Dependencies:
```bash
# For frontend
cd login-incit
npm install

# For backend
cd backend
npm install
```
- Set Up Environment Variables:
Create a .env file in the server directory with the following content:
```bash
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD
DB_HOST=YOUR_HOST
DB_PORT=YOUR_PORT
DB_NAME=YOUR_DB_NAME
ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET
ENCRYPTION_SECRET
```

- Initialize the Database:

Ensure your PostgreSQL database is set up and accessible using the connection string provided in the .env file.

- Run the Application
```bash
# In the root directory
npm run dev

# In the server directory
npm start
```

## Running Unit Tests
- Frontend (Vitest):
```bash
# In the root directory
npm test
```
- Backend (Jest):
```bash
# In the server directory
npm test
```
## Folder Structure
- Frontend (/): Contains all React.js frontend code.
- Backend (backend/): Contains the Express.js API and database interaction logic.


## License

[MIT](https://choosealicense.com/licenses/mit/)
