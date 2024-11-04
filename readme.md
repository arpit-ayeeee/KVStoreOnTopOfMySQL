## Project README

# Key-Value Store API with Cron Job

This project is a simple Node.js-based API that allows you to add, retrieve, and delete key-value pairs from a MySQL database. Additionally, a cron job is implemented to automatically clean up expired data at regular intervals.

## Features

- **REST API** for managing key-value pairs.
- **Cron Job** that runs every minute to delete expired data.
- **MySQL Database** integration via Sequelize ORM.

## Requirements

- Node.js
- MySQL
- npm (Node package manager)

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-repo-url.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd your-project-directory
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Set up environment variables**:

   Create a `.env` file in the project root and configure the following:

   ```
   DATABASE_HOST=your_database_host
   DATABASE_NAME=your_database_name
   DATABASE_USER=your_database_user
   DATABASE_PASSWORD=your_database_password
   ```

5. **Create the `Store` table** in your MySQL database:

   Run the following SQL command to create the `Store` table:

   ```sql
   CREATE TABLE Store (
       `key` VARCHAR(128) PRIMARY KEY,
       value TEXT,
       expiresAt DATETIME
   );
   ```

## Running the Project

1. **Start the server**:
    ```bash
    npm start
    ```

2. **The server will run on** `http://localhost:8080`.

## API Endpoints

### 1. Get Data by Key

- **URL**: `/getdata/:id`
- **Method**: `GET`
- **Description**: Retrieve the value for a given key if it hasn't expired.
- **Parameters**:
  - `id` (path parameter) - The key to look up.
- **Example Request**:
    ```bash
    curl http://localhost:8080/getdata/myKey
    ```

### 2. Add Data

- **URL**: `/addData`
- **Method**: `POST`
- **Description**: Add a new key-value pair to the store, with an expiration time of 10 minutes.
- **Body Parameters**:
  - `key`: The key for the data.
  - `value`: The value associated with the key.
- **Example Request**:
    ```bash
    curl -X POST http://localhost:8080/addData -H "Content-Type: application/json" -d '{"key": "myKey", "value": "myValue"}'
    ```

### 3. Delete Data by Key

- **URL**: `/deleteData/:id`
- **Method**: `DELETE`
- **Description**: Soft delete the data by setting `expiresAt` to `null`.
- **Parameters**:
  - `id` (path parameter) - The key to delete.
- **Example Request**:
    ```bash
    curl -X DELETE http://localhost:8080/deleteData/myKey
    ```

## Cron Job

The project includes a cron job that runs every minute to delete up to 1000 records from the `Store` table where the `expiresAt` date is older than the current time. The cron job is handled using the `node-cron` package.

- **Schedule**: Every 10 minutes.
- **Task**: Deletes expired records from the `Store` table.

### How the Cron Job Works:

- It runs the `implementTimeToLeave` function from the `cron.js` file.
- This function queries the database and removes expired records by checking the `expiresAt` field.

## Project Structure

- `index.js`: The main entry point of the application. Sets up the Express server, Sequelize instance, routes, and the cron job.
- `cron.js`: Contains the function that is executed by the cron job to clean up expired data.
- `controller/kvController.js`: Handles all the API logic for adding, retrieving, and deleting key-value pairs.
- `.env`: Environment variables for database configuration.

## Dependencies

- **Express**: Web framework for Node.js.
- **Sequelize**: ORM for MySQL.
- **dotenv**: Loads environment variables from `.env` files.
- **node-cron**: Cron job scheduling for Node.js.
- **mysql2**: MySQL driver for Node.js.

