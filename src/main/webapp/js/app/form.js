/**
 * @author tangkun
 * 
 * (
 * Extend from $.fn.defaults. Override defaults with $.fn._form.defaults.
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
 * 1、post                   options                      AJAX请求
 * 2、_checkAuth              AllACData,ac                 验证功能点权限
 * 3、_getAcAuth              function					  获取功能点
 * 
 *  
 */
(function($){
	var defaultSuccessJosn = {
		successful:false,
		code:-1,
		errorMsg:null,
		data:null,
		isout:false
	};
	var defaultOptions = {
		type:$._config("Ajax","type"), 
		dataType:$._config("Ajax","dataType"), 
		async:true,
		url:null,
		data:null,
		isValidate:true, 
		title:null,
		showMsg:false,
		maskid:null,
		beforeSend:function(XMLHttpRequest){},
		success:function(result,data){},
		error:function(XMLHttpRequest, textStatus, errorThrown){},
		callBack:function(result,data){}
	}; 
	function _beforeSend(XMLHttpRequest,target,options){
		if($.valid(options.maskid))
			$("#"+options.maskid).mask($._config("Mask","text"));  
	};
	function _success(ret,data,target,options){
		var result = $.extend(defaultSuccessJosn, ret);
		if(result && result.isout)
			_sessionOut();
		if($.valid(options.maskid))
			$("#"+options.maskid).unmask(); 
		if(options.showMsg)
			_showMsg(ret);
		if($.isFunction(options.callBack)){
			options.callBack(result,data);
		}
	};
	function _error(XMLHttpRequest, textStatus, errorThrown,target,options){
		if($.valid(options.maskid))
			$("#"+options.maskid).unmask(); 
		if($.isFunction(options.callBack)){
			options.callBack({errorMsg:"操作失败！["+errorThrown+"]"});
		}
	};
	function _showMsg(result){
		if(result && result[defaultSuccessJosn.errorMsg]){
			$.messager.alert("信息", result[defaultSuccessJosn.errorMsg]);			
		}
	};
	function _sessionOut(){
		window.top.location.href=$._config("Login","login");
	}; 
	function post(target, options){	
		defaultOptions.beforeSend = _beforeSend;
		defaultOptions.success = _success;
		defaultOptions.error = _error;
		var settings = $.extend(defaultOptions, options);
		if(settings.formIsValidate && !$form.form("validate"))
			return; 
		 
		if($.valid(settings.data))
			settings.data = $(target).serializeObject();
		if($.valid(settings.maskid))
			settings.maskid = $(target).attr("id");
		$._ajax(settings,target);  
	};	
	$.fn._form = function(options, param){
		if (typeof options == 'string'){
			if($.fn._form.methods[options]!=undefined)
				return $.fn._form.methods[options](this, param);
		}
	};
	$.fn._form.methods = {
		post : function(jq,options){
			if($.valid(options.title)){
				$.messager.confirm('信息',options.title,function(r){
				    if (r)
				    	post(jq[0],options);
				});
			}else{
				post(jq[0],options);
			}
		}
	}; 	
})(jQuery);