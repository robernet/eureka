var activateSlides = function(nameDIV,linkID) {

	var slideDIV = new Fx.Slide(nameDIV, {resetHeight: true});
	slideDIV.hide();
	$(nameDIV).setStyle("display", "block");
	$(linkID).addEvent("click", function(e) {
		e.stop();
		slideDIV.toggle();
	});

}
