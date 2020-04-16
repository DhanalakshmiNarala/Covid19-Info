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
    - address - Varchar(50)
    - is_admin - Boolean

      Here the password field contains the user's encrypted password.

  - **Countries**

    - id (primary key) - Serial
    - name (unique) - Varchar(50)

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
  - address

  **_output:_**

  - If registration success: 'User successfully registered' message.
  - If any error occured: 'User registration failed' message.

- **/signIn** (POST)

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

- **/getNewAccessToken** (POST)

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

- **/uploadData** (POST)

  **_params_**: (Using postman form-data option we can upload csv file as key - value pair).

  - confirmed - covid_confirmed.csv
  - recovered - covid_recovered.csv
  - deaths - covid_deaths.csv

  **_output:_** If files successfully uploaded then 'Successfully submitted' message or error message.

* **/totalPositiveCases** (GET)

  **_params:_** Not required

  **_output:_**

  ```
  {
     totalWorldWide: count,
     countryWise: {
        country_name: count
        ...
     }
  }
  ```

- /**totalRecoveredCases** (GET)

  **_params:_** Not required

  **_output:_**

  ```
  {
     totalWorldWide: count,
     countryWise: {
        country_name: count
        ...
     }
  }
  ```

* **/totalDeaths** (GET)

  **_params:_** Not required

  **_output:_**

  ```
  {
        totalWorldWide: count,
        countryWise: {
           country_name: count,
           ...
        }
  }
  ```

**List of packages used:**

- express
- morgon
- dotenv
- loglevel
- sequelize
- bcrypt - for encrypting user passwords
- jsonwebtoken - for jwt tokens
- multer - for handling file uploads
- csv-fast - for parsing csv files
- jest (dev)
- nodemon (dev)

**Architecture and working**

1. User will get registered through /signUp
2. After signUp the user will signIn through /signIn
3. I will assign some users as admin manually in database by changing isAdmin field.
4. Using /uploadData api the admin will upload .csv files. The .csv files will be processed using **_multer_** and **_fast-csv_** node modules and the update the covid-info database table using sequelize.
5. /totalCofirmedCases, /totalRecoveredCases, /totalDeaths will be filled by processing covid-info database table through sequelize.
