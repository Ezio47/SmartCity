
if (!window.app) {
    window['app'] = {
        popup: null,

        showPopup: function (title, content) {
            if (!app.popup) {
                app.popup = sgworld.Creator.CreatePopupMessage(title, "", 200, 300, 381, 305);
                app.popup.InnerHtml = content;
                //Width
                //Height
                //InnerText
            }
            try {
                sgworld.Window.ShowPopup(app.popup);
            } catch (e) {
            }

        },

        hidePopup: function () {
            if (app.popup) {
                sgworld.Window.RemovePopup(app.popup);
            }
        },
        attributesInfo: function () {
            var jsons = {
                "对象编号": 493160,
                "对象类别": "结构柱",
                "材质": "混凝土",
                "直径": "900mm",
                "经度": "116度16分28秒",
                "维度": "39度40分46秒",
                "高度": "37.67米",
                "设计单位": "华通设计顾问工程有限公司",
                "施工单位": "中交第四公路工程局有限公司",
                "监理单位": "中咨工程建设监理公司"
            };
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

            app.showPopup("属性查询", html);

            // return html;
        },
        toAbspath: function (src) {
            var abspath = function () {
                var abspath = "";
                try {
                    abspath = unescape(window.location.href);
                }
                catch (e) {
                    abspath = unescape(this.__location);
                }
                // Remove query String 
                var index = abspath.indexOf("?");
                if (index > 0) abspath = abspath.substr(0, index - 1);

                index = abspath.lastIndexOf("/");
                var index2 = abspath.lastIndexOf("\\");

                index = (index > index2) ? index : index2;
                if (index <= 0) return abspath;

                abspath = abspath.substring(0, index);

                if (abspath.substring(0, 1) == "/") abspath = abspath.slice(1);

                var re = /file:\/\/\//gi;
                if (abspath.match(re) != null) abspath = abspath.replace(re, ""); // if this is indeed a local file, we strip the "file://" prefix from it.    

                return (abspath);

            }
            var re = /^http:\/\/|^ftp:\/\/|^file:\/\/|^https:\/\//gi;
            if (src.match(re) == null) {
                if (src.indexOf("[TE Application Data]") != 0)
                    return abspath() + '/' + src;
            }
            else {
                // if this is indeed a local file, we strip the "file://" prefix from it.    
                re = /file:\/\/\//gi;
                if (src.match(re) != null)
                    src = src.replace(re, "");
                else {
                    re = /file:\/\//gi;
                    if (src.match(re) != null) src = src.replace(re, "");
                }
            }

            return src;

        },
        getGeoInfo: function (e) {


        }
    }
}