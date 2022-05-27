<script language="javascript">
function loadCostcentre(comboid,orgid,permissionfor,costcentertype)
{
	var ccrs=new recordset();
	if(permissionfor==undefined || permissionfor=='' || permissionfor=='Entry')
		permissionfor=1
		
	if(costcentertype==undefined || costcentertype=='' || costcentertype==NaN)
		costcentertype="1,2"
		
	<%
		if session("language")="En" then
	%>
	ccrs.open("select officeidint,code,officenameen from oa_office_str where officeidint in (select officeid from dbo.ext_getofficelist (" + orgid + "," + permissionfor + ") where costcentertype in (" + costcentertype + ")) order by code");
	<%
		Else
	%>
	
	var sqls="select officeidint,code,officenamenp from oa_office_str where officeidint in (select officeid from dbo.ext_getofficelist (" + orgid + "," + permissionfor + ") where costcentertype in (" + costcentertype + ")) order by code";
	console.log(sqls);
	ccrs.open(sqls);
	
	<%
		End If
	%>
	
	removeall(comboid);
	if(ccrs.recordcount()>0)
	{
		while(!ccrs.eof())
		{
			additem(comboid,ccrs.fields(1) + " | " + ccrs.fields(2),ccrs.fields(0));
			ccrs.movenext();	
		}
		
	}
	
}



function LoadCCProgramme(costcenterid,objprogramid){
	 
	 if(objprogramid=='')
	 objprogramid="programid"
	        var language='<%=session("language")%>'; 
			var ccond='';
                var rs=new recordset();
				if(costcenterid>0)
				  ccond='and  p.program_id IN(select p1.program_id from tbl_costcenter_program1 as p1 where programfor=1 and  costcenterid = '+costcenterid+')';
				  else
				  ccond='';
				  
                if(language=='Np')
                sql= 'select program_id,program_name_np,program_budget_sub_heading from awpb_program as p where APPROVED=1 and DISABLED=0 '+ccond+' order by program_budget_sub_heading'
                else
                sql='select program_id,program_name_en,program_budget_sub_heading from awpb_program as p where APPROVED=1 and DISABLED=0 '+ccond+' order by program_budget_sub_heading'
                	rs.open(sql);
						
                removeall(objprogramid);
				
                additem(objprogramid,'Budget Sub Heading|Program Name','');
                if(rs.recordcount()>=1)
                {
                
                while(rs.eof()==false)
                {
					
                additem(objprogramid,rs.fields(2)+' | '+rs.fields(1),rs.fields(0));
                rs.movenext();
                }
                }
  }


