module.exports = (req, res, next) => {
	try{
		console.log("0 checkWork enter.");
		console.log("0.1 req: " + req, new Date().toLocaleTimeString());
		/*const host = req.get('host');
		console.log("1 req.get('host'): " + host, new Date().ToLocaleTimeString());*/
		/*const hostDot = req.host;
		console.log("1 req.host: " + hostDot, new Date().ToLocaleTimeString());*/
		const hostName = req.hostname;
		console.log("1 req.hostname:portHardCoded:    " + hostName + ':5678', new Date().toLocaleTimeString());
		/*const title = req.body.title.trim() ?? undefined;*/
		const title = req.body.title ?? undefined;
		console.log("2 req.body.title:    " + title);
		/*console.log("2 req.body.title.trim() ?? undefined:    " + title);*/
		/*const categoryId = parseInt(req.body.category) ?? undefined;*/
		const categoryId = req.body.category ?? undefined;
		console.log("3 req.body.category:    " + req.body.category);
		/*console.log("categoryId = parseInt(3) ?? undefined:    " + categoryId);*/
		//const userId = req.auth.userId ?? undefined;
		console.log(`4 req protocol:    ${req.protocol}`);
		console.log("5 req.file:    " + req.file);
		console.log("req.file.name:    " + req.file.name)
		console.log(`6 host:port/images/req.file.name:    //${hostName}:5678/images/${req.file.name}`);
		const imageUrl = `${req.protocol}://${hostName}:5678/images/${req.file.filename}` ?? undefined;
		console.log("7 imageUrl:    " + imageUrl)
		/*console.log(title,categoryId,userId,imageUrl)*/
		if(title !== undefined &&
			title.length > 0 &&
			categoryId !== undefined &&
			categoryId > 0 &&
			/*userId !== undefined &&
			userId > 0 &&*/
			imageUrl !== undefined){//
			req.work = {title, categoryId, userId, imageUrl}
			console.log("8 req.work:    " + req.work)
			next()
		}else{
			return res.status(400).json({error: new Error("Bad Request")})
		}
	}catch(e){
		console.error(
			new Date().toLocaleTimeString(),
			"Something wrong occured in checkWork."
		);
		return res.status(500).json({error: new Error("Something wrong occured in checkWork.")});
	}

}