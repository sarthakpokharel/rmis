<!-- based on insimage.dlg -->
<!--#include file="../../includes/aspfunctions.asp"-->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD W3 HTML 3.2//EN">
<HTML  id=dlgImage STYLE="width: 432px; height: 194px; ">
<HEAD>
<!--#include file="clsUpload.asp"-->
<%
set o = new clsUpload
%>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<meta http-equiv="MSThemeCompatible" content="Yes">
<TITLE>Insert Image</TITLE>
<style>
  html, body, button, div, input, select, fieldset { font-family: MS Shell Dlg; font-size: 8pt; position: absolute; };
</style>
<SCRIPT defer>

function _CloseOnEsc() {
  if (event.keyCode == 27) { window.close(); return; }
}

function _getTextRange(elm) {
  var r = elm.parentTextEdit.createTextRange();
  r.moveToElementText(elm);
  return r;
}

window.onerror = HandleError

function HandleError(message, url, line) {
  var str = "An error has occurred in this dialog." + "\n\n"
  + "Error: " + line + "\n" + message;
  alert(str);
  window.close();
  return true;
}

function Init() {
  var elmSelectedImage;
  var htmlSelectionControl = "Control";
  var globalDoc = window.dialogArguments;
  var grngMaster = globalDoc.selection.createRange();

  // event handlers
  document.body.onkeypress = _CloseOnEsc;
  frmupload.btnOK.onclick = new Function("btnOKClick()");

  frmupload.txtFileName.fImageLoaded = false;
  frmupload.txtFileName.intImageWidth = 0;
  frmupload.txtFileName.intImageHeight = 0;

  if (globalDoc.selection.type == htmlSelectionControl) {
    if (grngMaster.length == 1) {
      elmSelectedImage = grngMaster.item(0);
      if (elmSelectedImage.tagName == "IMG") {
        frmupload.txtFileName.fImageLoaded = true;
        if (elmSelectedImage.src) {
          frmupload.txtFileName.value          = elmSelectedImage.src.replace(/^[^*]*(\*\*\*)/, "$1");  // fix placeholder src values that editor converted to abs paths
          frmupload.txtFileName.intImageHeight = elmSelectedImage.height;
          frmupload.txtFileName.intImageWidth  = elmSelectedImage.width;
          frmupload.txtVertical.value          = elmSelectedImage.vspace;
          frmupload.txtHorizontal.value        = elmSelectedImage.hspace;
          frmupload.txtBorder.value            = elmSelectedImage.border;
          frmupload.txtAltText.value           = elmSelectedImage.alt;
          frmupload.selAlignment.value         = elmSelectedImage.align;
        }
      }
    }
  }
  frmupload.txtFileName.value = frmupload.txtFileName.value || "http://";
  frmupload.txtFileName.focus();
}

function _isValidNumber(txtBox) {
  var val = parseInt(txtBox);
  if (isNaN(val) || val < 0 || val > 999) { return false; }
  return true;
}

