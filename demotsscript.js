

///////// DEPRECATED AFTER FACEBOOK GROUPS ARCHIVE AS WELL AS TIMELINE MIGRATIONS /// DO NOT USE !!!



var sString, eString, sIndex, eIndex, theString, sStrg, eStrg, s, e, dxmlhttpnew, xmlhttpnew, t;
var urls = []; var bigDude = []; var lk = []; var x = []; 
var xi = 0; var dcounter = 0; var counter = 0; var intervalId = 0; var i = 0;
var lilDude = {};
var urls, addeish;
addeish = 10;

var h = 0 ; j = 0;  
 
 function countCommas(sentence)
 {
		var patt1;
		patt1 = /,\s<a/g;
		var arr;
		arr = sentence.match(patt1);
		if(!(arr == null))
		{
			return arr.length;
		}
		else
		{
			return 0;
		}
 }
 
 function countAnds(sentence)
 {
		var patt1=/a>\sand\s<a/g;
		var arr ;
		arr = sentence.match(patt1);
		if(!(arr == null))
		{
			return arr.length;
		}
		else
		{
			return 0;
		}
 }

function gatherStuff(cxml, curl)
{
	var dude = {};
	var posterId, posterfbLink, jpgLink, ownerLink, ownerName, secCaption, dateString, likesString, tempXml, estimatedChars;
	estimatedChars = 300;
	
	
	//------facebook url
	posterfbLink = curl;	
	
	//-----posterId
	sString = "http://www.facebook.com/photo.php?fbid=";
	eString = "&";
	sIndex = posterfbLink.indexOf(sString)+sString.length;
	tempXml = posterfbLink.substring(sIndex, sIndex+estimatedChars);
	eIndex  = tempXml.indexOf(eString);
	posterId = tempXml.substring(0, eIndex);
	
	
	//-----picture direct link
	sString = "\"Next\"><img src=\"";
	eString = "\" width=\"";
	sIndex = cxml.indexOf(sString)+sString.length;
	tempXml = cxml.substring(sIndex, sIndex+estimatedChars);
	eIndex  = tempXml.indexOf(eString);
	jpgLink = tempXml.substring(0, eIndex);
	
	
	//-------Owner Profile link
	sString = "Added by <a href=\"";
	eString = "\">";
	sIndex = cxml.indexOf(sString)+sString.length;
	tempXml = cxml.substring(sIndex, sIndex+estimatedChars);
	eIndex  = tempXml.indexOf(eString);
	ownerLink = tempXml.substring(0, eIndex);
	
	//-------Onwer Name
	sString = ownerLink + "\">";
	eString = "</a> <br/>";
	sIndex = cxml.indexOf(sString)+sString.length;
	tempXml = cxml.substring(sIndex, sIndex+estimatedChars);
	eIndex  = tempXml.indexOf(eString);
	ownerName = tempXml.substring(0, eIndex);
	
	//----- Secondary Caption (Optional - to be filtered)
	sString = "<div class=\"photocaption_text\" id=\"photocaption\">";
	if(cxml.indexOf(sString) === -1 )
	{
		secCaption = "No result";
	}
	else{
		eString = "</div>";
		sIndex = cxml.indexOf(sString)+sString.length;
		tempXml = cxml.substring(sIndex, sIndex+estimatedChars);
		eIndex  = tempXml.indexOf(eString);
		secCaption = tempXml.substring(0, eIndex);
	}
	
	likesString = "likesString";
 	//----Likes String (Optional - to be filtered)
		sString = "\" title=\"See people who like this item\">";
	if(cxml.indexOf(sString) === -1 )
	{
		likesString = "No result";
	}
	else{
		eString = " like this.";
		sIndex = cxml.indexOf(sString)+sString.length;
		tempXml = cxml.substring(sIndex, sIndex+estimatedChars);
		eIndex  = tempXml.indexOf(eString);
		likesString = tempXml.substring(0, eIndex);
		
 		if(likesString.indexOf("others") === -1)
		{
		}
		else 
		{
			tempXml = cxml.substring(sIndex-100, eIndex);
			var count = countCommas(tempXml); 
			if(count === 0)
			{
				count = countAnds(tempXml);
			}
			else 
			{
				count++;
			}
			if(count > 3)
			{
				count = 3;
			}
			
			likesString = likesString + " ALSO ADD " + count;
		}
		
 	}
	 
	//--Date string (to be filtered) 
	sString = ";\">Added";
	eString = " &#";
	sIndex = cxml.indexOf(sString)+sString.length;
	tempXml = cxml.substring(sIndex, sIndex+40);
	if(tempXml.indexOf("</span>") === -1)
	{
		eIndex  = tempXml.indexOf(eString);
		dateString = tempXml.substring(0, eIndex);
	}
	else 
	{
		eString = "</span>";
		eIndex  = tempXml.indexOf(eString);
		dateString = tempXml.substring(0, eIndex);		
	}

	
	 dude = {'posterfbLink': posterfbLink, 'posterId': posterId,'jpgLink': jpgLink, 'ownerLink': ownerLink, 'ownerName': ownerName, 'secCaption': secCaption, 'dateString': dateString, 'likesString': likesString};
	
	return dude;
}

