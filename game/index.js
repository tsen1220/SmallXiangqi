import piecesstyle from "./piecestyle.js";

var piecestyle = new piecesstyle();

//儲存選定的旗子
var selection = { piece: "", row: "", column: "" };
var target = { piece: "", row: "", column: "" };
var hasSelection = false;

var table = new Map();

table
  .set("redpawn", 0)
  .set("redhorse", 1)
  .set("redrook", 2)
  .set("redelephant", 3)
  .set("redsu", 4)
  .set("redking", 5)
  .set("redboom", 6);

table
  .set("blackpawn", 0)
  .set("blackhorse", 1)
  .set("blackrook", 2)
  .set("blackelephant", 3)
  .set("blacksu", 4)
  .set("blackking", 5)
  .set("blackboom", 6);

//兵 馬 車 象 仕 帥 炮    1:吃 0:不吃
var map = [
  /*兵*/ [1, 0, 0, 0, 0, 1, 1],
  /*馬*/ [1, 1, 0, 0, 0, 0, 1],
  /*車*/ [1, 1, 1, 0, 0, 0, 1],
  /*象*/ [1, 1, 1, 1, 0, 0, 1],
  /*仕*/ [1, 1, 1, 1, 1, 0, 1],
  /*帥*/ [0, 1, 1, 1, 1, 1, 1],
  /*炮*/ [1, 1, 1, 1, 1, 1, 1]
];

class playgame {
  movepiece(selpiece, tarpiece, selrow, selcolumn, tarrow, tarcolumn) {
    if (map[table.get(selpiece)][table.get(tarpiece)] == 1) {
      $("[piece]").each(function() {
        if (
          $(this).attr("piece") == tarpiece &&
          $(this).attr("row") == tarrow &&
          $(this).attr("column") == tarcolumn
        ) {
          $(this).attr("piece", selpiece);
        }
      });
    }
  }

  Choosepiece() {
    // 選擇指定旗子
    var that = this;
    $("[piece]").each(function() {
      $(this).bind("click", function() {
        if (hasSelection) {
          if (
            selection.row == $(this).attr("row") &&
            selection.column == $(this).attr("column")
          ) {
            selection = { piece: "", row: "", column: "" };
            hasSelection = false;
          } else {
            target.piece = $(this).attr("piece");
            target.row = $(this).attr("row");
            target.column = $(this).attr("column");

            hasSelection = false;
            that.movepiece(
              selection.piece,
              target.piece,
              selection.row,
              selection.column,
              target.row,
              target.column
            );
          }
        } else {
          selection.piece = $(this).attr("piece");
          selection.row = $(this).attr("row");
          selection.column = $(this).attr("column");

          hasSelection = true;
        }
      });
    });
  }
}
var game = new playgame();
game.Choosepiece();
