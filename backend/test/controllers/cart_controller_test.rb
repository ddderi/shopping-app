require "test_helper"

class CartControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get cart_path
    assert_response :success
  end


  
end


