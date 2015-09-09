var AccessApp = (AccessApp || {});
var accessDIV = "";

Object.append(AccessApp, {

	initialize: function() {
		new Request.HTML({
			url: "http://eureka-robernet.rhcloud.com/",
			method: "get",
			update: $("accessAreaDIV"),
			onRequest: function() {
			},
			onComplete: function() {
				if ($("loginDIV")) {
					new Request.HTML({
						url: "acceso.html",
						method: "get",
						update: $("accessAreaDIV"),
						onComplete: function() {
require(['js/slides.js'], function() {
	activateSlides('loginFormDIV','loginLink');
});
						}
					}).send();
				}
			},
			onFailure: function() {
				$("accessDIV").innerHTML = "<h1>Error en la conexion</h1><h2>No se pudo cargar el menu.< br/>Revise su conexion a Internet</h2>";
			}
		}).send();
	}

});
