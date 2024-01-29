var valStr = new String();
var resForLocalStorage = new Array();

// Function to create btns without hard coding in html :
function createBtnsDinamically() {
  const calBtnMainContainer = document.getElementById("lowerPartID");

  const btnValsMainArr = [
    ["C", "Save", "<-"],
    ["7", "8", "9", "+"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "*"],
    [".", "0", "/", "="],
    ["History", "Clear History"],
  ];

  btnValsMainArr.forEach((btnValsArr, indexValsArr) => {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttonsContainer");

    btnValsArr.forEach((btnVals, btnValsIndex) => {
      const actualButtons = document.createElement("button");
      actualButtons.innerText = btnVals;
      // This condition is to add class to some of the btns.
      if (btnVals == "C") {
        actualButtons.style.backgroundColor = "red";
      } else if (btnVals == "Save") {
        actualButtons.style.backgroundColor = "blue";
        actualButtons.style.width = "120px";
      } else if (btnVals == "<-") {
        actualButtons.style.backgroundColor = "orange";
      } else if (btnVals == "=") {
        actualButtons.style.backgroundColor = "orange";
      } else if (btnVals == "History") {
        actualButtons.style.backgroundColor = "rgb(2, 126, 12)";
        actualButtons.style.width = "140px";
        actualButtons.style.fontSize = "25px";
      } else if (btnVals == "Clear History") {
        actualButtons.style.backgroundColor = "rgb(2, 126, 12)";
        actualButtons.style.width = "120px";
        actualButtons.style.fontSize = "20px";
      }
      // This part is to add event listeners to all the btns :
      actualButtons.addEventListener("click", function () {
        buttonFunction(btnVals);
      });
      buttonsContainer.appendChild(actualButtons);
    });
    calBtnMainContainer.appendChild(buttonsContainer);
  });
}
createBtnsDinamically();

// Onclick of a button on the Screen :
function buttonFunction(val) {
  if (val == "=") {
    evalOnClickingEqualsBtn();
  } else if (val == "Save") {
    if (document.getElementById("inputValue").value !== "") {
      storeValInLocalStorage();
    }
  } else if (val == "History") {
    getValFromLocalStorage();
  } else if (val == "Clear History") {
    var xyz = "Screen";
    clearHistory();
  } else if (val == "<-") {
    var sampleData = document.getElementById("inputValue").value;
    document.getElementById("inputValue").value = sampleData.slice(0, -1);
    valStr = sampleData.slice(0, -1);
  } else if (val == "C") {
    document.getElementById("inputValue").value = "";
    valStr = "";
  } else if (val == "0") {
    var xyz = "Screen";
    zeroFunctionality(xyz, val);
  } else if (val == "+" || val == "-" || val == "*" || val == "/") {
    var xyz = "Screen";
    multipleArtithmaticOperationFunctionality(xyz, val);
  } else if (val == ".") {
    var xyz = "Screen";
    dotFuntionality(xyz, val);
  } else {
    valStr += val;
    document.getElementById("inputValue").value = valStr;
  }
}

// Onclick of a button on the KeyBoard:
var inputValueFromHTMLForEnterBtn = document.getElementById("inputValue");
inputValueFromHTMLForEnterBtn.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    evalOnClickingEqualsBtn();
  } else if (
    ![
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/", ".",
    ].includes(event.key)
  ) {
    event.preventDefault();
    console.log("You can't add this Key : " + event.key);
  } else if (event.key === "0") {
    var xyz = "Key";
    zeroFunctionality(xyz, event);
  } else if (
    event.key == "+" || event.key == "-" || event.key == "*" || event.key == "/"
  ) {
    var xyz = "Key";
    multipleArtithmaticOperationFunctionality(xyz, event);
  } else if (event.key == ".") {
    var xyz = "Key";
    dotFuntionality(xyz, event);
  }
});

// Evaluation On click of a Equals to Button on Screen and Enter on KeyBoard :
function evalOnClickingEqualsBtn() {
  var res = eval(document.getElementById("inputValue").value);
  document.getElementById("inputValue").value = res;
  valStr = res;

  // This is to store the last 5 Results in an array for the sake of lacal storage :
  var checkValFromLocalStorage = localStorage
    .getItem("lastFiveVals")
    .split(",");
  if (checkValFromLocalStorage.length !== 1) {
    resForLocalStorage = checkValFromLocalStorage;
  }
  if (resForLocalStorage.length < 5) {
    resForLocalStorage.push(res);
  } else {
    resForLocalStorage.shift();
    resForLocalStorage.push(res);
  }
}

// Function to store the values in Local Storage :
function storeValInLocalStorage() {
  localStorage.setItem("lastFiveVals", resForLocalStorage);
}

