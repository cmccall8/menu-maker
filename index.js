const express = require('express')
const app = express()
const cors = require('cors')
const model = require('./model')


const port = process.env.PORT || 3000

app.use(express.urlencoded({extended:false}));
app.use(cors())
app.use(express.static('public'))

app.get("/menuitems", (req,res) => {
	model.MenuItem.find().then((data) => {
		console.log("Menu items queried from db:", data)
		res.json(data)
	})
})

/*app.get("/menu/:mItemId", (req,res) => {
	model.MenuItem.findOne({ _id: req.params.mItemId }).then((data) => {
		if (data) {
			res.json(data)
		} else {
			res.sendStatus(404)
		}
	})
})*/

app.post("/menuitems", (req, res) => {
	var newMenuItem = new model.MenuItem({
		name: req.body.name,
		type: req.body.type,
		description: req.body.description,
		price: req.body.price
	})
	newMenuItem.save().then(() => {
		res.sendStatus(201)
	}).catch(function (err) {
		if (err.errors) {
			var messages = {};
			for (var e in err.errors) {
				messages[e] = err.errors[e].message;
				res.status(422).json(messages);			}
		} else {
			res.sendStatus(500)
		}
	})
})

app.put("/menuitems/:mItemId", (req, res) => {
	model.MenuItem.findOne({ _id: req.params.mItemId }).then((data) => {
		if (data) {
			data.name = req.body.name,
			data.type =  req.body.type,
			data.description = req.body.description,
			data.price = req.body.price,

			data.save().then(() => {
				console.log("Menu Item Updated")
				res.sendStatus(200)
			})
		} else {
			res.sendStatus(400)
		}
		}).catch((err) => {
			res.sendStatus(400)
	})
})

app.delete("/menuitems/:mItemId", (req, res) => {
	model.MenuItem.deleteOne({ _id: req.params.mItemId }).then((data) => {
		if (data) {
			res.json(data)
			console.log("delete success")
			res.sendStatus(200)
		} else {
			res.sendStatus(400)
		}
	})
})

app.listen(port, () => {
	console.log(`app listening at ${port}`)
})