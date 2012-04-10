///////// DEPRECATED AFTER FACEBOOK GROUPS ARCHIVE AS WELL AS TIMELINE MIGRATIONS /// DO NOT USE !!!


var list;
var xmlhttpnewxx;
var evilLinks = new Array();
function sleep(ms)
{
		var dt = new Date();
		dt.setTime(dt.getTime() + ms);
		while (new Date().getTime() < dt.getTime());
}
function gourl(yurl, xmlhttpnewx)
{	

		xmlhttpnewx.onreadystatechange = function()
		{
			if (xmlhttpnewx.readyState===4 && xmlhttpnewx.status===200)
			{
				var res = xmlhttpnewx.responseText;
				checkWall(res, yurl);			
			}
		};	
		xmlhttpnewx.open("GET",yurl,true);
		xmlhttpnewx.send();

}

function checkWall(wall, yurl)
{	
		//if(wall.indexOf("This is so crazy)") === -1)
	//{
	//	console.log("nothing here");
	//}
	if(wall.indexOf("YO") === -1)
	{

	}
	else 
	{
		console.log("check:" + yurl);

	}

}
var ossama ="This is so crazy they killed Osama Bin Laden, check out the exclusive pictures!)";
list = document.getElementsByClassName("fsl fwb fcb");
var links = new Array();
for(var i = 0; i < list.length; i++)
{
		var a = list[i].getElementsByTagName("a"); 
		var b = a[0]; 
		var link = b.getAttribute('href'); 
		links[i] = link;
		console.log(link);
}
console.log("freinds count:" + i);

for(var x = 0 ; x < links.length; x++)
{
		var url = links[x];
		xmlhttpnewxx = new XMLHttpRequest();
		gourl(url, xmlhttpnewxx);
}
