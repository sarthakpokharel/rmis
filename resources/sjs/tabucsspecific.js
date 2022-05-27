// JavaScript Document
function loadCC(username,orgidint,comboid)
{
	
	var rs=new recordset()
	var lang=getlanguage();
	
	if(lang=="En")
	rs.open("select officeidint,code,officenameen from oa_office_str where officeidint in (select costcenterid from dbo.[getMyCC]('" + username + "'," + orgidint + ",default)) order by code	");
	else
	rs.open("select officeidint,code,officenameNp from oa_office_str where officeidint in (select costcenterid from dbo.[getMyCC]('" + username + "'," + orgidint + ",default)) order by code	");
	
	removeall(comboid);
	
	if(rs.recordcount()>0)
	{
		while(!rs.eof())
		{
			//additem(combobox,text,value)
			additem(comboid,rs.fields(1)+' | ' + rs.fields(2),rs.fields(0));
			rs.movenext();	
		}
		
	}
	
}


function LoadPostLevel_SalarySheet(orgid,cmbid){	
	if(cmbid=="NaN"  ||  cmbid=="" )
		cmbid='postlevel'
	var language=getlanguage(); 
	var rs=new recordset();
	var cond;
	cond='';

cond='  where EmpLevelId in ( select distinct levelid from tbl_employee where   orgid='+orgid+') ' 
 if(language=='Np')
	sql= 'select  EmpLevelId,emplevelcode,LevelNameNp as levels,(select EmpLevelTypeNameNp from Oa_Emp_Level_Type as lt where lt.EmpLevelTypeId=l.EmpLevelTypeId) as etype from Oa_Emp_Level as l ' +cond+' order by l.levels'
		else
			sql= 'select  EmpLevelId,emplevelcode,LevelNameEn as levels,(select EmpLevelTypeNameEn from Oa_Emp_Level_Type as lt where lt.EmpLevelTypeId=l.EmpLevelTypeId) as etype from Oa_Emp_Level as l ' +cond+' order by l.levels'
			
 rs.open(sql);
 
 removeall(cmbid);
 additem(cmbid,'............','');
 if(rs.recordcount()>=1)
 {
 		
 	while(rs.eof()==false)
	{
	additem(cmbid,rs.fields(1)+' | '+rs.fields(3) +' ' +rs.fields(2),rs.fields(0));
	rs.movenext();
	}
}

	}


function LoadPost_SalarySheet(orgid,plevelid,cmbid){	
	if(cmbid=="NaN"  ||  cmbid=="" )
	cmbid='postid'
	var language=getlanguage(); 
	var rs=new recordset();
	var cond;
cond='';
if (trim(plevelid)!=''){
	cond=' where PostId in ( select distinct postid from tbl_employee where levelid=\'' +plevelid+'\' and orgid='+orgid+' )'
}
	else
	{
	cond=' where PostId in ( select distinct postid from tbl_employee where   orgid='+orgid+' )'
}
 
 if(language=='Np')
	sql= 'select PostId,postcode,PostNameNp as post from Oa_Emp_Post  p ' +cond+' order by PostNameNp'
		else
			sql= 'select PostId,postcode,PostNameen as post from Oa_Emp_Post  p ' +cond+' order by PostNameNp'
 rs.open(sql);
 
 removeall(cmbid);
 additem(cmbid,'............','');
 if(rs.recordcount()>=1)
 {
 		
 	while(rs.eof()==false)
	{
	additem(cmbid,rs.fields(1)+' | '+rs.fields(2),rs.fields(0));
	rs.movenext();
	}
}

	}

