$(document).ready(function(){
	$("img").load(function(){
		$(this).fadeIn("slow")
	})
	$(".blank img, #player").hide();
	$("#player").delay(800).fadeIn("slow");
});