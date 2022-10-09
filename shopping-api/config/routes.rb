Rails.application.routes.draw do
  
  resources :orders, only: [:create, :index]
  get '/cart', to: 'cart#show'
  resources :order_items, only: [:create, :update, :destroy]  
  resources :products
  resources :shops, only: [:index, :show]
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  resources :users, only: [:create, :new, :update]

  
end
