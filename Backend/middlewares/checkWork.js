module.exports = (req, res, next) => {
	try{
		console.log("checkWork enter.");
		const host = req.get('host');
		console.log("1 host: " + host);
		const title = req.body.title.trim() ?? undefined;
		console.log("2 title: " + title);
		const categoryId = parseInt(req.body.category) ?? undefined;
		console.log("3 req.body.category: " + req.body.category);
		console.log("3 categoryId: " + categoryId);
		//const userId = req.auth.userId ?? undefined;
		console.log(`req protocol:        ${req.protocol}`);
		console.log(`host/images/reqfilefilename:        //${host}/images/${req.file.filename}`);
		console.log("")
		const imageUrl = `${req.protocol}://${host}/images/${req.file.filename}` ?? undefined;
		console.log("4 imageUrl: " + imageUrl)
	console.log(title,categoryId/*,userId*/,imageUrl)
		if(title !== undefined &&
			title.length > 0 &&
			categoryId !== undefined &&
			categoryId > 0 &&
			/*userId !== undefined &&
			userId > 0 &&*/
			imageUrl !== undefined){//
			req.work = {title, categoryId, userId, imageUrl}
			console.log("5 req.work: " + req.work);
			next()
		}else{
			return res.status(400).json({error: new Error("Bad Request")})
		}
	}catch(e){
		console.error("Something wrong occured in checkWork.");
		return res.status(500).json({error: new Error("Something wrong occured in checkWork.")});
	}

}
