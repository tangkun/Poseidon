package com.poseidon.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.poseidon.util.CreateSearchHtml;

@Controller
@RequestMapping("/Test")
public class Test {
    @RequestMapping("/dotest")
    public String test(Model model) {
        String s = "";
        try {
            s = CreateSearchHtml.create("com.poseidon.view.DemoDataGrid");
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("....e");
        model.addAttribute("myvalue", s);
        return "test";
    }

    @RequestMapping("/getJson")
    @ResponseBody
    public Map<String, Object> getJson() {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("aa", 11);
        map.put("bb", 22);
        return map;
    }
}
