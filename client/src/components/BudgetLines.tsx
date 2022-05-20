import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../state/hooks'
import { BudgetLine } from '../model/budgetLines'
import { sortBudgetLines } from './../lib/budgetFactory'
import EditableBudgetLine from './EditableBudgetLine'
import { updateInitialBalance } from './../state/initialBalanceSlice'

const InitialBalanceElement: React.FC = () => {
  const initialBalance = useAppSelector((state) => state.initialBalance.value)
  const [tempInputAmount, setTempInputAmount] = useState<string>(String(initialBalance))

  const dispatch = useAppDispatch()

  const doUpdateBudgetLine = (amount: number) => {
    dispatch(updateInitialBalance(amount))
  }

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
          value={tempInputAmount}
          onChange={(event) => {
            setTempInputAmount(event.target.value)
            let amount = Number(event.target.value)
            if (!isNaN(amount)) {
              doUpdateBudgetLine(amount)
            }
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
  const initialBalance = useAppSelector((state) => state.initialBalance.value)
  const [displayBudgetLines, setDisplayBudgetLines] = useState<BudgetLine[]>(budgetLines)

  let newBalance = initialBalance

  useEffect(() => {
    setDisplayBudgetLines(sortBudgetLines(budgetLines))
  }, [budgetLines])

  return (
    <div className="w-full max-w-3xl">
      <InitialBalanceElement />
      {displayBudgetLines &&
        displayBudgetLines.map((budgetLine, index) => {
          newBalance += budgetLine.amount
          return <EditableBudgetLine key={budgetLine.id} budgetLine={budgetLine} newBalance={newBalance} />
        })}
    </div>
  )
}

export default BudgetLinesElement
