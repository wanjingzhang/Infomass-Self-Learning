const relativeLine = {
    init: function() {
        // 标签容器
        this.tablePannel = document.getElementById("tablePannel");
        // 图片容器
        this.moduleImg = document.getElementById("moduleImg");
        // 线条
        this.draw = SVG('draw').size("100%", "100%");
        this.lineArr = [];
    },
    bindTabEvent: function() {
        var self = this
          , parentPosition = $('#draw').offset();
        $('.tablePannel').on('mousedown', 'li', function(e) {
        let current = self.lineArr.find(el=>{
            return el.beginValue == $(this).attr('data-question');
        }
        );
        current.begin = {};
        current.beginElement = this;
        current.begin.y = $(this).offset().top - parentPosition.top + 15;
        current.begin.x = $(this).offset().left - parentPosition.left + 110;
        current.line.show();
        current.line.stroke({
            color: "#67C23A",
        });
        current.line.plot(current.begin.x, current.begin.y, current.begin.x, current.begin.y);
        current.end = {};
        if (current.endElement) {
            $(current.endElement).removeClass('selected')
            $(this).removeClass('selected')
        }
        current.endElement = '';
        current.endValue = '';
        self.currentInfo = current;
    })
    },
    getMousePos: function(event) {
        var e = event || window.event;
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = e.pageX || e.clientX + scrollX;
        var y = e.pageY || e.clientY + scrollY;
        return {
            x: x,
            y: y
        };
    },
}