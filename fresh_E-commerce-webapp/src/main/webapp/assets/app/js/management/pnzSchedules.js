
$(function() {
	$(document).on("delete:success","a.btn-delete",function(event,data){

	});

//	// 日期选择控件 http://eonasdan.github.io/bootstrap-datetimepicker/
	var dateTimePickerConfig={
		sideBySide:true,
		format: 'YYYY-MM-DD HH:mm',
		showClose:true
	};
	$("#endTime").on('focus',function(e){
		jQuery(this).datetimepicker(dateTimePickerConfig);
	});
	$("#startTime").on('focus',function(e){
		jQuery(this).datetimepicker(dateTimePickerConfig)
			.data("DateTimePicker").minDate(new Date());
	}).on("dp.hide",function(e){
		$('#endTime').datetimepicker(dateTimePickerConfig).data("DateTimePicker").minDate(e.date);
	});
 });