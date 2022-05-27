//*********forest validation***************
function forest_val(frmname,divname)
   {
		if(document.getElementById("classificationid").value=="")
		   {
				alert("Select Forest Classification");
				document.getElementById("classificationid").focus();
				return false;
		   }
		 if(document.getElementById("foresttypeid").value=="")
		   {
				alert("Select Forest Type");
				document.getElementById("foresttypeid").focus();
				return false;
		   }
	 if(document.getElementById("forestnamenp").value=="")
		   {
				alert("Enter Forest Name");
				document.getElementById("forestnamenp").focus();
				return false;
		   }
	if(document.getElementById("curarea").value=="")
		   {
				alert("Enter Forest area");
				document.getElementById("curarea").focus();
				return false;
		   }
	if(document.getElementById("unitid").value=="")
		   {
				alert("Select Unit");
				document.getElementById("unitid").focus();
				return false;
		   }
	if(document.getElementById("districtid").value=="")
		   {
				alert("Select District");
				document.getElementById("districtid").focus();
				return false;
		   }
	if(document.getElementById("orgid").value=="")
		   {
				alert("Select Organization");
				document.getElementById("orgid").focus();
				return false;
		   }
		   return submitform(frmname,divname);
   }

//*********Forest Classification validation***************
function forestclass_val(frmname,divname)
   {
		if(document.getElementById("classificationnameNP").value=="")
		   {
				alert("Enter Forest Classification Name");
				document.getElementById("classificationnameNP").focus();
				return false;
		   }
		   return submitform(frmname,divname);
   }
   
   
  //*********Sales total quantity calculation*************** 
  
  function CalTotalAmount(){
	  var a,b,c
	  if($$('qtyoutm').value=="NaN" || $$('qtyoutm').value=="")
	  a=0
	  else
	  a=parseFloat($$('qtyoutm').value);
	  
	  if($$('ratem').value=="NaN" || $$('ratem').value=="")
	  b=0
	  else
	  b=parseFloat($$('ratem').value);
	  
	  if($$('discountm').value=="NaN" || $$('discountm').value=="")
	  c=0
	  else
	  c=parseFloat($$('discountm').value);
	  
	  $$('totalm').value=(parseFloat(a)*parseFloat(b)-parseFloat(c));
  }
  
  function CalVatAmount(){
	  var a,b,c
	//alert($$('totalm').length)
	  a=120;
	   $$('vatamt').value=(parseFloat(a)*.13);
  }
  
  
//*********Forest type validation***************
function foresttype_val(frmname,divname)
   {
		if(document.getElementById("foresttypenamenp").value=="")
		   {
				alert("Enter Forest Type ");
				document.getElementById("foresttypenamenp").focus();
				return false;
		   }
		   return submitform(frmname,divname);
		   
   }


//*********Product Type validation***************
function producttype_val(frmname,divname)
   {
		if(document.getElementById("producttypenameNp").value=="")
		   {
				alert("Enter Product Type");
				document.getElementById("producttypenameNp").focus();
				return false;
		   }
		 return submitform(frmname,divname);
	
   }
//*********Product Type validation***************   
   function productsource_val(frmname,divname)
   {
		if(document.getElementById("sourcenameNp").value=="")
		   {
				alert("Enter Product Source Name");
				document.getElementById("sourcenameNp").focus();
				return false;
		   }
		   submitform(frmname,divname);
   }
   
