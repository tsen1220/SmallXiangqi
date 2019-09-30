var piecelist = [
  "redboom",
  "redboom",
  "redelephant",
  "redelephant",
  "redhorse",
  "redhorse",
  "redking",
  "redpawn",
  "redpawn",
  "redpawn",
  "redpawn",
  "redpawn",
  "redrook",
  "redrook",
  "redsu",
  "redsu",
  "blackboom",
  "blackboom",
  "blackelephant",
  "blackelephant",
  "blackhorse",
  "blackhorse",
  "blackking",
  "blackpawn",
  "blackpawn",
  "blackpawn",
  "blackpawn",
  "blackpawn",
  "blackrook",
  "blackrook",
  "blacksu",
  "blacksu"
];

const tenDigit = 4;
const oneDigit = 8;
var temp = [];

function shuffle() {
  for (let k = 0; k < 100; k++) {
    for (let i = 0; i < piecelist.length; i++) {
      var j = Math.floor(Math.random() * piecelist.length);
      temp = piecelist[i];
      piecelist[i] = piecelist[j];
      piecelist[j] = temp;
    }
  }

  for (let i = 0; i < tenDigit; i++) {
    for (let j = 0; j < oneDigit; j++) {
      var gamecell = document.getElementById(`blank${i}${j}`);
      gamecell.setAttribute("piece", piecelist[i * 8 + j]);
    }
  }
}
shuffle();
