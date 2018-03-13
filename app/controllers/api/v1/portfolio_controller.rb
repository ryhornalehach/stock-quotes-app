class Api::V1::PortfolioController < ApplicationController
  skip_before_action :verify_authenticity_token

  def update
      if current_user
              data = JSON.parse(request.body.read)
              if data['add']
                  if current_user.portfolio.nil? || current_user.portfolio == ''
                      current_user.portfolio = "#{data['add']}"
                      current_user.save!
                  else
                      current_user.portfolio += ",#{data['add']}"
                      current_user.save!
                  end
              elsif data['delete']
                  if current_user.portfolio.slice!(",#{data['delete']}")
                      current_user.save!
                  elsif current_user.portfolio.slice!("#{data['delete']},")
                      current_user.save!
                  else
                      current_user.portfolio.slice!(data['delete'])
                      current_user.save!
                  end
              else

              end
              render json: current_user.portfolio
      else
              render json: { error: 'You are not authorized' }
      end
  end
end
