(function(){
	if(!io)return console.error("Socket IO not found");
	window.socket = io();
	socket.on("disconnect",function(error){
		if(error==="io server disconnect"){
			location.reload();
		}
	});
})();