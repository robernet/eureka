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
			onSuccess: function() {
				if ($("loginDIV")) {
					new Request.HTML({
						url: "acceso.html",
						method: "get",
						update: $("accessAreaDIV"),
						onSuccess: function() {
if ($("challenge")) {
	$("challengeForm").set("value", $("challenge").get("value"));
	require(['js/slides.js'], function() {
		activateSlides('loginFormDIV','loginLink');
	});
}
						}
					}).send();
				}
			},
			onFailure: function() {
				$("accessDIV").innerHTML = "<h1>Error en la conexion</h1><h2>No se pudo cargar el menu.< br/>Revise su conexion a Internet</h2>";
			}
		}).send();
	},
	login: function() {
		require(['js/sha256_min.js','hmac-sha256_min.js','enc-base64_min.js'], function() {
			var str = $("username").get("value") + ":" + CryptoJS.SHA256($("password").get("value")) + ":";
			var hash = CryptoJS.HmacSHA256(str,$("challengeForm").get("value"));
			var hashBase64 = CryptoJS.enc.Base64.stringify(hash);
			$("response").set("value",hashBase64);
			$("password").set("value","");
			$("logintrue :input[name='username']").set("value",$("username").get("value"));
			$("logintrue :input[name='response']").set("value",$("response").get("value"));

new Form.Request("logintrue", "accessDIV", {
	onSend: function() {
		$('submitButton').set('value', 'Entrando...').set('disabled', true);
	},
	onComplete: function(response) {
		alert(response);
	}
}

		});
		return false;
	}
});
