<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>..</title>
<jsp:include page="head.jsp"/>
</head>
<body>
<div data-options="region:'north',border:false,collapsible:true" style="height:48px">
  <div class="zg_search" id="searchBox">
  </div>
</div>
<div data-options="region:'center',border:false,minHeight:400,fit:true"> 
  <table id="mainTable">
  </table>
</div>
</body>
<script type="text/javascript">
var searchConditions = {
  fortableid: "mainTable",
  searchboxid: "searchBox",
  searchfun: function(){},
  items: []
};

var toolbar = [];

var cols=[[
  {field:'a1',title:'我是标题1',width:100},
  {field:'a2',title:'我是标题2',width:100},
  {field:'a3',title:'我是标题3',width:100},
  {field:'a4',title:'我是标题4',width:100}
]];

$(function(){
  $("#searchBox")._uiHelper("renderSearchBar",searchConditions);
  $("#mainTable")._uiHelper("initMainTable",{
    columns: cols,
    url:'',
    toolbar: toolbar,
    singleSelect:false
	});
  });

</script>
</html>