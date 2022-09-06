class ShopsController < ApplicationController
  def index
    products = Product.all
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
