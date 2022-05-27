
function proceedPayment(jqid,ppid) {
	const infoUrl = baseUrl+"/journalvoucher/jv-nchl-payment/get-info";
	const bankorgid = $("#bid").val().split(":")[2];
	const fyid = $("#fyid").val();
	const presistinfo = 'jqid='+jqid+"&bankorgid="+bankorgid+"&fyid="+fyid;
	const treasury = $("#treasury").val();
	const xh = $.get(infoUrl+"?treasury="+treasury+"&"+presistinfo);
	xh.done( data =>{
		if(data.hasOwnProperty('status')){
			if(data.status==0){
				$.messager.alert("Info", data.message, "error");
				return;
			}
		}else{
			$.messager.confirm("Confirm payment?",getContent(data), function(c) {
			if (c) {
				showProgress();
				var xhr = $.ajax({
					method : "GET",
					url : baseUrl + "/journalvoucher/jv-nchl-payment/insert-info?treasury="+treasury+"&"+presistinfo,
				});

				xhr.done(function(resp) {
					// var resp = JSON.parse(resp);
					// if (resp.status == 0) {
					//	promptLogin(resp);
					//} else 
					if (resp.status == 1) {
						$.messager.alert("Info", resp.message, "info");
						//LoadChequeList();
						dbid(ppid).innerHTML='Payment Forwarded';
					} else {
						$.messager.alert("Info", resp.message, "error");
					}
				});
				xhr.fail(function(err) {
					console.log(err);
				});
				xhr.always(function(err) {
					hideProgress();
				});
			}
		});
		}
		
	});
	xh.fail(err=>{
		console.log("failed "+err);
	});
	xh.always(function(){
		hideProgress();
	});
}

function proceedPaymentTrans(tranid,trandiv) {
	const infoUrl = baseUrl+"/journalvoucher/jv-nchl-payment/get-trans-info";
	//const bankorgid = ($("#bid").val()).split(":")[2];
	//const fyid = $("#fyid").val();
	const presistinfo = 'tranid='+tranid;
	const xh = $.get(infoUrl+"?"+presistinfo);
	xh.done( data =>{
		if(data.transtatus==1){
			$.messager.confirm("Confirm payment?",getContentWithCode(data), function(c) {
				if (c) {
					if($("#pincode").val()==''){
						alert("Pincode Missing.");
						return;
					}else{
						showProgress();
						var xhr = $.ajax({
							method : "POST",
							url : baseUrl + "/journalvoucher/jv-nchl-payment/pay",
							data:{tranid:tranid, pincode:$("#pincode").val()}
						});

						xhr.done(function(resp) {
							//var resp = JSON.parse(resp);
							if (resp.status == 0) {
								$.messager.alert("Eror", resp.message, "error");
							} else if (resp.status == "1") {
								$.messager.alert("Info", resp.message, "info");
								dbid(trandiv).innerHTML='Payment Approved'
								//loadContent("journalvoucher/epayment?treasury=1");
							} else {
								$.messager.alert("Error", resp.message, "error");
							}
						});
						xhr.fail(function(err) {
							console.log(err);
						});
						xhr.always(function(err) {
							hideProgress();
						});
					}
				}
			});
		}else{
			$.messager.confirm("Confirm payment?",getContent(data), function(c) {
				if (c) {
					showProgress();
					var xhr = $.ajax({
						method : "POST",
						url : baseUrl + "/journalvoucher/jv-nchl-payment/pay",
						data:{tranid:tranid, pincode:$("#pincode").val()}
					});

					xhr.done(function(resp) {
						//var resp = JSON.parse(resp);
						if (resp.status == 0) {
							$.messager.alert("Eror", resp.message, "error");
						} else if (resp.status == "1") {
							$.messager.alert("Info", resp.message, "info");
							dbid(trandiv).innerHTML='Payment Approved'
							//loadContent("journalvoucher/epayment?treasury=1");
						} else {
							$.messager.alert("Error", resp.message, "error");
						}
					});
					xhr.fail(function(err) {
						console.log(err);
					});
					xhr.always(function(err) {
						hideProgress();
					});
				}
			});
		}
	});
	xh.fail(err=>{
		console.log("failed "+err);
	});
	xh.always(function(){
		hideProgress();
	});
}
function getContentWithCode(data,presistinfo){
	var html = "<table border=1>" +
			'<tr><th colspan="3">You are about to pay</th></tr>'+
			'<tr>'+'<th>Particular</th><th>From</th><th>To</th>'+'</tr>'+
			'<tr><td style="font-weight: 700;">Bank</td> <td>'+data.dbank+'('+data.dbranch+')</td><td>'+data.cbank+'('+data.cbranch+')</td></tr>'+
			'<tr><td style="font-weight: 700;">Account Name</td> <td>'+data.debtorName+'</td><td>'+data.creditorName+'</td></tr>'+
			'<tr><td style="font-weight: 700;">Account Number</td> <td>'+data.debtorAccount+'</td><td>'+data.creditorAccount+'</td></tr>'+
			'<tr><td style="font-weight: 700;">Amount</td><td colspan="2"> Rs.'+data.amount+'</td></tr>'+
			'<tr><td style="font-weight: 700;">Pin Code</td><td colspan="2"><input type="password" id="pincode"></td></tr>'+
			"</table>";
	return html;
}
function getContent(data,presistinfo){
	var html = "<table border=1>" +
			'<tr><th colspan="3">You are about to pay</th></tr>'+
			'<tr>'+'<th>Particular</th><th>From</th><th>To</th>'+'</tr>'+
			'<tr><td style="font-weight: 700;">Bank</td> <td>'+data.dbank+'('+data.dbranch+')</td><td>'+data.cbank+'('+data.cbranch+')</td></tr>'+
			'<tr><td style="font-weight: 700;">Account Name</td> <td>'+data.debtorName+'</td><td>'+data.creditorName+'</td></tr>'+
			'<tr><td style="font-weight: 700;">Account Number</td> <td>'+data.debtorAccount+'</td><td>'+data.creditorAccount+'</td></tr>'+
			'<tr><td style="font-weight: 700;">Amount</td><td colspan="2"> Rs.'+data.amount+'</td></tr>'+
			"</table>";
	return html;
}

