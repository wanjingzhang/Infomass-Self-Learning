var vTableData={
     tableData: [
        {"id":"1","deviceNo":"0001","deviceName":"百分表1","status":"可用","manufacture":"成都成量工具集团",
        "located":"成都","nextMaintenanceDate":"2020/8/1","nextCalibrationDate":"2020/10/1",
        "sparePart":1,"calibrationSupplier":"云南测试研究院","toolSpecification":"(0-10)mm","procurementPrice":"¥300.00"
        },
        {"id":"2","deviceNo":"0002","deviceName":"电压表","status":"维修中","manufacture":"上海成量工具集团",
        "located":"上海","nextMaintenanceDate":"2020/8/1","nextCalibrationDate":"2020/10/1",
        "sparePart":1,"calibrationSupplier":"上海测试研究院","toolSpecification":"(0-10)mm","procurementPrice":"¥300.00"
        },
        {"id":"3","deviceNo":"0003","deviceName":"电流表","status":"校准中","manufacture":"重庆成量工具集团",
        "located":"重庆","nextMaintenanceDate":"2020/8/1","nextCalibrationDate":"2020/10/1",
        "sparePart":1,"calibrationSupplier":"广州测试研究院","toolSpecification":"(0-10)mm","procurementPrice":"¥300.00"
        },
        {"id":"4","deviceNo":"0004","deviceName":"百分表3","status":"可用","manufacture":"成都成量工具集团",
        "located":"成都2","nextMaintenanceDate":"2020/8/1","nextCalibrationDate":"2020/10/1",
        "sparePart":1,"calibrationSupplier":"中国测试研究院","toolSpecification":"(0-10)mm","procurementPrice":"¥300.00"
        },
        {"id":"5","deviceNo":"0005","deviceName":"百分表1","status":"维修中","manufacture":"上海成量工具集团",
        "located":"上海2","nextMaintenanceDate":"2020/8/1","nextCalibrationDate":"2020/10/1",
        "sparePart":1,"calibrationSupplier":"上海测试研究院","toolSpecification":"(0-10)mm","procurementPrice":"¥300.00"
        },
        {"id":"6","deviceNo":"0006","deviceName":"百分表2","status":"校准中","manufacture":"重庆成量工具集团",
        "located":"重庆2","nextMaintenanceDate":"2020/8/1","nextCalibrationDate":"2020/10/1",
        "sparePart":1,"calibrationSupplier":"北京测试研究院","toolSpecification":"(0-10)mm","procurementPrice":"¥300.00"
        }
    ],
    tableHeader: [
         {"key": "deviceNo", "value": "1.工具编号","sort":"asc"},
         {"key": "deviceName", "value": "2.工具名称","sort":"desc"},  
         {"key": "status", "value":"3.状态","sort":"asc"},
         {"key": "manufacture", "value":"4.制造商","sort":"asc"},
         {"key": "located", "value":"5.存放架/工位","sort":"asc"}, 
         {"key": "nextMaintenanceDate", "value":"6.下次保养时间","sort":"asc"}, 
         {"key": "nextCalibrationDate", "value":"7.下次校准时间","sort":"asc"}, 
         {"key": "sparePart", "value":"8.备件","sort":"asc"}, 
         {"key": "calibrationSupplier", "value":"9.校准服务提供商","sort":"asc"}, 
         {"key": "toolSpecification", "value":"10.工具规格","sort":"asc"}, 
         {"key": "procurementPrice", "value":"11.采购价格","sort":"asc"}],
    filtersHeader:[],
    filterData: {
            "status": {"可用":"可用", "维修中":"维修中","校准中":"校准中"}, 
            "deviceNo": {"0005":"0005","0006":"0006"}
        } 
 };
 
 

 /**
  * 设备明细
  * @param {*} id 
  * @param {*} status 状态
  * @param {*} deviceNo 工具编号
  * @param {*} deviceName 工具名称
  * @param {*} manufacture 制造商
  * @param {*} located 存放架/工位
  * @param {*} nextMaintenanceDate 下次保养时间
  * @param {*} nextCalibrationDate 下次校准时间
  * @param {*} sparePart 备件
  * @param {*} calibrationSupplier 校准服务提供商
  * @param {*} toolSpecification 工具规格
  * @param {*} procurementPrice 采购价格
  */
 function DEVICE(id,status,deviceNo,deviceName,manufacture,located,nextMaintenanceDate,nextCalibrationDate,sparePart,calibrationSupplier,toolSpecification,procurementPrice ){
     this.id = id;
     this.status = status;
     this.deviceNo = deviceNo;
     this.deviceName = deviceName;
     this.manufacture = manufacture;
     this.located = located;
     this.nextMaintenanceDate = nextMaintenanceDate;      
     this.nextCalibrationDate = nextCalibrationDate;      
     this.sparePart = sparePart;   
     this.calibrationSupplier = calibrationSupplier;   
     this.toolSpecification = toolSpecification; 
     this.procurementPrice = procurementPrice;   
 }

 DEVICE.prototype = {
     constructor: DEVICE 
 }