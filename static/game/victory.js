function victory() {
  var countred = 0;
  var countblack = 0;
  var arr = [];
  $("[piece]").each(function() {
    arr.push($(this).attr("piece"));
  });

  for (let i = 0; i < arr.length; i++) 
  {
    if (arr[i].includes("red") || arr[i].includes("empty")) 
    {
      countred++;
    }
  }

  if (countred == 32) 
  {
    $("#victory").html(`結果:紅方勝利`);
  } 
  else 
  {
    $("#victory").html(`結果:未分出勝負`);
  }

  for (let i = 0; i < arr.length; i++) 
  {
    if (arr[i].includes("black") || arr[i].includes("empty")) 
    {
      countblack++;
    }
  }

  if (countblack == 32) 
  {
    $("#victory").html(`結果:黑方勝利`);
  } 
  else 
  {
    $("#victory").html(`結果:未分出勝負`);
  }
}
