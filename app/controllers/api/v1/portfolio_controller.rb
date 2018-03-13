class Api::V1::PortfolioController < ApplicationController
  skip_before_action :verify_authenticity_token

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
