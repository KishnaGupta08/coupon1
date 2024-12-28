# Coupon API

This API allows users to **register**, **login**, **generate** and **validate** discount coupons for products. 

## Endpoints

### 1. Register User
- **Endpoint**: `https://my-backend-app-z1zp.onrender.com/api/auth/register
- **Description**: Registers a new user by providing a username and password.
- **Request Body like this**:
  ```json
  {
  "username": "testuser1121",
  "email": "test@example1121.com",
  "password": "password1234121"
  }
### 2. Login User
- **Endpoint**: `https://my-backend-app-z1zp.onrender.com/api/auth/login
- **Description**: Logins a existing user by providing a email and password.
- **Request Body like this**:
  ```json
  {
  "email": "test@example1121.com",
  "password": "password1234121"
  }

### 3 Generate Coupon
 **Endpoint**: `https://my-backend-app-z1zp.onrender.com/api/auth/generate-coupon
- **Description**: Creates a new coupon for a product with a given discount percentage and an expiration date.
- **Authentication**: Requires a Bearer token (JWT) for authorization. The user must be logged in to generate a coupon.

## Request Body like this 

The request must include the following fields:

```json
{
  "productId": "string",
  "discount": "number",
  "expirationDate": "string (ISO format)"
}
### 4 Validate Coupon
 **Endpoint**: `https://my-backend-app-z1zp.onrender.com/api/auth/validate-coupon
- **Description**: validates the coupon
- **Authentication**: Requires a Bearer token (JWT) for authorization. The user must be logged in to generate a coupon.

## Request Body like this 

The request must include the following fields:

```json
{
  "productId": "string",
   "couponcode":"string"
}
