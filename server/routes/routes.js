import express from 'express'
import BudgetLinesModel from './../model/budgetLines.js'

const router = express.Router()

// Post Method
router.post('/post', async (req, res) => {
  try {
    let date = new Date()
    if (req?.body?.date) {
      date = req.body.date
      try {
        if (typeof req.body.date !== 'Date') {
          date = new Date(req.body.date)
        }
      } catch (err) {
        throw 'Invalid date provided'
      }
    }

    const data = new BudgetLinesModel({
      label: req.body.label,
      amount: req.body.amount,
      date: date,
    })

    const dataToSave = await data.save()
    res.status(200).json(dataToSave)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// List all Method
router.get('/list', async (req, res) => {
  try {
    const data = await BudgetLinesModel.find()
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get by ID Method
router.get('/get/:id', async (req, res) => {
  try {
    const data = await BudgetLinesModel.findById(req.params.id)
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updatedData = req.body
    const options = { new: true } // specifies to return the new item as the response

    const result = await BudgetLinesModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    )

    res.send(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await BudgetLinesModel.findByIdAndDelete(id)
    res.send(`Budget line "${data.label}" has been deleted..`)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
