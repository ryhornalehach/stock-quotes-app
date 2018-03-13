require 'uri'

class Api::V1::ForexController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
      forex_portfolio = []           # creating an empty array to store portfolio
      current_forex_portfolio = ''   # need this variable to check if user's Forex portfolio is empty
      if current_user && (!current_user.forexportfolio || current_user.forexportfolio == '')  # checking if the user is authenticated and the user's portfolio is not empty
          current_forex_portfolio = 'empty'  # this keyword will be used in 'MyCabinet' React component to display a corresponding message to the user
      elsif current_user
        current_user.forexportfolio.split(",").each do |pair|  # splitting the portfolio string to array so that I can iterate through all pairs in the portfolio
          from_currency = pair.split(":")[0]  # splitting the currencies pair to "from" and "to" currencies
          to_currency = pair.split(":")[1]
          uri = URI.parse("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=#{from_currency}&to_currency=#{to_currency}&apikey=#{ENV['ALPHAVANTAGE_KEY']}") # calling the external API
          buffer = open(uri).read     # reading the response from external API
          result = JSON.parse(buffer) # parsing the response to JSON
          position = {}     # creating an empty hash to store the exchange rate info

          if result['Error Message']  # if the user entered wrong currency name, it will display the error and ask the user to delete the worng name
              position['from_currency'] = from_currency
              position['to_currency'] = to_currency
              position['rate'] = 'Error: Wrong currency, please delete it'
              forex_portfolio << position
              break   # breaking the loop so that user must delete wrong currency before using the service again
          elsif result['Information']
              position['from_currency'] = from_currency
              position['to_currency'] = to_currency
              position['rate'] = result['Information']
              forex_portfolio << position
              break   # breaking the loop so that user must delete wrong currency before using the service again
          end

          position['from_currency'] = result['Realtime Currency Exchange Rate']['1. From_Currency Code']    # storing the currency code
          position['to_currency'] = result['Realtime Currency Exchange Rate']['3. To_Currency Code']        # storing the currency code
          rate = result['Realtime Currency Exchange Rate']['5. Exchange Rate']  # reading the exchange rate
          position['rate'] = rate[0...-6]   # storing the exchange rate value and cutting the 8 digit-precision to 2-digit. For the challenge purposes it will be enough, but in a real application, I would've converted the value to float and the used .round(2) method to get more precise result

          forex_portfolio << position  # pushing the currencies pair position to forex portfolio array
        end

      end

      render json: { forex_portfolio: forex_portfolio, current_forex_portfolio: current_forex_portfolio }   # sending the portfolio to front-end
  end

  def update
      if current_user   # verifying that user is authenticated
              data = JSON.parse(request.body.read)  # reading the request body
              if data['add'] && data['add'] != '' && data['add'] != ' '  # this keyword determines if we are adding new item to portfolio or deleting one, also checking for the correct request
                  if current_user.forexportfolio.nil? || current_user.forexportfolio == '' # need this to properly add new item to portfolio string
                      current_user.forexportfolio = "#{data['add']}"
                      current_user.save!
                  else
                      current_user.forexportfolio += ",#{data['add']}"
                      current_user.save!
                  end
              elsif data['delete']
                  if current_user.forexportfolio.slice!(",#{data['delete']}")  # need this to properly delete the item from portfolio string
                      current_user.save!
                  elsif current_user.forexportfolio.slice!("#{data['delete']},")
                      current_user.save!
                  else
                      current_user.forexportfolio.slice!(data['delete'])
                      current_user.save!
                  end
              else

              end
              render json: current_user.forexportfolio   # rendering current portfolio as a confirmation of successful update
      else
              render json: { error: 'You are not authorized' }  # rendering the error message if user is not authenticated
      end
  end

end
