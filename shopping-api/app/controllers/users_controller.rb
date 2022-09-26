class UsersController < ApplicationController


    def create
        user = User.new(user_params)
        if user.save
            session[:cart] ||= []
            session[:cart_id] = user.id
            render json: {
                status: :created,
                logged_in: true,
                user: user
            }
        else 
            render json: { status: 500,
                        errors: user.errors.full_messages    
        }
        end
        
    end

    def update
        user = User.find(session[:cart_id])
        if user.authenticate(params[:user][:password])
            if params[:user][:edit_password] == params[:user][:edit_password_confirmation] 
             user.update(password: params[:user][:edit_password], 
             password_confirmation: params[:user][:edit_password_confirmation],
             manager: params[:user][:manager]) 
                
            render json: {
                status: :updated,
                logged_in: true,
                user: user
            }
            else
            render json: { status: 500,
                    message: "Password doesn't match password confirmation" 
                        }
            end
        else 
             render json: { status: 500,
                        message: "Your current Password is not right" 
                        }
        end
    end



private 

def user_params
    params.require(:user).permit(:email,
    :password, 
    :password_confirmation, 
    :edit_password,
    :edit_password_confirmation,
    :first_name,
    :last_name,
    address_attributes: [
        :street_address_1,
        :street_address_2,
        :city,
        :state,
        :zipcode,
    ])
end   

end