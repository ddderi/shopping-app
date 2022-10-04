class SessionsController < ApplicationController
    # include CurrentUserConcern


    def create
      user = User.find_by(email: (params[:user][:email].downcase))
       if user 
        user.authenticate(params[:user][:password])
        # session[:cart] ||= []
        session[:cart_id] = user.id 
        render json: {
          status: :created,
          logged_in: true,
          user: user,
          message: 'succesfully connected'
        }
        else 
             render json: {
                status: :unconnected,
                message: 'Incorrect email or password'
             }
        end
      # else
      #    render json: {
      #     message: 'Email not found',
      #     logged_in: false,
      #     status: :unconnected,
      #    }
      # end
    end

    def logged_in
        if @current_user
          render json: {
            logged_in: true,
            user: @current_user
          }
        else
          render json: {
            logged_in: false
          }
        end
    end


    def logout
      reset_session
      render json: { 
              status: 200, 
              logged_out: true,
              message: "Succesfully disconnected"
            }
    end

    def omniauth
      
    end

    private 

    def session_params
      params.require(:users).permit(:user, :session, :email, :correct, :password)
    end

end
