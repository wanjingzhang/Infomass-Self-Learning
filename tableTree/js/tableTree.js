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
            str += "<div id='" + vTableData.tableHeader[i] + "' data-name='"+ vTableData.tableHeader[i] +"' draggable='true' >" + i + "</div>"
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

        // 初始化事件
        for(var i in vTableData.tableHeader){
            var header = document.getElementById(vTableData.tableHeader[i]);
            /** 表头拖拽事件 */  
            header.ondragstart = function(event){
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
            header.onmousedown = function(){
                console.log("onmouseDown");
                let startIndex = $(this).index();
                let endIndex;
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
                $(document).mouseup(function() {
                    flag = false;
                    $('#triangle').css('display', 'none');
                    $('#info').css({
                        display: 'none'
                    });
                    if (endIndex < startIndex) {
                        // $('#mainTable tr:eq(' + i + ') td:eq(' + endIndex + ')').before($('#mainTable tr:eq(' + i + ') td:eq(' + startIndex + ')').clone(true));
                        // $('#mainTable tr:eq(' + i + ') td:eq(' + (startIndex + 1) + ')').remove();
                        $('#tableH div:eq(' + endIndex + ')').before($('#tableH div:eq(' + startIndex + ')').clone(true));
                        $('#tableH div:eq(' + (startIndex + 1) + ')').remove();
                    } else if (endIndex > startIndex) { 
                            // $('#mainTable tr:eq(' + i + ') td:eq(' + endIndex + ')').after($('#mainTable tr:eq(' + i + ') td:eq(' + startIndex + ')').clone(true));
                            // $('#mainTable tr:eq(' + i + ') td:eq(' + (startIndex) + ')').remove();
                            $('#tableH div:eq(' + endIndex + ')').after($('#tableH div:eq(' + startIndex + ')').clone(true));
                            $('#tableH div:eq(' + (startIndex) + ')').remove(); 
                    }
                    $(document).unbind("mousemove");
                    $(document).unbind("mouseup");
                    $('#tableH div').unbind("mouseenter");
                });
            }
            headers.push(header);
        }

        // 容器接受事件
        for(var i = containers.length-1; i > -1; i--){
            /** 过滤器放置事件 */
            // containers[i].ondragenter = function (e) { 
            //     console.log("cFilter.ondragenter");
            // }

            /** 过滤器放置事件 */
            containers[i].ondragover = function (event) { 
                var e = event || window.event;
                // console.log("cFilter.ondragover");
                e.preventDefault();
            }

            /** 过滤器放置事件 */
            // containers[i].ondragleave = function (e) { 
            //     console.log("cFilter.ondragleave");
            // }

            /** 过滤器放置事件 */
            containers[i].ondrop = function(event){
                // 必须是父节点才可以接受元素
                if(event.target.id == "filterC" || event.target.id == "tableH"){
                    console.log("cFilter ondrop");
                    var e = event || window.event;
                    var data = e.dataTransfer.getData('text');
                    e.target.appendChild(document.getElementById(data));
                } 
            }
        }  

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