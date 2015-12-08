var gs = gs || {};

//窗口打开工具类
gs.opener = function DialogOpener(_hostwin) {
    this.hostwin = window.top;
    if (_hostwin == undefined) {
        if (window.top != null) {
            this.hostwin = window.top;
        }
        else if (window.parent != null) {
            this.hostwin = window.parent;
        }
        else {
            this.hostwin = window.self;
        }
    }
    else {
        if (_hostwin == "top") {
            this.hostwin = window.top;
        }
        else if (_hostwin == "parent") {
            this.hostwin = window.parent;
        }
        else if (_hostwin == "self") {
            this.hostwin = window.self;
        }        
    }

    RegHost(this.hostwin);

    this.host = this.hostwin.gsdialog;
    this.callbacks = { ok: null, cancel: null };
    this.open = function (title, url, width, height, ismodal, data) {
        this.host.open(title, url, width, height, ismodal, window.self, data, this.callbacks);
        //window.alert("hostwin: " + this.hostwin.url);
        //window.alert("host: " + this.host);
    };
    this.alert = function (title, content, oktext, canceltext, isdrag, ismodal) {
        this.host.alert(title, content, oktext, canceltext, isdrag, ismodal, this.callbacks)
    };

}

//被打开窗口处理类
gs.listener = function DialogListener() {
    if (window.parent == null) {
        return null;
    }
    this.hostwin = window.parent;
    this.host = this.hostwin.gsdialog;
    this.mtagid = $.query.get("mtagid");
    //regfunctions(this.hostwin);  
    this.ok = function () {
        this.host.close(this.mtagid, true);
    }

    this.data = function (value) {
        if (value == undefined) {
            return this.host.data(this.mtagid);
        }
        else {
            this.host.data(this.mtagid, value);
        }
    }

    this.cancel = function () {
        this.host.close(this.mtagid, false);
    }

}


//注册gsdialog宿主
function RegHost(hostwin) {
    DialogHost.call(hostwin);
}

//窗口宿主类
function DialogHost() {
    if (this.gsdialog == undefined) {
        this.gsdialog = {};       
        this.gsdialog.hostwin = this;
        this.gsdialog.dialogs = new Array();
    }
    regfunctions(this);
}

//注册方法
function regfunctions(hostwin) {
    //页面间共享数据访问
    hostwin.gsdialog.data = function (mtagid, value) {
        if (value != undefined) {
            hostwin.gsdialog.dialogs[mtagid]["data"] = value;
        }
        else {
            return hostwin.gsdialog.dialogs[mtagid]["data"];
        }
    }
    
    //打开弹窗
    hostwin.gsdialog.open = function (titie, url, width, height, ismodal, sourcewin, data, callbacks) {      
        //注册打开页面及回调函数
        var guid = Guid.NewGuid().ToString();
        hostwin.gsdialog.dialogs[guid] = { "data": data, "callbacks": callbacks };
        var targeturl = AttachUrlParameter(url, "mtagid", guid);       
        hostwin.JqueryDialog.OpenWithOutButtons(titie, targeturl, width, height, ismodal);
    }
    hostwin.gsdialog.alert = function (title, content, oktext, canceltext, isdrag, ismodal, callbacks) {
        hostwin.JqueryDialog.Alert(title, content, oktext, canceltext, isdrag, ismodal, callbacks);
    }
    //关闭弹窗
    hostwin.gsdialog.close = function (mtagid, isok) {
        var callbacks = hostwin.gsdialog.dialogs[mtagid]["callbacks"];
        var data = hostwin.gsdialog.data(mtagid);
        if (callbacks != null) {
            if (isok == true) {
                var okcallback = callbacks["ok"];
                if (okcallback != null) {
                    okcallback(data);
                }
            }
            else {
                var cancelcallback = callbacks["cancel"];
                if (cancelcallback != null) {
                    cancelcallback(data);
                }
            }
        }
        hostwin.gsdialog.dialogs[mtagid]=null;
        hostwin.JqueryDialog.Close();
    }
}

//给URL附加新参数
function AttachUrlParameter(originalURL, paraName, paraValue) {
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

