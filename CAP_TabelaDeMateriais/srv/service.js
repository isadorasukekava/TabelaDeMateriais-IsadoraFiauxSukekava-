const cds = require('@sap/cds')
module.exports = cds.service.impl(async function () {
    this.on('filtroMateriais', async (req) => {
        const { quantidade } = req.data;
        const materiais = await SELECT.from('MateriaisService.Material');
        return materiais.slice(0, quantidade);
    })
})