//*********Product validation**************************
 function product_val(frmname,divname)
   {
		/*if(document.getElementById("producttypeid").value=="")
		   {
				alert("Select Product Type");
				document.getElementById("producttypeid").focus();
				return false;
		   }*/
		/*if(document.getElementById("productnameEn").value=="")
		   {
				alert("Enter Product English Name");
				document.getElementById("productnameEn").focus();
				return false;
		   }*/
		   if(document.getElementById("productnameNp").value=="")
		   {
				alert("Enter Product Name");
				document.getElementById("productnameNp").focus();
				return false;
		   }
		 if(document.getElementById("unitid").value=="")
		   {
				alert("Select Unit");
				document.getElementById("unitid").focus();
				return false;
		   }
		   submitform(frmname,divname);
   }
   
   
   
   /*  source destination*/
   
   function sourcedest_val(frmname,divname)
   {
		if(document.getElementById("namenp").value=="")
		   {
				alert("Please, Enter Name (Np)");
				document.getElementById("namenp").focus();
				return false;
		   }
		   submitform(frmname,divname);
   }
   
    
	
	//================== transaction validation==================
	
	
	function Purchase_val(frmname,divname)
   {
		
		if(document.getElementById("trandate").value=="")
		   {
				alert("Please, Enter Transaction Date !");
				document.getElementById("trandate").focus();
				return false;
		   }
		   if(document.getElementById("sourcedestid").value=="")
		   {
				alert("Please, select Income Source  !");
				document.getElementById("sourcedestid").focus();
				return false;
		   }
		   if(document.getElementById("orgid").value=="")
		   {
				alert("Please, Select Office !");
				document.getElementById("orgid").focus();
				return false;
		   }
		  return  submitform(frmname,divname);
   }
	
	 //**************income receiver Office setup validation******************************
   
function Officesetup_val(frmname,divname)
   {
	  		if(document.getElementById("OfficenameNp").value=="")
		   {
				alert("Please, Enter Office Name (Np)!");
				document.getElementById("OfficenameNp").focus();
				return false;
		   }
		 
		   if(trim(document.getElementById("districtid").value)=="")
		   {
				alert("Please, Select District !");
				document.getElementById("districtid").focus();
				return false;
		   }
		   submitform(frmname,divname);
   }
   
	
   
   //**************unit validation******************************
   
function unit_val(frmname,divname)
   {
	  		if(document.getElementById("unitnameNp").value=="")
		   {
				alert("Enter Unit");
				document.getElementById("unitnameNp").focus();
				return false;
		   }
		   submitform(frmname,divname);
   }
   
 //*************Create User validation*****************************888
 function createuser_val(frmname,divname)
  	{
		if(document.getElementById("username").value=="")
		   {
				alert("Enter User Name");
				document.getElementById("username").focus();
				return false;
		   }
		   
		if(document.getElementById("fullname").value=="")
		   {
				alert("Enter Name");
				document.getElementById("fullname").focus();
				return false;
		   }  
		if(document.getElementById("orgid").value=="")
		   {
				alert("Select Organization");
				document.getElementById("orgid").focus();
				return false;
		   }   
		   submitform(frmname,divname);
   }
   
function  permission_val (frmname,divname)
   {
		   submitform(frmname,divname);
   }
   
   /////////////////// To display unicode //////////////////////
var browser=navigator.appName;
function setUnicode(e,field)
{
	//alert(e.ctrlKey);
if(e.ctrlKey){
	return true;
}
	try 
	{
		(eval('obj_'+field.name));				
	}
	catch(ex)
	{
		eval('obj_'+field.name+'=new unicode_const()');
	}	
	

	var unicode=e.charCode? e.charCode : e.keyCode;
	var check=true;
	if(browser=="Netscape" && e.keyCode!=0)
		check=false;
		
	if(check){				
		new_value=eval('obj_'+field.name+'.toUnicode(String.fromCharCode(unicode),unicode,field)');	
		if(new_value==null)
			return false;
		if(new_value=="")
			new_value=String.fromCharCode(unicode);			
		eval('obj_'+field.name+'.insertAtCursor(field,new_value,0)');	
		return false; //disable key press		
	}		
}


function ascii_value (c)
{
	// restrict input to a single character
	c = c . charAt (0);

	// loop through all possible ASCII values
	var i;
	for (i = 0; i < 256; ++ i)
	{
		// convert i into a 2-digit hex string
		var h = i . toString (16);
		if (h . length == 1)
			h = "0" + h;

		// insert a % character into the string
		h = "%" + h;

		// determine the character represented by the escape code
		h = unescape (h);

		// if the characters match, we've found the ASCII value
		if (h == c)
			break;
	}
	return i;
}



