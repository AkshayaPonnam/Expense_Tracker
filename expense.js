let incomeList = []; // Array to store income records
        let expenseList = []; // Array to store expense records
        let totalIncome = 0;
        let totalExpenses = 0;

        // DOM references for income
        const incomeAmount = document.getElementById('income_amount');
        const incomeDate = document.getElementById('income_date');
        const addIncomeButton = document.getElementById('add_income');

        // DOM references for expenses
        const categorySelect = document.getElementById('cat_select');
        const expenseAmount = document.getElementById('expense_amount');
        const expenseDate = document.getElementById('expense_date');
        const addExpenseButton = document.getElementById('add_expense');

        // Table and totals
        const tabBody = document.getElementById('tab_body');
        const totalIncomeCell = document.getElementById('total_income');
        const totalExpensesCell = document.getElementById('total_expenses');
        const balanceCell = document.getElementById('balance');

        // Add income
        addIncomeButton.addEventListener('click', function () {
            const amount = Number(incomeAmount.value);
            const date = incomeDate.value;

            // Validation
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid income amount');
                return;
            }
            if (date === '') {
                alert('Please select a date for income');
                return;
            }

            const income = { type: 'Income', source: 'Income', amount, date };
            incomeList.push(income);
            totalIncome += amount;

            updateTable(income);
            updateSummary();

            // Clear input fields
            incomeAmount.value = '';
            incomeDate.value = '';
        });

        // Add expense
        addExpenseButton.addEventListener('click', function () {
            const category = categorySelect.value;
            const amount = Number(expenseAmount.value);
            const date = expenseDate.value;

            // Validation
            if (category === '') {
                alert('Please select a category');
                return;
            }
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid expense amount');
                return;
            }
            if (date === '') {
                alert('Please select a date for expense');
                return;
            }

            const expense = { type: 'Expense', source: category, amount, date };
            expenseList.push(expense);
            totalExpenses += amount;

            updateTable(expense);
            updateSummary();

            // Clear input fields
            categorySelect.value = '';
            expenseAmount.value = '';
            expenseDate.value = '';
        });

        // Update table
        function updateTable(record) {
            const newRow = tabBody.insertRow();

            const typeCell = newRow.insertCell();
            const sourceCell = newRow.insertCell();
            const amountCell = newRow.insertCell();
            const dateCell = newRow.insertCell();
            const deleteCell = newRow.insertCell();

            typeCell.textContent = record.type;
            sourceCell.textContent = record.source;
            amountCell.textContent = record.amount;
            dateCell.textContent = record.date;

            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteCell.appendChild(deleteBtn);

            deleteBtn.addEventListener('click', function () {
                if (record.type === 'Income') {
                    incomeList = incomeList.filter((item) => item !== record);
                    totalIncome -= record.amount;
                } else {
                    expenseList = expenseList.filter((item) => item !== record);
                    totalExpenses -= record.amount;
                }

                updateSummary();
                newRow.remove();
            });
        }

        // Update summary
        function updateSummary() {
            totalIncomeCell.textContent = totalIncome;
            totalExpensesCell.textContent = totalExpenses;
            balanceCell.textContent = totalIncome - totalExpenses;
        }
 

