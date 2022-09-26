class OrderItem < ApplicationRecord
  belongs_to :product
  # belongs_to :order
  belongs_to :cart

  validates :quantity, numericality: { greater_than: 0, message: "Minimum quantity : 1" }
  validate :totalprice


  def totalprice
    self.total = (self.quantity)*(self.unit_price)
  end




end
