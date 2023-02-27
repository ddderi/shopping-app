# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins "http://localhost:3001"
      # "*" eveyrone can request API
  
      resource "*",
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head],
        credentials: true
        # credentials are essential otherwise cannot pass cookies data from back to front
    end

# bellow is for the production => when the app will be on a server like heroku : change le origines for the heroku URL 

    # allow do
    #     origins "http://localhost:3000"
    #     # "*" eveyrone can request API
    
    #     resource "*",
    #       headers: :any,
    #       methods: [:get, :post, :put, :patch, :delete, :options, :head],
    #       credentials: true
    #       # credentials are essential otherwise cannot pass cookies data from back to front
    #   end



  end