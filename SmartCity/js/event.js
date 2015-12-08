var tempTerrainId = 0;
var clickCreatorTerra = 0;
var tempName = "";
var gPolyObj = null;
var Polygon = null;
var sidePolygon = null;
var htmlurl = window.location.href;
var allurl = htmlurl.substring(0, htmlurl.lastIndexOf("/") + 1);
function lookCreatorExcavate() {

    try {
        allClean();
        AllInitialise();
    } catch (e) {
    }
    //sgworld.Navigate.UndergroundMode = false;
    var GroupId = sgworld.ProjectTree.FindItem(allPosition + "深圳\\深圳\\深圳地下管线");

    if (GroupId != 0) {
        sgworld.ProjectTree.SetVisibility(GroupId, true);
        try { showGroupId.push(GroupId); } catch (e) {
        }
    }
    var tempTerraId = sgworld.ProjectTree.FindItem(allPosition + "深圳\\深圳\\临时地形");
    if (tempTerraId != 0) {
        sgworld.ProjectTree.SetVisibility(tempTerraId, true);
        try { showGroupId.push(tempTerraId); } catch (e) {
        }
    }
    var itemId = sgworld.ProjectTree.FindItem(allPosition + "定位点\\开挖浏览");
    if (itemId != 0) {
        var obj = sgworld.ProjectTree.GetObject(itemId);
        sgworld.Navigate.FlyTo(obj, 0);
    }
}

function creatorExcavate() {
    if (clickCreatorTerra == 0) {
        try {
            allClean();
            AllInitialise();
        } catch (e) {
        }
        //sgworld.Navigate.UndergroundMode = false;
        //            var GroupId = sgworld.ProjectTree.FindItem(allPosition + "深圳\\深圳\\深圳地下管线");
        //            
        //            if (GroupId != 0) {
        //                sgworld.ProjectTree.SetVisibility(GroupId, true);
        //                try { showGroupId.push(GroupId); } catch (e) { 
        //                }
        //            }
        //            var tempTerraId = sgworld.ProjectTree.FindItem(allPosition + "深圳\\深圳\\临时地形");
        //            if (tempTerraId != 0) {
        //                sgworld.ProjectTree.SetVisibility(tempTerraId, true);
        //                try { showGroupId.push(tempTerraId); } catch (e) {
        //                }
        //            }
        //            var itemId = sgworld.ProjectTree.FindItem(allPosition + "定位点\\地下管线");
        //            if (itemId != 0) {
        //                var obj = sgworld.ProjectTree.GetObject(itemId);
        //                sgworld.Navigate.FlyTo(obj, 0);
        //            }

        tempTerrainId = sgworld.ProjectTree.FindItem("临时地形");
        if (tempTerrainId == 0) {
            tempTerrainId = sgworld.ProjectTree.CreateGroup("临时地形");
        }
        for (var i = 0; ; i++) {
            var tempId = sgworld.ProjectTree.FindItem("临时地形\\" + "temp" + i);
            if (tempId == 0) {
                tempName = "temp" + i;
                break;
            }
        }
        clickCreatorTerra = 1;
        sgworld.AttachEvent("OnLButtonDown", polygon_OnLButtonDown);
        sgworld.AttachEvent("OnRButtonUp", polygon_OnRButtonUp);
        sgworld.AttachEvent("OnFrame", polygon_OnFrame);
        sgworld.Window.SetInputMode(1);
    }
    else {
        try {
            var mytempTerrainId = sgworld.ProjectTree.FindItem("临时地形");
            if (mytempTerrainId != "") {
                sgworld.ProjectTree.DeleteItem(mytempTerrainId);
            }
        } catch (e) { }
        allClean();
        clickCreatorTerra = 0;
    }
}
function polygon_OnLButtonDown(Flags, X, Y) {
    var CursorCoord = sgworld.Window.PixelToWorld(X, Y);
    if (gPolyObj == null) {
        var myLine = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([CursorCoord.Position.x, CursorCoord.Position.y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0]);
        gPolyObj = sgworld.Creator.CreatePolyline(myLine, sgworld.Creator.CreateColor(255, 0, 0, 255), 2, tempTerrainId, tempName);
        gPolyObj.LineStyle.Width = -1;
        gPolyObj.Geometry.StartEdit();
    }
    else {
        if (gPolyObj.ObjectType == 1) {
            // Deleting the temporary line
            var x = gPolyObj.Geometry.Points.Item(0).X;
            var y = gPolyObj.Geometry.Points.Item(0).Y;
            sgworld.Creator.DeleteObject(gPolyObj.ID);

            // Creating the polygon
            var myGeometry = sgworld.Creator.GeometryCreator.CreateLinearRingGeometry([x, y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0])
            gPolyObj = sgworld.Creator.createPolygon(myGeometry, sgworld.Creator.CreateColor(255, 0, 0, 1), sgworld.Creator.CreateColor(0, 255, 0, 0.5), 2, tempTerrainId, tempName);
            gPolyObj.LineStyle.Width = -2;
            gPolyObj.Terrain.GroundObject = true;
            gPolyObj.Geometry.StartEdit();
        }
        else {
            gPolyObj.Geometry.Rings(0).Points.Item(gPolyObj.Geometry.Rings(0).Points.count - 1).X = CursorCoord.Position.x;
            gPolyObj.Geometry.Rings(0).Points.Item(gPolyObj.Geometry.Rings(0).Points.count - 1).Y = CursorCoord.Position.y;
            gPolyObj.Geometry.Rings(0).Points.Item(gPolyObj.Geometry.Rings(0).Points.count - 1).Z = 0;
            gPolyObj.Geometry.Rings(0).Points.AddPoint(CursorCoord.Position.x, CursorCoord.Position.y, 0);
        }
    }
    return true;
}
function polygon_OnFrame() {
    if (gPolyObj != null) {
        try {
            var mouseInfo = sgworld.Window.GetMouseInfo()
            var CursorCoord = sgworld.Window.pixelToWorld(mouseInfo.X, mouseInfo.Y);
            if (CursorCoord == null)
                return false;
            if (gPolyObj.ObjectType == 2) {
                gPolyObj.Geometry.Rings(0).Points.Item(gPolyObj.Geometry.Rings(0).Points.count - 1).X = CursorCoord.Position.x;
                gPolyObj.Geometry.Rings(0).Points.Item(gPolyObj.Geometry.Rings(0).Points.count - 1).Y = CursorCoord.Position.y;
                gPolyObj.Geometry.Rings(0).Points.Item(gPolyObj.Geometry.Rings(0).Points.count - 1).Z = 0;
            }
            else {
                gPolyObj.Geometry.Points.Item(gPolyObj.Geometry.Points.count - 1).X = CursorCoord.Position.x;
                gPolyObj.Geometry.Points.Item(gPolyObj.Geometry.Points.count - 1).Y = CursorCoord.Position.y;
                gPolyObj.Geometry.Points.Item(gPolyObj.Geometry.Points.count - 1).Z = 0;
            }
        }
        catch (e) { }
    }
}
// private static ITerrainHole61 tempModifier = null;