function showProgress() {
	$.messager.progress({
		title : 'Please wait..',
		text : 'Loading.....'
	});
}
function hideProgress() {
	$.messager.progress("close");
}

function submitCipsForm() {
	$("#cips-login #serverInfo").empty();
	$("#cips-login #serverInfo").hide();
	var username = $("#cips-login #username").val();
	var password = $("#cips-login #password").val();
	if (username == '' && password == '') {
		$("#cips-login #serverInfo").html("Provide Username & Password");
		$("#cips-login #serverInfo").show();
		return false;
	}
	var data = {
		username : username,
		password : password
	};
	showProgress();
	var xhr = $.ajax({
		method : "POST",
		url : baseUrl + "/journalvoucher/jv-nchl-payment/getrefreshtoken",
		data : data
	});

	xhr.done(function(resp) {
		var resp = JSON.parse(resp);
		if (resp.status == 0) {
			$("#cips-login #serverInfo").html(resp.message);
			$("#cips-login #serverInfo").show();
		} else if (resp.status == 1) {
			$('#login').window('close');
			$.messager.alert("Info", resp.message, "info");
		}
	});
	xhr.fail(function(err) {
		console.log(err);
	});

	xhr.always(function(err) {
		hideProgress();
	});

}

function promptLogin(data) {
	if (data != undefined && data != '') {
		var html = '';
		html += '<div id="cips-login" style="texxt-align:center">'
				+ '<p id="serverInfo">Please Login Using ConnectIPS Username & Password</p>'
				+ '<form id="epform" method="post" style = "padding: 10px 20px 10px 40px;">'
				+ '<div style="margin-bottom:20px">';
		if (data.hasOwnProperty("username") && data.username != '') {
			html += '<p>Username: <input id="username" class="easyui-textbox" name="username" data-options="label:\'Username\',required:true,readonly:true" value="'
					+ data.username + '" readonly="readonly"></p>';
		} else {
			html += '<p>Username: <input id="username" class="easyui-textbox" name="username" data-options="label:\'Username\',required:true"></p>';
		}
		html += '</div>'
				+ '<div style="margin-bottom:20px">'
				+ '<p>Password: <input id="password" type="password" class="easyui-textbox" name="password" data-options="label:\'Password\',required:true"></p>'
				+ '</div>'

				+ '<div style="text-align:center;padding:5px 0">'
				+ '<button type="button" href="javascript:void(0)" class="easyui-linkbutton" onclick="submitCipsForm()">Submit</button>'
				+ '<button type="reset" href="javascript:void(0)" class="easyui-linkbutton" onclick="">Clear</button>'
				+ '</div>';
		+'</form>'
		html += '</div>';
		$('#login').empty();
		$('#login').html(html);
		$('#login').window('open');
	}
}

function collectData() {
	// /var data = {};
	var data = {
		"dbank":"Bank",
		"dbranch":"Branch",
		"debtorAgent" : "4501",
		"debtorBranch" : "1",
		"debtorName" : "Sanjiv Acharya",
		"debtorAccount" : "001011060009369",

		// creditor details
		"amount" : "80",
		"cbank":"bank",
		"cbranch":"branch",
		"creditorAgent" : "1701",
		"creditorBranch" : "14",
		"creditorName" : "binayak bam malla",
		"creditorAccount" : "01424093166"
	};
	return data;
	/*
	 * var defalt = [ "debtorAgent", "debtorBranch", "debtorName",
	 * "debtorAccount",
	 * 
	 * //creditor details "amount", "creditorAgent", "creditorBranch",
	 * "creditorName", "creditorAccount" ]; for(var i in defalt){ var value =
	 * document.getElementById(defalt[i]).value; data[defalt[i]] = value; }
	 * return data;
	 */
}

function testPaymentWithSampleData(){
	var data = collectData();
	var xhr = $.ajax({
		method : "POST",
		url : baseUrl + "/connectips/pay",
		data: data
	});

	xhr.done(function(resp) {
		console.log(resp);
	});
	xhr.fail(function(err) {
		console.log(err);
	});
	xhr.always(function(err) {
		console.log("always..");
	});
	
}