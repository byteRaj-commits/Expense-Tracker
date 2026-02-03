let transaction = [
    {
        id: 1,
        date: "2026-01-14",
        amount: -299.05,
        category: "Subscription",
        status: "success",
        type: "expense",
    },

    {
        id: 2,
        date: "2026-01-8",
        amount: -583,
        category: "Shopping",
        status: "success",
        type: "expense",
    },

    {
        id: 3,
        date: "2026-01-2",
        amount: -8500,
        category: "Travelling",
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
    if(event.target === expenseModal){
        closeModal('expenseModal')
    }
}

function addIncome(){
    const amount = parseFloat(document.getElementById('incomeAmount').value)
    const category = document.getElementById('incomeCategory').value;
    const description = document.getElementById('incomeDescription').value;
    const date = document.getElementById('incomeDate').value;

    if (isNaN(amount) || category === "" || description.trim() === "" || date === "") {
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
        description: description,
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
    const category = document.getElementById('expenseCategory').value;
    const description = document.getElementById('expenseDescription').value;
    const date = document.getElementById('expenseDate').value;

    if (isNaN(amount) || category === "" || description.trim() === "" || date === "") {
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
        description: description,
    }

    transaction.unshift(newTransaction);

    monthlyExpenses += amount;
    updateDashboard()
    updateTransactionTable()

    closeModal('expenseModal');
    showNotification("Expense added successfully", "success");

}

function updateDashboard(){
    document.querySelector('.income-amount').textContent = `${monthlyIncome.toLocaleString()}.00`
    document.querySelector('.expense-amount').textContent = `${monthlyExpenses.toLocaleString()}.00`

    let spendingLimit = 12345;
    const usedAmount = monthlyExpenses;
    const percentage = (usedAmount / spendingLimit) * 100;

    document.querySelector('.spending-limit').textContent = `${(spendingLimit - usedAmount).toLocaleString()}.00`
    document.querySelector('.progress-fill').style.width = `${Math.min(percentage, 100)}%`

}

function updateTransactionTable() {
    const tbody = document.querySelector('.transactions-table tbody');
    tbody.innerHTML = '';

    const recentTransactions = transaction.slice(0, 10);

    recentTransactions.forEach((transaction) => {
        const row = document.createElement('tr');
        const formattedDate = new Date(transaction.date).toLocaleDateString(
            'en-us',
            {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }
        );

        const amountDisplay = transaction.amount > 0 ? `+${transaction.amount.toLocaleString()}.00` : `-${Math.abs(transaction.amount).toLocaleString()}.00`

        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${transaction.category}</td>
            <td style="color: ${transaction.amount > 0 ? "#10b981" : "#ef4444"}" >${amountDisplay}</td>
            <td><span class="status-success">${transaction.status}</span></td>
            <td><button class="action-btn"><i class="fas fa-ellipsis-h"></i></button></td>
        `;

        tbody.appendChild(row)

    });
}

function showNotification(message, type = 'success'){
    const notification = document.createElement('div')
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
        background: ${type === 'success' ? '#10b981' : '#ef4444'}
    `

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease'

        setTimeout(() => {
            document.body.removeChild(notification)
        }, 300);

    }, 3000);
}

const style = document.createElement('style');

style.textContent = `
    @keyframes slideInRight{
        from{
            transform: translate(100%);
            opacity: 0;
        }

        to{
            transform: translate(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight{
        from{
            transform: translate(0);
            opacity: 1;
        }

        to{
            transform: translate(100%);
            opacity: 0;
        }
    }

`

document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function(){
    updateTransactionTable();
    updateDashboard();
})