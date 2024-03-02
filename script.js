document.getElementById("purchase-btn").addEventListener("click", function () {
  const price = 19.5;
  const cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ];
  const cash = parseFloat(document.getElementById("cash").value);

  // Calculate change due
  let changeDue = cash - price;
  let changeArray = [];
  const currencyUnit = {
    "ONE HUNDRED": 100,
    TWENTY: 20,
    TEN: 10,
    FIVE: 5,
    ONE: 1,
    QUARTER: 0.25,
    DIME: 0.1,
    NICKEL: 0.05,
    PENNY: 0.01,
  };

  // Calculate total cash in drawer
  let totalCashInDrawer = cid.reduce((acc, curr) => acc + curr[1], 0);

  // Function to round to two decimal places
  const roundToTwoDecimal = (num) => Math.round(num * 100) / 100;

  // Function to check if cash-in-drawer is less than the change due
  const isInsufficientFunds = () => totalCashInDrawer < changeDue;

  // Function to check if cash-in-drawer is equal to the change due
  const isClosed = () => totalCashInDrawer === changeDue;

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cash === price) {
    document.getElementById("change-due").innerText =
      "No change due - customer paid with exact cash";
  } else if (isInsufficientFunds()) {
    document.getElementById("change-due").innerText =
      "Status: INSUFFICIENT_FUNDS";
  } else if (isClosed()) {
    document.getElementById("change-due").innerText = "Status: CLOSED";
  } else {
    // Iterate through the cash-in-drawer array starting from the highest denomination
    for (let i = cid.length - 1; i >= 0; i--) {
      const currencyName = cid[i][0];
      const currencyTotal = cid[i][1];
      const currencyValue = currencyUnit[currencyName];
      let currencyCount = 0;

      // Calculate how many of this currency we can use
      while (changeDue >= currencyValue && currencyTotal > 0) {
        changeDue -= currencyValue;
        changeDue = roundToTwoDecimal(changeDue);
        currencyTotal -= currencyValue;
        currencyCount += currencyValue;
      }

      // If we used any of this currency, push it to the change array
      if (currencyCount > 0) {
        changeArray.push([currencyName, currencyCount]);
      }
    }

    // If after processing all available currencies, changeDue is not 0, it means we couldn't provide exact change
    if (changeDue > 0) {
      document.getElementById("change-due").innerText =
        "Status: INSUFFICIENT_FUNDS";
    } else {
      // Display the change due in the #change-due element
      document.getElementById(
        "change-due"
      ).innerText = `Status: OPEN ${changeArray
        .map((arr) => `${arr[0]}: $${arr[1].toFixed(2)}`)
        .join(" ")}`;
    }
  }
});
