var tableTree = function(){ 
    var tableH = document.getElementById("tableH");
    var cFilter = document.getElementById("filterC"); 
    var tableC = document.getElementById("tableC"); 
    var startType, endType;
    // 有三种状态，A->B, B->A, B->B
    var flag = false;
    var headers = [];
    var filters = [];  

    function itemMouseDown(){ 
        var startIndex = $(this).data("id");
        var endIndex;
        // 鼠标按下时获取当前的类型
        startType = $(this).data("type");
        // 状态3 B内拖动 
            // 鼠标拖动在表头上
            flag = true;
            $('#info').css({
                display: 'block'
            });
            $('#info').html($(this).html());
            $(document).mousemove(function(e) {
                if (flag) {
                    var e = e || window.event;
                    var x = e.clientX + 5 + 'px';
                    var y = e.clientY + 5 + 'px'; 
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
            $('#tableH div').mouseenter(function() {
                endIndex = $(this).index();
                endType = "header";
                $('#triangle').css('display', 'block'); 
                var offsetW = 0;
                var preTd = $(this).prevAll();
                $.each(preTd, function(id, item) {
                    offsetW += item.offsetWidth;
                })
                if (endIndex > startIndex) {
                    offsetW += $(this)["0"].offsetWidth;
                }
                $('#triangle').css({
                    'top': $(cFilter).height(),
                    'left': offsetW + 4
                });
            });
            // 拖动到过滤器 即触发 B-> A 把header里的数据元素存放在A
            $('#filterC').mouseenter(function(){
                endType = "filter";
                // 追加到A最后 
            })
            // 交换元素
        $(document).mouseup(function(e) {
            flag = false;  
            console.log("startIndex=" + startIndex + "endIndex=" + endIndex); 
            // B->B 第三种B内的移动
            if(startType == endType && startType == "header"){ 
                headers.splice(endIndex, 0, headers.splice(startIndex, 1)[0]);  
            // B->A 第二种移动 
            }else if(startType == "header" && endType == "filter"){
                filters.push(headers.splice(startIndex, 1)[0]);  
            // A->B 第一种移动
            }else if(startType == "filter" && endType == "header"){
                headers.splice(endIndex+1, 0, filters.splice(startIndex, 1)[0]);   
            }
            
            $('div.item').unbind("mousedown");
            initDisplay(headers,filters);

            $('#triangle').css({'display': 'none'});
            $('#info').css({'display': 'none'});

            // 表头拖动事件 
            $(document).unbind("mousemove");
            $(document).unbind("mouseup");
            $('#tableH div').unbind("mouseenter"); 
        });  
    }

    function initDisplay(h,f){
        // 初始化表头显示数据
        var str = "";
        headers = h;
        for(var i = 0; i < headers.length; i++){
            str += "<div class='item' id='" + headers[i].key + "' data-type='header' data-id='"+ i +"' draggable='true' >" + headers[i].value + "</div>"
        }
        tableH.innerHTML = str;
        // 初始化过滤器
        str = ""; 
        filters = f;
        for(var i = 0; i < filters.length; i++){
            str += "<div class='item' id='" + filters[i].key + "' data-type='filter' data-id='"+ i +"' draggable='true' >" + filters[i].value + "</div>"
        }
        cFilter.innerHTML = str;
        // for(var i = 0; i > vTableData.data.length; i++){
        //     str += "<div>"
        //     for(var j in vTableData.data[i]){
        //         str += "";
        //     }
        //     str += "</div>"
        // }
        // tableC.innerHTML = str;

        // 表头拖动事件
        $('div.item').mousedown(itemMouseDown);
    } 

    /** 初始化数据 */
    function initHeader(){
        initDisplay(vTableData.tableHeader,vTableData.filters); 
         
        // 初始化arrow的位置
        var h = $('#tableH div').height();
        $('.arrow-up').css({
            'margin-top': h
        }); 
    } 

    return { 
        initHeader: initHeader
    }
}

tableTree().initHeader();