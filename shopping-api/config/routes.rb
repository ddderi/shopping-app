Rails.application.routes.draw do
  
  post '/orders', to: 'orders#create', as: 'checkout'
  get '/orders', to: 'orders#index'
  # resources :order_items, only: [:create]
  get '/cart', to: 'cart#show'
  post '/cart', to: 'cart#destroy'
  delete '/cart', to: 'cart#destroy'

  patch '/order_items/:id', to: 'order_items#update', as: 'remove'
  post '/order_items', to: 'order_items#create', as: 'add_to_cart'
  # post '/cart', to: 'cart#add_to_cart', as: 'add_to_cart'
  delete '/order_items/:id', to: "order_items#destroy", as: 'remove_cart'

  get '/index', to: 'products#indexx'
  resources :products
  resources :shops, only: [:index, :show]
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#logout"
  # post '/auth/google_oauth2', to: 'sessions#omniauth'
  get :logged_in, to: "sessions#logged_in"
  resources :users, only: [:create, :new, :update]
end
