var pLastPositionX = 0;
var pLastPositionY = 0;
var pMoveLocked = false;
var pMarkerStart = {};
var pObjectStart = {};
var pMarker;
var pEntryView;

var tcp;

var pMarkerOffset = {};


function addMarker(win){

	
	tcp = Titanium.Network.createTCPSocket({
		hostName:"localhost",
		port:9001
	}); 
	
	tcp.connect();
	
	pMarker = Ti.UI.createView({
		width:100,
		height:100,
		backgroundColor:'black',
		top:100,
		zIndex:100
	});
	
	pMarker.addEventListener('touchstart',function(e){
		pMarkerStart.x = e.x;
		pMarkerStart.y = e.y;
	});
	
	pMarker.addEventListener('touchmove',function(e){
		if (!pMoveLocked){
			pMarker.top = ((e.globalPoint.y - (440 - win.height)) - pMarkerStart.y);
			pMarker.left = (e.globalPoint.x - pMarkerStart.x);
		}
	});
	
	pMarker.addEventListener('doubletap',function(){
		saveObject(win);
	});
	
	var handle = Ti.UI.createView({
		backgroundColor:'orange',
		width:10,
		height:10,
		top:pMarker.height-10,
		left:pMarker.width-10
	});
	
	handle.addEventListener('touchstart',function(e){
		handle.backgroundColor = 'black';
		pMoveLocked = true;
		pLastPositionX = e.globalPoint.x;
		pLastPositionY = e.globalPoint.y;
	});
	
	handle.addEventListener('touchmove',function(e){
		var lastX = pLastPositionX;
		var newX = e.globalPoint.x;
		var lastY = pLastPositionY;
		var newY = e.globalPoint.y;
		pMarker.width += (newX - lastX);
		pMarker.height += (newY - lastY);
		pLastPositionX = newX;
		pLastPositionY = newY;
		handle.top = pMarker.height-10;
		handle.left = pMarker.width-10;
		
	});
	
	handle.addEventListener('touchend',function(e){
		handle.backgroundColor = 'orange';
		pMoveLocked = false;
	});
	
	
	pMarker.add(handle);
	
	
	
	win.add(pMarker);
}

function saveObject(win){
	
	var pEntryView = Ti.UI.createView({
		backgroundColor:'white',
		borderColor:'black',
		borderRadius:5,
		borderWidth:3,
		top:30,
		width:300,
		height:150,
		zIndex:101
	});
	
	var entryName = Ti.UI.createTextField({
		paddingLeft:10,
		hintText:'Object Name',
		autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		font:{fontSize:12,fontWeight:'bold'},
		height:30,
		width:250,
		top:15,
		borderColor:'black',
		borderWidth:1,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT
	});
	
	var entryType = Ti.UI.createTextField({
		paddingLeft:10,
		hintText:'Object Type',
		font:{fontSize:12,fontWeight:'bold'},
		height:30,
		width:250,
		top:50,
		borderColor:'black',
		borderWidth:1,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT
	});
	
	var generateBtn = Ti.UI.createButton({
		top:100,
		width:250,
		height:30,
		title:'Generate Code'
	});
	
	generateBtn.addEventListener('click',function(){
		printCode(entryName.value,entryType.value);
		win.remove(pEntryView);
	});
	
	
	pEntryView.add(entryName);
	pEntryView.add(entryType);
	pEntryView.add(generateBtn);
	
	win.add(pEntryView);
	
	
}

function printCode(name, type){
	
	var left = pMarker.left;
	var top = pMarker.top;
	
	if (pMarkerOffset.x){
		left += pMarkerOffset.x;
	}
	if (pMarkerOffset.y){
		top += pMarkerOffset.y;
	}
	
	var code = "var " + name + " = Ti.UI.create" + type +"({\n";
	code += "\ttop:" + top + ",\n"; 
	code += "\tleft:" + left + ",\n";
	code += "\twidth:" + pMarker.width + ",\n";
	code += "\theight:" + pMarker.height + ",\n";
	
	if (type == "TextField" || type == "Label"){
		code += "\tbackgroundColor:'white',\n";
		code += "\tfont:{fontSize:12,fontWeight:'bold'},\n";
		code += "\thintText:'',\n";
		code += "\tkeyboardType:Titanium.UI.KEYBOARD_DEFAULT,\n";
	}
	
	code += "});\n\n";
	code += "win.add("+name+");\n";
	
	tcp.write(code);
	Ti.API.info(code);
}



function placementHelper(object){
	object.addEventListener('touchstart',function(e){
		pObjectStart.x = e.x;
		pObjectStart.y = e.y;
	});
	
	object.addEventListener('touchmove',function(e){
		object.top = (e.globalPoint.y - pObjectStart.y);
		object.left = (e.globalPoint.x - pObjectStart.x);
	});
	
	object.addEventListener('doubletap',function(){
		Ti.API.info("Left: " + object.left + " Top: " + object.top);
	});
}
