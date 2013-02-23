$(document).ready(function(){
	$("img").load(function(){
		$(this).fadeIn("slow")
	})
	$(".blank img, #player").hide();
	// $(".blank img").delay(500).fadeIn("slow");
	$("#player").delay(800).fadeIn("slow");
});