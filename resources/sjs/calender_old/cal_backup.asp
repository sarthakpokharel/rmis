<%
function getHostex()
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
	getHostex=ret
	
end function
dim calpath
calpath=gethostex() 
calpath=calpath & "js/calender/"
%>
<script language="javascript">
var xmlDoc;
var year,month,weekday,maxday,engyear,engmonth,engday,transitnepday,transityear,transitmonth;
var aaja="";
var activefield;
function todayeng()
{
	var x;
	var t=new Date();
	x=(t.getMonth()+1) + "/" +  t.getDate() + "/" + t.getFullYear();
	return x;
}
function todaynep(engdate)
{
	var ret;
	var mm;
	var dd;
	var yy;
	if(engdate==NaN || engdate==undefined || engdate==null)
	{
		engdate=todayeng();
	}
	ret=engdate;//todayeng();
	var t=ret.split("/");
	ret="";
	mm=parseInt(t[0]);
	dd=parseInt(t[1]);
	yy=parseInt(t[2]);
	dd=dd+13;
	if(dd>30)
	{
		dd=dd-30;
		mm=mm+1;
	}
	mm=mm+8;
	if(mm>12)
	{
		mm=mm-12;
		yy=yy+1;
	}
	yy=yy+56;
	ret=yy + "/" + mm + "/" + dd;
	return ret;
}
function datafile(nepdate,flag)
{
	if(nepdate==NaN || nepdate==undefined || nepdate==null || nepdate=="")
	{
		nepdate=todaynep();
	}
	if(flag==NaN || flag==undefined || flag==null || flag=="")
	{
		flag=0;
	}
	
	var loadfile=nepdate;
	var tempfile=loadfile.split("/");
	var y=0;
	y=parseInt(tempfile[0]);
	y=y-(y%10);
	y=y+flag;
	loadfile="Date"+y+".xml";
	return "<%=calpath%>db/"+loadfile;
}
	
	try //Internet Explorer
	{
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	}
	catch(e)
	{
	try //Firefox, Mozilla, Opera, etc.
		{
			xmlDoc=document.implementation.createDocument("","",null);
			
		}
		catch(e)
		{
			alert(e.message);
			
		}
	}
xmlDoc.async=false;
var f=datafile();
try{
xmlDoc.load(f);
}
catch(e)
{

var cromedoc = new window.XMLHttpRequest();
cromedoc.open("GET", f, false);
cromedoc.send(null);
var xmlDoc = cromedoc.responseXML.documentElement;
}

