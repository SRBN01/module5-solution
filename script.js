
(function (global) {
  var dc = {};


  var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
  var homeHtmlUrl = "snippets/home-snippet.html";
  var categoriesTitleHtml = "snippets/categories-title-snippet.html";
  var categoryHtml = "snippets/category-snippet.html";
  var menuItemsUrl = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
  var menuItemsTitleHtml = "snippets/menu-items-title.html";
  var menuItemHtml = "snippets/menu-item.html";


  function chooseRandomCategory(categories) {
    var randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex].short_name;
  }


  function loadHomeSnippets() {
    $ajaxUtils.sendGetRequest(
      homeHtmlUrl,
      function (responseText) {
        document.querySelector("#main-content").innerHTML = responseText;
      
        $ajaxUtils.sendGetRequest(
          allCategoriesUrl,
          function (categories) {
            var randomCategoryShortName = chooseRandomCategory(categories);
            var specialLink = document.querySelector("#specials-tile a");
            specialLink.setAttribute("onclick", "$dc.loadMenuItems('" + randomCategoryShortName + "');");
          },
          true); // false here because we want to use JSON.parse on the response
      },
      false); // false here because we want to use JSON.parse on the response
  }


  dc.loadHomeSnippets = loadHomeSnippets;


  global.$dc = dc;
})(window);
