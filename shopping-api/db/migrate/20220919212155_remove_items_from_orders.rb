class RemoveItemsFromOrders < ActiveRecord::Migration[7.0]
  def change
    remove_column :orders, :items, :string
    remove_column :orders, :subtotal, :decimal
  end
end
