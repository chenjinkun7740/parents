
$(function() {
	$(document).on("ajax:success",".btn-delete",function(event,data, status, xhr){
		if(data.success){
			flash("success", "删除成功!");
			$(this).parents("tr").remove();//删除所在行
		}else {
			flash("error", data.message);
		}
	});


	/**
	 * 上传商品图片
	 */
	if(springstage && springstage.fileupload){
		springstage.fileupload({
			pick:".picker",
			fileNumLimit:5,
			queueSize:5
		});
	}


	if($("#treeDom")!=null && $("#treeDom").length>0){
		var nodes = [
			{id:0, goodsctename:"所有类别", goodscteParentId:-1, open:true}
		];
		var json = $(".ztreeData").text();
		var data = JSON.parse(json);
		if(data && data.length>0){
			nodes = nodes.concat(data);
		}

		var settings = {
			data: {
				simpleData: {
					enable: true,
					idKey:'id',
					pIdKey:'goodscteParentId'
				},
				key:{
					name:'goodsctename'
				}
			},
			callback:{
				onClick:function(event, treeId, treeNode){
					if(!treeNode.isParent){
						$("#categoryId").val(treeNode.id);
						$("#searchform").submit();
					}else{
						$("#categoryId").val("");
					}
				}

			}
		};

		var treeObj = $.fn.zTree.init($("#treeDom"), settings, nodes);

		if($("#categoryId").val()){
			var currNode = treeObj.getNodeByParam("id", $("#categoryId").val());
			if(currNode){
				treeObj.selectNode(currNode);
			}
		}
	}


	/**
	 * 表单页面专用
     */
	if($("#pnzGoodForm").length>0){
		//富文本
		KindEditor.ready(function(K){
			window.editor = K.create("#detail", {
				filterMode : true,
				items:springstage.kindEditorItems,
				uploadJson : '/management/image/editorUpload'
			});
		});


		//切换部门 (1-品农, 2-品质)
		$(document).on("change", "#dep", function(){
			var cur = $(this);
			//商品分类
			var spfl_con = $(".spfl_con");
			var pnzCategory_pn = $(".pnzCategory_pn");
			var pnzCategory_pz = $(".pnzCategory_pz");
			//运营归类
			var yygl_con = $(".yygl_con");
			var yygl_pn = $(".yygl_pn");
			var yygl_pz = $(".yygl_pz");


			if(cur.val()=="1"){
				//品农
				//商品分类处理
				spfl_con.removeClass("hide");
				pnzCategory_pn.removeAttr("disabled").removeClass("hide");
				pnzCategory_pz.attr("disabled", "disabled").addClass("hide");

				//运营分类处理
				yygl_con.removeClass("hide");
				yygl_pn.removeClass("hide").find(".yygl_ra").removeAttr("disabled");
				yygl_pz.addClass("hide").find(".yygl_ra").attr("disabled", "disabled");
			}else if(cur.val()=="2"){
				//品质
				//商品分类处理
				spfl_con.removeClass("hide");
				pnzCategory_pz.removeAttr("disabled").removeClass("hide");
				pnzCategory_pn.attr("disabled", "disabled").addClass("hide");

				//运营分类处理
				yygl_con.removeClass("hide");
				yygl_pz.removeClass("hide").find(".yygl_ra").removeAttr("disabled");
				yygl_pn.addClass("hide").find(".yygl_ra").attr("disabled", "disabled");
			}else{
				//商品分类处理
				spfl_con.addClass("hide");
				pnzCategory_pn.attr("disabled", "disabled").addClass("hide");
				pnzCategory_pz.attr("disabled", "disabled").addClass("hide");

				//运营分类处理
				yygl_con.addClass("hide");
				yygl_pn.addClass("hide").find(".yygl_ra").attr("disabled", "disabled");
				yygl_pz.addClass("hide").find(".yygl_ra").attr("disabled", "disabled");
			}
		});



		//数据提交
		$(document).on("submit","#pnzGoodForm",function(){
			if(!vlDept() || !vlGoodStatue()){
				return false;
			}


			window.editor.sync();
			if(springstage.fileupload.getHiddenInput()){
				var $form_input_data=springstage.fileupload.getHiddenInput();
				$("#"+$form_input_data.prop("id")).remove();
				$(this).append($form_input_data);
				return true;
			}

			return false;
		});
	}
	
 });


//验证部门选择
function vlDept(){
	var rv = false;
	var obj = $("#dep");

	if(obj.val()!=""){
		rv = true;
	}else{
		alert("请选择公司");
	}
	return rv;
}

//验证商品状态选择
function vlGoodStatue(){
	var rv = false;
	var obj = $("#statusLine");

	if(obj.val()!=""){
		rv = true;
	}else{
		alert("请选择商品状态");
	}
	return rv;
}