function polygon_OnRButtonUp(Flags, X, Y) {
    if (gPolyObj != null) {
        if (gPolyObj.ObjectType == 1) {
            sgworld.Creator.DeleteObject(gPolyObj.ID);
        }
        else {
            gPolyObj.Geometry.Rings(0).Points.DeletePoint(gPolyObj.Geometry.Rings(0).Points.count - 1);
            if (gPolyObj.Geometry.Rings(0).Points.count > 2) {
                for (var i = 0; i < gPolyObj.Geometry.Rings(0).Points.count; i++) {
                    if (i < gPolyObj.Geometry.Rings(0).Points.count - 1) {
                        var point1 = gPolyObj.Geometry.Rings(0).Points.Item(i);
                        var point2 = gPolyObj.Geometry.Rings(0).Points.Item(i + 1);
                        //                            var point3 = sgworld.Terrain.GetGroundHeightInfo(point2.X, point2.Y, 1, false);
                        //                            var point4 = sgworld.Terrain.GetGroundHeightInfo(point1.X, point1.Y, 1, false);
                        var myLine = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([point1.X, point1.Y, -20, point2.X, point2.Y, -20]);
                        sidePolygon = sgworld.Creator.CreatePolyline(myLine, sgworld.Creator.CreateColor(155, 155, 155, 255), 3, tempTerrainId, tempName);
                        sidePolygon.FillStyle.Texture.FileName = allurl + "images\\dijian.jpg";
                        sidePolygon.FillStyle.Texture.TilingMethod = 1;
                        sidePolygon.ExtendToGround = true;
                        sidePolygon.FillStyle.Texture.ScaleX = 50;
                        sidePolygon.FillStyle.Texture.ScaleY = 50;
                        sidePolygon.LineStyle.Width = -1;
                        sidePolygon.Terrain.GroundObject = false;
                    }
                    else {
                        if (i == gPolyObj.Geometry.Rings(0).Points.count - 1) {
                            var point1 = gPolyObj.Geometry.Rings(0).Points.Item(i);
                            var point2 = gPolyObj.Geometry.Rings(0).Points.Item(0);
                            //                                var point3 = sgworld.Terrain.GetGroundHeightInfo(point2.X, point2.Y, 1, false);
                            //                                var point4 = sgworld.Terrain.GetGroundHeightInfo(point1.X, point1.Y, 1, false);
                            //                                var myLine = sgworld.Creator.GeometryCreator.CreateLinearRingGeometry([point1.X, point1.Y, -20, point2.X, point2.Y, -20, point3.Position.X, point3.Position.Y, point3.Position.Altitude, point4.Position.X, point4.Position.Y, point4.Position.Altitude, point4.Position.X, point4.Position.Y, point4.Position.Altitude]);
                            //                                sidePolygon = sgworld.Creator.CreatePolygon(myLine, sgworld.Creator.CreateColor(150, 150, 150, 255), sgworld.Creator.CreateColor(150, 150, 150, 255), 3, tempTerrainId, tempName+i);
                            var myLine = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([point1.X, point1.Y, -20, point2.X, point2.Y, -20]);
                            sidePolygon = sgworld.Creator.CreatePolyline(myLine, sgworld.Creator.CreateColor(155, 155, 155, 255), 3, tempTerrainId, tempName);

                            sidePolygon.FillStyle.Texture.FileName = allurl + "images/dijian.jpg";
                            sidePolygon.FillStyle.Texture.TilingMethod = 1;
                            sidePolygon.ExtendToGround = true;
                            sidePolygon.FillStyle.Texture.ScaleX = 50;
                            sidePolygon.FillStyle.Texture.ScaleY = 50;
                            sidePolygon.LineStyle.Width = -1;
                            sidePolygon.Terrain.GroundObject = false;
                        }
                    }
                }
                gPolyObj.Geometry.EndEdit();
                var tempModifier = sgworld.Creator.CreateHoleOnTerrain(gPolyObj.Geometry, tempTerrainId, tempName);
                Polygon = sgworld.Creator.CreatePolygon(gPolyObj.Geometry, sgworld.Creator.CreateColor(150, 150, 150, 255), sgworld.Creator.CreateColor(150, 150, 150, 255), 3, tempTerrainId, tempName);
                Polygon.FillStyle.Texture.FileName = allurl + "images/dimian.jpg";
                Polygon.FillStyle.Texture.TilingMethod = 1;
                Polygon.FillStyle.Texture.ScaleX = 100;
                Polygon.FillStyle.Texture.ScaleY = 100;
                Polygon.Terrain.GroundObject = false;
                Polygon.Position.Altitude = -20;
                //tempModifier.Position.Altitude = -40;
            }
            if (gPolyObj != null) {
                sgworld.Creator.DeleteObject(gPolyObj.ID);
                //sgworld.ProjectTree.DeleteItem(gPolyObj.TreeItem.ItemID);
            }
        }
    }
    polygon_Clean();
    return true;
}
/// <summary>
/// 初始化绘制多边形
/// </summary>
function polygon_Clean() {
    try {
        tempTerrainId = 0;
        tempName = "";
        gPolyObj = null;
        Polygon = null;
        sidePolygon = null;
        sgworld.DetachEvent("OnLButtonDown", polygon_OnLButtonDown);
        sgworld.DetachEvent("OnRButtonUp", polygon_OnRButtonUp);
        sgworld.DetachEvent("OnFrame", polygon_OnFrame);
        sgworld.Window.SetInputMode(0);
    }
    catch (e) {
    }
}
//点击
function select_OnLButtonUp(Flags, X, Y) {
    var selectFeature = null;
    var CursorCoord = sgworld.Window.PixelToWorld(X, Y);
    var clickPopup;
    if (CursorCoord.Type == 1) {
        selectFeature = sgworld.Creator.GetObject(CursorCoord.ObjectID);
        sgworld.Window.RemovePopupByCaption("属性");
        try {
            var type = selectFeature.FeatureAttributes.GetFeatureAttribute("DataType").Value;
            try {
                if (type == "polyline") {
                    var selectType = "attributePolyline";
                    var Id = selectFeature.FeatureAttributes.GetFeatureAttribute("Id").Value;
                    var Type = selectFeature.FeatureAttributes.GetFeatureAttribute("Type").Value;
                    var Size = selectFeature.FeatureAttributes.GetFeatureAttribute("Size").Value;
                    var StartId = selectFeature.FeatureAttributes.GetFeatureAttribute("StartId").Value;
                    var EndId = selectFeature.FeatureAttributes.GetFeatureAttribute("EndId").Value;
                    var Yaw = selectFeature.FeatureAttributes.GetFeatureAttribute("Yaw").Value;
                    var Pitch = selectFeature.FeatureAttributes.GetFeatureAttribute("Pitch").Value;
                    var scaleY = selectFeature.FeatureAttributes.GetFeatureAttribute("scaleY").Value;

                    clickPopup = sgworld.Creator.CreatePopupMessage("属性", allurl + "tool/clickSelect.html?type=1" + "&Id=" + Id + "&Type=" + Type + "&Size=" + Size + "&StartId=" + StartId + "&EndId=" + EndId + "&Yaw=" + Yaw + "&Pitch=" + Pitch + "&scaleY=" + scaleY, 235, 100, 220, 220);

                    //clickPopup.InnerText = htmlStr;
                    clickPopup.Flags = 512;
                    clickPopup.AllowResize = true;
                    clickPopup.AllowDrag = true;
                    sgworld.Window.ShowPopup(clickPopup);
                }
                if (type == "point") {
                    var selectType = "attributePoint";
                    var Id = selectFeature.FeatureAttributes.GetFeatureAttribute("Id").Value;
                    var Type = selectFeature.FeatureAttributes.GetFeatureAttribute("Type").Value;
                    var NodeId = selectFeature.FeatureAttributes.GetFeatureAttribute("NodeId").Value;
                    var JoinType = selectFeature.FeatureAttributes.GetFeatureAttribute("JoinType").Value;
                    var TerraDepth = selectFeature.FeatureAttributes.GetFeatureAttribute("TerraDepth").Value;
                    var WellType = selectFeature.FeatureAttributes.GetFeatureAttribute("WellType").Value;
                    clickPopup = sgworld.Creator.CreatePopupMessage("属性", allurl + "tool/clickSelect.html?type=2" + "&Id=" + Id + "&Type=" + Type + "&NodeId=" + NodeId + "&JoinType=" + JoinType + "&TerraDepth=" + TerraDepth + "&WellType=" + WellType, 235, 100, 220, 220);


                    //clickPopup.InnerText = htmlStr;
                    clickPopup.Flags = 512;
                    clickPopup.AllowResize = true;
                    clickPopup.AllowDrag = true;
                    sgworld.Window.ShowPopup(clickPopup);
                }
            }
            catch (e)
            { }
        } catch (e) {

        }

        //document.getElementById("TerraExplorerInformationWindow").style.display = "none";
    }
    return true;
}
function select_OnRButtonUp(Flags, X, Y) {
    sgworld.DetachEvent("OnLButtonUp", select_OnLButtonUp);
    sgworld.DetachEvent("OnRButtonUp", select_OnRButtonUp);
    sgworld.Window.SetInputMode(0);
    return true;
}