function loadSubprogram(comboid,progid,costcenterid,fyid,fundtype,programfor)
{
	
	if(progid=='')
		removeall(comboid);
	 var exptype=fundtype;
	
	var prs=new recordset();
							
							
							var sqltemp="(select distinct activity_program_id from  awpb_activity where activity_id in (select sub_activity_activity_id from awpb_sub_activity where sub_activity_fy_id=" + fyid + " and costcenterid=" + costcenterid + ") and activity_line_item_id in (select lineitemid from dbo.getLineitemidByType("+ fundtype+ ")) and activity_program_id in (select programid from dbo.getmyprograms('<%=session("username")%>'," + programfor + "," + costcenterid + "))) as ap"
								
								if(getlanguage()=='Np')
								{
									
									var sql="select program_id,program_budget_sub_heading,program_name_np,program_parent_id from awpb_program where program_id in (select distinct activity_program_id from " + sqltemp + ") and program_parent_id=" + progid;	
									
								}
								else
								{
								
								var sql="select program_id,program_budget_sub_heading,program_name_en,program_parent_id from awpb_program where program_id in (select distinct activity_program_id from " + sqltemp + ") and program_parent_id ="+ progid;	

								}
								
								prs.open(sql);
								if(prs.recordcount()<1)
								{
									if(getlanguage()=='Np')
									{
										var sql="select program_id,program_budget_sub_heading,program_name_np,program_parent_id from awpb_program where approved=1 and disabled=0 and program_id="+ progid
									}
									else
									{
										var sql="select program_id,program_budget_sub_heading,program_name_en,program_parent_id from awpb_program where approved=1 and disabled=0 and program_id="+ progid
									}
									prs=null
									prs=new recordset();
									
									prs.open(sql);
								}
								removeall(comboid);
								 if(prs.recordcount()>0)
				  {
				 	 
					 //additem('txtactivity','............','0');
					 while(!prs.eof())
					 {
					
					 additem(comboid,prs.fields(1)+' | ' + prs.fields(2),prs.fields(0));
					 prs.movenext();
					 }
				  }
				  else
				  {
				  	removeall(comboid);
				  }
				 // loadSubactivity(progid,document.getElementById(comboid).value);
}
//loadprogramme('programid',document.getElementById('orgid').value,document.getElementById('fiscalyear').value,document.getElementById('costcenterid').value,2);
function loadprogramme(comboid,officeid,fyid,fundtype,permissionfor)
{	

	
	 if(officeid==undefined || officeid=='')
	 	officeid='<%=session("officeid")%>';
	if(fundtype==undefined || fundtype=='')
		fundtype=0
	if(permissionfor==undefined || permissionfor=='')
		permissionfor=2
	
		var prs=new recordset();
		var sql=" select distinct a.programid,b.program_budget_sub_heading,b.program_name_<%=session("language")%>,a.parentid from dbo.ext_getprogramlist(" + officeid + "," + fyid + "," + fundtype + "," + permissionfor + ") a,awpb_program b where a.programid=b.program_id";
		sql=sql + "\n" + " UNION \n";
		sql=sql + "select program_id,program_budget_sub_heading,program_name_<%= session("language")%> as program_name,program_parent_id from awpb_program where program_id in (select programid from dbo.getMyprograms('<%=session("username")%>','TABUCS'," + officeid + ")) and program_parent_id=0";
		sql="select distinct * from (" + sql + ") as temptable order by program_budget_sub_heading";
		
		//alert(sql);
		 prs.open(sql);
		 removeall(comboid);
		additem(comboid,"........","0")
		if(prs.recordcount()>0)
		{
			
			while(!prs.eof())
			{	
				if(prs.fields(3)=="0")
				{
					additem(comboid,prs.fields(1) + ' | ' + prs.fields(2),prs.fields(0))
				}
				
				prs.movenext();
			}
		}
		else
		{
			additem(comboid,'............',''); 
		}

}
function loadsubprogramme(comboid,officeid,programid,fyid,fundtype,permissionfor)
{	

	 if(officeid==undefined || officeid=='')
	 	officeid='<%=session("officeid")%>';
	if(fundtype==undefined || fundtype=='')
		fundtype=0
	if(permissionfor==undefined || permissionfor=='')
		permissionfor=2
	   removeall(comboid);
	   if(programid=="0"){
		   additem(comboid,'............','');
	      return;
	   }
		var prs=new recordset();
		if(permissionfor==2)
		{
		var sql=" select distinct a.programid,b.program_budget_sub_heading,b.program_name_<%=session("language")%>,a.parentid from dbo.ext_getprogramlist(" + officeid + "," + fyid + "," + fundtype + "," + permissionfor + ") a,awpb_program b where a.programid=b.program_id and (a.parentid=" + programid + " or a.programid=" + programid + ")"
		}
		else
		{
			var sql=" select distinct a.programid,b.program_budget_sub_heading,b.program_name_<%=session("language")%>,a.parentid from dbo.ext_getprogramlist(" + officeid + "," + fyid + "," + fundtype + "," + permissionfor + ") a,awpb_program b where a.programid=b.program_id and a.parentid=" + programid 
		}
		
		prs.open(sql);
		 removeall(comboid);
	//	additem(comboid,'............','');
		if(prs.recordcount()>0)
		{
			while(!prs.eof())
			{	
				additem(comboid,prs.fields(1) + ' | ' + prs.fields(2),prs.fields(0))
			
				prs.movenext();
			}
		}
		else
		{
			prs.open("select program_id,program_budget_sub_heading,program_name_<%=session("language")%> as program_name,program_parent_id from awpb_program where program_id=" + programid);
			//additem(comboid,'............','');
			if(prs.recordcount()>0)
			{
				additem(comboid,prs.fields(1) + ' | ' + prs.fields(2),prs.fields(0))
			}
			
		}
}
function list_program_report()
{
	//
    var ccid="<%=session("officeid") %>";
    if(document.getElementById('costcenterid'))
            ccid=document.getElementById('costcenterid').value;
    var ftype="0";
    if(document.getElementById('fundtypeid'))
            ftype=document.getElementById('fundtypeid').value;
	//loadprogramme('programid',document.getElementById('orgid').value,document.getElementById('fiscalyear').value,document.getElementById('fundtypeid').value,2);
 programlist("programid","default",document.getElementById("orgid").value,document.getElementById("costcenterid").value,document.getElementById("fiscalyear").value, 2, "<%=session("username")%>",2,ftype,"0","0");
 	//loadprogramme('programid',ccid,document.getElementById('fiscalyear').value,ftype,2);

 //   additem(programid,'............','');

if(document.getElementById("programid").value!="0")	
	list_subprogram_report();
else
{
	removeall("subprogramid");
	additem("subprogramid",'............','0');	
}
}
function list_subprogram_report()
{
	var ftype,cid
	try{
		ftype=getElementById('fundtypeid').value;
	}catch(e)
	{
		ftype=0;
	}
	try{
		cid=document.getElementById('orgid').value;//costcenterid
	}
	catch(e)
	{
		cid=<%=session("orgid")%>;	
	}
	
	 programlist("subprogramid",1,document.getElementById("orgid").value,document.getElementById("costcenterid").value,document.getElementById("fiscalyear").value, 2, "<%=session("username")%>",2,1,document.getElementById("programid").value,1);
//loadsubprogramme('subprogramid',cid,document.getElementById('programid').value,document.getElementById('fiscalyear').value,ftype,2);
}




