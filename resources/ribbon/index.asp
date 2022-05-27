<!-- #include file = "../includes/aspfunctions.asp" -->
<%
dim usertype,ribbonid
usertype=1
ribbonid="100612272120948923"
on error goto 0
%>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>Local Level Financial Management System</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 

        <!--include bootstrap-->
        <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap/bootstrap-theme.min.css" rel="stylesheet" type="text/css"/>


        <!--include bootstrap menu style-->
        <link href="css/bootstrap-dropdownhover.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/animate.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap/font-awesome.min.css" rel="stylesheet" type="text/css"/>

        <!--include silk menu style-->
        <link href="css/slick/slick.css" rel="stylesheet" type="text/css"/>
        <link href="css/slick/slick-theme.css" rel="stylesheet" type="text/css"/>

        <!--include stylesheet-->

        <link href="css/style.css" rel="stylesheet" type="text/css"/>
        <link href="css/main-menu.css" rel="stylesheet" type="text/css"/>

        <!--include jQuery-->
        <script src="js/jquery-3.2.1.min.js" type="text/javascript"></script>

    </head>
    <body>
        <!------------------->
        <!----HEADER PART----->
        <!-------------------->
        <div class="header-part">
            <!------------------->
            <!----TOP BANNER----->
            <!-------------------->
            <div class="top-banner">
                <nav class="navbar navbar-fixed-top">
                    <div class="container">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <a class="navbar-brand" href="#">
                                <img src="img/nepal-govt-logo.png" alt=""/>
                                SUTRA
                            </a>

                        </div>
                        <div id="navbar" class="navbar-collapse collapse">
                            <!--<ul class="nav navbar-nav navbar-center">                                
                                <li><a href="#">OFFICE NAME HERE, Long Office name </a></li>


                            </ul>-->
                            <ul class="nav navbar-nav navbar-right">

                                <li><a href="../navbar-static-top/"> <img src="img/nepal-govt-logo.png" alt=""/>पंकज [अर्थ मन्त्रालय]</a></li>
                                <li><a href="../navbar-static-top/">Approve Offline</a></li>
                                <li><a href="../navbar-static-top/">Home</a></li>
                                <li class="active"><a href="./">Login <span class="sr-only">(current)</span></a></li>
                                <li><a href="#"  rel="popover"  data-toggle="popover"  data-placement="bottom" data-popover-content="#myPopover" ><i class="fa fa-caret-down" aria-hidden="true"></i></a></li>
                                <div id="myPopover" class="hide">
                                    <div class="header-part">This is a popover list:</div>
                                    <ul>
                                        <li>List item 1</li>
                                        <li>List item 2</li>
                                        <li>List item 3</li>
                                    </ul>
                                </div>
                            </ul>
                        </div><!--/.nav-collapse -->
                    </div>
                </nav>
            </div>

            <!------------------->
            <!----MENU BANNER----->
            <!-------------------->
            <%
			function has2ribbon(appid)
				dim rs
				set rs=server.CreateObject("ADODB.RecordSet")
				rs.cursorlocation=3
				rs.open "select * from hr_usertypemenulist where usertype=" & usertype & " and ribbonid=" & ribbonid & " and itemtype='Ribbon' and applicationid='" & appid & "' order by temporder ",conn,adopenkeyset
				dim ret
				if rs.recordcount>1 then
					ret="Yes"
				else
					ret="No"
				end if
				rs.close
				has2ribbon=ret
			end function 
				public Sub AddRibbon(Byval Usertype,ByVal RibbonId)
					 'Begin 1
					 response.Write("<div class=""menu"">" & vbcrlf)
                '<!-- Fixed navbar -->
                response.Write("<div class=""row"">" & vbcrlf)
                    
                    response.Write("<div class=""col-md-12"" style=""padding: 0px; position: fixed; left: 0;right: 0;"">" & vbcrlf)
                        response.Write("<div class=""panel with-nav-tabs panel-default"">" & vbcrlf)
                            response.Write("<div class=""panel-heading"">" & vbcrlf)
					'End 1
					'Begin 2
						                                response.Write("<ul class=""nav nav-tabs"">" & vbcrlf)
                                    response.Write("<li class=""dropdown"">")
                                        response.Write("<a href=""#"" data-toggle=""dropdown"">") 
                                            response.Write("<span class=""glyphicon glyphicon-th"" aria-hidden=""true"" style=""font-size: 16px;""></span> " & vbcrlf)
                                            response.Write("<i class=""fa fa-caret-down"" aria-hidden=""true""></i>" & vbcrlf)
       
					'End 2	
					'Begin Application Selection
						dim Apprs
						set Apprs=server.CreateObject("ADODB.RecordSet")
						dim Ribbonrs
						set RibbonRs=server.CreateObject("ADODB.RecordSet")
						RibbonRs.cursorlocation=3
						Apprs.cursorlocation=3
						
						Apprs.open "select * from hr_usertypemenulist where usertype=" & usertype & " and ribbonid=" & ribbonid & " and itemtype='Application' order by temporder ",conn,adopenkeyset
						if Apprs.recordcount>0 then
							response.Write(" <ul class=""dropdown-menu "" role=""menu"">" & vbcrlf)
							While not Apprs.eof
								if has2ribbon(Apprs.fields("applicationid").value)="Yes" then
									 response.Write("<li id=""home-sub-menu"" class=""sub-menu"">" & vbcrlf)
                                                    response.Write("<a href=""javascript:navigates('" & apprs.fields("href").value & "','scrollcontent')"" data-toggle=""dropdown"">" & wds(apprs.fields("caption")) & " <span class=""caret"" style="" ""></span></a>" & vbcrlf)
													
													ribbonrs.open "select * from hr_usertypemenulist where usertype=" & usertype & " and ribbonid=" & ribbonid & " and itemtype='Ribbon' and applicationid=" & apprs.fields("applicationid") & " order by temporder ",conn,adopenkeyset
													
												response.Write("<ul class=""custom-drop"" style=""display: none;"" role=""menu"">" & vbcrlf)
												while not ribbonrs.eof
												
                                                        response.Write("<li><a href=""javascript:naviages('" & ribbonrs.fields("href").value & "','scrollcontent')"" data-toggle=""tab"">" & ribbonrs.fields("caption") & "</a></li>" & vbcrlf)
                                				ribbonrs.movenext
								                 wend
												 ribbonrs.close
                                                   response.Write("</ul>" & vbcrlf)
                                                response.Write("</li>" & vbcrlf)
								else
								
								end if
									ribbonrs.open "select * from hr_usertypemenulist where usertype=" & usertype & " and ribbonid=" & ribbonid & " and itemtype='Ribbon' and applicationid=" & apprs.fields("applicationid") & " order by temporder ",conn,adopenkeyset
													
												
												while not ribbonrs.eof
												
                                                        response.Write("<li><a href=""javascript:naviages('" & ribbonrs.fields("href").value & "','scrollcontent')"" data-toggle=""tab"">" & apprs.fields("caption") & "</a></li>" & vbcrlf)
                                				ribbonrs.movenext
								                 wend
												 ribbonrs.close
                                                   
								Apprs.movenext
							wend
							 response.Write("</ul>")
                                  
						end if
						  response.Write("</li>")
					'End Application Selection
					'Begin TAB
						dim tabrs
						set tabrs=server.CreateObject("ADODB.RecordSet")
						tabrs.cursorlocation=3
						tabrs.open "select * from hr_usertypemenulist where usertype=" & usertype & " and ribbonid=" & ribbonid & " and itemtype='Tab' order by temporder ",conn,adopenkeyset
						dim tcounter,listitem,largeitem,smallitem
						tcounter=0
						if tabrs.recordcount>0 then
							while not tabrs.eof
								tabcounter=tabcounter+1
								if tabcounter=1 then
									response.Write("<li class=""active""><a href=""#tab" & tabrs.fields("itemid").value & "default"" data-toggle=""tab"">" & wds(tabrs.fields("caption").value) & "</a></li>")
								else
									response.Write("<li><a href=""#tab" & tabrs.fields("itemid").value & "default"" data-toggle=""tab"">" & wds(tabrs.fields("caption").value) & "</a></li>")
								end if
								tabrs.movenext
							wend
						end if
						tabrs.movefirst
					'End TAB
						response.Write("</ul>")	
					response.Write("</div>")
					'End upper part
					'Begin Ribbon Content
					response.Write("<div class=""panel-body"">")
                                response.Write("<div class=""tab-content"">")
					if tabrs.recordcount>0 then
					dim grouprs,itemrs,crs
					set grouprs=server.CreateObject("ADODB.RecordSet")
					grouprs.cursorlocation=3
					
					
					set itemrs=server.CreateObject("ADODB.RecordSet")
					itemrs.cursorlocation=3
					set crs=server.CreateObject("ADODB.RecordSet")
					crs.cursorlocation=3
					tcounter=0
						while not tabrs.eof
							tcounter=tcounter+1
							if tcounter=1 then
				response.Write("<div class=""tab-pane fade in active"" id=""tab" & tabrs.fields("itemid").value & "default"">")
				else
				response.Write("<div class=""tab-pane fade"" id=""tab" & tabrs.fields("itemid").value & "default"">")
				 				 
				 end if
				 		grouprs.open "select * from hr_usertypemenulist where usertype=" & usertype & " and ribbonid=" & ribbonid & " and itemtype='Group' and parentid=" & tabrs.fields("itemid") & " order by temporder ",conn,adopenkeyset
				 				if grouprs.recordcount>0 then
									while not grouprs.eof
                                        response.Write("<div class=""inset"">")
                                            response.Write("<div class=""submenu-container"">")
                                                response.Write("<div class=""submenu-inner-container"">")
											itemrs.open "select * from hr_usertypemenulist where usertype=" & usertype & " and ribbonid=" & ribbonid & " and parentid=" & grouprs.fields("itemid") & " order by temporder ",conn,adopenkeyset
											
											listitem=0
											largeitem=0
											smallitem=0
											if itemrs.recordcount>0 then
												while not itemrs.eof
												'Item
												if itemrs.fields("itemtype").value="List Item" then
												if smallitem>0 then
													response.Write("</ul>")
												end if
												listitem=listitem+1
												if listitem mod 3=1 then
													if listitem<>1 then
														response.Write("</ul>")
													end if
													response.Write("										<ul class=""pull-left menu"">")
												end if
												

													largeitem=0
													smallitem=0

												elseif itemrs.fields("itemtype").value="Large Item" then
												if smallitem>0 then
													response.Write("</ul>")
												end if
												if listitem>0 then
													response.Write("</ul>")
												end if
												largeitem=largeitem+1
												listitem=0
												smallitem=0
												
												elseif itemrs.fields("itemtype").value="Small Item" then
												if listitem>0 then
													response.Write("</ul>")
												end if
												smallitem=smallitem+1
												if smallitem mod 3=1 then
													if smallitem<>1 then
														response.Write("</ul>")
													end if
													response.Write("										<ul class=""pull-left menu"">")
												end if
												largeitem=0
												listitem=0
												end if
	if itemrs.fields("itemtype").value="List Item" then
	crs.open "select * from hr_usertypemenulist where usertype=" & usertype & " and ribbonid=" & ribbonid & " and parentid=" & itemrs.fields("itemid") & " order by temporder ",conn,adopenkeyset
		if crs.recordcount>0 then
			response.Write("<li class=""dropdown""><a href=""#"" data-toggle=""dropdown""><img src=""" & itemrs.fields("image").value & """ height=""16"" width=""16""/> " & wds("" & itemrs.fields("caption").value) & "<i class=""fa fa-caret-down"" aria-hidden=""true""></i></a>")
				
				
				
					response.Write("<ul class=""dropdown-menu"" role=""menu"">")
					while not crs.eof
						response.Write("<li><a href=""javascript:helpcommand='" & crs.fields("itemid").value & "';navigates('" & crs.fields("onclick").value & "','scrollcontent')""><img src=""" & crs.fields("image").value & """ height=""16"" width=""16""/> " & wds(crs.fields("caption").value) & "</a></li>")
						crs.movenext
					wend
					response.Write("</ul>")
				
				
				
			response.Write("</li>")
		
		else
		response.Write("<li><a href=""javascript:helpcommand='" & itemrs.fields("itemid").value & "';navigates('" & itemrs.fields("onclick").value & "','scrollcontent')""><img src=""" & itemrs.fields("image").value & """ height=""16"" width=""16""/> " & wds(itemrs.fields("caption").value) & "</a></li>")
		end if
		crs.close
	elseif itemrs.fields("itemtype").value="Large Item" then
	response.Write("<ul class=""pull-left menu"">")
	crs.open "select * from hr_usertypemenulist where usertype=" & usertype & " and ribbonid=" & ribbonid & " and parentid=" & itemrs.fields("itemid") & " order by temporder ",conn,adopenkeyset
		if crs.recordcount>0 then
			response.Write("<li class=""dropdown""><a href=""#"" data-toggle=""dropdown""><img src=""" & itemrs.fields("image").value & """ height=""16"" width=""16""/> " & wds(itemrs.fields("caption").value) & "<i class=""fa fa-caret-down"" aria-hidden=""true""></a>")
				
				
				
					response.Write("<ul class=""dropdown-menu"" role=""menu"">")
					while not crs.eof
						response.Write("<li><a href=""javascript:helpcommand='" & crs.fields("itemid").value & "';navigates('" & crs.fields("onclick").value & "','scrollcontent')""><img src=""" & crs.fields("image").value & """ height=""16"" width=""16""/> " & wds(crs.fields("caption")).value & "</a></li>")
						crs.movenext
					wend
					response.Write("</ul>")
				
				
				
			response.Write("</li>")
		
		else
		response.Write("<li  class=""text-center single""><a href=""javascript:helpcommand='" & itemrs.fields("itemid").value & "';navigates('" & itemrs.fields("onclick").value & "','scrollcontent')""><img src=""" & itemrs.fields("image").value & """ height=""32"" width=""32""/> " & wds(itemrs.fields("caption").value) & "</a></li>")
		
		end if
		response.Write("</ul>")
		crs.close
	elseif itemrs.fields("itemtype").value="Small Item" then
		crs.open "select * from hr_usertypemenulist where usertype=" & usertype & " and ribbonid=" & ribbonid & " and parentid=" & itemrs.fields("itemid") & " order by temporder ",conn,adopenkeyset
		if chrs.recordcount>0 then
				response.Write("<li class=""dropdown""><a href=""#"" data-toggle=""dropdown""><img src=""" & itemrs.fields("image").value & """ height=""16"" width=""16""/> " & wds(itemrs.fields("caption").value) & "<i class=""fa fa-caret-down"" aria-hidden=""true""></a>")
					
				
					
						response.Write("<ul class=""dropdown-menu"" role=""menu"">")
						while not crs.eof
							response.Write("<li><a href=""javascript:helpcommand='" & crs.fields("itemid").value & "';navigates('" & crs.fields("onclick").value & "','scrollcontent')""><img src=""" & crs.fields("image").value & """ height=""16"" width=""16""/> " & wds(crs.fields("caption")).value & "</a></li>")
							crs.movenext
						wend
						response.Write("</ul>")
					
					
					
				response.Write("</li>")
			
			else
			response.Write("<li  class=""pull-left menu""><a href=""javascript:helpcommand='" & itemrs.fields("itemid").value & "';navigates('" & itemrs.fields("onclick").value & "','scrollcontent')""><img src=""" & itemrs.fields("image").value & """ height=""16"" width=""16""/> " & wds(itemrs.fields("caption").value) & "</a></li>")
			end if
			crs.close
	end if
												itemrs.movenext
												wend
											end if
											if listitem>0 or smallitem>0 then
													response.Write("</ul>")
												end if
											itemrs.close
											
											response.Write("</div>")
                                                response.Write("<div class="" col-sm-12""><div class=""bottom-text"">" & wds(grouprs.fields("caption").value) & "</div></div>")
                                            response.Write("</div>") 
                                        response.Write("</div>")
											grouprs.movenext	
										wend	
								end if	
								grouprs.close
												
							response.Write("</div>")'Close div for tab					
												 
							tabrs.movenext
						wend
					end if
					response.Write("</div>")
										response.Write("</div>")
										response.Write("</div>")
										response.Write("</div>")
										response.Write("</div>")
					'End Ribbon COntent
				end Sub
				
				function haschild(a)
					dim Chrs
					set Chrs=server.CreateObject("ADODB.RecordSet")
					Chrs.cursorlocation=3
					Chrs.open 
				end function
				 AddRibbon usertype,ribbonid
			%>
           
            
        <!------------------->
        <!----Body Part----->
        <!-------------------->
        <div id="container">
        <div id="scrollcontent">
            
            </div>


        </div>

        <!-- /container -->

        <!------------------->
        <!----footer----->
        <!-------------------->
        <!--footer start from here-->
        <footer class="footer">
            <div class="copyright">
                <div class="container">
                    <div class="col-md-6">
                        <p>© 2016 - All Rights with Webenlance</p>
                    </div>
                    <div class="col-md-6">
                        <ul class="bottom_ul">
                            <li><a href="#">webenlance.com</a></li>
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Faq's</a></li>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">Site Map</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </footer>
        <!--footer end from here-->
        <!--JQUERY FOR BOOTSTRAP-->
        <script src="js/bootstrap.min.js" type="text/javascript"></script>
        <script src="js/bootstrap-dropdownhover.min.js" type="text/javascript"></script>
        <!--JQUERY FOR silk-->
        <script src="css/slick/slick.min.js" type="text/javascript"></script>
        <script src="css/slick/slick.js" type="text/javascript"></script>
        <script src="js/function.js" type="text/javascript"></script>



    </body>
</html>
