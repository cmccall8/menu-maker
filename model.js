const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cmccall8:YSQ8hF647UMe@claire.nggfj.mongodb.net/Claire?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})


const MenuItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Menu item name is required']
	},
	type: {
		type: String,
		required: [true, 'A category must be assigned']
	},
	description: {
		type: String
	},
	price: {
		type: String
	}
});

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);

module.exports = {
	MenuItem: MenuItem
}