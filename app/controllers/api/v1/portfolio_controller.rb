class Api::V1::PortfolioController < ApplicationController
  skip_before_action :verify_authenticity_token

  def update
    if current_user
      if current_user.role === 'admin' || current_user.role === 'manager'
        data = JSON.parse(request.body.read)
        if data['selectedDriverId'] == 0
          new_driver = nil
        elsif data['selectedDriverId']
          new_driver = data['selectedDriverId']
        else
          new_driver = nil
        end
        pickup = Pickup.find(data['currentClientId'])
        pickup.driver_id = new_driver
        pickup.save
        render json: pickup.driver
      else
        render json: { auth: false, user: nil, driver: nil, clients: nil, error: 'You are not authorized' }
      end
    else
      render json: { auth: false, user: nil, driver: nil, clients: nil, error: 'You are not authorized' }
    end
  end
end
