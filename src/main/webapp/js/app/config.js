/**
 * @author tangkun
 * 
 * (
 * Extend from $.method. Override defaults with _config.
 * )
 * API
 * 
 * 
 * Properties
 * ***************************************************************
 * 1、Login
 * 2、SearchConditions
 * 3、DataGrid
 * 4、Pagination
 * 5、Ajax
 * 6、Mask
 * 7、Date
 * 8、Combobox
 * 9、Zquery
 * 10、OpenDiv
 * 11、Number
 * 
 * Events
 * ***************************************************************
 * 
 * Methods
 * ***************************************************************
 * 方法                          参数                         描述
 * 1、_config                   opt1,opt2,opt3              获取参数配置 
 * 
 *  
 */
(function($){
	var configSttings={
			/**
			 * 默认登录页面配置定义
			 */
			Login:{
				"login":$._basePath()+"logout"
			},
			/**
			 * 页面查询区域配置定义
			 */
			SearchConditions:{
				/**
				 * 查询区域支持类型定义
				 */
				"type":{
					"text":"text",
					"autocomplete":"autocomplete",
					"datebox":"datebox",
					"combobox":"combobox",
					"separated":"separated"
					,"checkbox":"checkbox"
				},
				/**
				 * 默认查询区域 ID
				 */
				"searchBoxId":"searchBox",
				/**
				 * 查询区域查询 BUTTON ID
				 */
				"searchButtonId":"searchButtonId",
				/**
				 * 查询区域清空 BUTTON ID
				 */
				"clearButtonId":"clearButtonId",
				/**
				 * 查询区域清空 FORM ID
				 */
				"searchFormId":"searchFormId"
			},
			/**
			 * DataGrid配置定义
			 */
			DataGrid:{
				/**
				 * 默认DataGrid ID
				 */
				"mainTableId":"mainTable"
			},
			/**
			 * 分页区域配置定义
			 */
			Pagination:{
				"pageSize":20
			},		
			/**
			 * AJAX配置定义
			 */
			Ajax:{
				"timeout":6000,
				"type":"POST",
				"dataType":"json"
			},
			/**
			 * MASK-LOAING配置定义
			 */
			Mask:{
				"text":"Loading…"
			},
			/**
			 * 日期配置
			 */
			Date:{
				/**
				 * 默认日期格式
				 */
				"format":"yyyy-MM-dd HH:mm"
			},
			/**
			 * commbox 配置
			 */
			Combobox:{
				"valueField":"value",
	           	"textField":"text"
			},
			/**
			 * Zquery埋点
			 */
			Zquery:{
				/**
				 * @关键字搜索 key
				 */
				"searchKey":"66f4cd6b-f03f-4081-9d29-7293da5f53aa",
				/**
				 * @转化率 key
				 */
				"translate":"97275884-ecae-4683-91a3-dc81c0d07611"
			},
			OpenDiv:{
				"id":"openDialogDivIdForSelf"
			},
			Number:{
				"moneyPoint":"2",
				"quantityPoint":"3"
			}
	};
	function _getConfig(arguments){
		var argLen=arguments.length;
		if(1==argLen)
			return _getConfig0(arguments[0]);
		else if(2==argLen)
			return _getConfig1(arguments[0],arguments[1]);
		else if(3==argLen)
			return _getConfig2(arguments[0],arguments[1],arguments[2]);
		else
			alert("错误！未发现此类型方法！")
	};
	function _getConfig0(type){
		if(configSttings[type]==undefined){
			alert("未找到此类型的配置！")
		}
		return configSttings[type][name];
	};
	function _getConfig1(type,name){
		if(configSttings[type]==undefined || configSttings[type][name]==undefined){
			alert("未找到此类型的配置！")
		}
		return configSttings[type][name];
	};
	function _getConfig2(type,name,detail){
		if(configSttings[type]==undefined || configSttings[type][name]==undefined || configSttings[type][name][detail]==undefined){
			alert("未找到此类型的配置！")
		}
		return configSttings[type][name][detail];
	};
	
	
	$._config = function(){ 
		return _getConfig(arguments);
	}; 
	 
	
})(jQuery);