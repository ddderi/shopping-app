class AddItemsToOrders < ActiveRecord::Migration[7.0]
  def change
    add_column :orders, :items, :string, array: true
  end
end
