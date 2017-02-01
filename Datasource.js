var baseurl = "https://norway.dataplatform.nl/api/";
var resourceID = "89c41db6-5764-40e5-947d-e0a2c5d46a0b";
var Observable = require("FuseJS/Observable");

function dofetch(url,cbj){
	console.log(baseurl+url);
	fetch(baseurl+url)
	.then(function(resp){
		return resp.json();
	})
	.then(function(respj){
		if(cbj)cbj(respj);
	});
}

var resourceData = Observable();

function getResource(rid){
	// just find the total number of entries and try to load them all. Not particularly safe but works for testin
	dofetch("action/datastore_search?limit=1&resource_id="+rid,function(respj){
		dofetch("action/datastore_search?limit=" +respj.result.total + "&resource_id="+rid,function(respj){
			resourceData.value = respj.result;
		});
	});
	
}

getResource(resourceID);
module.exports = { resourceData }