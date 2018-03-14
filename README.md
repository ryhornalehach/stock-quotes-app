# Developed by: Ryhor (Greg) Nalehach
Stock quotes app. 48 hours programming challenge: create a web-app to access and manage stock portfolio. I'm not too familiar with the stock market, so maybe I did something wrong regarding the financial concept, but I created a working application. Users can create an account and there they can create and manage their stock portfolio and ForEx portfolio. I built this app with Ruby on Rails and React.js, and I used Alpha Vantage API for stock information. I created 2 internal API points for stock and forex portfolios and added models, features and controller tests. The app has basic admin functionality, so that admins can manage users accounts, or delete users.
Source code can be found on GitHub and the app is set in production on Heroku.

# Technologies used in the app:
  1. Ruby on Rails
  2. React.js
  3. PostgreSQL database
  4. Materialize Framework
  5. Devise gem for user authentication
  6. Alpha Vantage API

# To start the application:
  1. Bundle install ruby gems:
    $ bundle
  2. Install nmp packages:
    $ npm install
  3. Create and migrate the database:
    $ rake db:create
    $ rake db:migrate
  4. Start the server:
    $ rails s
    $ npm start
  5. Test with Rspec:
    $ rake db:test:prepare
    $ rake

# Test user account:
user login: greg@greg.greg, password: greg123
admin login: admin@admin.com, password: admin123