function addtext(what){
	if (document.createTextNode)
	{
		var mytext = document.createTextNode(what)
		document.getElementById("pageFooter").appendChild(mytext)
	}
}


function saveDB()
{

	console.log("file saving ... ");
	var oo = 0;
	var s = "";
	var br = "<<<<bentael>>>>";
	for(oo = 0; oo < bigDude.length; oo++)
		{
			s = s + bigDude[oo].posterfbLink +br;
			s = s + bigDude[oo].posterId +br;
			s = s + bigDude[oo].jpgLink + br;
			s = s + bigDude[oo].ownerLink +br;
			s = s + bigDude[oo].ownerName +br;
			s = s + bigDude[oo].secCaption +br;
			s = s + bigDude[oo].dateString +br;
			s = s + bigDude[oo].likesString +br;
			addtext(s);
			s = "";
		}
		

	
/* 	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var s = fso.CreateTextFile("C:\\test.txt", true);
	s.WriteLine('Hello');
		for(oo = 0; oo < bigDude.length; oo++)
		{
			s.WriteLine("begin:" +oo);
			s.WriteLine(bigDude[oo].posterfbLink);
			s.WriteLine(bigDude[oo].posterId);
			s.WriteLine(bigDude[oo].jpgLink);
			s.WriteLine(bigDude[oo].ownerLink);
			s.WriteLine(bigDude[oo].ownerName);
			s.WriteLine(bigDude[oo].secCaption);
			s.WriteLine(bigDude[oo].dateString);
			s.WriteLine(bigDude[oo].likesString);
			s.WriteLine("end:" +oo);
			console.log("Poster: " + oo);
			console.log("posterfblink: " + bigDude[oo].posterfbLink);
			console.log("posterId: " + bigDude[oo].posterId);
			console.log("jpgLink: " + bigDude[oo].jpgLink);
			console.log("ownerblink: " + bigDude[oo].ownerLink);
			console.log("ownerName: " + bigDude[oo].ownerName);
			console.log("secCaption: " + bigDude[oo].secCaption);
			console.log("dateString: " + bigDude[oo].dateString);
			console.log("likesString: " + bigDude[oo].likesString);
			console.log("------------------------");			
		}
		s.WriteLine("alldone");
		s.Close(); */
}


function loadXMLDoc(yurl, xmlhttpnewx)
{	

		xmlhttpnewx.onreadystatechange = function()
		{
			if (xmlhttpnewx.readyState===4 && xmlhttpnewx.status===200)
			{
				bigDude.push(gatherStuff(xmlhttpnewx.responseText, yurl));
				counter = counter + 1;
				if(counter === addeish)
				{
						saveDB();
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

//addeish = lk.length;
addeish = 4628;

for(i = 0 ; i < addeish;i++)
	{
		urls[i] = lk[i].getAttribute("href");	
	}	
for(i = 0 ; i < addeish; i++) 
	{
	xmlhttpnew = new XMLHttpRequest();
	console.log("Grabbing poster:["+i+"] " + " - url: " + urls[i]);
	loadXMLDoc(urls[i], xmlhttpnew);
	}
