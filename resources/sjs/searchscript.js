var sajax,toolpage
function searchdata(formname)
{
	
	toolpage="none"
	var url;
		url=formname + "_search.asp?" + getformvalue('frmmembersearch');
		
		snavigates(url);
		
}
function searchdataex(formname)
{
	
	toolpage="none"
	var url;
		url=formname + "_search.asp?" + getformvalue('frmmembersearch') + "&prompt=No";
		
		snavigates(url);
		
}
function editmemberinfosearch()
{
	var url,datas;
	datas=getformvalue('frmmembersearch');
	
	
	url="searchmemberdetail.asp?" + datas
	snavigates(url);
}
function snavigates(pagename)
{
sajax=createobject();
if (sajax==null)
{
alert ("Browser does not support HTTP Request")
return 0;
} 
document.getElementById("progress").innerHTML="Loading<img src='images/wait1.gif' height='18'>Please wait";
sajax.onreadystatechange=displaydata; 
sajax.open("GET",pagename,true);
sajax.send(null);
}

function displaydata()
{
	
	
	var result,prescripts,postscripts;
	prescripts="";
	postscripts="";
	if (sajax.readyState==4 || sajax.readyState=="complete")
	{ 
		result=sajax.responseText;
		//var x=window.open();
		//x.document.write(result);
		//alert(result);
		sajax=null;
		if(result=="")
		{
			//hideMe();
			document.getElementById("progress").innerHTML="";
			return;	
		}
		var va;
		var tre=new String(result);
		var tres=tre.split("#~#");
		if(tres.length>1)
		{
			prescripts=tres[0];
			if(prescripts!="")
			eval(prescripts);
			va=new String(tres[1]);
		}
		else
		{
			va=new String(result);
		}
		if(tres.length>1)
			postscripts=tres[2];
		
		if (va.substr(0,6)=="Error:")
		{
			//alert("error");
			document.getElementById("div_error").innerHTML="<font color='red'>" + result + "</font>";
		}
		else if(va.substr(0,6)=="Report")
		{
			var reportdata=new String(va);
			var rdata=reportdata.split("~");
			document.getElementById("scrollcontent").innerHTML=rdata[1];
			document.getElementById("progress").innerHTML="";
			return;
		}
		else
		{
			document.getElementById("div_error").innerHTML="";
			var i;
			var trwos;
			var tcols;
			var valuearray=va.split("~");
			for(i=0;i<valuearray.length;i=i+3)
			{
							
				if(valuearray[i]=="grid")
				{
						trwos=parseInt(valuearray[i+1]);
						tcols=parseInt(valuearray[i+2])
						rows=trwos;
						cols=tcols;
						//drawgrid();
				}
				else if(valuearray[i]=="script")
				{
					eval(valuearray[i+1]);
					
				}
				else if(valuearray[i+1]=="radio")
				{
					document.getElementById(valuearray[i]).checked=true;
					
				}
				else if(valuearray[i+1]=="checkbox")
				{
					document.getElementById(valuearray[i]).checked=true;
					
				}
				else
				{
					
					if(valuearray[i+2]=="NA")
					{
						
						document.getElementById(valuearray[i]).value="";
					}
					else
					{
						
						document.getElementById(valuearray[i]).value=valuearray[i+2];
						
					}
				}
			
			}
		
		if(postscripts!="")
		eval(postscripts);
	}
	}
	document.getElementById("progress").innerHTML="";

}