// Function to get the values from the Local Storage :
function getValFromLocalStorage() {
  // let valFromLocalStorage = localStorage.getItem("lastFiveVals").split(",");
  let valFromLocalStorage = localStorage.getItem("lastFiveVals");
  document.getElementById("ulId").innerHTML = "";

  // Loop to display the contents from the local storage on the HTML Page :
  if (valFromLocalStorage.length == 0) {
    document.getElementById("ulId").innerHTML = `No History to display`;
  } else {
    valFromLocalStorage = valFromLocalStorage.split(",");
    for (let i = 0; i < valFromLocalStorage.length; i++) {
      var liElement = document.createElement("li");
      var contentForLi = document.createTextNode(valFromLocalStorage[i]);
      liElement.appendChild(contentForLi);
      document.getElementById("ulId").appendChild(liElement);
    }
  }
}

// Function to clear the local storage :
function clearHistory() {
  resForLocalStorage = [];
  localStorage.setItem("lastFiveVals", resForLocalStorage);
  document.getElementById("ulId").innerHTML = "";
}

// Function to handle the (0) Zero Functionality :
function zeroFunctionality(xyz, value) {
  if (
    document.getElementById("inputValue").value.length > 0 &&
    document.getElementById("inputValue").value.length < 2
  ) {
    var inputFromScreen = document.getElementById("inputValue").value;
    if (xyz == "Screen") {
      if (inputFromScreen[0] != "0") {
        // This part is to add the ZERO in the second place only if the first place character is NON-ZERO :
        valStr += value;
        document.getElementById("inputValue").value = valStr;
      }
    }
    if (xyz == "Key") {
      if (inputFromScreen[0] == "0") {
        value.preventDefault();
      }
    }
  } else {
    if (xyz == "Screen") {
      valStr += value;
      document.getElementById("inputValue").value = valStr;
    }
  }
}

// Function to handle the Multiple Arithmatic Operators :
function multipleArtithmaticOperationFunctionality(xyz, value) {
  var valueTakenFromGEBI = document.getElementById("inputValue").value;
  var lastSecondValue =
    valueTakenFromGEBI[document.getElementById("inputValue").value.length - 1];

  if (
    lastSecondValue == "+" || lastSecondValue == "-" || lastSecondValue == "*" || lastSecondValue == "/"
  ) {
    valueTakenFromGEBI = valueTakenFromGEBI.slice(0, -1);
  } else {
    console.log("All Good with multiple arithmatic operators");
  }

  if (xyz == "Key") {
    if (valueTakenFromGEBI.length == 0) {
      value.preventDefault();
    }
    document.getElementById("inputValue").value = valueTakenFromGEBI;
  }
  if (xyz == "Screen") {
    if (valueTakenFromGEBI.length != 0) {
      // This part is to prevent the entering of the Arithmatic Operaters at First :
      valueTakenFromGEBI += value;
      valStr = valueTakenFromGEBI;
      document.getElementById("inputValue").value = valStr;
    }
  }
}

// Function to handle the (.) Dot Functionality :
function dotFuntionality(xyz, value) {
  var toFindTheDot = document.getElementById("inputValue").value;
  console.log("Before : " + toFindTheDot);
  for (let i = toFindTheDot.length - 1; i >= 0; i--) {
    if (
      toFindTheDot[i] == "+" || toFindTheDot[i] == "-" || toFindTheDot[i] == "*" || toFindTheDot[i] == "/"
    ) {
      // This part is for adding the DOT in Later Sets of Characters :
      var lastIndexOfSymbol = toFindTheDot.lastIndexOf(toFindTheDot[i]);
      var slicedPartAfterLastIndex = toFindTheDot.slice(
        lastIndexOfSymbol,
        toFindTheDot.length
      );

      if (slicedPartAfterLastIndex.includes(".")) {
        if (xyz == "Screen") {
          console.log("No You Can't add dot.");
        } else if (xyz == "Key") {
          value.preventDefault();
          console.log("No You Can't add dot.");
        }
        break;
      } else {
        if (xyz == "Screen") {
          console.log("You can add Dot");
          valStr += value;
          document.getElementById("inputValue").value = valStr;
        } else if (xyz == "Key") {
          console.log("You can add Dot");
        }
      }
      break;
    } else if (i == 0) {
      // This part is for adding the DOT in First set of Characters :
      var sliceTheFirstPartKeyBoard = toFindTheDot.slice(
        0,
        toFindTheDot.length
      );
      if (sliceTheFirstPartKeyBoard.includes(".")) {
        if (xyz == "Screen") {
          console.log("You Can't add the DOT.");
        } else if (xyz == "Key") {
          console.log("You Can't add the DOT.");
          value.preventDefault();
        }
      } else {
        if (xyz == "Screen") {
          console.log("You Can Add The DOT");
          valStr += value;
          document.getElementById("inputValue").value = valStr;
        } else if (xyz == "Key") {
          console.log("You Can Add The DOT");
        }
      }
    }
  }
}

// xyz = Here the variable name xyz is used as parameter for the functions to indicate wether the input is from the "window screen" or "keyboard".
