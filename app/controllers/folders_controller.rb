class FoldersController < ApplicationController
  include FoldersHelper

  def index
    # @folders_tree = Folder.roots
    respond_to do |format|
      format.html
      format.json{render json: to_json_tree(Folder.all)}
    end
  end

  def new
    @folder = Folder.new folder_params
  end

  def create
    @folder = Folder.create folder_params
    respond_to do |format|
      format.js{render layout: false}
    end
  end

  def show
  end

  def destroy
  end

  private
  def folder_params
    params.require(:folder).permit(Folder::ALLOW_PARAMS)
  end
end
