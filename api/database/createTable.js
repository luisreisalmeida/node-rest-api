const ModelTable = require('../routes/suppliers/ModelTableSuppliers')

ModelTable
    .sync()
    .then(() => console.log('Table created successfully'))
    .catch(console.log)