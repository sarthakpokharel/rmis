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
	return baseUrl+"/sjs/calender/db/"+loadfile;
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
					{
						if(parseInt(months)<10)
							var aajam="0"+months
						else
							var aajam=months
							
						if(Counter<10)
							var aajad="0"+Counter
						else
							var aajad=Counter
						aaja=years + "/" + aajam + "/" + aajad;
						
					}
				}
				else if(transitnepday==Counter)
				{
					engcounter=1;
					engtitle=transitmonth + "/" + engcounter + "/" + transityear;
					if(engtitle==today)
					{
						if(parseInt(months)<10)
							var aajam="0"+months
						else
							var aajam=months
							
						if(Counter<10)
							var aajad="0"+Counter
						else
							var aajad=Counter
						aaja=years + "/" + aajam + "/" + aajad;
						
					}
						//aaja=years + "/" + months + "/" + Counter;
				}
				else
				{
					engtitle=transitmonth + "/" + engcounter + "/" + transityear;
					if(engtitle==today)
					{
						if(parseInt(months)<10)
							var aajam="0"+months
						else
							var aajam=months
							
						if(Counter<10)
							var aajad="0"+Counter
						else
							var aajad=Counter
						aaja=years + "/" + aajam + "/" + aajad;
						
					}
						//aaja=years + "/" + months + "/" + Counter;
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
		background-image:url(./normal.gif);
		background-position:right;
		background-repeat:no-repeat;
		cursor:default;
		
		}
		.calinput hover{
		background-image:url(./click.gif);
		background-position:right;
		background-repeat:no-repeat;
		cursor:default;
		
		}
	.calinputhover{
		background-image:url(./click.gif);
		background-position:right;
		background-repeat:no-repeat;
		cursor:default;
			}
	.calinputclick{
		background-image:url(./hover.gif);
		background-position:right;
		background-repeat:no-repeat;
		cursor:default;
		}
/*	#divcalendar{
		background-color:#E0ECFF;
		border:double #5C743D;
font:16px georgia;
color:#000000;
font-weight:bold;
line-height:16px;
vertical-align:middle;
filter:alpha(style=3, opacity=100, finishOpacity=70);
		}*/
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
			/*#divcalendar table td{
			border-left:1px solid #000000;
			border-bottom:1px solid #000000;
			}*/
			
