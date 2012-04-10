
//////// DONT RUN THIS YET !!!!!



var u= document.getElementsByClassName('wrap');
var c=0,d=0,fcs=0,di=0,bai=0,pid, fcalls = [], scalls = [];	
var xmlhttp, ayy, post_form_id, phstamp , ban_user, fb_dtsg;
var deleteCalls = []; var pids = []; var finalCalls = [];
var sons = {}; 

var pageUserId = "317052458355457", pageSlug = "sdasdhkasdhkaskhda";

function setSomeVars(){

	var head = document.head.innerHTML; 
	var si = head.indexOf("post_form_id\":\"")+"post_form_id\":\"".length;
	var ei = head.indexOf("\"fb_dtsg\":\""); 
	//first global here
	post_form_id = head.substring(si, ei); 
	si = ei + "\"fb_dtsg\":\"".length; 
	ei = head.indexOf("\",\"ajaxpipe_token");
	//second global here 
	fb_dtsg = head.substring(si, ei);
}

//NOT SURE WHAT THE FUCK IS THIS!
phstamp = "165816510484738145742";

function loadXMLDoc(xmlhttpx, url){
	url = url + "&__a=1&__user=" + pageUserId;
	xmlhttpx.open("GET",url,true);	
	xmlhttpx.setRequestHeader("Content-type", "application\/x-javascript");
	xmlhttpx.setRequestHeader("Referer", "http:\/\/www.facebook.com\//" + pageSlug+"?filter=2");
	xmlhttpx.setRequestHeader("X-SVN-Rev", "530351");
	xmlhttpx.onreadystatechange = function(){
		if (xmlhttpx.readyState==4 && xmlhttpx.status==200){
			if(xmlhttpx.responseText){
				console.log("fcall: " +  fcs);
				scalls[fcs] = xmlhttpx.responseText;
				fcs++;
				if(fcs === fcalls.length){
					console.log("initial calls done.. so long bitches!!");
					scalls = finishHim(scalls);
					for(i=0; i<scalls.length; i++){
						xxx = new XMLHttpRequest();
						deleteAndBanTheBitch(xxx, scalls[i]);
					}
				}
			}
		}
	}
	console.log("calling ... " + url);
	xmlhttpx.send();
}

function DANCEMOTHERFUCKERDANCE(bitches){

	for(i=0; i<bitches.length; i++){
		var htp = new XMLHttpRequest();
		finalHTTPCalls(htp, bitches[i], pid[i]);
	}
}

function finalHTTPCalls(xmlhttpx, url, id){
	url = url + "&__a=1&__user=" + pageUserId;
	url = url + "&confirmed=true&ban_user="+id;
	//+ "&fb_dtsg=" + fb_dtsg + "&lsd=";
	//console.log("bai url: " + url);
	xmlhttpx.open("POST",url,true);	
	xmlhttpx.setRequestHeader("Content-type","application\/x-www-form-urlencoded");
	xmlhttpx.setRequestHeader("Referer", "http:\/\/www.facebook.com\//" + pageSlug+"?filter=2");
	xmlhttpx.setRequestHeader("X-SVN-Rev", "530351");
	xmlhttpx.onreadystatechange = function(){
		if (xmlhttpx.readyState==4 && xmlhttpx.status==200){
			if(xmlhttpx.responseText){
				console.log("bai: " + bai);
				bai++;
			}
		}
	}
	xmlhttpx.send();
}

function findDelParams(s){
	s = sanitize(s);
	var si = s.indexOf("take_action_on_story.php?") + "take_action_on_story.php?".length;
	var ei = s.indexOf("\", {\"unit_data\":");
	return "https://www.facebook.com/ajax/timeline/take_action_on_story.php?" 
				+ s.substring(si, ei);
}

