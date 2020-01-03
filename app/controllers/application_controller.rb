class ApplicationController < ActionController::Base
  before_action :authenticate_request
   attr_reader :current_user
   skip_before_action :verify_authenticity_token
    protect_from_forgery prepend: true, with: :null_session
 
   private
 
   def authenticate_request
     @current_user = AuthorizeApiRequest.call(request.headers).result
     render json: { error: 'Not Authorized' }, status: 401 unless @current_user
   end
 end