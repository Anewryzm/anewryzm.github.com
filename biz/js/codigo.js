$(document).ready(function(){
	$("img, #player").hide();
	$("img").load(function(){
		$(this).fadeIn("slow")
	});
	$("#player").delay(800).fadeIn("slow");
});