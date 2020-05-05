var tableTree = function(){ 
    var headers = [];
    var tableH = document.getElementById("tableH");
    var cFilter = document.getElementById("filterC");
    var containers = [tableH,cFilter]; 
    var tableC = document.getElementById("tableC"); 
    var flag = false;

    /** 初始化数据 */
    function initHeader(){
        // 初始化表头显示数据
        var str = "";
        for(var i in vTableData.tableHeader){
            str += "<div class='item' id='" + vTableData.tableHeader[i] + "' data-name='"+ vTableData.tableHeader[i] +"' draggable='true' >" + i + "</div>"
        }
        tableH.innerHTML = str;
        str = "";
        for(var i = 0; i > vTableData.data.length; i++){
            str += "<div>"
            for(var j in vTableData.data[i]){
                str += "";
            }
            str += "</div>"
        }
        tableC.innerHTML = str;
   
        // 表头拖动事件
        $('div.item').mousedown(function(){
            console.log("onmouseDown");
            let startIndex = $(this).index();
            let endIndex;
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
            // 拖动到表头div 即触发元素交换
            $('#tableH div').mouseenter(function() {
                endIndex = $(this).index();
                if (endIndex == startIndex) {
                    $('#triangle').css('display', 'none');
                } else {
                    $('#triangle').css('display', 'block');
                }
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
            // 交换元素
            $(document).mouseup(function(e) {
                flag = false; 
                var e = e || window.event;
                var x = e.clientX;
                var y = e.clientY;  
                console.log("x=" + x + " ;y="+y); 
                console.log("$(cFilter).width()=" + $(cFilter).width() + " ;$(cFilter).height()="+ $(cFilter).height()); 
                // 交换数据
                if(x < $(cFilter).width() && y < $(cFilter).height()){
                    // 判断位置 在筛选区域 
                    $('#filterC').append($('#tableH div.item:eq(' + startIndex + ')').clone(true));
                    $('#tableH div.item:eq(' + startIndex + ')').remove();
                } else if(x < $(cFilter).width() && y > $(cFilter).height()){
                    // 判断位置 在表头区域  
                    // $('#div.item:eq(' + endIndex + ')').after($('#div.item:eq(' + startIndex + ')').clone(true));
                    // $('div.item:eq(' + endIndex + ')').before($('#filterC div.item:eq(' + startIndex + ')').clone(true));
                    // $('#filterC div.item:eq(' + startIndex + ')').remove();

                    // 位置互换
                    if (endIndex < startIndex) {
                        // $('#mainTable tr:eq(' + i + ') td:eq(' + endIndex + ')').before($('#mainTable tr:eq(' + i + ') td:eq(' + startIndex + ')').clone(true));
                        // $('#mainTable tr:eq(' + i + ') td:eq(' + (startIndex + 1) + ')').remove();
                        $('div.item:eq(' + endIndex + ')').before($('div.item:eq(' + startIndex + ')').clone(true));
                        $('div.item:eq(' + (startIndex + 1) + ')').remove();
                    } else if (endIndex > startIndex) { 
                        // $('#mainTable tr:eq(' + i + ') td:eq(' + endIndex + ')').after($('#mainTable tr:eq(' + i + ') td:eq(' + startIndex + ')').clone(true));
                        // $('#mainTable tr:eq(' + i + ') td:eq(' + (startIndex) + ')').remove();
                        $('div.item:eq(' + endIndex + ')').after($('div.item:eq(' + startIndex + ')').clone(true));
                        $('div.item:eq(' + (startIndex) + ')').remove(); 
                    } 
                }

                $('#triangle').css('display', 'none');
                $('#info').css({'display': 'none'});

                $(document).unbind("mousemove");
                $(document).unbind("mouseup");
                $('#tableH div').unbind("mouseenter");
            });
            // 拖入元素到筛选容器
            $("#filterC").mouseenter(function(){
                
            })
        });

        // 初始化arrow的位置
        var h = $('#tableH div').height();
        $('.arrow-up').css({
            'margin-top': h
        });


        /** 表头拖拽事件 */  
        $('#tableH div').dragstart = function(event){
            var e = event || window.event;
            e.dataTransfer.setData('text',e.target.id);
            console.log("dragstart:" + e.target.id);
        }
        // header.ondragend = function(){
        //     console.log("dragend");
        // }

        // header.ondragenter = function(){
        //     console.log("ondragenter");
        // } 
        // header.ondragleave = function(){
        //     console.log("ondragleave");
        // } 
    } 

    return { 
        initHeader: initHeader
    }
}

tableTree().initHeader();