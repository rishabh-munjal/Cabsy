
## API Documentation

### User Registration Endpoint

#### POST `/api/user/register`

This endpoint is used to register a new user in the system.

---

#### Request Body

The request body must be sent in JSON format and include the following fields:

| Field       | Type   | Required | Description                                      |
|-------------|--------|----------|--------------------------------------------------|
| `firstname` | String | Yes      | The first name of the user (minimum 3 characters). |
| `lastname`  | String | No       | The last name of the user (optional).           |
| `email`     | String | Yes      | A valid email address (must be unique).         |
| `password`  | String | Yes      | A password with a minimum length of 6 characters. |

---

#### Validation Rules

- `firstname`: Must not be empty and must have at least 3 characters.
- `lastname`: Optional, but if provided, must have at least 3 characters.
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

---

#### Example Request

```json
POST /api/user/register
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}