</style>
<style>
#year{
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
	/*background: transparent url("./images/down.png") no-repeat;*/
}
#month{
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
	/*background: transparent url("images/down.png") no-repeat;
	background-position: right;#2E6E9E*/
}
div#ndp-nepali-box{font-family:'Trebuchet MS',Tahoma,Verdana,Arial,sans-serif;width:198px;border:1px solid #A6C9E2;background-color:#FDFEFE;position:absolute;z-index:1;padding:1px;margin-top:1px}div#ndp-nepali-box td.ndp-date{margin:1px;padding:1px 2px;border:1px solid #C5DBEC;background:url(./ndp_date_bg.png) repeat-x #DFEFFC;color:#15428B;cursor:pointer;}div#ndp-nepali-box td.ndp-selected{border:1px solid #FAD42E;background:#FBEC88;color:#363636}div#ndp-nepali-box td.ndp-current{margin:1px;padding:1px 2px;border:1px solid #79B7E7;background:#F5F8F9}div#ndp-nepali-box td.ndp-current a{color:#E17009}div#ndp-nepali-box td.ndp-date a{display:block;color:#1C94C4;text-decoration:none;font-size:12px;width:20px}div#ndp-nepali-box td.ndp-date:hover{border:1px solid #FED22F;opacity:.8}div#ndp-nepali-box td.ndp-date a:hover{color:#1C94C4}div#ndp-nepali-box table,div#ndp-nepali-box td,div#ndp-nepali-box tr{font-size:12px;height:19px;line-height:19px}div#ndp-nepali-box a{text-decoration:none}.ndp-days th{text-align:center;font-weight:700}.ndp-header{border:1px solid #4297D7;background:url(./ndp_bg_wave.png) 50% 50% repeat-x #5C9CCC;color:#fff;font-weight:700;font-size:13px;height:20px;line-height:20px;margin:2px;text-align:center}.ndp-prev{left:7px;position:absolute;top:6px;width:1.3em;height:1.3em;background:url(./ndp_buttons.png) no-repeat}.ndp-prev:hover{background:url(./ndp_buttons.png) -16px 0 #D0E5F5}.ndp-next:hover{background:url(./ndp_buttons.png) -48px 0 #D0E5F5}.ndp-next{right:7px;position:absolute;top:6px;width:1.3em;height:1.3em;background:url(./ndp_buttons.png) -32px 0 no-repeat}.ndp-corner-all,.ndp-corner-left,.ndp-corner-tl,.ndp-corner-top{-moz-border-radius-topleft:5px;-webkit-border-top-left-radius:5px;-khtml-border-top-left-radius:5px;border-top-left-radius:5px}.ndp-corner-all,.ndp-corner-right,.ndp-corner-top,.ndp-corner-tr{-moz-border-radius-topright:5px;-webkit-border-top-right-radius:5px;-khtml-border-top-right-radius:5px;border-top-right-radius:5px}.ndp-corner-all,.ndp-corner-bl,.ndp-corner-bottom,.ndp-corner-left{-moz-border-radius-bottomleft:5px;-webkit-border-bottom-left-radius:5px;-khtml-border-bottom-left-radius:5px;border-bottom-left-radius:5px}.ndp-corner-all,.ndp-corner-bottom,.ndp-corner-br,.ndp-corner-right{-moz-border-radius-bottomright:5px;-webkit-border-bottom-right-radius:5px;-khtml-border-bottom-right-radius:5px;border-bottom-right-radius:5px}
</style>
<div id="ndp-nepali-box" style="position:absolute; display:none; z-index:99999991">
<div class="ndp-corner-all ndp-header" style="height:22px !important;"><span id="currentMonth" style="vertical-align:top;"><table style="height:20px; vertical-align:top" cellpadding="0" cellspacing="0"><tr><td>
<select id='year' name='year'  class="ndp-header" style="width:70px; border:none !important" onchange="getmonthdata(this.value + '/' + document.getElementById('month').value + '/1');">
	<script language="javascript">
	var yearloop
	for(yearloop=2000; yearloop<=2100; yearloop++)
	document.write ("<option value=" + yearloop + ">" + yearloop + "</option>");
	</script>
	</select>
    </td><td>
    <select id='month' name='month' class="ndp-header" style="margin-top:-3px !important; width:70px; border:none !important"  onchange="getmonthdata(document.getElementById('year').value + '/' + this.value + '/1');" >
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
	
	</select>
    </td></tr></table>
    </span></div><!-- End of Header Div-->
    <table style="width:100%"><tbody><tr class="ndp-days"><th>आ</th><th>सो</th><th>मं</th><th>बु</th><th>बि</th><th>शु</th><th>श</th></tr>
    <tr>
    <!--class="ndp-current"-->
    	<td class="ndp-date" id="caldiv0" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv1" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv2" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv3" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv4" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv5" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv6" onclick="retrivedate(this)">&nbsp;</td>
     </tr>
      <tr>
    	<td class="ndp-date" id="caldiv7" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv8" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv9" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv10" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv11" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv12" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv13" onclick="retrivedate(this)">&nbsp;</td>
     </tr>
      <tr>
    	<td class="ndp-date" id="caldiv14" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv15" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv16" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv17" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv18" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv19" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv20" onclick="retrivedate(this)">&nbsp;</td>
     </tr>
      <tr>
    	<td class="ndp-date" id="caldiv21" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv22" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv23" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv24" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv25" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv26" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv27" onclick="retrivedate(this)">&nbsp;</td>
     </tr>
      <tr>
    	<td class="ndp-date" id="caldiv28" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv29" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv30" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv31" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv32" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv33" onclick="retrivedate(this)">&nbsp;</td>
        <td class="ndp-date" id="caldiv34" onclick="retrivedate(this)">&nbsp;</td>
     </tr>
     <tr><td class="ndp-date" colspan="7" align="center" id="caldiv35" onclick="retrivedate(this)">&nbsp;</td></tr>
     </tbody></table>
