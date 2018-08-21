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
  end

  def create
  end
end
