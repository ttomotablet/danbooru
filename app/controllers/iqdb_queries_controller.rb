class IqdbQueriesController < ApplicationController
  respond_to :html, :json

  def show
    if params[:url]
      @matches = IqdbProxy.query(params[:url])
    end

    if params[:post_id]
      @matches = IqdbProxy.query(Post.find(params[:post_id]).preview_file_url)
    end

    if params[:matches]
      @matches = IqdbProxy.decorate_posts(JSON.parse(params[:matches]))
    end

    respond_with(@matches) do |fmt|
      fmt.html

      fmt.html.xhr do
        render layout: false
      end
      
      fmt.json do
        render json: @matches
      end
    end
  end
end
