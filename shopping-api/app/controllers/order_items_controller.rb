class OrderItemsController < ApplicationController
  def create
    orderitem = OrderItem.new(orderitem_params)

    if orderitem.save
      render json: {
               order_item: orderitem,
               status: :added,
               message: "Added to the cart",
             }
    else
      render json: orderitem.errors
    end
  end

  def update
    orderitem = OrderItem.find(params[:id])
    orderitem.update(quantity: params[:order_item][:quantity])

    if orderitem.update(quantity: params[:order_item][:quantity])
      render json: orderitem
    else
      render json: orderitem.errors
    end
  end

  def destroy
    orderitem = OrderItem.find(params[:id])

    orderitem.destroy
    if orderitem.destroy
      render json: {
               status: "deleted",
               message: "Product deleted",
             }
    else render json: {
      error: orderitem.errors,
    }     end
  end

  private

  def orderitem_params
    params.require(:order_item).permit(:quantity, :product_id, :unit_price, :total, :cart_id)
  end
end
