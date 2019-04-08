
$(function() {
	$(document).on("ajax:success",".btn-audit,.btn-refund,.btn-delivery",function(event,data){
		window.flash(data.level, data.message);
		if(data.success) {
			setTimeout(function () {
				window.location.reload();
			}, 1500);
		}else{
			setTimeout(function () {
				window.location.reload();
			}, 1500);
		}
	});

	$(document).on("ajax:success",".btn-close-table,.btn-audit-table,.btn-refund-table,.btn-delivery-table",function(event,data){
		if(data.success) {
			window.flash(data.level, data.message);
		}
		//更新表格
		var pageIndex = $(".pagination li.active a:first").text();
		window.springstage.reloadTable({ //重新加载表格数据
			"page.pn": pageIndex
		}, false);
	});

 });