const defaultColor = "#000000";
const defaultGridSize = 16;
const defaultMode = "monochrome";

let currentColor = defaultColor;
let currentGridSize = defaultGridSize;
let currentMode = defaultMode;

function changeColor(color) {
  currentColor = color;
}

function rainbowColor() {
  const randomR = (Math.random() * 255).toFixed(0);
  const randomG = (Math.random() * 255).toFixed(0);
  const randomB = (Math.random() * 255).toFixed(0);
  return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function changeGridSize() {
  let gridSize = prompt("Size? (Max 100)");
  document.querySelector("#app").innerHTML = "";

  //Limit to 100 max, if within, good to go
  if (gridSize > 0 && gridSize <= 100) {
    createGrid(gridSize);
    initiateApp();
  } else {
    alert("Must be a number between 1 and 100.");
  }
}

function createGrid(size) {
  for (let i = 0; i < size; i++) {
    let gridRow = document.createElement("div");
    gridRow.classList.add("gridRow");
    document.querySelector(
      "#app"
    ).style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridRow.style.gridTemplateRow = `repeat(${size}, 1fr)`;
    document.querySelector("#app").append(gridRow);
    for (let i = 0; i < size; i++) {
      let gridDiv = document.createElement("div");
      gridDiv.classList.add("gridDiv");
      console.log("cell " + i);
      document
        .querySelectorAll(".gridRow")
        [document.querySelectorAll(".gridRow").length - 1].append(gridDiv);
    }
  }
}

function initiateApp() {
  document.querySelectorAll(".gridDiv").forEach((cell) => {
    cell.addEventListener("mouseover", function (e) {
      if (this.style.opacity !== "1") {
        if (document.querySelector("#rainbowCheckbox").checked) {
          this.style.backgroundColor = rainbowColor();
        } else {
          this.style.backgroundColor = currentColor;
        }
        if (document.querySelector("#shadingCheckbox").checked) {
          this.style.opacity = (Number(this.style.opacity) * 10 + 2) / 10;
        } else {
          this.style.opacity = 1;
        }
      }
    });
  });
}

//Initialise app
createGrid(currentGridSize);
initiateApp();
