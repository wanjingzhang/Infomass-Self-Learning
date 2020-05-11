var tableTree = function () {
    var setting = {
        view: { 
            addDiyDom: addDiyDom,
            selectedMulti: false
        }, 
        data: {
            simpleData: {
                enable: true
            },
            key: {
                id: 'id'
            }
        } 
    };
    
    var tableH = document.getElementById('tableH');
    var cFilter = document.getElementById('filterC');
    var tableC = document.getElementById('tableC'); 
    
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
    // 树形结构
    var zNodeConfig = []
 
    /**
     * 更新字段分组，按照数据筛选数组
     */ 
    function updateViewer(){  
        if(filters.length == 0) return;
        var obj = {};  
        // 遍历整张数据表 递归 得到树
        var k = 0;  
        var type = [];
        zNodeConfig = ''; 

        for(var k=0; k< filters.length;k++){  
            type.push(filters[k].key); 
            zNodeConfig += '{"name":"'+ filters[k].value +'", "open":true, "nodeType": "1", "children":[';
 
            if(k == 0){ 
                obj = filterData[type[k]]; 
                for(var i in obj){
                    obj[i] = data.filter(function(item){
                        if(item[type[k]] == i){
                            return true;
                        }
                    })
                    zNodeConfig += '{"name":"'+ i +'", "nodeType": "2"';
                    if(obj[i]){
                        zNodeConfig += ', "data":['
                        for(var j in obj[i]){
                            zNodeConfig += JSON.stringify(obj[i][j]) + ',';
                        }
                        zNodeConfig = zNodeConfig.substring(0,zNodeConfig.length-1);
                        zNodeConfig += ']'
                    }
                    
                    zNodeConfig += '},'; 
                }  
                zNodeConfig = zNodeConfig.substring(0,zNodeConfig.length-1);
                zNodeConfig += ']}';
            } 
            else if(k == 1){
                for(var i in obj){ 
                    obj[i] = filterData[type[k]];
                    for(var h in obj[i]){
                        obj[i][h] = data.filter(function(item){
                            console.log(i + k + ' item[type]=' + item[type[k]]+ ' item[filters[0].key]=' + item[filters[0].key]);
                            if(item[type[k]] == h && item[type[k-1]] == i){  
                                return true;
                            }
                        })
                    }  
                }
            }   
            else if(k == 2){
                for(var i in obj){
                    for(var j in obj[i]){
                        obj[i][j] = filterData[type];
                    } 
                }
            }
            else if(k == 3){
                for(var i in obj){
                    for(var j in obj[i]){
                        for(var h in obj[i][j]){
                            obj[i][j][h] = filterData[type];
                        } 
                    } 
                }
            }
        }  
        console.log(obj);   
        drawTree(zNodeConfig); 
        // fillTable(); 
    }

    /**
     *  绘制树
     */
    function drawTree(str){
        console.log(str);
        // [
        //     {'name':'网站导航', open:true, children: [
        //         { 'name':'google', 'url':'http://g.cn', 'target':'_blank'}
        //         ]
        //     }
        // ];
        //str = '[{"name":"status", "open":true, "nodeType": "1", "children":[{"name":"可用", "nodeType": "2"},{"name":"维修中", "nodeType": "2"},{"name":"校准中", "nodeType": "2"}]}]';
        var obj = JSON.parse(str);
        console.log(obj);
        $.fn.zTree.init($('#treeData'), setting, obj);//zNodes

        $(".showData").click(function(){ 
            if($(this).hasClass("hide")){
                $(this).removeClass("hide");
                $(this).addClass("show");
                $(this).parent().next().show();
            }else{
                $(this).addClass("hide");
                $(this).removeClass("show");
                $(this).parent().next().hide();
            } 
        });  
    }

    /**
     * 添加自定义数据集合到节点
     */
    function addDiyDom(treeId, treeNode){
        if(treeNode.nodeType != 2)return;
        var aObj = $("#" + treeNode.tId + "_a");
        var aSpan = $("#" + treeNode.tId + "_span");
        aSpan.after("<span class='button showData show' id='addBtn_" + treeNode.tId + "' title='add node' onfocus='this.blur();'></span>");
        // if ($("#addBtn_"+treeNode.id).length>0) return;
        // 添加子table
        var addStr = '<div class="tableC" id="tableC">';
        for(var i = 0; i < treeNode.data.length; i++){
            addStr += '<div class="element">'
            // 遍历头部数据 动态填充表格
            for(var j in headers){
                addStr += '<div class="el" style="width:'+ widthPercent[j] +'%">' + treeNode.data[i][headers[j].key] + '</div>'; 
            }
            addStr += '</div>'
        }
        addStr += '</div>'
        
        aObj.after(addStr);
    }

    /**
     * 填充表格
     */
    function fillTable(){
        str = '';
        if(headers.length > 0){
            for(var i = 0; i < data.length; i++){
                str += '<div class="element">'
                // 遍历头部数据 动态填充表格
                for(var j in headers){
                    str += '<div class="el" style="width:'+ widthPercent[j] +'%">' + data[i][headers[j].key] + '</div>'; 
                }
                str += '</div>'
            }
        }  
        tableC.innerHTML = str;
    }
   
    /***
     * 鼠标按下
     */
    function itemMouseDown() { 
        var startIndex = $(this).data('id');
        var endIndex;
        // 鼠标按下时获取当前的类型
        startType = $(this).data('type');
        if(startType == 'filter'){
            firstTime = new Date().getTime();
        }
        // 状态3 B内元素的拖动  
        flag = true; 
        $("#info").html($(this).html()); 
        $(document).mousemove(function (e) { 
            if (flag) {
                $("#info").css({
                    display: "block"
                });
                
                var e = e || window.event;
                var x = e.clientX + 15 + "px";
                var y = e.clientY + 15 + "px";
                $("#info").css({
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
        $("#tableH div").mouseenter(function () { 
            if (startType == 'header') {
                endIndex = $(this).index();
            } else if (startType == 'filter') {
                endIndex = $(this).index();
            }
            endType = $(this).data('type');

            $("#triangle").css("display", "block");
            var offsetW = 0;
            var preTd = $(this).prevAll();
            $.each(preTd, function (id, item) {
                offsetW += item.offsetWidth;
            })
            // 元素内移动 B->B
            if (startType == 'header' && endType == 'header') {
                if (endIndex > startIndex) {
                    offsetW += $(this)['0'].offsetWidth;
                }
            } else if (startType == 'filter' && endType == 'header') {
                console.log('endIndex=' + endIndex);
            }

            $("#triangle").css({
                "top": $(cFilter).innerHeight() + 4,
                "left": offsetW + 4 
            });
        });
        // 拖动到过滤器 即触发 B-> A 把header里的数据元素存放在A
        $("#filterC").mouseenter(function () { 
            endType = 'filter';
            // 追加到A最后 
        })
        $("#tableH").mouseenter(function () {
            endType = 'header';
        })
        // 交换元素
        $(document).mouseup(function (e) {
            lastTime = new Date().getTime(); 
            /**
             * 单击元素排序
             */   
            if( (lastTime - firstTime) < 200 && startType == 'filter'){  
                filters[startIndex].sort = (filters[startIndex].sort == 'asc' ? 'desc':'asc'); 
            } 
            flag = false; 
            // B->B 第三种B内的移动 sort
            if (startType == endType && startType == 'header') {
                if(endIndex){
                    if (endIndex > startIndex) {
                        headers.splice(endIndex, 0, headers.splice(startIndex, 1)[0]);
                    } else {
                        headers.splice(endIndex, 0, headers.splice(startIndex, 1)[0]);
                    } 
                } 
                // B->A 第二种移动 add filter
            } else if (startType == 'header' && endType == 'filter') {
                filters.push(headers.splice(startIndex, 1)[0]); 
                updateViewer();
                // A->B 第一种移动 remove filter
            } else if (startType == 'filter' && endType == 'header') {
                headers.splice(endIndex, 0, filters.splice(startIndex, 1)[0]);
                updateViewer();
            }

            $("div.item").unbind('mousedown');
            initDisplay();

            $("#triangle").css({ "display": "none" });
            $("#info").css({ "display": "none" });

            // 表头拖动事件 
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
            $("#tableH div").unbind('mouseenter');
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
        var str = ''; 
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
            str += '<div class="item" id="' + headers[i].key + '" data-type="header" data-id="' + i + '" style="width:'+ itemWid +'%">' + headers[i].value + '</div>'
        }
        tableH.innerHTML = str;
        // 初始化过滤器
        str = ''; 
        for (var i = 0; i < filters.length; i++) {
            str += '<div class="item '+ filters[i].sort +'" id="' + filters[i].key + '" data-type="filter" data-id="' + i + '"   >' + filters[i].value + '</div>'
        }
        cFilter.innerHTML = str;  

        // 表头拖动事件
        $("div.item").mousedown(itemMouseDown); 
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
                map[ai[type]] = ""; 
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