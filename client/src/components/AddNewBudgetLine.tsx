import { useState } from 'react'
import { BudgetLine } from '../model/budgetLines'
import { budgetLineFactory, convertBudgetLineDateToString } from './../lib/budgetFactory'
import { toLocaleDateISOString } from './../lib/utils'
import { useAppDispatch } from '../state/hooks'
import { addBudgetLine } from './../state/budgetLinesSlice'

interface AddNewBudgetLineElementProps {
  className?: string
}
const AddNewBudgetLineElement: React.FC<AddNewBudgetLineElementProps> = ({ className }) => {
  const [newBudgetLine, setNewBudgetLine] = useState<BudgetLine>({...budgetLineFactory(), id: 0})
  const [tempInputDate, setTempInputDate] = useState<string>(toLocaleDateISOString(newBudgetLine.date))
  const [tempInputLabel, setTempInputLabel] = useState<string>(newBudgetLine.label)
  const [tempInputAmount, setTempInputAmount] = useState<string>(String(newBudgetLine.amount))

  const dispatch = useAppDispatch()

  const addNewBudgetLine = () => {
    // send the new budget line after converting the date to a string
    dispatch(addBudgetLine(convertBudgetLineDateToString(newBudgetLine)))

    // reset the budget line for the next add operation
    const clearedNewBudgetLine = {...budgetLineFactory(), id: 0}
    setNewBudgetLine(clearedNewBudgetLine)
    setTempInputDate(toLocaleDateISOString(clearedNewBudgetLine.date))
    setTempInputLabel(clearedNewBudgetLine.label)
    setTempInputAmount(String(clearedNewBudgetLine.amount))
  }

  return (
    <div className={`w-full max-w-3xl ${className}`}>
      <div className={`flex border border-gray-700`}>
        <div className={`px-2 py-1 w-1/6 border-r border-gray-700`}>
          <input
            className="p-2 w-full h-full"
            type="date"
            value={tempInputDate}
            onChange={(event) => {
              setTempInputDate(event.target.value)
              try {
                let date = new Date(`${event.target.value} 00:00:00`)
                setNewBudgetLine({
                  ...newBudgetLine,
                  date,
                })
              } catch (err) {
                // invalid input so leave alone
              }
            }}
          />
        </div>
        <div className={`px-2 py-1 w-1/2 border-r border-gray-700`}>
          <input
            className="p-2 w-full h-full"
            type="text"
            value={tempInputLabel}
            placeholder="Enter label..."
            onChange={(event) => {
              setTempInputLabel(event.target.value)
              setNewBudgetLine({
                ...newBudgetLine,
                label: event.target.value,
              })
            }}
          />
        </div>
        <div className={`px-2 py-1 w-1/6 border-r border-gray-700`}>
          <input
            className="p-2 w-full h-full"
            type="number"
            step="0.01"
            value={tempInputAmount}
            onChange={(event) => {
              setTempInputAmount(event.target.value)
              let amount = Number(event.target.value)
              if (!isNaN(amount)) {
                setNewBudgetLine({
                  ...newBudgetLine,
                  amount,
                })
              }
            }}
          />
        </div>
        <div className={`px-2 py-1 w-1/6`}>
          <button onClick={() => addNewBudgetLine()}>Add</button>
        </div>
      </div>
    </div>
  )
}
export default AddNewBudgetLineElement
