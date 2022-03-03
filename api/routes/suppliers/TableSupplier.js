const Model = require('./ModelTableSuppliers')

module.exports = {
    list () {
        return Model.findAll()
    },
    create (supplier) {
        return Model.create(supplier)
    },
    async getByID(id) {
        const supplier = await Model.findOne({
            where:{
                id: id
            }
        })

        if (!supplier) {
            throw new Error('Supplier not found')
        }

        return supplier
    },
    update(id, dataToUpdate) {
        return Model.update(
            dataToUpdate,
            {
                where: { id: id }
            }
        )
    },
    delete(id) {
        return Model.destroy({
            where: {
                id: id
            }
        })
    }
}