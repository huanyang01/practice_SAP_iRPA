
ctx.types.accordion = {
	name: 'accordion',
	tag: 'div',
	attributes: {
	},
	initItem: function (item) {
		item.attributes['class'] = item.attributes['class'] || '';
		item.attributes['class'] += ' nav';
		if (item.style !== undefined) {
			item.attributes['class'] += ' nav-' + item.style + 's';
		}
		if (item.items ) {
			item.children = [];
			for (var id in item.items) {
				var child = "<li class=\"tab" + ( item.items[id].active ? " active in " : "") + "\"><a href=\"#" + id + "\"" + (item.style ? " data-toggle=\"" + item.style + "\"" : "") + ">" + item.items[id].value + "</a></li>";
				item.children.push(child);
			}
			var nextNode = '<div class="tab-content">';
			for (var id in item.items) {
				nextNode += "<div class=\"tab-pane fade" + ( item.items[id].active ? " active" : "") + "\" id= \"" + id  + "\">" + item.items[id].content + "</div>";
			}
			nextNode += '</div>';
			item.nextSiblings.push(nextNode);
		}
	}
}

ctx.types.breadcrumb = {
	model: '\
<ol class="breadcrumb">\
  {{#each nodes}}\
  <li {{#if class}}class="{{class}}"{{/if}}><a id="{{id}}" href="javascript:void(0);">{{#if icon}}<span class="glyphicon glyphicon-{{icon}}"></span>{{/if}}{{text}}</a></li>\
  {{/each}}\
</ol>'
}

ctx.types.button = {
	model: '<button {{#if disabled}}disabled="disabled"{{/if}} class="btn {{#if style}} btn-{{style}} {{/if}} {{#if size}} btn-{{size}} {{/if}} {{#if width}}  col-xs-{{width}} {{/if}} {{class}}" id="{{id}}" type="button">\
		{{#if icon}}<span class="glyphicon glyphicon-{{icon}} "></span>{{/if}} {{value}}{{text}}{{label}} {{#if badge}}<span class="badge"> {{badge}}</span>{{/if}}\
		</button>',
}

ctx.types.collapsedMenu = {
	name: 'collapsedMenu',
	model: '\
<div id="{{id}}_content">\
	<li {{#if id}} id="{{id}}" {{/if}} data-toggle="collapse" data-target="#{{id}}_menu" class="collapsed active">\
		<a >{{#if icon}}<i class="glyphicon glyphicon-{{icon}} fa-lg"></i>{{/if}} {{text}} {{#if nodes}}<span class="arrow"></span>{{/if}}</a>\
	</li>\
	<ul class="sub-menu collapse" id="{{id}}_menu">\
	{{#each  nodes}}\
		<li {{#if id}} id="{{id}}" {{/if}} {{#if class}} class="{{class}}" {{/if}}>{{#if icon}}<i class="glyphicon glyphicon-{{icon}} fa-lg"></i>{{/if}}  {{text}}</li>\
	{{/each}}\
	</ul>\
</div>'
}

ctx.types.datatable = {
	name: 'datatable',
	tag: 'table',
	attributes: {
		"class" : "display cell-border table-hover table-striped table-bordered", 
		"cellspacing" : "0", 
		"width" : "100%"
	},	
	options: {
		//info: false,
		paging: false,
		ordering: false,
		//autoWidth: false,
		//scrollY: "100px",
		//scrollCollapse: true,
		searching: false,
		initComplete: function () {
			this.api().columns().every( function () {
				var column = this;
				var select = $('<select><option value=""></option></select>')
					.appendTo( $(column.footer()).empty() )
					.on( 'change', function () {
						var val = $.fn.dataTable.util.escapeRegex(
							$(this).val()
						);
						column
							.search( val ? '^'+val+'$' : '', true, false )
							.draw();
					} );
				column.data().unique().sort().each( function ( d, j ) {
					select.append( '<option value="'+d+'">'+d+'</option>' )
				} );
			} );
		}
	},
	initItem: function (item) {
		item.get = function(iRow, iCol) {
			// todo
		}
		item.getAll = function() {
			// todo
		}
		item.refresh = function() {
			if (!item.object) {
				var jQobj = (item.element ? $(item.element) : $('#' + item.id));
				item.object = jQobj.DataTable( item.options );
			} else {
				// reinint data source
			    item.object.clear();
				if (item.data) { item.object.rows.add(item.data); }
			    item.object.draw();
			}
		}
		item.set = function(value, iRow, iCol) {
			// todo
		}
		item.setAll = function(data) {
			// todo
			if (data) { item.data = data; }
			item.refresh();
		}
		item.sort = function(index, orderBy) {
			if (item.object) {
				index = index || 0;
				orderBy = orderBy || 'asc';
				var data = item.object.order( [ index, orderBy ] ).draw();
			}
		}
		item.refresh();
	}
}

