<%
function topmenuhost()
	dim Ret,h,f,s,t
	h=Request.ServerVariables ("HTTP_HOST")
	f=Request.ServerVariables ("URL")
	s=Request.ServerVariables ("SCRIPT_NAME")
	t=split(s,"/")
	s=t(ubound(t))
	ret= h & f
	ret=replace(ret,"includes/aspfunctions.asp","")
	ret=replace(ret,s,"")
	ret= "http://" & ret 
	topmenuhost=ret
	
end function
dim topmenupath
topmenu=topmenuhost() 
topmenu=topmenu & "js/topmenu/"
%>
<link rel="stylesheet" type="text/css" href="<%=topmenu%>csshorizontalmenu.css" />

<script type="text/javascript" src="<%=topmenu%>csshorizontalmenu.js">

/***********************************************

* CSS Horizontal List Menu- by JavaScript Kit (www.javascriptkit.com)
* Menu interface credits: http://www.dynamicdrive.com/style/csslibrary/item/glossy-vertical-menu/ 
* This notice must stay intact for usage
* Visit JavaScript Kit at http://www.javascriptkit.com/ for this script and 100s more

***********************************************/

</script>
