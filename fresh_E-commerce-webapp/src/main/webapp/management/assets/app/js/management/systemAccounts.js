

jQuery(function(){

	$(document).on("ajax:success",".btn-delete",function(event,data, status, xhr){
		if(data.success){
			flash("success", "删除成功!");
			$(this).parents("tr").remove();//删除所在行
		}else {
			flash("error", data.message);
		}
	});

	/**
	 * 重置密码
	 */
	$(".btn-resetPassword").on("click",function(){
		var url=$(this).attr("data-url");
		$.get(url,function(data){
			flash(data.level,data.message);
		});
	});
	/**
	 * 锁定账号
	 */
	$(".btn-lock").on("click",function(){
		var url=$(this).data("url");
		var btn=$(this);
		var action=true;
		if(btn.text()=="锁定"){
			action=true;
		}
		if(btn.text()=="解锁"){
			action=false;
		}
		$.post(url,{isLock:action},function(data){
			$tr=btn.parents("tr");
			//修改按钮样式
			if(data.success){
				if(action){//被锁住成功
					btn.removeClass("btn-danger").addClass("btn-success");
					$tr.addClass("warning");
					$tr.find("td.isLock").html("<span class='label label-danger'>已锁定 <i class='ace-icon fa fa-lock'></i> </span>");
					btn.text("解锁");
				}else{//被解锁成功
					btn.removeClass("btn-success").addClass("btn-danger");
					$tr.removeClass("warning");
					btn.text("锁定");
					$tr.find("td.isLock").html("<span class='label label-success'>未锁定 <i class='ace-icon fa fa-unlock'></i> </span>");
				}
			}
			flash(data.level,data.message);
		});
	});
	
	/**
	 * 上传头像
	 */
	if(springstage && springstage.fileupload){
		springstage.fileupload({
			pick:".picker",
			fileNumLimit:1,
			queueSize:1
		});
	}

	/**
	 * 表单提交
	 */
	$(document).on("submit","form",function(){
		//console.log(springstage.fileupload.getHiddenInput());
		//console.log(springstage.fileupload.getJsonData());
		if(springstage.fileupload.getHiddenInput()){
			var $form_input_data=springstage.fileupload.getHiddenInput();
			$("#"+$form_input_data.prop("id")).remove();
			$(this).append($form_input_data);
			return true;
		}
		return false;
	});
	
	//弹出框全选
	$(document).on("click",".select_all",function(){
		$(".role").prop("checked",$(this).prop("checked"));
	});
	//表单提交处理
	$(document).on("ajax:success","#roleForm",function(event,data, status, xhr){
		var buildNode=function(){
			return $("<span class='label label-success label-white middle'></span>");
		}
		if(data.success){
			flash("success", "分配角色成功");
			$("#modal-ajax").modal('hide'); //隐藏窗体
			var $td=$("#role-"+data.content.id).empty();
			$.each(data.content.roles,function(i,el){
				buildNode().text(el.name).appendTo($td);
			});
		}
	});
	
	$("#systemAccount_form input[type='radio']").on("click",function(){
		var $select=$("#systemAccount_form select");
		
		if($(this).val()=='OPERATORS'){
			$select.parents(".form-group").hide();
			$select.prop("disabled",true);
		}else{
			$select.parents(".form-group").show();
			$select.prop("disabled",false);
		}
	});

});