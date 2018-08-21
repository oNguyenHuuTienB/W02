$(document).on("turbolinks:load", function() {
  initFolderTree.init();
})

var initFolderTree = {
  constructor: {
    trigger: "#js-FolderTree",
  },
  init: function(){
    var self = this;
    var constructor = self.constructor;
    if ($(constructor.trigger).length > 0){
      $(constructor.trigger).jstree({
        "core": {
          "data": {
            "url": "/folders",
            "dataType": "json"
          }
        }
      });
    }
  }
}
