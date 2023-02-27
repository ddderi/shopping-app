# if Rails.env == "production"

# Rails.application.config.session_store :cookie_store, key: "_authentification_app", domain: "http://localhost:3000"

# else 
Rails.application.config.session_store :cookie_store, key: "_shopping_auth_app"
# end


# first if, is for production, when theapp is deploy, other NO DOMAIN if devlopment env is running