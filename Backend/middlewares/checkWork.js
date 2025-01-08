module.exports = (req, res, next) => {
	try{
        const errMsg_400_beginsWith = "Bad request: ";

		console.log("0 checkWork enter.");
		console.log("0.1 req: " + req, new Date().toLocaleTimeString()); 
		// Object

		/*const host = req.get('host');
		console.log("1 req.get('host'): " + host, new Date().ToLocaleTimeString());*/
		/*const hostDot = req.host;
		console.log("1 req.host: " + hostDot, new Date().ToLocaleTimeString());*/
		const hostName = req.hostname; 
		// 127.0.0.1
		console.log("1 req.hostname:portHardCoded:    " + hostName + ':5678', new Date().toLocaleTimeString());

		/*const title = req.body.title.trim() ?? undefined;*/
		const title = req.body.title ?? undefined; 
		//undefined
		console.log("2 req.body.title:    " + title);
		/*console.log("2 req.body.title.trim() ?? undefined:    " + title);*/

		/*const categoryId = parseInt(req.body.category) ?? undefined;*/
		const categoryId = req.body.category ?? undefined; 
		// undefined
		console.log("3 req.body.category:    " + req.body.category);
		/*console.log("categoryId = parseInt(3) ?? undefined:    " + categoryId);*/

		/*const userId = req.auth.userId ?? undefined;*/

		console.log(`4 req protocol:    ${req.protocol}`); 
		// http

		console.log("5 req.file:    " + req.file); 
		// undefined
		/*console.log("req.file.name:    " + req.file.name)*/

		/*console.log("5 req.body.image:    " + req.body.image);*/

		/*console.log(`6 host:port/images/req.file.name:    //${hostName}:5678/images/${req.file.name}`);*/
		/*const imageUrl = `${req.protocol}://${hostName}:5678/images/${req.file.filename}` ?? undefined;*/
		/*console.log("7 imageUrl:    " + imageUrl)*/
		/*console.log(title,categoryId,userId,imageUrl)*/
		if(title == undefined) {
			return res.status(400).json({error: new Error(errMsg_400_beginsWith + "req.body.title must be != undefined")});
		} else if( ! title.length > 0) {
			return res.status(400).json({error: new Error(errMsg_400_beginsWith + "title.length must be > 0!")});
		} else if(categoryId == undefined) {
			return res.status(400).json({error: new Error(errMsg_400_beginsWith + "req.body.category must be != undefined")});
        } else if( ! categoryId > 0) {
			return res.status(400).json({error: new Error(errMsg_400_beginsWith + "categoryId must be > 0!")});
		} else if(userId == undefined) {
			return res.status(400).json({error: new Error(errMsg_400_beginsWith + "userId must be != undefined")});
		} else if( ! userId > 0) {
			return res.status(400).json({error: new Error(errMsg_400_beginsWith + "userId must be > 0")});
		} else if(imageUrl == undefined) {
			return res.status(400).json({error: new Error(errMsg_400_beginsWith + "imageUrl must be != undefined")});
		} else {
			req.work = {title, categoryId, userId, imageUrl}
			console.log("8 req.work:    " + req.work)
		    next()
		}
	}catch(e){
		console.error(
			new Date().toLocaleTimeString(),
			"Something wrong occured in checkWork."
		);
		return res.status(500).json({error: new Error("Something wrong occured in checkWork.")});
	}

}