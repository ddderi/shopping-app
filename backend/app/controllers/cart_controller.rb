class CartController < ApplicationController
  def show
    if session[:cart_id]
      cart = OrderItem.where(cart_id: @current_user.id)
      render json: cart
    else
      render json: {
               connected: false,
               message: "You have to be connected to have access to your cart",
             }
    end
  end

  def destroy
    @cart_user.destroy
    if @cart_user.destroy
      render json: {
        message: "cart reset",
        cart: @cart_user,
      }
    else
      render json: {
        error: "problem",
      }
    end
  end
end
