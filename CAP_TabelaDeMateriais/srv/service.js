const cds = require('@sap/cds')
module.exports = cds.service.impl(async function () {
   this.on('filtroMateriais', async (req) => {
       const { quantidade } = req.data;
       const materiais = await SELECT.from('MateriaisService.Material');
       return materiais.slice(0, quantidade);
   })
   this.on('adicionarMaterial', async (req) => {
       const { NumMat, Nome, Descr } = req.data;
       const existe = await SELECT.one.from('MateriaisService.Material').where({ NumMat });
       if (existe) {
           return { sucesso: false, mensagem: `Material com NumMat ${NumMat} já cadastrado!` };
       }
       const ultimo = await SELECT.one.from('MateriaisService.Material').orderBy({ ID: 'desc' });
       const novoID = ultimo ? ultimo.ID + 1 : 1;
       await INSERT.into('MateriaisService.Material').entries({ ID: novoID, NumMat, Nome, Descr });
       return { sucesso: true, mensagem: `Material ${Nome} adicionado com sucesso!` };
   })
})