class ProductsController < ApplicationController

    def index
        
        products = Product.all
        render json: {
            products: products
        }
    #     products = Product.all.map{|prod| ProductSerializer.new(prod).serializable_hash[:data][:attributes] }
        
    #     render json: {
    #         products: products
    # }
    end


    def indexx
        products = Product.all.map{|prod| ProductSerializer.new(prod).serializable_hash[:data][:attributes] }
        
        render json: products
        # ProductSerializer.new(product).serializable_hash[:data][:attributes]
        # products = Product.all
        # render json: {
        #     products: products
        # }
    end

    def create
        product = Product.new(product_params)
        if product.save
            render json: {
                status: :created,
                product: product,
                message: "Product created"
            }
            # .slice(:id, :name, :description, :price, :image)
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
        params.require(:product).permit(:name, :description, :price, :image)
    end
end