class Address < ApplicationRecord
  belongs_to :user

  validates :city, :state, :zipcode, :street_address_1, :presence => {:message => "must be complete"}

end
