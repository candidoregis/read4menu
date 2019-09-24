// Get references to page elements
// var $menuItemTitle = $("#menuItem-text");
var $menuItemCategory = $("#menuItem-category");
var $menuItemTitle = $("#menuItem-title");
var $menuItemDescription = $("#menuItem-description");
var $submitBtn = $("#submit");
var $menuItemList = $("#menuItem-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveMenuItem: function(menuItem) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/menuItems",
      data: JSON.stringify(menuItem)
    });
  },
  getMenuItems: function() {
    return $.ajax({
      url: "api/menuItems",
      type: "GET"
    });
  },
  deleteMenuItem: function(id) {
    return $.ajax({
      url: "api/menuItems/" + id,
      type: "DELETE"
    });
  }
};

// refreshMenuItems gets new menuItems from the db and repopulates the list
var refreshMenuItems = function() {
  API.getMenuItems().then(function(data) {
    var $menuItems = data.map(function(menuItem) {
      console.log(data);
      var $a = $("<a>")
        .text(menuItem.title)
        .attr("href", "/menuItem/" + menuItem.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": menuItem.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $menuItemList.empty();
    $menuItemList.append($menuItems);
  });
};

// handleFormSubmit is called whenever we submit a new menuItem
// Save the new menuItem to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var menuItem = {
    category: $menuItemCategory.val().trim(),
    title: $menuItemTitle.val().trim(),
    description: $menuItemDescription.val().trim()
  };

  if (!(menuItem.title && menuItem.description && menuItem.category )) {
    alert("You must enter an menuItem title and description!");
    return;
  }

  API.saveMenuItem(menuItem).then(function() {
    refreshMenuItems();
  });

  $menuItemCategory.val("");
  $menuItemTitle.val("");
  $menuItemDescription.val("");
};

// handleDeleteBtnClick is called when an menuItem's delete button is clicked
// Remove the menuItem from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteMenuItem(idToDelete).then(function() {
    refreshMenuItems();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$menuItemList.on("click", ".delete", handleDeleteBtnClick);
