///////// DEPRECATED AFTER FACEBOOK GROUPS ARCHIVE AS WELL AS TIMELINE MIGRATIONS /// DO NOT USE !!!



////////// this script is to be used to ban all members of one group, from another.
////////// THE DEFAULT GROUP TO BAN MEMBERS FROM IS SET TO ---> DeMotivational Posters Group 
////////// IF YOU WANNA BAN FROM ANOTHER GROUP YOU MUST CHANGE THE gourpId variable below to whatever that group's id is.
 
////////// this script is to be used solely by an "Admin" of that group to ban from
////////// 
////////// Author: Aziz Khoury
////////// 02/03/2011
//////////
////////// there is no legal restrictions for this script, 
////////// you can use, copy, modify
////////// no warranty whatso ever
////////// sorry about the non-perfect documentation and the weird variable names, just got too tired to change anything

////////////////////////////////////////////////////////////////
////////////////////////READ ALL COMMENTS///////////////////////
//////////////////////PLEASE DO NOT ATTEMPT TO RUN THIS IF YOU DO NOT KNOW WHAT YOU'RE DOING



////////////////////////////////////////////////////////////////
////THIS IS DESIGNED TO RUN IN GOOGLE CHROME
////IN THE "INSPECT ELEMENT" CONSOLE, NOTHING ELSE, DON'T TRY IT AS A REGULAR JAVASCRIPT CODE, IT WON'T RUN, 
////USER MUST ME LOGGED IN, AS AN ADMIN IN ANY GROUP,

//// STEP 1: GO THE THE group that you wanna pull members from NOT the group that you wanna ban them from. 
//// STEP 2: click on "see all" to view all members
//// a small popup window will show
//// YOU MUST SCROLL ALL THE WAY DOWN TO SEE THE LAST MEMBER (this step loads all IDs in the source, if you don't scroll all the way down, it will only grab the frist 10 or 12 members from top)

///// RIGHT CLICK ON A WHITE SPACE on that popup window, THEN CLICK, INSPECT ELEMENT, 
//// A LITTLE WINDOW WILL SLIDE UP, AT THE BOTTOM LEFT OF IT THERE IS A LITTLE 
///// BUTTON, (IF YOU HOVE OVER IT IT WILL SAY "SHOW CONSOLE"), CLICK, A LITTLE 
///// WHITE CONSOLE WILL SLIDE UP.
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

////////// NOW COME BACK TO THIS CODE, EDIT the groupID number couples of lines below, 

// now, simply select all text, copy and paste it in the console and hit enter. 


var w, temp,pfid, groupId;
groupId = "51593213398"; // DEMOTIVATIONAL POSTERS ID NUMBER


var profileLinks = new Array();
var IDs = new Array();
var links, isOne, counter;
links = document.links;
isOne = 0;
for(i = 0; i < links.length; i++){
 if(links[i].getAttribute("class") === "UIObjectListing_Title")
	{
		profileLinks[isOne] = links[i].getAttribute("href");
		isOne = isOne +1;

	}
	
}

counter = 0;
function loadXMLDoc(yurl, xmlhttpnewx)
{	

		xmlhttpnewx.onreadystatechange = function()
		{
			if (xmlhttpnewx.readyState===4 && xmlhttpnewx.status===200)
			{
				var ggg = xmlhttpnewx.responseText;
				IDs[counter] = gatherStuff(ggg);
				console.log("Grabbed ID :" + IDs[counter]);
				var fakeCounter = counter + 1;
				console.log("ID count: " + fakeCounter);
				counter = counter + 1;
				if(counter === profileLinks.length)
				{
					console.log("All grabbed .. ama start banning .. ");
					ban();
				}
			}
		};	
		xmlhttpnewx.open("GET",yurl,true);
		xmlhttpnewx.send();

}

function ban()
{
	for(j = 0; j < IDs.length; j++)
	{
		var httpg = new XMLHttpRequest();
		banhttpRequest(httpg,IDs[j],groupId, pfid);
		
	}

}


function gatherStuff(xtext)
{
	var id, str1, str2, s, e, sub;	
	str1 = "&amp;cid=";
	str2 = "&amp;rid=";			
	astr1 = "URL=/profile.php?id=";
	astr2 = "&amp;ref=sgm&amp";
	
	if(xtext.indexOf(astr1) === -1)
	{
		s = xtext.indexOf(str1)+str1.length;
		e = xtext.indexOf(str2);
		id = xtext.substring(s, e);
		return id;
	}
	else 
	{
		s = xtext.indexOf(astr1)+astr1.length;
		e = xtext.indexOf(astr2);
		id = xtext.substring(s, e);
		return id;
		
	}
}

var w, temp,pfid, groupId; 

w = document.getElementById("post_form_id");
pfid = w.getAttribute("value");
console.log("post_form_if grabbed: " + pfid);
var banCounter = 0;
function banhttpRequest(httpx, ehAyre, grId, pfID)
{
	var turl, params, editurl, parlength;
	editurl = "\/ajax\/social_graph\/remove.php";
	params = "fbid="+ehAyre+"&edge_type=fan&ban=true&message&node_id="+grId+"&class=MemberManager&post_form_id="+pfID+"&fb_dtsg=V4RRw&lsd&post_form_id_source=AsyncRequest";
	parlength = params.length+"\r\n";
	httpx.open("POST", editurl, true);
	httpx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpx.setRequestHeader("Referer", "http:\/\/www.facebook.com/groups/edit.php?edit_members&gid=grId");
	httpx.onreadystatechange = function()
	{
		if(httpx.readyState === 4 && httpx.status === 200) 
		{
		console.log("Removed and Banned: " + ehAyre);
		banCounter = banCounter + 1;
			if(banCounter === profileLinks.length)
			{
			console.log("All "+banCounter+" mothafuckers are banned. Fuck Yea ! ");
			}
		
		}
	};
	httpx.send(params);	
}

console.log("printing results array...");
for(i = 0; i < profileLinks.length; i++)
{
	var httpr = new XMLHttpRequest();
	furl = profileLinks[i];
	//console.log("Profile "+i+" "+furl);
	loadXMLDoc(furl, httpr);	
}