function btnOKClick() {
 frmupload.submit();
 return;
  var elmImage;
  var intAlignment;
  var htmlSelectionControl = "Control";
  var globalDoc = window.dialogArguments;
  var grngMaster = globalDoc.selection.createRange();

  // error checking

  if (!frmupload.txtFileName.value || frmupload.txtFileName.value == "http://") {
    alert("Image URL must be specified.");
    frmupload.txtFileName.focus();
    return;
  }
  if (frmupload.txtHorizontal.value && !_isValidNumber(frmupload.txtHorizontal.value)) {
    alert("Horizontal spacing must be a number between 0 and 999.");
    txtHorizontal.focus();
    return;
  }
  if (frmupload.txtBorder.value && !_isValidNumber(frmupload.txtBorder.value)) {
    alert("Border thickness must be a number between 0 and 999.");
    frmupload.txtBorder.focus();
    return;
  }
  if (frmupload.txtVertical.value && !_isValidNumber(frmupload.txtVertical.value)) {
    alert("Vertical spacing must be a number between 0 and 999.");
    frmupload.txtVertical.focus();
    return;
  }

  // delete selected content and replace with image
  if (globalDoc.selection.type == htmlSelectionControl && !frmupload.txtFileName.fImageLoaded) {
    grngMaster.execCommand('Delete');
    grngMaster = globalDoc.selection.createRange();
  }

  idstr = "\" id=\"556e697175657e537472696e67";     // new image creation ID
  if (!frmupload.txtFileName.fImageLoaded) {
    grngMaster.execCommand("InsertImage", false, idstr);
    elmImage = globalDoc.all['556e697175657e537472696e67'];
    elmImage.removeAttribute("id");
    elmImage.removeAttribute("src");
    grngMaster.moveStart("character", -1);
  } else {
    elmImage = grngMaster.item(0);
    if (elmImage.src != txtFileName.value) {
      grngMaster.execCommand('Delete');
      grngMaster = globalDoc.selection.createRange();
      grngMaster.execCommand("InsertImage", false, idstr);
      elmImage = globalDoc.all['556e697175657e537472696e67'];
      elmImage.removeAttribute("id");
      elmImage.removeAttribute("src");
      grngMaster.moveStart("character", -1);
      txtFileName.fImageLoaded = false;
    }
    grngMaster = _getTextRange(elmImage);
  }

  if (frmupload.txtFileName.fImageLoaded) {
    elmImage.style.width = frmupload.txtFileName.intImageWidth;
    elmImage.style.height = frmupload.txtFileName.intImageHeight;
  }

  if (frmupload.txtFileName.value.length > 2040) {
    frmupload.txtFileName.value = frmupload.txtFileName.value.substring(0,2040);
    }

  elmImage.src = frmupload.txtFileName.value;
  if (frmupload.txtHorizontal.value != "") { elmImage.hspace = parseInt(frmupload.txtHorizontal.value); }
  else                           { elmImage.hspace = 0; }

  if (frmupload.txtVertical.value != "") { elmImage.vspace = parseInt(frmupload.txtVertical.value); }
  else                         { elmImage.vspace = 0; }

  elmImage.alt = frmupload.txtAltText.value;

  if (frmupload.txtBorder.value != "") { elmImage.border = parseInt(frmupload.txtBorder.value); }
  else                       { elmImage.border = 0; }

  elmImage.align = frmupload.selAlignment.value;
  grngMaster.collapse(false);
  grngMaster.select();
   // window.close();
}
</SCRIPT>
</HEAD>
<BODY id=bdy onLoad="Init()" style="background: threedface; color: windowtext;" scroll=no>
<FORM name="frmupload" ACTION = "#" ENCTYPE="multipart/form-data" METHOD="POST">
<DIV id=divFileName style="left: 0.98em; top: 1.2168em; width: 7em; height: 1.2168em; ">Image URL:</DIV>
<!--<INPUT ID=txtFileName type=text style="left: 8.54em; top: 1.0647em; width: 21.5em;height: 2.1294em; " tabIndex=10 onFocus="select()">-->
<input type="file" id="txtFileName" name="txtFileName" style="left: 8.54em; top: 1.0647em; width: 21.5em;height: 2.1294em; " tabIndex=10 onFocus="select()">
<input type="hidden" name="filename" value="<%
'set rs= server.createobject("ADODB.Recordset")
 'sqls="select max(fileno) as fno from imagesinfo  where tid='"& session("messageid") &"'"
 
 'rs.open sqls,con,2
 'if rs.fields("fno") >=1 then
 'session("fileno")=rs.fields("fno")+1
 'else
 session("fileno")=1
 'end if

 fn = split(o.FileNameOf("txtFileName"), "\")
 'sFileSplit = split(o.FileNameOf("txtFileName"), "\")
'sFile = session("messageid") &"_"& session("fileno") &"_"& fn(Ubound(fn))

 if ubound(fn)>=0 then
 session("filename")=gettid() &"_"& session("fileno") &"_"& fn(Ubound(fn))
 ' & "editor_includes/editor_popups/upload/"
response.write replace(getHost,"index.asp","") & "upload/" &  session("filename")
end if

 %>
 ">

<DIV id=divAltText style="left: 0.98em; top: 4.1067em; width: 6.58em; height: 1.2168em; ">Alternate Text:</DIV>
<INPUT type=text ID=txtAltText name="txtAltText" tabIndex=15 style="left: 8.54em; top: 3.8025em; width: 21.5em; height: 2.1294em; " onFocus="select()">

<FIELDSET id=fldLayout style="left: .9em; top: 7.1em; width: 17.08em; height: 7.6em;">
<LEGEND id=lgdLayout>Layout</LEGEND>
</FIELDSET>

<FIELDSET id=fldSpacing style="left: 18.9em; top: 7.1em; width: 11em; height: 7.6em;">
<LEGEND id=lgdSpacing>Spacing</LEGEND>
</FIELDSET>

<DIV id=divAlign style="left: 1.82em; top: 9.126em; width: 4.76em; height: 1.2168em; ">Alignment:</DIV>
<SELECT size=1 ID=selAlignment name="selAlignment" tabIndex=20 style="left: 10.36em; top: 8.8218em; width: 6.72em; height: 1.2168em; ">
<OPTION id=optNotSet value=""> Not set </OPTION>
<OPTION id=optLeft value=left> Left </OPTION>
<OPTION id=optRight value=right> Right </OPTION>
<OPTION id=optTexttop value=textTop> Texttop </OPTION>
<OPTION id=optAbsMiddle value=absMiddle> Absmiddle </OPTION>
<OPTION id=optBaseline value=baseline SELECTED> Baseline </OPTION>
<OPTION id=optAbsBottom value=absBottom> Absbottom </OPTION>
<OPTION id=optBottom value=bottom> Bottom </OPTION>
<OPTION id=optMiddle value=middle> Middle </OPTION>
<OPTION id=optTop value=top> Top </OPTION>
</SELECT>

<DIV id=divHoriz style="left: 19.88em; top: 9.126em; width: 4.76em; height: 1.2168em; ">Horizontal:</DIV>
<INPUT ID=txtHorizontal name="txtHorizontal" style="left: 24.92em; top: 8.8218em; width: 4.2em; height: 2.1294em; ime-mode: disabled;" type=text size=3 maxlength=3 value="" tabIndex=25 onFocus="select()">

<DIV id=divBorder style="left: 1.82em; top: 12.0159em; width: 8.12em; height: 1.2168em; ">Border Thickness:</DIV>
<INPUT ID=txtBorder name="txtBorder" style="left: 10.36em; top: 11.5596em; width: 6.72em; height: 2.1294em; ime-mode: disabled;" type=text size=3 maxlength=3 value="" tabIndex=21 onFocus="select()">

<DIV id=divVert style="left: 19.88em; top: 12.0159em; width: 3.64em; height: 1.2168em; ">Vertical:</DIV>
<INPUT ID=txtVertical name=txtVertical style="left: 24.92em; top: 11.5596em; width: 4.2em; height: 2.1294em; ime-mode: disabled;" type=text size=3 maxlength=3 value="" tabIndex=30 onFocus="select()">

<BUTTON ID=btnOK name="cmdSubmit" style="left: 333px; top: 1.0647em; width: 7em; height: 2.2em; " type=button tabIndex=40 >OK</BUTTON>
<BUTTON ID=btnCancel style="left: 31.36em; top: 3.6504em; width: 7em; height: 2.2em; " type=reset tabIndex=45 onClick="window.close();">Cancel</BUTTON>
</FORM>
<%

if o.Exists("cmdSubmit") then

%>
<script language="javascript">

function btnOKClick1() {
  var elmImage;
  var intAlignment;
  var htmlSelectionControl = "Control";
  var globalDoc = window.dialogArguments;
  var grngMaster = globalDoc.selection.createRange();

  // error checking

  if (!frmupload.filename.value || frmupload.filename.value == "http://") {
    alert("Image URL must be specified.");
    frmupload.txtFileName.focus();
    return;
  }
  if (frmupload.txtHorizontal.value && !_isValidNumber(frmupload.txtHorizontal.value)) {
    alert("Horizontal spacing must be a number between 0 and 999.");
    txtHorizontal.focus();
    return;
  }
  if (frmupload.txtBorder.value && !_isValidNumber(frmupload.txtBorder.value)) {
    alert("Border thickness must be a number between 0 and 999.");
    frmupload.txtBorder.focus();
    return;
  }
  if (frmupload.txtVertical.value && !_isValidNumber(frmupload.txtVertical.value)) {
    alert("Vertical spacing must be a number between 0 and 999.");
    frmupload.txtVertical.focus();
    return;
  }

  // delete selected content and replace with image
  if (globalDoc.selection.type == htmlSelectionControl && !frmupload.txtFileName.fImageLoaded) {
    grngMaster.execCommand('Delete');
    grngMaster = globalDoc.selection.createRange();
  }

  idstr = "\" id=\"556e697175657e537472696e67";     // new image creation ID
  if (!frmupload.txtFileName.fImageLoaded) {
    grngMaster.execCommand("InsertImage", false, idstr);
    elmImage = globalDoc.all['556e697175657e537472696e67'];
    elmImage.removeAttribute("id");
    elmImage.removeAttribute("src");
    grngMaster.moveStart("character", -1);
  } else {
    elmImage = grngMaster.item(0);
    if (elmImage.src != frmupload.filename.value) {
      grngMaster.execCommand('Delete');
      grngMaster = globalDoc.selection.createRange();
      grngMaster.execCommand("InsertImage", false, idstr);
      elmImage = globalDoc.all['556e697175657e537472696e67'];
      elmImage.removeAttribute("id");
      elmImage.removeAttribute("src");
      grngMaster.moveStart("character", -1);
      frmupload.txtFileName.fImageLoaded = false;
    }
    grngMaster = _getTextRange(elmImage);
  }

  if (frmupload.txtFileName.fImageLoaded) {
    elmImage.style.width = frmupload.txtFileName.intImageWidth;
    elmImage.style.height = frmupload.txtFileName.intImageHeight;
  }

  if (frmupload.txtFileName.value.length > 2040) {
    frmupload.filename.value = frmupload.filename.value.substring(0,2040);
  }

  elmImage.src = frmupload.filename.value;

  if (frmupload.txtHorizontal.value != "") { elmImage.hspace = parseInt(frmupload.txtHorizontal.value); }
  else                           { elmImage.hspace = 0; }

  if (frmupload.txtVertical.value != "") { elmImage.vspace = parseInt(frmupload.txtVertical.value); }
  else                         { elmImage.vspace = 0; }

  elmImage.alt = frmupload.txtAltText.value;

  if (frmupload.txtBorder.value != "") { elmImage.border = parseInt(frmupload.txtBorder.value); }
  else                       { elmImage.border = 0; }

  elmImage.align = frmupload.selAlignment.value;
  grngMaster.collapse(false);
  grngMaster.select();
 window.close();
}
btnOKClick1();
</script>
<% 
 
o.FileInputName = "txtFileName"
o.FileFullPath = Server.MapPath(".") & "\upload\" & session("filename")'sFile
o.save

 if o.Error = "" then
' con.execute "insert into imagesinfo(tid,filename,fileno) values('"& session("messageid") &"','"& sFile &"',"& session("fileno") &" )"
	response.write "Success. File saved to  " & o.FileFullPath & ". Demo Input = " & o.ValueOf("Demo")
 else
	response.write "Failed due to the following error: " & o.Error
 end if

end if
set o = nothing
%>
</BODY>
</HTML>