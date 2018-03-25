var flagAnim1 = true;
var flagAnim2 = true;
var flagAnim3 = true;

function playPlane (objCanvas, objAirplane, coord, widthObjCanvas, heightObjCanvas, duration, dynamic){
	var ctx = objCanvas.getContext("2d");
	var objAnim = {x:0, y:0};
	
	if (dynamic){
		coord[3].x = widthObjCanvas -2;
	}
		
	ctx.strokeStyle = "#161616";
	ctx.lineWidth = 1;
	ctx.moveTo(coord[0].x, coord[0].y);

	function draw(){
		ctx.clearRect(0, 0, widthObjCanvas, heightObjCanvas);
		ctx.lineTo(objAnim.x + 13, objAnim.y + 13);
		ctx.stroke();
	}

	TweenMax.to([objAirplane, objAnim], duration, {bezier:{type:"cubic", values:coord, autoRotate:["x","y","rotation", 0, false]}, ease:Power1.easeInOut, onUpdate: draw});
}

function createPlane(positionScroll, flag, obj, coord, widthObjCanvas, heightObjCanvas, duration, dynamic){

	var objCanvas = $("<canvas/>");
	var objAirplane = $("<div/>").addClass("airplane");

	obj.append(objCanvas);
	obj.append(objAirplane);

	if (dynamic)
		widthObjCanvas = $(window).width() / 2 + 300;
	
	objCanvas.attr({
		width: widthObjCanvas,
		height:heightObjCanvas,
	});	


	$(window).scroll(function(){
		var posTop = $(window).scrollTop();

		if(posTop > positionScroll && flag){
			flag = !flag;
			objAirplane.show();
			playPlane(objCanvas[0], objAirplane[0], coord, widthObjCanvas, heightObjCanvas, duration, dynamic);
		}
	});	
}