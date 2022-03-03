const router = require('express').Router()
const TableSupplier = require('./TableSupplier')
const Supplier = require('./Supplier')

router.get('/', async (req, res) => {
    const result = await TableSupplier.list()
    res.status(200)
    res.send(
        JSON.stringify(result)
    )
})

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const supplier = new Supplier(data)
        await supplier.create()
        res.status(201)
        res.send(
            JSON.stringify(supplier)
        )
    } catch (error) {
        res.status(400)
        res.send(
            JSON.stringify({
                message: error.message
            })
        )
    }

})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const supplier = new Supplier({ id: id })
        await supplier.getByID()
        res.status(200)
        res.send(
            JSON.stringify(supplier)
        )
    } catch (error) {
        res.status(404)
        res.send(
            JSON.stringify({
                message: error.message
            })
        )
    }
})

router.put('/:id', async (req, res) => {
    try {
        const dataReq = req.body
        const id = req.params.id
        const data = Object.assign({}, dataReq, { id: id })

        const supplier = new Supplier(data)
        await supplier.update()
        res.status(204)
        res.end()
    } catch (error) {
        res.status(400)
        res.send(
            JSON.stringify({
                message: error.message
            })
        )
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const supplier = new Supplier({ id : id})
        await supplier.getByID()
        await supplier.delete()
        res.status(204)
        res.end()
    } catch (error) {
        res.status(404)
        res.send(
            JSON.stringify({
                message: error.message
            })
        )
    }
})

module.exports = router