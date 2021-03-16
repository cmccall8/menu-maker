function getMenuItemsFromServer() {
	return fetch("https://menu-maker-app.herokuapp.com/menuitems");
}

function deleteMenuItemOnServer(menuItem) {
	return fetch("https://menu-maker-app.herokuapp.com/menuitems/" + menuItem._id, {
		method: "DELETE"
	})
};


function createMenuItemOnServer(menuItem) {
	console.log(menuItem);
	var menuItemData = "name=" + encodeURIComponent(menuItem.name);
	menuItemData += "&type=" + encodeURIComponent(menuItem.type);
	menuItemData += "&description=" + encodeURIComponent(menuItem.description);
	menuItemData += "&price=" + encodeURIComponent(menuItem.price);
	return fetch("https://menu-maker-app.herokuapp.com/menuitems", {
		method: "POST",
		body: menuItemData,
		headers: {"Content-Type": "application/x-www-form-urlencoded"}
	})
};

function updateMenuItemOnServer(menuItem) {
	var menuItemData = "name=" + encodeURIComponent(menuItem.name);
	menuItemData += "&type=" + encodeURIComponent(menuItem.type);
	menuItemData += "&description=" + encodeURIComponent(menuItem.description);
	menuItemData += "&price=" + encodeURIComponent(menuItem.price);
	console.log(menuItemData)
	return fetch("https://menu-maker-app.herokuapp.com/menuitems/" + menuItem._id, {
		method: "PUT",
		body: menuItemData,
		headers: {"Content-Type": "application/x-www-form-urlencoded"}
	})
};


var app = new Vue({
	el: '#app',
	data: {
		item_name: "",
		item_description: "",
		item_type: "",
		item_price: "",
		menu_items: [{}],
		edit_mode: "none",
		add_new_mode: false,
		main_dash_mode: false,
		front_facing_menu: true,
		errors: []
	},

	methods: {
		checkForErrors: function (e) {
			if (this.item_name && this.item_type) {
				return true;
			}
			this.errors = [];
			if (!this.item_name) {
				this.errors.push("You must name your menu item");
			}
			if (!this.item_type) {
				this.errors.push("You must assign a category to an item");
			}
		},

		frontFacingView: function () {
			this.front_facing_menu = true;
			this.main_dash_mode = false;
			this.add_new_mode = false;
		},

		newMenuItemMode: function () {
			this.add_new_mode = true;
			this.front_facing_menu = false;
			this.main_dash_mode = false;
		},

		mainDashMode: function () {
			this.main_dash_mode = true;
			this.front_facing_menu = false;
			this.add_new_mode = false;
			this.edit_mode = "none";
		},

		loadMenuItems: function() {
			getMenuItemsFromServer().then((response) => {
				response.json().then((data) => {
					console.log("menu items loaded from server:", data);
					this.menu_items = data;
					console.log(this.menu_items);
				});
			});
		},

		submitNewMenuItem: function () {
			
			createMenuItemOnServer({
				name: this.item_name,
				description: this.item_description,
				type: this.item_type,
				price: this.item_price
			//then must take in a fetch request
			}).then((response) => {
				if (response.status == 201) {
					console.log("submitted");
					this.loadMenuItems();
					this.mainDashMode();
				}
			})
			this.item_name = "";
			this.item_description = "";
			this.item_type = "";
			this.item_price = "";
		},

		updateMenuItem: function (item) {
			updateMenuItemOnServer(item).then((response) => {
				if (response.status == 200) {
					console.log("updated");
					this.loadMenuItems();
					this.mainDashMode();
				}
			})
		},

		deleteItem: function (item) {
			deleteMenuItemOnServer(item).then((response) => {
				response.json().then((data) => {
					console.log("menu item deleted from server: ", data);
					this.loadMenuItems();
				});
			});
		},

		editMenuItem: function(itemId) {
			this.edit_mode = itemId;
			console.log(itemId);
		},

	},

	created: function () {
		this.loadMenuItems();
	}
});