(function () {
    var ua = navigator.userAgent.toLowerCase();
    var is = (ua.match(/\b(chrome|opera|safari|msie|firefox)\b/) || ['', 'mozilla'])[1];
    var r = '(?:' + is + '|version)[\\/: ]([\\d.]+)';
    var v = (ua.match(new RegExp(r)) || [])[1];
    jQuery.browser = function () { };
    jQuery.browser.is = is;
    jQuery.browser.ver = v;
    jQuery.browser[is] = true;
    
})();


(function (JQeury) {
 JQeury.Messagers=this;
 this.list=new Array();
 this.AddMessager=function(_messager){
 list.push(_messager);
 }
 return JQeury;
 }
)(jQuery);




(function (jQuery) {
    /*
    * 
    * jQuery Plugin - Messager
    * 
    * Author: corrie Mail: corrie@sina.com Homepage: www.corrie.net.cn
    * 
    * Copyright (c) 2008 corrie.net.cn
    * 
    * @license http://www.gnu.org/licenses/gpl.html [GNU General Public
    * License]   * 
    * 
    * 
    * $Date: 2008-12-26
    * 
    * $Vesion: 1.5 @ how to use and example: Please Open index.html
    * 
    */
    
    this.layer = {
        'width': 200,
        'height': 100
    };
    this.title = '信息提示';
    this.time = 4000;       
    this.anims = {
        'type': 'slide',
        'speed': 600,
        'position':'bottom'
    };
    this.instances=new Array();
    this.timer1 = null;
    this.inits = function (_msgid, _closeid,_anims,_hoverclose,_time) {    

        this.instances.push({'msgid':_msgid,'anims':_anims,'time':_time});//将当前初始化实例存入数组中
        //$(document.body).prepend('<div id="message" style="border:#b9c9ef 1px solid;z-index:100;width:' + this.layer.width + 'px;height:' + this.layer.height + 'px;position:absolute; display:none;background:#cfdef4; bottom:0; right:0; overflow:hidden;"><div style="border:1px solid #fff;border-bottom:none;width:100%;height:25px;font-size:12px;overflow:hidden;color:#1f336b;"><span id="message_close" style="float:right;padding:5px 0 5px 0;width:16px;line-height:auto;color:red;font-size:12px;font-weight:bold;text-align:center;cursor:pointer;overflow:hidden;">×</span><div style="padding:5px 0 5px 5px;width:100px;line-height:18px;text-align:left;overflow:hidden;">' + title + '</div><div style="clear:both;"></div></div> <div style="padding-bottom:5px;border:1px solid #fff;border-top:none;width:100%;height:auto;font-size:12px;"><div id="message_content" style="margin:0 5px 0 5px;border:#b9c9ef 1px solid;padding:10px 0 10px 5px;font-size:12px;width:' + (this.layer.width - 17) + 'px;height:' + (this.layer.height - 50) + 'px;color:#1f336b;text-align:left;overflow:hidden;">' + text + '</div></div></div>');
        
        $(_closeid).click(function () {
            setTimeout('this.closemsg("'+_msgid+'")', 1);
        });
        $(_msgid).hover(function () {//鼠标移上移出时间绑定
            clearTimeout(timer1);
            timer1 = null;
        }, _hoverclose?function () {
            if (_time > 0)
                timer1 = setTimeout('this.closemsg("'+_msgid+'")', _time);
        }:null);
        $(window).scroll(function () {
            var bottomHeight = "-" + document.documentElement.scrollTop;
            $(_msgid).css("bottom", bottomHeight + "px");
        });
    };
    this.show = function (_msgid, _closeid, _anims,_hoverclose,_time) {
        if(_anims==0 || !_anims)_anims = this.anims;         
         var obj;
          $.each(this.instances, function(i,cur){       
          if( cur['msgid']==_msgid)//如果实例列表中已经存在,说明已经显示
          {
             obj=cur;
             return false;
          }
          });
          if(obj!=null)
          {          
           return false ;    
          }  
       else
        {
        this.inits(_msgid, _closeid,_anims,_hoverclose,_time);  
        }      
        switch(_anims.position)
        {
           case 'top':
                 //var topHeight = "-" + document.documentElement.scrollTop;
                 var topHeight=0;
                 $(_msgid).css("top", topHeight + "px");  
                break;
           case 'bottom':
                 var bottomHeight = "-" + document.documentElement.scrollTop;
                 $(_msgid).css("bottom", bottomHeight + "px");  
                break;
           default:
                 var bottomHeight = "-" + document.documentElement.scrollTop;
                 $(_msgid).css("bottom", bottomHeight + "px");  
                break;
        }  
           
        switch (_anims.type) {
            case 'slide':                
                $(_msgid).slideToggle(_anims.speed);
                break;
            case 'fade':
                $(_msgid).fadeIn(_anims.speed);
                break;
            case 'show':
                $(_msgid).show(_anims.speed);
                break;
            default:
                $(_msgid).slideDown(_anims.speed);
                break;
        }
      
        if ($.browser.is == 'chrome') {
            setTimeout(function () {
                $(_msgid).remove();
                this.inits(title, text);
                $(_msgid).css("display", "block");
            }, _anims.speed - (this.anims.speed / 5));
        }
       // this.rmmessage(_msgid,_time);
    };
    this.lays = function (width, height) {
        if (width != 0 && width)
            this.layer.width = width;
        if (height != 0 && height)
            this.layer.height = height;
    }
    /*this.anim = function (type, speed) {
        if (type != 0 && type)
            this.anims.type = type;
        if (speed != 0 && speed) {
            switch (speed) {
                case 'slow':
                    ;
                    break;
                case 'fast':
                    this.anims.speed = 200;
                    break;
                case 'normal':
                    this.anims.speed = 400;
                    break;
                default:
                    this.anims.speed = speed;
            }
        }
    }*/
    this.rmmessage = function (_msgid,_time) {
        if (_time > 0) {
            timer1 = setTimeout('this.closemsg("'+_msgid+'")', _time);
        }
    };
    this.closemsg = function (_msgid) {        
         var obj;
          $.each(this.instances, function(i,cur){       
          if( cur['msgid']==_msgid)//如果实例列表中已经存在,说明已经显示
          {
             obj=cur;
             return false;
          }
          });
         if(obj!=null)
         {
         var anim=obj.anims;       

        switch (anim.type) {
            case 'slide':
                $(_msgid).slideUp(anim.speed);
                break;
            case 'fade':
                $(_msgid).fadeOut(anim.speed);
                break;
            case 'show':
                $(_msgid).hide(anim.speed);
                break;
            default:
                $(_msgid).slideUp(anim.speed);
                break;
        } ;
          this.instances.splice($.inArray(obj[0],this.instances),1);//移除实例
        //setTimeout('$("' + _msgid + '").remove();', anim.speed);
        this.original();
        }
    }
    this.original = function () {
        this.layer = {
            'width': 200,
            'height': 100
        };
        this.title = '信息提示';
        this.time = 4000;
        this.anims = {
            'type': 'slide',
            'speed': 600
        };
    };
    jQuery.messager = this;
    return jQuery;
})(jQuery);