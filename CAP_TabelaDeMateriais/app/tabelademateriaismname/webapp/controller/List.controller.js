sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast"
], (Controller, MessageToast) => {
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
       }
   });
});