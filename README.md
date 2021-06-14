# auth-inventory-api

REST Api for Auth-Inventory react native app

## Introduction

Simple API for authentication and database management.

## ENV Variables

```console
PORT=<PORT NUMBER>
DB_URL=<URL TO MONGODB ATLAS>
SECRET=<KEY FOR JWT>
```

## Endpoints

|     ROUTE      |   METHOD   |           ENDPOINT            |              PURPOSE              | Auth Required? |
| :------------: | :--------: | :---------------------------: | :-------------------------------: | :------------: |
|   _`/auth`_    |  **POST**  |          _`/login`_           |            User Login             |    `false`     |
|   _`/auth`_    |  **POST**  |          _`/logout`_          |            User Logout            |     `true`     |
|   _`/user`_    |  **GET**   |           _`/:id`_            |             View User             |     `true`     |
|   _`/user`_    |  **POST**  |             _`/`_             |            User Signup            |    `false`     |
|   _`/user`_    |  **PUT**   |             _`/`_             |            Update User            |     `true`     |
|   _`/user`_    | **DELETE** |             _`/`_             |            Delete User            |     `true`     |
| _`/inventory`_ |  **GET**   |             _`/`_             |  Get All Items for Current User   |     `true`     |
| _`/inventory`_ |  **GET**   |             _`/`_             |          Get Item by ID           |     `true`     |
| _`/inventory`_ |  **POST**  |             _`/`_             |   Add Item in user's inventory    |     `true`     |
| _`/inventory`_ | **DELETE** |             _`/`_             |    Delete Item from inventory     |     `true`     |
|   _`/util`_    |  **GET**   | _`/check-username/:username`_ |     Check if username exists      |    `false`     |
|   _`/util`_    |  **GET**   |   _`/get-avatar/:username`_   | Get profile picture fron username |    `false`     |

> `get-avatar/:username` endpoint is needed because we can't store base64 string (which is huge in size) in react-native-async-storage

### Result

> Every endpoint will return a result object in the below mentioned format

#### Success

```js
{
  success: true,
  variable,
  msg: "Endpoint result message"
}
```

- `success` : boolean
- `variable` : often an endpoint specific key which holds either an array or object
- `msg` : String, a message which can be used as response on frontend

#### Error

```js
{
  success: false,
  error: "Error Message";
}
```

- `success` : boolean
- `msg` : String, a message which can be used as response on frontend
