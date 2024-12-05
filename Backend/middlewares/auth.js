const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	try {
		console.log("auth's req.headers.authorization: " + req.headers.authorization);
		/*const token = req.headers.authorization.split(' ')[1]
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
		const userId = decodedToken.userId
		req.auth = { userId }
		if (req.body.userId && req.body.userId !== userId) {
			throw 'Invalid user ID'
		} else {*/
			next()
		//}
	} catch {
		res.status(401).json({
			error: new Error('You are not authenticated.')
		}),
		res.status(403).json({
			error: new Error("You're not allowed.")
		}),
		res.status(500).json({
			error: new Error("Default server error...")
		})
	}
}