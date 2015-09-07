var Banner = (Banner || {});
var bannerDIV = "";

Object.append(Banner, {

	initialize: function() {
		bannerDIV = new Fx.Slide('bannerAreaDIV', {mode: 'horizontal',resetHeight: true});
	},
	bannerIn: function() {
		bannerDIV.slideIn();
	},
	bannerOut: function() {
		bannerDIV.slideOut();
	}

});
