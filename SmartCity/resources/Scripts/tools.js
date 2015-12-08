


function isIE() { //ie?  
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}  

/*获取窗口大小，网页大小*/
function getPageSize() {
    var xScroll, yScroll;
    if (window.innerHeight && window.scrollMaxY) {
        xScroll = window.innerWidth + window.scrollMaxX;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac   
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari   
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }
    var windowWidth, windowHeight;
    if (self.innerHeight) { // all except Explorer   
        if (document.documentElement.clientWidth) {
            windowWidth = document.documentElement.clientWidth;
        } else {
            windowWidth = self.innerWidth;
        }
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode   
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers   
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }
    // for small pages with total height less then height of the viewport   
    if (yScroll < windowHeight) {
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }
    // for small pages with total width less then width of the viewport   
    if (xScroll < windowWidth) {
        pageWidth = xScroll;
    } else {
        pageWidth = windowWidth;
    }
    return { 'pageWidth': pageWidth, 'pageHeight': pageHeight, 'windowWidth': windowWidth, 'windowHeight': windowHeight };

}


//刷新页面
function refreshwin() {
    window.location.reload();
}


//在Iframe中打开指定页面
function OpenURLInFrame(targeturl, iframeid) {
    if (targeturl != null && iframeid != null&&targeturl!='#') {

        targeturl = MakeURLWithRandom(targeturl);
        var iframe = document.getElementById(iframeid);
        iframe.src = targeturl;

    }
}


function MakeURLWithRandom(originalURL) {
    var targetURL;
    // 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空
    if (originalURL.indexOf("?") != -1) //如果存在参数
    {
        targetURL = originalURL + "&randid=" + Math.random();
    }
    else {
        targetURL = originalURL + "?randid=" + Math.random();
    }
    return targetURL;
}

//给URL附加新参数
function AttachUrlParameter(originalURL,paraName,paraValue) {
    var targetURL;
    // 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空
    if (originalURL.indexOf("?") != -1) //如果存在参数
    {
        targetURL = originalURL + "&" + paraName + "=" + paraValue;
    }
    else {
        targetURL = originalURL + "?" + paraName + "=" + paraValue;
    }
    return targetURL;
}

////////////////// yj  begin ////////////////////////////////
//功能：主要用于接件，批转 列表
//显示下拉菜单
function DropDownMenu_show(node) {
    var menu = node.getElementsByTagName("ul")[0];
    if (menu != null) {
        menu.style.display = "block";
    }
}

//隐藏下拉菜单
function DropDownMenu_hide(node) {
    var menu = node.getElementsByTagName("ul")[0];
    if (menu != null) {
        menu.style.display = "none";
    }
}
//打开新页面（同一窗体）
function goUrl(url) {
    if (url != null) {
        document.location = url;
    }
}

//打开新页面（新窗体）
function openUrl(url) {
    if (url != null) {
        window.open(url);
    }
}

//
function CheckGrid_checkAll(obj, cName) {
    var checkboxs = document.getElementsByName(cName);
    for (var i = 0; i < checkboxs.length; i++) {
        checkboxs[i].checked = obj.checked;
    }
}

//
function CheckGrid_checkItem(pName, cName) {
    var checkbox = document.getElementsByName(pName);
    if (checkbox.length == 1) {
        var checked = false;
        var checkboxs = document.getElementsByName(cName);
        for (var i = 0; i < checkboxs.length; i++) {
            if (checkboxs[i].checked) {
                checked = true;
                break;
            }
        }
        checkbox[0].checked = checked;
    }
}
//展开其他行
//tablename: table的ID，
//trindex:点击的TR 的索引号 ,要展开的TR 的ID ="tr"+trindex + _ + 索引号
//curtrobj: 当前点击的TR对象
function showOtherop(tablename, trindex, curtrobj) {
   
    curtrobj.style.display = "none";
    //收缩按钮显示
    var impobj = document.getElementById("imp_" + trindex);
    impobj.style.display = "block";
   
    //获取整个表对象
    var table = document.getElementById(tablename);
    
    if (table == null) return;
    //展开行名称以下面的开头的
    var mStart = "tr" + trindex + "_";
    //循环表的行
    for (i = 0; i < table.rows.length; i++) {
       
        if (table.rows[i].id.indexOf(mStart) == 0) {
            table.rows[i].style.display = "block";
            $(table.rows[i]).removeAttr("style")
        }
    }
}

function hidOtherop(tablename, trindex, curtrobj) {
    curtrobj.style.display = "none";
   
    //展开按钮显示
    var impobj = document.getElementById("exp_" + trindex);
    impobj.style.display = "block";
   
    //获取整个表对象
    var table = document.getElementById(tablename);
    if (table == null) return;
    
    //展开行名称以下面的开头的
    var mStart = "tr" + trindex + "_";
    //循环表的行
    for (i = 0; i < table.rows.length; i++) {
        if (table.rows[i].id.indexOf(mStart) == 0) {
            table.rows[i].style.display = "none";
        }
    }

}

function QueryString(sName) {
    var sSource = String(window.document.location);
    var sReturn = "";
    var sQUS = "?";
    var sAMP = "&";
    var sEQ = "=";
    var iPos;
    iPos = sSource.indexOf(sQUS);
    var strQuery = sSource.substr(iPos, sSource.length - iPos);
    var strLCQuery = strQuery.toLowerCase();
    var strLCName = sName.toLowerCase();
    iPos = strLCQuery.indexOf(sQUS + strLCName + sEQ);
    if (iPos == -1) {
        iPos = strLCQuery.indexOf(sAMP + strLCName + sEQ);
        if (iPos == -1)
            return "";
    }
    sReturn = strQuery.substr(iPos + sName.length + 2, strQuery.length - (iPos + sName.length + 2));
    var iPosAMP = sReturn.indexOf(sAMP);
    if (iPosAMP == -1)
        return sReturn;
    else {
        sReturn = sReturn.substr(0, iPosAMP);
    }
    return sReturn;
}

////////////////// yj  end  ////////////////////////////////