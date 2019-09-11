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
  //移動棋子
  movepiece(selpiece, tarpiece, selrow, selcolumn, tarrow, tarcolumn) {
    var that = this;
    if (map[table.get(selpiece)][table.get(tarpiece)] == 1) {
      $("[piece]").each(function() {
        if ($(this).hasClass("animated")) {
          if (
            $(this).attr("piece") == tarpiece &&
            $(this).attr("row") == tarrow &&
            $(this).attr("column") == tarcolumn
          ) {
            $(this).attr("piece", selpiece);
            that.piecestyle(selpiece, this);
          }
        }
      });
    }
  }
  //移除原位棋子
  removepiece(selpiece, tarpiece, selrow, selcolumn, tarrow, tarcolumn) {
    var that = this;

    $("[piece]").each(function() {
      if (
        $(this).attr("piece") == selpiece &&
        $(this).attr("row") == selrow &&
        $(this).attr("column") == selcolumn
      ) {
        $(this).attr("piece", "empty");
        that.piecestyle("empty", this);
        $(this).css("background", "white");
      }
    });
  }

  // 選擇指定旗子
  Choosepiece() {
    var that = this;

    $("[piece]").each(function() {
      $(this).bind("click", function() {
        if ($(this).hasClass("animated")) {
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
              console.log(target);

              if (
                selection.piece == "redboom" ||
                selection.piece == "blackboom"
              ) {
                hasSelection = false;
                if (target.piece !== "empty") {
                  that.moveboom(
                    selection.piece,
                    target.piece,
                    selection.row,
                    selection.column,
                    target.row,
                    target.column
                  );
                  that.removepiece(
                    selection.piece,
                    target.piece,
                    selection.row,
                    selection.column,
                    target.row,
                    target.column
                  );
                } else {
                  if (
                    (Math.abs(target.column - selection.column) == 1 &&
                      Math.abs(target.row - selection.row) == 0) ||
                    (Math.abs(target.column - selection.column) == 0 &&
                      Math.abs(target.row - selection.row) == 1)
                  )
                    that.movepieceEmpty(
                      selection.piece,
                      target.piece,
                      selection.row,
                      selection.column,
                      target.row,
                      target.column
                    );
                  that.removepiece(
                    selection.piece,
                    target.piece,
                    selection.row,
                    selection.column,
                    target.row,
                    target.column
                  );
                }
              } else {
                if (
                  (Math.abs(target.column - selection.column) == 1 &&
                    Math.abs(target.row - selection.row) == 0) ||
                  (Math.abs(target.column - selection.column) == 0 &&
                    Math.abs(target.row - selection.row) == 1)
                ) {
                  hasSelection = false;
                  if (target.piece !== "empty") {
                    that.movepiece(
                      selection.piece,
                      target.piece,
                      selection.row,
                      selection.column,
                      target.row,
                      target.column
                    );
                    that.removepiece(
                      selection.piece,
                      target.piece,
                      selection.row,
                      selection.column,
                      target.row,
                      target.column
                    );
                  } else {
                    that.movepieceEmpty(
                      selection.piece,
                      target.piece,
                      selection.row,
                      selection.column,
                      target.row,
                      target.column
                    );
                    that.removepiece(
                      selection.piece,
                      target.piece,
                      selection.row,
                      selection.column,
                      target.row,
                      target.column
                    );
                  }
                }
              }
            }
          } else {
            if ($(this).attr("piece") == "empty") {
              $(this).css("background", "white");
              hasSelection = false;
            } else {
              selection.piece = $(this).attr("piece");
              selection.row = $(this).attr("row");
              selection.column = $(this).attr("column");
              $(this).css("background", "green");
              console.log(selection);
              hasSelection = true;
            }
          }
        }
      });
    });
  }
  //渲染attr
  piecestyle(selpiece, these) {
    if (selpiece == "blackking") {
      $(these).html(piecestyle.blackking);
    } else if (selpiece == "redking") {
      $(these).html(piecestyle.redking);
    } else if (selpiece == "blackboom") {
      $(these).html(piecestyle.blackboom);
    } else if (selpiece == "blackelephant") {
      $(these).html(piecestyle.blackelephant);
    } else if (selpiece == "blackhorse") {
      $(these).html(piecestyle.blackhorse);
    } else if (selpiece == "blackpawn") {
      $(these).html(piecestyle.blackpawn);
    } else if (selpiece == "blackrook") {
      $(these).html(piecestyle.blackrook);
    } else if (selpiece == "blacksu") {
      $(these).html(piecestyle.blacksu);
    } else if (selpiece == "redboom") {
      $(these).html(piecestyle.redboom);
    } else if (selpiece == "redelephant") {
      $(these).html(piecestyle.redelephant);
    } else if (selpiece == "redhorse") {
      $(these).html(piecestyle.redhorse);
    } else if (selpiece == "redpawn") {
      $(these).html(piecestyle.redpawn);
    } else if (selpiece == "redsu") {
      $(these).html(piecestyle.redsu);
    } else if (selpiece == "redrook") {
      $(these).html(piecestyle.redrook);
    } else if (selpiece == "empty") {
      $(these).html(" ");
    }
  }

  //移動至空格子
  movepieceEmpty(selpiece, tarpiece, selrow, selcolumn, tarrow, tarcolumn) {
    var that = this;

    $("[piece]").each(function() {
      if ($(this).hasClass("animated")) {
        if (
          $(this).attr("piece") == tarpiece &&
          $(this).attr("row") == tarrow &&
          $(this).attr("column") == tarcolumn
        ) {
          $(this).attr("piece", selpiece);
          that.piecestyle(selpiece, this);
        }
      }
    });
  }
  //炮跳
  moveboom(selpiece, tarpiece, selrow, selcolumn, tarrow, tarcolumn) {
    var that = this;
    if (map[table.get(selpiece)][table.get(tarpiece)] == 1) {
      $("[piece]").each(function() {
        if ($(this).hasClass("animated")) {
          if (
            $(this).attr("piece") == tarpiece &&
            $(this).attr("row") == tarrow &&
            $(this).attr("column") == tarcolumn
          ) {
            $(this).attr("piece", selpiece);
            that.piecestyle(selpiece, this);
          }
        }
      });
    }
  }
}
var game = new playgame();
game.Choosepiece();
