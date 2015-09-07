var Desktop = (Desktop || {});

Object.append(Desktop, {

	initialize: function() {
//		$$(".app").each(function(e) {
//			e.setStyle("display": "none");
//		});

		var n = Math.floor(Math.random()*10) + 1;
		$("backgroundDIV").setStyle("background-image", "url('img/fondos/fondo"+n.toString().trim()+".png')");
		$("backgroundDIV").setStyle("background-size", "contain");
		$("backgroundDIV").setStyle("background-repeat", "no-repeat");
		$("backgroundDIV").setStyle("background-position", "center center");
		$("homeButton").addEvent("click", function(e) {
			e.stop();
			if ($("bannerAreaDIV").getStyle("display")=="none") {
				$("bannerAreaDIV").setStyle("display", "block");
				menuShow.delay(50);
			} else {
				$("bannerAreaDIV").setStyle("display", "none");
				menuHide.delay(50);
			}
		});
	}
});
