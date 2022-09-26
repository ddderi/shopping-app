module CurrentUserConcern
    extend ActiveSupport::Concern 

included do
    before_action :set_current_user
end

def set_current_user
    if session[:cart_id]
        @current_user = User.find_by(id: session[:cart_id])
        @cart_user = Cart.find_or_create_by(id: @current_user.id)
    end
end

end