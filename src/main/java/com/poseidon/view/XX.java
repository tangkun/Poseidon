package com.poseidon.view;

import java.lang.reflect.Field;

public class XX {

    public static void main(String[] args) throws SecurityException, ClassNotFoundException {
        /*  Method[] m = XX.class.getClassLoader().loadClass("com.poseidon.view.DemoDataGrid")
            .getMethods();*/

        String ss = "";
        Field[] f = XX.class.getClassLoader().loadClass("com.poseidon.view.DemoView")
            .getDeclaredFields();
        for (Field field : f) {

            System.out.println(field.getType() + ".." + field.getGenericType());
            Object cc = field.getClass();
            Title s = field.getAnnotation(Title.class);
            if (s != null) {
                System.out.println(s.value());
                System.out.println(field.getName());
            }

        }
    }

    public static void print(Class c) {
        System.out.println(c.getName());
        Title t = (Title) c.getAnnotation(Title.class);
        if (t != null)
            System.out.println("name:" + t.value());
    }
}
