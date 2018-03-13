require 'uri'

class Api::V1::StockController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
      portfolio = []
      current_user_portfolio = ''
      if current_user && (!current_user.portfolio || current_user.portfolio == '')
          current_user_portfolio = 'empty'
      else
        current_user.portfolio.split(",").each do |symbol|
          uri = URI.parse("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=#{symbol}&apikey=#{ENV['ALPHAVANTAGE_KEY']}")
          buffer = open(uri).read     # reading the response from external API
          result = JSON.parse(buffer) # parsing the response to JSON
          position = {}   # creating an empty hash to store the stock info

          if result['Error Message']  # if the user entered wrong stock name, it will display the error and ask the user to delete the worng stock
            position['stock_name'] = symbol
            position['last_close_value'] = 'Error: Wrong stock, please delete it'
            position['growth'] = '='
            portfolio << position
            break
          end

          position['stock_name'] = result['Meta Data']['2. Symbol']
          last_refreshed = result['Meta Data']['3. Last Refreshed'][0..9]
          # binding.prye
          last_close_value = result['Monthly Time Series'][last_refreshed]['4. close']   # getting the latest close value for the selected stock
          position['last_close_value'] = last_close_value[0...-2]
          last_open_value = result['Monthly Time Series'][last_refreshed]['1. open']
          if last_close_value > last_open_value
            position['growth'] = '+'
          elsif last_close_value < last_open_value
            position['growth'] = '-'
          else
            position['growth'] = '='
          end

          portfolio << position  # pushing the stock position to portfolio array
        end

      end




      render json: { portfolio: portfolio, current_user_portfolio: current_user_portfolio }
  end

end
