Rails.application.routes.draw do
  devise_for :users
  # devise_for :users, :controllers => { :registrations => "users/registrations" }
  resources :users, only: [:index, :show, :destroy, :edit, :update]
  resources :jobapplications
  root 'static_pages#homepage'
  resources :pickups, only: [:index, :show, :edit], to: 'static_pages#index'
  resources :information, only: [:index, :show, :edit], to: 'static_pages#index2'

  namespace :api do
    namespace :v1 do
      resources :pickups, only: [:index, :update]
      resources :users, only: [:index, :update, :show]
    end
  end
end