function unicode_const()
{
	this.buffer='';
	this.found=false;
	this.buffStart=false;
	this.stepBack=0;
	this.cursor_position_before_hand=0;
	this.cursor_position_after_hand=0;
	this.toUnicode=toUnicode;
	this.insertAtCursor=insertAtCursor;
}

function insertAtCursor(myField, myValue,back_track)
{
  pos =doGetCaretPosition(myField);
  if (document.selection)
  {
	  if(!this.found)
	  {
	  	  myField.focus();
		  sel = document.selection.createRange();
		  sel.text = myValue;
		  sel.select();
	  }
	  else
	  {
	  	  myField.value = myField.value.substring(0, pos-back_track)+myValue+myField.value.substring(pos, myField.value.length);
		  var range = myField.createTextRange();
		  range.collapse(true);
		  range.moveEnd('character', pos-this.stepBack);
		  range.moveStart('character', pos-this.stepBack);
		  range.select();
		  this.found=false;
		  this.stepBack=0;
	  }
  }
  //MOZILLA/NETSCAPE support
  else if (myField.selectionStart || myField.selectionStart == '0')
  {
    
	  var startPos = myField.selectionStart - back_track;
	  var endPos = myField.selectionEnd;
	  
      var newEndPos = startPos + myValue.length;
      myField.value = myField.value.substring(0, startPos)+myValue+myField.value.substring(endPos, myField.value.length);
      myField.setSelectionRange(newEndPos, newEndPos);
  }
  else 
  {
      var newEndPos = myField.value.length + myValue.length;
      myField.value += myValue;
      myField.setSelectionRange(newEndPos, newEndPos);
  }
}

/* -- End Hiding Here --> */  

function caseA(val)
{
	var index_case_a=new Array('em','If','if',')f','f]','f}','cf','cf]','cf}','Qm','km','O{','qm');
	var value_case_a=new Array('झ','क्ष ','ष','ण','ो','ौ','आ','ओ','औ','क्त','फ','ई','क्र');
	if(getIndex(index_case_a,val)!=-1)
		return value_case_a[getIndex(index_case_a,val)];
	else
		return false;
}

