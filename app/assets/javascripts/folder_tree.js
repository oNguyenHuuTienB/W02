$(document).on("turbolinks:load", function() {
  initFolderTree.init();
  rightBoxFolderOption.init();
})

var initFolderTree = {
  constructor: {
    trigger: "#js-FolderTree",
    folderId: ""
  },
  init: function(){
    var self = this;
    var constructor = self.constructor;
    if ($(constructor.trigger).length > 0){
      self.initTree();
      self.showFolderContent();
      whenClickFolderNameOnList.init()
    }
  },
  initTree: function(){
    var self = this;
    var constructor = self.constructor;
    $(constructor.trigger).jstree({
      "core": {
        "data": {
          "url": "/folders",
          "dataType": "json"
        },
        "multiple" : false
      }
    });
  },
  showFolderContent: function(){
    var self = this;
    var constructor = self.constructor;
    $(constructor.trigger).on("select_node.jstree", function(e, data){
      if (data.node && constructor.folderId != data.node.id){
        constructor.folderId = data.node.id;
        self.getFolderContent(constructor.folderId);
      }
    });
    $(constructor.trigger).on("ready.jstree", function(e, data){
      constructor.folderId = $(constructor.trigger).jstree(true).get_selected()[0];
      self.getFolderContent(constructor.folderId);
    });
  },
  getFolderContent: function(folder_id){
    var self = this;
    var constructor = self.constructor;
    if (folder_id){
      $.ajax({
        url: "/folders/" + folder_id,
        dataType: "script",
        success: function(data){
          rightBoxFolderOption.checkToShowRightColumn();
        }
      });
    }
  }
}

var rightBoxFolderOption = {
  constructor: {
    trigger: ".js-checkbox",
    rightBox: "#js-rightBoxFolderOption"
  },
  init: function(){
    var self = this;
    var constructor = self.constructor;
    self.change();
  },
  change: function(){
    var self = this;
    var constructor = self.constructor;
    $(document).on("change", constructor.trigger, function(){
      self.checkToShowRightColumn();
      self.checkBackgroundRow(this);
    });
  },
  checkToShowRightColumn: function(){
    var self = this;
    var constructor = self.constructor;
    if ($(".js-checkbox:checked").length > 0) {
      $(constructor.rightBox).removeClass("o-hidden");
    }else{
      $(constructor.rightBox).addClass("o-hidden");
    }
  },
  checkBackgroundRow: function(row){
    var self = this;
    var constructor = self.constructor;
    if ($(row).is(':checked')){
      $(row).closest("tr").addClass("file-cover-color");
    }else{
      $(row).closest("tr").removeClass("file-cover-color");
    }
  }
}

var whenClickFolderNameOnList = {
  constructor: {
    trigger: "#js-FolderTree",
    folderName: ".js-folderName",
    folderId: ""
  },
  init: function(){
    var self = this;
    var constructor = self.constructor;
    self.change();
  },
  change: function(){
    var self = this;
    var constructor = self.constructor;
    $(document).on("click", constructor.folderName, function(){
      constructor.folderId = $(this).closest("tr").find(":checkbox").val();
      self.triggerSelectFolder(constructor.folderId);
    });
  },
  triggerSelectFolder: function(folder_id){
    var self = this;
    var constructor = self.constructor;
    var node = $(constructor.trigger).jstree(true).get_node(folder_id);
    if (node){
      $(constructor.trigger).jstree(true).deselect_all();
      $(constructor.trigger).jstree(true).select_node(node);
    }
  }
}