//alert(xmlDoc.getElementsByTagName("calender")[0].childNodes[0].nodeValue);
function getmonthdata(nepdate)
{	
	if(nepdate==NaN || nepdate==undefined || nepdate==null || nepdate=="" || nepdate=="undefined")
	{
		nepdate=todaynep();
	}
	
	var years,months;
	temp=nepdate.split("/");
	years=parseInt(temp[0]);
	months=parseInt(temp[1]);
	//alert(parseInt(years));
	if(parseInt(years)<999)
	{
	//alert('English date is selected');
	nepdate=todaynep();
	temp=nepdate.split("/");
	years=parseInt(temp[0]);
	months=parseInt(temp[1]);
	}
	document.getElementById("year").value=years;
	document.getElementById("month").value=months;
	var temp=xmlDoc.getElementsByTagName("calender")[0].childNodes[0].nodeValue;
	var yeararray=temp.split(":");
	if(parseInt(yeararray[0])>parseInt(years) || parseInt(yeararray[1])<parseInt(years))
	{	// data file not matched again load
		var tempdate=years+"/"+months+"/1";
		//xmlDoc.load(datafile(tempdate));
		//Begin
			try{
				xmlDoc.load(datafile(tempdate));
			}
			catch(e)
			{
				var tf=datafile(tempdate);
				//alert(tf);
				var cromedoc1 = new window.XMLHttpRequest();
				cromedoc1.open("GET", tf, false);
				cromedoc1.send(null);
				xmlDoc = cromedoc1.responseXML.documentElement;
			}
		
		//End
		
	}
	var index=0;
	index=((parseInt(years)%10)*12)+parseInt(months);
	var te;
	te=xmlDoc.getElementsByTagName("calender")[index].childNodes[0].nodeValue;
	
	temp=te.split(":");
	//'year:month:weekday:maxday:engyear:engmonth:engday:transitnepday:transityear:transitmonth
	var today=todayeng();
	year=parseInt(temp[0]);
	month=parseInt(temp[1]);
	weekday=parseInt(temp[2]);
	if(weekday==0)
		weekday=7;	
	maxday=parseInt(temp[3]);
	engyear=parseInt(temp[4]);
	engmonth=parseInt(temp[5]);
	engday=parseInt(temp[6]);
	transitnepday=parseInt(temp[7]);
	transityear=parseInt(temp[8]);
	transitmonth=parseInt(temp[9]);
	
	
	// Code from VB
	var i;
    for(i=0;i<=34;i++)
    {
		document.getElementById("caldiv"+i).innerHTML="";
		document.getElementById("caldiv"+i).title="";
    }
    
   var Bar;
    Bar = weekday;
    var Counter;
    Counter = 0;
    var x;
    var engtitle="";
    var engcounter=-1;
    for(i =(Bar - 1);i<=(maxday + Bar - 2);i++)
    {
        Counter = Counter + 1;
        engcounter=engcounter+1;
       if(i <= 34)
        {
           	if(transitnepday>Counter)
				{
					engtitle=engmonth + "/" + (engday+engcounter) + "/" + engyear;
					if(engtitle==today)
						aaja=years + "/" + months + "/" + Counter;
				}
				else if(transitnepday==Counter)
				{
					engcounter=1;
					engtitle=transitmonth + "/" + engcounter + "/" + transityear;
					if(engtitle==today)
						aaja=years + "/" + months + "/" + Counter;
				}
				else
				{
					engtitle=transitmonth + "/" + engcounter + "/" + transityear;
					if(engtitle==today)
						aaja=years + "/" + months + "/" + Counter;
				}
				document.getElementById("caldiv"+i).innerHTML= Counter;
				document.getElementById("caldiv"+i).title=engtitle;
                            
        }
        else
        {
            x = i - 35;
            if(transitnepday>Counter)
				{
					engtitle=engmonth + "/" + (engday+engcounter) + "/" + engyear;
					if(engtitle==today)
						aaja=years + "/" + months + "/" + Counter;
				}
				else if(transitnepday==Counter)
				{
					engcounter=1;
					engtitle=transitmonth + "/" + engcounter + "/" + transityear;
					if(engtitle==today)
						aaja=years + "/" + months + "/" + Counter;
				}
				else
				{
					engtitle=transitmonth + "/" + engcounter + "/" + transityear;
					if(engtitle==today)
						aaja=years + "/" + months + "/" + Counter;
				}
            document.getElementById("caldiv"+x).innerHTML=Counter;
			document.getElementById("caldiv"+x).title=engtitle;
        }
        
   }
	document.getElementById("caldiv35").innerHTML=aaja;
	document.getElementById("caldiv35").title=today;

}
</script>
<style>
	.calinput{
		background-image:url(<%=calpath%>normal.gif);
		background-position:right;
		background-repeat:no-repeat;
		cursor:default;
		}
	.calinputhover{
			background-image:url(<%=calpath%>click.gif);
			background-position:right;
		background-repeat:no-repeat;
		cursor:default;
			}
	.calinputclick{
		background-image:url(<%=calpath%>hover.gif);
		background-position:right;
		background-repeat:no-repeat;
		cursor:default;
		}
	#divcalendar{
		background-color:#E0ECFF;
		border:double #5C743D;