var selectPolygonId = 0;
var selectPolygonName = "area";
var selectgPolyObj = null;
function selectPolygon() {
    AllEventClean();
    CleanTint();
    variableClean();
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
        if (selectgPolyObj.ObjectType == 1) {
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
            var mouseInfo = sgworld.Window.GetMouseInfo()
            var CursorCoord = sgworld.Window.pixelToWorld(mouseInfo.X, mouseInfo.Y);
            if (CursorCoord == null)
                return false;
            if (selectgPolyObj.ObjectType == 2) {
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
                    var layerItemId = sgworld.ProjectTree.FindItem("管道\\管线数据\\管道\\规划雨水\\规划雨水Line0"); //管道\\
                    if (layerItemId != 0) {
                        var pipeLayer = sgworld.ProjectTree.GetObject(layerItemId);
                        if (pipeLayer.ObjectType == 36) {
                            try {
                                var selectedLayer = pipeLayer.ExecuteSpatialQuery(selectgPolyObj.Geometry, 1);
                                if (selectedLayer.Count > 0) {
                                    htmlStr = "<html><head><title></title>";
                                    htmlStr += "<style>table{border-right:1px solid #11264f;border-bottom:1px solid #11264f}table td{border-left:1px solid #11264f;border-top:1px solid #11264f}</style>";
                                    htmlStr += "</head><body style='width:100%;height:100%;  margin:2px; padding:2px;'><table style='width:100%; text-align:center;font-size:12px;' border='0' cellspacing='0' cellpadding='0'><tr style='background-color:#11264f'>";
                                    var firstFeature = selectedLayer(0);
                                    htmlStr += "<td style='color:white;'>";
                                    htmlStr += "编号";
                                    htmlStr += "</td>";
                                    htmlStr += "<td style='color:white;'>";
                                    htmlStr += "类型";
                                    htmlStr += "</td>";
                                    htmlStr += "<td style='color:white;'>";
                                    htmlStr += "坡度";
                                    htmlStr += "</td>";
                                    htmlStr += "<td style='color:white;'>";
                                    htmlStr += "管径";
                                    htmlStr += "</td>";
                                    htmlStr += "<td style='color:white;'>";
                                    htmlStr += "起始设备编号";
                                    htmlStr += "</td>";
                                    htmlStr += "<td style='color:white;'>";
                                    htmlStr += "结束设备编号";
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
                                                htmlStr += "<tr style='background-color:#90d7ec'>";
                                            }
                                            else {
                                                htmlStr += "<tr>";
                                            }
                                            htmlStr += "<td>";
                                            try {
                                                htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("Id").Value;
                                            } catch (e)
                                            { }
                                            htmlStr += "</td>";
                                            htmlStr += "<td>";
                                            try {
                                                htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("Type").Value;
                                            } catch (e)
                                            { }
                                            htmlStr += "</td>";
                                            htmlStr += "<td>";
                                            try {
                                                htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("Pitch").Value;
                                            } catch (e)
                                            { }
                                            htmlStr += "</td>";
                                            htmlStr += "<td>";
                                            try {
                                                htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("Size").Value;
                                            } catch (e)
                                            { }
                                            htmlStr += "</td>";
                                            htmlStr += "<td>";
                                            try {
                                                htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("StartId").Value;
                                            } catch (e)
                                            { }
                                            htmlStr += "</td>";
                                            htmlStr += "<td>";
                                            try {
                                                htmlStr += iAttribute.FeatureAttributes.GetFeatureAttribute("EndId").Value;
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


//        function selectPolygon_OnRButtonUp(Flags, X, Y) {
//            selectPolygonId = 0;
//            selectPolygonName = "area";
//            var positionStr = "";
//            if (selectgPolyObj.ObjectType == 1) {
//                sgworld.Creator.DeleteObject(selectgPolyObj.ID);
//            }
//            else {
//                selectgPolyObj.Geometry.Rings(0).Points.DeletePoint(selectgPolyObj.Geometry.Rings(0).Points.count - 1);
//                if (selectgPolyObj.Geometry.Rings(0).Points.count > 2) {
//                    for (var i = 0; i < selectgPolyObj.Geometry.Rings(0).Points.count; i++) {
//                        positionStr += selectgPolyObj.Geometry.Rings(0).Points.Item(i).X;
//                        positionStr += ",";
//                        positionStr += selectgPolyObj.Geometry.Rings(0).Points.Item(i).Y;
//                        positionStr += "|";
//                    }
//                    selectgPolyObj.Geometry.EndEdit();
//                }
//                if (selectgPolyObj != null) {
//                    sgworld.Creator.DeleteObject(selectgPolyObj.ID);
//                }
//            }
//            selectgPolyObj = null;
//            sgworld.DetachEvent("OnLButtonDown", selectPolygon_OnLButtonDown);
//            sgworld.DetachEvent("OnRButtonUp", selectPolygon_OnRButtonUp);
//            sgworld.DetachEvent("OnFrame", selectPolygon_OnFrame);
//            sgworld.Window.SetInputMode(0);

//            if (positionStr != "") {
//                var areaPopup = sgworld.Creator.CreatePopupMessage("区域查询", allurl + "select.html?position=" + positionStr, 0, 100, 500, 400);
//                areaPopup.Flags = 512;
//                areaPopup.AllowResize = true;
//                areaPopup.AllowDrag = true;
//                sgworld.Window.ShowPopup(areaPopup);
//            }
//            return true;
//        }


var judge = -1;
//爆管分析
function pipeAnalyse(type) {
    CleanTint();
    AllEventClean();
    judge = type;
    if (judge != -1) {
        sgworld.AttachEvent("OnLButtonUp", pipeAnalyse_OnLButtonUp);
        sgworld.AttachEvent("OnRButtonUp", pipeAnalyse_OnRButtonUp);
        sgworld.Window.SetInputMode(1);
    }
}

var listLayer = [];
//爆管分析计算
function pipeAnalyse_OnLButtonUp(Flags, X, Y) {
    CleanTint();
    var selectFeature = null;
    var CursorCoord = sgworld.Window.PixelToWorld(X, Y);
    if (CursorCoord.Type == 1) {//原来MeshLayerFeature对应8192类型
        selectFeature = sgworld.Creator.GetObject(CursorCoord.ObjectID);
        try {
            var startId = selectFeature.FeatureAttributes.GetFeatureAttribute("StartId").Value;
            var endId = selectFeature.FeatureAttributes.GetFeatureAttribute("EndId").Value;
            var tintGroup = sgworld.ProjectTree.FindItem("高亮");
            if (tintGroup != 0) {
                sgworld.ProjectTree.DeleteItem(tintGroup);
            }
            tintGroup = sgworld.ProjectTree.CreateGroup("高亮");
            var tempLayer = sgworld.ProjectTree.GetObject(selectFeature.ParentGroupID);
            if (tempLayer.ObjectType == 36) {//原来MeshLayer是39;
                //原来限定范围的 var myGeometry = sgworld.Creator.GeometryCreator.CreateLinearRingGeometry([114.048011, 22.531832, 0, 114.046471, 22.525349, 0, 114.056247, 22.524880, 0, 114.055244, 22.531647, 0]);
                //var myGeometry = sgworld.Creator.GeometryCreator.CreateLinearRingGeometry([121.50255, 31.238, 0, 121.50932, 31.23727, 0, 121.50853, 31.23474, 0, 121.50265, 31.23562, 0]);
                //var allFeature = tempLayer.ExecuteSpatialQuery(myGeometry, 1);
                var allFeature = tempLayer.FeatureGroups.Point.Features;
                for (var j = 0; j < allFeature.Count; j++) {
                    var feature = allFeature.Item(j);
                    if (feature.Geometry.GeometryType == 0) {

                        var tempStartId = feature.FeatureAttributes.GetFeatureAttribute("StartId").Value;
                        var tempEndId = feature.FeatureAttributes.GetFeatureAttribute("EndId").Value;
                        //                                if (tempStartId == startId || tempStartId == endId || tempEndId == startId || tempEndId == endId) {
                        var featureX = feature.FeatureAttributes.GetFeatureAttribute("StartX").Value;
                        var featureY = feature.FeatureAttributes.GetFeatureAttribute("StartY").Value;
                        var featureZ = CursorCoord.Position.Altitude; //feature.FeatureAttributes.GetFeatureAttribute("Altitude").Value;
                        var featureYaw = feature.FeatureAttributes.GetFeatureAttribute("Yaw").Value;
                        var featurePitch = feature.FeatureAttributes.GetFeatureAttribute("Pitch").Value;
                        var featureRoll = feature.FeatureAttributes.GetFeatureAttribute("Roll").Value;
                        var featureScaleX = feature.FeatureAttributes.GetFeatureAttribute("scaleX").Value;
                        var featureScaleY = feature.FeatureAttributes.GetFeatureAttribute("scaleY").Value;
                        var featurePosition = sgworld.Creator.CreatePosition(featureX, featureY, featureZ, 3, featureYaw, (featurePitch - 90), featureRoll);
                        var Polygon = null;
                        if (judge == 1) {
                            Polygon = sgworld.Creator.CreateCylinder(featurePosition, (featureScaleX / 1.95), featureScaleY, sgworld.Creator.CreateColor(255, 0, 0, 255), sgworld.Creator.CreateColor(255, 0, 0, 255), 36, tintGroup, "temp");
                        }
                        else {
                            Polygon = sgworld.Creator.CreateCylinder(featurePosition, (featureScaleX / 1.95), featureScaleY, sgworld.Creator.CreateColor(0, 255, 0, 255), sgworld.Creator.CreateColor(0, 255, 0, 255), 36, tintGroup, "temp");
                        }
                        //var lineColor = sgworld.Creator.CreateColor(255, 0, 0, 255);
                        //feature.Tint = lineColor;
                        //                                }
                    }
                }
                if (judge == 1) {
                    var burststyle = sgworld.Creator.CreateLabelStyle(); //allurl + "images/1.gif"
                    //var burstImg = sgworld.Creator.CreateImageLabel(CursorCoord.Position, "E:\\PipeWeb\\images\\1.gif", burststyle, analygroupId, "temp");
                    var LabelText = "$$PARTICLE$$UserDefine:";
                    LabelText += "<Particle ID='SmokePoof'>";
                    LabelText += "<ParticleEmitter ID='ring' NumParticles='286' Texture='smoke.png'>";
                    LabelText += "<Emitter Rate='223' Shape='Cone' Scale='1,1,1' Speed='1,1,1' />";
                    LabelText += "<Cycle Value='1' />";
                    LabelText += "<Sort Value='1' />";
                    LabelText += "<Gravity Value='0, -4, 0' />";
                    LabelText += "<Position Value='0, 0, 0' />";
                    LabelText += "<Life Value='1' />";
                    LabelText += "<Speed Value='2' />";
                    LabelText += "<Color Value='20,0,150,190' />";
                    LabelText += "<Size Value='0.1' />";
                    LabelText += "<Drag Value='0' />";
                    LabelText += "<Rotation Speed='0' Time='1.7' />";
                    LabelText += "<Fade FadeIn='.1' FadeOut='.6' MaxFade='0.5' />";
                    LabelText += "</ParticleEmitter>";
                    LabelText += "</Particle>";
                    var burstLabel = sgworld.Creator.CreateLabel(CursorCoord.Position, LabelText, "", burststyle, tintGroup, "temp");
                    burstLabel.Style.Scale = 0.1;
                    burstLabel.Style.LockMode = 1;
                    burstLabel.Position.Altitude = burstLabel.Position.Altitude + 5;

                }



            }
            //                    var tempLayer = sgworld.ProjectTree.GetLayer(selectFeature.ParentGroupID);
            //                    if (tempLayer != null) {
            //                        for (var i = 0; i < tempLayer.FeatureGroups.Count; i++) {
            //                            var featureGroup = tempLayer.FeatureGroups.Item(i);
            //                            if (featureGroup != null) {
            //                                for (var j = 0; j < featureGroup.Features.Count; j++) {
            //                                    var feature = featureGroup.Features.Item(j);
            //                                    if (feature.Geometry.GeometryType == 0) {
            //                                        var tintGroup = sgworld.ProjectTree.FindItem("高亮");
            //                                        if (tintGroup != 0)
            //                                        {
            //                                            sgworld.ProjectTree.DeleteItem(tintGroup);
            //                                        }
            //                                        tintGroup = sgworld.ProjectTree.CreateGroup("高亮");
            //                                        var tempStartId = feature.FeatureAttributes.GetFeatureAttribute("StartId").Value;
            //                                        var tempEndId = feature.FeatureAttributes.GetFeatureAttribute("EndId").Value;
            //                                        if (tempStartId == startId || tempStartId == endId || tempEndId == startId || tempEndId == endId) {
            //                                          //  listLayer.push(feature.ID);
            //                                         //   var sdPolygon = sgworld.Creator.CreateCylinder(feature.);

            //                                            var lineColor = sgworld.Creator.CreateColor(255, 0, 0, 255);
            //                                            feature.Tint.abgrColor = lineColor.abgrColor;
            //                                         //   feature.Tint.SetAlpha(1);
            //                                        }
            //                                    }
            //                                }
            //                            }
            //                        }
            //                    }
        }
        catch (e) {
        }

    }
    var baoguanurl = "";
    var baoguan1 = "tool/baoguan1.html";
    var baoguan2 = "tool/baoguan2.html"
    var baoguan3 = "tool/baoguan3.html"
    var num = Math.floor(Math.random() * 3 + 1);
    switch (num) {
        case 1: baoguanurl = baoguan1; break;
        case 2: baoguanurl = baoguan2; break;
        case 3: baoguanurl = baoguan3; break;
    }
    var ScreenRectHeight = sgworld.Window.Rect.Height / 2;
    var chaiqianPopup = sgworld.Creator.CreatePopupMessage("爆管分析", allurl + baoguanurl, 231, 0, 600, ScreenRectHeight);
    chaiqianPopup.AllowResize = true;
    chaiqianPopup.ShowCaption = true;
    sgworld.Window.ShowPopup(chaiqianPopup);
    return true;
}
function pipeAnalyse_OnRButtonUp(Flags, X, Y) {
    sgworld.DetachEvent("OnLButtonUp", pipeAnalyse_OnLButtonUp);
    sgworld.DetachEvent("OnRButtonUp", pipeAnalyse_OnRButtonUp);
    sgworld.Window.SetInputMode(0);
    CleanTint();
    variableClean();
    //AllEventClean();
    return true;
}





var pipeConnectedId = new Array();
var pipeConnectedJoinId = new Array();
var pipeCount = 0;
var myGeometry;
var allFeature;
//连通分析
function pipeConnected() {
    CleanTint();
    AllEventClean();
    variableClean();
    sgworld.AttachEvent("OnLButtonUp", pipeConnected_OnLButtonUp);

    sgworld.AttachEvent("OnRButtonUp", pipeConnected_OnRButtonUp);
    sgworld.Window.SetInputMode(1);
}

//var listLayer = [];
//连通分析计算
function pipeConnected_OnLButtonUp(Flags, X, Y) {
    CleanTint();
    var selectFeature = null;
    var Polygon = null;
    var CursorCoord = sgworld.Window.PixelToWorld(X, Y);

    var tintGroup = sgworld.ProjectTree.FindItem("高亮");
    if (tintGroup == "") {
        tintGroup = sgworld.ProjectTree.CreateGroup("高亮");
    }

    if (pipeCount == 0) {
        if (CursorCoord.Type == 1) {//原来MeshLayerFeature对应8192类型
            try {

                selectFeature = sgworld.Creator.GetObject(CursorCoord.ObjectID);
                var tempLayer = sgworld.ProjectTree.GetObject(selectFeature.ParentGroupID);
                if (tempLayer.ObjectType == 36) {
                    myGeometry = sgworld.Creator.GeometryCreator.CreateLinearRingGeometry([121.50255, 31.238, 0, 121.50932, 31.23727, 0, 121.50853, 31.23474, 0, 121.50265, 31.23562, 0]);
                    allFeature = tempLayer.ExecuteSpatialQuery(myGeometry, 1);
                    //allFeature = tempLayer.FeatureGroups[0];
                }
                var startId = selectFeature.FeatureAttributes.GetFeatureAttribute("StartId").Value;
                var endId = selectFeature.FeatureAttributes.GetFeatureAttribute("EndId").Value;
                var pipeId = selectFeature.FeatureAttributes.GetFeatureAttribute("Id").Value;
                var featureX = selectFeature.FeatureAttributes.GetFeatureAttribute("StartX").Value;
                var featureY = selectFeature.FeatureAttributes.GetFeatureAttribute("StartY").Value;
                var featureZ = CursorCoord.Position.Altitude;// selectFeature.FeatureAttributes.GetFeatureAttribute("Altitude").Value;
                var featureYaw = selectFeature.FeatureAttributes.GetFeatureAttribute("Yaw").Value;
                var featurePitch = selectFeature.FeatureAttributes.GetFeatureAttribute("Pitch").Value;
                var featureRoll = selectFeature.FeatureAttributes.GetFeatureAttribute("Roll").Value;
                var featureScaleX = selectFeature.FeatureAttributes.GetFeatureAttribute("scaleX").Value;
                var featureScaleY = selectFeature.FeatureAttributes.GetFeatureAttribute("scaleY").Value;
                var featurePosition = sgworld.Creator.CreatePosition(featureX, featureY, featureZ, 3, featureYaw, (featurePitch - 90), featureRoll);
                Polygon = sgworld.Creator.CreateCylinder(featurePosition, (featureScaleX / 1.95), featureScaleY, sgworld.Creator.CreateColor(0, 255, 0, 255), sgworld.Creator.CreateColor(0, 255, 0, 255), 36, tintGroup, "temp");

                pipeConnectedId.push(pipeId);
                pipeConnectedJoinId.push(startId);
                pipeConnectedJoinId.push(endId);
                pipeCount++;
            } catch (e)
            { }
        }
    } else {
        try {
            for (var j = 0; j < allFeature.Count; j++) {
                var feature = allFeature.Item(j);
                if (feature.Geometry.GeometryType == 0) {
                    var tempStartId = feature.FeatureAttributes.GetFeatureAttribute("StartId").Value;
                    var tempEndId = feature.FeatureAttributes.GetFeatureAttribute("EndId").Value;
                    var pipeId = feature.FeatureAttributes.GetFeatureAttribute("Id").Value;
                    if (!pipeConnectedIdExist(pipeId)) {
                        if (!(pipeConnectedJoinIdExist(tempEndId) && pipeConnectedJoinIdExist(tempStartId))) {
                            if (pipeConnectedJoinIdExist(tempEndId)) {
                                pipeConnectedId.push(pipeId);
                                pipeConnectedJoinId.push(tempStartId);
                                var featureX = feature.FeatureAttributes.GetFeatureAttribute("StartX").Value;
                                var featureY = feature.FeatureAttributes.GetFeatureAttribute("StartY").Value;
                                var featureZ = CursorCoord.Position.Altitude; // feature.FeatureAttributes.GetFeatureAttribute("Altitude").Value;
                                var featureYaw = feature.FeatureAttributes.GetFeatureAttribute("Yaw").Value;
                                var featurePitch = feature.FeatureAttributes.GetFeatureAttribute("Pitch").Value;
                                var featureRoll = feature.FeatureAttributes.GetFeatureAttribute("Roll").Value;
                                var featureScaleX = feature.FeatureAttributes.GetFeatureAttribute("scaleX").Value;
                                var featureScaleY = feature.FeatureAttributes.GetFeatureAttribute("scaleY").Value;
                                var featurePosition = sgworld.Creator.CreatePosition(featureX, featureY, featureZ, 3, featureYaw, (featurePitch - 90), featureRoll);
                                var Polygon = null;
                                Polygon = sgworld.Creator.CreateCylinder(featurePosition, (featureScaleX / 1.95), featureScaleY, sgworld.Creator.CreateColor(0, 255, 0, 255), sgworld.Creator.CreateColor(0, 255, 0, 255), 36, tintGroup, "temp");
                                //var lineColor = sgworld.Creator.CreateColor(255, 0, 0, 255);
                                //feature.Tint = lineColor;
                            }
                            if (pipeConnectedJoinIdExist(tempStartId)) {
                                pipeConnectedId.push(pipeId);
                                pipeConnectedJoinId.push(tempEndId);
                                var featureX = feature.FeatureAttributes.GetFeatureAttribute("StartX").Value;
                                var featureY = feature.FeatureAttributes.GetFeatureAttribute("StartY").Value;
                                var featureZ = CursorCoord.Position.Altitude; // feature.FeatureAttributes.GetFeatureAttribute("Altitude").Value;
                                var featureYaw = feature.FeatureAttributes.GetFeatureAttribute("Yaw").Value;
                                var featurePitch = feature.FeatureAttributes.GetFeatureAttribute("Pitch").Value;
                                var featureRoll = feature.FeatureAttributes.GetFeatureAttribute("Roll").Value;
                                var featureScaleX = feature.FeatureAttributes.GetFeatureAttribute("scaleX").Value;
                                var featureScaleY = feature.FeatureAttributes.GetFeatureAttribute("scaleY").Value;
                                var featurePosition = sgworld.Creator.CreatePosition(featureX, featureY, featureZ, 3, featureYaw, (featurePitch - 90), featureRoll);
                                var Polygon = null;
                                Polygon = sgworld.Creator.CreateCylinder(featurePosition, (featureScaleX / 1.95), featureScaleY, sgworld.Creator.CreateColor(0, 255, 0, 255), sgworld.Creator.CreateColor(0, 255, 0, 255), 36, tintGroup, "temp");

                            }
                        }
                    }
                }
            }
        }
        catch (e) {
        }
    }
    sgworld.Window.ShowMessageBarText("单击鼠标左键查看连通管段，右键结束", 1);
    return true;
}
function pipeConnected_OnRButtonUp(Flags, X, Y) {
    CleanTint();
    try {
        sgworld.DetachEvent("OnLButtonUp", pipeConnected_OnLButtonUp);
        sgworld.DetachEvent("OnRButtonUp", pipeConnected_OnRButtonUp);
    } catch (e)
    { }
    sgworld.Window.SetInputMode(0);
    variableClean();
    return true;
}
function pipeConnectedIdExist(pipeItemId) {
    for (var i = 0; i < pipeConnectedId.length; i++) {
        if (pipeConnectedId[i] == pipeItemId) {
            return true;
        }
    }
    return false;
}
function pipeConnectedJoinIdExist(pipeItemJoinId) {
    for (var i = 0; i < pipeConnectedJoinId.length; i++) {
        if (pipeConnectedJoinId[i] == pipeItemJoinId) {
            return true;
        }
    }
    return false;
}
function allClean() {
    sgworld.Navigate.UndergroundMode = false;
    CleanTint();
    AllEventClean();
    variableClean();
    //AllInitialise();
}
function variableClean() {
    tempTerrainId = 0;
    tempName = "";
    pipeConnectedId = [];
    pipeConnectedJoinId = [];
    pipeCount = 0;
    if (flightgPolyObj != null) {
        sgworld.Creator.DeleteObject(flightgPolyObj.ID);
        flightgPolyObj = null;
    }
    try {
        clearInterval(time);
    } catch (e) {
    }
    try {
        stopMovement();
        //clearInterval(status);
    } catch (e) {
    }
    fId = sgworld.ProjectTree.FindItem("管道流动");
    if (fId != 0) {
        try {
            sgworld.ProjectTree.DeleteItem(fId);
        } catch (e) {
        }
    }
    try {
        flightGroupId = sgworld.ProjectTree.FindItem("飞行路线");
        if (flightGroupId != 0 && flightGroupId != "") {
            sgworld.ProjectTree.DeleteItem(flightGroupId);
        }
    } catch (e) {

    }
    try {
        var tempPositionGroupId = sgworld.ProjectTree.FindItem("选择");
        if (tempPositionGroupId != "") {
            sgworld.ProjectTree.DeleteItem(tempPositionGroupId);
        }
    } catch (e)
    { }
    try {
        var addSellGroupId = sgworld.ProjectTree.FindItem("新应急方案");
        if (addSellGroupId == "") {
            sgworld.Creator.DeleteObject(addSellGroupId);
        }
    } catch (e)
    { }
    try {
        var statisticsPolygonId = sgworld.ProjectTree.FindItem("临时区域");
        if (statisticsPolygonId != "") {
            sgworld.ProjectTree.DeleteItem(statisticsPolygonId);
        }
    } catch (e)
    { }
    try {
        var mytempTerrainId = sgworld.ProjectTree.FindItem("临时地形");
        if (mytempTerrainId != "") {
            sgworld.ProjectTree.DeleteItem(mytempTerrainId);
        }
    } catch (e) {

    }

    try {

        var clickGroupId = sgworld.ProjectTree.FindItem("选中网格");
        if (clickGroupId != "") {
            sgworld.ProjectTree.DeleteItem(clickGroupId);
        }
    } catch (e)
    { }
    try {
        var arrId = sgworld.ProjectTree.FindItem("分析工具");
        if (arrId != 0) {
            sgworld.ProjectTree.DeleteItem(arrId);
        }
    } catch (e)
    { }
    if (gPolyObj != null) {
        try {
            sgworld.Creator.DeleteObject(gPolyObj.ID);
        } catch (e)
        { }
        gPolyObj = null;
    }
    if (Polygon != null) {
        try {
            sgworld.Creator.DeleteObject(Polygon.ID);
        } catch (e)
        { }
        Polygon = null;
    }
    if (sidePolygon != null) {
        try {
            sgworld.Creator.DeleteObject(sidePolygon.ID);
        } catch (e)
        { }
        sidePolygon = null;
    }
    selectPolygonId = 0;
    selectPolygonName = "area";
    if (selectgPolyObj != null) {
        try {
            sgworld.Creator.DeleteObject(selectgPolyObj.ID);
        } catch (e)
        { }
        selectgPolyObj = null;
    }
    judge = -1;
    earthId = 0;
    earthName = "";
    if (earthPolyObj != null) {
        try {
            sgworld.Creator.DeleteObject(earthPolyObj.ID);
        } catch (e)
        { }
        earthPolyObj = null;
    }
}
function CleanTint() {
    try {
        var tintGroup = sgworld.ProjectTree.FindItem("高亮");
        if (tintGroup != 0) {
            sgworld.ProjectTree.DeleteItem(tintGroup);
        }
    } catch (e)
    { }
    //            tintGroup = sgworld.ProjectTree.CreateGroup("高亮");
    //            var analygroupId = sgworld.ProjectTree.FindItem("temp");
    //            if (analygroupId != 0) {
    //                sgworld.ProjectTree.DeleteItem(analygroupId);
    //            }
    //            if (listLayer.length > 0) {
    //                for (var i = 0; i < listLayer.length; i++) {
    //                    try {
    //                        var tintFeature = sgworld.Creator.GetObject(listLayer[i]);
    //                        tintFeature.Tint.SetAlpha(0);
    //                    } catch (e) { }
    //                }
    //                listLayer = [];
    //            }
}
function AllEventClean() {
    var inputM = sgworld.Window.GetInputMode();
    if (inputM != 0) {
        try {
            sgworld.DetachEvent("OnLButtonDown", move_OnLButtonDown);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnLButtonUp", move_OnLButtonUp);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnRButtonUp", move_OnRButtonUp);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnFrame", move_OnFrame);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnLButtonUp", pipeAnalyse_OnLButtonUp);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnRButtonUp", pipeAnalyse_OnRButtonUp);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnLButtonUp", pipeConnected_OnLButtonUp);
            sgworld.DetachEvent("OnRButtonUp", pipeConnected_OnRButtonUp);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnLButtonUp", select_OnLButtonUp);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnRButtonUp", select_OnRButtonUp);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnLButtonDown", selectPolygon_OnLButtonDown);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnRButtonUp", selectPolygon_OnRButtonUp);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnFrame", selectPolygon_OnFrame);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnLButtonDown", polygon_OnLButtonDown);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnRButtonUp", polygon_OnRButtonUp);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnFrame", polygon_OnFrame);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnLButtonUp", high_OnLButtonUp);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnRButtonUp", high_OnRButtonUp);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnLButtonDown", earth_OnLButtonDown);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnRButtonUp", earth_OnRButtonUp);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnFrame", earth_OnFrame);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnLButtonUp", clickCheck_OnLButtonUp);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnRButtonUp", clickCheck_OnRButtonUp);
        } catch (e) { }
        try {
            sgworld.DetachEvent("OnLButtonDown", DrawPath_LButtonDown);
            sgworld.DetachEvent("OnRButtonUp", DrawPath_RButtonUp);
            sgworld.DetachEvent("OnFrame", DrawPath_OnFrame);
        } catch (e) { }
        sgworld.Window.SetInputMode(0);
    }
}
function AllInitialise() {
    try {
        for (var i = 0; i < showGroupId.length; i++) {
            if (showGroupId[i] != 0) {
                try {
                    sgworld.ProjectTree.SetVisibility(showGroupId[i], false);
                } catch (e)
                { }
            }
        }
        showGroupId = [];
    } catch (e) {
    }
}
















