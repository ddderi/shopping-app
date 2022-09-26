class Product < ApplicationRecord
    has_one_attached :image
    has_many :order_items, dependent: :destroy

    def image_url
        Rails.application.routes.url_helpers.url_for(image) if image.attached?
    end


   

end