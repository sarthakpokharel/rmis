<style>
	
	#divdropdown{
		background-color:#D5EDB3;
		border:double #5C743D;
		}
		
</style>
<div id="divdropdown" style="position:absolute; visibility:hidden">

</div>
<script language="javascript">
	function showdropdown(a)
	{
			
		var co=getAnchorPosition(a.id);
			document.getElementById("divdropdown").style.top=(co.y+a.offsetHeight);//(a.offsetTop+a.offsetHeight);
			document.getElementById("divdropdown").style.left =co.x; //a.offsetLeft;
		if(document.getElementById("divdropdown").style.visibility=="visible")
		{
	
			document.getElementById("divdropdown").style.visibility="hidden";
		}
		else
		{
			document.getElementById("divdropdown").style.visibility="visible";
		}
		
	}
	function hidedropdown()
	{
	document.getElementById("divdropdown").style.visibility="hidden";
	}
	function createdropdown(myObj)
	{
		myObj.className="calinput";
		myObj.onclick=dropdownmousedown;
		myObj.onmouseup=dropdownmouseup;
		myObj.onmousemove=dropdownmousemove;
		myObj.onmouseout=dropdownmouseout;
		
	}
	function dropdownmousedown()
	{
		var a=event.srcElement;
		a.className="calinputclick";
		
	}
	function dropdownmouseup()
	{
		var a=event.srcElement;
		a.className="calinputhover";
	}
	function dropdownmousemove()
	{
		var a=event.srcElement;
		a.className="calinputhover";
	}
	function dropdownmouseout()
	{
		var a=event.srcElement;
		a.className="calinput";
	}
	
</script>