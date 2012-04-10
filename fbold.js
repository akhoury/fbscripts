
///////// DEPRECATED AFTER FACEBOOK GROUPS ARCHIVE AS WELL AS TIMELINE MIGRATIONS /// DO NOT USE !!!


////////// this script is to be used to delete multiple photos, on any facebook  group
////////// this script is to be used solely by an "Admin" of that group
////////// 
////////// Author: Aziz Khoury
////////// 01/11/2011
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
////USER MUST ME LOGGED IN, AS AN ADMIN IN ANY GROUP, SO YOU CAN TRY IT IN A DIFFERENT GROUP 
///////
////////"SEE ALL PHOTOS" PAGE 
//// MUST BE OPENED AT THE TIME OF RUN, ALONG WITH ALL THE PICS TO BE DELETED 
///// MUST BE SHOWN IN THE TABLE, 
////////
//////SINCE THE TABLE SHOWS A CERTAIN NUMBER OF
///// PHOTOS, YOU CAN SCROLL AT THE BOTTOM AND CLICK "SHOW MORE" AND REAPEAT THAT STEP 
///// UNTILL ALL PICS TO BE DELETED ARE VISIBLE, I KNOW IT'S A PAIN, BUT YOU CAN SHOW ABOUT 
///// 2000 PICTURES IN ABOUT 10 CLICKS, (WILL WORK ON THIS TO HAVE IT LOAD AUTOMATICALLY)
/////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////
/////AFTER TABLE OF PICS IS CORRECTLY SHOWN IN YOUR GOOGLE CHROME TAB, 
///// RIGHT CLICK ON A WHITE SPACE, THEN CLICK, INSPECT ELEMENT, 
//// A LITTLE WINDOW WILL SLIDE UP, AT THE BOTTOM LEFT OF IT THERE IS A LITTLE 
///// BUTTON, (IF YOU HOVE OVER IT IT WILL SAY "SHOW CONSOLE"), CLICK, A LITTLE 
///// WHITE CONSOLE WILL SLIDE UP.
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



////////// NOW COME BACK TO THIS CODE, SET THE NUMBER OF PICS YOU WANT TO DELETE

var addeish = 1;  //// FOR SAFETY, I SET THIS TO 1 ONLY --- :D
var startPic = 0; /// IF YOU ARE DELETING FROM THE TOP, leave this at 0, if you wanna delete a range, you have to set from where you want to start

//then copy the whole thing and paste it in the conole and hit enterm then sit back and watch
//you may see an error, about Referer Refused in red or something, just ignore it.

