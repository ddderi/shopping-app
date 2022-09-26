class OrdersController < ApplicationController

    def index
        orders = Order.where(user_id: @current_user)
        render json: {
            orders: orders,
        }
    end

    def create 
        order = Order.new(order_params)
        if order.save
            render json: {
                order: order,
                status: 'created',
                
            }
        else 
            render json: {
                errors: order.errors,
                message: 'order not created'
            }
        end

    end   


    private 
    def order_params
        params.require(:order).permit(:total, :user_id)
    end


end