class User < ApplicationRecord
    has_secure_password
    validates :email, uniqueness: {case_sensitive: false}
    has_one :address, dependent: :destroy
    accepts_nested_attributes_for :address
    before_save :email_correct

    

    def email_correct
        self.email.downcase!
    end

end