var sString, eString, sIndex, eIndex, theString, sStrg, eStrg, s, e, dxmlhttpnew, xmlhttpnew, t;
var urls = []; var bigDude = []; var lk = []; var x = []; 
var xi = 0; var dcounter = 0; var counter = 0; var intervalId = 0; var i = 0;
var lilDude = {};
function gatherStuff(cxml, wurl)
{
	var dude = {};
	var _fb_dtsg, _pid, _oid, _subj, _id, _post_form_id, _fbid;	
	if(cxml.indexOf("Share this photo with anyone by sending them this public link") === -1)
	{
		sString = "Report This Photo</a><a href=\"/ajax//editphoto.php\?pid="; //to be used for everybody else's photos

	}
	else 
	{
	 	sString = "Edit This Photo</a><a href=\"/ajax/editphoto.php?delete=1&amp;pid="; //to be used when testing OWN account pcitures	

	}
	eString = "\" rel=\"dialog\">Remove This Photo";
	sIndex = cxml.indexOf(sString)+sString.length;
	console.log(sIndex);
	eIndex = cxml.indexOf(eString);
	theString = cxml.substring(sIndex, eIndex);
	console.log("the String = "+ theString);
	
	sStrg = "name=\"fb_dtsg\" value=\"";
	eStrg = "\" autocomplete=\"off\" /><input type=\"hidden\" autocomplete=\"off\" name=\"ref\" value=\"";
	s = cxml.indexOf(sStrg)+sStrg.length;
	e = cxml.indexOf(eStrg);
	_fb_dtsg = cxml.substring(s, e);
	console.log("_fb_dtsg = "+ _fb_dtsg);	
	
	sStrg = "";
	eStrg = "\&amp;op";
	s = 0;
	e = theString.indexOf(eStrg,s);
	_pid = theString.substring(s, e);
	console.log("_pid = "+ _pid);
	
	sStrg = "oid=";
	eStrg = "";
	s = theString.indexOf(sStrg)+sStrg.length;
	e = theString.length;
	_oid = theString.substring(s, e);
	console.log("_oid = "+ _oid);

	sStrg = "subj=";
	eStrg = "\&amp;id=";
	s = theString.indexOf(sStrg)+sStrg.length;
	e = theString.indexOf(eStrg,s);
	_subj = theString.substring(s, e);
	console.log("_subj = "+ _subj);
	
	sStrg = "\&amp;id=";
	eStrg = "\&amp;";
	s = theString.indexOf(sStrg)+sStrg.length;
	e = theString.indexOf(eStrg,s);
	_id = theString.substring(s, e);
	console.log("_id = "+ _id);
	
	sStrg = "name=\"post_form_id\" value=\"";
	eStrg = "\"";
	s = cxml.indexOf(sStrg)+sStrg.length;
	e = cxml.indexOf(eStrg,s);
	_post_form_id = cxml.substring(s, e);
	console.log("_post_form_id = "+ _post_form_id);
	
	sStrg = "fbid=";
	eStrg = "\&";
	s = wurl.indexOf(sStrg)+sStrg.length;
	e = wurl.indexOf(eStrg,s);
	_fbid = wurl.substring(s, e);
	console.log("_fbid = "+ _fbid);

	dude = {'fb_dtsg': _fb_dtsg, 'pid': _pid, 'oid': _oid, 'subj': _subj, 'id': _id, 'post_form_id': _post_form_id, 'fbid': _fbid};
	return dude;
}
function delhttpRequest(zaber,httpx)
{
	var turl, params, editurl, parlength;
	console.log(zaber.fbid);
	turl = "\/ajax\/editphoto.php";
	params = "charset_test=%E2%82%AC%2C%C2%B4%2C%E2%82%AC%2C%C2%B4%2C%E6%B0%B4%2C%D0%94%2C%D0%84&fb_dtsg="+ zaber.fb_dtsg +"&pid="+ zaber.pid +"&oid="+ zaber.oid +"&view=global&o=&op=1&name=&subj="+ zaber.subj +"&id="+ zaber.id +"&cp=&cps=&delete=Remove&confirm=1&__d=1&post_form_id="+ zaber.post_form_id +"&post_form_id_source=AsyncRequest";
	editurl = "\/ajax\/editphoto.php";
	console.log("ediurl: " + editurl);
	parlength = params.length+"\r\n";
	httpx.open("POST", editurl, true);
	httpx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpx.setRequestHeader("Referer", "http:\/\/www.facebook.com/photo.php?fbid="+ zaber.fbid +"&set=o."+ zaber.oid);
	httpx.onreadystatechange = function()
	{
		if(httpx.readyState === 4 && httpx.status === 200) 
		{
		dcounter = dcounter +1;
		console.log("DELETED : picture: " + dcounter);
		
		}
	};
	httpx.send(params);	
}
function remove()
{
	for(i = 0; i< bigDude.length; i++)
	{
		dxmlhttpnew = new XMLHttpRequest();
		delhttpRequest(bigDude[i], dxmlhttpnew);
		console.log("bigDude's fbid's: " + bigDude[i].fbid);
	}
}
function loadXMLDoc(yurl, xmlhttpnewx)
{	

		xmlhttpnewx.onreadystatechange = function()
		{
			if (xmlhttpnewx.readyState===4 && xmlhttpnewx.status===200)
			{
				bigDude.push(gatherStuff(xmlhttpnewx.responseText, yurl));
				console.log("requesting url: " + yurl);
				counter = counter + 1;
				console.log("counter: " + counter);
				if(counter === (addeish-startPic))
				{
						remove();
				}
				
			}
		};	
		xmlhttpnewx.open("GET",yurl,true);
		xmlhttpnewx.send();

}
t = document.createElement('table');
x = document.getElementsByTagName("table");
t = x[0];
lk = t.getElementsByTagName("a");
for(i = startPic ; i < addeish;i++)
	{
		urls[i] = lk[i].getAttribute("href");	
		console.log(urls[i]);
	}	
for(i = startPic ; i < addeish; i++) 
	{
	xmlhttpnew = new XMLHttpRequest();
	loadXMLDoc(urls[i], xmlhttpnew);
	}




