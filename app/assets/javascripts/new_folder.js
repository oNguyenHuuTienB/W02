var new_folder_popup = {
  constructor: {
    trigger: "#js-new-folder",
    target: "#js-new-folder-form"
  },
  init: function(){
    var self = this;
    self.action();
  },
  action: function(){
    var self = this;
    var constructor = self.constructor;
    $(document).on("click", constructor.trigger, function(){
      self.popup();
    });
  },
  popup: function(){
    var self = this;
    var constructor = self.constructor;
    $.magnificPopup.open({
      closeBtnInside: true,
      showCloseButton: true,
      items: {
        type: "inline",
        closeOnBgClick: true,
        src: constructor.target
      },
      callbacks: {
        open: function(){

        },
        close: function(){

        }
      }
    });
  }
}

var choose_parent_folder = {
  constructor: {
    trigger: "#js-FolderTree",
    target: ".js-folder-parent"
  },
  init: function(){
    var self = this;
    self.action();
  },
  action: function(){
    var self = this;
    var constructor = self.constructor;
    $(constructor.trigger).on("select_node.jstree", function(e, data){
      $(constructor.target).val(data.node.id);
    });
  }
}

$(document).on("turbolinks:load", function(){
  choose_parent_folder.init();
  $(".datetime-picker").datetimepicker();
  new_folder_popup.init();
});
