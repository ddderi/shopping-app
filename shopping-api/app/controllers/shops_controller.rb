class ShopsController < ApplicationController
  def index
    # products = Product.all
    # render json: {
    #   products: products
    # }
    products = Product.all.map{|prod| ProductSerializer.new(prod).serializable_hash[:data][:attributes] }
        
        render json: {
            products: products
    }
  end

  def show
    product = Product.find(params[:id])
    render json: {
      product: product
    }
  end
end
