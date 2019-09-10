$(".gamecell").each(function() {
  $(this).bind("click", function() {
    $(this).addClass("flipInX animated");
    console.log(
      $(this)
        .children(".cover")
        .css("opacity", "0")
    );
  });
});
