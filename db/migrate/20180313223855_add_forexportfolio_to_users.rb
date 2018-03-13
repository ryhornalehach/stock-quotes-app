class AddForexportfolioToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :forexportfolio, :string
  end
end
