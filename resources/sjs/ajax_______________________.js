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
		//alert(innerHTML);
		//alert(innerHTML.substr(0,6));
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
	else
	{
		var tscript=document.getElementsByTagName("script").length;
		var f=0;
		var loop1=0;
		//alert(innerHTML);
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
	ssheet='<STYLE type=text/css media=print>body{margin:0px;}THEAD {	DISPLAY: table-header-group}TFOOT {	DISPLAY: table-footer-group}</STYLE><link rel="stylesheet" href="'+stylesheet + '" type="text/css"/><body onLoad="window.print();">';
	
		a=window.open();
		
		a.document.write(ssheet + document.getElementById(f).innerHTML + '</body>');
		
	}
function printlayer1(f)
	{	var a,ssheet;
	    ssheet="<link rel=\"stylesheet\" href=\"../inc/style.css\" /> <link rel=\"stylesheet\" href=\"../style.css\" />";
	
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
	//alert(data);
	if(escape(action).search(escape('?'))<1)
	{
		action=action + "?targetex=" + target;
	}
	else
	{
		if(action.search('targetex')<1)
		action=action+"&targetex=" +  target;	
	}
	
	currentform.action=action;
	
	currentform.target="iframe";
	//alert(currentform.action);
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
    sum=sum + parseFloat('' + document.all(elementid,i).value);
  }
  }
  return sum;
}
	
	






//=============================================================================

function getrpc(pagename,procedure)
{
	rst=createobject();
	parameters=pagename + "?procedure=" + procedure + "&uniqueid=" + Date().toString();
	
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
function loadjs(src){
	try
	{
	var j=document.getElementById(escape(src));
	var k=j.id;
	}
	catch(e)
	{
		var js = document.createElement('script');
  		js.setAttribute('type','text/javascript');
  		js.setAttribute('id', escape(src));
  		js.setAttribute('src', src);
  		document.body.appendChild(js);
	}
  /*if (!document.getElementById(escape(src)))
  {
  
 }*/
}
var rpc=new clsrpc();




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
 
 
 function LoadZoneCode(){
	 
	 var language='<%=session("language")%>'; 
 var rs1=new recordset();
 var districthtml='';
 var regvald='';

	 for(i=0;i<document.frmlistparika.zone.length;i++){
	 if(document.frmlistparika.zone[i].checked){
	    if(regvald=='' )
		regvald='\'' + document.frmlistparika.zone[i].value +'\'';
		else
		regvald=regvald+',\'' + document.frmlistparika.zone[i].value + '\'';
	 }
	 
	 }
	
	if(regvald=='')
	rs1.open('select DISTRICT_CD,DESC_LOC,DESC_ENG from HR_DISTRICT ');
	else
   rs1.open('select DISTRICT_CD,DESC_LOC,DESC_ENG from HR_DISTRICT where zone_CD in(' + regvald + ')');
 
  if(rs1.recordcount()>=1)
 {
 	
	
 	while(rs1.eof()==false)
	{
		if(language=='Np')
				districthtml=districthtml + '<input type=\'checkbox\'  value=\''+rs1.fields(0) + '\'>' + rs1.fields(3) + '<br>';
		else
				districthtml=districthtml + '<input type=\'checkbox\' value=\''+rs1.fields(0) + '\'>' + rs1.fields(2) + '<br>';
		rs1.movenext();
	}
	//rs.close();
 }
 

 document.getElementById('divdistrict').innerHTML=districthtml;
 
 
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
}
else
{
	toObj.value=frmObj.textContent;
}
toObj.focus();
}

function save_exchange(pkid,spnid,ctrlid,pages,dtype){
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
