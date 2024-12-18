### README: Task Management API

#### Overview
This is an API platform designed to perform CRUD operations for managing tasks. The application includes features for creating, reading, updating, and deleting tasks, with built-in validations for object identifiers and response bodies.

#### Features
1. **Home Page**: A home page for the domain to serve as the API's entry point.
2. **CRUD Operations**: Supports operations via various HTTP methods:
   - **Create**: Add new tasks.
   - **Read**: Retrieve task details.
   - **Update**: Modify existing tasks.
   - **Delete**: Remove tasks.
3. **Validation**: Ensures proper handling of object identifiers and response body content.

#### Installation
1. Clone the repository:  
   ```bash
   git clone git@github.com:airtribe-projects/task-manager-api-utksngh.git
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Run the server:  
   ```bash
   npm run dev
   ```

#### API Endpoints
- `GET /tasks`: Retrieve all tasks.
- `POST /tasks`: Create a new task.
- `GET /tasks/:id`: Retrieve a task by ID.
- `PUT /tasks/:id`: Update a task by ID.
- `DELETE /tasks/:id`: Delete a task by ID.


