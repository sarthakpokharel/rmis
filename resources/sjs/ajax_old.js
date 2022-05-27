document.onhelp=showhelp;
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

//Executes all innerhtml with script
function setAndExecute(divId, innerHTML)
{  
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
		alert(innerHTML);
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
	else
	{
		var tscript=document.getElementsByTagName("script").length;
		var f=0;
		var loop1=0;
		div.innerHTML = innerHTML; 
		var x = div.getElementsByTagName("script"); 
		for(var i=0;i<x.length;i++) 
		{   
			if(x[i].src=="" || x[i].src==undefined)
			{
				eval(x[i].text); 
			}
			else
			{	
				loop1=0;
				for(loop1=0; loop1<tscript;loop1++)
				{
					if(document.getElementsByTagName("script").item[loop1].src==x[i].src)
						f=1;
				}
				if(f==0)
				{
					var a = document.createElement('script');
					a.language="javascript";
					a.src=x[i].src;
					document.body.appendChild(a);
				}
			}
		}
		document.getElementById("div_error").innerHTML="";
		
	}
	
}
// Executes all innerhtml with animation effect
function autosetAndExecute(divId, innerHTML)
{  
	 var div = document.getElementById(divId); 
	document.getElementById(divId).style.filter="revealTrans(duration=1, transition=12)";
	document.getElementById(divId).filters.revealTrans.apply();
	document.getElementById(divId).style.visibility="hidden";
	document.getElementById(divId).filters.revealTrans.play();

	div.innerHTML = innerHTML; 
	document.getElementById(divId).style.filter="revealTrans(duration=1, transition=23)";
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

// Show help on related eliments
function showhelp()
{
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

//Retrive form Value
function getformvalue(formname)
{	
	var l,ret,loop1;
	l=document.getElementById(formname).elements.length;
	ret="";
	
	for(loop1=0; loop1<l;loop1++)
	{
		if(typeof document.getElementById(formname).elements[loop1]=="object")
		{
				
		if(document.getElementById(formname).elements[loop1].type=="radio")
		{
			if(document.getElementById(formname).elements[loop1].checked==true)
			{
				if(ret!="")
				{
					ret=ret + "&";
				}
				ret=ret + document.getElementById(formname).elements[loop1].name + "=" + escape(document.getElementById(formname).elements[loop1].value);
			}
			continue;
		}
		//for check box 
		if(document.getElementById(formname).elements[loop1].type=="checkbox")
		{
			if(document.getElementById(formname).elements[loop1].checked==true)
			{
				if(ret!="")
				{
					ret=ret + "&";
				}
				ret=ret + document.getElementById(formname).elements[loop1].name + "=" + escape(document.getElementById(formname).elements[loop1].value);
			}
			continue;
		}
		//for button
		if(document.getElementById(formname).elements[loop1].type=="button")
		{
			
			continue;
		}
		//for submit
		if(document.getElementById(formname).elements[loop1].type=="submit")
		{
			
			continue;
		}
		//for reset
		if(document.getElementById(formname).elements[loop1].type=="reset")
		{
			
			continue;
		}
		if(document.getElementById(formname).elements[loop1].name!="")
		{
						if(ret!="")
				{
					ret=ret + "&";
				}
				ret=ret + document.getElementById(formname).elements[loop1].name + "=" + escape(document.getElementById(formname).elements[loop1].value);
			}
				
				
		
		
		}
	}
		
	return ret;
}


// Reset form

function clearall(formname)
{
	
	document.getElementById(formname).reset();
}
//print specified layer
function printlayer(f,stylesheet)
	{	var a,ssheet;
	ssheet='<STYLE type=text/css media=print>body{margin:0px;}THEAD {	DISPLAY: table-header-group}TFOOT {	DISPLAY: table-footer-group}</STYLE><link rel="stylesheet" href="'+stylesheet + '" type="text/css"/><body onload="window.print();">';
	
		a=window.open();
		
		a.document.write(ssheet + document.getElementById(f).innerHTML + '</body>');
		
	}
	
	
function setpage(a,b)
{
	currentpage=a;
	currentlink=b;
}

// Call this function for every hyperlink for refresh purpose
function navigates(pagename,target,data)
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
function navigates1(pagename,target,data)
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
	ajax.onreadystatechange=loadpage;
	ajax.open("GET",pagename,true);
	ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
  	ajax.send(null);
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
	var data=getformvalue(currentform.id);
	if(escape(action).search(escape('?'))<1)
	{
		action=action + "?targetex=" + target;
	}
	else
	{
		action=action+"&targetex=" +  target;	
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
	dte.open("GET",parameters,false);
	dte.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
  	dte.send(null);
  	var x= dte.responseText;
  	return x;
}
// Record set
function getrecordset(pagename,sql)
{
	rst=createobject();
	parameters=pagename + "?sql=" + sql
	if (rst==null)
	{
		alert ("Browser does not support HTTP Request");
		return 0;
	}
	rst.open("GET",parameters,false);
	rst.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
  	rst.send(null);
  	var xx= rst.responseText;
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
		}
		recordset.prototype.moveprevious=function()
		{
			if(this.pointer>1)
				this.pointer=this.pointer-1;
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
	if (window.event)
	   return window.event.keyCode;
	else if (e)
	   return e.which;
	else
	   return null;
}

//Restrict key press
function keyRestrict(e, validchars) { // v3.0
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
	return keyRestrict(e,'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ.?');
}


function dateonly(e)
{
	return keyRestrict(e,'1234567890/');
}
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
