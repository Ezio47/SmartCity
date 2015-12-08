var infoWindow;
var pop;
var cur1, abgr1, hColor1;
var cur2, abgr2, hColor2;


String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}

//数组去重方法
Array.prototype.unique = function () {
    var res = [];
    var json = {};
    for (var i = 0; i < this.length; i++) {
        if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}

//给数组添加包含某字段的方法
Array.prototype.contains = function (e) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == e)
            return true;
    }
    return false;
}

//给数组添加indexOf方法
Array.prototype.indexOf = function (testZi) {
    for (var i = 0; i < this.length; i++) {
        if (testZi === this[i]) {
            return i;
        }
    }
    return -1;
};
//数组元素的相加方法
Array.prototype.sum = function () {
    return this.reduce(sum) || reduce(this, sum); //使用泛型函数
}

//数组元素的最大值
Array.prototype.max = function () {
    return Math.max.apply(null, this);
}

//数组元素的平均值
Array.prototype.average = function () {
    return this.reduce(sum) / this.length || reduce(this, sum) / this.length;
}

//数组元素的最小值
Array.prototype.min = function () {
    return Math.min.apply(null, this);
}

//求和
var sum = function (x, y) {
    return x + y;
}

var map = Array.prototype.map ? function (a, f) { return a.map(f) } : function (a, f) {
    var results = [];
    for (var i = 0, len = a.length; i < len; i++) {
        if (i in a) results[i] = f.call(null, a[i], i, a);
    }
    return results;
}

var reduce = Array.prototype.reduce ? function (a, f, initial) {
    if (arguments.length > 2)
        return a.reduce(f, initial);
    else return a.reduce(f);
} : function (a, f, initial) {
    var i = 0, len = a.length, accumulator;
    if (arguments.length > 2) accumulator = initial;
    else {
        if (len === 0) throw TypeError();
        while (i < len) {
            if (i in a) {
                accumulator = a[i++];
                break;
            }
            else i++;
        }
        if (i === len) throw TypeError();
    }

    while (i < len) {
        if (i in a)
            accumulator = f.call(undefined, accumulator, a[i], i, a);
        i++;
    }
    return accumulator;
}


function CreateSGObj() {
    var obj = document.getElementById("sgworld");
    if (obj == null) {
        obj = document.createElement('object');
        document.body.appendChild(obj);
        obj.name = "sgworld";
        obj.id = "sgworld";
        //obj = TE3DWindow.CreateInstance("TerraExplorerX.SGWorld66");
        obj.classid = "CLSID:3a4f9199-65a8-11d5-85c1-0001023952c1";
    }
    return obj;
}

////获取获取url参数
function getParameter(param) {
    var query = window.location.search; //获取URL地址中？后的所有字符 
    var iLen = param.length; //获取你的参数名称长度 
    var iStart = query.indexOf(param); //获取你该参数名称的其实索引 
    if (iStart == -1)//-1为没有该参数 
        return "";
    iStart += iLen + 1;
    var iEnd = query.indexOf("&", iStart); //获取第二个参数的其实索引 
    if (iEnd == -1)//只有一个参数 
        return query.substring(iStart); //获取单个参数的参数值 
    return query.substring(iStart, iEnd); //获取第二个参数的值 
}

function flyToLoc(code) {
    if (code) {
        var dir = "模型\\1-3号建筑\\1-3号外壳-三维视图";
        var ml = getObject(dir);
        flyTo(ml);
    }
}

function getObject(dir) {
    var obj = sgworld.ProjectTree.GetObject(sgworld.ProjectTree.FindItem(dir));
    return obj;
}

function flyTo(obj, type) {
    if (obj) {
        try {
            if (!type && type !== 0) {
                sgworld.Navigate.FlyTo(obj);
            } else {
                sgworld.Navigate.FlyTo(obj, type);
            }

        } catch (e) {
            exportLog(e.message);
        }
    }

}

function filterLayer(obj, name) {
    var layer;
    if (obj.ObjectType === 38 || obj.ObjectType === 36) {
        layer = sgworld.ProjectTree.GetLayer(obj.ID);
        layer.Filter = "NAME= '" + name + "'";
        layer.refresh();
    }
}


