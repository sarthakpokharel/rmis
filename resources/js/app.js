function validate() {
	var name = document.getElementById("name").value;
	console.log()
	if (name == '') {
		alert('Please enter a valid name.');
		return false;
	} else {
		return true;
	}
}