//        // 属性查询
//        function selectPipeAttribute() {
//            select_Clean();
//            sgworld.Navigate.UndergroundMode = true;
//            sgworld.AttachEvent("OnLButtonDown", select_OnLButtonUp);
//            sgworld.AttachEvent("OnRButtonUp", select_OnRButtonUp);
//            sgworld.Window.SetInputMode(1);

//        }
//        function select_OnLButtonUp(Flags, X, Y) {
//            var selectFeature = null;
//            var CursorCoord = sgworld.Window.PixelToWorld(X, Y);
//            if (CursorCoord.Type == 1) {
//                selectFeature = sgworld.Creator.GetObject(CursorCoord.ObjectID);
//                var type = selectFeature.FeatureAttributes.GetFeatureAttribute("DataType").Value;
//                try {
//                    if (type == "polyline") {
//                        var selectType = "attributePolyline";
//                        var Id = selectFeature.FeatureAttributes.GetFeatureAttribute("Id").Value;
//                        var Type = selectFeature.FeatureAttributes.GetFeatureAttribute("Type").Value;
//                        var Size = selectFeature.FeatureAttributes.GetFeatureAttribute("Size").Value;
//                        var StartId = selectFeature.FeatureAttributes.GetFeatureAttribute("StartId").Value;
//                        var EndId = selectFeature.FeatureAttributes.GetFeatureAttribute("EndId").Value;
//                        var PopupMessage = sgworld.Creator.CreatePopupMessage(camera.TreeItem.Name, src + "message.html?selectType="+selectType+"&Id"+Id+"&Type"+Type+"&Size"+Size+"&StartId"+StartId+"&EndId"+EndId, 0, 0, count, 300, -1);
//                        selectFeature.Message.MessageID = PopupMessage.ID;
//                        selectFeature.Message.Activate();
//                    }
//                    if (type == "point") {
//                        var selectType = "attributePoint";
//                        var Id = selectFeature.FeatureAttributes.GetFeatureAttribute("Id").Value;
//                        var Type = selectFeature.FeatureAttributes.GetFeatureAttribute("Type").Value;
//                        var NodeId = selectFeature.FeatureAttributes.GetFeatureAttribute("NodeId").Value;
//                        var JoinType = selectFeature.FeatureAttributes.GetFeatureAttribute("JoinType").Value;
//                        var TerraDepth = selectFeature.FeatureAttributes.GetFeatureAttribute("TerraDepth").Value;
//                        var WellType = selectFeature.FeatureAttributes.GetFeatureAttribute("WellType").Value;
//                        var PopupMessage = sgworld.Creator.CreatePopupMessage(camera.TreeItem.Name, src + "message.html?selectType=" + selectType + "&Id" + Id + "&Type" + Type + "&NodeId" + NodeId + "&JoinType" + JoinType + "&TerraDepth" + TerraDepth + "&WellType" + WellType, 0, 0, count, 300, -1);
//                        selectFeature.Message.MessageID = PopupMessage.ID;
//                        selectFeature.Message.Activate();
//                    }
//                }
//                catch (e)
//                { }
//            }
//            return true;
//        }
//        function select_OnRButtonUp(Flags, X, Y)
//        {
//            select_Clean();
//            return true;
//        }
//        // 初始化选择
//        function select_Clean() {
//            try {
//                sgworld.DetachEvent("OnLButtonDown", select_OnLButtonUp);
//                sgworld.DetachEvent("OnRButtonUp", select_OnRButtonUp);
//                sgworld.Window.SetInputMode(0);
//            } catch (e) { 
//            
//            }
//        }



