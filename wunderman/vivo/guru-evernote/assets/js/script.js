function catchEvent(eventObj, event, eventHandler){
	if(eventObj.addEventListener){
		eventObj.addEventListener(event, eventHandler, false);
	}
	else if(eventObj.attachEvent){
		event = "on" + event;
		eventObj.attachEvent(event, eventHandler);
	}
}
catchEvent(window, 'load', setupEvent);
function setupEvent(evnt){
	catchEvent(document.getElementById("enviar"), 'submit', validate);
}
function validate(evnt){
	var theEvent = evnt ? evnt : window.event;
	var target = theEvent.target ? theEvent.target : theEvent.srcElement;
	var name = document.getElementById("name").value;
	var cpf = document.getElementById("cpf").value;
	var email = document.getElementById("email").value;
	var nameRegExp = new RegExp(/^[a-zA-Z]{3}/g);
	var cpfRegExp = new RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/);
	var emailRegExp = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,4}/gi);
	var nameValidate = nameRegExp.test(name);
	var cpfValidate = cpfRegExp.test(cpf);
	var emailValidate = emailRegExp.test(email);
}