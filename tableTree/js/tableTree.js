var tableTree = function(){
    var age = document.getElementById("age");
    var gender = document.getElementById("gender");
    var objs = [age,gender,name1,name2];
    var tableH = document.getElementById("tableH");
    var cFilter = document.getElementById("filterC");
    var containers = [tableH,cFilter];

    function init(){ 
        /** 表头拖拽事件 */ 
        for(var i = objs.length-1; i > -1; i--){
            objs[i].ondragstart = function(event){
                var e = event || window.event;
                e.dataTransfer.setData('text',e.target.id);
                console.log("dragstart");
            }
            objs[i].ondragend = function(){
                console.log("dragend");
            }
    
            objs[i].ondragenter = function(){
                console.log("ondragenter");
            }
    
            objs[i].ondragleave = function(){
                console.log("ondragleave");
            }
        } 

        for(var i = containers.length-1; i > -1; i--){
            /** 过滤器放置事件 */
            containers[i].ondragenter = function (e) { 
                console.log("cFilter.ondragenter");
            }

            /** 过滤器放置事件 */
            containers[i].ondragover = function (event) { 
                var e = event || window.event;
                console.log("cFilter.ondragover");
                e.preventDefault();
            }

            /** 过滤器放置事件 */
            containers[i].ondragleave = function (e) { 
                console.log("cFilter.ondragleave");
            }

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

        
    }

    return {
        init: init
    }
}

tableTree().init();