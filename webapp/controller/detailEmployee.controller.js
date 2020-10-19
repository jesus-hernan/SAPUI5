// @ts-ignore
sap.ui.define([
	"logali/group/MyFirstProject/controller/base.controller",
	"logali/group/MyFirstProject/model/formatter",
	"sap/m/MessageBox"
], function (Base,Formatter,MessageBox) {
	
	function onInit(){
		// @ts-ignore
		this.bus = sap.ui.getCore().getEventBus();
	}

	function onCreateIncidence(){
		this.bus.publish("flexible", "onAddIncidence");
	}
	
	function onDeleteIncidence(oEvent){
		var contextObj = oEvent.getSource().getBindingContext("incidenceModel").getObject();
		MessageBox.confirm(this.getView().getModel("i18n").getResourceBundle().getText("seguroEliminar"),{
			onClose : function(oAction){
				if(oAction === "OK"){
					this.getView().getModel("odataModelIncidence").remove("/IncidentsSet(IncidenceId='"+contextObj.IncidenceId+"',SapId='"+contextObj.SapId+"',EmployeeId='"+contextObj.EmployeeId+"')",{
						success: function(){
							this.bus.publish("flexible", "_readIncidence",contextObj.EmployeeId);
						}.bind(this),
						error : function(){
							
						}.bind(this)
					});
				}
			}.bind(this)
		});
		
	}
	
	function changeIncidenceDate(oEvent){
		var context = oEvent.getSource().getBindingContext("incidenceModel");
		var contextObj =  context.getObject();
		if(oEvent.getParameter("valid")){
			var body ={
				CreationDate : contextObj.CreationDate,
				CreationDateX : true
			};
			this.getView().getModel("odataModelIncidence").update("/IncidentsSet(IncidenceId='"+contextObj.IncidenceId+"',SapId='"+contextObj.SapId+"',EmployeeId='"+contextObj.EmployeeId+"')",body,{
				success: function(){
					contextObj.CreationDateError = "None";
					context.getModel().refresh();
				}.bind(this),
				error : function(){
					contextObj.CreationDateError = "Error";
					context.getModel().refresh();
				}.bind(this)
			});
		}else{
			contextObj.CreationDateError = "Error";
			context.getModel().refresh();
		}
	}
	
	function changeIncidenceReason(oEvent){
		var context = oEvent.getSource().getBindingContext("incidenceModel");
		var contextObj =  context.getObject();
		var body ={
			Reason : contextObj.Reason,
			ReasonX : true
		};
		this.getView().getModel("odataModelIncidence").update("/IncidentsSet(IncidenceId='"+contextObj.IncidenceId+"',SapId='"+contextObj.SapId+"',EmployeeId='"+contextObj.EmployeeId+"')",body,{
			success: function(){
				contextObj.ReasonError = "None";
				context.getModel().refresh();
			}.bind(this),
			error : function(){
				contextObj.ReasonError = "Error";
				context.getModel().refresh();
			}.bind(this)
		});
	}
	
	function changeIncidenceType(oEvent){
		var context = oEvent.getSource().getBindingContext("incidenceModel");
		var contextObj =  context.getObject();
		var body ={
			Type : contextObj.Type,
			TypeX : true
		};
		this.getView().getModel("odataModelIncidence").update("/IncidentsSet(IncidenceId='"+contextObj.IncidenceId+"',SapId='"+contextObj.SapId+"',EmployeeId='"+contextObj.EmployeeId+"')",body,{
			success: function(){
				contextObj.TypeError = "None";
				context.getModel().refresh();
			}.bind(this),
			error : function(){
				contextObj.TypeError = "Error";
				context.getModel().refresh();
			}.bind(this)
		});
	}

	return Base.extend("logali.group.MyFirstProject.controller.detailEmployee", {
		onInit: onInit,
		onCreateIncidence: onCreateIncidence,
		onDeleteIncidence : onDeleteIncidence,
		changeIncidenceDate : changeIncidenceDate,
		changeIncidenceReason : changeIncidenceReason,
		changeIncidenceType : changeIncidenceType,
		Formatter : Formatter
	});

});