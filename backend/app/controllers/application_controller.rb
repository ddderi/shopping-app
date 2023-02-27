class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  before_action :current_user

  def current_user
    if session[:cart_id]
      @current_user = User.find_by(id: session[:cart_id])
      @cart_user = Cart.find_or_create_by(id: @current_user.id, user_id: @current_user.id)
    end
  end
end
