var selectPolygonId = 0;
var selectPolygonName = "area";
var selectgPolyObj = null;
var tempName = "";

//框选查询
function searchPolygon() {
    //AllEventClean();
    //CleanTint();
    //variableClean();
    selectPolygonId = sgworld.ProjectTree.FindItem("临时区域");
    if (selectPolygonId == 0) {
        selectPolygonId = sgworld.ProjectTree.CreateGroup("临时区域");
    }
    sgworld.AttachEvent("OnLButtonDown", selectPolygon_OnLButtonDown);
    sgworld.AttachEvent("OnRButtonUp", selectPolygon_OnRButtonUp);
    sgworld.AttachEvent("OnFrame", selectPolygon_OnFrame);
    sgworld.Window.SetInputMode(1);
}
function selectPolygon_OnLButtonDown(Flags, X, Y) {
    var CursorCoord = sgworld.Window.PixelToWorld(X, Y);
    if (selectgPolyObj == null) {
        var myLine = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([CursorCoord.Position.x, CursorCoord.Position.y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0]);
        selectgPolyObj = sgworld.Creator.CreatePolyline(myLine, sgworld.Creator.CreateColor(255, 0, 0, 255), 0, selectPolygonId, tempName);
        selectgPolyObj.LineStyle.Width = -1;
        selectgPolyObj.Geometry.StartEdit();
    }
    else {
        if (selectgPolyObj.ObjectType === 1) {//OT_POLYLINE
            // Deleting the temporary line
            var x = selectgPolyObj.Geometry.Points.Item(0).X;
            var y = selectgPolyObj.Geometry.Points.Item(0).Y;
            sgworld.Creator.DeleteObject(selectgPolyObj.ID);

            // Creating the polygon
            var myGeometry = sgworld.Creator.GeometryCreator.CreateLinearRingGeometry([x, y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0])
            selectgPolyObj = sgworld.Creator.createPolygon(myGeometry, sgworld.Creator.CreateColor(255, 0, 0, 255), sgworld.Creator.CreateColor(0, 255, 0, 26), 0, selectPolygonId, tempName);
            selectgPolyObj.LineStyle.Width = -2;
            selectgPolyObj.Terrain.GroundObject = true;
            selectgPolyObj.Geometry.StartEdit();
        }
        else {
            selectgPolyObj.Geometry.Rings(0).Points.Item(selectgPolyObj.Geometry.Rings(0).Points.count - 1).X = CursorCoord.Position.x;
            selectgPolyObj.Geometry.Rings(0).Points.Item(selectgPolyObj.Geometry.Rings(0).Points.count - 1).Y = CursorCoord.Position.y;
            selectgPolyObj.Geometry.Rings(0).Points.Item(selectgPolyObj.Geometry.Rings(0).Points.count - 1).Z = 0;
            selectgPolyObj.Geometry.Rings(0).Points.AddPoint(CursorCoord.Position.x, CursorCoord.Position.y, 0);
        }
    }
    return true;
}
function selectPolygon_OnFrame() {
    if (selectgPolyObj != null) {
        try {
            var mouseInfo = sgworld.Window.GetMouseInfo();
            var CursorCoord = sgworld.Window.pixelToWorld(mouseInfo.X, mouseInfo.Y);
            if (CursorCoord == null)
                return false;
            if (selectgPolyObj.ObjectType === 2) {// OT_POLYGON 
                selectgPolyObj.Geometry.Rings(0).Points.Item(selectgPolyObj.Geometry.Rings(0).Points.count - 1).X = CursorCoord.Position.x;
                selectgPolyObj.Geometry.Rings(0).Points.Item(selectgPolyObj.Geometry.Rings(0).Points.count - 1).Y = CursorCoord.Position.y;
                selectgPolyObj.Geometry.Rings(0).Points.Item(selectgPolyObj.Geometry.Rings(0).Points.count - 1).Z = 0;
            }
            else {
                selectgPolyObj.Geometry.Points.Item(selectgPolyObj.Geometry.Points.count - 1).X = CursorCoord.Position.x;
                selectgPolyObj.Geometry.Points.Item(selectgPolyObj.Geometry.Points.count - 1).Y = CursorCoord.Position.y;
                selectgPolyObj.Geometry.Points.Item(selectgPolyObj.Geometry.Points.count - 1).Z = 0;
            }
        }
        catch (e) { }
    }
}
// private static ITerrainHole61 tempModifier = null;
function selectPolygon_OnRButtonUp(Flags, X, Y) {
    var htmlStr = "";
    selectPolygonId = 0;
    selectPolygonName = "area";
    sgworld.DetachEvent("OnLButtonDown", selectPolygon_OnLButtonDown);
    sgworld.DetachEvent("OnRButtonUp", selectPolygon_OnRButtonUp);
    sgworld.DetachEvent("OnFrame", selectPolygon_OnFrame);
    sgworld.Window.SetInputMode(0);
    try {
        if (selectgPolyObj != null) {
            if (selectgPolyObj.ObjectType == 1) {
                sgworld.Creator.DeleteObject(selectgPolyObj.ID);
            }
            else {
                selectgPolyObj.Geometry.Rings(0).Points.DeletePoint(selectgPolyObj.Geometry.Rings(0).Points.count - 1);
                if (selectgPolyObj.Geometry.Rings(0).Points.count > 2) {
                    selectgPolyObj.Geometry.EndEdit();
                    // var AllPath = new Array();
                    // AllPath.push();
                    var layerItemId = sgworld.ProjectTree.FindItem("城市管理\\城管案件\\城管案件"); //管道\\
                    if (layerItemId != 0) {
                        var pipeLayer = sgworld.ProjectTree.GetObject(layerItemId);
                        if (pipeLayer.ObjectType == 36) {
                            try {
                                var selectedLayer = pipeLayer.ExecuteSpatialQuery(selectgPolyObj.Geometry, 1);
                                if (selectedLayer.Count > 0) {
                                    htmlStr = "<html><head><title></title>";
                                    htmlStr += "<style>table{border-right:1px solid #11264f;border-bottom:1px solid #11264f}table td{border-left:1px solid #11264f;border-top:1px solid #11264f}</style>";
                                    htmlStr += "<script type='text/javascript'>function CreateSGObj() {var obj = $('sgworld');if (obj == null) {obj = document.createElement('object');document.body.appendChild(obj);obj.name = 'sgworld';obj.id = 'sgworld';obj.classid = 'CLSID:3a4f9197-65a8-11d5-85c1-0001023952c1';}return obj;}function $(id) {return window.document.getElementById(id);}</script>"
                                    //htmlStr += "<script type='text/javascript'>for (var m = 0; m < selectedLayer.Count; m++) {iAttribute = selectedLayer(m);}</script>"
                                    //htmlStr += "<script type='text/javascript'>function getXY(){var sgworld=CreateSGObj();var x=iAttribute.Geometry.X;var y=iAttribute.Geometry.Y;var pp=sgworld.Creator.CreatePosition(x,y);} </script>"
                                    htmlStr += "<script type='text/javascript'>function flyTO(x,y){var sgworld=CreateSGObj();var pp=sgworld.Creator.CreatePosition(x,y,300,0,0,-89,0,200);  sgworld.Navigate.FlyTo(pp)}</script>"
                                    htmlStr += "</head><body style='width:100%;height:100%;  margin:2px; padding:2px;'><table style='width:100%; text-align:center;font-size:12px;' border='0' cellspacing='0' cellpadding='0'><tr style='background-color:#11264f'>";
                                    var firstFeature = selectedLayer(0);
                                    htmlStr += "<td style='color:white;'>";
                                    htmlStr += "名称";
                                    htmlStr += "</td>";
                                    htmlStr += "<td style='color:white;'>";
                                    htmlStr += "日期";
                                    htmlStr += "</td>";
                                    htmlStr += "<td style='color:white;'>";
                                    htmlStr += "来源";
                                    htmlStr += "</td>";
                                    htmlStr += "<td style='color:white;'>";
                                    htmlStr += "地址";
                                    htmlStr += "</td>";
                                    htmlStr += "<td style='color:white;'>";
                                    htmlStr += "标题";
                                    htmlStr += "</td>";
                                    htmlStr += "<td style='color:white;'>";
                                    htmlStr += "内容";
                                    htmlStr += "</td>";
                                    htmlStr += "</tr>";
                                    for (var m = 0; m < selectedLayer.Count; m++) {
                                        var iAttribute = null;
                                        try {
                                            iAttribute = selectedLayer(m);
                                        } catch (e) {
                                            iAttribute = null;
                                        }
                                        if (iAttribute != null) {
                                            if (m % 2 == 0) {
                                                htmlStr += "<tr style='background-color:#90d7ec' onclick='flyTO(" + iAttribute.Geometry.X + "," + iAttribute.Geometry.Y + ")';>";
                                            }
                                            else {

                                                //htmlStr += "<tr onclick='alert ("+iAttribute.Geometry.X+","+iAttribute.Geometry.Y+")';>";
                                                htmlStr += "<tr onclick='flyTO(" + iAttribute.Geometry.X + "," + iAttribute.Geometry.Y + ")';>";
                                            }
                                            htmlStr += "<td >";
                                            try {
                                                htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("NAME").Value;
                                            } catch (e)
                                            { }
                                            htmlStr += "</td>";
                                            htmlStr += "<td>";
                                            try {
                                                htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("date").Value;
                                            } catch (e)
                                            { }
                                            htmlStr += "</td>";
                                            htmlStr += "<td>";
                                            try {
                                                htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("laiyuan").Value;
                                            } catch (e)
                                            { }
                                            htmlStr += "</td>";
                                            htmlStr += "<td>";
                                            try {
                                                htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("xxdizhi").Value;
                                            } catch (e)
                                            { }
                                            htmlStr += "</td>";
                                            htmlStr += "<td>";
                                            try {
                                                htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("title").Value;
                                            } catch (e)
                                            { }
                                            htmlStr += "</td>";
                                            htmlStr += "<td>";
                                            try {
                                                htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("neirong").Value;
                                            } catch (e)
                                            { }
                                            htmlStr += "</td>";
                                            htmlStr += "</tr>";
                                        }
                                    }
                                    htmlStr += "</table></body></html>";
                                    if (htmlStr != "") {
                                        var ScreenRectHeight = sgworld.Window.Rect.Height;
                                        var ScreenRectWidth = sgworld.Window.Rect.Width;
                                        var areaPopup = sgworld.Creator.CreatePopupMessage("区域查询", "", 231, (ScreenRectHeight - 170), (ScreenRectWidth - 231), 170);
                                        areaPopup.InnerText = htmlStr;
                                        areaPopup.Flags = 512;
                                        areaPopup.AllowResize = true;
                                        areaPopup.AllowDrag = true;
                                        sgworld.Window.ShowPopup(areaPopup);
                                    }
                                }
                                else {
                                    alert("没有查询到数据！");
                                }
                            } catch (e)
                            { }
                        }
                    }
                }
            }
        }
    } catch (e)
    { }
    if (selectgPolyObj != null) {
        sgworld.Creator.DeleteObject(selectgPolyObj.ID);
    }
    selectgPolyObj = null;
    return true;
}

