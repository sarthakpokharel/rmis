<table border="1" width="500" style="border-collapse: collapse"> 
<% 
For each item in Request.ServerVariables 
   Response.Write("<tr><td>" & item & "</td><td>") 
   Response.Write(Request.ServerVariables(item)) 
   Response.Write("</td></tr>" & vbCrLf) 
Next 
%> 
</table>
