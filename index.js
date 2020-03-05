const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));

app.get("/math", function (req, res) {
  console.log("Received a request for the math page.");
  var operation = req.query.operation;
  var num1 = req.query.num1;
  var num2 = req.query.num2;

  console.log("Operation: " + operation + "\nnum1: " + num1 +
    "\nnum2: " + num2);

  var result = doMath(operation, num1, num2);
  var params = {res: result};

  res.render("pages/math", params);
});

app.get("/math_service", function (req, res) {
  console.log("Received a request for the math_service page.");
  var operation = req.query.operation;
  var num1 = req.query.num1;
  var num2 = req.query.num2;

  console.log("Operation: " + operation + "\nnum1: " + num1 +
    "\nnum2: " + num2);

  var result = doMath(operation, num1, num2);

  res.writeHead(200, {'Content-Type': 'application/json'});
  var json = {'result': result};
  var jsonString = JSON.stringify(json);
  res.write(jsonString);
  res.end();
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

function doMath(operation, num1, num2) {
  if (operation == "add") {
    return add(Number(num1), Number(num2));
  }
  else if (operation == "sub") {
    return sub(Number(num1), Number(num2));
  }
  else if (operation == "mul") {
    return mul(Number(num1), Number(num2));
  }
  else {
    return div(Number(num1), Number(num2));
  }
}

function add(o1, o2) {
  var sum = o1 + o2;
  return sum;
}

function sub(o1, o2) {
  var difference = o1 - o2;
  return difference;
}

function mul(o1, o2) {
  var product = o1 * o2;
  return product;
}

function div(o1, o2) {
  var quotient = o1 / o2;
  return quotient;
}