class ProductsController < ApplicationController
  def index
    products = Product.all
    render json: {
             products: products,
           }
  end

  def indexx
    products = Product.all.map { |prod| ProductSerializer.new(prod).serializable_hash[:data][:attributes] }

    render json: products
  end

  def create
    product = Product.new(product_params)
    if product.save
      render json: {
               status: :created,
               product: product,
               message: "Product created",
             }
      # .slice(:id, :name, :description, :price, :image)
    else
      render json: {
               status: 500,
               message: "Product not created",
             }
    end
  end

  def update
  end

  def destroy
    product = Product.find(params[:id])
    product.destroy
    if product.destroy
      render json: {
               message: "product deleted",
             }
    else
      render json: {
               message: "problem appears",
             }
    end
  end

  private

  def product_params
    params.require(:product).permit(:name, :description, :price, :image)
  end
end
