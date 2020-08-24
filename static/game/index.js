var piecestyle = new piecesstyle();

var selectthiserror;
//儲存選定的旗子
var selection = { piece: "", row: "", column: "" };
var target = { piece: "", row: "", column: "" };
var hasSelection = false;

var table = new Map();

table
  .set("redpawn", 1)
  .set("redhorse", 2)
  .set("redrook", 3)
  .set("redelephant", 4)
  .set("redsu", 5)
  .set("redking", 6)
  .set("redboom", 7);

table
  .set("blackpawn", -1)
  .set("blackhorse", -2)
  .set("blackrook", -3)
  .set("blackelephant", -4)
  .set("blacksu", -5)
  .set("blackking", -6)
  .set("blackboom", -7);

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
  movepiece(selpiece, tarpiece, selrow, selcolumn, tarrow, tarcolumn) 
  {
    var that = this;
    if (map[Math.abs(table.get(selpiece)) - 1][Math.abs(table.get(tarpiece)) - 1] == 1) 
    {
      $("[piece]").each(function() {
        if ($(this).hasClass("animated")) 
        {
          //此處this 為 target
          if ($(this).attr("piece") == tarpiece && $(this).attr("row") == tarrow && $(this).attr("column") == tarcolumn) 
          {
            $(this).attr("piece", selpiece);
            that.piecestyle(selpiece, this);
          }
        }
      });
    }
  }

  //移除原位棋子
  removepiece(selpiece, tarpiece, selrow, selcolumn, tarrow, tarcolumn)
  {
    var that = this;

    $("[piece]").each(function() {
      //此處this 為 selection
      if ($(this).attr("piece") == selpiece && $(this).attr("row") == selrow && $(this).attr("column") == selcolumn) 
      {
        $(this).attr("piece", "empty");
        that.piecestyle("empty", this);
        $(this).css("background", "white");
      }
    });
  }

  // 選擇指定旗子
  Choosepiece() 
  {
    var that = this;

    $("[piece]").each(function() {
      $(this).bind("click", function() {
        if ($(this).hasClass("animated")) 
        {
          if (hasSelection) 
          {
            if (selection.row == $(this).attr("row") && selection.column == $(this).attr("column")) 
            {
              selection = { piece: "", row: "", column: "" };
              $(this).css("background", "white");
              hasSelection = false;
            } 
            else 
            {
              target.piece = $(this).attr("piece");
              target.row = $(this).attr("row");
              target.column = $(this).attr("column");
              // console.log(target);

              if (selection.piece == "redboom" || selection.piece == "blackboom") 
              {
                $(this).css("background", "white");
                hasSelection = false;
                if (target.piece !== "empty") 
                {
                  if (table.get(selection.piece) * table.get(target.piece) < 0) 
                  {
                    that.moveboom(
                      selection.piece,
                      target.piece,
                      selection.row,
                      selection.column,
                      target.row,
                      target.column
                    );
                  } 
                  else if (table.get(selection.piece) * table.get(target.piece) > 0) 
                  {
                    $(selectthiserror).css("background", "red");
                    hasSelection = false;
                  }
                } 
                else 
                {
                  if ((Math.abs(target.column - selection.column) == 1 && Math.abs(target.row - selection.row) == 0) || (Math.abs(target.column - selection.column) == 0 && Math.abs(target.row - selection.row) == 1)) 
                  {
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
                  else
                  {
                    $(`#blank${selection.row}${selection.column}`).css(
                      "background",
                      "white"
                    );

                    hasSelection = false;
                  }
                }
              } 
              else 
              {
                if ((Math.abs(target.column - selection.column) == 1 && Math.abs(target.row - selection.row) == 0) || (Math.abs(target.column - selection.column) == 0 && Math.abs(target.row - selection.row) == 1)) 
                {
                  $(this).css("background", "white");
                  hasSelection = false;

                  if (target.piece !== "empty") 
                  {
                    if (table.get(selection.piece) * table.get(target.piece) < 0) 
                    {
                      if ((selection.piece == "blackking" || selection.piece == "redking") && (target.piece == "blackpawn" || target.piece == "redpawn")) 
                      {
                        $(selectthiserror).css("background", "red");
                        hasSelection = false;
                      } 
                      else 
                      {
                        if (Math.abs(table.get(selection.piece)) >= Math.abs(table.get(target.piece)) || target.piece == "redboom" || target.piece == "blackboom" || ((selection.piece == "redpawn" || selection.piece == "blackpawn") && (target.piece == "blackking" || target.piece == "redking"))) 
                        {
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
                        } 
                        else 
                        {
                          selection = { piece: "", row: "", column: "" };
                          $(selectthiserror).css("background", "red");
                          hasSelection = false;
                        }
                      }
                    } 
                    else if (table.get(selection.piece) * table.get(target.piece) > 0) 
                    {
                      selection = { piece: "", row: "", column: "" };
                      $(selectthiserror).css("background", "red");
                      hasSelection = false;
                    }
                  } 
                  else 
                  {
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
          } 
          else 
          {
            if ($(this).attr("piece") == "empty") 
            {
              $(this).css("background", "white");
              hasSelection = false;
            } 
            else 
            {
              selection.piece = $(this).attr("piece");
              selection.row = $(this).attr("row");
              selection.column = $(this).attr("column");
              selectthiserror = this;

              $(this).css("background", "green");
              // console.log(selection);
              hasSelection = true;
            }
          }
        }
      });
    });
  }
  //渲染attr
  piecestyle(selpiece, these) 
  {
    if (selpiece == "blackking") 
    {
      $(these).html(piecestyle.blackking);
    } 
    else if (selpiece == "redking") 
    {
      $(these).html(piecestyle.redking);
    }
    else if (selpiece == "blackboom") 
    {
      $(these).html(piecestyle.blackboom);
    }
    else if (selpiece == "blackelephant") 
    {
      $(these).html(piecestyle.blackelephant);
    } 
    else if (selpiece == "blackhorse") 
    {
      $(these).html(piecestyle.blackhorse);
    } 
    else if (selpiece == "blackpawn") 
    {
      $(these).html(piecestyle.blackpawn);
    } 
    else if (selpiece == "blackrook") 
    {
      $(these).html(piecestyle.blackrook);
    } 
    else if (selpiece == "blacksu") 
    {
      $(these).html(piecestyle.blacksu);
    } 
    else if (selpiece == "redboom") 
    {
      $(these).html(piecestyle.redboom);
    } 
    else if (selpiece == "redelephant") 
    {
      $(these).html(piecestyle.redelephant);
    } 
    else if (selpiece == "redhorse") 
    {
      $(these).html(piecestyle.redhorse);
    } 
    else if (selpiece == "redpawn") 
    {
      $(these).html(piecestyle.redpawn);
    } 
    else if (selpiece == "redsu") 
    {
      $(these).html(piecestyle.redsu);
    } 
    else if (selpiece == "redrook") 
    {
      $(these).html(piecestyle.redrook);
    } 
    else if (selpiece == "empty") 
    {
      $(these).html(" ");
    }
  }

  //移動至空格子
  movepieceEmpty(selpiece, tarpiece, selrow, selcolumn, tarrow, tarcolumn) 
  {
    var that = this;

    $("[piece]").each(function() {
      if ($(this).hasClass("animated")) 
      {
        if ($(this).attr("piece") == tarpiece && $(this).attr("row") == tarrow && $(this).attr("column") == tarcolumn) 
        {
          $(this).attr("piece", selpiece);
          that.piecestyle(selpiece, this);
        }
      }
    });
  }
  //炮跳
  moveboom(selpiece, tarpiece, selrow, selcolumn, tarrow, tarcolumn) 
  {
    var that = this;

    if (Math.abs(selrow - tarrow) == 0 || Math.abs(selcolumn - tarcolumn) == 0) 
    {
      var sel = document.getElementById(`blank${selrow}${selcolumn}`);
      var tar = document.getElementById(`blank${tarrow}${tarcolumn}`);
      var selerow = parseInt(sel.getAttribute("row"));
      var selecol = parseInt(sel.getAttribute("column"));
      var targrow = parseInt(tar.getAttribute("row"));
      var targcol = parseInt(tar.getAttribute("column"));
      var count = 0;

      if (Math.abs(selerow - targrow) == 0) 
      {
        if (selecol < targcol) 
        {
          for (let i = selecol + 1; i < targcol; i++) 
          {
            var divid = document.getElementById(`blank${selerow}${i}`);

            if (divid.getAttribute("piece") !== "empty") 
            {
              count++;
            }
          }
        } 
        else 
        {
          for (let i = targcol + 1; i < selecol; i++) 
          {
            var divid = document.getElementById(`blank${selerow}${i}`);

            if (divid.getAttribute("piece") !== "empty") 
            {
              count++;
            }
          }
        }
        //對的
      } 
      else if (Math.abs(selecol - targcol) == 0) 
      {
        if (selerow < targrow) 
        {
          for (let i = selerow + 1; i < targrow; i++) 
          {
            var divid = document.getElementById(`blank${i}${selecol}`);

            if (divid.getAttribute("piece") !== "empty") 
            {
              count++;
            }
          }
        } 
        else 
        {
          for (let i = targrow + 1; i < selerow; i++) 
          {
            var divid = document.getElementById(`blank${i}${selecol}`);

            if (divid.getAttribute("piece") !== "empty") 
            {
              count++;
            }
          }
        }
      }
    }

    if (count == 1) 
    {
      $("[piece]").each(function() {
        if ($(this).hasClass("animated")) 
        {
          if ($(this).attr("piece") == tarpiece && $(this).attr("row") == tarrow && $(this).attr("column") == tarcolumn) 
          {
            $(this).attr("piece", selpiece);
            that.piecestyle(selpiece, this);

            that.removepiece(
              selection.piece,
              target.piece,
              selection.row,
              selection.column,
              target.row,
              target.column
            );

            count = 0;
          }
        }
      });
    } 
    else 
    {
      sel.style.background = "white";
      count = 0;
    }
  }
}
var game = new playgame();

game.Choosepiece();

//flip

$(".gamecell").each(function() {
  $(this).bind("click", function() {
    $(this).addClass("flipInX animated");

    $(this)
      .children(".cover")
      .css("opacity", "0");
  });
});
