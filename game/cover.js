$(".gamecell").each(function() {
  $(this).bind("click", function() {
    $(this).addClass("flipInX animated");

    $(this)
      .children(".cover")
      .css("opacity", "0");
  });
});
