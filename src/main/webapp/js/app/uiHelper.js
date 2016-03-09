/**
 * @author tangkun
 * 
 * (
 * Extend from  $.fn.datagrid.defaults.  Override defaults with $.fn._uiHelper.defaults.
 * Extend from  $.fn.combobox.defaults.  Override defaults with $.fn._uiHelper.defaults.
 * Extend from  $.fn.datebox.defaults.  Override defaults with $.fn._uiHelper.defaults.
 * Extend from  $.fn.tree.defaults.  Override defaults with $.fn._uiHelper.defaults.
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
 * 1、searchOptions             none                      返回查询区域options
 * 2、renderSearchBar           searchConditions          构建查询区域
 * 3、resetSearchParam          none                      清空查询区域参数
 * 4、getSearchParam            none 					 获取查询区域参数
 * 5、initMainTable             dataGridOptions			 构建表格区域
 * 6、datagridLoad              none/searchBox            重新加载表格数据
 * 7、autocomplete              options
 * 8、combobox                  options 
 * 9、datebox                   options
 * 10、dateboxValidate          dt1,dt2                   日期验证,dt1<=dt2,其中日期为空不比较
 * 11、tree                     options
 * 12、treeAutomatic            options                   树自动定位
 * 
 */

(function($){ 
	
	/**
	 * 									查询区域开始
	 * ===========================================================================
	 */
	function renderSearchBar(target,options){
		if(!$.valid(options))
			return;
		var $searchdom=$(target);
		var $form=$("<form/>").attr({id:$._config("SearchConditions","searchFormId")});		
		var $table=$("<table/>").addClass("tableSelf");
		$searchdom.append($form.append($table));		

		var separatedCnt=1;
		var objs=[];
		if($.isArray(options.items)){
			$.each(options.items,function(index,item){					
				if($._config("SearchConditions","type","separated")!=item.editor.type){
					var _td={};
					_td.obj=item;
					_td.separatedCnt=separatedCnt;
					objs.push(_td);
				}else{
					separatedCnt++;
				}  
			});
			if(separatedCnt>1){
				var _h=Math.AccSubEx(Math.AccMul(separatedCnt,48),Math.AccMul(separatedCnt-1,8)); 
				$searchdom.parent().attr("style","height:"+_h+"px");
			}
		}
		var desize=1;
		for(var i=1;i<=separatedCnt;i++){
			$tr=$("<tr/>"); 
			$table.append($tr);
			$.each(objs,function(index,data){
				var item=data.obj;
				if(data.separatedCnt==i){
					var $td1=$("<td/>").addClass("title").html(item.title);
					$tr.append($td1);
					$input=$("<input/>").attr({
						id:item.filed,
						name:item.filed
					});
					$input.addClass("textbox-text");
					var spanW="122px";
					if(item.opt && item.opt.width){
						spanW=item.opt.width;
					}
					$span=$("<span/>").addClass("textbox").attr({
						"style":"width:"+spanW+";height: 21px;vertical-align:middle;"
					});
					var $td2;
					if(item.editor.type==$._config("SearchConditions","type","autocomplete")) {
						$input.addClass("textbox-text");
						$td2=$("<td/>").append($span.append($input));
					}else{
						$td2=$("<td/>").append($input);
					} 
					$tr.append($td2); 
					var defaultOptions={
							width:122
					}; 
					var settings = $.extend(defaultOptions, item.opt==undefined?{}:item.opt);
					switch(item.editor.type){
						case $._config("SearchConditions","type","text"):
							$input.textbox(settings);
							break;
						case $._config("SearchConditions","type","autocomplete"):
							settings.serviceUrl=item.opt.url;
					    	$("#"+item.filed)._uiHelper("autocomplete",settings);
							break;
						case $._config("SearchConditions","type","datebox"): 
							$("#"+item.filed)._uiHelper("datebox",settings); 
							break;
						case $._config("SearchConditions","type","combobox"):
							$("#"+item.filed)._uiHelper("combobox",settings); 
							break;
						case $._config("SearchConditions","type","checkbox"):
							$input.attr("type","checkbox");
							break;
					} 
				} 
			}); 
			
			if(i==1){
				$td=$("<td/>").attr("rowspan",separatedCnt); 
				$tr.append(initSearchButton($td,options));
				desize=$tr.children().size();
			}else{
				var _size=desize-$tr.children().size(); 
				if(desize!=$tr.children().size() && _size>0){
					for(var j=0;j<_size;j++){
						$tr.append($("<td/>").html(""));
					}
				}
			} 
		} 
		if($.isFunction(options.searchfun))
			options.searchfun();
	};
	function initSearchButton(target,options){
		var $dom=$(target);
		var $lbutton = $("<a/>").attr(
				{
					"href":"javascript:void(0)", 
					"id":$._config("SearchConditions","searchButtonId")
				}
				).html("查询&nbsp;"); 
		 
		$lbutton.bind('click', function(){   
			if($.valid(options.fortableid))
				$("#"+options.fortableid)._uiHelper("datagridLoad",target);
	    }); 
		$lbutton.linkbutton({   
		    iconCls: 'icon-search',
		    iconAlign:"left"
		}); 
		$dom.append("&nbsp;").append($lbutton);
		
		var $clearButton = $("<a/>").attr(
				{
					"href":"javascript:void(0)", 
					"id":$._config("SearchConditions","clearButtonId")
				}
				).html("清空&nbsp;"); 
		$clearButton.bind('click', function(){   
			$dom._uiHelper("resetSearchParam");
	    }); 
		$clearButton.linkbutton({   
		    iconCls: 'icon-remove',
		    iconAlign:"left"
		});
		$dom.append("&nbsp;").append($clearButton); 
		return $dom;
	};
	function resetSearchParam(target){
		var $form=$(target).parent().parent().parent().parent();
		$form.form("reset"); 
	};
	function getSearchParam(target){
		var $form=$(target).find("form").first();
		return $form.serializeObject();
	};
	function initSearchOptions(target,options){
		options = options || {};
		if($.valid(options.fortableid)){
			var _target=$("#"+options.fortableid)[0];
			var opt = $.data(_target, 'search');
			if (opt){
				$.extend(opt.options, options);
			} else {
				$.data(_target, 'search', {
					options: options
				});
			}
		}
	};
	function getSearchHeight(target){
		if(!$.valid(target))
			return 0;
		var $searchDom = $(target).parent();
		var height = $searchDom[0].offsetHeight;
		return height;
	};
	
	/**
	 * 									表格区域开始
	 * ===========================================================================
	 */
	function initMainTable(target,options){
		if(options.toolbar && options.toolbar.length>0){
			$._getAcAuth(function(data){
				for (var i = options.toolbar.length - 1; i >= 0; i--) {
                    if (!$._checkAuth(data, options.toolbar[i].ac))
                    	options.toolbar.removeAt(i);
                }
			});
		}
		var $maintable=$(target);
		var defaultOptions={
				autoRowHeight: false,
	            nowrap: true,
	            striped: true,
	            fitColumns: false,
	            freezeRow: 1,
	            rownumbers: true,
	            halign: 'center',
	            pageSize: $._config("Pagination","pageSize"),
	            singleSelect: true,
	            ctrlSelect: true,
	            multiSort: true,
	            pagination: true, 
	            width:"100%",
	            height: getDataGridHeigth(target),
	            queryParams: getDataGridQueryParamsBySearchBar(target),
	            onLoadError: function () {
	            	$maintable.datagrid("loaded"); 
	            },
	            onLoadSuccess:function(data){
	            	dataGridLoadSuccess(data);
	            	renderPageFooter(target,data);
	            },
	            onClickRow: function (index) {
	                if ($maintable.datagrid("isEditing", index))
	                    return;
	                if (UIHelper.endDatagridEdit(maintableid)) {
	                    var opts = $maintable.datagrid("options");
	                    if (opts.clickRowEdit) {
	                    	$maintable.datagrid('selectRow', index).datagrid('beginEdit', index);
	                    }
	                }
	            }
		};
		if(options.url)
			options.url=$._basePath()+options.url;
		var settings = $.extend(defaultOptions, options);
		$maintable.datagrid(settings); 
		formatterPageFooter(target);
		
		
	};
	function getDataGridQueryParamsBySearchBar(target){
		var searchOptions=$(target)._uiHelper("searchOptions");
		if($.valid(searchOptions) && $.valid(searchOptions.searchboxid)){
			return $("#"+searchOptions.searchboxid)._uiHelper("getSearchParam");
		}
		return {};
	};
	function datagridLoad(target,searchbox){
		if($.valid(searchbox))
			$(target).datagrid('options').queryParams=$(searchbox)._uiHelper("getSearchParam"); 
		$(target).datagrid('load');
	};
	function getDataGridHeigth(target){
		var searchOptions=$(target)._uiHelper("searchOptions");
		var sh=0;
		if($.valid(searchOptions) && $.valid(searchOptions.searchboxid)){
			sh=getSearchHeight(target);
		}
		return $(window).height()-sh-18;
	};
	function dataGridLoadSuccess(data){
		if(data && data.isout){ 
    		window.top.location.href=$._config("Login","login");
    	}
	};
	function renderPageFooter(target){
		var $maintable=$(target);
		if(!$maintable.datagrid("options").pagination) 
			return; 
		var $pager=$maintable.datagrid("getPager");
		if($pager){
			var $options=$pager.pagination("options"); 
			var text=data.footer==undefined?"":data.footer;
			if($options.pageNumber<=1){
				if(text && text!="")
					$options.text=text;
				else
					$options.text="";
			}else{
				text=$options.text;
			} 
			if($options.footerId)
				$("#"+$options.footerId).html(text); 
		}
	};
	function formatterPageFooter(target){
		var $maintable=$(target);
		if(!$maintable.datagrid("options").pagination) 
			return;
		var maintableid=$maintable.attr("id");
		var $pager=$maintable.datagrid("getPager");
		if($pager){
			var $options=$pager.pagination("options");
			var divid=maintableid+"pageFooterDivId";  
			$options.footerId=divid;
        	if($("#"+divid).length<=0){
        		var $div=$("<div/>").addClass("pagination-info-self").attr("style","float:left;padding-left:10px;").attr("id",divid);  
        		if($pager){
    	        	var $pcs=$pager.children();
    	        	var $info=$pcs.eq(1); 
    	        	if($info){
    	        		$pcs.eq(1).remove();
    	        		$info.insertBefore($pcs.first()); 
    	        	} 
    	        	$div.html("&nbsp;");
    	        	$div.insertBefore($pcs.first()); 
    			} 
        	}  
		}
	};
	
	
	
	/**
	 * 									自定义组件区域开始
	 * ===========================================================================
	 */
	function autocomplete(target,options){
		if(!options.query.category){
			alert("请指定autocomplete,query的category!")
		}
		var $dom=$(target);
		var defaultOptions={
			serviceUrl: '',
           	type:$._config("Ajax","type"), 
           	width:150,
            onSelect: function (suggestion) { 
            	$dom.val(suggestion.value);
            	$dom.attr("_val",suggestion.value);
            	$dom.attr("_data",suggestion.data);
            },
            onSearchStart: function (query) {  	
            	$dom.attr("_val","");
            	$dom.attr("_data","");
           		if(query){
           			query.size=20;
           			if(options.query.order)
           				query.order=options.query.order;
           			if(options.query.category)
           				query.category=options.query.category;  
           		}
            }
		};
		if(options.serviceUrl)
			options.serviceUrl=$._basePath()+options.serviceUrl;
		var settings = $.extend(defaultOptions, options);
		$dom.autocomplete(settings);
	};
	function datebox(target,options){
		var $dom=$(target); 
		var defaultOptions={
           	width:120,
           	buttons:[
           	        {
						text: '今天',
						handler: function(target){
							$dom.datebox("setValue",new Date().Format($._config("Date","format")));
							$dom.datebox("hidePanel");
						}
	           		 },
	           		{
						text: '清空',
						handler: function(target){
							$dom.datebox("setValue","");
							$dom.datebox("hidePanel");
						}
		            },
	           		{
						text: '关闭',
						handler: function(target){
							$dom.datebox("hidePanel");
						}
		           	}
           	        ]
		};
		var settings = $.extend(defaultOptions, options);
		$dom.datebox(settings);
	};
	function combobox(target,options){
		var $dom=$(target);
		var defaultOptions={
				url: '',
				method:$._config("Ajax","type"), 
	           	width:120,
	           	valueField:$._config("Combobox","valueField"), 
	           	textField:$._config("Combobox","textField"),
	    		editable:false,
	           	onLoadSuccess:function(){
	           		var data = $(this).combobox("getData"); 
	           		if(data && data.length>0 && $(this).combobox("getValue")==""){
	           			var _valueField=$._config("Combobox","valueField");
	           			if(options.valueField)
	           				_valueField=options.valueField; 
	           			$(this).combobox("setValue",data[0][_valueField]);
	           		}
	           	}
			};
			if(options.url)
				options.url=$._basePath()+options.url;
			var settings = $.extend(defaultOptions, options);
			$dom.combobox(settings);
			if((settings.url==undefined || settings.url=="")&& $.isArray(options.data)){
				$dom.combobox("loadData",options.data);
			}
	};
	function dateboxValidate(dt1,dt2){
		var $dt1=$("#"+dt1);
		var $dt2=$("#"+dt2);
		var dt1=$dt1.datebox("getValue");
		var dt2=$dt2.datebox("getValue");
		if($dt1) {
			$dt1.datebox({onShowPanel:function(){ 
				dt2=$dt2.datebox("getValue"); 
				$dt1.datebox('calendar').calendar({  
		            validator: function(date){
		            	if(dt2=="")return true;
		            	if(Date.Compare(date,dt2)==1){
		            		return false;
		            	}else{
		            		return true;
		            	}
		            }  
		      });
			}}); 
		}
		if($dt2) {
			$dt2.datebox({onShowPanel:function(){
				dt1=$dt1.datebox("getValue");
				$dt2.datebox('calendar').calendar({  
		            validator: function(date){  
		            	if(dt1=="")return true;
		            	if(Date.Compare(date,dt1)>=0){
		            		return true;
		            	}else{
		            		return false;
		            	}
		            }  
		      });
			}}); 
		}
	};
	function tree(target,options){
		if(id==undefined || id=="")
			return;
		var $mask;
		if($.valid(optins.maskid))
			$mask=$("#"+options.maskid);
		else
			$mask=$(target);
		var defaultOptions={
			url:"",
			lines:true,
			method:$._config("Ajax","type"),
		    formatter:function(node){
		    	return "<span id='tree_"+node.id+"' _id="+node.id+">"+node.text+"</span>";
			},
			onBeforeLoad:function(){
				if($mask)
					$mask.mask(Config.getConfig("Mask","text"));  
			},
			onLoadSuccess:function(){
				if($mask)
					$mask.unmask();
			},
			onLoadError:function(){
				if($mask)
					$mask.unmask();
			}
			
		};
		if(options.url)
			options.url=$._basePath()+options.url;
		var settings = $.extend(defaultOptions, options);
		$(target).tree(settings);
		 
		if($.valid(options.automaticOpt))
			$(target)._uiHelper("treeAutomatic",options.automaticOpt);
	};
	function treeAutomatic(target,options){
		var $tree=$(target);
		if($tree && options){
			if(!options.id){
				alert("请输入查询框ID");
				return;
			}
			if(!options.buttonid){
				alert("请输入查询查询BUTTONID!")
				return;
			}
			
			var selectIndex=0;
			var selectVal="";
			var _node=null;
			$("#"+options.id).textbox('setValue',"");
			$("#"+options.id).textbox('textbox').bind("keypress",function(e){
				var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode; 
				if (keyCode == 13){ 
					$("#"+options.buttonid).click();
				}
			});
			var $arr=$tree.find(".tree-title");
			$("#"+options.buttonid).bind("click",function(){
				var selectArr={};
				var key=$("#"+options.id).val();
				if(selectVal!=key)
					selectIndex=0;
				selectVal=key;
				if(key=="")
					return;
				//var $tree=$("#"+id);
				/**
				 * 如果数据集太大，是否采用其他方法
				 */
				if($arr.size()>1000){
					
				}else{
					
				}
				var _index=0;  
				$.each($arr,function(index,obj){
					var _text=$(obj).text();
					if(_text && _text!=""){
						var $_obj=$(obj).children().first();
						var keyid=$_obj.attr("id");
						$_obj.attr("_index",index);
						if(_text.indexOf(key)>-1){ 
							$("#"+keyid).attr("style","color:red"); 					
							selectArr[_index]=$_obj.attr("_id"); 
							_index++; 
						}else{
							$("#"+keyid).attr("style","");
						}
					}
				});


				if(selectIndex>=_index)
					selectIndex=0;
				if(selectArr[selectIndex]){ 
					var _cnt = $("#tree_"+selectArr[selectIndex]).attr("_index");  
					$tree.parent().animate({
					    scrollTop: Math.AccMul(_cnt,18)
					}); 
					var node = $tree.tree('find',selectArr[selectIndex]);
					$tree.tree('expandTo', node.target).tree('select', node.target);  
					_node=selectArr[selectIndex];
				}else{
					$tree.parent().animate({
					    scrollTop: 0
					}); 
					selectIndex=0;
					_index=0;
					if(_node!=null){
						var nodea = $tree.tree('find',_node);
						$(nodea.target).removeClass("tree-node-selected"); 
					}
				}

				selectIndex=selectIndex+1;
			})
		}
	};
	
	
	$.fn._uiHelper = function(options, param){
		if (typeof options == 'string'){
			if($.fn._uiHelper.methods[options]!=undefined)
				return $.fn._uiHelper.methods[options](this, param);
		}
	};
	$.fn._uiHelper.methods = {
		searchOptions : function(jq){
			if($.data(jq[0], 'search'))
				return $.data(jq[0], 'search').options;
			return {};
		},
		renderSearchBar : function(jq,param){
			initSearchOptions(jq[0],param);
			renderSearchBar(jq[0],param);
		},
		resetSearchParam : function(jq,param){
			resetSearchParam(jq[0]);
		},
		getSearchParam : function(jq,param){
			return getSearchParam(jq[0]);
		},
		initMainTable : function(jq,param){
			initMainTable(jq[0],param);
		},
		datagridLoad : function(jq,param){
			datagridLoad(jq[0],param);
		},
		autocomplete : function(jq,param){
			autocomplete(jq[0],param);
		},
		combobox : function(jq,param){
			combobox(jq[0],param);
		},
		datebox : function(jq,param){
			datebox(jq[0],param);
		},
		dateboxValidate : function(jq,dt1,dt2){
			dateboxValidate(dt1,dt2);
		},
		tree : function(jq,param){
			tree(jq[0],param);
		},
		treeAutomatic : function(jq,param){
			treeAutomatic(jq[0],param);
		}
	}; 	
})(jQuery);