function deleteAndBanTheBitch(xmlhttpy, urly){
	
	
	var extras = "&post_form_id=" + post_form_id
			+ "&post_form_id_source=AsyncRequest&phstamp=" + phstamp 
			//+ "&confirmed:true" //&ban_user=" + ban_user ? ban_user : ""
			+ "&fb_dtsg=" + fb_dtsg
			+ "&lsd="
			+ "&nctr[_mod]=pagelet_timeline_recent"
			//+ "&amp;__a=1&amp;__user=" + pageUserId;
	urly = urly + extras ;	
	//console.log("before:" + urly);
	urly.split("amp").join("").split(";").join("");
	//console.log("after: " + urly);
	xmlhttpy.open("POST",urly,true);	
	//console.log("opening.." + urly);
	xmlhttpy.setRequestHeader("Content-type", "application\/x-www-form-urlencoded");
	xmlhttpy.setRequestHeader("Referer", "http:\/\/www.facebook.com\//"+pageSlug+"?filter=2");
	xmlhttpy.setRequestHeader("X-SVN-Rev", "530351");
	xmlhttpy.onreadystatechange = function(){
		if (xmlhttpy.readyState==4 && xmlhttpy.status==200){
			if(xmlhttpy.responseText){
				console.log("DELETE call: " +  di);
				deleteCalls[di] = xmlhttpy.responseText;
				if(deleteCalls[di]){
					if (deleteCalls[di].indexOf("phstamp") != -1)
						console.log("I HAZ TEH PHSTAMP !");
				
					finalCalls[di] = findDelParams(deleteCalls[di]);
					if (finalCalls.length === scalls.length){
						DANCEMOTHERFUCKERDANCE(finalCalls);
					}
				}
				di++;
			}
		}
	}
	xmlhttpy.send();
}

function finishHim(arr){
	arr = narrowRequest(arr);
	arr = pullAjaxifyURL(arr);
	//removing the first element "whats on your mind" input unit
	 arr.splice(0,1);
	return arr;
}

function sanitize(str){
	return str.split("ajaxify=\\\"").join("")
				.split("\\u00255B").join("%5B")
				.split("\\u00255D").join("%5D")
				.split("\\").join("")
				.split("ajaxify=\"").join("")
				.split("amp;").join("");
}
function narrowRequest(arr){
	for(i=0; i < arr.length; i++){
		if(arr[i]){
			var sString = "Delete";
			var eString = " href";
			var sIndex = arr[i].indexOf(sString);
			var eIndex = arr[i].length-1;
			var str = arr[i].substring(sIndex, eIndex);
			eIndex = str.indexOf(eString);
			arr[i] = str.substring(0, eIndex);
		}
	}
	return arr;
}

function pullAjaxifyURL(arr){
	for(i=0; i < arr.length; i++){
		if(arr[i]){
			var sString = "ajaxify";
			//var eString = " href";
			var sIndex = arr[i].indexOf(sString);
			var eIndex = arr[i].length-1;
			var str= arr[i].substring(sIndex, eIndex);
			arr[i] = sanitize(str);
			if (arr[i].indexOf("customize_confirm.php") != -1)
					console.log("this one!!! => " + i);
		}
	}
	return arr;
}
var f = document.getElementsByClassName('unitHeader');

for(i=0; i<f.length;i++){
	if(f[i] && f[i].firstChild && f[i].firstChild.firstChild 
				&& (f[i].firstChild.firstChild.getElementsByTagName('a').length > 0) 
					&& f[i].firstChild.firstChild.getElementsByTagName('a')[0] 
						&& f[i].firstChild.firstChild.getElementsByTagName('a')[0].getAttribute
							&& f[i].firstChild.firstChild.getElementsByTagName('a')[0].getAttribute("data-hovercard") ){
						
							pid = f[i].firstChild.firstChild.getElementsByTagName('a')[0].getAttribute("data-hovercard").split("id=")[1];
							pids[i] = pid;
						}
}

setSomeVars();
for(x in u){
	c++;
	if(u[x] && u[x].children && u[x].children[0]  && (u[x].children[0].tagName === "A")){
		var y = u[x].children[0].getAttribute('data-tooltip'); 
		if ( y && (y === "Edit or Remove") ){
			fcalls[d] = u[x].children[0].getAttribute('ajaxify');
			d++;
			console.log(x + " : " + y);
		}
	}
}
console.log(d+" out of:"+c+" wraps");
for (i = 0; i < fcalls.length; i++){
	xmlhttp = new XMLHttpRequest();
	loadXMLDoc(xmlhttp,fcalls[i]);
}






