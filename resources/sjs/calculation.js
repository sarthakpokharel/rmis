// JavaScript Document
function getrenewcharge(durationid,countryid,passtypeid)
{
	if(durationid=="")
	{
		return "";
	}
	if(countryid=="")
	{
		return "";
	}
	if(passtypeid=="")
	{
		return "";
	}
	var calrs=new recordset();
	
	calrs.open("select dbo.[getrenewcharge]('" + durationid + "','" + countryid + "','" + passtypeid + "')");
	return calrs.fields(0);
}
//CREATE FUNCTION [dbo].[getfine](@countryid varchar(50),@passtype varchar(50),@validdate datetime,@uptodate datetime)
function getfine(countryid,passtype,validdate,uptodate)
{
	if(countryid=="")
	{
		return "";
	}
	if(passtype=="")
	{
		return "";
	}
	if(uptodate=="")
	{
		uptodate="getdate()"	
	}
	var finers=new recordset();
	if(uptodate!="getdate()")
		finers.open("select dbo.getfine('" + countryid + "','" + passtype + "','" + validdate + "','" + uptodate + "')");
	else
	{
	
	finers.open("select dbo.getfine('" + countryid + "','" + passtype + "','" + validdate + "'," + uptodate + ")");
	}
	return finers.fields(0);
	
}
function setvaliddate(rowid,fromdate)
{
//	'create function dbo.setvaliddate(@rowid varchar(50),@fromdate datetime)
if(fromdate=="")
fromdate="getdate()";
var vrs=new recordset();


if(fromdate!="getdate()")
vrs.open("select dbo.setvaliddate('" + rowid + "','" + fromdate + "')");
else
	vrs.open("select dbo.setvaliddate('" + rowid + "'," + fromdate + ")");


return vrs.fields(0);
}

function renewcalculate()
{
//	renewcharge,fine,valid date
//totalamount,tenderamount,returnamount
dbid('uptodate').value=setvaliddate(dbid("duration").value,dbid("oldvalidupto").value);
dbid("renewcharge").value=getrenewcharge(dbid("duration").value,dbid("nationality").value,dbid("passtypeid").value);
dbid("latefee").value=getfine(dbid("nationality").value,dbid("passtypeid").value,dbid("oldvalidupto").value,"getdate()");
dbid("totalamount").value=val(dbid("renewcharge").value)+val(dbid("latefee").value);
if(dbid("tenderamount").value=="")
dbid("returnamount").value="-" + dbid("totalamount").value;

}
function dbid(id)
{
	return document.getElementById(id);	
}
function val(v)
{
	
	if(v==NaN || v==undefined || v=="")
		return 0;
	else
		return parseFloat(v);
}