ctx.types.img = {
	name: 'img',
	tag: 'img',
	attributes: {
	},
	initItem: function (item) {
		var options = item.options;
	}
}

ctx.types.input = {
	model: '\
<div id="{{id}}_content" class="form-group">\
{{#if label}}<label for="{{id}}">{{label}}</label>{{/if}}\
	<input id="{{id}}" class="bootbox-input bootbox-input-{{#if format}}{{format}}{{else}}text{{/if}} form-control" type="{{#if format}}{{format}}{{else}}text{{/if}}"></input>\
</div>\
'
};

ctx.types.password = {
	model: ctx.types.input,
	options: {
		format: 'password'
	}
};

ctx.types.email = {
	model: ctx.types.input,
	options: {
		format: 'email'
	}
};

ctx.types.text = {
	model: ctx.types.input,
	options: {
		format: 'text'
	}
};

ctx.types.url = {
	model: ctx.types.input,
	options: {
		format: 'url'
	}
};

ctx.types.number = {
	model: ctx.types.input,
	options: {
		format: 'number'
	}
};

ctx.types.label = {
	model: '{{#if size}}<h{{size}}>{{/if}}<span id="{{id}}" class="label {{#if style}}label-{{style}}{{/if}}">{{#if icon}}<span class="glyphicon glyphicon-{{icon}}"></span>{{/if}} {{value}}{{text}}{{label}} {{#if badge}}<span class="badge">{{badge}}</span>{{/if}}</span>{{#if size}}</h{{size}}>{{/if}}'
}

ctx.types.list = {
	model: '\
{{#if title}}\
	<div id="{{id}}_content" class="panel-group">\
    <div class="panel panel-default">\
      <div class="panel-heading">\
        <h4 class="panel-title">\
          <a data-toggle="collapse" href="#{{id}}_panel">{{title}}</a>\
        </h4>\
      </div>\
      <div id="{{id}}_panel" class="panel-collapse collapse">\
{{/if}}\
<ul id="{{id}}" class="list-group">\
{{#each nodes}}\
	<a href="javascript:void(0);" id="{{id}}" class="list-group-item{{#if style}} list-group-item-{{style}}{{/if}}{{#if class}} {{class}}{{/if}}">{{#if icon}}<span class="glyphicon glyphicon-{{icon}}"></span>{{/if}} {{{text}}} {{#if badge}}<span class="badge">{{badge}}</span>{{/if}}</a>\
{{/each}}\
{{#if footer}}<div class="panel-footer">{{{footer}}}</div>{{/if}}\
</ul>\
{{#if title}}\
      </div>\
    </div>\
  </div>\
{{/if}}\
'
}

ctx.types.menu = {
	model: '\
<ul id="{{id}}" class="list-inline">\
{{#each nodes}}\
	<a href="javascript:void(0);" id="{{id}}" class="list-group-item{{#if style}} list-group-item-{{style}}{{/if}}{{#if class}} {{class}}{{/if}}">{{#if icon}}<span class="glyphicon glyphicon-{{icon}}"></span>{{/if}} {{{text}}} {{#if badge}}<span class="badge">{{badge}}</span>{{/if}}</a>\
{{/each}}\
</ul>\
'
}

ctx.types.nav = {
	//name: 'nav',
	style: 'tab',
	tag: 'ul',
	attributes: {
	},
	initItem: function (item) {
		item.attributes['class'] = item.attributes['class'] || '';
		item.attributes['class'] += ' nav';
		if (item.style !== undefined) {
			item.attributes['class'] += ' nav-' + item.style + 's';
		}
		if (item.items ) {
			item.children = [];
			for (var id in item.items) {
				var child = "<li class=\"tab" + ( item.items[id].active ? " active in " : "") + "\"><a href=\"#" + id + "\"" + (item.style ? " data-toggle=\"" + item.style + "\"" : "") + ">" + item.items[id].value + "</a></li>";
				item.children.push(child);
			}
			var nextNode = '<div class="tab-content">';
			for (var id in item.items) {
				nextNode += "<div class=\"tab-pane fade" + ( item.items[id].active ? " active" : "") + "\" id= \"" + id  + "\">" + item.items[id].content + "</div>";
			}
			nextNode += '</div>';
			item.nextSiblings.push(nextNode);
		}
	}
}

ctx.types.pager = {
	model: '\
<ul id="{{id}}" class="pager {{#if class}}{{class}}{{/if}}">\
  {{#each nodes}}\
  <li {{#if class}}class="{{class}}"{{/if}}><a id="{{id}}" href="javascript:void(0);">{{#if icon}}<span class="glyphicon glyphicon-{{icon}}"></span>{{/if}} {{text}} {{#if badge}}<span class="badge">{{badge}}</span>{{/if}}</a></li>\
  {{/each}}\
</ul>\
'
}

