//document.onhelp=showhelp;
//str.length = 18432000;
var jholdername="jscontainner"
var findcommand=""
var savecommand=""
var escapecommand=""
var helpcommand=""
 if ('onhelp' in window) {   // Internet Explorer
            window.onhelp = showhelp;
        }
        else {  // Firefox, Opera, Google Chrome and Safari
            window.onkeydown = OnKeyDown;
        }
		function OnKeyDown (event) {
            if (event.keyCode == 112 /*KeyboardEvent.DOM_VK_F1*/) {
                showhelp ();
				return false;
            }
			if(event.keyCode == 70 && event.ctrlKey)
			{
				//document.title="Show find";
				if(findcommand!="")
				{
					eval(findcommand);
					return false;
				}
			}
			else if(event.keyCode == 83 && event.ctrlKey)
			{
				//document.title="Show save";
				if(savecommand!="")
				{
					eval(savecommand);
					return false;
				}
			}
			else if(event.keyCode==27)
			{
				if(escapecommand!="")
				{
					eval(escapecommand);
					return false;	
				}
			}
			//else
				//document.title=event.keyCode;
        }
		
		// Show help on related eliments
function showhelp()
{
	var loc=""+window.location.toString();
	
	var tdate=loc.split("#")
	var myfile="";
	var newloc=""
	if(tdate.length<2)
	{
		myfile=tdate[0];
		var temp=myfile.split("/");
		newloc=temp[temp.length-1].split(".")[0];
		newloc="help/"+newloc+".html"
		
	}
	else
	{		if(tdate[1].indexOf(".")<1)
			{
				myfile=tdate[0];
				var temp=myfile.split("/");
				newloc=temp[temp.length-1].split(".")[0];
				newloc="help/"+newloc+".html"
			}
			else
			{
				newloc=tdate[1].substring(0,tdate[1].indexOf("."));
				newloc="help/"+newloc+".html";
			}
			
	}
	if(helpcommand=="")
	{
	navigates1(newloc,'helpcontent','');
	$('#whelp').window('open')
	//showpopup(caption,pagename,modal,icon)
	//showpopup("Help",newloc,1,'');
	}
	else
	{
		navigates1("help.asp?id="	+ helpcommand,'helpcontent','');
		$('#whelp').window('open');
		//showpopup("Help","help.asp?id="	+ helpcommand,1,'');
	}
	return false;
}
var aa;
var ajax,targets,currentpage,currentlink;

