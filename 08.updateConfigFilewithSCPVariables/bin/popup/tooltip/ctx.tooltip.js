
var ctxTooltip = (function () {
   var self = {
      /** Sends an event to Contextor project
      * @method send
      * @param {string} event event name
      * @param {*} [data] optional data 
      * @return {string} result
      */
      send : function (event, data, item) {
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