ctx.types.pagination = {
	model: '\
<ul id="{{id}}" class="pagination {{#if class}}{{class}}{{/if}} {{#if right}}pull-right{{/if}}">\
  {{#each nodes}}\
  <li data-toggle="tab" {{#if class}}class="{{class}}"{{/if}}><a id="{{id}}" href="javascript:void(0);">{{#if icon}}<span class="glyphicon glyphicon-{{icon}}"></span>{{/if}} {{text}} {{#if badge}}<span class="badge">{{badge}}</span>{{/if}}</a></li>\
  {{/each}}\
</ul>\
'
}

ctx.types.progress = {
	model: '\
<div id="{{id}}" class="progress">\
	<div class="progress-bar {{#if style}}progress-bar-{{style}}{{/if}}" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="100" style="width:{{value}}%">{{text}}</div>\
</div>'
}

ctx.types.select = {
	name: 'select',
	model: '\
<div id="{{id}}_content" >\
	{{#if label}}<label for="{{id}}"> {{label}} </label>{{/if}}\
	<select {{#if multiple}}multiple{{/if}} name="{{id}}" class="form-control selectpicker" id="{{id}}" data-bv-field="{{id}}">\
	{{#each  nodes}}\
		<option {{#if id}} value="{{id}}" {{/if}}{{#if class}} class="{{class}}" {{/if}}>{{text}}</option>\
	{{/each}}\
	</select>\
</div>'
}

ctx.types.table = {
	name: 'table',
	model: '\
<div id="{{id}}_content" class="panel {{#if style}}panel-{{style}} {{/if}}">\
	<div class="panel-heading">\
	<h3 class="panel-title">{{text}}</h3>\
		{{#if filter}}\
		<div class="pull-right">\
			<span title="" class="clickable filter" data-original-title="Toggle table filter" data-toggle="tooltip" data-container="body">\
				<i class="glyphicon glyphicon-filter"></i>\
			</span>\
		</div>\
		{{/if}}\
	</div>\
	{{#if filter}}\
	<div class="panel-body">\
		<input class="form-control" id="{{id}}_filter" type="text" placeholder="Filter" data-filters="#{{id}}" data-action="filter">\
	</div>\
	{{/if}}\
	<table class="table table-hover" id="{{id}}">\
		{{#if columns}}\
		<thead><tr>\
		{{#each columns}}\
			<th>{{{text}}}</th>\
		{{/each}}\
		</tr></thead>\
		{{/if}}\
		{{#if columns}}\
		<tbody>\
		{{#each data}}\
		<tr>\
		  {{#each this}}\
			<td>{{{this}}}</td>\
		  {{/each}}\
		</tr>\
		{{/each}}\
		<tr>\
		</tbody>\
		{{/if}}\
	</table>\
</div>',
	initItem: function (item, params) {		
		item.get = function(iRow, iCol) {
			var res = '';
			if ((iRow === undefined) || (iCol === undefined)) {
				res = item.getAll();
			} else {
				// TODO...
			}
			return res;
		};
		item.getAll = function() {
			// TODO...
		};
		item.set = function(value, iRow, iCol) {
			if ((iRow === undefined) || (iCol === undefined)) {
				item.setAll(value);
			} else {
				// TODO...
			}
		};
		item.setAll = function(data) {
			if (data && typeof data === 'object') item.data = data;
			ctx.itemRefresh(item);
		};
	}
}

ctx.types.textarea = {
	name: 'textarea',
	tag: 'textarea',
	attributes: {
	},
	initItem: function (item) {
		item.attributes['class'] = item.attributes['class'] || '';
		item.attributes['class'] += ' form-control';
		if (item.rows !== undefined) {
			item.attributes.rows = item.rows;
		}
		if (item.disabled !== undefined) {
			item.attributes.disabled = item.disabled;
		}
		if (item.value !== undefined) {
			var child = " " + item.value + " ";
			delete item.value;
			item.children.push(child);
		}
	}
}

ctx.types.tile = {
	name: 'tile',
	model: '\
<div id="{{id}}" class="tile">\
	<div class="carousel slide" data-ride="carousel">\
		<div class="carousel-inner">\
			{{#each nodes}}\
			<div class="item {{#if @first}} active {{/if}}">\
				<img src="{{src}}" class="img-responsive"/>\
			</div>\
			{{/each}}\
		</div>\
	</div>\
</div>'
}

ctx.types.treeview = {
	name: 'treeview',
	tag: 'div',
	options: {
		showTags: true
	},
	initItem: function (item) {
		item.getAll = function() {
			// todo
		}
		item.refresh = function() {
			//var obj = ctx.initRefresh(item);
			//var jQobj = (item.element ? $(item.element) : $('#' + item.id));
			//jQobj.treeview( obj );
			var jQobj = (item.element ? $(item.element) : $('#' + item.id));
			jQobj.treeview( item.options );
		}
		item.setAll = function(data) {
			// todo
			if (data) item.data = data;
			item.refresh();
		}
		item.refresh();
	}
}

