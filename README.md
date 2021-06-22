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

|     ROUTE      |   METHOD   |           ENDPOINT            |              PURPOSE              | Auth Required? |    Variable     |
| :------------: | :--------: | :---------------------------: | :-------------------------------: | :------------: | :-------------: |
|   _`/auth`_    |  **POST**  |          _`/login`_           |            User Login             |    `false`     | `{user, token}` |
|   _`/auth`_    |  **POST**  |          _`/logout`_          |            User Logout            |     `true`     |      none       |
|   _`/user`_    |  **GET**   |           _`/:id`_            |             View User             |     `true`     |    `{user}`     |
|   _`/user`_    |  **POST**  |             _`/`_             |            User Signup            |    `false`     |    `{user}`     |
|   _`/user`_    |  **PUT**   |             _`/`_             |            Update User            |     `true`     |    `{user}`     |
|   _`/user`_    | **DELETE** |             _`/`_             |            Delete User            |     `true`     |      none       |
| _`/inventory`_ |  **GET**   |             _`/`_             |  Get All Items for Current User   |     `true`     |    `{items}`    |
| _`/inventory`_ |  **GET**   |           _`/:id`_            |          Get Item by ID           |     `true`     |    `{item}`     |
| _`/inventory`_ |  **POST**  |             _`/`_             |   Add Item in user's inventory    |     `true`     |    `{item}`     |
| _`/inventory`_ |  **PUT**   |             _`/`_             |            Update Item            |     `true`     |    `{item}`     |
| _`/inventory`_ | **DELETE** |             _`/`_             |    Delete Item from inventory     |     `true`     |      none       |
|   _`/util`_    |  **GET**   | _`/check-username/:username`_ |     Check if username exists      |    `false`     |   `{exists}`    |
|   _`/util`_    |  **GET**   |   _`/get-avatar/:username`_   | Get profile picture fron username |    `false`     |    `{photo}`    |

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

If there's no variable in [`Endpoint's result`](#endpoints) read `msg`

#### Error

```js
{
  success: false,
  error: "Error Message";
}
```

- `success` : boolean
- `msg` : String, a message which can be used as response on frontend

## Local Development

### Install

```
  npm i
```

Install all packages

### Start

```
  npm start
```

Starts the express server.

### Start in development mode

```
  npm run dev
```

Similar to [`start`](#start) but, restarts the server on file change