//当前屏幕查询
function screenQuery() {
    var ScreenRectHeight = sgworld.Window.Rect.Height;
    var ScreenRectWidth = sgworld.Window.Rect.Width;
    var myWorldPoint1 = sgworld.Window.PixelToWorld(232, ScreenRectHeight - 1, 1);//左上角点
    var myWorldPoint2 = sgworld.Window.PixelToWorld(ScreenRectWidth - 1, ScreenRectHeight - 1, 1);//右上角点
    var myWorldPoint3 = sgworld.window.PixelToWorld(ScreenRectWidth - 1, 1);//右下角点
    var myWorldPoint4 = sgworld.window.PixelToWorld(1, 1);//左下角点
    var screenGeometry = sgworld.Creator.GeometryCreator.CreateLinearRingGeometry([myWorldPoint1.Position.X, myWorldPoint1.Position.Y, 2, myWorldPoint2.Position.X, myWorldPoint2.Position.Y, 2, myWorldPoint3.Position.X, myWorldPoint3.Position.Y, 2, myWorldPoint4.Position.X, myWorldPoint4.Position.Y, 2, myWorldPoint1.Position.X, myWorldPoint1.Position.Y, 2]);
    var layerItemId = sgworld.ProjectTree.FindItem("城市管理\\城管案件\\城管案件");
    var pipeLayer = sgworld.ProjectTree.GetObject(layerItemId);
    var selectedLayer = pipeLayer.ExecuteSpatialQuery(screenGeometry, 1);
    if (selectedLayer.Count > 0) {
        htmlStr = "<html><head><title></title>";
        htmlStr += "<style>table{border-right:1px solid #11264f;border-bottom:1px solid #11264f}table td{border-left:1px solid #11264f;border-top:1px solid #11264f}</style>";
        htmlStr += "<script type='text/javascript'>function CreateSGObj() {var obj = $('sgworld');if (obj == null) {obj = document.createElement('object');document.body.appendChild(obj);obj.name = 'sgworld';obj.id = 'sgworld';obj.classid = 'CLSID:3a4f9197-65a8-11d5-85c1-0001023952c1';}return obj;}function $(id) {return window.document.getElementById(id);}</script>"
        //htmlStr += "<script type='text/javascript'>for (var m = 0; m < selectedLayer.Count; m++) {iAttribute = selectedLayer(m);}</script>"
        //htmlStr += "<script type='text/javascript'>function getXY(){var sgworld=CreateSGObj();var x=iAttribute.Geometry.X;var y=iAttribute.Geometry.Y;var pp=sgworld.Creator.CreatePosition(x,y);} </script>"
        htmlStr += "<script type='text/javascript'>function flyTO(x,y){var sgworld=CreateSGObj();var pp=sgworld.Creator.CreatePosition(x,y,300,0,0,-89,0,200);  sgworld.Navigate.FlyTo(pp)}</script>"
        htmlStr += "</head><body style='width:100%;height:100%;  margin:2px; padding:2px;'><table style='width:100%; text-align:center;font-size:12px;' border='0' cellspacing='0' cellpadding='0'><tr style='background-color:#11264f'>";
        var firstFeature = selectedLayer(0);
        htmlStr += "<td style='color:white;'>";
        htmlStr += "名称";
        htmlStr += "</td>";
        htmlStr += "<td style='color:white;'>";
        htmlStr += "日期";
        htmlStr += "</td>";
        htmlStr += "<td style='color:white;'>";
        htmlStr += "来源";
        htmlStr += "</td>";
        htmlStr += "<td style='color:white;'>";
        htmlStr += "地址";
        htmlStr += "</td>";
        htmlStr += "<td style='color:white;'>";
        htmlStr += "标题";
        htmlStr += "</td>";
        htmlStr += "<td style='color:white;'>";
        htmlStr += "内容";
        htmlStr += "</td>";
        htmlStr += "</tr>";
        for (var m = 0; m < selectedLayer.Count; m++) {
            var iAttribute = null;
            try {
                iAttribute = selectedLayer(m);
            } catch (e) {
                iAttribute = null;
            }
            if (iAttribute != null) {
                if (m % 2 == 0) {
                    htmlStr += "<tr style='background-color:#90d7ec' onclick='flyTO(" + iAttribute.Geometry.X + "," + iAttribute.Geometry.Y + ")';>";
                }
                else {

                    //htmlStr += "<tr onclick='alert ("+iAttribute.Geometry.X+","+iAttribute.Geometry.Y+")';>";
                    htmlStr += "<tr onclick='flyTO(" + iAttribute.Geometry.X + "," + iAttribute.Geometry.Y + ")';>";
                }
                htmlStr += "<td >";
                try {
                    htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("NAME").Value;
                } catch (e)
                { }
                htmlStr += "</td>";
                htmlStr += "<td>";
                try {
                    htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("date").Value;
                } catch (e)
                { }
                htmlStr += "</td>";
                htmlStr += "<td>";
                try {
                    htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("laiyuan").Value;
                } catch (e)
                { }
                htmlStr += "</td>";
                htmlStr += "<td>";
                try {
                    htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("xxdizhi").Value;
                } catch (e)
                { }
                htmlStr += "</td>";
                htmlStr += "<td>";
                try {
                    htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("title").Value;
                } catch (e)
                { }
                htmlStr += "</td>";
                htmlStr += "<td>";
                try {
                    htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("neirong").Value;
                } catch (e)
                { }
                htmlStr += "</td>";
                htmlStr += "</tr>";
            }
        }
        htmlStr += "</table></body></html>";
        if (htmlStr != "") {
            var ScreenRectHeight = sgworld.Window.Rect.Height;
            var ScreenRectWidth = sgworld.Window.Rect.Width;
            var areaPopup = sgworld.Creator.CreatePopupMessage("区域查询", "", 231, (ScreenRectHeight - 170), (ScreenRectWidth - 231), 170);
            areaPopup.InnerText = htmlStr;
            areaPopup.Flags = 512;
            areaPopup.AllowResize = true;
            areaPopup.AllowDrag = true;
            sgworld.Window.ShowPopup(areaPopup);
        }
    } else { alert("没有查询到数据！"); }
}