var earthId = 0;
var earthName = "";
var earthPolyObj = null;
function creatorEarth() {
    polygon_Clean();
    earthId = sgworld.ProjectTree.FindItem("分析工具");
    if (earthId == 0) {
        earthId = sgworld.ProjectTree.CreateGroup("分析工具");
    }
    earthName = "temp";
    sgworld.AttachEvent("OnLButtonDown", earth_OnLButtonDown);
    sgworld.AttachEvent("OnRButtonUp", earth_OnRButtonUp);
    sgworld.AttachEvent("OnFrame", earth_OnFrame);
    sgworld.Window.SetInputMode(1);
}
function earth_OnLButtonDown(Flags, X, Y) {
    var CursorCoord = sgworld.Window.PixelToWorld(X, Y);
    if (earthPolyObj == null) {
        var myLine = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([CursorCoord.Position.x, CursorCoord.Position.y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0]);
        earthPolyObj = sgworld.Creator.CreatePolyline(myLine, sgworld.Creator.CreateColor(255, 0, 0, 255), 2, earthId, earthName);
        earthPolyObj.LineStyle.Width = -1;
        earthPolyObj.Geometry.StartEdit();
    }
    else {
        if (earthPolyObj.ObjectType == 1) {
            // Deleting the temporary line
            var x = earthPolyObj.Geometry.Points.Item(0).X;
            var y = earthPolyObj.Geometry.Points.Item(0).Y;
            sgworld.Creator.DeleteObject(earthPolyObj.ID);

            // Creating the polygon
            var myGeometry = sgworld.Creator.GeometryCreator.CreateLinearRingGeometry([x, y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0])
            earthPolyObj = sgworld.Creator.createPolygon(myGeometry, sgworld.Creator.CreateColor(255, 0, 0, 1), sgworld.Creator.CreateColor(0, 255, 0, 0.5), 2, earthId, earthName);
            earthPolyObj.LineStyle.Width = -2;
            earthPolyObj.Terrain.GroundObject = true;
            earthPolyObj.Geometry.StartEdit();
        }
        else {
            earthPolyObj.Geometry.Rings(0).Points.Item(earthPolyObj.Geometry.Rings(0).Points.count - 1).X = CursorCoord.Position.x;
            earthPolyObj.Geometry.Rings(0).Points.Item(earthPolyObj.Geometry.Rings(0).Points.count - 1).Y = CursorCoord.Position.y;
            earthPolyObj.Geometry.Rings(0).Points.Item(earthPolyObj.Geometry.Rings(0).Points.count - 1).Z = 0;
            earthPolyObj.Geometry.Rings(0).Points.AddPoint(CursorCoord.Position.x, CursorCoord.Position.y, 0);
        }
    }
    return true;
}
function earth_OnFrame() {
    if (earthPolyObj != null) {
        try {
            var mouseInfo = sgworld.Window.GetMouseInfo()
            var CursorCoord = sgworld.Window.pixelToWorld(mouseInfo.X, mouseInfo.Y);
            if (CursorCoord == null)
                return false;
            if (earthPolyObj.ObjectType == 2) {
                earthPolyObj.Geometry.Rings(0).Points.Item(earthPolyObj.Geometry.Rings(0).Points.count - 1).X = CursorCoord.Position.x;
                earthPolyObj.Geometry.Rings(0).Points.Item(earthPolyObj.Geometry.Rings(0).Points.count - 1).Y = CursorCoord.Position.y;
                earthPolyObj.Geometry.Rings(0).Points.Item(earthPolyObj.Geometry.Rings(0).Points.count - 1).Z = 0;
            }
            else {
                earthPolyObj.Geometry.Points.Item(earthPolyObj.Geometry.Points.count - 1).X = CursorCoord.Position.x;
                earthPolyObj.Geometry.Points.Item(earthPolyObj.Geometry.Points.count - 1).Y = CursorCoord.Position.y;
                earthPolyObj.Geometry.Points.Item(earthPolyObj.Geometry.Points.count - 1).Z = 0;
            }
        }
        catch (e) { }
    }
}
// private static ITerrainHole61 tempModifier = null;

