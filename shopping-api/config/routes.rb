Rails.application.routes.draw do

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#logout"
  # post '/auth/google_oauth2', to: 'sessions#omniauth'
  get :logged_in, to: "sessions#logged_in"
  resources :users, only: [:create, :new, :update]
end
