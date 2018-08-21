class Folder < ApplicationRecord
  acts_as_tree order: "name asc"

  PARAMS_LIST = [:parent_id, :name, :public_date, :memo]

  validates :name, presence: true, uniqueness: true
  validates :public_date, presence: true
end
