$(function(){
	var root="http://anewryzm.github.com/hlapp/"
  $(".btn").click(
    function(){
      var clickedSection = $(this).attr("id");
      var url = "land/"+clickedSection + ".html"
      $(location).attr("href", url)
    }
    );

  $("#back").click(
	function(){
		$("#page").fadeOut(function(){
 		$(location).attr("href", root)
			
		});
		}
	)

  $("#show-products li").click(
    function(){
      var clickedProduct = $(this).attr("id");
      var url = "../p/"+clickedProduct+".html";
      // alert(url);
      $(location).attr("href", url);
    }
    )

})

// $(location).attr("href","css/reset.css");