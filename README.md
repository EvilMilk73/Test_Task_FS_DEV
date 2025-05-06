# Test Task Project

This project consists of two parts:
- **Frontend**: A Next.js application (located in the `test-task-fe` folder)
- **Backend**: A NestJS application (located in the `test-task-be` folder)

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

## Installation

1. Clone the repository:

    ```bash
    git clone <your-repository-url>
    ```

2. Navigate to the frontend folder and install dependencies:

    ```bash
    cd test-task-fe
    npm install
    ```

3. Navigate to the backend folder and install dependencies:

    ```bash
    cd ../test-task-be
    npm install
    ```

## Setup Environment Variables

Create `.env` files in both the frontend and backend folders.

### Frontend (`test-task-fe/.env`)

```env
NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:3001
```

### Backend (test-task-be/.env)

```env
FRONT_END_BASE_URL=http://localhost:3000
```


## Running the Application

### Running Frontend (Next.js)
1. Navigate to the frontend folder

  ```bash
 cd test-task-fe
 ```

2. Start the development server:

```bash
npm run dev
```
The frontend should now be running on http://localhost:3000.

### Running Backend (NestJS)

1. Navigate to the backend folder:

  ```bash
 cd ../test-task-be
 ```

2. Start the development server:

```bash
npm run dev
```
The backend should now be running on http://localhost:3001.

# Notes
 
- The frontend will interact with the backend via API requests. Ensure that both frontend and backend are running simultaneously.

- Make sure to configure any additional environment variables as needed depending on the project requirements.
