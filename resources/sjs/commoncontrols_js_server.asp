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
	
	ccrs.open("select officeidint,code,officenamenp from oa_office_str where officeidint in (select officeid from dbo.ext_getofficelist (" + orgid + "," + permissionfor + ") where costcentertype in (" + costcentertype + ")) order by code");
	
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
			if(prs.recordcount()>0)
			{
				additem(comboid,prs.fields(1) + ' | ' + prs.fields(2),prs.fields(0))
			}
			else
			{
			additem(comboid,'............',''); 
			}
		}
}
function list_program_report()
{
	
	loadprogramme('programid',document.getElementById('orgid').value,document.getElementById('fiscalyear').value,document.getElementById('fundtypeid').value,2);

 //   additem(programid,'............','');
	
list_subprogram_report();	
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
	
loadsubprogramme('subprogramid',cid,document.getElementById('programid').value,document.getElementById('fiscalyear').value,ftype,2);
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

</script>