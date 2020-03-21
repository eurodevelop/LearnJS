let startPayment = document.getElementById('start'), //кнопка начать расчет
    budgetValue = document.getElementsByClassName('budget-value')[0]; //поле - доход
let daybudgetValue = document.getElementsByClassName('daybudget-value')[0]; // поле на 1 день
let levelValue = document.getElementsByClassName('level-value')[0];
let expensesValue = document.getElementsByClassName('expenses-value')[0];
let optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0];
let incomeValue = document.getElementsByClassName('income-value')[0]; // поле - доп доход
let monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0]; //поле-мес дох
let yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0]; //поле-год дох
let possiblePayments = document.getElementsByClassName('expenses-item');
let namePaymentOne = document.getElementsByClassName('expenses-item')[0];
let pricePaymentOne = document.getElementsByClassName('expenses-item')[1];
let namePaymentTwo = document.getElementsByClassName('expenses-item')[2];
let pricePaymentOneTwo = document.getElementsByClassName('expenses-item')[3];
let approveOne = document.getElementsByTagName('button')[0]; // кнопка - утвердить обязрасходы
approveOne.disabled = true;
let approveTwo = document.getElementsByTagName('button')[1]; // кнопка - утвердить н/о расходы
approveTwo.disabled = true;
let payment = document.getElementsByTagName('button')[2]; // кнопка - рассчитать
payment.disabled = true;
let fields = document.querySelectorAll('.optionalexpenses-item'); // поля н/о расходов
let fieldOne = fields[0];
let fieldTwo = fields[1];
let fieldThree = fields[2];
let fieldPossibleIncome = document.querySelector('.choose-income'); //поле - доп доход
let checkBox = document.querySelector('.checksavings > input');
let sum = document.querySelector('.choose-sum');
let percent = document.querySelector('.choose-percent');
let year = document.querySelector('.year-value'); // поле - год
let month = document.querySelector('.month-value'); // поле - месяц
let day = document.querySelector('.day-value'); // поле - день

let money; //зарплата
let time; //вводимая дата
let date; //дата в формате даты

let appData = {
    budget: money,
    timeData: time,
    possible: {},
    sumPossible: 0,
    impossible: {},
    moneyPerDay: "",
    income: [],
    savings: false,
    monthIncome: undefined,
    yearIncome: undefined
};

startPayment.addEventListener('click', function() {
    money = +prompt("Ваш бюджет на месяц?", "150000");
    time = prompt("Введите дату в формате YYYY-MM-DD", "2020-03-23");
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    date = new Date(Date.parse(time));
    year.value = date.getFullYear();
    month.value = date.getMonth() + 1;
    day.value = date.getDate();
    approveOne.removeAttribute('disabled');
    approveTwo.removeAttribute('disabled');
    payment.removeAttribute('disabled');
});

approveOne.addEventListener('click', function() {
    let sum = 0;
    for (let i = 0; i < possiblePayments.length; i++) {
        let a = possiblePayments[i].value;
        let b = possiblePayments[++i].value;
        sum += +b;
        appData.sumPossible = sum;
        appData.possible[a] = b;
    }
    expensesValue.textContent = sum;
});

approveTwo.addEventListener("click", function() {
    for (let i = 0; i < fields.length; i++) {
        let a = fields[i].value;
        appData.impossible[i] = a;
        optionalexpensesValue.textContent += appData.impossible[i] + " ";
    }
});

payment.addEventListener("click", function() {
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - appData.sumPossible) / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "нищеброд";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "при бабле";
        } else {
            levelValue.textContent = "средний";
        }
    } else {
        alert("введите зп");
    }
});

fieldPossibleIncome.addEventListener("input", function() {
    let items = fieldPossibleIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkBox.addEventListener("click", function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
    console.log(appData.savings);
});

sum.addEventListener('input', function() {
    if (appData.savings == true) {
        let sumTemp = +sum.value;
        let percentTemp = +percent.value;
        appData.monthIncome = sumTemp/100/12*percentTemp;
        appData.yearIncome = sumTemp/100*percentTemp;
        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percent.addEventListener('input', function() {
    if (appData.savings == true) {
        let sumTemp = +sum.value;
        let percentTemp = +percent.value;
        appData.monthIncome = sumTemp/100/12*percentTemp;
        appData.yearIncome = sumTemp/100*percentTemp;
        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});