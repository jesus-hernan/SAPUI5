// @ts-ignore
sap.ui.define([
], function () {
		function dateFormat(date){
			var timeDay = 24 * 60 * 60 * 1000;
			if(date){
				var dateNow = new Date();
				// @ts-ignore
				var dateFormatOnlyDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy/MM/dd" });
				var dateNowFormat = new Date(dateFormatOnlyDate.format(dateNow));
				var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
				switch(true){
				//Mañana
					case date.getTime() === dateNowFormat.getTime():
						return oResourceBundle.getText("hoy");
				//Mañana
					case date.getTime() === dateNowFormat.getTime() + timeDay:
						return oResourceBundle.getText("maniana");
				//Ayer
					case date.getTime() === dateNowFormat.getTime() - timeDay:
						return oResourceBundle.getText("ayer");
					default:
						return "";
				//
				}
			}
		}
	return {
		dateFormat : dateFormat
	};
});