// creates XMLHTTP Object
function createobject(handler)
{ 
	var objXMLHttp=null
	if (window.XMLHttpRequest)
	{
		objXMLHttp=new XMLHttpRequest()
	}
	else if (window.ActiveXObject)
	{
		objXMLHttp=new ActiveXObject("Microsoft.XMLHTTP")
	}
	return objXMLHttp
}
var Globalscript="";
//var tempa=document.createElement("DIV");
//Executes all innerhtml with script
function setAndExecute(divId, innerHTML)
{
	if(divId=="_blank")
		return 0;
	var div = document.getElementById(divId); 
	
	if(innerHTML=="")
	{
		document.getElementById("div_error").innerHTML="";
		document.getElementById("progress").innerHTML=""
		return;
	}
	if (innerHTML.substr(0,6)=="Error:")
	{
		
		document.getElementById("div_error").innerHTML="<font color='red'>" + innerHTML + "</font>";
		
	}
	else if (innerHTML.substr(0,6)=="Alert:")
	{
		document.getElementById("div_error").innerHTML="";
	}
	else if(innerHTML.substr(0,6)=="script")
	{
		
		eval(innerHTML.substr(6,innerHTML.length-6));
		document.getElementById("div_error").innerHTML="";
	}
	else if(innerHTML.substr(0,8)=="rtfedit:")
	{
		var a=new String(innerHTML);
		var b=a.split("~~");
		
		document.getElementById(divId).innerHTML=b[2];
		eval(b[1]);
	}
	else if(innerHTML.substr(0,6)=="Grid:~")
	{
		var a=new String(innerHTML);
		var b=a.split("~~");
		document.getElementById(divId).innerHTML=b[2];
		eval(b[1]);
		document.getElementById("div_error").innerHTML="";
	}
else {
	var tempHTML=innerHTML;
	var mypos=-1;
	
	mypos=tempHTML.indexOf("<script",mypos);
	
	while(mypos!=-1)
	{
		var closepos=mypos;
		closepos=tempHTML.indexOf("<\/script>",closepos);
		var myscript=tempHTML.substring(mypos,(closepos+9));
		//alert(mypos + "to" + closepos);
		replacechar(myscript);
		innerHTML=innerHTML.replace(myscript,"");
		mypos=tempHTML.indexOf("<script",(mypos+7));
		
	}
	
	var originalHTML=innerHTML;
				
		div.innerHTML = innerHTML;
	// Load entire style sheet
	var astyle = div.getElementsByTagName("link");
	
		for (var s = 0; s < astyle.length; s++) {
			if (astyle[s].href == "" || astyle[s].href == undefined) {
				var ass = 0;
			}
			else {
				loadstyle(astyle[s].href);
			}
		}
		
		
	//tempa.innerHTML=tempa.innerHTML.replace('theForm.submit();', 'submitform(theForm,\'' + divId + '\');theForm.submit();');
Globalscript=Globalscript.replace('theForm.submit();', 'submitform(theForm,\'' + divId + '\');theForm.submit();');


//setjs(tempa.innerHTML);
setjs(Globalscript,jholdername);

//tempa.innerHTML="";
Globalscript="";
	

		document.getElementById("div_error").innerHTML="";
		
	}
	
}
function replacechar(match){
	var tempmatch=match;
	
	//alert(match);
	var tempmatchex=tempmatch.toLowerCase();
	 var reg=/src=(\").*\1/g
	if(tempmatchex.search(reg)>=0)
	{		
		var sourcefile="";
		var temp=tempmatch.replace(reg,function(m){sourcefile=m;return m;});
		sourcefile=sourcefile.replace(/ /g,"");
		sourcefile=sourcefile.replace("src=\"","");
		sourcefile=sourcefile.replace("\"","");
		loadjs(sourcefile);
		
	}
	else
	{
		//find <script tag>
		var rege=/<(script+).*>|<(Script+).*>|<(Script+).*>/g
		var scripttag="";
		//tempmatch=tempmatch.replace(/\[newr\]/g,"\r");
		
		var temp1=tempmatch.replace(rege,function(m){scripttag=m;return m;});
		temp1=temp1.replace(scripttag,"");
		//alert(temp1);
		//alert(tempmatchex);
		//alert(scripttag);
		
		//temp1=tempmatch.substring(scripttag.length,tempmatch.length)
		temp1=temp1.replace("</script>","");
		temp1=temp1.replace("</Script>","");
		temp1=temp1.replace("</SCRIPT>","");
		
		//temp1=temp1.replace(/\[newline\]/g,"");
		//temp1=temp1.replace(/\[newr\]/g,"");
		//alert(temp1);
		//alert(temp1);
		//tempa.innerHTML=tempa.innerHTML+temp1;
		Globalscript=Globalscript +  temp1;
		//alert(Globalscript);
		temp1="";
	}
	return "";
}

// Executes all innerhtml with animation effect
function autosetAndExecute(divId, innerHTML)
{  
	 var div = document.getElementById(divId); 
	document.getElementById(divId).style.filter="revealTrans(duration=1, transition=23)";
	document.getElementById(divId).filters.revealTrans.apply();
	document.getElementById(divId).style.visibility="hidden";
	document.getElementById(divId).filters.revealTrans.play();

	div.innerHTML = innerHTML; 
	document.getElementById(divId).style.filter="revealTrans(duration=1, transition=3)";
	document.getElementById(divId).filters.revealTrans.apply();
	document.getElementById(divId).style.visibility="visible";
	document.getElementById(divId).filters.revealTrans.play();
 var x = div.getElementsByTagName("script"); 
  for(var i=0;i<x.length;i++) 
  {    
   eval(x[i].text); 
  }
}

//Determine whether function exist or not
function isfunction(functionname)
	{	
		aa="";
		
		var y;
		y="aa=''+typeof "+functionname+";";

				eval(y);
				if(aa=="function")
					return true;
				else
					return false;
	}



// Check/Uncheck all checkbox within the form
function checkall(formname,value)
{
	
	var l,ret,loop1;
	l=document.getElementById(formname).elements.length;
	ret="";
	
	for(loop1=0; loop1<l;loop1++)
	{
		if(typeof document.getElementById(formname).elements[loop1] =="object")
		{
			if(document.getElementById(formname).elements[loop1].type=="checkbox")
			{
				document.getElementById(formname).elements[loop1].checked=value;
			}
		}
	}
}

function SetAllCheckBoxes(FormName, FieldName, CheckValue)
{
	if(!document.forms[FormName])
		return;
	var objCheckBoxes = document.forms[FormName].elements[FieldName];
	if(!objCheckBoxes)
		return;
	var countCheckBoxes = objCheckBoxes.length;
	if(!countCheckBoxes)
		objCheckBoxes.checked = CheckValue;
	else
		// set the check value for all check boxes
		for(var i = 0; i < countCheckBoxes; i++)
			objCheckBoxes[i].checked = CheckValue;
}

//Retrive form Value


// Reset form

function clearall(formname)
{
	
	document.getElementById(formname).reset();
}
//print specified layer
function printlayer(f,stylesheet)
	{	var a,ssheet;
	ssheet='<STYLE type=text/css media=print>body{margin:0px;}THEAD {	DISPLAY: table-header-group}TFOOT {	DISPLAY: table-footer-group}</STYLE><link rel="stylesheet" href="'+stylesheet + '" type="text/css"/><body onLoad="window.print();">';
	
		a=window.open();
		
		a.document.write(ssheet + document.getElementById(f).innerHTML + '</body>');
		
	}
function printlayer1(f)
	{	var a,ssheet;
		ssheet="<link rel=\"stylesheet\" href=\"../inc/style.css\" /> <link rel=\"stylesheet\" href=\"../style.css\" /> <link rel=\"stylesheet\" href=\"tblstyle_print.css\" />";
		if(getlanguage()=="Np")
			ssheet=ssheet+"<link rel=\"stylesheet\" href=\"nepali.css\" />"
		else
			ssheet=ssheet+"<link rel=\"stylesheet\" href=\"english.css\" />"
		
		a=window.open();
		
		a.document.write(ssheet + document.getElementById(f).innerHTML);
		//window.print();
		//a.onload=a.print;
		//a.print();		
		//a.onafterprint=a.close();
	}
	
	
	
	function printSelection(node){

 
  var ssheet="<link rel=\"stylesheet\" href=\"style.css\" />";
  var content=ssheet+ node.innerHTML
  var pwin=window.open('','print_content','width=50,height=10');

  pwin.document.open();
  pwin.document.write('<html><body onload="window.print()">'+content+'</body></html>');
  pwin.document.close();
 
  setTimeout(function(){pwin.close();},1000);




}

	
	
function setpage(a,b)
{
	currentpage=a;
	currentlink=b;
}

// Call this function for every hyperlink for refresh purpose
function navigates(pagename,target,data)
{
	rpc.exec('setresolution(``' + screen.width + ':' + screen.height +':5:5:' + window.innerHeight + ':' + getAnchorPosition("scrollcontent").y +'``)');
	//alert(pagename);
	if(escape(pagename).search(escape('?'))<1)
	{
		pagename=pagename + "?uniqueid=" + Date().toString();
	}
	else
	{
		pagename=pagename+"&uniqueid=" +  Date().toString();	
	}
	pagename=pagename+"`"+target;
	var currentlink=window.location.toString().split("#");
	var templink="histry.asp?i="+escape(pagename);
	pagename=currentlink[0]+"#"+escape(pagename);
	window.location=pagename;
	document.getElementById("iframe").src=templink;
}
function navigates2(pagename,target,data)
{
	if(escape(pagename).search(escape('?'))<1)
	{
		pagename=pagename + "?uniqueid=" + Date().toString();
	}
	else
	{
		pagename=pagename+"&uniqueid=" +  Date().toString();	
	}
	pagename=pagename+"`"+target;
	var currentlink=window.location.toString().split("#");
	pagename=currentlink[0]+"#"+escape(pagename);
	window.location=pagename;
}
//Call this function under iframe
function test()
{
	
	var x=window.location.toString();
	
	x=x.replace("##","#");
	var y= x.split("#");
	
	if(y.length>1)
	{
		
		if(y[1]!="")
		{
			var z=unescape(y[1]).split("`");
			navigates1(z[0],z[1]);
		}
	}
}
function test1(pr)
{
	var x=pr;
	x=x.replace("##","#");
	var y= x.split("#");
	if(y.length>1)
	{
		if(y[1]!="")
		{
			var z=unescape(y[1]).split("`");
			navigates2(z[0],z[1]);
			navigates1(z[0],z[1]);
		}
	}
}

// call this function on every hyperlink (Refresh will not applicable)
function navigates1(pagename,target,data,jsholder)
{
	if(jsholder==undefined || jsholder==NaN || jsholder=='')
		jholdername="jscontainner";
	else
		jholdername=jsholder;
		
	targets=target;
	ajax=createobject();

	if(escape(pagename).search(escape('?'))<1)
	{
		pagename=pagename + "?uniqueid=" + Date().toString();
	}
	else
	{
		pagename=pagename+"&uniqueid=" +  Date().toString();	
	}

	if (ajax==null)
	{
		alert ("Browser does not support HTTP Request");
		return 0;
	}
	document.getElementById("progress").innerHTML="Loading<img src='images/wait1.gif' height='12' border='0'>Please wait"; 
	ajax.onreadystatechange=loadpage;
	ajax.open("GET",pagename,true);
	ajax.setRequestHeader("Accept","text/plain");

	ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
	ajax.send(null);
	
}
function nav(pagename,target)
{
	targets=target;
	ajax=createobject();

	if(escape(pagename).search(escape('?'))<1)
	{
		pagename=pagename + "?uniqueid=" + Date().toString();
	}
	else
	{
		pagename=pagename+"&uniqueid=" +  Date().toString();	
	}

	if (ajax==null)
	{
		alert ("Browser does not support HTTP Request");
		return 0;
	}
	document.getElementById("progress").innerHTML="Loading<img src='images/wait1.gif' height='12' border='0'>Please wait"; 
	//ajax.onreadystatechange=loadpage;
	ajax.open("GET",pagename,false);
	ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
	ajax.send(null);
	var temp=ajax.responseText;
	document.getElementById("div_error").innerHTML="";
document.getElementById("progress").innerHTML=""
	setAndExecute(target,temp);
}
// Use this function for repeated refress in background
function autonavigates(pagename,target,data)
{
	autotargets=target;
	autoajax=createobject();

	if(escape(pagename).search(escape('?'))<1)
	{
		pagename=pagename + "?uniqueid=" + Date().toString();
	}
	else
	{
		pagename=pagename+"&uniqueid=" +  Date().toString();	
	}

	if (autoajax==null)
	{
		alert ("Browser does not support HTTP Request");
		return 0;
	}
	autoajax.onreadystatechange=autoloadpage ;
	autoajax.open("GET",pagename,true);
	autoajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
	autoajax.send(null);
}
function autoloadpage()
{
	
	var autoresult
	if (autoajax.readyState==4 || autoajax.readyState=="complete")
	{ 
		autoresult=autoajax.responseText;
		autoajax=null;
	
		if(autoresult=="")
		{	
			return;
		}
		
		autosetAndExecute(autotargets,autoresult);
		
	}
}

function loadpage()
{
	
	var result
	if (ajax.readyState==4 || ajax.readyState=="complete")
	{ 
	
	result=ajax.responseText;
	ajax=null;
	if(targets=="_blank")
	{
		document.getElementById("div_error").innerHTML="";
		document.getElementById("progress").innerHTML=""
		var x=window.open();
		x.document.body.innerHTML=result;
		return 0;	
	}
	setAndExecute(targets,result);
	document.getElementById("div_error").innerHTML="";
	document.getElementById("progress").innerHTML=""
	
	}
}


function submitform(currentform,target)
{
	
	
	var method=currentform.method;
	method=method.toUpperCase();
	var action=currentform.action
	var data="";//getformvalue(currentform.id);
	
	var syncid=rpc.exec('NewidInt()');
		//alert("Sync:" + syncid);
		
	if(escape(action).search(escape('?'))<1)
	{
		
		action=action + "?targetex=" + target + "&syncid=" + syncid;
	}
	else
	{
		var iof=action.indexOf("&syncid=");
		if(iof>0)
		{
			var tstr=action.substring(iof,(iof+26));	
			action=action.replace(tstr,"");
		}
		
		action=action.replace("&syncid=","&tzmdje=");
		
		if(action.search('targetex')<1)
			action=action+"&targetex=" +  target+ "&syncid=" + syncid;
		else
			action=action+"&syncid=" + syncid;
	}
	
	currentform.action=action;
	
	currentform.target="iframe";
	
	return true;
}
// Ajax for nepali date
function dateutility(parameters)
{
	dte=createobject();
	parameters="http://www.nepalpost.gov.np/utility.asp?" +parameters;
	if (dte==null)
	{
		alert ("Browser does not support HTTP Request");
		return 0;
	}
	dte.open("GET",parameters,true);
	dte.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
	dte.send(null);
	var x= dte.responseText;
	
	return x;
}
function readpage(pagename)
{
	var rp=createobject();
	rp.open("GET",pagename,false);
	rp.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
	rp.send(null);
	var xx = rp.responseText;
	rp=null;
	return xx;
}
// Record set
function getrecordset(pagename,sql)
{
	rst=createobject();
	//alert(sql);
	parameters=pagename + "?sql=" + escape(sql);
	
	if (rst==null)
	{
		alert ("Browser does not support HTTP Request");
		return 0;
	}
	//alert(parameters);
	rst.open("GET",parameters,false);
	rst.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
	rst.send(null);

	var xx= rst.responseText;
		//alert(xx);
	return xx;
	
}
	function recordset()
	{
		this.sql="";
		this.result="";
		this.sqlpage="sql.asp"
		this.rows=0;
		this.cols=0;
		this.pointer=1;
		recordset.prototype.open=function(query)
		{
//			/	%2F

//			(	%28
//			)	%29
//			[	%5B
//			]	%5D
//			?	%3F
//			&	%26
//			!	%21
//			=	%3D
//			<	%3C
//			>	%3E
			query=query.replace(/\%/g,"%25");
			query=query.replace(/\+/g,"%2B");
			query=query.replace(/\'/g,"%27");
			this.responsetext=getrecordset("sql.asp",query)
			eval(this.responsetext);
			this.result=x;
			this.pointer=1;
			
		}
		recordset.prototype.fields=function (index)
		{
			var temp1=this.result[index][this.pointer];
			return temp1;
						
		}
		recordset.prototype.fieldname=function(index)
		{
			return this.result[index][0];
		}
		recordset.prototype.movenext=function()
		{
			if(this.pointer< this.result[0].length-1)
				this.pointer=this.pointer+1;
			else
				this.pointer= this.result[0].length;
		}
		recordset.prototype.moveprevious=function()
		{
			if(this.pointer>1)
				this.pointer=this.pointer-1;
			else
				this.pointer=0;
		}
		recordset.prototype.movefirst=function()
		{
			this.pointer=1;
		}
		recordset.prototype.movelast=function()
		{
			this.pointer=this.result[0].length-1;
			
		}
		recordset.prototype.recordcount=function()
		{
			
			return this.result[0].length-1
		}
		recordset.prototype.fieldscount=function()
		{
			return this.result.length;
		}
		recordset.prototype.eof=function()
		{
			if(this.pointer==this.result[0].length)
				return true;
			else
				return false;
		}
		recordset.prototype.bof=function()
		{
			if(this.pointer<1)
				return true;
			else
				return false;
		}
	}
	
	String.prototype.propercase=function()
	{
		var pram=this;
		if(pram==undefined || pram==NaN)
		return "";
		if(pram=="")
			return "";
		var ret;
		ret=pram;
		ret=prepropercase(ret," ");
		ret=prepropercase(ret,".");
		ret=prepropercase(ret,"?");
		return ret;
	}
		
		function prepropercase(str,delm)
	{
		var x,ret;
		if(delm==" ")
		str=str.toLowerCase();
		x=str.split(delm);
		var loop1;
		ret="";
		for(loop1=0; loop1<x.length;loop1++)
		{
			if(loop1>0)
				ret=ret+delm;
			ret=ret+x[loop1].substr(0,1).toUpperCase();
			if(x[loop1].length>1)
			ret=ret+x[loop1].substr(1,x[loop1].length-1);
		}
		return ret;
	}
	// Key related functions
	// Get Ascii of eky press/down
function getKeyCode(e)
{
		if (window.event) e = window.event; 
	if (window.event)
	   return window.event.keyCode;
	else if (e)
	   return e.which;
	else
	   return null;
}

//Restrict key press
function keyRestrict(e, validchars) { // v3.0
if (window.event) e = window.event; 
	var key='', keychar='';
	key = getKeyCode(e);
	if (key == null) return true;
	keychar = String.fromCharCode(key);
	keychar = keychar.toLowerCase();
	validchars = validchars.toLowerCase();
	if (validchars.indexOf(keychar) != -1)
		return true;
	if ( key==null || key==0 || key==8 || key==9 || key==13 || key==27 )
		return true;
	return false;
}

// Accept inter data only
function intonly(e)
{	
	return keyRestrict(e,'1234567890');
}

// Accept number only with decimal
function floatonly(e)
{
	return keyRestrict(e,'1234567890.');
}


// Accept numbers with mathematical signs
function mathonly(e)
{
	return keyRestrict(e,'1234567890.+-*/%<>=()[]{}');
}


function textonly(e)
{
	return keyRestrict(e,'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ.?!');
}


function dateonly(e)
{
	return keyRestrict(e,'1234567890/');
}


// trim functiom
//===============
function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}
//================

	/*
	<!-- Use this code in index page -->
	<script language="javascript">
		test();
		autonavigates('highlights.asp','highlight')
	</script>
	<iframe height="0" width="0" id="iframe" name="iframe" allowtransparency frameborder="0">
	
	</iframe>*/
	
/*
Use histry.asp or histry.php file
 Use following code in begining of every sub page
 In php:
  if(isset($_REQUEST['targetex']))
			{
				echo "<body onload=\"parent.setAndExecute(document.body.innerHTML,'".$_REQUEST['targetex']."');\">";
			}
			
In ASP:
if request("targetex")<>"" then
	response.write "<body onload=" & chr(34) & "parent.setAndExecute(document.body.innerHTML,'".request('targetex')."');" & chr(34) & ">"
end if
 
*/
function GetWindowWidth()
{
	var width =
		document.documentElement && document.documentElement.clientWidth ||
		document.body && document.body.clientWidth ||
		document.body && document.body.parentNode && document.body.parentNode.clientWidth ||
		0;
		
	return width;
}

function GetWindowHeight()
{
	var height =
		document.documentElement && document.documentElement.clientHeight ||
		document.body && document.body.clientHeight ||
		document.body && document.body.parentNode && document.body.parentNode.clientHeight ||
		0;
		
	return height;
}
function $$(id)
{
	return document.getElementById(id);
}
function dbid(id)
{
	return document.getElementById(id);
}

function centeralign(divid)
{
	var left = window.XMLHttpRequest == null ? document.documentElement.scrollLeft : 0;
	var top = window.XMLHttpRequest == null ? document.documentElement.scrollTop : 0;
	var div = $$(divid);
	
	div.style.left = Math.max((left + (GetWindowWidth() - div.offsetWidth) / 2), 0) + 'px';
	div.style.top = Math.max((top + (GetWindowHeight() - div.offsetHeight) / 2), 0) + 'px';	
}
function hidecombo()
{
	if (document.all)
	{
		ReplaceSelectsWithSpans();
	}
}
function showcombo()
{
	if (document.all)
	{
		RemoveSelectSpans();
	}
}
function RemoveSelectSpans()
{
	var selects = document.getElementsByTagName('select');
	
	for (var i = 0; i < selects.length; i++)
	{
		var select = selects[i];
		
		if (select.clientWidth == 0 || select.clientHeight == 0 || 
			select.nextSibling == null || select.nextSibling.className != 'selectReplacement')
		{
			continue;
		}
			
		select.parentNode.removeChild(select.nextSibling);
		select.style.display = select.cachedDisplay;
	}
}

function ReplaceSelectsWithSpans()
{
	
	var selects = document.getElementsByTagName('select');
	
	for (var i = 0; i < selects.length; i++)
	{
		var select = selects[i];
		
		if (select.clientWidth == 0 || select.clientHeight == 0 || 
			select.nextSibling == null || select.nextSibling.className == 'selectReplacement')
		{
			continue;
		}
			
		var span = document.createElement('span');
		
		// this would be "- 3", but for that appears to shift the block that contains the span 
		//   one pixel down; instead we tolerate the span being 1px shorter than the select
		span.style.height = (select.clientHeight - 4) + 'px';
		span.style.width = (select.clientWidth - 6) + 'px';
		span.style.display = 'inline-block';
		span.style.border = '1px solid rgb(200, 210, 230)';
		span.style.padding = '1px 0 0 4px';
		span.style.fontFamily = 'Arial';
		span.style.fontSize = 'smaller';
		span.style.position = 'relative';
		span.style.top = '1px';
		span.className = 'selectReplacement';
		
		span.innerHTML = select.options[select.selectedIndex].innerHTML;
		
		select.cachedDisplay = select.style.display;
		select.style.display = 'none';
		select.parentNode.insertBefore(span, select.nextSibling);
	}
}

function asignvalue(elementid,elementvalue,url,target)
{	
	$$(elementid).title=elementvalue;
	elementvalue=elementvalue + '............................';
	$$(elementid).value=elementvalue.substr(0,20);
	
}
//----------------------------------- Private functions ---not for ajax
	function loaduser(divid)
	{
		$$('userlist').innerHTML="";
		navigates1('usermanagement/userlist.asp?officeid='+ $$(divid).value,'userlist');
	}
//-----------------------------------End private function--------------


// ===================extended table==================
function addproperty(tableid,innerhtml,propertyname,datatype,fieldid)
{
	var tbl = document.getElementById(tableid).getElementsByTagName('tbody')[0];
			var d = new Date();
			var row_id = d.getDate()+""+d.getMonth() + 1+""+d.getFullYear()+""+d.getHours()+""+d.getMinutes()+""+d.getSeconds()+Math.random(100);
				var _tr = document.createElement('tr');
					_tr.setAttribute('id',row_id);
					var _td;
					_td=document.createElement('td');
					
					_td.innerHTML=innerhtml.replace("####",row_id);
					_td.innerHTML=_td.innerHTML.replace("@@@@",propertyname);
					
					_td.innerHTML=_td.innerHTML.replace("$$$$",propertyname);
					_td.innerHTML=_td.innerHTML.replace("****",fieldid);
					_tr.appendChild(_td);
					tbl.appendChild(_tr);
					if(datatype!="")
					document.getElementById(propertyname+'_datatype').value=datatype;
}
function removeproperty(tableid,rowid)
{
	//if(rowindex<document.getElementById(tableid).rows.length && rowindex>1)
			//{
				var row_to_delete =document.getElementById(rowid).rowIndex; //document.getElementById(tableid).rows[rowindex];
				//alert(row_to_delete);
				if(row_to_delete!=null)
				 {
					document.getElementById(tableid).deleteRow(row_to_delete);
				 }
			//}
}
function removepropertyrows(tableid,fixrows)
{
			
				var r=document.getElementById(tableid).rows.length-1;
				var loop
				for(loop=r;loop>=fixrows;loop--)
				{
				
					document.getElementById(tableid).deleteRow(loop);
				
				}
			//}
}
function extable()
	{
		extable.prototype.addrow=function(tableid,upper)
		{
			var tbl = document.getElementById(tableid).getElementsByTagName('tbody')[0];
			var d = new Date();
			var row_id = d.getDate()+""+d.getMonth() + 1+""+d.getFullYear()+""+d.getHours()+""+d.getMinutes()+""+d.getSeconds();
				var _tr = document.createElement('tr');
					_tr.setAttribute('id',row_id);
					var _td;
					var tlp;
					for(tlp=0;tlp<document.getElementById(tableid).rows[0].cells.length;tlp++)
					{
						_td=document.createElement('td');
						if(upper==1)
						{
							
							var r=document.getElementById(tableid).rows.length-1;
							
							_td.innerHTML=document.getElementById(tableid).rows[r].cells[tlp].innerHTML.replace('value','TVAL');
							
							
						}
						_tr.appendChild(_td);
						
					}
					tbl.appendChild(_tr);
					
		}
		extable.prototype.deleterow=function(tableid,rowindex)
		{
			if(rowindex<document.getElementById(tableid).rows.length && rowindex>1)
			{
				var row_to_delete = document.getElementById(tableid).rows[rowindex];
				if(row_to_delete!=null)
				 {
					document.getElementById(tableid).deleteRow(row_to_delete.rowIndex);
				 }
			}
		}
		extable.prototype.rows=function(tableid)
		{
			return document.getElementById(tableid).rows.length;
		}
		extable.prototype.cols=function(tableid)
		{
			return document.getElementById(tableid).rows[0].cells.length;
		}
		extable.prototype.textmatrix=function(tableid,r,c,text)
		{
			text=text+'';
			if(text=='')
			{
				document.getElementById(tableid).rows[r].cells[c].innerHTML=text;
			}
			else
			{
				return document.getElementById(tableid).rows[r].cells[c].innerHTML;
			}
		}
	}
	var  etable=new extable();
//===================end ex table=========================================


//============================================================================




function addRow(tableid)
	{
		var noofcol=document.getElementById(tableid).rows[0].cells.length;
		var noofrows=document.getElementById(tableid).rows.length;
		var tbl = document.getElementById(tableid).getElementsByTagName('tbody')[0];
		var d = new Date();
		var row_id = d.getDate()+""+d.getMonth() + 1+""+d.getFullYear()+""+d.getHours()+""+d.getMinutes()+""+d.getSeconds()+Math.random(100);
		var _tr = document.createElement('tr');
		_tr.setAttribute('id',row_id);
		var _td;
		var tlp;
			
		for(tlp=0;tlp<document.getElementById(tableid).rows[0].cells.length;tlp++)
					{
						var r=document.getElementById(tableid).rows.length-1;
						_td=document.createElement('td');
						_td.innerHTML='&nbsp';
						_tr.appendChild(_td);
						_tr.appendChild(_td);
					}
					tbl.appendChild(_tr);	
					return row_id;
	}
	
	function addtextmattrix(tableid,col1name,col1value,col1text,col2name,col2value,col2text,col3name,col3value,col3text,col4name,col4value,col4text,col5name,col5value,col5text,col6name,col6value,col6text,col7name,col7value,col7text,chk){	
	//alert(col1text);
	if(trim(col1name)=="" || trim(col1value)=="" || trim(col1text)=="")
	{
		alert("Please, select Product Source !");
		$$('sourceidm').focus();
		return;
	}
	
	if( col2name=="" || trim(col2value)=="" || col2text=="")
	{
		alert('Please, select Product  !');
		$$('productidm').focus();
		return;
	}
	if( col3name=="" || parseInt(col3value)==0 || col3text=="")
	{
		alert('Please, Enter Product Quantity !');
		$$('qtyinm').focus();
		return;
	}
	if(chk==1){
		
	if( col4name=="" || parseFloat(col4value)<1 || col4text=="")
	{
		alert('Please, Enter Product Rate !');
		$$('qtyinm').focus();
		return;
	}	
		
	}
	
		var row_id=addRow(tableid);
		textmattrix(tableid,-1,0,"<input type='hidden' id='"+col1name+"' name='"+col1name+"' value='"+col1value+"'>"+col1text);
		textmattrix(tableid,-1,1,"<input type='hidden' id='"+col2name+"' name='"+col2name+"' value='"+col2value+"'>"+col2text);
		textmattrix(tableid,-1,2,"<input type='hidden' id='"+col3name+"' name='"+col3name+"' value='"+col3value+"'>"+col3text);
		textmattrix(tableid,-1,3,"<input type='hidden' id='"+col4name+"' name='"+col4name+"' value='"+col4value+"'>"+col4text);
		textmattrix(tableid,-1,4,"<input type='hidden' id='"+col5name+"' name='"+col5name+"' value='"+col5value+"'>"+col5text);
		textmattrix(tableid,-1,5,"<input type='hidden' id='"+col6name+"' name='"+col6name+"' value='"+col6value+"'>"+col6text);
		textmattrix(tableid,-1,6,"<input type='hidden' id='"+col7name+"' name='"+col7name+"' value='"+col7value+"'>"+col7text);
		textmattrix(tableid,-1,7,"<a href=\"javascript:removerow('"+tableid+"','"+row_id+"');\">X</a>");
		document.getElementById('balance').value=(parseInt(document.getElementById('balance').value)-parseInt(document.getElementById('qtyoutm').value));
		document.getElementById('qtyoutm').value="";
		document.getElementById('ratem').value="";
		document.getElementById('discountm').value="";
		document.getElementById('totalm').value="";
		document.getElementById('remarksmd').value="";
	}
	
	
	function textmattrix(tableid,rono,colno,texts)
	{
		if(rono==-1)
			rono=document.getElementById(tableid).rows.length-1;
		if(colno<0)
			colno=0;
		document.getElementById(tableid).rows[rono].cells[colno].innerHTML=texts;
		
		//alert(texts);
	}
	function removerow(tableid,rowid)
	{
	var row_to_delete =document.getElementById(rowid).rowIndex; //document.getElementById(tableid).rows[rowindex];
				if(row_to_delete!=null)
				 {
					document.getElementById(tableid).deleteRow(row_to_delete);
				 }
		
	}
	
function getsum(elementid) {
  var elementCount = document.all(elementid).length;
  var sum=0;
  
  if(elementCount<2 || elementCount==undefined || elementCount==NaN)
  {
	sum= parseFloat($$(elementid).value);
  }
  else
  {
  for (i=0; i<elementCount; i++) {
	sum=parseFloat(sum) + parseFloat(0 + document.all(elementid,i).value);
	//sum=Math.round(sum * 100) / 100;
	sum=Math.Number(sum);
	
  }
  }
 // sum=Math.round(sum).toFixed
 sum=Math.round(sum * 100) / 100;
 //sum=Number((sum).toFixed(2));
  return sum;
}
	
	






//=============================================================================

function getrpc(pagename,procedure)
{
	rst=createobject();
	parameters=pagename + "?uniqueid1=" + Date().toString();
	
	if (rst==null)
	{
		alert ("Browser does not support HTTP Request");
		return 0;
	}
	//alert(parameters);
	rst.open("POST",parameters,false);
	rst.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
	var dta="procedure=" + procedure + "&uniqueid=" + Date().toString();
	rst.setRequestHeader("Content-length", dta.length);
	rst.send(dta);
	var xx= rst.responseText;
	//alert(xx);
	return xx;
}
function clsrpc()
{
	this.responsetext="";
		this.pagename="rpc.asp";
		clsrpc.prototype.exec=function(procedure)
		{
			
			this.responsetext=getrpc(this.pagename,escape(procedure));
			
			return this.responsetext;
			
		}

}
function loadjs(src,removeprevious) {
	
	var scriptid = src.split("?")[0];
	scriptid = scriptid.replace(/ /g, "");
	scriptid = scriptid.replace(/:/g, "");
	scriptid = scriptid.replace(/\//g, "");
	scriptid = scriptid.replace("http", "");
	scriptid = scriptid.replace("www", "");
	scriptid = scriptid.replace(".", "");
	scriptid = scriptid.replace("?", "");
	scriptid = scriptid.replace("=", "");
	scriptid = scriptid.replace("-", "");
	
	var found = "";
	try {
		var j = document.getElementById(scriptid);
			if(j.id!='')
			{
			if(removeprevious==1)
			{
			document.body.removeChild(j);
			found="";
			
			}
			else
			{
				found="yes";
				
			}
			}
		}
		catch(e){}
	/*try
	{
		var j = document.getElementById(escape(scriptid));
	var k = j.id;
	found = "yes";
	
	}
	catch(e) {*/
		if (found == "") {
			var js = document.createElement('script');
			js.setAttribute('type', 'text/javascript');
			js.setAttribute('id', escape(scriptid));
			js.setAttribute('src', src);
			//document.getElementsByTagName("head")[0].appendChild(js);
			document.body.appendChild(js);
			//Read file from server
			return;  //This is another method, from which we can retrive content of js file and append in script tag
			var jsfile = createobject();
			
			if (jsfile == null) {
				alert("Browser does not support HTTP Request");
				return 0;
			}
			jsfile.open("GET", src, false);
			jsfile.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
			jsfile.send(null);
			var jssource = jsfile.responseText;
			//End read
			
			//document.body.appendChild(js);
			//js.innerHTML = jssource;
			//document.getElementsByTagName("head")[0].appendChild(js);
		/*}*/
}

}

function loadstyle(src) {
	var scriptid = src;
	scriptid = scriptid.replace(/ /g, "");
	scriptid = scriptid.replace(/:/g, "");
	scriptid = scriptid.replace(/\//g, "");
	scriptid = scriptid.replace("http", "");
	scriptid = scriptid.replace("www", "");
	
		try {
			var j = document.getElementById(escape(scriptid));
		var k = j.id;
	}
catch (e) {

	var fileref = document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", src);
	fileref.setAttribute('id', escape(scriptid));
  if (typeof fileref != "undefined")
	  document.getElementsByTagName("head")[0].appendChild(fileref);
 }

}


/*		var styles = document.createElement('link');
		styles.setAttribute('rel', 'stylesheet');
		styles.setAttribute('type', 'text/css');
		styles.setAttribute('id', escape(src));
		styles.setAttribute('href', src);
		document.body.appendChild(styles);
	}*/

function setjs(src,srcid) {
	loadready = 0;
	//alert(src);
	//jscontainner
	if(srcid==undefined || srcid=="" || srcid==NaN)
		srcid="jscontainner";
		//alert(srcid);
	var found = "";
	try {
		var j = document.getElementById(srcid);
		document.body.removeChild(j);
		}
catch (e) {
			var k = 0;
	}
		var j = document.createElement('script');
		j.setAttribute('type', 'text/javascript');
		j.setAttribute('id', srcid);
		
		try{
		j.innerHTML=src;
		}catch(e)
		{
			
			j.innerText=src;
			//eval(src);	
		}
		
		document.body.appendChild(j);
		//j.innerHTML = src;
		
		
}

var rpc=new clsrpc();

function val(x)
{	
	var ret=0;
	ret=rpc.exec("val(``"+ x + "``)");
	
	return ret;
}


function ShowNav(divid,dispval){
	if(divid ==undefined || trim(divid)=="" )
		divid="navtext";
	document.getElementById(divid).innerHTML=' > ' +dispval;
	
}

function createserial(tableid,colno)
{
		
	var mytable=document.getElementById(tableid);
	
	var i;
	for(i=1; i<=parseInt(mytable.rows.length)-1;i++)
	{
		
		mytable.rows[i].cells[colno].innerHTML=i;
	}
}


///================ function fop paging records===================


function sendfeedback(form_id,email){
	
	if(trim(document.getElementById('Subject').value)==""){
		 alert('Please Enter Subject  !');
		 document.getElementById('Subject').focus();
		 return false;
	}
	//alert(trim(document.getElementById('Email').value).length);
		if(trim(document.getElementById('Email').value).length>0){
			 if(validate('frmfeddback',email)==false){
			  document.getElementById('Email').focus();
			  return false;
			 }
		}
	if(trim(document.getElementById('Comment').value)==""){
		 alert('Please Enter Comment  !');
		 document.getElementById('Comment').focus();
		 return false;
	}
	 return submitform(form_id,'scrollcontent');	
}


function pagingrecords(orderby,ordertype,linkid,cpage,limit,filter,target)
  {
	//  alert(orderby+ordertype+linkid+cpage+limit+filter+target);
		 if(target==NaN || target==undefined)
			target="scrollcontent";
		if(filter==NaN || filter==undefined)
			filter="no";		
		if(linkid==NaN || linkid==undefined )
			linkid="403";
		if(cpage==NaN || cpage==undefined)		
			cpage=document.getElementById("list").value; // current page which is displayed
		if(limit==NaN || limit==undefined)
			limit=document.getElementById("perpage").value; // No. of row displayed 
			
	
	  navigates1('fileindex.php?'+linkid+'&filter='+filter+'&stat=1&page='+cpage+"&limit="+limit+"&orderby="+orderby+'&ordertype='+ordertype,target);
  }
  
  
  function toggle_visibility(id) {
	   var e = document.getElementById(id);
	   if(e.style.display == 'block')
		  e.style.display = 'none';
	   else
		  e.style.display = 'block';
	}
	
	 function toggle_expand(th,did) {
	   var e = document.getElementById(did);
	  if(e.multiple==true){
			e.removeAttribute('multiple');
			th.src='images/icon-expand.gif';
			th.title='Allow multiple selections';
			e.style.height="20px";
	  }
	  else{
		e.setAttribute('multiple', 'true');
		th.src='images/icon-shrink.gif';
		th.title='Allow only single selection';
		e.style.height="60px";
	  }
	  
	   //alert(id.multiple);
	}
	



function validate(form_id,email) {
   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   var address = document.forms[form_id].elements[email].value;
   
		if(reg.test(address) == false) {
			  alert('Invalid Email Address');
		return false;
	  }
  
	return true;
}
function additem(combobox,text,value)
{
	// Create an Option object 
	//combobox='patrakarid';
		var opt = document.createElement("option");
		//alert(document.getElementById(combobox).value);
		//window.document.getElementById(combobox).clearItems();
		window.document.getElementById(combobox).options.add(opt);
		opt.text = text;
		opt.value = value;
}
function removeall(combobox)
{
	while (document.getElementById(combobox).options.length)
			document.getElementById(combobox).remove(0);
}
function removeitem(combobox,index)
{
	document.getElementById(combobox).remove(index);
}


function isEmpty(str) {
  // Check whether string is empty.
  for (var intLoop = 0; intLoop < str.length; intLoop++)
   if (" " != str.charAt(intLoop))
	return false;
  return true;
 }

 function checkRequired(f) {
  var strError = "";
  for (var intLoop = 0; intLoop < f.elements.length; intLoop++)
  if (null!=f.elements[intLoop].getAttribute("required")) 
   if (isEmpty(f.elements[intLoop].value))
	strError += "  " + f.elements[intLoop].name + "\n";
   if ("" != strError) {
	alert("Required data is missing:\n" + strError);
	return false;
   } else
  return true       
 }
 
 
 
  function exchangeCmb(selval,source,destination,optsource,actions,ctltype){
var ie=document.all&&!window.opera? document.all : 0;
var frmObj=ie? ie[source] : document.getElementById(source);
var toObj=ie? ie[destination] : document.getElementById(destination);
var optsourceObj=ie? ie[optsource] : document.getElementById(optsource);

toObj.style.width=frmObj.offsetWidth+10+'px'


var sr = source.split("~");
var iid=sr[1];

fn="save_exchangeCmb('"+iid+"','"+source+"','sel_"+source+"','"+ actions+"',1);"
toObj.innerHTML="<select id='sel_"+source+"' name='sel_"+source+"' onblur="+fn+">"+optsourceObj.innerHTML+"</select>";
var ntoObj=ie? ie['sel_'+source] : document.getElementById('sel_'+source);

toObj.style.display='block';
toObj.focus();
ntoObj.value=selval;

ntoObj.style.width='90px'
frmObj.style.display='none';
}

function save_exchangeCmb(pkid,spnid,ctrlid,pages,dtype){
var ie=document.all&&!window.opera? document.all : 0;

var ctrlid=ie? ie[ctrlid] : document.getElementById(ctrlid);
var spnid=ie? ie[spnid] : document.getElementById(spnid);

var sr = spnid.id.split("~");
var upflds=sr[0];
url=pages+"?&InUpdate=lUpdate&pid="+pkid+"&upflds="+upflds+"&upvalues="+ctrlid.value+"&dtype="+dtype;
spnid.innerHTML=ctrlid.options[ctrlid.selectedIndex].text;
ctrlid.style.display='none';
spnid.style.display='block';
navigates1(url,'div_error');
}




 
  function exchange(source,destination){
	  
var ie=document.all&&!window.opera? document.all : 0;
var frmObj=ie? ie[source] : document.getElementById(source);
var toObj=ie? ie[destination] : document.getElementById(destination);
toObj.style.width=frmObj.offsetWidth+10+'px'
frmObj.style.display='none';
toObj.style.display='block';
if(document.all){
toObj.value=frmObj.innerText;
inline_oldvalue=frmObj.innerText;
}
else
{
	toObj.value=frmObj.textContent;
	inline_oldvalue=frmObj.textContent;
}
toObj.focus();
}

function save_exchange(pkid,spnid,ctrlid,pages,dtype){
//For temp
ctrlid.style.display='none';
spnid.style.display='block';
return 0
//End temp
var ie=document.all&&!window.opera? document.all : 0;

var ctrlid=ie? ie[ctrlid] : document.getElementById(ctrlid);
var spnid=ie? ie[spnid] : document.getElementById(spnid);

var sr = spnid.id.split("~");
var upflds=sr[0];
url=pages+"?&InUpdate=lUpdate&pid="+pkid+"&upflds="+upflds+"&upvalues="+trim(ctrlid.value)+"&dtype="+dtype;
//alert(url);
spnid.innerHTML=ctrlid.value;
ctrlid.style.display='none';
spnid.style.display='block';
navigates1(url,'div_error');
}
var inline_oldvalue="";
function save_exchangeex(spnid1,ctrlid1,tablename,fieldname,condition){
//For temp
//var spanid=document.getElementById(spnid1);
//var ctrlid=document.getElementById(ctrlid1);
//ctrlid.style.display='none';
//spnid.style.display='block';
//return 0
//End temp
var ie=document.all&&!window.opera? document.all : 0;

var ctrlid=ie? ie[ctrlid] : document.getElementById(ctrlid1);
var spnid=ie? ie[spnid] : document.getElementById(spnid1);
//%3D=>=


	
var pages="updatesingle.asp?tname="  + tablename + "&fname=" + fieldname + "&fvalue=" + ctrlid.value + "&condition=" + condition;
var sr = spnid.id.split("~");
var upflds=sr[0];
//url=pages+"?&InUpdate=lUpdate&pid="+pkid+"&upflds="+upflds+"&upvalues="+trim(ctrlid.value)+"&dtype="+dtype;
url=pages;
//alert(url);

var ret=0;
spnid.innerHTML=ctrlid.value;
ctrlid.style.display='none';
spnid.style.display='block';
if(("" + inline_oldvalue)!=ctrlid.value)
{	ret=1;
	navigates1(url,'div_error');
}
return ret;
//navigates1(url,'_blank');

}
//Data grid class

function datagrid(gridvar,valueelement)
	{
		this.gridholder=gridvar;
		this.myarray=new Array();
		this.valuecontrol=valueelement;
		datagrid.prototype.addrow=function(values)
		{
			
			this.myarray.push(values);
			this.gridholder.clearAll();
			this.gridholder.parse(this.toStrings(),"csv");
			
		}
		datagrid.prototype.removerow=function(index)
		{
			//alert(index);
			
			if(index>=this.myarray.length)
				return;
			else
			{
				if(index==this.myarray.length-1)
					this.myarray.pop();
				else
				{
					var i=0;
					for(i=index;i<this.myarray.length-1;i++)
					{
						this.myarray[i]=this.myarray[i+1];
					}
					this.myarray.pop();
				}
				
			}
			this.gridholder.clearAll();
			this.gridholder.parse(this.toStrings(),"csv");
		}
		datagrid.prototype.updaterow=function(index,values)
		{
			if(index>=this.myarray.length)
				return;
			else
				this.myarray[index]=values;
				this.gridholder.clearAll();
				this.gridholder.parse(this.toStrings(),"csv");
		}
		datagrid.prototype.rows=function()
		{
			
			return this.myarray.length;
		}
		datagrid.prototype.cols=function()
		{
			if(this.myarray.length>0)
			{
				var temp=this.myarray[0].split(",");
				return temp.length;
			}
			else
			{
				return 0;
			}
		}
		datagrid.prototype.setvalue=function(row,col,value)
		{
			if(row>=this.myarray.length)
				return;
			else
			{
				var temp=this.myarray[row].split(",");
				if(col>=temp.length)
					return;
				else
				{
					temp[col]=value;
					var l1=0;
					var trdata="";
					for(l1=0;l1<temp.length;l1++)
					{
						if(l1==0)
							trdata=temp[l1];
						else
							trdata=trdata + "," + temp[l1];
					}
					this.updaterow(row,trdata);
				}
			
			}
			this.gridholder.clearAll();
			this.gridholder.parse(this.toStrings(),"csv");
		}
		datagrid.prototype.getvalue=function(row,col)
		{
			if(row>=this.myarray.length)
				return;
			else
			{
				var temp=this.myarray[row].split(",");
				if(col>=temp.length)
					return;
				else
				{
					return temp[col];
				}
			}
		}
		datagrid.prototype.toStrings=function()
		{
			var temp="";
			var loop1=0;
			for(loop1=0;loop1<this.myarray.length;loop1++)
			{
				if(loop1==0)
					temp=this.myarray[loop1];
				else
					temp=temp + "\n" + this.myarray[loop1];
			}
			document.getElementById(this.valuecontrol).value=this.rows()+"#"+this.cols()+"#"+temp.replace(/\n/g,";");
			return(temp);
		}
		datagrid.prototype.getsum=function(c)
		{
			
			if(c>=this.cols())
				return 0;
			var i=0;
			var sl=0;
			for(sl=0;sl<this.rows();sl++)
			{
				i=i+parseFloat(this.getvalue(sl,c));
			}
			//i=Math.round(i*100)/100;
			i=roundit(i,2);
			
			return i;
		}
		datagrid.prototype.clearall=function()
		{
			this.gridholder.clearAll();
			while(this.myarray.length>0)
				this.myarray.pop();
		}
	}
	
	function roundit(value,len)
	{
		var ret=0;
		ret=rpc.exec("roundit("	+ value + "," + len + ")");
		return parseFloat(ret);
	}
	
	//Create object as server side
	
	var Collection=function()
	{
		this.count=0;
		this.collection={};
		this.add=function(key,item)
		{
		 if(this.collection[key]!=undefined)
		                      return undefined;
		 this.collection[key]=item;
		 return ++this.count
		}
		this.remove=function(key)
		{
		 
		 if(typeof(key)=="number")
		 {
			var nkey=this.keys(key);
			if(nkey==undefined)
				return undefined;
			delete this.collection[nkey];
		}
		else
		{
			if(this.collection[key]==undefined)
		                       return undefined;
			delete this.collection[key]
		}
		 return --this.count
		}
		this.item=function(key)
		{
			if(typeof(key)=="number")
			{
				var ti=-1;
				for (index in this.collection)
				{
					ti++;
					if(key==ti)
						return this.collection[index];
				}
			}
			else
			{
				return this.collection[key];
			}
		}
		this.keys=function(ind)
		{
			var ti=-1;
			for (index in this.collection)
			{
				ti++;
				if(ind==ti)
					return index;
			}
		}
	}
	/*var c=new Collection();
	c.add("Pankaj","Adhikari");
	c.add("Bishnu","Barakoti");
	c.remove(2);
	var l1=0;
	for(l1=0;l1<c.count;l1++)
	{
		alert(c.keys(l1));
		alert(c.item(l1));
		
	}*/
	var servers = function () {
	    this.createobject = function (ClassName, ctype) {
	        this.classname = ClassName;
	        this.lastfunction = "";
	        if (ctype == undefined)
	            ctype = 0;
	        this.classtype = ctype
	        this.properties = new Collection();
	        this.setproperty = function (property, value) {
	            this.properties.remove(property);
	            this.properties.add(property, value);
	        }
	        this.getproperty = function (property) {
	            return this.properties.item(property);
	        }
	        this.ajax = null

	        this.exec = function (method, parameters) {
	            this.lastfunction = method;
	            if (window.XMLHttpRequest) {
	                this.ajax = new XMLHttpRequest()
	            }
	            else if (window.ActiveXObject) {
	                this.ajax = new ActiveXObject("Microsoft.XMLHTTP")
	            }
	            var p = "";
	            var m = "";
	            var par = "noparm:noparm";
	            var l1 = 0;
	            //Read properties
	            for (l1 = 0; l1 < this.properties.count; l1++) {
	                if (p == "")
	                    p = this.properties.keys(l1) + ":" + this.properties.item(l1);
	                else
	                    p = p + "#" + this.properties.keys(l1) + ":" + this.properties.item(l1);
	            }
	            if (p == "")
	                p = "noprop:noprop";
	            //Read methods
	            m = "method:" + method;
	            //Read parameters
	            if (parameters == undefined)
	                parameters = new Array();
	            for (l1 = 0; l1 < parameters.length; l1++) {
	                if (par = "noparm:noparm")
	                    par = "parm:" + parameters[l1];
	                else
	                    par + par + ":" + parameters[l1];
	            }
	            var mypage = escape("classname:" + this.classname + "~" + "classtype:" + this.classtype + "~" + p + "~" + m + "~" + par);
	            mypage = "q=" + mypage;
	            //alert(unescape(mypage));
	            this.ajax.open("POST", "rpcex.asp", false);
	            this.ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
	            this.ajax.send(mypage);
	            var xx = this.ajax.responseText;
	            this.ajax = null;
	            return xx;

	        }
	        this.render = function (divId, innerHTML, ej) {
	            //alert(innerHTML);
	            //Write code here
	            Globalscript = "";
	            var div = document.getElementById(divId);
	            if (innerHTML == "")
	                return;
	            if (innerHTML.substr(0, 6) == "script") {

	                eval(innerHTML.substr(6, innerHTML.length - 6));
	                document.getElementById("div_error").innerHTML = "";
	            }
	            else {
	                var tempHTML = innerHTML;
	                var mypos = -1;
	                mypos = tempHTML.indexOf("<script", mypos);
	                while (mypos != -1) {
	                    var closepos = mypos;
	                    closepos = tempHTML.indexOf("<\/script>", closepos);
	                    var myscript = tempHTML.substring(mypos, (closepos + 9));
	                    //alert(mypos + "to" + closepos);
	                    replacechar(myscript);
	                    innerHTML = innerHTML.replace(myscript, "");
	                    mypos = tempHTML.indexOf("<script", (mypos + 7));

	                }

	                var originalHTML = innerHTML;

	                div.innerHTML = innerHTML;
	                // Load entire style sheet
	                var astyle = div.getElementsByTagName("link");

	                for (var s = 0; s < astyle.length; s++) {
	                    if (astyle[s].href == "" || astyle[s].href == undefined) {
	                        var ass = 0;
	                    }
	                    else {
	                        loadstyle(astyle[s].href);
	                    }
	                }


	                Globalscript = Globalscript.replace('theForm.submit();', 'submitform(theForm,\'' + divId + '\');theForm.submit();');
	                //alert(Globalscript);
	                setjs(Globalscript, "rpcobject_" + this.classname + '_' + this.lastfunction);
	                Globalscript = "";


	                document.getElementById("div_error").innerHTML = "";

	            }
	            if (ej != 1) {
	                ejs();
	            }
	        }

	    }
	}
	var server=new servers();
	//var rs=new server.createobject("GKDate2056.GKUtilities",1)
	//var parameters=new Array();
	//parameters[0]="C";
	//document.write(rs.exec("DriveSerial",parameters));
	
	function getlanguage()
	{
		var ret=rpc.exec('getlanguage()');
		return ret;
	}
	
	function isNumeric(input){
    return !isNaN(input);
  }
  function isInt(input){
    return !isNaN(input)&&parseInt(input)==input;
  }
  function isArray(input){
    return typeof(input)=='object'&&(input instanceof Array);
  }
  function isEmail(input) {

    var email = input;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email.value)) {
        return true;
 		}
	else
		return true;
}
function isUrl(url)
{
     return url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
}
//Value parameter - required. All other parameters are optional.
function isDate1(value, sepVal, dayIdx, monthIdx, yearIdx) {
    try {
        //Change the below values to determine which format of date you wish to check. It is set to dd/mm/yyyy by default.
        var DayIndex = dayIdx !== undefined ? dayIdx : 0; 
        var MonthIndex = monthIdx !== undefined ? monthIdx : 0;
        var YearIndex = yearIdx !== undefined ? yearIdx : 0;
 
        value = value.replace(/-/g, "/").replace(/\./g, "/"); 
        var SplitValue = value.split(sepVal || "/");
        var OK = true;
        if (!(SplitValue[DayIndex].length == 1 || SplitValue[DayIndex].length == 2)) {
            OK = false;
        }
        if (OK && !(SplitValue[MonthIndex].length == 1 || SplitValue[MonthIndex].length == 2)) {
            OK = false;
        }
        if (OK && SplitValue[YearIndex].length != 4) {
            OK = false;
        }
        if (OK) {
            var Day = parseInt(SplitValue[DayIndex], 10);
            var Month = parseInt(SplitValue[MonthIndex], 10);
            var Year = parseInt(SplitValue[YearIndex], 10);
 
            if (OK = ((Year > 1900) && (Year < new Date().getFullYear()))) {
                if (OK = (Month <= 12 && Month > 0)) {

                    var LeapYear = (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0));   
                    
                    if(OK = Day > 0)
                    {
                        if (Month == 2) {  
                            OK = LeapYear ? Day <= 29 : Day <= 28;
                        } 
                        else {
                            if ((Month == 4) || (Month == 6) || (Month == 9) || (Month == 11)) {
                                OK = Day <= 30;
                            }
                            else {
                                OK = Day <= 31;
                            }
                        }
                    }
                }
            }
        }
        return OK;
    }
    catch (e) {
        return false;
    }
} 
function isDate(input)
{
	return true;	
}

