var tableTree = function () {
    var tableH = document.getElementById("tableH");
    var cFilter = document.getElementById("filterC");
    var tableC = document.getElementById("tableC"); 
    
    var startType, endType;
    // 有三种状态，A 为filters B 为table Header，A->B, B->A, B->B
    var flag = false;
    // 表头数据
    var headers = [];
    // 过滤字段
    var filters = [];
    // 数据集
    var data = [];
    // 过滤 表列的数据集
    var filterData = {};
    // 表格宽度
    var widthPercent = [];
    // 模拟单击事件 200ms内
    var firstTime = 0;
    var lastTime = 0;
 
    /**
     * 更新字段分组，按照数据筛选数组
     */ 
    function updateViewer(){  
        var d = {};  
        // 遍历整张数据表 
        for(var k in filters){
            var type = filters[k].key;  
            for(var j in filterData[type]){  
                if(!d[type]){
                    d[type] = new Object(); 
                }
                if(!d[type][j]){
                    d[type][j] = {data:[]};
                    d[type][j].data = data.filter(function(item){
                        if(item[type] == j){
                            return true;
                        }
                    })
                    // map the data，get the filter group

                    // d[type][j].data.push(data[i]);  
                }else{
                    d[type][j].data.push(data[i]);  
                }
            }  
        }  
        console.log(d);
    } 
   
    /***
     * 鼠标按下
     */
    function itemMouseDown() { 
        var startIndex = $(this).data("id");
        var endIndex;
        // 鼠标按下时获取当前的类型
        startType = $(this).data("type");
        if(startType == "filter"){
            firstTime = new Date().getTime();
        }
        // 状态3 B内元素的拖动  
        flag = true; 
        $('#info').html($(this).html()); 
        $(document).mousemove(function (e) { 
            if (flag) {
                $('#info').css({
                    display: 'block'
                });
                
                var e = e || window.event;
                var x = e.clientX + 15 + 'px';
                var y = e.clientY + 15 + 'px';
                $('#info').css({
                    left: x,
                    top: y
                });
                if (e.preventDefault) {
                    e.preventDefault();
                }
                return false;
            }
        });
        // 拖动到表头div 即触发元素交换 B->B
        $('#tableH div').mouseenter(function () { 
            if (startType == "header") {
                endIndex = $(this).index();
            } else if (startType == "filter") {
                endIndex = $(this).index();
            }
            endType = $(this).data("type");

            $('#triangle').css('display', 'block');
            var offsetW = 0;
            var preTd = $(this).prevAll();
            $.each(preTd, function (id, item) {
                offsetW += item.offsetWidth;
            })
            // 元素内移动 B->B
            if (startType == "header" && endType == "header") {
                if (endIndex > startIndex) {
                    offsetW += $(this)["0"].offsetWidth;
                }
            } else if (startType == "filter" && endType == "header") {
                console.log("endIndex=" + endIndex);
            }

            $('#triangle').css({
                'top': $(cFilter).innerHeight() + 4,
                'left': offsetW + 4 
            });
        });
        // 拖动到过滤器 即触发 B-> A 把header里的数据元素存放在A
        $('#filterC').mouseenter(function () { 
            endType = "filter";
            // 追加到A最后 
        })
        $('#tableH').mouseenter(function () {
            endType = "header";
        })
        // 交换元素
        $(document).mouseup(function (e) {
            lastTime = new Date().getTime(); 
            /**
             * 单击元素排序
             */   
            if( (lastTime - firstTime) < 200 && startType == "filter"){  
                filters[startIndex].sort = (filters[startIndex].sort == "asc" ? "desc":"asc"); 
            } 
            flag = false; 
            // B->B 第三种B内的移动 sort
            if (startType == endType && startType == "header") {
                if(endIndex){
                    if (endIndex > startIndex) {
                        headers.splice(endIndex, 0, headers.splice(startIndex, 1)[0]);
                    } else {
                        headers.splice(endIndex, 0, headers.splice(startIndex, 1)[0]);
                    } 
                } 
                // B->A 第二种移动 add filter
            } else if (startType == "header" && endType == "filter") {
                filters.push(headers.splice(startIndex, 1)[0]); 
                updateViewer();
                // A->B 第一种移动 remove filter
            } else if (startType == "filter" && endType == "header") {
                headers.splice(endIndex, 0, filters.splice(startIndex, 1)[0]);
                updateViewer();
            }

            $('div.item').unbind("mousedown");
            initDisplay();

            $('#triangle').css({ 'display': 'none' });
            $('#info').css({ 'display': 'none' });

            // 表头拖动事件 
            $(document).unbind("mousemove");
            $(document).unbind("mouseup");
            $('#tableH div').unbind("mouseenter");
        });
    }

    /**
     * 初始化表头显示数据 
     */
    function initDisplay(d) {    
        if(d != null){
            headers = d.tableHeader;
            filters = d.filtersHeader; 
            data = d.tableData;
        }
        var str = ""; 
        var total = 100;
        widthPercent = [];
        var itemWid = Math.floor(100/ headers.length);
        for (var i = 0; i < headers.length; i++) {
            if(i < headers.length -1 ){
                total -= itemWid; 
            }else if(i == headers.length -1){ 
                itemWid = total;
            } 
            widthPercent.push(itemWid);
            str += "<div class='item' id='" + headers[i].key + "' data-type='header' data-id='" + i + "' style='width:"+ itemWid +"%'>" + headers[i].value + "</div>"
        }
        tableH.innerHTML = str;
        // 初始化过滤器
        str = ""; 
        for (var i = 0; i < filters.length; i++) {
            str += "<div class='item "+ filters[i].sort +"' id='" + filters[i].key + "' data-type='filter' data-id='" + i + "'   >" + filters[i].value + "</div>"
        }
        cFilter.innerHTML = str; 
        
        str = "";
        if(headers.length > 0){
            for(var i = 0; i < data.length; i++){
                str += "<div class='element'>"
                // 遍历头部数据 动态填充表格
                for(var j in headers){
                    str += "<div class='el' style='width:"+ widthPercent[j] +"%'>" + data[i][headers[j].key] + "</div>"; 
                }
                str += "</div>"
            }
        }  
        tableC.innerHTML = str;

        // 表头拖动事件
        $('div.item').mousedown(itemMouseDown); 
    }

    /** 初始化数据 */
    function initHeader() { 
        initDisplay(vTableData); 
        initFilters(); 
    }

     /**
     * 获取该字段的值
     */
    function getCurrentColum(type,arr){
        var map = {};
        for(var i = 0; i < arr.length; i++){
            var ai = arr[i];
            if(!map[ai[type]]){// ai.id  
                var obj = new Object();
                obj[type] = ai[type];
                obj.data = [ai]; 
                map[ai[type]] = ''; 
            }
        } 
        return map;
    }

    /**
     * 遍历整个数据集
     */ 
    function initFilters(){ 
        // 字段条目
        for(var j in data[0]){ 
            filterData[j] = getCurrentColum(j, data);
        }  
        // console.log(filterData);
    }

    return {
        initHeader: initHeader
    }
}

tableTree().initHeader();