function loadpopup(url,sourcecontrol)
{
	var cf=new forms("user/frmchangepassword.asp","Change password",240,400);
	cf.seturl("user/frmchangepassword.asp?id="+cf.hwind())
    cf.show();
}

function loadLocalProgram(orgid,cmbprogramid){
	if(cmbprogramid=="" || cmbprogramid==NaN ||cmbprogramid==undefined)
	cmbprogramid="programid";
	
			if(orgid<1)
			  orgid="<%=session("orgid")%>";
			  
	       sql2="select localprogramid,programcode,programname<%=session("language")%> from tbl_local_program as d where approved=1 and  orgid ="+orgid+" ";
 	var brs=new recordset();
	brs.open(sql2);
	//alert(cmbprogramid);
	
	removeall(cmbprogramid);
	additem(cmbprogramid,'----------','');
	if(brs.recordcount()>0)
	{
		
		while(!brs.eof())
		{
			additem(cmbprogramid,brs.fields(1)+ ' | '+brs.fields(2),brs.fields(0));
			brs.movenext();
		}
	}
	   
  }
  
  
  
  
  
  
  function LoanDonor(fyid,orgid,programid,cmbdonor){
	  
	  var cond=" where 1=1 "
	   var cond1=" where 1=1 "
	  if(cmbdonor=="" || cmbdonor==NaN ||cmbdonor==undefined)
		  cmbdonor="sourceid";
		  
		if(programid=="" || programid==NaN ||programid==undefined)
		   programid=document.getElementById("programid").value;
		   
		if(programid){
			cond=cond+" and (sub.sub_activity_program_id="+programid+"  )"	 ; 
			cond1=cond1+" and ( jd.subprogramid ="+programid+" )"	 ;
		}
		
				
				
		 if(fyid=="" || fyid==NaN || fyid==undefined)
		 	fyid="<%=session("fyid")%>";
		 
			
		
		     cond=cond+" and (sub.sub_activity_fy_id="+fyid+"  )"	 ; 
			 cond1=cond1+" and ( jd.fiscalyear ="+fyid+" )"	 ; 
			
			//and sub.sub_activity_fy_id=jd.fiscalyear
	if(orgid=="" || orgid==NaN ||orgid==undefined)
		 	orgid="<%=session("orgid")%>";
		 
			 
			 cond=cond+" and (sub.orgid="+orgid+"  )"; 
			 cond1=cond1+" and ( jd.orgid ="+orgid+" )"; 
		   
		   sql= "select * from(select source_id, source_name,isnull(source_desc_np,source_desc_en) as source_desc,source_code	 from awpb_source where source_id 	 IN ( select sub_activity_source_id from awpb_sub_activity as sub  "+cond+" ) union select 	 source_id, source_name,isnull(source_desc_np,source_desc_en) as source_desc,source_code from awpb_source where source_id   IN ( select donorid from tbljournaldetail as jd "+cond1+") )  as mb order by source_code";
	 
	 // alert(sql);
	  
	 var brs=new recordset();
	brs.open(sql);
 	 removeall(cmbdonor);
	additem(cmbdonor,'----------','');
	if(brs.recordcount()>0)
	{
		
		while(!brs.eof())
		{
			additem(cmbdonor,brs.fields(3)+ ' | '+brs.fields(1)+ ' | '+brs.fields(2),brs.fields(0));
			brs.movenext();
		}
	}
		   
  }



