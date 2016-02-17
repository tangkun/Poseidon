package com.poseidon.util;

import java.lang.reflect.Field;

import com.poseidon.view.Title;

public class CreateSearchHtml {
    private static String head(boolean isJsp) {
        StringBuffer sb = new StringBuffer();
        if (isJsp)
            sb.append(
                "<%@ page language=\"java\" contentType=\"text/html; charset=UTF-8\" pageEncoding=\"UTF-8\"%>")
                .append("\n");
        sb.append("<!DOCTYPE html>").append("\n");
        sb.append("<html>").append("\n");
        sb.append("<head>").append("\n");
        sb.append("<meta charset=\"UTF-8\">").append("\n");
        sb.append("<title>..</title>").append("\n");
        sb.append("<jsp:include page=\"head.jsp\"/>").append("\n");
        sb.append("</head>").append("\n");
        return sb.toString();
    }

    private static String body() {
        StringBuffer sb = new StringBuffer();
        sb.append("<body>").append("\n");
        sb.append(
            "<div data-options=\"region:'north',border:false,collapsible:true\" style=\"height:48px\">")
            .append("\n");
        sb.append("  <div class=\"zg_search\" id=\"searchBox\">").append("\n");
        sb.append("  </div>").append("\n");
        sb.append("</div>").append("\n");
        sb.append("<div data-options=\"region:'center',border:false,minHeight:400,fit:true\"> ")
            .append("\n");
        sb.append("  <table id=\"mainTable\">").append("\n");
        sb.append("  </table>").append("\n");
        sb.append("</div>").append("\n");
        sb.append("</body>").append("\n");
        return sb.toString();
    }

    private static String script(String obj) throws Exception {
        StringBuffer sb = new StringBuffer();
        sb.append("<script type=\"text/javascript\">").append("\n");
        sb.append(searchConditions()).append("\n");
        sb.append(toolbar()).append("\n");
        sb.append(cols(obj)).append("\n");
        sb.append(init()).append("\n");
        sb.append("</script>").append("\n");
        return sb.toString();
    }

    private static String searchConditions() {
        StringBuffer sb = new StringBuffer();
        sb.append("var searchConditions = {").append("\n");
        sb.append("  fortableid: \"mainTable\",").append("\n");
        sb.append("  searchboxid: \"searchBox\",").append("\n");
        sb.append("  searchfun: function(){},").append("\n");
        sb.append("  items: []").append("\n");
        sb.append("};").append("\n");
        return sb.toString();
    }

    private static String toolbar() {
        StringBuffer sb = new StringBuffer();
        sb.append("var toolbar = [];").append("\n");
        return sb.toString();
    }

    private static String cols(String obj) throws Exception {
        StringBuffer sb = new StringBuffer();
        sb.append("var cols=[[").append("\n");
        Field[] field = CreateSearchHtml.class.getClassLoader().loadClass(obj).getDeclaredFields();
        int size = 1;
        for (Field f : field) {
            sb.append("  {field:'" + f.getName() + "',");
            Title title = f.getAnnotation(Title.class);
            if (title != null) {
                sb.append("title:'" + title.value() + "',");
            } else {
                sb.append("title:'" + f.getName() + "',");
            }
            sb.append("width:100}");
            if (size < field.length)
                sb.append(",").append("\n");
            else
                sb.append("\n");
            size++;
        }
        sb.append("]];").append("\n");
        return sb.toString();
    }

    private static String init() {
        StringBuffer sb = new StringBuffer();
        sb.append("$(function(){").append("\n");
        sb.append("  $(\"#searchBox\")._uiHelper(\"renderSearchBar\",searchConditions);")
            .append("\n");
        sb.append("  $(\"#mainTable\")._uiHelper(\"initMainTable\",{").append("\n");
        sb.append("    columns: cols,").append("\n");
        sb.append("    url:'',").append("\n");
        sb.append("    toolbar: toolbar,").append("\n");
        sb.append("    singleSelect:false").append("\n");
        sb.append("});});").append("\n");
        return sb.toString();
    }

    public static String create(String obj) throws Exception {
        StringBuffer sb = new StringBuffer();
        sb.append(head(true));
        sb.append(body());
        sb.append(script(obj));
        sb.append("</html>");
        return sb.toString();
    }

    public static void main(String args[]) throws Exception {
        System.out.println(create("com.poseidon.view.DemoDataGrid"));
    }
}
