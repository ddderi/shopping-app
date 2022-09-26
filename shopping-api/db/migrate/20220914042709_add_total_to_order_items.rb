class AddTotalToOrderItems < ActiveRecord::Migration[7.0]
  def change
    add_column :order_items, :total, :integer
    add_column :order_items, :unit_price, :integer
  end
end