function ChangeDateByFy(fyid,fdate,tdate){
	
	if(fyid==NaN || fyid=="" || fyid==undefined)
	fyid="<%=session("fyid")%>"
	
	if(fdate==NaN || fdate=="" || fdate==undefined)
	fdate="txtdatefrom"
	if(tdate==NaN || tdate=="" || tdate==undefined)
	 tdate="txtdateto"
	 
	var brs=new recordset();
	var sql2="select * from dbo.getdateintbetween("+fyid+",0,0)";	
	 brs.open(sql2);
	 document.getElementById(fdate).value=brs.fields(2) ;
     document.getElementById(tdate).value=brs.fields(3) ;
		 
}


function programlist(comboid,module='default',orgid='default',costcenterid='default',fyid='default', permissionfor='default', userid='default',datasource='default',transfertype='default',parentprogramid,includeparent='default')
{
	if(module=="")
		module="default";
		if(orgid=="")
		orgid="default";
			if(costcenterid=="")
		costcenterid="default";
			if(fyid=="")
		fyid="default";
			if(permissionfor=="")
		permissionfor="default";
			if(userid=="")
		userid="<%=session("username")%>";
			if(datasource=="")
		datasource="default";
			if(transfertype=="")
		transfertype="default";
		if(parentprogramid=="")
		parentprogramid="default";
		if(includeparent=="")
		includeparent="default";
		
	
	if(userid=='default' || userid=='')
		userid="<%=session("username")%>";
		
	var sql="select programid,budgetsubheading,programname<%=session("language")%> as programname from dbo.programlist("+module+","+orgid+","+costcenterid+","+fyid+","+ permissionfor+","+ userid+","+datasource+","+transfertype+","+parentprogramid+","+includeparent+") order by budgetsubheading,programid";	
	
	var rs=new recordset();
	rs.open(sql);
	removeall(comboid);
	if(parentprogramid=='default' || parentprogramid=='-1' || parentprogramid=='0' )
	additem(comboid,".......","0");
	
	if(rs.recordcount()>0)
	{
		while(!rs.eof())
		{
			additem(comboid,rs.fields(1)+" | " + rs.fields(2),rs.fields(0));
			rs.movenext();	
		}
	}
	
}

function orglist(comboid,module="default",programid="default",fyid="default",permissionfor="default",username="<%=session("username")%>",datasource="default",transfertype="default")
{
	/*
	@module numeric=null
,@programid numeric=null
,@fyid numeric=null
,@permissionfor numeric=2
,@username varchar(50)=null
,@datasource numeric=0
,@transfertype numeric=1)
	*/
//returns @t table(id numeric identity, orgid numeric,account int)
	
	if(module=="")
	module="default";
	
	if(programid=="")
	programid="default";
	
	if(costcenterid=="")
	costcenterid="default";
	if(fyid=="")
	fyid="default";
	if(permissionfor=="")
	permissionfor="default";
	if(username=="")
	username="<%=session("username")%>";
	if(datasource=="")
	datasource="default";
	if(transfertype=="")
	transfertype="default";
	 
		
var sql="select orgid,code,orgname<%=session("language")%> from dbo.orglist("+ module+","+programid+","+ fyid + "," + permissionfor + ",'"+username+"',"+ datasource+"," + transfertype + ") order by code";

var rs=new recordset();
	rs.open(sql);
	removeall(comboid);
	additem(comboid,".......","0");
	
	if(rs.recordcount()>0)
	{
		while(!rs.eof())
		{
			additem(comboid,rs.fields(1)+" | " + rs.fields(2),rs.fields(0));
			rs.movenext();	
		}
	}
}


</script>