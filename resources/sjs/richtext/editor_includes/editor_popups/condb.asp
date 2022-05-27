
<%
dim con
dim strcon
dim deletemsg
dim fdata
Set con = Server.CreateObject("ADODB.Connection")
//con.connectiontimeout = 600
strcon="Provider=SQLOLEDB.1;Password=password;Persist Security Info=True;User ID=sa;Initial Catalog=moneyorder"
con.Open strcon

%>

