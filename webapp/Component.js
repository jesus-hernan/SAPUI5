sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"logali/group/MyFirstProject/model/models"
], function (UIComponent, Device, models) {
    "use strict";
    
    jQuery.sap.includeScript("https://cdnjs.cloudflare.com/ajax/libs/signature_pad/1.5.3/signature_pad.js");

	return UIComponent.extend("logali.group.MyFirstProject.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});