/*font:16px georgia;
color:#000000;
font-weight:bold;
line-height:16px;
vertical-align:middle;
filter:alpha(style=3, opacity=100, finishOpacity=70);*/
		}
		#divdropdown{
		background-color:#E0ECFF;
		border:double #5C743D;
		}
		#calendar{
		padding:opx;
		
		}
		#calendar TH{
			border-top:1px #CC9933 solid;
			border-right:1px #CC9933 solid;
			border-left:1px #CC9933 solid;
			border-bottom:1px #CC9933 solid;
			border-collapse:collapse;
			color:#000000;			
			}
			#calendar TD{
			border-top:1px #CC9933 solid;
			border-right:1px #CC9933 solid;
			border-left:1px #CC9933 solid;
			border-bottom:1px #CC9933 solid;
			border-collapse:collapse;
			color:#000000;
			font-size:16px;
			}
			.day{
			cursor:default;
			color:#000000;
			width:100%;
			}
			.day:Hover{
			cursor:default;
			color:#FF0000;
			width:100%;
			}
			#divcalendar table td{
			border-left:1px solid #000000;
			border-bottom:1px solid #000000;
			}
			
</style>
<div id="divcalendar" style="position:absolute; display:none; z-index:99999991">
<table id="calendars" class="sortables" cellpadding="0" cellspacing="0">
<tr >
	<td colspan=3><select id=year name=year style="width:100%; border:0px;background-color:#D5EDB3" onchange="getmonthdata(this.value + '/' + document.getElementById('month').value + '/1');">
	<script language="javascript">
	var yearloop
	for(yearloop=2000; yearloop<=2100; yearloop++)
	document.write ("<option value=" + yearloop + ">" + yearloop + "</option>");
	</script>
	</select></td>
	<td colspan=4  >
	<select id=month name=month style="width:100%; border:0px; list-style:outside; font-size:16px; background-color:#D5EDB3" onchange="getmonthdata(document.getElementById('year').value + '/' + this.value + '/1');" >
	<option value=1 >बैशाख</option>
	<option value=2>जेठ</option>
	<option value=3>असार</option>
	<option value=4>साउन</option>
	<option value=5>भदौ</option>
	<option value=6>असोज</option>
	<option value=7>कार्तिक</option>
	<option value=8>मार्ग</option>
	<option value=9>पौष</option>
	<option value=10>माघ</option>
	<option value=11>फागुन</option>
	<option value=12>चैत्र</option>
	
	</select></td>
</tr>
<tr >
	<td>आइत</td><td>सोम</td><td>मंगल</td><td>बुध</td><td>बिही</td><td>शुक्र</td><td>शनि</td>
</tr>
<tr>
	<td><div class="day" id="caldiv0" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv1" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv2" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv3" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv4" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv5" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv6" onclick="retrivedate(this)">&nbsp;</div></td>
</tr>
<tr>
	<td><div class="day" id="caldiv7" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv8" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv9" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv10" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv11" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv12" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv13" onclick="retrivedate(this)">&nbsp;</div></td>
</tr>
<tr>
	<td><div class="day" id="caldiv14" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv15" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv16" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv17" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv18" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv19" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv20" onclick="retrivedate(this)">&nbsp;</div></td>
</tr>
<tr>
	<td><div class="day" id="caldiv21" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv22" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv23" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv24" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv25" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv26" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv27" onclick="retrivedate(this)">&nbsp;</div></td>
</tr>
<tr>
	<td><div class="day" id="caldiv28" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv29" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv30" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv31" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv32" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv33" onclick="retrivedate(this)">&nbsp;</div></td><td><div class="day"  id="caldiv34" onclick="retrivedate(this)">&nbsp;</div></td>
</tr>
<tr>
	<th colspan=7><div id="caldiv35" class="daylink"></div></th>
