require 'uri'

class Api::V1::StockController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
      portfolio = []
      current_user_portfolio = []
      if current_user
          current_user_portfolio = current_user.portfolio.split(",")
      end

      current_user_portfolio.each do |symbol|
          uri = URI.parse("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=#{symbol}&apikey=#{ENV['ALPHAVANTAGE_KEY']}")
          buffer = open(uri).read     # reading the response from external API
          result = JSON.parse(buffer) # parsing the response to JSON

          position = {}   # creating an empty hash to store the stock info
          position['stock_name'] = result['Meta Data']['2. Symbol']
          today = Time.now.getlocal('-05:00').to_date.strftime("%Y-%m-%d")      # getting today's date and converting it into string
          last_close_value = result['Monthly Time Series'][today]['4. close']   # getting the latest close value for the selected stock
          position['last_close_value'] = last_close_value[0...-2]
          last_open_value = result['Monthly Time Series'][today]['1. open']
          if last_close_value > last_open_value
            position['growth'] = '+'
          elsif last_close_value < last_open_value
            position['growth'] = '-'
          else
            position['growth'] = '='
          end

          portfolio << position  # pushing the stock position to portfolio array
      end



      render json: { portfolio: portfolio, current_user_portfolio: current_user_portfolio }
  end

end
