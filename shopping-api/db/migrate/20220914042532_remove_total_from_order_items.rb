class RemoveTotalFromOrderItems < ActiveRecord::Migration[7.0]
  def change
    remove_column :order_items, :total, :string
    remove_column :order_items, :unit_price, :string
  end
end
