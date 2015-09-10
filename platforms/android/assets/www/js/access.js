

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
			onSuccess: function(response) {
				if ($("loginDIV")) AccessApp.accessForm();
			},
			onFailure: function() {
				$("accessDIV").innerHTML = "<h1>Error en la conexion</h1><h2>No se pudo cargar el menu.< br/>Revise su conexion a Internet</h2>";
			}
		}).send();
	},
	accessForm: function() {
		var challenge = $("challenge").get("value");
		new Request.HTML({
			url: "acceso.html",
			method: "get",
			update: $("accessAreaDIV"),
			onSuccess: function() {
				$("challengeForm").set("value", challenge);
				require(['js/slides.js'], function() {
					activateSlides('loginFormDIV','loginLink');
				});
				$("submitButton").addEvent("click", function() {
					AccessApp.login();
				});
			}
		}).send();
	},
	checkTimeout: function(){
		if ($('loginDIV')) {
			alert("Sesión Finalizada.\n\nFavor de volver a registrarse.");
			AccessApp.initialize();
		}
	},
	login: function() {
		require(['js/sha256_min.js','js/hmac-sha256_min.js','js/enc-base64_min.js'], function() {
			var str = $("user").get("value") + ":" + CryptoJS.SHA256($("pass").get("value")) + ":";
			var hash = CryptoJS.HmacSHA256(str,$("challengeForm").get("value"));
			var hashBase64 = CryptoJS.enc.Base64.stringify(hash);
			$("responseForm").set("value",hashBase64);
			$("usernameForm").set("value",$("user").get("value"));
			var data = "";
			$$(".loginForm").each(function(e) {
				if (data!="") data += "&";
				data += e.name+"="+e.value;
			});
			new Request.HTML({
				url: "http://eureka-robernet.rhcloud.com/access.php",
				update: $("accessAreaDIV"),
				onRequest: function() {
					$('submitButton').set('value', 'Entrando...').set('disabled', true);
				},
				onSuccess: function() {
					AccessApp.checkTimeout();
					if ($("accesosDIV")) {
						$("logoutLink").addEvent("click", function() {
alert("click");
							new Request.HTML({
								url: "http://eureka-robernet.rhcloud.com/logout.php",
								update: $("accessAreaDIV"),
								onSuccess: function() {
									if ($("loginDIV")) AccessApp.accessForm();
								},
								onFailure: function() {
									alert("Sin Acceso a Internet.\n\nTrate mas tarde...");
								}
							}).send();
						});
					}
				},
				onFailure: function() {
					alert("Sin Acceso a Internet.\n\nTrate mas tarde...");
				}
			}).send(data);
		});
	}
});
