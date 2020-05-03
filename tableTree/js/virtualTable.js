function vTable(data){
    this._init_(data);
}

vTable.prototype = {
    constructor: vTable,
    _init_:function(data){
        this.data = data.data;
        this.titles = data.titles;
        this.html = '';
    },
    // 默认显示表格
    displayTable:function(){
        if(this.data != null)return;
        // 循环遍历表头
        this.html = "<div class='virtualTable'>";
        for(var i in this.titles){
            this.html += "<div>" + this.titles[i] + "</div>"
        }
        this.html += "</div>";

        return this.html;
    }
}