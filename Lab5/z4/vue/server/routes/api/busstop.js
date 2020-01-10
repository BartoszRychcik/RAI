var express = require('express') 
var router = express.Router()
var axios = require('axios')

router.get('/:id', async(req, res, next) => {
	const x = parseInt(req.params.id);
	try{
		busstops = await getBusStop(x);
		res.send(busstops);
	}catch(err){
		res.status(404).send(err);
	}
	next();
});

const url1 = 'http://ckan2.multimediagdansk.pl/delays?stopId=';

function getBusStop(id){
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(url1+id);
				var data = res.data.delay;
				resolve(
					data.map(busstopinfo => ({
						...busstopinfo, 
					}))
				);
			}
			catch(err){
				reject(err);
			}
		})    
	}

module.exports = router


