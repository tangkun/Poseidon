/**
 * @author tangkun
 * 
 * (
 * Extend from $.method. Override defaults with _ajax/_checkAuth/_getAcAuth.
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
 * 1、_ajax                   options                      AJAX请求
 * 2、_checkAuth              AllACData,ac                 验证功能点权限
 * 3、_getAcAuth              function					   获取功能点
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
		maskid:null,
		callBack:null
	}; 
	function _beforeSend(XMLHttpRequest,options){
		if($.valid(options.maskid))
			$("#"+options.maskid).mask($._config("Mask","text"));
	};
	function _success(ret,data,options){		
		var result = $.extend(defaultSuccessJosn, ret);
		if(result && result[defaultSuccessJosn.isout])
			_sessionOut();
		if($.valid(options.maskid))
			$("#"+options.maskid).unmask(); 
		if($.isFunction(options.callBack)){
			options.callBack(result,data);
		}
	};
	function _error(XMLHttpRequest, textStatus, errorThrown,options){
		if($.valid(options.maskid))
			$("#"+options.maskid).unmask(); 
		if($.isFunction(options.callBack)){
			options.callBack({errorMsg:"操作失败！["+errorThrown+"]"});
		}
	};
	function _sessionOut(){
		window.top.location.href=$._config("Login","login");
	};
	$._ajax = function(options,target){
		var settings = $.extend(defaultOptions, options);
		if(settings.url==null || settings.url==""){
			alert("请传递URL!");
			return;
		};
		settings.url=$._basePath()+settings.url;
		var method={
			beforeSend:function(XMLHttpRequest){
				 if($.isFunction(options.beforeSend))
					 options.beforeSend(XMLHttpRequest,target,options);	
				 else
					 _beforeSend(XMLHttpRequest,settings);
			},
			success:function(result,data){
				if($.isFunction(options.success))
					 options.success(result,data,target,options);
				else
					_success(result,data,settings);
				if($.isFunction(settings.callBack))
					settings.callBack(result,data);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				if($.isFunction(options.error))
					 options.error(XMLHttpRequest, textStatus, errorThrown,target,options);
				else
					_error(XMLHttpRequest, textStatus, errorThrown,settings);
			}
		}
		var set = $.extend(settings, method);
		$.ajax(set);
	};
	$._checkAuth = function(AllACData,ac){
		if(ac=="*")
			return true;
		if(ac && AllACData && $.isArray(AllACData)){
			 var acs = ac.split(',');
			 for(var j=0;j<acs.length;j++){
				 var _ac=acs[j];
				 for(var i=0;i<AllACData.length;i++){
						if(AllACData[i]==_ac)
							return true;
					}
			 }
		}
		 
		return false;
	};
	$._getAcAuth = function(callBack){
		var AllACData= $(document.body).data("AllACData");
		if(!AllACData){
			$._ajax({
				url:"getAcAuth",
				callBack:function(result,data){
					AllACData=result; 
					$(document.body).data("AllACData", result);
				},
				async:false
			});
		}
		if($.isFunction(callBack)){
			callBack(AllACData);
		}
	};
})(jQuery);