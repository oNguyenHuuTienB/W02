module FoldersHelper

  def to_json_tree folders, folder_selected = Folder.roots.try(:last).try(:id)
    folders.map do |f|
      {id: f.id, text: f.name, parent: (f.parent_id || "#"), state: {selected: f.id == folder_selected}}
    end
  end
end
