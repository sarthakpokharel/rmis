<?
$path= "js/menu/";
?>

<!-- Core Menu Code -->
	<script type="text/JavaScript" src="<?=$path?>qm.js"></script>
	

	<!-- Add-On Core Code (Remove when not using any add-on's) -->
	<style type="text/css">.qmfv{visibility:visible !important;}.qmfh{visibility:hidden !important;}</style><script type="text/JavaScript">var qmad = new Object();qmad.bvis="";qmad.bhide="";qmad.bhover="";</script>


		<!-- Add-On Settings -->
		<script type="text/JavaScript">

			/*Menu 0 Settings*/
			var a = qmad.qm0 = new Object();
		

			/* ----Tree Menu Add-On Settings---- */

			a.tree_hide_focus_box = true;
			a.tree_auto_collapse = true;			

			a.tree_expand_step_size = 8;
			a.tree_collapse_step_size = 15;
			a.tree_expand_animation = 0		//0=none, 1=acceleration, 2=deceleration, 3=normal
			a.tree_collapse_animation = 0		//0=none, 1=acceleration, 2=deceleration, 3=normal


			a.tree_width = 200;
			a.tree_sub_sub_indent = 15; 

			

			/* ----Item Bullets Add-On Settings---- */
			
			a.ibullets_apply_to = "parent"  //parent, non-parent, all

			a.ibullets_main_image = "<?=$path?>images/tree_main_plus.gif";
			a.ibullets_main_image_active = "<?=$path?>images/tree_main_plus_active.gif";
			a.ibullets_main_image_hover = "<?=$path?>images/tree_main_plus_hover.gif";
			a.ibullets_main_image_width = 13;
			a.ibullets_main_image_height = 13;
			a.ibullets_main_position_x = -15;
			a.ibullets_main_position_y = -6;
			a.ibullets_main_align_x = "right"
			a.ibullets_main_align_y = "middle"

			a.ibullets_sub_image = "<?=$path?>images/tree_sub_plus.gif";
			a.ibullets_sub_image_active = "<?=$path?>images/tree_sub_plus_active.gif";
			a.ibullets_sub_image_hover = "<?=$path?>images/tree_sub_plus_hover.gif";
			a.ibullets_sub_image_width = 5;
			a.ibullets_sub_image_height = 5;
			a.ibullets_sub_position_x = -10;
			a.ibullets_sub_position_y = -3;
			a.ibullets_sub_align_x = "left"
			a.ibullets_sub_align_y = "middle"
	
			
			
		</script>



<script type="text/JavaScript" src="<?=$path?>qm_tree_menu.js"></script>
<script type="text/JavaScript" src="<?=$path?>qm_item_bullets.js"></script>


<!--%%%%%%%%%%%% QuickMenu Styles [Keep in head for full validation!] %%%%%%%%%%%-->
<style type="text/css">


/*!!!!!!!!!!! QuickMenu Core CSS [Do Not Modify!] !!!!!!!!!!!!!*/
.qmclear {font-size:1px;height:0px;width:0px;clear:left;line-height:0px;display:block;}.qmmc {position:relative;}.qmmc a {float:left;display:block;white-space:nowrap;}.qmmc div a {float:none;}.qmsh div a{float:left;}.qmmc div {visibility:hidden;position:absolute;}


/*!!!!!!!!!!! QuickMenu Styles [Please Modify!] !!!!!!!!!!!*/


	/* Remove the comments bleow for vertical mains and change the false value to
           true in the qm_create function after the menus structure. */
	/*.qmmc a {float:none}*/

		

	/*"""""""" (MAIN) Container """"""""*/
	#qm0
	{ 
		background-image:url(<?=$path?>images/submenubg.gif);
		border-style:solid;
		border-color:#9C9C9C;
		border-width:0px 1px 0px 1px;
	}


	 /*"""""""" (MAIN) Items """"""""*/
	#qm0 a
	{
		color:#000000;
		background-color:#336633;
		background-image:url(<?=$path?>images/tree_green_bg.gif);
		font-family:Arial;
		font-size:12px;
		text-decoration:none;
		padding:5px 5px 5px 8px;
		border-style:solid;
		border-color:#9C9C9C;/*#66cc00;*/
		border-width:0px 0px 1px 0px;
	
	}


	/*"""""""" (MAIN) Hover State """"""""*/
	#qm0 a:hover
	{ 
		background-image:url(<?=$path?>images/tree_green_bg_hover.gif);
		text-decoration:underline;
		font-weight:bold;
		/*background-color:#efefef;*/
	}


	/*"""""""" (MAIN) Active State """"""""*/	
	body #qm0 .qmactive, body #qm0 .qmactive:hover
	{ 
		background-image:url(<?=$path?>images/tree_green_bg_hover.gif);
		text-decoration:underline;
		font-weight:bold;
	}


	/*"""""""" (MAIN) Parent Items """"""""*/
	#qm0 .qmparent
	{	background-image:url(<?=$path?>images/tree_green_bg.gif);
	/*background-image:url(<?=$path?>images/tree_green_bg_hover.gif);*/
		/*background-image:url(<?=$path?>images/arrow_down.gif);
		background-repeat:no-repeat;
		background-position:95%;*/
	}

	#qm0 .qmparent:hover
	{	background-image:url(<?=$path?>images/tree_green_bg_hover.gif);
		font-weight:bold;
		/*background-image:url(<?=$path?>images/arrow_down.gif);
		background-repeat:no-repeat;
		background-position:95%;*/
	}

	/*"""""""" [SUB] Containers """"""""*/
	#qm0 div
	{
		background-image:url(<?=$path?>images/submenubg.gif);
		padding:10px 0px 10px 0px;
		border-style:none;
		border-width:1px;
		border-color:#006600;
		margin-top:-1px;
	}

	/*"""""""" [SUB] Items """"""""*/
	#qm0 div a
	{
		background-image:url(<?=$path?>images/submenubg.gif);
		padding:2px 0px 2px 15px;
		border-width:0px;
		border-style:solid;
		background-color:transparent;
		/*border-color:transparent;*/
		margin:0px 5px 0px 5px;
	}

	
	/*"""""""" [SUB] Hover State """"""""*/
	#qm0 div a:hover
	{
		background-image:url(<?=$path?>images/tree_green_bg_hover.gif);
		text-decoration:underline;
		font-weight:bold;
	}


	/*""""""""[SUB] Active State """"""""*/
	body #qm0 div .qmactive, body #qm0 div .qmactive:hover
	{
		background-image:url(<?=$path?>images/tree_green_bg.gif);
		background-color:#D7F7C6;
		border-color:#999999;
	}


	/*"""""""" [SUB] Parent Items """"""""*/
	#qm0 div .qmparent 
	{
		/*background-image:url(<?=$path?>images/arrow_right.gif);*/
	}


	


</style>
