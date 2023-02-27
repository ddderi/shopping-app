require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "Should not save User without Email" do
    user = User.new(first_name: "John", last_name: "Bob", password_digest: "password")
    assert_not user.save
  end

  test "Should not save User without password #has secure password helper" do
    user = User.new(first_name: "John", last_name: "Bob", email: "testemail@")
    assert_not user.save
  end

  test "Should have a method #email_correct that downcase the email user" do
    user = User.new
    assert user.respond_to?(:email_correct)
  end

  test "should downcase user email before saving " do
    user = User.new(email: "Test", first_name: "John", last_name: "Bob", password_digest: "password")
    email = user.email_correct
    
    assert_equal(email, user.email)
  end
end
