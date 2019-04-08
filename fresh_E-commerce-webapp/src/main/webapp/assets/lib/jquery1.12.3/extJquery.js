$.extend({
	validFormatter_Sys:function(value, row, index) {
		if(row.delFlag) {return '<i class="fa fa-times text-danger"></i>';}
		else {return '<i class="fa fa-check text-navy"></i>';}
	}
});