function earth_OnRButtonUp(Flags, X, Y) {
    if (earthPolyObj.ObjectType == 1) {
        sgworld.Creator.DeleteObject(earthPolyObj.ID);
    }
    else {
        earthPolyObj.Geometry.Rings(0).Points.DeletePoint(earthPolyObj.Geometry.Rings(0).Points.count - 1);
        if (earthPolyObj.Geometry.Rings(0).Points.count > 2) {
            earthPolyObj.Geometry.EndEdit();
            var tempModifier = sgworld.Creator.CreateTerrainModifier(earthPolyObj.Geometry, 0, true, 0, earthId, earthName);
            try {
                var arrModifierID = [];
                arrModifierID.push(tempModifier.ID);
                var tempVolumeAnalysisInfo = sgworld.Analysis.CalculateVolume(arrModifierID, 0.5);
                tempModifier.Tooltip.Text = "填土方：" + tempVolumeAnalysisInfo.AddedCubicMeters + "挖土方：" + tempVolumeAnalysisInfo.RemovedCubicMeters;
            } catch (e) {
                alert(e);
            }
        }
        if (earthPolyObj != null) {
            sgworld.Creator.DeleteObject(earthPolyObj.ID);
            //sgworld.ProjectTree.DeleteItem(earthPolyObj.TreeItem.ItemID);
        }
    }
    earth_Clean();
    return true;
}
/// <summary>
/// 初始化绘制多边形
/// </summary>
function earth_Clean() {
    try {
        earthId = 0;
        earthName = "";
        earthPolyObj = null;
        sgworld.DetachEvent("OnLButtonDown", earth_OnLButtonDown);
        sgworld.DetachEvent("OnRButtonUp", earth_OnRButtonUp);
        sgworld.DetachEvent("OnFrame", earth_OnFrame);
        sgworld.Window.SetInputMode(0);
    }
    catch (e) {
    }
}














