
jQuery(function(){
	$(document).on("ajax:success",".btn-delete",function(event,data, status, xhr){
		if(data.success){
			flash("success", "删除成功!");
			$("#role-"+data.content).remove();
		}else {
			flash("error", data.message);
		}
	});
	
});