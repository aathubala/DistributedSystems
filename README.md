# Distributed Systems Project

This repository contains the code for a distributed systems project. The project consists of multiple services implemented using Node.js and MongoDB, running within Docker containers.

## Services

### 1. admin-service

- **Description:** This service provides functionality related to administration tasks.
- **Port:** 8070
- **Environment Variables:**
  - `MONGODB_URL`: MongoDB connection string for storing administrative data.

### 2. instructor-learner-service

- **Description:** This service handles operations related to instructors and learners.
- **Port:** 8080
- **Dependencies:** Depends on the `mongo` service.
  
### 3. mongo

- **Description:** MongoDB database service for storing data used by the other services.
- **Port:** 27017

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository to your local machine:

git clone <repository_url>

2. Navigate to the project directory:

cd DistributedSystems

3. Build and run the Docker containers:
docker-compose up --build

4. Access the services:

- admin-service: [http://localhost:8070](http://localhost:8070)
- instructor-learner-service: [http://localhost:8080](http://localhost:8080)

## Dockerfile Explanation

The project utilizes Docker containers for service deployment. Below is an explanation of the Dockerfiles used for each service:

### admin-service Dockerfile

- Sets up a Node.js 14 environment.
- Copies package.json and installs dependencies.
- Copies the application code.
- Exposes port 8070.
- Runs the Node.js application in development mode.

### instructor-learner-service Dockerfile

- Sets up a Node.js 14 environment.
- Copies package.json and installs dependencies.
- Copies the application code.
- Exposes port 8080.
- Runs the Node.js application.

## Notes

- Make sure to provide the necessary environment variables, especially the MongoDB connection string, for the services to function correctly.
- Ensure that Docker and Docker Compose are installed on your system before running the project.

