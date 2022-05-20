import mongoose from 'mongoose'

const budgetLinesSchema = new mongoose.Schema({
    label: {
        required: true,
        type: String
    },
    amount: {
        required: true,
        type: Number
    },
    date: {
        required: true,
        type: Date
    }
})

export default mongoose.model('BudgetLines', budgetLinesSchema)
