sap.ui.define([
	"logali/group/MyFirstProject/controller/base.controller"
], function (Base) {
	"use strict";
	
	function onInit(){
		// @ts-ignore
		this.bus = sap.ui.getCore().getEventBus();
	}
	//Evento liveChange del control inputEmployee
	function onValidate(){
		var inputEmployee = this.byId("inputEmployee");
		var idEmployee = inputEmployee.getValue();
		
		var labelCountry = this.byId("labelCountry");
		var slCountry = this.byId("slCountry");
		if(idEmployee.length === 6){
			slCountry.setVisible(true);
			labelCountry.setVisible(true);
		}else{
			slCountry.setVisible(false);
			labelCountry.setVisible(false);
		}
	}
	
	// Evento press para filtrar la tabla
	function onFilter(){
		var tableEmployee = this.byId("tableEmployee");
		
		var oJson = this.getView().getModel().getData();
		
		var filters = [];
		
		if(oJson.EmployeeID !== ""){
			filters.push(new sap.ui.model.Filter("EmployeeID","EQ",oJson.EmployeeID));
		}
		
		if(oJson.Country !== ""){
			filters.push(new sap.ui.model.Filter("Country","EQ",oJson.Country));
		}
		
		var binding = tableEmployee.getBinding("items");
		
		binding.filter(filters);
		
	}
	
	//Evento press para limpiar los filtros
	function onClearFilter(){
		var oModel = this.getView().getModel();
		oModel.setProperty("/EmployeeID","");
		oModel.setProperty("/Country","");
	}
	
	//Obtener el contexto
	function showPostalCode(oEvent){
		var itemPressed = oEvent.getSource();
		var oContext = itemPressed.getBindingContext("oJsonModelEmployees");
		
		var objectContext = oContext.getObject();
		sap.m.MessageToast.show(objectContext.PostalCode);
	}
	
	//Uso de json para visibilidad 
	//Mostramos la columna Ciudad
	function onShowCity(){
		var oJsonModelConfig = this.getView().getModel("oJsonModelConfig");
		oJsonModelConfig.setProperty("/visibleCity",true);
		oJsonModelConfig.setProperty("/visibleBtnShowCity",false);
		oJsonModelConfig.setProperty("/visibleBtnHideCity",true);
	}
	
	//Uso de json para visibilidad 
	//Ocultamos la columna Ciudad
	function onHideCity(){
		var oJsonModelConfig = this.getView().getModel("oJsonModelConfig");
		oJsonModelConfig.setProperty("/visibleCity",false);
		oJsonModelConfig.setProperty("/visibleBtnShowCity",true);
		oJsonModelConfig.setProperty("/visibleBtnHideCity",false);
	}
	
	// Crear tablas dinámicas
	//Creación a una tabla con json y javascript
	function createTableDynamic(oEvent){
		var panelDynamicTable = this.byId("panelDynamicTable");
		//Destruimos el contenido de la tabla para asegurarnos no repetir contenido
		panelDynamicTable.destroyItems();
		
		
		//Obtenemos la linea seleccionada, que en este caso es el objeto que ha hecho saltar el evento
		var itemPressed = oEvent.getSource();
		
		//Obtenemos el contexto para mostrar el contenido en la tabla
		var oContext = itemPressed.getBindingContext("oJsonModelEmployees");
		//Obtenemos el json del contexto
		var objectContext = oContext.getObject();
		//Obtenemos el array orders
		var orders = objectContext.Orders;
		//Variable para almacenar las filas
		var ordersItems = [];
		
		for(var i in orders){
			ordersItems.push(new sap.m.ColumnListItem({
					cells : [
							new sap.m.Label({
								text : orders[i].OrderID
							}),
							new sap.m.Label({
								text : orders[i].Freight
							}),
							new sap.m.Label({
								text : orders[i].ShipAddress
							})
						]
				})
			);
		}
		
		//Creación tabla json
		var newTableJson = new sap.m.Table({
			width : "auto",
			columns : [
					new sap.m.Column({
						header : new sap.m.Label({
							text:"{i18n>id}"
						})
					}),

					new sap.m.Column({
						header : new sap.m.Label({
							text:"{i18n>mercancia}"
						})
					}),
					new sap.m.Column({
						header : new sap.m.Label({
							text:"{i18n>direccion}"
						})
					})
				],
			items : ordersItems
		}).addStyleClass("sapUiSmallMargin");
		
		panelDynamicTable.addItem(newTableJson);
		
		//Creacion tabla javascript
		var newTableJS = new sap.m.Table();
		newTableJS.setWidth("auto");
		newTableJS.addStyleClass("sapUiSmallMargin");
		
		var columnId = new sap.m.Column();
		var labelId = new sap.m.Label();
		labelId.bindProperty("text", "i18n>id");
		columnId.setHeader(labelId);
		newTableJS.addColumn(columnId);
		
		var columnFreight = new sap.m.Column();
		var labelFreight = new sap.m.Label();
		labelFreight.bindProperty("text", "i18n>mercancia");
		columnFreight.setHeader(labelFreight);
		newTableJS.addColumn(columnFreight);
	
		var columnShipAddress = new sap.m.Column();

		var labelShipAddress = new sap.m.Label();
		labelShipAddress.bindProperty("text", "i18n>direccion");
		columnShipAddress.setHeader(labelShipAddress);
		newTableJS.addColumn(columnShipAddress);
		

		var columnListItemTemplate = new sap.m.ColumnListItem();
		
		var cellId = new sap.m.Label();
		cellId.bindProperty("text", "oJsonModelEmployees>OrderID");
		columnListItemTemplate.addCell(cellId);
		
		var cellFreight = new sap.m.Label();
		cellFreight.bindProperty("text", "oJsonModelEmployees>Freight");
		columnListItemTemplate.addCell(cellFreight);
		
		var cellShipAddress = new sap.m.Label();
		cellShipAddress.bindProperty("text", "oJsonModelEmployees>ShipAddress");
		columnListItemTemplate.addCell(cellShipAddress);
		
		var oBindingInfo = {
			model : "oJsonModelEmployees",
			path : "Orders",
			template : columnListItemTemplate
		};
		newTableJS.bindAggregation("items", oBindingInfo);
		
		// Bindeamos la tabla a un contexto
		newTableJS.bindElement("oJsonModelEmployees>" + oContext.getPath());
		
		panelDynamicTable.addItem(newTableJS);
	}
	
	// Mostrar dialog ordenes
	function onShowOrders(oEvent){
		//Obtenemos el control seleccionado
		var iconPressed = oEvent.getSource();
		//Obtenemos su contexto asociado al modelo
		var oContext = iconPressed.getBindingContext("odataModel");
		
		if(!this.oDialogOrders){
			this.oDialogOrders =  sap.ui.xmlfragment("logali.group.MyFirstProject.fragment.dialogOrder",this);
			this.getView().addDependent(this.oDialogOrders);
		}
		
		//Bindeamos al dialogo el contexto para que tenga los datos de la línea seleccionada
		this.oDialogOrders.bindElement("odataModel>" + oContext.getPath());
		
		this.oDialogOrders.open();
	}
	
	// Ocultar dialog ordenes
	function onCloseOrders(){
		this.oDialogOrders.close();
	}
	
	function showDetailEmployee(oEvent){
		var path = oEvent.getSource().getBindingContext("odataModel").getPath();
		this.bus.publish("flexible", "showDetailEmployee",path);
	}
	
	function onAddIncidence(oEvent){
		this.showDetailEmployee(oEvent);
		this.bus.publish("flexible", "onAddIncidence");
		
	}
	
	return Base.extend("logali.group.MyFirstProject.controller.masterEmployees", {
		onInit: onInit,
		onValidate : onValidate,
		onFilter : onFilter,
		onClearFilter : onClearFilter,
		showPostalCode : showPostalCode,
		onShowCity : onShowCity,
		onHideCity : onHideCity,
		createTableDynamic : createTableDynamic,
		onShowOrders : onShowOrders,
		onCloseOrders : onCloseOrders,
		showDetailEmployee : showDetailEmployee,
		onAddIncidence : onAddIncidence
	});
});