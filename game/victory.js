function victory() {
  var countred = 0;
  var countblack = 0;
  var a = [];
  $("[piece]").each(function() {
    a.push($(this).attr("piece"));
  });

  for (let i = 0; i < a.length; i++) {
    if (a[i].includes("red") || a[i].includes("empty")) {
      countred++;
    }
  }
  console.log(countred);

  if (countred == 32) {
    $("#victory").html(`結果:紅方勝利`);
  } else {
    $("#victory").html(`結果:未分出勝負`);
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i].includes("black") || a[i].includes("empty")) {
      countblack++;
    }
  }
  console.log(countblack);

  if (countblack == 32) {
    $("#victory").html(`結果:黑方勝利`);
  } else {
    $("#victory").html(`結果:未分出勝負`);
  }
}