var moveSelectLabel = null;
//移动
function move_OnLButtonDown(Flags, X, Y) {
    var CursorCoord = sgworld.Window.PixelToWorld(X, Y);
    if (CursorCoord.Type == 1) {
        moveSelectLabel = sgworld.Creator.GetObject(CursorCoord.ObjectID);
        var parentId = sgworld.ProjectTree.GetNextItem(moveSelectLabel.ID, 15);
        var parentName = sgworld.ProjectTree.GetItemName(parentId);
        if (parentName == "二三维联动") {

            sgworld.AttachEvent("OnFrame", move_OnFrame);
        }
    }
    return true;
}
function move_OnLButtonUp(Flags, X, Y) {
    try {
        sgworld.DetachEvent("OnFrame", move_OnFrame);
    } catch (e) {

    }
    return true;
}
function move_OnFrame() {
    var mouseInfo = sgworld.Window.GetMouseInfo()
    var CursorCoord = sgworld.Window.pixelToWorld(mouseInfo.X, mouseInfo.Y);
    if (moveSelectLabel != null) {
        moveSelectLabel.Position.X = CursorCoord.Position.X;
        moveSelectLabel.Position.Y = CursorCoord.Position.Y;
        var tdobj = window.frames["2d"];
        tdobj.moveGraphic(CursorCoord.Position.X, CursorCoord.Position.Y);
    }
}


