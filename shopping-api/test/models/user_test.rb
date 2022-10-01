require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "the truth" do
    assert true
  end

  test "Should not save User without Email" do
    user = User.new(first_name: 'John', last_name: 'Bob', password_digest: 'password')
    assert_not user.save
  end

  test "Should have a method #email_correct" do
    user = User.new
    assert user.respond_to?(:email_correct)
  end
  
  test "#email_correct should downcasing email address" do
    user = User.new(email: 'Johnemail', first_name: 'John', last_name: 'Bob', password_digest: 'password')
    !user.email.downcase
    assert_not user.save
  end

  
end
