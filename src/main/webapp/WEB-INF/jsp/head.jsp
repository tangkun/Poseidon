 
<%
String path = request.getContextPath();  
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";  
String version="21.0";
%> 
<link rel="stylesheet" type="text/css" href="<%=basePath %>css/easyui.css?v=<%=version %>">
<link rel="stylesheet" type="text/css" href="<%=basePath %>css/jquery.loadmask.css?v=<%=version %>">
<script type="text/javascript" src="<%=basePath %>js/lib/jquery.min.js?v=<%=version %>"></script>
<script type="text/javascript">
(function ($) { 
	$._basePath = function() {
		 return "<%=basePath %>";
    } 
	
 })(jQuery); 
</script>
<script type="text/javascript" src="<%=basePath %>js/lib/jquery.easyui.min.js?v=<%=version %>"></script>
<script type="text/javascript" src="<%=basePath %>js/lib/jquery.loadmask.min.js?v=<%=version %>"></script> 
<script type="text/javascript" src="<%=basePath %>js/lib/json2.js?v=<%=version %>"></script>
<script type="text/javascript" src="<%=basePath %>js/lib/easyui-lang-zh_CN.js?v=<%=version %>"></script>
<script type="text/javascript" src="<%=basePath %>js/ext/Date.js?v=<%=version %>"></script>
<script type="text/javascript" src="<%=basePath %>js/ext/typeExt.js?v=<%=version %>"></script>
<script type="text/javascript" src="<%=basePath %>js/app/config.js?v=<%=version %>"></script>
<script type="text/javascript" src="<%=basePath %>js/app/ajax.js?v=<%=version %>"></script>
<script type="text/javascript" src="<%=basePath %>js/app/form.js?v=<%=version %>"></script>
<script type="text/javascript" src="<%=basePath %>js/app/uiHelper.js?v=<%=version %>"></script>
<script type="text/javascript">  
$(function(){ 
	$.each($(".easyui-linkbutton"),function(index,obj){ 
		$(obj).hide();
		if($(obj).attr("ac")){
			$._getAcAuth(function(data){
				 if ($._checkAuth(data, $(obj).attr("ac")))
					 $(obj).show();
			});
		}
	});
})
</script>