function move_OnRButtonUp(Flags, X, Y) {
    sgworld.DetachEvent("OnLButtonDown", move_OnLButtonDown);
    sgworld.DetachEvent("OnLButtonUp", move_OnLButtonUp);
    sgworld.DetachEvent("OnRButtonUp", move_OnRButtonUp);
    try {
        sgworld.DetachEvent("OnFrame", move_OnFrame);
    } catch (e) {
    }
    sgworld.Window.SetInputMode(0);
    return true;
}











var flightgPolyObj = null;
var flightGroupId = 0;
//飞行路径
function flightPath() {
    try {
        flightgPolyObj = null;
        flightGroupId = sgworld.ProjectTree.FindItem("飞行路线");
        if (flightGroupId != 0 && flightGroupId != "") {
            sgworld.ProjectTree.DeleteItem(flightGroupId);
        }
        flightGroupId = sgworld.ProjectTree.CreateGroup("飞行路线");
        sgworld.AttachEvent("OnLButtonDown", DrawPath_LButtonDown);
        sgworld.AttachEvent("OnRButtonUp", DrawPath_RButtonUp);
        sgworld.AttachEvent("OnFrame", DrawPath_OnFrame);
        sgworld.Window.SetInputMode(1);
    } catch (e) {
    }
}

//----------
function DrawPath_LButtonDown(Flags, X, Y) {
    var CursorCoord = sgworld.Window.pixelToWorld(X, Y);
    if (CursorCoord == null)
        return false;
    if (flightgPolyObj == null) {
        var myGeometry = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([CursorCoord.Position.x, CursorCoord.Position.y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0])
        flightgPolyObj = sgworld.Creator.CreatePolyline(myGeometry, sgworld.Creator.CreateColor(0, 255, 0, 1), 2, flightGroupId, "test");
        flightgPolyObj.LineStyle.Width = -2;
        flightgPolyObj.Geometry.StartEdit();

    }
    else {
        if (flightgPolyObj != null) {
            flightgPolyObj.Geometry.Points.Item(flightgPolyObj.Geometry.Points.count - 1).X = CursorCoord.Position.x;
            flightgPolyObj.Geometry.Points.Item(flightgPolyObj.Geometry.Points.count - 1).Y = CursorCoord.Position.y;
            flightgPolyObj.Geometry.Points.Item(flightgPolyObj.Geometry.Points.count - 1).Z = 0;
            flightgPolyObj.Geometry.Points.AddPoint(CursorCoord.Position.x, CursorCoord.Position.y, 0);
        }
    }
    return true;
}
//-----------
// onFrame
//-----------
function DrawPath_OnFrame() {
    if (flightgPolyObj != null) {
        try {
            var mouseInfo = sgworld.Window.GetMouseInfo()
            var CursorCoord = sgworld.Window.pixelToWorld(mouseInfo.X, mouseInfo.Y);
            if (CursorCoord == null)
                return false;
            flightgPolyObj.Geometry.Points.Item(flightgPolyObj.Geometry.Points.count - 1).X = CursorCoord.Position.x;
            flightgPolyObj.Geometry.Points.Item(flightgPolyObj.Geometry.Points.count - 1).Y = CursorCoord.Position.y;
            flightgPolyObj.Geometry.Points.Item(flightgPolyObj.Geometry.Points.count - 1).Z = 0;
        }
        catch (e) { }
    }
}
//-------------
// DrawPolyRButtonUp
//-------------
function DrawPath_RButtonUp(Flags, X, Y) {
    if (flightgPolyObj == null || flightgPolyObj.Geometry.Points.count <= 2) {
        Reset();
        return false;
    }
    flightgPolyObj.Geometry.Points.DeletePoint(flightgPolyObj.Geometry.Points.count - 1);
    flightgPolyObj.Geometry.EndEdit();
    CreateFlyPath();
    Reset();
    return true;
}

function Reset() {
    try {

        sgworld.DetachEvent("OnLButtonDown", DrawPath_LButtonDown);
        sgworld.DetachEvent("OnRButtonUp", DrawPath_RButtonUp);
        sgworld.DetachEvent("OnFrame", DrawPath_OnFrame);
        if (flightgPolyObj != null) {
            sgworld.Creator.DeleteObject(flightgPolyObj.ID);
            flightgPolyObj = null;
        }
    }
    catch (e) {
    }
    sgworld.Window.SetInputMode(0);
}

function CreateFlyPath() {
    if (flightgPolyObj != null && flightGroupId != 0) {
        try {
            var waypointDirection = 0;
            var firstPosition = sgworld.Creator.CreatePosition(flightgPolyObj.Geometry.Points.Item(0).X, flightgPolyObj.Geometry.Points.Item(0).Y, 0);
            var secondPosition = sgworld.Creator.CreatePosition(flightgPolyObj.Geometry.Points.Item(1).X, flightgPolyObj.Geometry.Points.Item(1).Y, 0);
            firstPosition = firstPosition.AimTo(secondPosition);
            var flightObject = sgworld.Creator.CreateDynamicObject(null, 1, 3, "", 1, 0, flightGroupId, "沿路径观察");
            for (var k = 0; k < flightgPolyObj.Geometry.Points.count; k++) {
                if (k == 0) {
                    waypointDirection = firstPosition.Yaw;
                }
                else {
                    waypointDirection = 0;
                }
                var a = sgworld.Creator.CreateRouteWaypoint(flightgPolyObj.Geometry.Points.Item(k).X, flightgPolyObj.Geometry.Points.Item(k).Y, 10, 200, waypointDirection, 0, 0, 0, 0, "");
                flightObject.Waypoints.AddWaypoint(a);
            }
            flightObject.Action.Code = 5;
            flightObject.CircularRoute = false;
            var flightHtmlStr = "<html><head><title></title>";

            flightHtmlStr += "<script type='text/javascript'>function flightPlay() { var dynamic = sgworld.Creator.GetObject('";
            flightHtmlStr += flightObject.ID;
            flightHtmlStr += "'); if (dynamic.ObjectType == 23) { dynamic.RestartRoute(0); sgworld.Navigate.FlyTo(dynamic, 5); } } <";
            flightHtmlStr += "\/script>";

            flightHtmlStr += "</head><body><a href='#' onclick='flightPlay();'>";
            flightHtmlStr += "沿路径观察";
            flightHtmlStr += "</a><object id='sgworld' classid='CLSID:3a4f9197-65a8-11d5-85c1-0001023952c1'></object></body></html>";
            var flightPopup = sgworld.Creator.CreatePopupMessage("飞行路线", "", 233, 0, 150, 70);
            flightPopup.InnerText = flightHtmlStr;
            flightPopup.AllowResize = true;
            flightPopup.AllowDrag = true;
            sgworld.Window.ShowPopup(flightPopup);
        } catch (e)
        { }
    }
}