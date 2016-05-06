/**
 * Created by renzhaotian on 16-5-6.
 */
var example = {"version":"1.0",
    "msgId":"12b4533c1b-a706-486d-b7aa-f0ebcec054ea1456820001077000012",
    "msgType":"ORDER_CREATE_FROM_BUYER",
    "msgData":   {
        "STOCKORDERFORM": [{
            "GUID":"内码1",
            "BillNO":"单据编号",
            "Suppliercode":"供应商编号",
            "SupplierName":"供应商名称",
            "BillDate":"单据日期",
            "CustomerAdder":"送货地址",
            "EmployeeCode":"业务员编号",
            "EmployeeName":"业务员名称",
            "UseFulDate":"订单失效期",
            "SupplierEmployeeName":"采购订单",
            "AdvGoodsArriveDate":"预到货日期",
            "Remark":"备注"
        }],
        "STOCKORDERFORMDETAIL": [
            {
                "GUID":"detail内码",
                "StockOrderFormGuid": "内码1",
                "Quantity":"1",
                "InPrice":"9.09",
                "HH":"4060504005",
                "PZWH":"苏镇食药监械（准）字2014第1560041号",
                "AmountTax":"9.09"
            },
            {
                "GUID":"detail内码2",
                "StockOrderFormGuid": "内码1",
                "Quantity":"10",
                "InPrice":"9.09",
                "HH":"5070501023",
                "PZWH":"卫食健字（1999）第096号",
                "AmountTax":"90.9"
            }
        ]
    },
    "checksum":"8cbf6e1911c97ab1640ce1faed29a57e"
}
