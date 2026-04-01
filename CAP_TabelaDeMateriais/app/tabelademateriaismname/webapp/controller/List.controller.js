sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
   "sap/m/MessageBox"
], (Controller, MessageToast, MessageBox) => {
   "use strict";
   return Controller.extend("tabelademateriaismname.controller.List", {
       onInit: function () {
           this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
           this.oRouter
               .getTarget("TargetList")
               .attachDisplay(this.handleRouteMatched, this);
       },
       handleRouteMatched: function () {
           this.createModel();
           this.carregarDados();
       },
       createModel: function () {
           this.getView().setModel(
               new sap.ui.model.json.JSONModel({
                   tableMaterial: []
               }),
               "tableMaterial"
           );
       },
       carregarDados: async function () {
           const response = await fetch("/odata/v4/materiais/Material");
           const data = await response.json();
           this.getView().getModel("tableMaterial").setProperty("/tableMaterial", data.value);
       },
       onFiltrar: async function () {
           const quantidade = this.getView().byId("inputQuantidade").getValue();
           if (!quantidade) {
               MessageToast.show("Digite uma quantidade!");
               return;
           }
           const response = await fetch(`/odata/v4/materiais/filtroMateriais(quantidade=${quantidade})`);
           const data = await response.json();
           this.getView().getModel("tableMaterial").setProperty("/tableMaterial", data.value);
       },
       onAbrirCriar: function () {
           this.byId("dialogCriar").open();
       },
       onFecharCriar: function () {
           this.byId("dialogCriar").close();
       },
       onConfirmarCriar: async function () {
           const NumMat = this.byId("inputNumMat").getValue();
           const Nome = this.byId("inputNome").getValue();
           const Descr = this.byId("inputDescr").getValue();
           // Validar campos
           if (!NumMat || !Nome || !Descr) {
               MessageBox.error("Todos os campos são obrigatórios!");
               return;
           }
           const response = await fetch("/odata/v4/materiais/adicionarMaterial", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ ID: 0, NumMat: parseInt(NumMat), Nome, Descr })
           });
           const data = await response.json();
           if (data.sucesso) {
               MessageBox.success(data.mensagem);
               this.byId("inputNumMat").setValue("");
               this.byId("inputNome").setValue("");
               this.byId("inputDescr").setValue("");
               this.byId("dialogCriar").close();
               this.carregarDados();
           }
           else {
               MessageBox.error(data.mensagem);
           }
       }
   });
});