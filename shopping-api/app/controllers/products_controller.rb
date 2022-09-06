class ProductsController < ApplicationController

    def index
        products = Product.all
        render json: {
            products: products
        }
    end

    def create
        product = Product.new(product_params)
        if product.save
            render json: {
                status: :created,
                product: product.slice(:id, :name, :description, :price),
                message: "Product created"
            }
        else 
            render json: {
                status: 500,
                message: "Product not created"
            }
        end
    end

    def update

    end

    def destroy

    end

    private
    def product_params
        params.require(:product).permit(:name, :description, :price)
    end
end