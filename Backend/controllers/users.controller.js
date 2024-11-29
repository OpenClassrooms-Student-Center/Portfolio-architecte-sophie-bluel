const db = require('./../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = db.users;
//const logger = require("../logger/logFile");

exports.signup = async (req, res) => {
	if(!req.body.email){// || !req.body.password){
		return res.status(400).send({
			message: "Must have email"// and password"
		});
	}
	try{
		const hash = await bcrypt.hash(req.body.password, 10)
		const user = {
			email: req.body.email,
			password: hash
		}
		await Users.create(user)
		return res.status(201).json({message: 'User Created'})
	}catch (err){
		return res.status(500).send({
			message: err.message
		});
	}

}

exports.login = async (req, res) => {
	console.log("user controller enter..."); //logger.log("user controller enter...", "backend");
	const user = await Users.findOne({where: {email: "sophie.bluel@test.tld"}});//req.body.email}});
	if(user === null){
		console.log("user not found");
		return res.status(404).json({message: 'user not found'});
	}else {
		/*const valid = await bcrypt.compare(req.body.password, user.password)
		if(!valid){
			return res.status(401).json({ error: new Error('Not Authorized') })
		}*/
		console.log("login OK");
		return res.status(200).json({
			userId: user.id,
			token: jwt.sign(
				{userId : user.id},
				process.env.TOKEN_SECRET,
				{ expiresIn: '24h' }
			)
		})
	}
}