function toTitleCase(obj)
{
	var str=obj.value;
    obj.value= str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


function createautocomplete(fieldid,sourcepage,wth) {
		
		$(fieldid).autocomplete(sourcepage, {
		width: wth,
		matchContains: true,
		//mustMatch: true,
		//minChars: 0,
		//multiple: true,
		//highlight: false,
		//multipleSeparator: ",",
		selectFirst: false
	});
}
function alert1(msg,types)
{
	if(types=='' || types==undefined || types==NaN)
		types='info';
	$.messager.alert('TABUCS',msg,types);  
}
function confirm1(msg){ 
	
            $.messager.confirm('TABUCS', msg, function(r){  
                if (r){  
                    return r;
                }  
            });  
			
        }  
		function prompt1(){  
            $.messager.prompt('My Title', 'Please type something', function(r){  
                if (r){  
                    return r;
                }  
            });  
        }  
		function updatestatus(r)
		{
			document.title=r;	
		}
	try{
	window.addEventListener("message", receiveMessage, false);  //stopped for only ie
	}
	catch(e)
	{}
	function receiveMessage(event)
	{
 		updatestatus(event.data);
	}


function deleterow(rptno,indx){  
    $.messager.confirm('Confirm','Are you sure?',function(r){  
        if (r){			  
			$('#tt').datagrid('deleteRow', indx); 
			return  navigates1("delrptpara.asp?rptno="+rptno,'div_error'); 			 
        }  
    });  
} 


function Chk_All_Ind(sobj,tobj)
{
	//empid
	//alert($$(obj+lp).checked);
	lval=sobj.value;
	for(lp=1;lp<=lval;lp++){
		$$(tobj+lp).checked= (sobj.checked);
	
    }
}


/*
<%
Response.write isValidEmail("david@codetoad.com") & "<BR>"
Response.write isValidEmail("davidcodetoadcom")

Function isValidEmail(myEmail)
  dim isValidE
  dim regEx
  
  isValidE = True
  set regEx = New RegExp
  
  regEx.IgnoreCase = False
  
  regEx.Pattern = "^[a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$"
  isValidE = regEx.Test(myEmail)
  
  isValidEmail = isValidE
End Function%>
*/
//Functions related to jeasyui

function newid()
	{
		var d=new Date();
		var x= d.getTime();
		var xa=d.getHours();
		var y=d.getMonth();
		var xx=String.fromCharCode((65 + xa));
		var yy=String.fromCharCode((65 + y));
		
			return "SAIPALTECH" + xx + x + yy;
	}
	function isexist(id)
	{
		var ret
		
		try{
		if(document.getElementById(id))
			ret=true;
		else
			ret=false;
		}catch(e){}
		return ret;
	}
function forms(url,title,height,width,model,icon)
{
	title = typeof title !== 'undefined' ? title : "PFMIS";
	if(title=="")
		title="PFMIS";
	model = typeof model !== 'undefined' ? model : true;
	if(model=="")
		model=true;
	icon = typeof icon !== 'undefined' ? icon : "save";
	if(icon=="")
		icon="save";
	height = typeof height !== 'undefined' ? height : 350;
	if(height=="0" || height=="")
		height=350;
	width = typeof width !== 'undefined' ? width : 400;
	if(width=="0" || width=="")
		width=400;
	this.names=newid();
	this.url=url;
	this.title=title;
	this.model=model;
	this.icon=icon;
	this.height=height;
	this.width=width;
	this.m_onclose="";
	forms.prototype.load=function()
	{
		if(isexist(this.names)==false)
		{
			var tempdiv=document.createElement("DIV");
			tempdiv.setAttribute('id',this.names);
			document.body.appendChild(tempdiv);
			 $('#'+ this.names).window({
				 	width:this.width,  
    				height:this.height,  
    				modal:this.model,
					title:this.title,
					iconCls:this.icon
					
				 }); 
			var tempscript=document.createElement("SCRIPT");
			tempscript.setAttribute('id','script_'+this.names);	 
			tempscript.setAttribute('language','javascript');	
			try{
		tempscript.innerHTML="$('#'+ '" + this.names + "').window({onClose:function(){forms_oncloseevent('"+ escape(this.m_onclose) +"');closeform('" + this.names + "')}});"
		}catch(e)
		{
			
			tempscript.innerText="$('#'+ '" + this.names + "').window({onClose:function(){forms_oncloseevent('"+ escape(this.m_onclose) +"');closeform('" + this.names + "')}});"
			//eval(src);	
		}
		
		document.body.appendChild(tempscript);
			
		}
		$('#'+ this.names).window('refresh',this.url);
	}
	forms.prototype.show=function()
	{
		
		this.load();
		$('#'+ this.names).window('open');
		
	}
	forms.prototype.close=function()
	{
		$('#'+ this.names).window('close');
		try{
		var tempdiv=document.getElementById(this.names);
		tempdiv.parentNode.removeChild(tempdiv);
		}catch(e){}
		
	}
	forms.prototype.onclose=function(script_onclose)
	{
		this.m_onclose=script_onclose;	
	}
	forms.prototype.unload=function()
	{
		this.close();
	}
	forms.prototype.controls=function(m_id)
	{
		//var tempdiv=document.getElementById(this.names);
		return document.getElementById(m_id)
	}
	forms.prototype.title=function(m_title)
	{
		$('#'+ this.names).window('title',m_title);
	}
	forms.prototype.model=function(m_model)
	{
		$('#'+ this.names).window('model',m_model);
	}
	forms.prototype.collapsible=function(m_collapsible)
	{
		$('#'+ this.names).window('collapsible',m_collapsible);
	}
	forms.prototype.minimizable=function(m_minimizable)
	{
		$('#'+ this.names).window('minimizable',m_minimizable);
	}
	forms.prototype.maximizable=function(m_maximizable)
	{
		$('#'+ this.names).window('maximizable',m_maximizable);
	}
	forms.prototype.resizable=function(m_resizable)
	{
		$('#'+ this.names).window('resizable',m_resizable);
	}
	forms.prototype.hwind=function()
	{
		return this.names;	
	}
	forms.prototype.seturl=function(u)
	{
		this.url=u;	
	}
	forms.prototype.geturl=function()
	{
		return this.url;	
	}
	
}
function forms_oncloseevent(s)
{
	if(s!='')
	{
		eval(unescape(s));
	}
}
function closeform(formname)
{
	
	try{
		$('#'+ formname).window('destroy');
	}catch(e){}
	try{
		var tempdiv=document.getElementById(formname);
		tempdiv.parentNode.removeChild(tempdiv);
		}catch(e){}	
		
		try{
		var tempscript=document.getElementById("script_" + formname);
		tempscript.parentNode.removeChild(tempscript);
		}catch(e){}	
		
}

	var m_flag=true;
	function startpause()
	{
		while(m_flag)
		{
			alert("pause");
			setTimeout("startpause()",100)
		}
	}
	function endpause()
	{
		m_flag=false;
		alert("Resume");
	}
	//savesetting(Appname,section,key,value)
function savesetting(appname,section,key,value)
{
	appname=appname+"_" + section + "_" + key;
	var exdays=20;
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+	exdate.toUTCString());
	document.cookie=appname + "=" + c_value;
}
function getsetting(appname,section,key,value)
{
	
	var c_name=appname=appname+"_" + section + "_" + key;
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1)
	  {
	  c_start = c_value.indexOf(c_name + "=");
	  }
	if (c_start == -1)
	  {
	  c_value = null;
	  }
	else
	  {
	  c_start = c_value.indexOf("=", c_start) + 1;
	  var c_end = c_value.indexOf(";", c_start);
	  if (c_end == -1)
	  {
	c_end = c_value.length;
	}
	c_value = unescape(c_value.substring(c_start,c_end));
	}
	if (c_value==null || c_value=="")
	{
		if(value==null || value==NaN || value==undefined)
			cvalue="";
		else
		{
		c_value=value;
		}
	}
	
	return c_value;
}

