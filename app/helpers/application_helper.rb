module ApplicationHelper
  def display_categories categories
    ret = ""
    ret += "<ul>"
    categories.each do |category|
      if category.parent_id == nil
        ret += "<li> #{category.name}"
        ret += find_all_subcategories(category)
      end
    end
    ret += "</ul>"
    ret
  end

  def find_all_subcategories category
    ret = ""
    if category.children.size > 0
      ret += "<ul>"
      category.children.each do |sub_category|
        ret += "<li> #{sub_category.name}"
        ret += find_all_subcategories(sub_category)
        ret += "</li>"
      end
      ret += "</ul>"
    end
    ret
  end
end
