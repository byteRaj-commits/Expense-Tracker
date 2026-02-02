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

