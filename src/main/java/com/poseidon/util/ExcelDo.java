package com.poseidon.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Iterator;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;

/**
 * 
 * <pre>
 * 
 *
select a.*,b.trader_id,c.real_name,c.mobile from tbill_of_lading a 
inner join TSALES_ORDER b on a.sales_order_id=b.pkid
left join tsys_user c on b.trader_id=c.pkid
where a.valid='T' and(a.status>=30 or b.order_type in(12,13))
and a.added_time>=to_date('2016-03-09','yyyy-MM-dd')


select c.*,d.sku_id,d.category_id,d.category_name,d.material_id,d.material_name,d.factory_id,d.factory_name,d.specification_id,d.specification_name,
TO_DATE(   
    TO_CHAR(c.last_modified_time,'YYYY-MM-DD HH24:MI:SS'),  
    'YYYY-MM-DD HH24:MI:SS')
from tbill_of_lading a 
inner join TSALES_ORDER b on  a.sales_order_id=b.pkid
inner join tbill_of_lading_item c on c.bl_id=a.pkid and c.valid='T'
inner join tsales_order_item d on c.sales_order_item_id=d.pkid
where a.valid='T' and(a.status>=30 or b.order_type in(12,13))
and a.added_time>=to_date('2016-03-09','yyyy-MM-dd')
;
 

select d.*,e.package_code,
TO_DATE(   
    TO_CHAR(d.last_modified_time,'YYYY-MM-DD HH24:MI:SS'),  
    'YYYY-MM-DD HH24:MI:SS'),f.Detail_Specification 
from tbill_of_lading a 
inner join TSALES_ORDER b on a.sales_order_id=b.pkid
inner join tbill_of_lading_item c on c.bl_id=a.pkid
inner join TBILL_OF_LADING_STOCK_ITEM d on d.bl_item_id=c.pkid  and d.valid='T'
inner join tsales_order_item e on c.sales_order_item_id=e.pkid
left join TSALES_ORDER_STOCK_ITEM f on f.sales_order_item_id=e.pkid
where a.valid='T' and(a.status>=30 or b.order_type in(12,13))
and a.added_time>=to_date('2016-03-09','yyyy-MM-dd')





 * </pre>
 *
 * @author kun.tang
 * @version $Id: ExcelDo.java, v 0.1 2016年3月9日 上午9:36:46 kun.tang Exp $
 */
public class ExcelDo {
    private static String filePath_main                = "F:/erp-data/input_main.sql";
    private static String filePath_detail              = "F:/erp-data/input_detail.sql";
    private static String filePath_detail_sku          = "F:/erp-data/input_detail_sku.sql";
    private static String filePath_detail_stock        = "F:/erp-data/input_detail_stock.sql";
    private static String readFile_main                = "F:/erp-data/11.xls";
    private static String readFile_detail              = "F:/erp-data/22.xls";
    private static String readFile_detail_sku          = "F:/erp-data/22.xls";
    private static String readFile_detail_stock        = "F:/erp-data/33.xls";

    private static String str_t_delivery_notice        = "insert into t_delivery_notice("
                                                         + "pkid, delivery_notice_code, supplier_bill_id, supplier_bill_code, delivery_notice_type,"
                                                         + "origin_delivery_notice_id, delivery_bill_type, ship_type, settlement_type, biz_source, "
                                                         //1
                                                         + "source, cooperator_code, city_id, city_name, goods_owner_id, "
                                                         + "goods_owner_name, saler_id,saler_name, consignee, consignee_mobile, "
                                                         //2
                                                         + " consignee_telephone, plate_number, customer_name,warehouse_id, warehouse_name, "
                                                         + " delivery_time, remark, status, trader, trader_name, "
                                                         //3
                                                         + "trader_mobile,sent_time, is_all_out, delivery_finish_time, is_printed_delivery_notice,"
                                                         + " printed_time,last_printed_by, last_printed_name, last_printed_time, created_by, "
                                                         //4
                                                         + " created_by_name,created_time,valid "
                                                         + ")values(" + "#0#,'#1#',#0#,'#1#',1,"
                                                         + "0,#2#,#31#,#47#,#44#,"
                                                         //1
                                                         + "#45#,'',0,'',#32#,"
                                                         + "'',0,'','#4#','#5#',"
                                                         //2
                                                         + "'#6#','#7#','#30#',#9#,'#10#',"
                                                         + "'#18#','#17#',(case when #18#>=10 and #18#<=40 then 10 else #18# end),#48#,'#49#',"
                                                         //3
                                                         + "'#50#',now(),'#42#','#25#','#34#',"
                                                         + "'#36#',#35#,'','#36#',#24#,"
                                                         //4
                                                         + "'','#25#','#29#');";
    private static String str_t_delivery_notice_detail = "insert into t_delivery_notice_detail("
                                                         + "pkid,delivery_notice_id,relative_bill_detail_id,request_quantity,request_weight,"
                                                         + "actual_quantity,actual_weight,added_by,"
                                                         + "added_time,last_modified_by,last_modified_time,last_modified_ip,valid)values("
                                                         + "#0#,#1#,#2#,#3#,#4#," + "#5#,#6#,#9#,"
                                                         + "'#10#',#11#,'#28#','#13#','#14#');";
    private static String str_t_delivery_notice_sku    = "insert into t_delivery_notice_sku("
                                                         + "pkid,delivery_notice_detail_id,sku_id,category_id,category_name,"
                                                         + "material_id,material_name,factory_id,factory_name,specification_id,specification_name)values("
                                                         + "#0#,#0#,#19#,#20#,'#21#',"
                                                         + "#22#,'#23#',#24#,'#25#',#26#,'#27#');";
    private static String str_t_delivery_notice_item   = "insert into t_delivery_notice_item("
                                                         + "pkid,delivery_notice_detail_id,relative_bil_item_id,piece_weight,detail_specification,"
                                                         + "request_quantity,request_weight,actual_quantity,actual_weight,remark,added_by,added_time,"
                                                         + "last_modified_by,last_modified_time,last_modified_ip,valid,package_no)values("
                                                         + "#0#,#1#,#2#,#3#,'#16#'"
                                                         + "#4#,#5#,#6#,#7#,#8#,#9#,'#10#',"
                                                         + "#11#,'#16#','#13#','#14#','#15#');";

