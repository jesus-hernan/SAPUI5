// @ts-ignore
sap.ui.define(["sap/ui/core/Control"], function (oControl) {
    "use strict";
    var metadata = {
        properties: {
            "width": {
                type: "sap.ui.core.CSSSize",
                defaultValue: "400px"
            },
            "height": {
                type: "sap.ui.core.CSSSize",
                defaultValue: "100px"
            },
            "bgcolor": {
                type: "sap.ui.core.CSSColor",
                defaultValue: "white"
            }
        }
    };

    function renderer(oRm, oControl) {
        oRm.write("<div");
        oRm.addStyle("width", oControl.getProperty("width"));
        oRm.addStyle("height", oControl.getProperty("height"));
        oRm.addStyle("background-color", oControl.getProperty("bgcolor"));
        oRm.addStyle("border", "1px solid black");
        oRm.writeStyles();
        oRm.write(">");

        oRm.write("<canvas width='" + oControl.getProperty("width") + "' " +
            "height='" + oControl.getProperty("height") + "'");
        oRm.write("></canvas>");
        oRm.write("</div>");
    }

    function onAfterRendering() {
        var canvas = document.querySelector("canvas");
        try {
            // @ts-ignore
            this.signaturePad = new SignaturePad(canvas);
            this.signaturePad.fill = false;
            canvas.addEventListener('mousedown', function () {
                this.signaturePad.fill = true;
            }.bind(this));
        } catch (e) {
            console.error(e);
        }
    }

    function clear() {
        this.signaturePad.clear();
        this.signaturePad.fill = false;
    }

    function isFill() {
        return this.signaturePad.fill;
    }

    return oControl.extend("logali.group.MyFirstProject.customControls.Signature", {
        metadata: metadata,
        renderer: renderer,
        onAfterRendering: onAfterRendering,
        clear: clear,
        isFill: isFill
    });
});