</div><!-- End of Main Div-->
<!--</div> end of first div-->



<div id="divdropdown" style="position:absolute; visibility:hidden; z-index:2502">
Pankaj Adhikari klathmandu Nepal
</div>
<script language="javascript">
	
	function retrivedate(activedive)
	{
		
		if(activedive.innerHTML=="&nbsp;" || activedive.innerHTML=="")
		{
			return;	
		}
		if(activedive.innerHTML.length<3)
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
		}
		else
		{
		activefield.value=activedive.innerHTML;
		}
		hidecalendar();
		activefield.focus();
		if(activefield.value!=oldvalue)
		{
			
			if(activefield.getAttribute("ondatechange")!=null)
			{
				this.oldvalue=oldvalue;
				eval(activefield.getAttribute("ondatechange"));
					
			}
		}
	}
	function showcalendar(a)
	{
			activefield=a;
		var co=getAnchorPosition(a.id);
			document.getElementById("ndp-nepali-box").style.position="absolute";
			document.getElementById("ndp-nepali-box").style.top=(co.y+a.offsetHeight) + 'px';//(a.offsetTop+a.offsetHeight);
			document.getElementById("ndp-nepali-box").style.left =co.x + 'px'; //a.offsetLeft;
		
			//document.getElementById("divcalendar").style.top=(co.y+a.offsetHeight);//(a.offsetTop+a.offsetHeight);
			//document.getElementById("divcalendar").style.left =co.x; //a.offsetLeft;
		if(document.getElementById("ndp-nepali-box").style.display=="block")
		{
	
			document.getElementById("ndp-nepali-box").style.display="none";
		}
		else
		{
			getmonthdata(""+a.value);
			document.getElementById("ndp-nepali-box").style.display="block";
		}
		
	}
	function hidecalendar()
	{
	document.getElementById("ndp-nepali-box").style.display="none";
	}
	function createcalendar(mj)
	{
		mj.className="calinput x-form-text x-form-field";
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
		this.className="calinputclick x-form-text x-form-field";		
		showcalendar(a);
		
	}
	function calinputmouseup(e)
	{
	//	if (window.event) e = window.event; 
 	//	var a = e.srcElement? e.srcElement : e.target; 
		//var a=event.srcElement;		
		this.className="calinputhover x-form-text x-form-field";
		
	}
	function calinputmousemove(e)
	{
		//if (window.event)e = window.event; 
 		//var a = e.srcElement? e.srcElement : e.target; 
		//var a=event.srcElement;		
		this.className="calinputhover x-form-text x-form-field";
		
	}
	function calinputmouseout(e)
	{
		//if (window.event) e = window.event; 
 		//var a = e.srcElement? e.srcElement : e.target; 
		//var a=event.srcElement;
	this.className="calinput x-form-text x-form-field";
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
		if(document.getElementById("divdropdown").style.display=="block")
		{
	
			document.getElementById("divdropdown").style.display="none";
		}
		else
		{
			document.getElementById("divdropdown").innerHTML="Loading Please wait";
			document.getElementById("divdropdown").style.display="block";
			navigates1(src,'divdropdown');
		}
		
	}
	function hidedropdown()
	{
	document.getElementById("divdropdown").style.display="none";
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
		//var a=event.srcElement;
		if (window.event) e = window.event; 
 var a = e.srcElement? e.srcElement : e.target; 
		a.className="calinputclick";
		//showdropdown();
		
	}
	function dropdownmouseup()
	{
		//var a=event.srcElement;
		if (window.event) e = window.event; 
 var a = e.srcElement? e.srcElement : e.target; 
		a.className="calinputhover";
	}
	function dropdownmousemove()
	{
		//var a=event.srcElement;
		if (window.event) e = window.event; 
 var a = e.srcElement? e.srcElement : e.target; 
		a.className="calinputhover";
	}
	function dropdownmouseout()
	{
		//var a=event.srcElement;
		if (window.event) e = window.event; 
 		var a = e.srcElement? e.srcElement : e.target; 
		a.className="calinput";
	}