require 'rails_helper'

RSpec.describe Api::V1::PortfolioController, type: :controller do

  let!(:user_1) {User.create(
        first_name: "John", last_name: "Smith", email: "thesmith@yahoo.com",
        password: "password", address: '100 Main st.', city: 'Lynn',
        state: 'MA', zip: '01990', phone: '222-111-5555', portfolio: nil )}
  let!(:user_2) {User.create(
        first_name: "Anthony", last_name: "Blah", email: "blah@google.com",
        password: "password", address: '77 Seventh st', city: 'Plymouth',
        state: 'MA', zip: '02450', phone: '215-123-1432', portfolio: 'APPL,MSFT' )}
  let!(:admin) {User.create(
        first_name: "Admin", last_name: "Shiny", email: "admin@admin.com",
        password: "admin123", address: '99 Main st.', city: 'Reading',
        state: 'CT', zip: '01991', phone: '689-123-5435',
        admin: true )}


    describe "PUT#update" do
#  Acceptance Criteria:
#  [x] If I am logged in as a user, I can add new stock to my portfolio
      it "should return user portfolio string upon successful update" do
        data = { "add"=> "GGL" }.to_json
        sign_in user_1
        put(:update , params: { id: user_1.id } , body: data)

        expect(response.status).to eq 200
        expect(response.body).to be_kind_of(String)
        expect(response.body).to eq("GGL")
      end

      it "should add new item to the string, dividing it with comma" do
        data = { "add"=> "GGL" }.to_json
        sign_in user_2
        put(:update , params: { id: user_2.id } , body: data)

        expect(response.status).to eq 200
        expect(response.body).to be_kind_of(String)
        expect(response.body).to eq("APPL,MSFT,GGL")
      end

      it "should ignore the request with empty value" do
        data = { "add"=> "" }.to_json
        sign_in user_2
        put(:update , params: { id: user_2.id } , body: data)

        expect(response.status).to eq 200
        expect(response.body).to be_kind_of(String)
        expect(response.body).to eq("APPL,MSFT")
      end

      it "should ignore the request with 'space' value" do
        data = { "add"=> " " }.to_json
        sign_in user_2
        put(:update , params: { id: user_2.id } , body: data)

        expect(response.status).to eq 200
        expect(response.body).to be_kind_of(String)
        expect(response.body).to eq("APPL,MSFT")
      end

# [x] If I am not signed in, I can't add new stock to user's portfolio
      it "should return error if the user is not authenticated" do
        data = { "add"=> "GGL" }.to_json
        put(:update , params: { id: user_1.id } , body: data)

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json["error"]).to eq("You are not authorized")
      end

#  [x] If I am logged in as a user, I can delete stock items from my portfolio
      it "should return user portfolio string upon successful update" do
        data = { "delete"=> "APPL" }.to_json
        sign_in user_2
        put(:update , params: { id: user_2.id } , body: data)

        expect(response.status).to eq 200
        expect(response.body).to be_kind_of(String)
        expect(response.body).to eq("MSFT")
      end

      it "should delete the corresponding item and comma from portfolio" do
        data = { "delete"=> "MSFT" }.to_json
        sign_in user_2
        put(:update , params: { id: user_2.id } , body: data)

        expect(response.status).to eq 200
        expect(response.body).to be_kind_of(String)
        expect(response.body).to eq("APPL")
      end

#  [x] If delete request has wrong itme name, nothing gets deleted
      it "should return user portfolio string upon successful update" do
        data = { "delete"=> "XXX" }.to_json
        sign_in user_2
        put(:update , params: { id: user_2.id } , body: data)

        expect(response.status).to eq 200
        expect(response.body).to be_kind_of(String)
        expect(response.body).to eq("APPL,MSFT")
      end

# [x] If I am not signed in, I can't delete items from user's portfolio
      it "should return error if the user is not authenticated" do
        data = { "delete"=> "MSFT" }.to_json
        put(:update , params: { id: user_2.id } , body: data)

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json["error"]).to eq("You are not authorized")
      end

    end
end
