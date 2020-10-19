sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	
	function navToDetailOrder(oEvent){
		var OrderID = oEvent.getSource().getBindingContext("odataModel").getObject().OrderID;
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("detailOrder",{
			OrderID : OrderID
		});
	}
	
	return Controller.extend("logali.group.MyFirstProject.controller.base", {
		navToDetailOrder : navToDetailOrder
	});
});
