 /*
    * Undefined 未定义
    * parameters：
    * 构造函数 + 原型模式 :解决对象识别问题。解决属性的共享。
    **/
    function Undefined(){
        this.objType = "Undefined";
        this.val = null;
    }

    Undefined.prototype = {
        constructor: Undefined
        
    }

    /*
    * Locate 位于
    * parameters：
    * 构造函数 + 原型模式 :解决对象识别问题。解决属性的共享。
    **/
    function Locate(next="next",is="is",type="comma",times="1",constrain="doNotConstrain"){
        this.objType = "Locate";
        this.next = next;
        this.is = is;
        this.type = type;
        this.times = times;
        this.constrain = constrain; 
    }

    Locate.prototype = {
        constructor: Locate 
    }

     /*
    * Moveto 移动到
    * parameters：
    * 构造函数 + 原型模式 :解决对象识别问题。解决属性的共享。
    **/
    function Moveto(next="next",line="line",times="1",constrain="doNotConstrain"){
        this.objType = "Moveto";
        this.next = next;
        this.line = line;
        this.times = times;
        this.constrain = constrain; 
    }

    Moveto.prototype = {
        constructor: Moveto 
    }

     /*
    * Goto 移动到
    * parameters：
    * 构造函数 + 原型模式 :解决对象识别问题。解决属性的共享。
    **/
    function Goto(begin="begin",line="line"){
        this.objType = "Goto";
        this.begin = begin;
        this.line = line; 
    }

    Goto.prototype = {
        constructor: Goto 
    }  

     /*
    * Searchfor 搜索
    * parameters：
    * 构造函数 + 原型模式 :解决对象识别问题。解决属性的共享。
    **/
    function Searchfor(next="next",string="string",input="",times="1",ignoreCase="ignoreCase",constrain="doNotConstrain",anyChartPosition="1"){
        this.objType = "Searchfor";
        this.next = next;
        this.string = string;
        this.input = input;
        this.times = times;
        this.ignoreCase = ignoreCase; 
        this.constrain = constrain; 
        this.anyChartPosition = anyChartPosition;
    }

    Searchfor.prototype = {
        constructor: Searchfor 
    }

    /*
    * Mark 移动到
    * parameters：
    * 构造函数 + 原型模式 :解决对象识别问题。解决属性的共享。
    **/
    function Mark(currentPosition="current position as begin"){
        this.objType = "Mark";
        this.begin = currentPosition; 
    }

    Mark.prototype = {
        constructor: Mark 
    } 

     /*
    * Must 移动到
    * parameters：
    * 构造函数 + 原型模式 :解决对象识别问题。解决属性的共享。
    **/
    function Must(is="is",alpha="alpha"){
        this.objType = "Must";
        this.is = is;
        this.alpha = alpha; 
    }

    Must.prototype = {
        constructor: Must 
    } 

     /*
    * Assign 搜索
    * parameters：
    * 构造函数 + 原型模式 :解决对象识别问题。解决属性的共享。
    **/
    function Assign(input=""){
        this.objType = "Assign";
        this.input = input;
    }

    Assign.prototype = {
        constructor: Assign 
    } 
        
    // dataset
    var commondList = {
        Types: ['Undefined','Locate','Moveto','Goto','Searchfor','Mark','Must','Assign'],
        Locate : {
            next: ['next','previous'], 
            is: ['is','is not'],
            type: ['comma','period','space','tab','alpha','digit','sign','number','word','label','punctuation'],
            times: ['1','2','3','4','5','6','7','8','9','10','11','12','13','23','38','ord','rep'],
            constrain:['do not constrain','constrain to line','constrain to limits'] 
        },
        Moveto :{
            next: ['next','previous'],
            line: ['line','character','blank line','end of last Serach'],
            times: ['1','2','3','4','5','6','7','8','9','10','11','12','13','23','38','ord','rep'],
            constrain: ['do not constrain','constrain to line','constrain to limits'] 
        },
        Goto : {
            begin: ['begin','end'],
            line: ['line','section','file','mark','limit','bookmark']
        },
        Searchfor :{
            next: ['next','previous'],
            string: ['string','one of'],
            input: [''],
            times: ['1','2','3','4','5','6','7','8','9','10','11','12','13','23','38','ord','rep'],
            ignoreCase:['ignore case','do not ignore case'],
            constrain: ['do not constrain','constrain to line','constrain to limits'],
            anyChartPosition:['1','2','3','4','5','6','7','8','9','10','11','12','13','23','38','ord','rep']
        },
        Mark :{
            currentPosition: ['current position as begin',
            'current position as end',
            'current position as begin limit',
            'current position as end limit',
            'current position as beginBookmark',
            'current position as endBookmark',
            'number at current position',
            'word at current position',
            'label at current position',
            'line at current position',
            'cell at current position'] 
        },
        Must:{
            is: ['is','is not'],
            alpha: ['alpha','space','digit','label','number','punctuation','period','sign','tab','comma','word','string','one of']
        },
        Assign:{
            input:['']
        }
    };    
    // class list
    var classList = [Undefined,Locate,Moveto,Goto,Searchfor,Mark,Must,Assign];
    var typeList = {'Undefined':'0','Locate':'1','Moveto':'2','Goto':'3','Searchfor':'4','Mark':'5','Must':'6','Assign':'7'};

    // node type 
    /*
    * 节点数据类型：
    * child：0 子节点 保存命令 [copy,cut,paste,delete]
    * Instruction：1 子节点的父节点 命令树 [add,copy,cut,paste,delete] 粘贴复制的Child
    * Lable 标签节点 [4个参数] [add,copy,cut,paste,delete]
    * Fixed: 3 其他父节点 不可以修改的 []
    * Characters: 4 才可以粘贴 复制的Tab [add]
    * * */
    var nodeType = {'Child':'0','Instruction':'1','Characteristic':'2','Fixed':'3','Characteristics':'4'};

    // 复制的功能 添加复制的类型 节点Label 和 命令
    // Characters 添加 命令组
    var characteristicNode = function(id){
        var obj = {
            name: "Characteristic_"+ id, open: true, nodeType: '2',
            children:[
                {name: "Instructions", open: true, nodeType: '1',
                    children:
                    [{ name: "Undefined", data: JSON.stringify(new Undefined()), nodeType: '0' },
                    { name: "Undefined", data: JSON.stringify(new Undefined()), nodeType: '0' },
                    { name: "Undefined", data: JSON.stringify(new Undefined()), nodeType: '0' },
                    { name: "Undefined", data: JSON.stringify(new Undefined()), nodeType: '0' },
                    { name: "Undefined", data: JSON.stringify(new Undefined()), nodeType: '0' }]
                }
            ]
        }
        return obj;
    }