/**
 * @author tangkun
 * 
 * (
 * Extend from $.fn.window.defaults. Override defaults with $.fn._winHelper.defaults.
 * )
 * API
 * 
 * 
 * Properties
 * ***************************************************************
 * 
 * Events
 * ***************************************************************
 * 
 * Methods
 * ***************************************************************
 * 方法                          参数                         描述
 * 1、openDialog               options                      打开窗体
 * 2、closeDialog              options                      关闭窗体
 * 
 *  
 */
(function($){
	var defaultOptions = {
		title:"",
		width:500,
	    height:400,
	    modal:true,
	    minimizable:false,
	    maximizable:false,
	    collapsible:false,
	    maximized:false,
	    onClose:function(){}
	}; 
	function openDialog(target,options){
		var settings=$.extend(defaultOptions,options);
		var $iframe;
		var $div=$(target);
		$iframe=$("<iframe/>").attr({
			"frameborder":"0",
			"style":"width:100%;height:98%;",
			"scrolling":"no"
		});
		$div.append($iframe); 
		url=$._basePath()+settings.url+(settings.url.indexOf("?")>=0?"&":"?")+"_time="+$.times();
		settings.onOpen=function(){
			$iframe.attr("src",url);
		};
		$div.window(settings);
	};
	function closeDialog(target,options){
		$(target).window('close');
	};
	
	
	$.fn._winHelper = function(options, param){
		if (typeof options == 'string'){
			if($.fn._winHelper.methods[options]!=undefined)
				return $.fn._winHelper.methods[options](this, param);
		}
	};
	$.fn._uiHelper.methods = {
		openDialog : function(jq,param){
			openDialog(jq[0],param)
		},
		closeDialog : function(jq,param){
			closeDialog(jq[0],param)
		}
	}
})(jQuery)