//
function feature1Glitter(feature) {
    if (cur1) {
        cur1.Tint.abgrColor = abgr1;
    }
    if (!hColor1) {
        hColor1 = "#ff00ff";
    }
    if (feature) {
        abgr1 = feature.Tint.abgrColor;
        cur1 = feature;
        feature.Tint.FromHTMLColor(hColor1);

        setTimeout(function () {
            cur1.Tint.abgrColor = abgr1;
        }, 30000);
    }
}

function feature2Glitter(feature) {
    if (cur2) {
        cur2.Tint.abgrColor = abgr2;
    }
    if (!hColor2) {
        hColor2 = "#dc143c";
    }
    if (feature) {
        abgr2 = feature.Tint.abgrColor;
        cur2 = feature;
        feature.Tint.FromHTMLColor(hColor1);

        setTimeout(function () {
            cur2.Tint.abgrColor = abgr2;
        }, 30000);
    }
}

function findAndFlyTo(dir) {
    var ml = sgworld.ProjectTree.GetObject(sgworld.ProjectTree.FindItem(dir));
    flyTo(ml);
}

function showPipeLoc(code) {
    var dir = "模型\\1-3号建筑\\1-3号外壳-三维视图";
    findAndFlyTo(dir);
}



//属性查询  maxx 2015-11-17
function attributesInfo(obj) {
    var jsons = {
        //"对象编号": 493160,
        //"对象类别": "结构柱",
        //"材质": "混凝土",
        //"直径": "900mm",
        //"经度": "116度16分28秒",
        //"维度": "39度40分46秒",
        //"高度": "37.67米",
        //"设计单位": "华通设计顾问工程有限公司",
        //"施工单位": "中交第四公路工程局有限公司",
        //"监理单位": "中咨工程建设监理公司"
    };
    if (obj) {
        jsons = obj;
    }
    var kind = 0;
    var html = '<div><table align="center"  style="font-family: 宋体;font-size: 15px;border:2px solid #aaa" border-collapse: separate;margin:2px;padding:2px; cellpadding="1" cellspacing="1"><thead><tr><th>编号</th><th>属性名</th><th>属性值</th></tr></thead><tbody>';
    for (var attr in jsons) {

        if (jsons.hasOwnProperty(attr)) {
            kind++;
            if (kind % 2 === 0) {
                html += '<tr>';
            } else {
                html += '<tr bgcolor="#bfdbff">';
            }
            html += '<td>' + kind + '</td><td>' + attr + '</td><td>' + jsons[attr] + '</td></tr>';
        }
    }
    html += '</tbody></table></div>';

    return html;
}


function showInfo(title, content, height, width, top, left) {
    if (!infoWindow) {
        infoWindow = sgworld.Creator.CreatePopupMessage("", "", 0, 0, 200, 200);
    }
    var t = "", h = 200, w = 200, tt = 0, l = 0;
    if (title) {
        t = title;
    }
    infoWindow.Caption = t;
    if (width) {
        w = width;
    }
    infoWindow.Width = w;
    if (height) {
        h = height;
    }
    infoWindow.Height = h;
    if (top) {
        tt = top;
    }
    infoWindow.Top = tt;

    if (left) {
        l = left;
    }
    infoWindow.Left = l;

    if (content) {
        infoWindow.InnerHtml = content;
    }
    sgworld.Window.ShowPopup(infoWindow);
}

function showPop(title, content, height, width) {
    var maxWidth = sgworld.Window.Rect.width;
    var maxHeight = sgworld.Window.Rect.Height;
    if (!pop) {
        pop = sgworld.Creator.CreatePopupMessage("", "", 100, 100, 200, 200);
    }
    var t = "", h = 200, w = 200, tt = 0, l = 0;
    if (title) {
        t = title;
    }
    pop.Caption = t;
    if (width) {
        w = width;
    }
    pop.Width = w;
    if (height) {
        h = height;
    }
    pop.Height = h;
    pop.Top = 255;
    pop.Left = 0;

    if (content) {
        pop.InnerHtml = content;
    }
    pop.ShowCaption = true;//显示标题
    pop.AllowDrag = true;//允许拖拽

    pop.AllowResize = true;
    sgworld.Window.ShowPopup(pop);
}

//显示坐标
function showObject(dir, flag) {
    try {
        var item = sgworld.ProjectTree.FindItem(dir);
        sgworld.ProjectTree.SetVisibility(item, flag);
    } catch (e) {
        exportLog(e);
    }

}


