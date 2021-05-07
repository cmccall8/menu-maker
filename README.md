# MENU MAKER APP
This project was done as part of my degree for a web application development course. The application allows authenticated users to add menu items to a restaurant menu. Those entries are then formatted for a public front-facing UI.
### CLIENT URL:
https://menu-maker-app.herokuapp.com/

### RESOURCE and ATTRIBUTES
Menu Items
* item name
* item description
* item price
* item category

### DATA MODEL/SCHEMA
name: 
* type: String,
* required: [true, 'Menu item name is required']
	
type: 
* type: String,
* required: [true, 'A category must be assigned']

description: 
* type: String

price: 
* type: String



### REST ENDPOINTS
1. GET /menuitems
2. POST /menuitems
3. PUT /menuitems/id

4. DELETE /menuitems/id