    private static String insertValues(String insertStr, HSSFCell cell, int cellNumbers) {
        String cellNumber = cellNumbers + "";
        String cellValue = "";
        if (cell != null) {
            switch (cell.getCellType()) {
                case HSSFCell.CELL_TYPE_NUMERIC:
                    if (HSSFDateUtil.isCellDateFormatted(cell)) {
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                        cellValue = sdf.format(HSSFDateUtil.getJavaDate(cell.getNumericCellValue()))
                            .toString();
                    } else {
                        if (new BigDecimal(cell.getNumericCellValue()).toPlainString()
                            .indexOf(".") > 0) {
                            java.text.DecimalFormat myformat = new java.text.DecimalFormat("0.000");
                            cellValue = myformat.format(cell.getNumericCellValue());
                        } else {
                            cellValue = new BigDecimal(cell.getNumericCellValue()).toPlainString();
                        }

                    }

                    break;
                case HSSFCell.CELL_TYPE_STRING:
                    cellValue = cell.getStringCellValue();
                    break;
                case HSSFCell.CELL_TYPE_BOOLEAN:
                    cellValue = cell.getBooleanCellValue() ? "T" : "F";
                    break;
                case HSSFCell.CELL_TYPE_FORMULA:
                    System.out.println(cell.getCellFormula());
                    break;
                default:
                    cellValue = cell.getStringCellValue();
                    break;
            }
        }
        cellValue.replace("\n", "");
        cellValue.replace("'", "");
        if (cellValue.length() <= 0)
            cellValue = "null";
        if (insertStr.indexOf("#" + cellNumber + "#") > 0)
            insertStr = insertStr.replaceAll("#" + cellNumber + "#", cellValue);
        if (insertStr.indexOf("'null'") > 0)
            insertStr = insertStr.replaceAll("'null'", "null");
        return insertStr.toString();
    }

    public static void createFile(String name) throws IOException {
        File file = new File(name);
        if (file.exists()) {
            file.delete();
        }
        file.createNewFile();

    }

    public static void writeFile(String filePath, String str) {
        File file = new File(filePath);
        try {
            byte[] bt = str.getBytes();
            FileOutputStream in = new FileOutputStream(file);
            in.write(bt, 0, bt.length);
            in.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void doMain(String filePath_main, String readFile, String insertStrs) {
        try {
            File file = new File(filePath_main);
            FileOutputStream in = new FileOutputStream(file);

            createFile(filePath_main);
            InputStream myxls = new FileInputStream(readFile);
            HSSFWorkbook wb = new HSSFWorkbook(myxls);

            HSSFSheet sheet = wb.getSheetAt(0);
            int rowCount = sheet.getLastRowNum();

            System.out.println("..." + sheet.getPhysicalNumberOfRows());
            Iterator<Row> rows = sheet.rowIterator();
            while (rows.hasNext()) {
                HSSFRow row = (HSSFRow) rows.next();
                StringBuffer sb = new StringBuffer();
                String insertStr = insertStrs;
                if (row.getRowNum() > 0) {
                    int cellCnt = row.getLastCellNum();
                    for (int i = 0; i <= cellCnt; i++) {
                        insertStr = insertValues(insertStr, row.getCell(i), i);
                    }
                    sb.append(insertStr).append("\n");
                }
                System.out.println(filePath_main + ".." + rowCount + "-/-" + row.getRowNum());
                byte[] bt = sb.toString().getBytes("UTF-8");
                in.write(bt, 0, bt.length);

            }
            in.close();
            wb.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        doMain(filePath_main, readFile_main, str_t_delivery_notice);
        doMain(filePath_detail, readFile_detail, str_t_delivery_notice_detail);
        doMain(filePath_detail_sku, readFile_detail_sku, str_t_delivery_notice_sku);
        doMain(filePath_detail_stock, readFile_detail_stock, str_t_delivery_notice_item);
    }
}
