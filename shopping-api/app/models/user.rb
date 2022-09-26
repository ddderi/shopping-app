class User < ApplicationRecord
    has_secure_password
    has_many :orders
    has_one :cart
    validates :email, uniqueness: {case_sensitive: false}
    has_one :address, dependent: :destroy
    accepts_nested_attributes_for :address
    before_save :email_correct

    

    def email_correct
        self.email.downcase!
    end

end
