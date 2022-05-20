import { useEffect, useState } from 'react'
import { useAppSelector } from '../state/hooks'
import { parseBudgetLineDate } from '../lib/budgetFactory'
import { BudgetLine } from '../model/budgetLines'
import BudgetLinesElement from '../components/BudgetLines'
import AddNewBudgetLineElement from '../components/AddNewBudgetLine'

const Ledger: React.FC = () => {
  const getBudgetLines = useAppSelector((state) => state.budgetLines)

  const [budgetLines, setBudgetLines] = useState<BudgetLine[]>([])

  useEffect(() => {
    setBudgetLines(getBudgetLines.map(x => parseBudgetLineDate(x)))
  }, [getBudgetLines])

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Ledger</h1>
      <AddNewBudgetLineElement className="mb-6" />
      <BudgetLinesElement budgetLines={budgetLines} />
    </div>
  )
}

export default Ledger
