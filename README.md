# COVID19-INFO

It gives the latest information about the covid19 cases.

## Steps

### 1. DB design using postgres, liquibase and sequelize

- **Tables:**

  - **Users**

    - id (primary key) - Serial
    - user_name (unique) - Varchar(50)
    - password - Varchar(50)
    - name - Varchar(50)
    - email - Varchar(50)
    - is_admin - Boolean

      Here the password field contains the user's encrypted password.

  - **Countries**

    - id (primary key) - Serial
    - name (unique) - Varchar(50)
    - latitude - Integer
    - longitude - Integer

      The purpose of this table is to avoid redundent country_names in covid_info table.

  - **Covid_info**

    - id (primary key) - Serial
    - country_id(foreign key) - Integer
    - date - Date
    - confirmed - Integer
    - recovered - Integer
    - deaths - Integer

      This table stores the covid19 cases info country with date wise. For country I am using country_id which is foreign key of countries table. I am doing this to avoid redundency.

## 2.Routes

- **/signUp** (POST)

  Using this route the user will get register by providing his details.

  **_params:_**

  - user_name
  - password
  - confirm password
  - name
  - email

  **_output:_**

  - If registration success: 'User successfully registered' message.
  - If any error occured: 'User registration failed' message.

- **/auth/login** (POST)

  Using this route the user will get signIn with his user_name and password.

  **_params:_**

  - user_name
  - password

  **_output:_**

  - If user input is valid then jwt access_token and refresh token will get generated.
    ```
    {
       access_token,
       refresh_token
    }
    ```
  - or else Error message

- **/auth/logout** (DELETE)

  Using this route the user can logout

  **_params_:** Not required

  **_output_:** None

- **/auth/getNewAccessToken** (POST)

  **params:**

  - user_name
  - refresh_token

  **output:**

  ```
  {
     access_token,
     refresh_token
  }
  ```

- **/admin/uploadData** (POST)

  **_params_**: (Using postman form-data option we can upload csv file as key - value pair).

  - confirmed - covid_confirmed.csv
  - recovered - covid_recovered.csv
  - deaths - covid_deaths.csv

  **_output:_** If files successfully uploaded then 'Successfully submitted' message or error message.

- **/covid19/worldWideConfirmedCases** (GET)

  **_params:_** Not required

  **_output:_**

  ```
  {
    message: 'COVID-19 world wide confirmed cases',
    totalWorldWide: Integer
  }
  ```

- **/covid19/worldWideRecoveredCases** (GET)

  **_params:_** Not required

  **_output:_**

  ```
  {
    message: 'COVID-19 world wide recovered cases',
    totalWorldWide: Integer
  }
  ```

- **/covid19/worldWideDiedCases** (GET)

  **_params:_** Not required

  **_output:_**

  ```
  {
    message: 'COVID-19 world wide died cases',
    totalWorldWide: Integer
  }
  ```

- **/covid19/countryWiseConfirmedCases** (GET)

  **_params:_** Not required

  **_output:_**

  ```
  {
    message: 'COVID-19 country wise confirmed cases',
    countryWiseCases: {
      country: String,
      count: Integer
    }
  }
  ```

- **/covid19/countryWiseRecoveredCase** (GET)

  **_params_** Not required

  **_output:_**

  ```
  {
    message: 'COVID-19 country wise recovered cases',
    countryWiseCases: {
      country: String,
      count: Integer
    }
  }

  ```

- **/covid19/countryWiseDiedCases** (GET)

  **_params_** Not required

  **_output_**

  ```
  {
    message: 'COVID-19 country wise died cases',
    countryWiseCases: {
      country: String,
      count: Integer
    }
  }
  ```

**List of packages used:**

- express
- morgon
- dotenv
- sequelize
- bcrypt - for encrypting user passwords
- jsonwebtoken - for jwt tokens
- multer - for handling file uploads
- csvtojson - for parsing csv files

* Dev dependencies:
  - jest
  - sequelize-mock
  - supertest
  - nodemon

**Architecture and working**

1. User will get registered through /signUp
2. After signUp the user will signIn through /signIn
3. I will assign some users as admin manually in database by changing isAdmin field.
4. Using /uploadData api the admin will upload .csv files. The .csv files will be processed using **_multer_** and **_csvtojson_** node modules and the update the covid-info database table using sequelize.
5. /totalCofirmedCases, /totalRecoveredCases, /totalDeaths will be filled by processing covid-info database table through sequelize.

### configuration files:

- **/config/dev.env**

```
  DB_TYPE=xxxx
  DB_NAME=xxxx
  DB_PORT=xxxx
  DB_USERNAME=xxxx
  DB_PASSWORD=xxxx
  SERVER_PORT=xxxx
  HOST=xxxx
  ACCESS_TOKEN_SECRET=xxxx
  REFRESH_TOKEN_SECRET=xxxx
```
