// @ts-ignore
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox"
], function (Controller,History,MessageBox) {
	"use strict";
	
	function _onObjectMatched(oEvent) {
		this.getView().bindElement({
			path: "/Orders(" + oEvent.getParameter("arguments").OrderID + ")",
			model: "odataModel"
		});
		this.onClear();
	}
	
	function onInit() {
			// @ts-ignore
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detailOrder").attachPatternMatched(_onObjectMatched, this);
	}
	
	// @ts-ignore
	function onBack(oEvent){
		var oHistory = History.getInstance();
		var sPreviousHash = oHistory.getPreviousHash();

		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			// @ts-ignore
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteMain", true);
		}
	}
	
	function onClear(){
		var signature = this.byId("signature");
		signature.clear();
	}
	
	// @ts-ignore
	function factoryOrderDetail(sId, oContext){
		var contextObject = oContext.getObject();
		contextObject.Currency = "EUR";
		var unitsInStock = oContext.getModel().getProperty("/Products(" + contextObject.ProductID + ")/UnitsInStock");
		if(contextObject.Quantity <= unitsInStock){
			// @ts-ignore
			var objectListItem = new sap.m.ObjectListItem(
					{
						title : "{odataModel>/Products(" + contextObject.ProductID + ")/ProductName} ({odataModel>Quantity})",
						number : "{parts:[{path:'odataModel>UnitPrice'},{path: 'odataModel>Currency'}],type: 'sap.ui.model.type.Currency',formatOptions : {showMeasure : false}}",
						numberUnit:"{odataModel>Currency}"
					}
				);
			return objectListItem;
		}else{
			// @ts-ignore
			var customListItem = new sap.m.CustomListItem({
				content:[
						// @ts-ignore
						new sap.m.Bar({
							// @ts-ignore
							contentLeft : new sap.m.Label({text:"{odataModel>/Products(" + contextObject.ProductID + ")/ProductName} ({odataModel>Quantity})"}),
							// @ts-ignore
							contentMiddle : new sap.m.ObjectStatus({text:"{i18n>noStockSuficiente}",state:"Error"}),
							// @ts-ignore
							contentRight : new sap.m.Label({text:"{parts: [{path: 'odataModel>UnitPrice'},{path: 'odataModel>Currency'}],type: 'sap.ui.model.type.Currency'}"})
						})
					]
			});
			return customListItem;
		}
	}
	
	function onSave(){
		var signature = this.byId("signature");
		var oResourceBundle= this.getView().getModel("i18n").getResourceBundle();
		if(!signature.isFill()){
			// @ts-ignore
			sap.m.MessageBox.error(oResourceBundle.getText("relleneFirma"));
		}else{
			MessageBox.information(oResourceBundle.getText("guardadoCorrecto"));
		}
	}

	return Controller.extend("logali.group.MyFirstProject.controller.detailOrder", {
		onInit : onInit,
		onClear : onClear,
		onBack : onBack,
		factoryOrderDetail : factoryOrderDetail,
		onSave : onSave

	});

});