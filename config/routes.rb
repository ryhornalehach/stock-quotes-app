Rails.application.routes.draw do
  devise_for :users
  # devise_for :users, :controllers => { :registrations => "users/registrations" }
  resources :users, only: [:index, :show, :destroy, :edit, :update]
  root 'static_pages#homepage'
  resources :mycabinet, only: [:index], to: 'static_pages#index'

  namespace :api do
    namespace :v1 do
      resources :stock, only: [:index, :update]
      resources :forex, only: [:index, :update]
    end
  end
end