function toUnicode(char,keyChar,fld)
{
	var font='﻿μsplasplbsplcspldsplesplfsplgsplhsplispljsplkspllsplmsplsplnsplosplpsplqsplrsplsspltsplusplvsplwsplxsplysplzsplAsplBsplCsplDsplEsplFsplGsplHsplIsplJsplKsplLsplMsplNsplOsplPsplQsplRsplSsplTsplUsplVsplWsplXsplYsplZspl1spl2spl3spl4spl5spl6spl7spl8spl9spl0spl.spl:spl,spl;spl(spl*spl!spl@spl?spl\'spl)spl]spl[spl}spl{spl`spl~spl#spl$spl%spl^spl&spl-spl_spl+spl=spl|spl/spl"spl\\spl<spl>splªspl«spl§spl°spl±spl´splµspl¶spl¯spl¸spl¹splÅsplÆsplÈsplËsplÌsplÍsplÎsplÏsplÒsplÓsplÕsplÖspl×splØsplÙsplÚsplÛsplÜsplÝsplÞsplßsplàsplásplâsplãsplåsplæsplçsplèsplésplêsplësplìsplísplîsplïsplðsplñsplòsplósplôsplõsplöspl÷spløsplùsplˆsplˉspl˜spl‐spl–spl—spl‘spl„spl•spl…spl‰spl›spl«';
	var unicode='splबsplदsplअsplमsplभsplाsplनsplजsplष्splवsplपsplिsplऽsplsplलsplयsplउsplत्रsplचsplकsplतsplगsplखsplधsplहsplथsplशsplब्splद्यsplऋsplम्splभ्splँsplन्splज्splक्ष्splव्splप्splीsplःsplल्splइsplएsplत्तsplच्splक्splत्splग्splख्splध्splह्splथ्splश्spl१spl२spl३spl४spl५spl६spl७spl८spl९spl०spl।splस्spl,splसsplढsplडsplज्ञsplद्दsplरुsplुsplण्splेsplृsplैsplर्splञsplञ्splघsplद्धsplछsplटsplठspl-spl)splंspl॰spl्रsplरsplूspl्spl?splश्रsplङsplsplट्टsplड्ढspl+splsplsplठ्ठsplspl(spl)splहृspl"splरूsplङ्गsplन्नsplङ्गsplङ्खsplङ्घsplsplsplक्कspl=spl×splspl;spl\'spl!spl%splsplsplद्मsplsplsplय्splक्षsplद्वsplsplॐsplsplsplषsplिँsplफ्splऊsplज्जsplत्रsplत्त्splद्भsplझsplझ्splॅsplल्लsplऋsplsplच्चsplत्र्splsplsplऽsplsplsplsplॅsplध्रsplड्डsplsplsplद्रspl्र';
	font=(font.split('spl'));
	unicode=(unicode.split('spl'));
	
	var init_check=Array('e','I','i',')','f','c','Q','k','O','q');
	
	if(getIndex(init_check,char)!=-1)
		this.buffStart=true;		
	if(this.buffStart)
		this.buffer+=char;	
	if(trim(char)=='')
	{
		this.buffStart=false;
		this.buffer='';
	}		
	this.cursor_position_before_hand=this.cursor_position_after_hand;
	this.cursor_position_after_hand=doGetCaretPosition(fld);
	if(caseA(this.buffer))
	{
		buffer_text=caseA(this.buffer);
		this.found=true;
		if(buffer_text=='ष' || buffer_text=='ण')
		{
			back_track=2;
			this.stepBack=1;
		}
		else if(trim(buffer_text)=='क्ष')
		{
			back_track=4;
			this.stepBack=1;
		}
		else if(trim(buffer_text)=='क्त' || trim(buffer_text)=='क्र')   
			back_track=3;
		else
			back_track=1;
		if(this.cursor_position_after_hand==this.cursor_position_before_hand+back_track || this.cursor_position_after_hand==this.cursor_position_before_hand)
		{	
			this.insertAtCursor(fld,trim(buffer_text),back_track);
			return null;
		}
		else
		{
			this.buffStart=false;
			this.buffer='';
		}
	}	
	else if(this.buffer.length > 1)
	{
		this.buffStart=false;
		this.buffer='';
		if(getIndex(init_check,char)!=-1)
		{
			this.buffStart=true;		
			this.buffer+=char;	
		}
	}
	if(unicode[getIndex(font,char)]!='undefined')
		return unicode[getIndex(font,char)];
}
function getIndex(arr,ch) 
{
	var myPosition=-1;
	for (var i=0;i<arr.length;i++)
	{
		if(trim(arr[i])==trim(ch)) 
		{
			myPosition = i;
			break;
		}
	}
	return myPosition;
}
function doGetCaretPosition (ctrl) {

	var CaretPos = 0;
	// IE Support
	if (document.selection) {

		ctrl.focus ();
		var Sel = document.selection.createRange ();

		Sel.moveStart ('character', -ctrl.value.length);

		CaretPos = Sel.text.length;
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0')
		CaretPos = ctrl.selectionStart;

	return (CaretPos);

}

function onetime_validate(tablename,forms,targetdiv)
{
	if(document.getElementById(tablename+'_nameen').value=="")
	{
		alert('Name field is empty, please enter a value.');
		document.getElementById(tablename+'_nameen').focus();
		return false;
		
	}
	else
	{
		submitform(forms,targetdiv);
		return true;
	}
}
function periodic_validate(tablename,forms,targetdiv)
{
	
		if(document.getElementById('txtdate').value=="")
		{
			alert('Please select date.');
			document.getElementById('txtdate').focus();
			return false;
		}
		else
		{
			alert(targetdiv);
		submitform(forms,targetdiv);
		return true;
		}
	
}

/////////////////// end /////////////////////////////////////
   