</tr>
</table>
</div>
<div id="divdropdown" style="position:absolute; visibility:hidden; z-index:2502">
Pankaj Adhikari klathmandu Nepal
</div>
<script language="javascript">
	
	function retrivedate(activedive)
	{
		var oldvalue=activefield.value;
		var d=parseInt(activedive.innerHTML);
		var m=parseInt(document.getElementById("month").value);
		var mm=""
		if(m<10)
			mm="0"+m;
		else
			mm=""+m;
		
		if(d>9)
		activefield.value=document.getElementById("year").value + "/" + mm + "/" + activedive.innerHTML;
		else
		activefield.value=document.getElementById("year").value + "/" + mm + "/0" + activedive.innerHTML;
		
		hidecalendar();
		activefield.focus();
		if(activefield.value!=oldvalue)
		{
			
			if(activefield.getAttribute("ondatechange")!=null)
			{
				eval(activefield.getAttribute("ondatechange"));
					
			}
		}
	}
	function showcalendar(a)
	{
			activefield=a;
		var co=getAnchorPosition(a.id);
			document.getElementById("divcalendar").style.position="absolute";
			document.getElementById("divcalendar").style.top=(co.y+a.offsetHeight) + 'px';//(a.offsetTop+a.offsetHeight);
			document.getElementById("divcalendar").style.left =co.x + 'px'; //a.offsetLeft;
		
			//document.getElementById("divcalendar").style.top=(co.y+a.offsetHeight);//(a.offsetTop+a.offsetHeight);
			//document.getElementById("divcalendar").style.left =co.x; //a.offsetLeft;
		if(document.getElementById("divcalendar").style.display=="block")
		{
	
			document.getElementById("divcalendar").style.display="none";
		}
		else
		{
			getmonthdata(""+a.value);
			document.getElementById("divcalendar").style.display="block";
		}
		
	}
	function hidecalendar()
	{
	document.getElementById("divcalendar").style.display="none";
	}
	function createcalendar(mj)
	{
		mj.className="calinput";
		mj.onclick=calinputmousedown;
		mj.onmouseup=calinputmouseup;
		mj.onmousemove=calinputmousemove;
		mj.onmouseout=calinputmouseout;
		if(aaja=="" || aaja==NaN || aaja==undefined)
		getmonthdata();
	}
	function calinputmousedown(e)
	{
		if (window.event) e = window.event; 
 var a = e.srcElement? e.srcElement : e.target; 
		//var a=event.srcElement;
		
		
		a.className="calinputclick";
		
		showcalendar(a);
		
	}
	function calinputmouseup(e)
	{
		if (window.event) e = window.event; 
 var a = e.srcElement? e.srcElement : e.target; 
		//var a=event.srcElement;
		
		a.className="calinputhover";
		
	}
	function calinputmousemove(e)
	{
		if (window.event)e = window.event; 
 var a = e.srcElement? e.srcElement : e.target; 
		//var a=event.srcElement;
		
		a.className="calinputhover";
		
	}
	function calinputmouseout(e)
	{
		if (window.event) e = window.event; 
 var a = e.srcElement? e.srcElement : e.target; 
		//var a=event.srcElement;
		a.className="calinput";
	}
	//createcalendar(document.getElementById("dates"));
	//createcalendar(document.getElementById("cal"));
	//getmonthdata();

</script>
<script language="javascript">
	function showdropdown(a,src)
	{
			
		var co=getAnchorPosition(a.id);
		
			document.getElementById("divdropdown").style.position="absolute";
			document.getElementById("divdropdown").style.top=(co.y+a.offsetHeight) + 'px';//(a.offsetTop+a.offsetHeight);
			document.getElementById("divdropdown").style.left =co.x + 'px'; //a.offsetLeft;
		if(document.getElementById("divdropdown").style.visibility=="visible")
		{
	
			document.getElementById("divdropdown").style.visibility="hidden";
		}
		else
		{
			document.getElementById("divdropdown").innerHTML="Loading Please wait";
			document.getElementById("divdropdown").style.visibility="visible";
			navigates1(src,'divdropdown');
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
		//showdropdown();
		
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