function getFeatureLayer(modeDir, name) {
    var theMeshFeatureLayer = sgworld.ProjectTree.GetObject(sgworld.ProjectTree.FindItem(modeDir));
    var layer = null;
    for (var j = 0; j < theMeshFeatureLayer.FeatureLayers.Count; j++) {
        var geoName = theMeshFeatureLayer.FeatureLayers.Item(j).TreeItem.Name;
        if (name === geoName) {
            layer = theMeshFeatureLayer.FeatureLayers.Item(j);
        }
    }
    return layer;
}


//属性查询要素
function query(obj, name) {
    var layer = findChildId(obj.ID);

    var reFeature = null;

    //图层无效
    //    var box2D = layer.DataSourceInfo && layer.DataSourceInfo.BBox || layer.BBox;

    //      var cVerticesArray = [
    //box2D.MinX, box2D.MaxY, 0,
    //box2D.MaxX, box2D.MaxY, 0,
    //box2D.MaxX, box2D.MinY, 0,
    //box2D.MinX, box2D.MinY, 0
    //     ];
    var box = [
        116.272392, 39.680848, 0,
        116.276996, 39.680908, 0,
        116.279328, 39.678255, 0,
        116.272868, 39.677862, 0
    ];

    var geo = sgworld.Creator.GeometryCreator.CreateLinearRingGeometry(box);
    var cPolygonGeometry = sgworld.Creator.GeometryCreator.CreatePolygonGeometry(geo, null);

    try {
        var features = layer.ExecuteSpatialQuery(cPolygonGeometry);

        for (var i = 0; i < features.Count; i++) {
            var feature = features(i);

            var geoName = feature.FeatureAttributes.GetFeatureAttribute("Name").Value;
            if (geoName.indexOf(name) > -1 || name.indexOf(geoName) > -1) {
                reFeature = feature;
                break;
            }
        }

    } catch (e) {
        exportLog(e.message);
    }
    return reFeature;
}

function setLayerVisibility(modeDir, bBool) {
    var theMeshFeatureLayer = sgworld.ProjectTree.GetObject(sgworld.ProjectTree.FindItem(modeDir));

    for (var j = 0; j < theMeshFeatureLayer.FeatureLayers.Count; j++) {
        sgworld.ProjectTree.SetVisibility(theMeshFeatureLayer.FeatureLayers.Item(j).ID, true);
    }
}

//输出日志
function exportLog(e) {
    var message = e.message || e;
    try {
        console.log("日志:" + message);
    } catch (e) {
    }
}

//寻找组图层
function findGroupId(id) {
    if (!sgworld.ProjectTree.IsGroup(id)) {
        id = sgworld.ProjectTree.GetNextItem(id, 15); //寻找GroupID
        return findGroupId(id);
    } else {
        return id;
    }
}

//找到子节点
function findChildId(id) {
    var cid = sgworld.ProjectTree.GetNextItem(id, 11);
    var obj = sgworld.ProjectTree.GetObject(cid);
    if (obj.ObjectType !== 39) {
        return findChildId(cid);
    } else {
        return obj;
    }

}

//根据属性定位到要素
function locFeature(obj, type) {
    try {
        var ml = sgworld.ProjectTree.GetObject(sgworld.ProjectTree.FindItem(obj.path));
        var feature = query(ml, obj.name);//属性查询
        flyTo(feature,14);//定位到要素
        if (type && type === 1) {
            feature1Glitter(feature); //高亮选中要素
        } else {
            feature2Glitter(feature); //高亮选中要素
        }
    } catch (e) {
        exportLog(e.message);
    }

}

//判断是否为中文属性
function isCHICode(code) {
    var reg = /^[\u4E00-\u9FA5]+$/; //判断是否为中文
    if (reg.test(code)) {
        return true;
    }
    return false;
}

function replaceCHICode(str, delimiter) {
    var reg = /^[\u4E00-\u9FA5]+$/; //判断是否为中文
    str.replace(reg, delimiter);
}


function transfer(code) {
    var num = code;
    var pairs = {
        "一": 1,
        "二": 2,
        "三": 3,
        "四": 4,
        "五": 5,
        "六": 6,
        "七": 7,
        "八": 8,
        "九": 9,
        "十": 10,
        "十一": 11,
        "十二": 12,
        "十三": 13,
        "十四": 14,
        "十五": 15,
        "十六": 16
    };
    for (var p in pairs) {
        if (p === code) {
            num = pairs[p];
        }
    }
    return num;

}

