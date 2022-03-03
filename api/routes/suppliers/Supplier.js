const TableSupplier = require('./TableSupplier')

class Supplier {
    constructor({id, company, email, category, createdAt, updateAt}) {
        this.id = id
        this.company = company
        this.email = email
        this.category = category
        this.createdAt = createdAt
        this.updatedAt = updateAt
    }

    async create() {
        this.validate()
        const result = await TableSupplier.create({
            company: this.company,
            email: this.email,
            category: this.category
        })

        this.id = result.id
        this.createdAt = result.createdAt
        this.updatedAt = result.updatedAt
    }

    async getByID() {
        const supplier = await TableSupplier.getByID(this.id)
        this.company = supplier.company
        this.email = supplier.email
        this.category = supplier.category
        this.createdAt = supplier.createdAt
        this.updatedAt = supplier.updatedAt
    }

    async update() {
        await TableSupplier.getByID(this.id)
        const fields = ['company', 'email', 'category']
        const dataToUpate = {}

        fields.forEach((field) => {
            const value = this[field]

            if (typeof value === 'string' && value.length > 0) {
                dataToUpate[field] = value
            }
        })

        if (Object.keys(dataToUpate).length === 0) {
            throw new Error('No data provided to update')
        }

        await TableSupplier.update(this.id, dataToUpate)
    }

    delete() {
        return TableSupplier.delete(this.id)
    }

    validate() {
        const fields = ['company', 'email', 'category']

        fields.forEach((field) => {
            const value = this[field]

            if(typeof value !== 'string' || value.length === 0){
                throw new Error(`The field '${field}' is invalid`)
            }
        })
    }
}

module.exports = Supplier