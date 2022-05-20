import { useEffect, useState } from 'react'
import { BudgetLine } from '../model/budgetLines'
import { sortBudgetLines } from './../lib/budgetFactory'
import EditableBudgetLine from './EditableBudgetLine'

interface InitialBalanceElementProps {
  initialBalance: number
  setInitialBalance: React.Dispatch<React.SetStateAction<number>>
}
const InitialBalanceElement: React.FC<InitialBalanceElementProps> = ({ initialBalance, setInitialBalance }) => {
  return (
    <div className={`flex border-b border-gray-700`}>
      <div className={`p-2 w-1/6 border-l border-t border-gray-700`}></div>
      <div className={`p-2 w-2/3 text-right font-bold bg-white text-black border-t border-r border-gray-700`}>
        Starting Amount →
      </div>
      <div className={`w-1/6 bg-white text-black border-t border-r border-gray-700`}>
        <input
          className="p-2 w-full h-full"
          type="number"
          step="0.01"
          value={initialBalance}
          onChange={(event) => {
            setInitialBalance(Number(event.target.value))
          }}
        />
      </div>
    </div>
  )
}

interface BudgetLinesElementProps {
  budgetLines: BudgetLine[]
}
const BudgetLinesElement: React.FC<BudgetLinesElementProps> = ({ budgetLines }) => {
  const [initialBalance, setInitialBalance] = useState<number>(0)
  const [displayBudgetLines, setDisplayBudgetLines] = useState<BudgetLine[]>(budgetLines)

  let newBalance = initialBalance

  useEffect(() => {
    setDisplayBudgetLines(sortBudgetLines(budgetLines))
  }, [budgetLines])

  return (
    <div className="w-full max-w-3xl">
      <InitialBalanceElement initialBalance={initialBalance} setInitialBalance={setInitialBalance} />
      {displayBudgetLines &&
        displayBudgetLines.map((budgetLine, index) => {
          newBalance += budgetLine.amount
          return <EditableBudgetLine key={budgetLine.id} budgetLine={budgetLine} newBalance={newBalance} />
        })}
    </div>
  )
}

export default BudgetLinesElement
