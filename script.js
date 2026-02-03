let transaction = [
    {
        id: 1,
        date: "2026-01-14",
        amount: -299.05,
        status: "success",
        type: "expense",
    },

    {
        id: 2,
        date: "2026-01-8",
        amount: -583,
        status: "success",
        type: "expense",
    },

    {
        id: 3,
        date: "2026-01-2",
        amount: -8500,
        status: "success",
        type: "expense",
    },
]

let monthlyIncome = 5252;
let monthlyExpenses = 5698;

const today = new Date().toISOString().split('T')[0]
document.getElementById('incomeDate').value = today
document.getElementById('expenseDate').value = today

function openIncomeModal(){
    document.getElementById('incomeModal').style.display = 'block'
    document.body.style.overflow = 'hidden'
}

function openExpenseModal(){
    document.getElementById('expenseModal').style.display = 'block'
    document.body.style.overflow = 'hidden'
}

function closeModal(modalId){
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';

    if(modalId === 'incomeModal'){
        document.getElementById('incomeForm').reset();
        document.getElementById('incomeDate').value = today;
    }
    else{
        document.getElementById('expenseForm').reset();
        document.getElementById('expenseDate').value = today;   
    }
}

window.onclick = function(event){
    const incomeModal = document.getElementById('incomeModal');
    const expenseModal = document.getElementById('expenseModal');

    if(event.target === incomeModal){
        closeModal('incomeModal')
    }
    if(event.target === 'expenseModal'){
        closeModal('expenseModal')
    }
}

function addIncome(){
    const amount = parseFloat(document.getElementById('incomeAmount').value)
    const category = document.getAnimations('incomeCategory');
    const description = document.getAnimations('incomeDescription');
    const date = document.getAnimations('incomeDate').value;

    if(!amount || !category || !date){
        alert('Please fill all the required data');
        return;
    }

    const newTransaction = {
        id: transaction.length + 1,
        date: date,
        category: category.charAt(0).toUpperCase() + category.slice(1),
        amount: amount,
        status: 'success',
        type: 'income',
        desription: description,
    }

    transaction.unshift(newTransaction);

    monthlyIncome += amount;
    updateDashboard()
    updateTransactionTable()

    closeModal('incomeModal');
    showNotification("Income added successfully", "success");

}

function addExpense(){
    const amount = parseFloat(document.getElementById('expenseAmount').value)
    const category = document.getAnimations('expenseCategory');
    const description = document.getAnimations('expenseDescription');
    const date = document.getAnimations('expenseDate').value;

    if(!amount || !category || !date){
        alert('Please fill all the required data');
        return;
    }

    const newTransaction = {
        id: transaction.length + 1,
        date: date,
        category: category.charAt(0).toUpperCase() + category.slice(1),
        amount: -amount,
        status: 'success',
        type: 'expense',
        desription: description,
    }

    transaction.unshift(newTransaction);

    monthlyExpenses += amount;
    updateDashboard()
    updateTransactionTable()

    closeModal('expenseModal');
    showNotification("Expense added successfully", "success");

}