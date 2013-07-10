$(function(){
  $(".btn").click(
    function(){
      var clickedSection = $(this).attr("id");
      var url = "land/"+clickedSection + ".html"
      $(location).attr("href", url)
    }
    );

})

// $(location).attr("href","css/reset.css");