"use client";
import { useState, useContext, useEffect } from 'react';
import { financeContext } from "@/lib/store/finance-context";
import { authContext } from '@/lib/store/auth-context';
import { currencyFormatter, dateFormatter } from '@/lib/utils';
import ExpenseCategoryItem from '@/components/ExpenseCategoryItem';
import IncomeModal from '@/components/modals/IncomeModal';
import ExpenseModal from "@/components/modals/ExpenseModal";
import SignIn from '@/components/SignIn';


// Charts
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend)

export default function Home() {
  const [incomeModal, setIncomeModal] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);
  const [balance, setBalance] = useState(0)
  const { expenses, income } = useContext(financeContext)
  const { user, loading } = useContext(authContext)

  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => {
        return total + i.amount
      }, 0) -
      expenses.reduce((total, e) => {
        return total + e.total
      }, 0)
    setBalance(newBalance)
  }, [expenses, income])

  if (loading) {
    return (
      <div className="spinner-container flex justify-center items-center h-screen">
        <div className="loading-spinner">
        </div>
      </div>
    )
  }
  if (!user) {
    return <SignIn />
  }

  return (
    <>
      {/* Modals */}
      <IncomeModal show={incomeModal} onClose={setIncomeModal} />
      <ExpenseModal show={expenseModal} onClose={setExpenseModal} />

      {/* Inicio */}
      <main className="container max-w-3/4 px-4 flex flex-col items-center py-6 mx-auto">
        <section className="p-3 w-1/2 rounded-2xl bg-gray-200 ">
          <bold className="font-bold text-black text-md">Saldo</bold>
          <h2 className="text-4xl text-black font-bold">{currencyFormatter(balance)}</h2>
        </section>

        {/* Buttons */}
        <section className="flex items-center gap-2 py-3">
          <button onClick={() => { setIncomeModal(true) }} className="btn btn-primary-outline">Entrada</button>
          <button onClick={() => { setExpenseModal(true) }} className="btn btn-primary">Saída</button>
        </section>

        {/* Expenses */}
        <div className='flex w-1/2 justify-between'>
          <div class="container w-1/2 flex flex-col">
            <section className='p-6'>
              <h3 className='text-3xl'>Minhas Receitas</h3>
              {/* Expenses items*/}
              <div className='flex flex-col gap-4 mt-6'>
                {expenses.map(expense => {
                  return (
                    <ExpenseCategoryItem
                      key={expense.id}
                      expense={expense}
                    />
                  )
                })}
              </div>
            </section>
          </div>
          {/* Chart */}
            <section className='p-6'>
              <a id='stats'></a>
              <h3 className='text-3xl'>Gastos</h3>
              <div>
                <Doughnut data={{
                  labels: expenses.map(expense => expense.title),
                  datasets: [
                    {
                      label: "Gastos",
                      data: expenses.map(expense => expense.total),
                      backgroundColor: expenses.map(expense => expense.color),
                      borderColor: ['#18181b'],
                      borderWidth: 5,
                    }]
                }} />
              </div>
            </section>
        </div>
      </main>
    </>
  )
}
