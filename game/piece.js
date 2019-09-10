import piecesstyle from "./piecestyle.js";

var piecestyle = new piecesstyle();

function piecestylecover() {
  $(".gamecell").each(function() {
    if ($(this).attr("piece") == "blackking") {
      $(this).html(`<div class='cover'></div>${piecestyle.blackking}
     
      `);
    } else if ($(this).attr("piece") == "redking") {
      $(this).html(`<div class='cover'></div>${piecestyle.redking}
      `);
    } else if ($(this).attr("piece") == "blackboom") {
      $(this).html(`<div class='cover'></div>${piecestyle.blackboom}
      `);
    } else if ($(this).attr("piece") == "blackelephant") {
      $(this).html(`<div class='cover'></div>${piecestyle.blackelephant}
          
        `);
    } else if ($(this).attr("piece") == "blackhorse") {
      $(this).html(`<div class='cover'></div>${piecestyle.blackhorse}
        
          `);
    } else if ($(this).attr("piece") == "blackpawn") {
      $(this).html(`<div class='cover'></div>${piecestyle.blackpawn}
          
          
            `);
    } else if ($(this).attr("piece") == "blackrook") {
      $(this).html(`<div class='cover'></div>${piecestyle.blackrook}
              `);
    } else if ($(this).attr("piece") == "blacksu") {
      $(this).html(`<div class='cover'></div>${piecestyle.blacksu}
          
                `);
    } else if ($(this).attr("piece") == "redboom") {
      $(this).html(`<div class='cover'></div>${piecestyle.redboom}
                  `);
    } else if ($(this).attr("piece") == "redelephant") {
      $(this).html(`<div class='cover'></div>${piecestyle.redelephant}
          
                    `);
    } else if ($(this).attr("piece") == "redhorse") {
      $(this).html(`<div class='cover'></div>${piecestyle.redhorse}
            
                      `);
    } else if ($(this).attr("piece") == "redpawn") {
      $(this).html(`<div class='cover'></div>${piecestyle.redpawn}
        
              
                        `);
    } else if ($(this).attr("piece") == "redsu") {
      $(this).html(`<div class='cover'></div>${piecestyle.redsu}
                          `);
    } else if ($(this).attr("piece") == "redrook") {
      $(this).html(`<div class='cover'></div>${piecestyle.redrook}
                    
                            `);
    } else {
      $(this).html();
    }
  });
}

$(document).ready(piecestylecover());
