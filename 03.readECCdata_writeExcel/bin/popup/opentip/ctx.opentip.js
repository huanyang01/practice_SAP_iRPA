var ctxTooltip = (function () {
	var self = {
	  map : []
	};
	/** Sends an event to Contextor project
	* @method send
	* @param {string} event event name
	* @param {*} [data] optional data 
	* @return {string} result
	*/
	self.send = function (event, data, item) {
	 //event = event || _eventName;
	 item = item || "";
	 var res = '';
	 try {
		//_init();
		var strData = '';
		if (data && (typeof data === 'object') && JSON && JSON.stringify)
		   strData = '!json:' + JSON.stringify(data);
		else if (typeof data === 'string')
		   strData = data;
		if (Contextor && (typeof Contextor.Event != "undefined")) {
		   res = Contextor.Event(event, "", "", item, -1, -1, strData);
		}
	 }
	 catch (e) {
		//alert(e.description);
	 }
	 return res;
	}

	self.create = function(local, options) {
		if (self.map[local.id]) {
		 delete self.map[local.id];
		}

		options = options || {};
		self.map[local.id] = new Opentip("#" + local.targetId, local.content, local.title, options);
		self.setContent(local, options);

		jQuery('#' + local.id).click(function (e) {
		  e.preventDefault();
		  if( jQuery('.opentip-container').length ) { 
			self.map[local.id].hide(); 
		  } else { 
			self.map[local.id].show(); 
		  }
		});

		jQuery('body').on('click', function (e) {
		 jQuery('.opentip-container').each(function () {
			// hide any open popovers when the anywhere else in the body is clicked
			if (!jQuery(this).is(e.target) && jQuery(this).has(e.target).length === 0 && !jQuery("#" + local.targetId).is(e.target)  ) {
			   self.map[local.id].hide();
			}
		 });
		});
	};

	self.setContent = function(local, options) {
		var txt = local.content || "";
		if ((!local.content) && local.helpId) {
			try {
				txt = document.getElementById(local.helpId).outerHTML
			} catch (ex) {}
		}
		self.map[local.id].setContent(txt); 
	}

	return self;
})();

jQuery(function() {
	setTimeout(function(){ 
		if (!jQuery("a.ctx_link").attr('href')) jQuery("a.ctx_link").attr('href', 'javascript:void(0)');
	}, 1000);
});

jQuery(document).on('click', ".ctx_link", function() {
	var helpId = jQuery( this ).parents( ".ot-content" ).children().first().attr('id') || jQuery( this ).parents( ".tooltipster-content" ).children().first().attr('id');
	var id = jQuery(this).attr('id') || jQuery(this).attr('name');
	ctxTooltip.send('evTooltipClick', id, helpId);
});