//条件查询
function filterQuery() {
    var htmlStr = "";
    var areaselect = document.getElementById('area').value;
    alert(areaselect);
    var sourceselect = document.getElementById('source').value;
    var typeselect = document.getElementById('type').value;
    try {
        var layerItemId = sgworld.ProjectTree.FindItem("案件查询\\城管案件");
        var pipeLayer = sgworld.ProjectTree.GetObject(layerItemId);
        if (pipeLayer.ObjectType === 36) {//OT_FEATURE_LAYER
            try {
                pipeLayer.Filter = "quyu Like'" + areaselect + "' AND laiyuan Like '" + sourceselect + "' AND leibie Like '" + typeselect + "'";
                alert(pipeLayer.Filter);
                pipeLayer.Streaming = 0;
                pipeLayer.Refresh();
                var pIFeatureGroups = pipeLayer.FeatureGroups(0);
                htmlStr = "<html><head><title></title>";
                htmlStr += "<style>table{border-right:1px solid #11264f;border-bottom:1px solid #11264f}table td{border-left:1px solid #11264f;border-top:1px solid #11264f}</style>";
                htmlStr += "<script type='text/javascript'>function CreateSGObj() {var obj = $('sgworld');if (obj == null) {obj = document.createElement('object');document.body.appendChild(obj);obj.name = 'sgworld';obj.id = 'sgworld';obj.classid = 'CLSID:3a4f9197-65a8-11d5-85c1-0001023952c1';}return obj;}function $(id) {return window.document.getElementById(id);}</script>"
                htmlStr += "<script type='text/javascript'>function flyTO(x,y){var sgworld=CreateSGObj();var pp=sgworld.Creator.CreatePosition(x,y,300,0,0,-89,0,200);  sgworld.Navigate.FlyTo(pp)}</script>"
                htmlStr += "</head><body style='width:100%;height:100%;  margin:2px; padding:2px;'><table style='width:100%; text-align:center;font-size:12px;' border='0' cellspacing='0' cellpadding='0'><tr style='background-color:#11264f'>";
                //var firstFeature = selectedLayer(0);
                htmlStr += "<td style='color:white;'>";
                htmlStr += "名称";
                htmlStr += "</td>";
                htmlStr += "<td style='color:white;'>";
                htmlStr += "日期";
                htmlStr += "</td>";
                htmlStr += "<td style='color:white;'>";
                htmlStr += "来源";
                htmlStr += "</td>";
                htmlStr += "<td style='color:white;'>";
                htmlStr += "地址";
                htmlStr += "</td>";
                htmlStr += "<td style='color:white;'>";
                htmlStr += "标题";
                htmlStr += "</td>";
                htmlStr += "<td style='color:white;'>";
                htmlStr += "内容";
                htmlStr += "</td>";
                htmlStr += "</tr>";
                for (var i = 0; i < pIFeatureGroups.Features.Count; i++) {
                    var pIFeature = pIFeatureGroups.Features.Item(i);
                    var selectedLayer = pIFeature.FeatureAttributes;
                    if (selectedLayer.Count > 0) {
                        var iAttribute = null;
                        try {
                            iAttribute = pIFeature;
                        } catch (e) { alert("没有相关数据！") }
                        if (iAttribute != null) {
                            if (i % 2 == 0) {
                                htmlStr += "<tr style='background-color:#90d7ec' onclick='flyTO(" + pIFeature.Geometry.X + "," + pIFeature.Geometry.Y + ")';>";
                            }
                            else {
                                htmlStr += "<tr onclick='flyTO(" + pIFeature.Geometry.X + "," + pIFeature.Geometry.Y + ")';>";
                            }
                            htmlStr += "<td >";

                            htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("NAME").Value;

                            htmlStr += "</td>";
                            htmlStr += "<td>";

                            htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("date").Value;

                            htmlStr += "</td>";
                            htmlStr += "<td>";

                            htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("laiyuan").Value;

                            htmlStr += "</td>";
                            htmlStr += "<td>";

                            htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("xxdizhi").Value;

                            htmlStr += "</td>";
                            htmlStr += "<td>";

                            htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("title").Value;

                            htmlStr += "</td>";
                            htmlStr += "<td>";

                            htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("neirong").Value;

                            htmlStr += "</td>";
                            htmlStr += "</tr>";
                        }
                    } else { alert("没有查询到数据！"); }
                }
                htmlStr += "</table></body></html>";
                if (htmlStr != "") {
                    var ScreenRectHeight = sgworld.Window.Rect.Height;
                    var ScreenRectWidth = sgworld.Window.Rect.Width;
                    var areaPopup = sgworld.Creator.CreatePopupMessage("区域查询", "", 231, (ScreenRectHeight - 170), (ScreenRectWidth - 231), 170);
                    areaPopup.InnerText = htmlStr;
                    areaPopup.Flags = 512;
                    areaPopup.AllowResize = true;
                    areaPopup.AllowDrag = true;
                    alert(htmlStr);
                    sgworld.Window.ShowPopup(areaPopup);
                }
            } catch (e) { alert("错误！"); }
        }
    } catch (e) { }
}

//取消过滤
function filterClearn() {
    var layerItemId = sgworld.ProjectTree.FindItem("案件查询\\城管案件");
    var pipeLayer = sgworld.ProjectTree.GetObject(layerItemId);
    pipeLayer.Filter = "";
    pipeLayer.Streaming = 0;
    pipeLayer.Refresh();
}
