class FoldersController < ApplicationController
  include FoldersHelper

  def index
    @folders_tree = Folder.roots
    respond_to do |format|
      format.html
      format.json{render json: to_json_tree(Folder.all)}
    end
  end

  def show
    @folder = Folder.find_by(id: params[:id])
    @folder_contents = @folder.children
    @files = @folder.try(:files)
    respond_to do |format|
      format.html
      format.js{render layout: false}
    end
  end

  def create
  end
end
