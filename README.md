# COVID19-INFO

It gives the latest information about the covid19 cases.

## Steps

1. DB design using postgres and sequelize
   - tables:
     - users (id, uname (pk), password, name, email, address, isAdmin)
     - jwt-tokes (id, refresh_token)
     - countries (id, name(pk))
     - dates (id, date(pk))
     - covid-info (id, (country_id, date_id)(pk), confirmed, recovered, deaths)
2. Routes
   - /admin - who can upload the covid data as .csv
   - /signUp
   - /signIn
   - /totalPositiveCases
   - /totalRecoveredCases
   - /totalDeaths
