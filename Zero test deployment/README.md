# Zero Application

This is a Spring Boot application packaged as a single executable JAR file.

---

## Requirements

- **Java 21 or higher** installed on your machine  
- **PostgreSQL** database server running and accessible

---

## Running instructions

- Ensure PostgreSQL database server running and accessible (see below)
- Run in command line: java -jar zero-0.0.1.jar 
- Visit http://localhost:8080/ in web browser
- Press `Ctrl + C` in terminal to shut down the program

---

## PostgreSQL Setup

The application expects a PostgreSQL database with the following details:

| Property            | Value              |
|---------------------|--------------------|
| Database name       | `zero`             |
| Username            | `postgres`         |
| Password            | `admin`            |
| Host                | `localhost`        |
| Port                | `5432`             |

You need to create this database and user in your PostgreSQL server before running the app.

Example commands to create the database and user:

```bash
createdb zero
psql -c "CREATE USER postgres WITH PASSWORD 'admin';"
psql -c "GRANT ALL PRIVILEGES ON DATABASE zero TO postgres;"