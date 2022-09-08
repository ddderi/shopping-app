class ProductSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :description, :price, :image, :image_url
end
