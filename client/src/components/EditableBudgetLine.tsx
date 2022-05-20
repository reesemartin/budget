import { useEffect, useState } from 'react'
import { BudgetLine } from '../model/budgetLines'
import { convertBudgetLineDateToString } from './../lib/budgetFactory'
import { toLocaleDateISOString, toDecimalPlacesString } from './../lib/utils'
import { useAppDispatch } from '../state/hooks'
import { updateBudgetLine, removeBudgetLine } from './../state/budgetLinesSlice'

interface EditableBudgetLineElementProps {
  budgetLine: BudgetLine
  newBalance: number
  className?: string
}
const EditableBudgetLineElement: React.FC<EditableBudgetLineElementProps> = ({ budgetLine, newBalance, className }) => {
  const [newBudgetLine, setNewBudgetLine] = useState<BudgetLine>({ ...budgetLine })
  const [tempInputDate, setTempInputDate] = useState<string>(toLocaleDateISOString(newBudgetLine.date))
  const [tempInputLabel, setTempInputLabel] = useState<string>(newBudgetLine.label)
  const [tempInputAmount, setTempInputAmount] = useState<string>(String(newBudgetLine.amount))
  const [background, setNewBackground] = useState<string>('bg-white')

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (newBudgetLine.amount < 0) {
      setNewBackground('bg-white')
    } else if (newBudgetLine.amount > 0) {
      setNewBackground('bg-green-900')
    }
  }, [newBudgetLine])

  const doUpdateBudgetLine = () => {
    // send the new budget line after converting the date to a string
    dispatch(updateBudgetLine(convertBudgetLineDateToString(newBudgetLine)))
  }

  const doRemoveBudgetLine = () => {
    dispatch(removeBudgetLine({id: newBudgetLine.id}))
  }

  return (
    <div className={`group flex border-b border-gray-700 ${className}`}>
      <div className={`px-2 py-1 w-1/6 bg-white text-black border-l border-r border-gray-700`}>
        <input
          className="p-2 w-full h-full bg-inherit"
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
          onBlur={() => doUpdateBudgetLine()}
        />
      </div>
      <div
        className={`px-2 py-1 w-1/2 font-bold ${background} ${
          newBudgetLine.amount < 0 ? 'text-black' : 'text-white'
        } border-r border-gray-700`}>
        <input
          className="p-2 w-full h-full bg-inherit"
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
          onBlur={() => doUpdateBudgetLine()}
        />
      </div>
      <div
        className={`px-2 py-1 w-1/6 ${background} ${
          newBudgetLine.amount < 0 ? 'text-red-500' : 'text-white'
        } border-r border-gray-700`}>
        <input
          className="p-2 w-full h-full bg-inherit"
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
          onBlur={() => doUpdateBudgetLine()}
        />
      </div>
      <div
        className={`flex items-center justify-between px-2 py-1 w-1/6 bg-white ${
          newBalance < 0 ? 'text-red-500' : 'text-green-900'
        } border-r border-gray-700`}>
        <span>${toDecimalPlacesString(newBalance, 2)}</span>
        <div
          className="group-hover:flex hidden items-center h-full px-2 text-red cursor-pointer"
          onClick={() => doRemoveBudgetLine()}>
          X
        </div>
      </div>
    </div>
  )
}
export default EditableBudgetLineElement
