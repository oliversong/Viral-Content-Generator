/**
 * jQuery crop - takes (IMG) elements and crops them to the dimensions
 * given.  The result is the same image with a background image with the
 * height and width and an offset.  The new DIV should also carry across 
 * the existing style attributes of the image.
 *
 * @author Remy Sharp (leftlogic.com)
 * @date 2006-12-28
 * @example $("img").crop(x, y, height, width)
 * @example $("img").crop({ x: x, y: y, height: height, width: width })
 * @example $("img").crop(height, width)
 * @example $("img").crop(width)
 * @desc Crops image to dimensions given.  If only width (and height), 
 * x and y are selected randomly based on the image's height and width.
 *
 * @name crop
 * @type jQuery
 * @param Number x co-ordinate to start crop
 * @param Number y co-ordinate to start crop
 * @param Number height of final cropped image
 * @param Number width of final cropped image
 * @cat Plugin
 */
jQuery.fn.crop = function(x, y, height, width, transparentURL) {
	var o = {}
	
	if (x && typeof x == 'object') { // property object
		o['x'] = x['x'] || -1;
		o['y'] = x['y'] || -1;
		o['height'] = ((x['height'] || x['width']) || -1);
		o['width'] = x['width'] || x['height'] || -1;
		
		// note: this *will not* work in IE.
		o['transparentURL'] = x['transparentURL'] || "data:image/gif;base64,R0lGODlhAQABAIAAAMJ0IgAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
	} else if (arguments.length == 1) {
		o['x'] = -1;
		o['y'] = -1;
		o['height'] = x;
		o['width'] = x;
	} else if (arguments.length == 2) {
		o['x'] = -1;
		o['y'] = -1;
		o['height'] = x;
		o['width'] = y;
	} else {
		o['x'] = x;
		o['y'] = y;
		o['height'] = height;
		o['width'] = width || height;
		o['transparentURL'] = transparentURL;
	}
				
	return this.each(function() {
		var x = o.x;
		var y = o.y;
		var t = jQuery(this);
		
		if (o.x == -1) {
			x = Math.round((this.width - o.width + 1) * Math.random())
			if (this.width - x < o.width) x = 0;
		}
		if (o.y == -1) {
			y = Math.round((this.height - o.height + 1) * Math.random())
			if (this.height - y < o.height) y = 0;
		}

		t.height(o.height + 'px');
		t.width(o.width + 'px');
		
		var background = { 
			height: o.height + 'px', 
			width: o.width + 'px', 
			background: 'url(' + this.src + ') no-repeat -' + Math.abs(x) + 'px -' + Math.abs(y) + 'px' 
		};
		
		this.origSrc = this.src;
		this.src = o['transparentURL']; // transparent gif to fill image
		
		t.css(background); // crop!
	})
}