function datetoint(ndate)
{
	var ret=0;
	var ta=ndate.split("/");
	if(ta.length>2)
	{
		//set @ret=(@y*500)+(@m*34)+@d
		ret=(parseInt(ta[0])*500)+(parseInt(ta[1])*34)+(parseInt(ta[2]))
	}
	return ret;
}

function htmltable()
{
	htmltable.prototype.addrow=function(tableid,index,rowid,colspan)
	{
		
	var table = document.getElementById(tableid);
	var row = table.insertRow(index);
	row.id=rowid;
	var totalcell=document.getElementById(tableid).rows[0].cells.length;
		if(colspan=true)
		{
			var cell1 = row.insertCell(0);
			cell1.setAttribute('colspan',totalcell);
			
		}
		else
		{
			var loop1=0;
			for(loop1=0;loop1<totalcell;loop1++)
			{
				row.insertCell(loop1);
			}
		}
	}
	htmltable.prototype.deleterow=function(tableid,rowid)
	{
		try{
		var drow=document.getElementById(rowid);
		document.getElementById(tableid).deleteRow(drow.rowIndex);
		}catch(e){}	
	}
	htmltable.prototype.col=function(tableid,r,c)
	{
		return document.getElementById(tableid).rows[r].cells[c];	
	}
	htmltable.prototype.row=function(tableid,r)
	{
		return document.getElementById(tableid).rows[r];	
	}
	htmltable.prototype.rows=function(tableid)
	{
		return document.getElementById(tableid).rows.length;
	}
	htmltable.prototype.cols=function(tableid,rowid)
	{
		if(rowid==undefined || rowid==NaN || rowid=="")
			rowid=0;
		return document.getElementById(tableid).rows[rowid].cells.length;	
	}
	htmltable.prototype.textmattrix=function(tableid,r,c,text)
		{
			
			text=text+'';
			if(text!='')
			{
				document.getElementById(tableid).rows[r].cells[c].innerHTML=text;
			}
			else
			{
				return document.getElementById(tableid).rows[r].cells[c].innerHTML;
			}
		}
	htmltable.prototype.url=function(tableid,r,c,urls)
	{
		var d = new Date();
		var divid=d.getDate()+""+d.getMonth() + 1+""+d.getFullYear()+""+d.getHours()+""+d.getMinutes()+""+d.getSeconds();
		divid="div_" + divid;
		this.col(tableid,r,c).innerHTML="<div id='" + divid + "'>";
		navigates1(urls,divid);	
	}
}
var table=new htmltable();