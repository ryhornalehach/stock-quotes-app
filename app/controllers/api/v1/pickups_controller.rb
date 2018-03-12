require 'googleauth'
require 'google/apis/sheets_v4'
require 'date'

class Api::V1::PickupsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    if current_user
      # driver_name = "#{current_user.first_name.downcase} #{current_user.last_name.downcase}"
      driver_name = current_user.first_name.downcase

      # Initialize the API
      scopes = ['https://www.googleapis.com/auth/spreadsheets']
      auth = ::Google::Auth.get_application_default(scopes)
      service = Google::Apis::SheetsV4::SheetsService.new
      service.authorization = auth
      service.authorization.fetch_access_token!

      # https://docs.google.com/spreadsheets/d/1FCSYucWISilyzlLif7hwFsARVtn91k2hkxLNaaX18KY/edit - my test file
      # https://docs.google.com/spreadsheets/d/1_CuD_Szs7jkOYiz5nl1g16x_gnSfxd9wKc8GUrSwuHs/edit - Smart transportation file
      spreadsheet_id = '1_CuD_Szs7jkOYiz5nl1g16x_gnSfxd9wKc8GUrSwuHs'
      range = 'Schedule!A1:M'

      response = service.get_spreadsheet_values(spreadsheet_id, range) # reading the spreadsheet and assignig the values of the cells to "response"
      pickups_list = []

        # Displaying only current driver`s clients
      response.values.each do |row|
          if row[2] && row[2].downcase === driver_name  # comparing the cell value to the current user's name
              if row.length < 13  # checking if not all cells were filled
                  while row.length < 13
                    row << ''
                  end
              end

              if row[0].include?('dropped off') || row[0].include?('cancelled') || row[0].include?('no show')
                  # if client was dropped off - do not send this client's info to the driver
                  # edge case when in a group of 3 people 1 was cancelled
                  if pickups_list.length > 0 && !row[6].include?('tog/')
                      break
                  end
              elsif pickups_list.length == 0
                  pickups_list << row
              elsif ((row[6].include?('together') || row[6].include?('tog/')) && row[7] != pickups_list[0][7])
                  pickups_list << row
              else
                  break
              end
          end
      end
      render json: { pickups: pickups_list, user_address: "#{current_user.address}, #{current_user.city}, #{current_user.state}, #{current_user.zip}" }
    end
  end

  def update
    if current_user
      driver_name = current_user.first_name.downcase
      data = JSON.parse(request.body.read)
      new_status = "#{data['newStatus']} @ #{data['currentTime']} / "
      current_client_name = data['currentClientName']
      current_client_pickup_time = data['currentClientPickupTime']
      response_update = []

      ##### Reading the file and looking for current pickup
      # Initialize the API
      scopes = ['https://www.googleapis.com/auth/spreadsheets']
      auth = ::Google::Auth.get_application_default(scopes)
      service_reading = Google::Apis::SheetsV4::SheetsService.new
      service_reading.authorization = auth
      service_reading.authorization.fetch_access_token!

      spreadsheet_id = '1_CuD_Szs7jkOYiz5nl1g16x_gnSfxd9wKc8GUrSwuHs'
      range_reading = 'Schedule!A4:M' # full schedule range for reading

      response_reading = service_reading.get_spreadsheet_values(spreadsheet_id, range_reading) # reading the spreadsheet
      current_pickup_row_counter = 4  # starting the counter from row 4
      cancel_row_counter = 0  # counter for autocancelling the return trip for the client
      response_reading.values.each do |row|
            # Searching for only current driver`s clients and making sure that the client has not been dropped off yet and was not cancelled
            if row[2] && row[2].downcase === driver_name && !row[0].downcase.include?('dropped off') && !row[0].downcase.include?('cancelled') && !row[0].downcase.include?('no show')
                    # checking for current client's name or no name provided (special case for break, going to oil change...)
                    if ((!row[7] && current_client_name == '') || row[7] === current_client_name)
                          if cancel_row_counter === 0
                              new_status = new_status << row[0]  # appending new status to the current status data
                          else
                              new_status = "autocancelled @ #{data['currentTime']} / " << row[0]  # appending "autocancelled" to the status
                          end
                          # verifying that current client pickup time match the time from driver's device, excluding 'autocancelling' from this action
                          if !new_status.include?('autocancelled') && row[3] != current_client_pickup_time
                            response_update = 'Client pickup time does not match'
                            break
                          end
                          ############################### update the cell logic goes here ####################
                          # Initialize the API
                          service = Google::Apis::SheetsV4::SheetsService.new
                          service.authorization = auth
                          service.authorization.fetch_access_token!

                          # https://docs.google.com/spreadsheets/d/1FCSYucWISilyzlLif7hwFsARVtn91k2hkxLNaaX18KY/edit
                          spreadsheet_id = '1_CuD_Szs7jkOYiz5nl1g16x_gnSfxd9wKc8GUrSwuHs'
                          range = "Schedule!A#{current_pickup_row_counter}" # current client status cell
                          request_body = Google::Apis::SheetsV4::ValueRange.new
                          request_body.major_dimension = "ROWS"
                          request_body.range = range
                          request_body.values = [[new_status]]
                          response_update = service.update_spreadsheet_value(spreadsheet_id, range, request_body, value_input_option: 'USER_ENTERED')
                                ####### check for the same client name cancellation ########
                                if data['newStatus'].include?('cancelled') || data['newStatus'].include?('no show')
                                  current_pickup_row_counter += 1
                                  cancel_row_counter += 1   # autocancelling the return trip for the client
                                else
                                  break
                                end
                                ####### end check for the same client name cancellation ########
                          ############################### end of update the cell logic ####################
                    else
                          current_pickup_row_counter += 1 # incrementing the counter thus looking for the right row
                    end
            else
                    current_pickup_row_counter += 1 # incrementing the counter thus looking for the right row
            end
      end
      #####
      render json: { updated_cells: response_update } # in response sending the respond status as a confirmation of success
    end
  end
end
