

///////// DEPRECATED AFTER FACEBOOK GROUPS ARCHIVE AS WELL AS TIMELINE MIGRATIONS /// DO NOT USE !!!



var ayreId = "1295665356"; // this was the last member's ID I banned :D 
var groupId = "51593213398"; // this is the groupId that you're in


var w, temp,pfid;

w = document.getElementById("post_form_id");
pfid = w.getAttribute("value");
console.log("post_form_if grabbed: " + pfid);

/*
var a;
a = document.getElementsByTagName("link");
for(h = 0; h < a.length; h++)
{ 
	if (a[h].getAttribute("media")){
		link = a[h].getAttribute("href");
		sStrg = "gid=";
		eStrg = "";
		s = link.indexOf(sStrg)+sStrg.length;
		e = link.length;
		temp = link.substring(s, e);
		if(/^\d*$/.test(temp))
		{
			groupId = temp;
		}

	}
}
*/
console.log("Group ID grabbed: " + groupId);

fba = document.getElementsByName("fb_dtsg");
fb0 = fba[0];
fb0v = fb0.getAttribute("value");
console.log("fb_thing grabbed: " + fb0v);



function banhttpRequest(ehAyre, grId, pfID)
{
	httpx = new XMLHttpRequest();
	var turl, params, editurl, parlength;
	editurl = "\/ajax\/social_graph\/remove.php";
	params = "fbid="+ehAyre+"&edge_type=fan&ban=true&message&node_id="+grId+"&class=MemberManager&post_form_id="+pfID+"&fb_dtsg="+fb0v+"&lsd&post_form_id_source=AsyncRequest";
	parlength = params.length+"\r\n";
	httpx.open("POST", editurl, true);
	httpx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpx.setRequestHeader("Referer", "http:\/\/www.facebook.com/groups/edit.php?edit_members&gid=grId");
	httpx.onreadystatechange = function()
	{
		if(httpx.readyState === 4 && httpx.status === 200) 
		{
		console.log("Removed and Banned: " + ehAyre);
		
		}
	};
	httpx.send(params);	
}
banhttpRequest(ayreId,groupId, pfid);
