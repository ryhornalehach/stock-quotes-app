require 'uri'

class Api::V1::StockController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
      portfolio = []                # creating an empty array to store portfolio
      current_user_portfolio = ''   # need this variable to check if user's portfolio is empty
      if current_user && (!current_user.portfolio || current_user.portfolio == '')  # checking if the user is authenticated and the user's portfolio is not empty
          current_user_portfolio = 'empty'  # this keyword will be used in 'MyCabinet' React component to display a corresponding message to the user
      elsif current_user
        current_user.portfolio.split(",").each do |symbol|  # splitting the portfolio string to array so that I can iterate through all items in the portfolio
          uri = URI.parse("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=#{symbol}&apikey=#{ENV['ALPHAVANTAGE_KEY']}") # calling the external API
          buffer = open(uri).read     # reading the response from external API
          result = JSON.parse(buffer) # parsing the response to JSON
          position = {}     # creating an empty hash to store the stock info

          if result['Error Message']  # if the user entered wrong stock name, it will display the error and ask the user to delete the worng stock
              position['stock_name'] = symbol
              position['last_close_value'] = 'Error: Wrong stock, please delete it'
              position['growth'] = '='
              portfolio << position
              break   # breaking the loop so that user must delete wrong stock before using the service again
          elsif result['Information']  # if the error comes from Alpha Vantage, display it
              position['stock_name'] = symbol
              position['last_close_value'] = 'Error: Wrong stock, please delete it'
              position['growth'] = '='
              portfolio << position
              break   # breaking the loop so that user can take care of the problem
          end

          position['stock_name'] = result['Meta Data']['2. Symbol']         # storing the stock symbol
          last_refreshed = result['Meta Data']['3. Last Refreshed'][0..9]   # getting the latest result key in the list of results
          last_close_value = result['Monthly Time Series'][last_refreshed]['4. close']   # getting the latest close value for the selected stock
          position['last_close_value'] = last_close_value[0...-2]   # storing the latest close value and cutting the 4 digit-precision to 2-digit. For the challenge purposes it will be enough, but in a real application, I would've converted the value to float and the used .round(2) method to get more precise result
          last_open_value = result['Monthly Time Series'][last_refreshed]['1. open']     # getting the last month open value for comparison
          if last_close_value > last_open_value   # comparing the open value and close value to deternime if the stock grew or decreased
              position['growth'] = '+'  # this symbol will be used in React component to assign green or red color to the item
          elsif last_close_value < last_open_value
              position['growth'] = '-'
          else
              position['growth'] = '='
          end

          portfolio << position  # pushing the stock position to portfolio array
        end

      end

      render json: { portfolio: portfolio, current_user_portfolio: current_user_portfolio }   # sending the portfolio to front-end
  end

  def update
      if current_user   # verifying that user is authenticated
              data = JSON.parse(request.body.read)  # reading the request body
              if data['add'] && data['add'] != '' && data['add'] != ' '  # this keyword determines if we are adding new item to portfolio or deleting one, also checking for the correct request
                  if current_user.portfolio.nil? || current_user.portfolio == '' # need this to properly add new item to portfolio string
                      current_user.portfolio = "#{data['add']}"
                      current_user.save!
                  else
                      current_user.portfolio += ",#{data['add']}"
                      current_user.save!
                  end
              elsif data['delete']
                  if current_user.portfolio.slice!(",#{data['delete']}")  # need this to properly delete the item from portfolio string
                      current_user.save!
                  elsif current_user.portfolio.slice!("#{data['delete']},")
                      current_user.save!
                  else
                      current_user.portfolio.slice!(data['delete'])
                      current_user.save!
                  end
              else

              end
              render json: current_user.portfolio   # rendering current portfolio as a confirmation of successful update
      else
              render json: { error: 'You are not authorized' }  # rendering the error message if user is not authenticated
      end
  end

end
