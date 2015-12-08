var LabelCode = 0;
var analyFeature = null;
var gPolyObj = null;
var digTerrainGroupId;

var tintFeature = [];

var htmlurl = window.location.href;
var allurl = htmlurl.substring(0, htmlurl.lastIndexOf("/"));
allurl = allurl.substring(0, allurl.lastIndexOf("/") + 1);

//----------
// 创建标注
//----------
function CreatePipeLabel(code) {
    try {
        LabelCode = code;
        sgworld.Window.ShowMessageBarText("请选择对象", 1);
        sgworld.AttachEvent("OnLButtonUp", CLable_OnLButtonUp);
        sgworld.AttachEvent("OnRButtonUp", CLable_OnRButtonUp);
        sgworld.Window.SetInputMode(1);
    } catch (e) { }
}
//----------
// 删除标注
//----------
function DelPipeLabel(code) {
    var Path = "";
    if (code == 1) {
        Path = "标注\\高度";
    }
    if (code == 2) {
        Path = "标注\\管径";
    }
    if (code == 3) {
        Path = "标注\\坐标";
    }
    if (code == 4) {
        Path = "标注\\距离";
    }
    if (code == 5) {
        Path = "标注\\坡度";
    }
    if (code == 6) {
        Path = "标注\\水平净距";
    }
    if (code == 7) {
        Path = "标注\\垂直净距";
    }
    if (code == 8) {
        Path = "标注\\距离分析";
    }
    if (code == 9) {
        Path = "标注\\流向";
    }
    if (code == 10) {
        Path = "临时地形";
    }
    if (code == 11) {
        Path = "饼状图";
    }
    if (Path != "") {
        var itemId = sgworld.ProjectTree.FindItem(Path);
        if (itemId != "") {
            try {
                sgworld.ProjectTree.DeleteItem(itemId);
            } catch (e)
        { }
        }
    }
}
function CleanAllTint() {
    for (var i = 0; i < tintFeature.length; i++) {
        try {
            tintFeature[i].Tint.SetAlpha(0);
        } catch (e)
{ }
    }
    tintFeature.length = 0;
}

//点击创建标注
function CLable_OnLButtonUp(Flags, X, Y) {
    var selectFeature = null;
    var CursorCoord = sgworld.Window.PixelToWorld(X, Y);
    if (CursorCoord.Type == 1) {
        selectFeature = sgworld.Creator.GetObject(CursorCoord.ObjectID);
        if (LabelCode == 11) {
            try {
                CleanAllTint();
                var lineColor = sgworld.Creator.CreateColor(255, 0, 0, 255);
                selectFeature.Tint = lineColor;
                tintFeature.push(selectFeature);
                labelClickSelect(selectFeature);
            } catch (e)
            { }
        } else {
            if (selectFeature.FeatureAttributes.GetFeatureAttribute("DataType").Value == "polyline") {
                if (LabelCode == 1) {
                    CleanAllTint();
                    var lineColor = sgworld.Creator.CreateColor(255, 0, 0, 255);
                    selectFeature.Tint = lineColor;
                    tintFeature.push(selectFeature);
                    CreateHeightLabel(selectFeature);
                }
                if (LabelCode == 2) {
                    CleanAllTint();
                    var lineColor = sgworld.Creator.CreateColor(255, 0, 0, 255);
                    selectFeature.Tint = lineColor;
                    tintFeature.push(selectFeature);
                    CreateRadiusLabel(selectFeature);
                }
                if (LabelCode == 3) {
                    CleanAllTint();
                    var lineColor = sgworld.Creator.CreateColor(255, 0, 0, 255);
                    selectFeature.Tint = lineColor;
                    tintFeature.push(selectFeature);
                    CreateCoordinateLable(selectFeature);
                }
                if (LabelCode == 4) {
                    CleanAllTint();
                    var lineColor = sgworld.Creator.CreateColor(255, 0, 0, 255);
                    selectFeature.Tint = lineColor;
                    tintFeature.push(selectFeature);
                    CreateDistanceLable(selectFeature);
                }
                if (LabelCode == 5) {
                    CleanAllTint();
                    var lineColor = sgworld.Creator.CreateColor(255, 0, 0, 255);
                    selectFeature.Tint = lineColor;
                    tintFeature.push(selectFeature);
                    CreateSlopeLable(selectFeature);
                }
                if (LabelCode == 6) {
                    if (analyFeature == null) {

                        CleanAllTint();
                        var lineColor = sgworld.Creator.CreateColor(255, 0, 0, 255);
                        selectFeature.Tint = lineColor;
                        tintFeature.push(selectFeature);

                        analyFeature = selectFeature;
                        sgworld.Window.ShowMessageBarText("请选择第二个对象", 1);
                    } else {
                        var lineColor = sgworld.Creator.CreateColor(255, 0, 0, 255);
                        selectFeature.Tint = lineColor;
                        tintFeature.push(selectFeature);

                        sgworld.Window.HideMessageBarText();
                        HorizontalDistanceAnaly(analyFeature, selectFeature);
                        analyFeature = null;
                    }
                }
                if (LabelCode == 7) {
                    if (analyFeature == null) {

                        CleanAllTint();
                        var lineColor = sgworld.Creator.CreateColor(255, 0, 0, 255);
                        selectFeature.Tint = lineColor;
                        tintFeature.push(selectFeature);

                        analyFeature = selectFeature;
                        sgworld.Window.ShowMessageBarText("请选择第二个对象", 1);
                    } else {
                        var lineColor = sgworld.Creator.CreateColor(255, 0, 0, 255);
                        selectFeature.Tint = lineColor;
                        tintFeature.push(selectFeature);

                        sgworld.Window.HideMessageBarText();
                        VerticalDistanceAnaly(analyFeature, selectFeature);
                        analyFeature = null;
                    }
                }
                if (LabelCode == 8) {
                    if (analyFeature == null) {

                        CleanAllTint();
                        var lineColor = sgworld.Creator.CreateColor(255, 0, 0, 255);
                        selectFeature.Tint = lineColor;
                        tintFeature.push(selectFeature);

                        analyFeature = selectFeature;
                        sgworld.Window.ShowMessageBarText("请选择第二个对象", 1);
                    } else {
                        var lineColor = sgworld.Creator.CreateColor(255, 0, 0, 255);
                        selectFeature.Tint = lineColor;
                        tintFeature.push(selectFeature);

                        sgworld.Window.HideMessageBarText();
                        HorizontalDistanceAnaly(analyFeature, selectFeature);
                        analyFeature = null;
                    }
                }
                if (LabelCode == 9) {
                    CleanAllTint();
                    var lineColor = sgworld.Creator.CreateColor(255, 0, 0, 255);
                    selectFeature.Tint = lineColor;
                    tintFeature.push(selectFeature);
                    PipeDirection(selectFeature);
                }
            }
        }
    }
    return true;
}
//查询
function labelClickSelect(selectFeature) {
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
                var htmlStr = "<html><head><title></title><style>.table-c table{border-right:1px solid #00A;border-bottom:1px solid #00A} .table-c table td{border-left:1px solid #00A;border-top:1px solid #00A}</style>";
                htmlStr += "</head><body style=\" margin:0px; padding:0px;\"><div id=\"div\" class=\"table-c\" style=\"margin:5px;width:180px; height:150px; \"><table style='width:100% ' border='0' cellspacing='0' cellpadding='0'><tr><td>";
                htmlStr += "<div style='font-size:12px;'>编号：</div></td><td><div style='font-size:12px;'>" + Id + "</div></td></tr><tr><td>";
                htmlStr += "<div style='font-size:12px;'>类型：</div></td><td><div style='font-size:12px;'>" + Type + "</div></td></tr><tr><td>";
                htmlStr += "<div style='font-size:12px;'>管径：</div></td><td><div style='font-size:12px;'>" + Size + "</div></td></tr><tr><td>";
                htmlStr += "<div style='font-size:12px;'>起始设备编号：</div></td><td><div style='font-size:12px;'>" + StartId + "</div></td></tr><tr><td>";
                htmlStr += "<div style='font-size:12px;'>结束设备编号：</div></td><td><div style='font-size:12px;'>" + EndId + "</div></td></tr><tr><td>";
                htmlStr += "<div style='font-size:12px;'>方向：</div></td><td><div style='font-size:12px;'>" + Yaw + "</div></td></tr><tr><td>";
                htmlStr += "<div style='font-size:12px;'>坡度：</div></td><td><div style='font-size:12px;'>" + Pitch + "</div></td></tr><tr><td>";
                htmlStr += "<div style='font-size:12px;'>长度：</div></td><td><div style='font-size:12px;'>" + scaleY + "</div></td></tr>";
                htmlStr += "</table></div></body></html>";
                var clickPopup = sgworld.Creator.CreatePopupMessage("属性", "", 235, 100, 220, 220);
                clickPopup.InnerText = htmlStr;
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
                var htmlStr = "<html><head><title></title><style>.table-c table{border-right:1px solid #00A;border-bottom:1px solid #00A} .table-c table td{border-left:1px solid #00A;border-top:1px solid #00A}</style>";
                htmlStr += "</head><body style=\" margin:0px; padding:0px;\"><div id=\"div\" class=\"table-c\" style=\"margin:5px;width:180px; height:150px; \"><table style='width:100% ' border='0' cellspacing='0' cellpadding='0'><tr><td>";
                htmlStr += "<div style='font-size:12px;'>编号：</div></td><td><div style='font-size:12px;'>" + Id + "</div></td></tr><tr><td>";
                htmlStr += "<div style='font-size:12px;'>设备类型：</div></td><td><div style='font-size:12px;'>" + Type + "</div></td></tr><tr><td>";
                htmlStr += "<div style='font-size:12px;'>关联编号：</div></td><td><div style='font-size:12px;'>" + NodeId + "</div></td></tr><tr><td>";
                htmlStr += "<div style='font-size:12px;'>设备类型：</div></td><td><div style='font-size:12px;'>" + JoinType + "</div></td></tr><tr><td>";
                htmlStr += "<div style='font-size:12px;'>埋深：</div></td><td><div style='font-size:12px;'>" + TerraDepth + "</div></td></tr><tr><td>";
                htmlStr += "<div style='font-size:12px;'>井类型：</div></td><td><div style='font-size:12px;'>" + WellType + "</div></td></tr>";
                htmlStr += "</table></div></body></html>";
                var clickPopup = sgworld.Creator.CreatePopupMessage("属性", "", 235, 100, 220, 220);
                clickPopup.InnerText = htmlStr;
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
}
function PipeDirection(selectFeature) {
    var StartX = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartX").Value);
    var StartY = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartY").Value);
    var StartZ = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartZ").Value);
    var EndX = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndX").Value);
    var EndY = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndY").Value);
    var EndZ = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndZ").Value);
    var StartPosition = sgworld.Creator.CreatePosition(StartX, StartY, StartZ, 2);
    var EndPosition = sgworld.Creator.CreatePosition(EndX, EndY, EndZ, 2);


    StartPosition = StartPosition.AimTo(EndPosition);
    var Distance = StartPosition.DistanceTo(EndPosition);
    StartPosition = StartPosition.MoveToward(EndPosition, Distance);
    var parentId = sgworld.ProjectTree.FindItem("标注");
    if (parentId == "") {
        parentId = sgworld.ProjectTree.CreateGroup("标注");
    }
    var groupId = sgworld.ProjectTree.FindItem("标注\\流向");
    if (groupId == "") {
        groupId = sgworld.ProjectTree.CreateGroup("流向", parentId);
    }
    var PipeArrow = sgworld.Creator.CreateArrow(StartPosition, Distance, 4, sgworld.Creator.CreateColor(255, 0, 0, 155), sgworld.Creator.CreateColor(255, 0, 0, 155), groupId, "流向");
}
//水平净距分析
function HorizontalDistanceAnaly(firstFeature, secondFeature) {
    var fStartX = parseFloat(firstFeature.FeatureAttributes.GetFeatureAttribute("StartX").Value);
    var fStartY = parseFloat(firstFeature.FeatureAttributes.GetFeatureAttribute("StartY").Value);
    var fStartZ = parseFloat(firstFeature.FeatureAttributes.GetFeatureAttribute("StartZ").Value);

    var fEndX = parseFloat(firstFeature.FeatureAttributes.GetFeatureAttribute("EndX").Value);
    var fEndY = parseFloat(firstFeature.FeatureAttributes.GetFeatureAttribute("EndY").Value);
    var fEndZ = parseFloat(firstFeature.FeatureAttributes.GetFeatureAttribute("EndZ").Value);

    var sStartX = parseFloat(secondFeature.FeatureAttributes.GetFeatureAttribute("StartX").Value);
    var sStartY = parseFloat(secondFeature.FeatureAttributes.GetFeatureAttribute("StartY").Value);
    var sStartZ = parseFloat(secondFeature.FeatureAttributes.GetFeatureAttribute("StartZ").Value);

    var sEndX = parseFloat(secondFeature.FeatureAttributes.GetFeatureAttribute("EndX").Value);
    var sEndY = parseFloat(secondFeature.FeatureAttributes.GetFeatureAttribute("EndY").Value);
    var sEndZ = parseFloat(secondFeature.FeatureAttributes.GetFeatureAttribute("EndZ").Value);

    var fStartPosition = sgworld.Creator.CreatePosition(fStartX, fStartY, 0, 0);
    var fEndPosition = sgworld.Creator.CreatePosition(fEndX, fEndY, 0, 0);
    var sStartPosition = sgworld.Creator.CreatePosition(sStartX, sStartY, 0, 0);
    var sEndPosition = sgworld.Creator.CreatePosition(sEndX, sEndY, 0, 0);

    var mfLineString = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([fStartX, fStartY, 0, fEndX, fEndY, 0]);
    var msLineString = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([sStartX, sStartY, 0, sEndX, sEndY, 0]);

    var fsLineString = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([fStartX, fStartY, 0, fStartX, fStartY, 0]);
    var ssLineString = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([sStartX, sStartY, 0, sStartX, sStartY, 0]);

    var feLineString = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([fEndX, fEndY, 0, fEndX, fEndY, 0]);
    var seLineString = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([sEndX, sEndY, 0, sEndX, sEndY, 0]);

    var fsseDistance = fsLineString.SpatialOperator.Distance(seLineString);
    var fsssDistance = fsLineString.SpatialOperator.Distance(ssLineString);

    var feseDistance = feLineString.SpatialOperator.Distance(seLineString);
    var fessDistance = feLineString.SpatialOperator.Distance(ssLineString);

    var fsmsDistance = fsLineString.SpatialOperator.Distance(msLineString);
    var femsDistance = feLineString.SpatialOperator.Distance(msLineString);
    var ssmfDistance = ssLineString.SpatialOperator.Distance(mfLineString);
    var semfDistance = seLineString.SpatialOperator.Distance(mfLineString);

    var mfmsDistance = mfLineString.SpatialOperator.Distance(msLineString);
    var parentId = sgworld.ProjectTree.FindItem("标注");
    if (parentId == "") {
        parentId = sgworld.ProjectTree.CreateGroup("标注");
    }
    var groupId = sgworld.ProjectTree.FindItem("标注\\水平净距");
    if (groupId == "") {
        groupId = sgworld.ProjectTree.CreateGroup("水平净距", parentId);
    }
    var cLabelStyle = sgworld.Creator.CreateLabelStyle();
    cLabelStyle.TextColor.FromHTMLColor("#800000");
    cLabelStyle.BackgroundColor.FromHTMLColor("#FFFFFF");cLabelStyle.BackgroundColor.SetAlpha(0);
    cLabelStyle.Bold = true;
    if (mfmsDistance == fsseDistance) {
        var minDistance = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([fStartX, fStartY, 0, sEndX, sEndY, 0]);
        var minPoly = sgworld.Creator.CreatePolyline(minDistance, "#FF0000", 0, groupId, "");
        minPoly.LineStyle.Width = 3;
        minPoly.Tooltip.Text = mfmsDistance;
        var hlabel = sgworld.Creator.CreateLabel(minPoly.Position, "水平净距为：" + mfmsDistance.toFixed(3), "", cLabelStyle, groupId);

    }
    else {
        if (mfmsDistance == fsssDistance) {
            var minDistance = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([fStartX, fStartY, 0, sStartX, sStartY, 0]);
            var minPoly = sgworld.Creator.CreatePolyline(minDistance, "#FF0000", 0, groupId, "");
            minPoly.LineStyle.Width = 3;
            minPoly.Tooltip.Text = mfmsDistance;
            var hlabel = sgworld.Creator.CreateLabel(minPoly.Position, "水平净距为：" + mfmsDistance.toFixed(3), "", cLabelStyle, groupId);
        }
        else {
            if (mfmsDistance == feseDistance) {
                var minDistance = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([fEndX, fEndY, 0, sEndX, sEndY, 0]);
                var minPoly = sgworld.Creator.CreatePolyline(minDistance, "#FF0000", 0, groupId, "");
                minPoly.LineStyle.Width = 3;
                minPoly.Tooltip.Text = mfmsDistance;
                var hlabel = sgworld.Creator.CreateLabel(minPoly.Position, "水平净距为：" + mfmsDistance.toFixed(3), "", cLabelStyle, groupId);
            }
            else {
                if (mfmsDistance == fessDistance) {
                    var minDistance = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([fEndX, fEndY, 0, sStartX, sStartY, 0]);
                    var minPoly = sgworld.Creator.CreatePolyline(minDistance, "#FF0000", 0, groupId, "");
                    minPoly.LineStyle.Width = 3;
                    minPoly.Tooltip.Text = mfmsDistance;
                    var hlabel = sgworld.Creator.CreateLabel(minPoly.Position, "水平净距为：" + mfmsDistance.toFixed(3), "", cLabelStyle, groupId);
                }
                else {
                    if (mfmsDistance == fsmsDistance) {
                        var msYaw = sStartPosition.AimTo(sEndPosition).Yaw;
                        var zfsPosition = fStartPosition.Move(mfmsDistance, msYaw + 90, 0);
                        var jfsPosition = fStartPosition.Move(mfmsDistance, msYaw - 90, 0);
                        if (jfsPosition.DistanceTo(sStartPosition) > zfsPosition.DistanceTo(sStartPosition)) {
                            var minDistance = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([fStartPosition.X, fStartPosition.Y, 0, zfsPosition.X, zfsPosition.Y, 0]);
                            var minPoly = sgworld.Creator.CreatePolyline(minDistance, "#FF0000", 0, groupId, "");
                            minPoly.LineStyle.Width = 3;
                            minPoly.Tooltip.Text = mfmsDistance;
                            var hlabel = sgworld.Creator.CreateLabel(minPoly.Position, "水平净距为：" + mfmsDistance.toFixed(3), "", cLabelStyle, groupId);
                        }
                        else {
                            var minDistance = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([fStartPosition.X, fStartPosition.Y, 0, jfsPosition.X, jfsPosition.Y, 0]);
                            var minPoly = sgworld.Creator.CreatePolyline(minDistance, "#FF0000", 0, groupId, "");
                            minPoly.LineStyle.Width = 3;
                            minPoly.Tooltip.Text = mfmsDistance;
                            var hlabel = sgworld.Creator.CreateLabel(minPoly.Position, "水平净距为：" + mfmsDistance.toFixed(3), "", cLabelStyle, groupId);
                        }
                    }
                    else {
                        if (mfmsDistance == femsDistance) {
                            var msYaw = sStartPosition.AimTo(sEndPosition).Yaw;
                            var zfsPosition = fEndPosition.Move(mfmsDistance, msYaw + 90, 0);
                            var jfsPosition = fEndPosition.Move(mfmsDistance, msYaw - 90, 0);
                            if (jfsPosition.DistanceTo(sStartPosition) > zfsPosition.DistanceTo(sStartPosition)) {
                                var minDistance = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([fEndPosition.X, fEndPosition.Y, 0, zfsPosition.X, zfsPosition.Y, 0]);
                                var minPoly = sgworld.Creator.CreatePolyline(minDistance, "#FF0000", 0, groupId, "");
                                minPoly.LineStyle.Width = 3;
                                minPoly.Tooltip.Text = mfmsDistance;
                                var hlabel = sgworld.Creator.CreateLabel(minPoly.Position, "水平净距为：" + mfmsDistance.toFixed(3), "", cLabelStyle, groupId);
                            }
                            else {
                                var minDistance = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([fEndPosition.X, fEndPosition.Y, 0, jfsPosition.X, jfsPosition.Y, 0]);
                                var minPoly = sgworld.Creator.CreatePolyline(minDistance, "#FF0000", 0, groupId, "");
                                minPoly.LineStyle.Width = 3;
                                minPoly.Tooltip.Text = mfmsDistance;
                                var hlabel = sgworld.Creator.CreateLabel(minPoly.Position, "水平净距为：" + mfmsDistance.toFixed(3), "", cLabelStyle, groupId);
                            }
                        }
                        else {
                            if (mfmsDistance == ssmfDistance) {
                                var msYaw = fStartPosition.AimTo(fEndPosition).Yaw;
                                var zfsPosition = sStartPosition.Move(mfmsDistance, msYaw + 90, 0);
                                var jfsPosition = sStartPosition.Move(mfmsDistance, msYaw - 90, 0);
                                if (jfsPosition.DistanceTo(fStartPosition) > zfsPosition.DistanceTo(fStartPosition)) {
                                    var minDistance = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([sStartPosition.X, sStartPosition.Y, 0, zfsPosition.X, zfsPosition.Y, 0]);
                                    var minPoly = sgworld.Creator.CreatePolyline(minDistance, "#FF0000", 0, groupId, "");
                                    minPoly.LineStyle.Width = 3;
                                    minPoly.Tooltip.Text = mfmsDistance;
                                    var hlabel = sgworld.Creator.CreateLabel(minPoly.Position, "水平净距为：" + mfmsDistance.toFixed(3), "", cLabelStyle, groupId);
                                }
                                else {
                                    var minDistance = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([sStartPosition.X, sStartPosition.Y, 0, jfsPosition.X, jfsPosition.Y, 0]);
                                    var minPoly = sgworld.Creator.CreatePolyline(minDistance, "#FF0000", 0, groupId, "");
                                    minPoly.LineStyle.Width = 3;
                                    minPoly.Tooltip.Text = mfmsDistance;
                                    var hlabel = sgworld.Creator.CreateLabel(minPoly.Position, "水平净距为：" + mfmsDistance.toFixed(3), "", cLabelStyle, groupId);
                                }
                            }
                            else {
                                if (mfmsDistance == semfDistance) {
                                    var msYaw = fStartPosition.AimTo(fEndPosition).Yaw;
                                    var zfsPosition = sEndPosition.Move(mfmsDistance, msYaw + 90, 0);
                                    var jfsPosition = sEndPosition.Move(mfmsDistance, msYaw - 90, 0);
                                    if (jfsPosition.DistanceTo(fStartPosition) > zfsPosition.DistanceTo(fStartPosition)) {
                                        var minDistance = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([sEndPosition.X, sEndPosition.Y, 0, zfsPosition.X, zfsPosition.Y, 0]);
                                        var minPoly = sgworld.Creator.CreatePolyline(minDistance, "#FF0000", 0, groupId, "");
                                        minPoly.LineStyle.Width = 3;
                                        minPoly.Tooltip.Text = mfmsDistance;
                                        var hlabel = sgworld.Creator.CreateLabel(minPoly.Position, "水平净距为：" + mfmsDistance.toFixed(3), "", cLabelStyle, groupId);
                                    }
                                    else {
                                        var minDistance = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([sEndPosition.X, sEndPosition.Y, 0, jfsPosition.X, jfsPosition.Y, 0]);
                                        var minPoly = sgworld.Creator.CreatePolyline(minDistance, "#FF0000", 0, groupId, "");
                                        minPoly.LineStyle.Width = 3;
                                        minPoly.Tooltip.Text = mfmsDistance;
                                        var hlabel = sgworld.Creator.CreateLabel(minPoly.Position, "水平净距为：" + mfmsDistance.toFixed(3), "", cLabelStyle, groupId);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

//垂直净距分析
function VerticalDistanceAnaly(firstFeature, secondFeature) {
    var fStartX = parseFloat(firstFeature.FeatureAttributes.GetFeatureAttribute("StartX").Value);
    var fStartY = parseFloat(firstFeature.FeatureAttributes.GetFeatureAttribute("StartY").Value);
    var fStartZ = parseFloat(firstFeature.FeatureAttributes.GetFeatureAttribute("StartZ").Value);

    var fEndX = parseFloat(firstFeature.FeatureAttributes.GetFeatureAttribute("EndX").Value);
    var fEndY = parseFloat(firstFeature.FeatureAttributes.GetFeatureAttribute("EndY").Value);
    var fEndZ = parseFloat(firstFeature.FeatureAttributes.GetFeatureAttribute("EndZ").Value);

    var sStartX = parseFloat(secondFeature.FeatureAttributes.GetFeatureAttribute("StartX").Value);
    var sStartY = parseFloat(secondFeature.FeatureAttributes.GetFeatureAttribute("StartY").Value);
    var sStartZ = parseFloat(secondFeature.FeatureAttributes.GetFeatureAttribute("StartZ").Value);

    var sEndX = parseFloat(secondFeature.FeatureAttributes.GetFeatureAttribute("EndX").Value);
    var sEndY = parseFloat(secondFeature.FeatureAttributes.GetFeatureAttribute("EndY").Value);
    var sEndZ = parseFloat(secondFeature.FeatureAttributes.GetFeatureAttribute("EndZ").Value);

  
    var parentId = sgworld.ProjectTree.FindItem("标注");
    if (parentId == "") {
        parentId = sgworld.ProjectTree.CreateGroup("标注");
    }
    var groupId = sgworld.ProjectTree.FindItem("标注\\垂直净距");
    if (groupId == "") {
        groupId = sgworld.ProjectTree.CreateGroup("垂直净距", parentId);
    }
    //    var geometry = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([StartX, StartY, StartZ, EndX, EndY, EndZ]);
    //    var color = sgworld.Creator.CreateColor(255, 0, 0, 0.7);
    //    var line = sgworld.Creator.CreatePolyline(geometry, color, 2, groupId, "");
    //    line.LineStyle.Width = 1;
    var cLabelStyle = sgworld.Creator.CreateLabelStyle();
    cLabelStyle.TextColor.FromHTMLColor("#800000");
    cLabelStyle.BackgroundColor.FromHTMLColor("#FFFFFF");cLabelStyle.BackgroundColor.SetAlpha(0);
    cLabelStyle.Bold = true;
    var StartPosition = sgworld.Creator.CreatePosition((sStartX + sEndX) / 2.0, (sStartY + sEndY) / 2.0, ((sStartZ + sEndZ) / 2.0) + 0.1, 0);
    var RadiusStartLabel = sgworld.Creator.CreateLabel(StartPosition, "垂直净距：" + (((sStartZ + sEndZ) / 2.0) - ((fStartZ + fEndZ) / 2.0)).toFixed(3) + "米", "", cLabelStyle, groupId, "水平净距");
    RadiusStartLabel.Style.LineToGround = false;

}
//距离分析
function DistanceAnaly(firstFeature, secondFeature) {

}
//创建高度标注
function CreateHeightLabel(selectFeature) {
    var StartX = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartX").Value);
    var StartY = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartY").Value);
    var StartZ = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartZ").Value);
    var EndX = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndX").Value);
    var EndY = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndY").Value);
    var EndZ = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndZ").Value);
    var parentId = sgworld.ProjectTree.FindItem("标注");
    if (parentId == "") {
        parentId = sgworld.ProjectTree.CreateGroup("标注");
    }
    var groupId = sgworld.ProjectTree.FindItem("标注\\高度");
    if (groupId == "") {
        groupId = sgworld.ProjectTree.CreateGroup("高度", parentId);
    }
    var cLabelStyle = sgworld.Creator.CreateLabelStyle();
    cLabelStyle.TextColor.FromHTMLColor("#800000");
    cLabelStyle.BackgroundColor.FromHTMLColor("#FFFFFF");cLabelStyle.BackgroundColor.SetAlpha(0);
    cLabelStyle.Bold = true;
    var StartPosition = sgworld.Creator.CreatePosition(StartX, StartY, StartZ + 0.1, 3);
    var HeightStartLabel = sgworld.Creator.CreateLabel(StartPosition, "起始点高度：" + StartZ.toFixed(3), "", cLabelStyle, groupId, "起始点高度");
    HeightStartLabel.Style.LineToGround = false;
    var EndPosition = sgworld.Creator.CreatePosition(EndX, EndY, EndZ + 0.1, 3);
    var EndStartLabel = sgworld.Creator.CreateLabel(EndPosition, "结束点高度：" + EndZ.toFixed(3), "", cLabelStyle, groupId, "结束点高度");
    EndStartLabel.Style.LineToGround = false;
}
//创建管径标注
function CreateRadiusLabel(selectFeature) {
    var StartX = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartX").Value);
    var StartY = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartY").Value);
    var StartZ = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartZ").Value);
    var EndX = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndX").Value);
    var EndY = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndY").Value);
    var EndZ = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndZ").Value);
    var Size = selectFeature.FeatureAttributes.GetFeatureAttribute("Size").Value;
    var StartPosition = sgworld.Creator.CreatePosition((StartX + EndX) / 2.0, (StartY + EndY) / 2.0, ((StartZ + EndZ) / 2.0) + 0.1, 3);
    var parentId = sgworld.ProjectTree.FindItem("标注");
    if (parentId == "") {
        parentId = sgworld.ProjectTree.CreateGroup("标注");
    }
    var groupId = sgworld.ProjectTree.FindItem("标注\\管径");
    if (groupId == "") {
        groupId = sgworld.ProjectTree.CreateGroup("管径", parentId);
    }
    var cLabelStyle = sgworld.Creator.CreateLabelStyle();
    cLabelStyle.TextColor.FromHTMLColor("#800000");
    cLabelStyle.BackgroundColor.FromHTMLColor("#FFFFFF");cLabelStyle.BackgroundColor.SetAlpha(0);
    cLabelStyle.Bold = true;
    var RadiusStartLabel = sgworld.Creator.CreateLabel(StartPosition, "管径：" + Size.toFixed(3), "", cLabelStyle, groupId, "管径");
    RadiusStartLabel.Style.LineToGround = false;
}
//创建坐标标注
function CreateCoordinateLable(selectFeature) {
    var StartX = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartX").Value);
    var StartY = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartY").Value);
    var StartZ = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartZ").Value);
    var EndX = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndX").Value);
    var EndY = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndY").Value);
    var EndZ = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndZ").Value);
    var StartPosition = sgworld.Creator.CreatePosition(StartX, StartY, StartZ + 1, 3);
    var parentId = sgworld.ProjectTree.FindItem("标注");
    if (parentId == "") {
        parentId = sgworld.ProjectTree.CreateGroup("标注");
    }
    var groupId = sgworld.ProjectTree.FindItem("标注\\坐标");
    if (groupId == "") {
        groupId = sgworld.ProjectTree.CreateGroup("坐标", parentId);
    }
    var cLabelStyle = sgworld.Creator.CreateLabelStyle();
    cLabelStyle.TextColor.FromHTMLColor("#800000");
    cLabelStyle.BackgroundColor.FromHTMLColor("#FFFFFF");cLabelStyle.BackgroundColor.SetAlpha(0);
    cLabelStyle.Bold = true;
    var HeightStartLabel = sgworld.Creator.CreateLabel(StartPosition, "起始点坐标：" + StartX.toFixed(6) + "," + StartY.toFixed(6), "", cLabelStyle, groupId, "起始点坐标");
    HeightStartLabel.Style.LineToGround = false;
    var EndPosition = sgworld.Creator.CreatePosition(EndX, EndY, EndZ + 1, 3);
    var EndStartLabel = sgworld.Creator.CreateLabel(EndPosition, "结束点坐标：" + EndX.toFixed(6) + "," + EndY.toFixed(6), "", cLabelStyle, groupId, "结束点坐标");
    EndStartLabel.Style.LineToGround = false;
}
//创建距离标注
function CreateDistanceLable(selectFeature) {
    var StartX = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartX").Value);
    var StartY = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartY").Value);
    var StartZ = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartZ").Value);
    var EndX = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndX").Value);
    var EndY = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndY").Value);
    var EndZ = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndZ").Value);

    var StartPosition = sgworld.Creator.CreatePosition(StartX, StartY, StartZ, 3);
    var EndPosition = sgworld.Creator.CreatePosition(EndX, EndY, EndZ, 3);


    var Distance = StartPosition.DistanceTo(EndPosition);
    var StartPosition = sgworld.Creator.CreatePosition((StartX + EndX) / 2.0, (StartY + EndY) / 2.0, ((StartZ + EndZ) / 2.0) + 1, 3);
    var parentId = sgworld.ProjectTree.FindItem("标注");
    if (parentId == "") {
        parentId = sgworld.ProjectTree.CreateGroup("标注");
    }
    var groupId = sgworld.ProjectTree.FindItem("标注\\距离");
    if (groupId == "") {
        groupId = sgworld.ProjectTree.CreateGroup("距离", parentId);
    }
    var cLabelStyle = sgworld.Creator.CreateLabelStyle();
    cLabelStyle.TextColor.FromHTMLColor("#800000");
    cLabelStyle.BackgroundColor.FromHTMLColor("#FFFFFF");cLabelStyle.BackgroundColor.SetAlpha(0);
    cLabelStyle.Bold = true;
    var RadiusStartLabel = sgworld.Creator.CreateLabel(StartPosition, "距离：" + Distance.toFixed(3), "", cLabelStyle, groupId, "距离");
    RadiusStartLabel.Style.LineToGround = false;
}
//创建坡度标注
function CreateSlopeLable(selectFeature) {
    var StartX = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartX").Value);
    var StartY = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartY").Value);
    var StartZ = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("StartZ").Value);
    var EndX = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndX").Value);
    var EndY = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndY").Value);
    var EndZ = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("EndZ").Value);
    var Pitch = parseFloat(selectFeature.FeatureAttributes.GetFeatureAttribute("Pitch").Value);

    var Slope = Pitch;
    var StartPosition = sgworld.Creator.CreatePosition((StartX + EndX) / 2.0, (StartY + EndY) / 2.0, ((StartZ + EndZ) / 2.0) + 2, 3);
    var parentId = sgworld.ProjectTree.FindItem("标注");
    if (parentId == "") {
        parentId = sgworld.ProjectTree.CreateGroup("标注");
    }
    var groupId = sgworld.ProjectTree.FindItem("标注\\坡度");
    if (groupId == "") {
        groupId = sgworld.ProjectTree.CreateGroup("坡度", parentId);
    }
    var cLabelStyle = sgworld.Creator.CreateLabelStyle();
    cLabelStyle.TextColor.FromHTMLColor("#800000");
    cLabelStyle.BackgroundColor.FromHTMLColor("#FFFFFF");cLabelStyle.BackgroundColor.SetAlpha(0);
    cLabelStyle.Bold = true;
    var RadiusStartLabel = sgworld.Creator.CreateLabel(StartPosition, "坡度：" + Slope.toFixed(3), "", cLabelStyle, groupId, "坡度");
    RadiusStartLabel.Style.LineToGround = false;
}
//右键清除事件
function CLable_OnRButtonUp(Flags, X, Y) {
    ClearCLable();
    return true;
}
function ClearCLable() {
    LabelCode = 0;
    analyFeature = null;
    CleanAllTint();
    var parentId = sgworld.ProjectTree.FindItem("标注");
    if (parentId != "") {
        sgworld.ProjectTree.DeleteItem(parentId);
    }

    sgworld.DetachEvent("OnLButtonUp", CLable_OnLButtonUp);
    sgworld.DetachEvent("OnRButtonUp", CLable_OnRButtonUp);
    sgworld.Window.SetInputMode(0);
}


//临时地形开挖
function polygon_OnLButtonDown(Flags, X, Y) {
    var CursorCoord = sgworld.Window.pixelToWorld(X, Y);
    if (CursorCoord == null)
        return false;
    if (gPolyObj == null) {
        // We always start with a polyline and change it to Polygon (for area) after the second click)
        var myGeometry = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([CursorCoord.Position.x, CursorCoord.Position.y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0])
        gPolyObj = sgworld.Creator.createPolyline(myGeometry, sgworld.Creator.CreateColor(0, 255, 0, 255), 2, -1, "临时地形");
        gPolyObj.LineStyle.Width = -2;
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
            gPolyObj = sgworld.Creator.createPolygon(myGeometry, sgworld.Creator.CreateColor(0, 255, 0, 255), sgworld.Creator.CreateColor(0, 255, 0, 155), 2, -1, "临时地形");
            gPolyObj.LineStyle.Width = -2;
            gPolyObj.Terrain.GroundObject = false;
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
//-----------
// onFrame
//-----------
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
//------------------
// DrawPolyRButtonUp
//------------------
function polygon_OnRButtonUp(Flags, X, Y) {
    if (gPolyObj.ObjectType == 1) {
        gPolyObj.Geometry.Points.DeletePoint(gPolyObj.Geometry.Points.count - 1);
    }
    else {
        gPolyObj.Geometry.Rings(0).Points.DeletePoint(gPolyObj.Geometry.Rings(0).Points.count - 1);
    }
    CreateDigTerrain(gPolyObj);
    sgworld.DetachEvent("OnLButtonDown", polygon_OnLButtonDown);
    sgworld.DetachEvent("OnFrame", polygon_OnFrame);
    sgworld.DetachEvent("OnRButtonUp", polygon_OnRButtonUp);
    sgworld.Window.SetInputMode(0);
    return true;
}
function CreateDigTerrain(gPolyObjDig) {

    if (gPolyObjDig.Geometry.Rings(0).Points.count > 2) {
        for (var i = 0; i < gPolyObjDig.Geometry.Rings(0).Points.count; i++) {
            if (i < gPolyObjDig.Geometry.Rings(0).Points.count - 1) {
                var point1 = gPolyObjDig.Geometry.Rings(0).Points.Item(i);
                var point2 = gPolyObjDig.Geometry.Rings(0).Points.Item(i + 1);
                //                            var point3 = sgworld.Terrain.GetGroundHeightInfo(point2.X, point2.Y, 1, false);
                //                            var point4 = sgworld.Terrain.GetGroundHeightInfo(point1.X, point1.Y, 1, false);
                var myLine = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([point1.X, point1.Y, -20, point2.X, point2.Y, -20]);
                sidePolygon = sgworld.Creator.CreatePolyline(myLine, sgworld.Creator.CreateColor(155, 155, 155, 255), 0, digTerrainGroupId, "临时地形");
                sidePolygon.FillStyle.Texture.FileName = allurl + "images/dijian.jpg";
                sidePolygon.FillStyle.Texture.TilingMethod = 1;
                sidePolygon.ExtendToGround = true;
                sidePolygon.FillStyle.Texture.ScaleX = 50;
                sidePolygon.FillStyle.Texture.ScaleY = 50;
                sidePolygon.LineStyle.Width = -1;
                sidePolygon.Terrain.GroundObject = false; ;
            }
            else {
                if (i == gPolyObjDig.Geometry.Rings(0).Points.count - 1) {
                    var point1 = gPolyObjDig.Geometry.Rings(0).Points.Item(i);
                    var point2 = gPolyObjDig.Geometry.Rings(0).Points.Item(0);
                    //                                var point3 = sgworld.Terrain.GetGroundHeightInfo(point2.X, point2.Y, 1, false);
                    //                                var point4 = sgworld.Terrain.GetGroundHeightInfo(point1.X, point1.Y, 1, false);
                    //                                var myLine = sgworld.Creator.GeometryCreator.CreateLinearRingGeometry([point1.X, point1.Y, -20, point2.X, point2.Y, -20, point3.Position.X, point3.Position.Y, point3.Position.Altitude, point4.Position.X, point4.Position.Y, point4.Position.Altitude, point4.Position.X, point4.Position.Y, point4.Position.Altitude]);
                    //                                sidePolygon = sgworld.Creator.CreatePolygon(myLine, sgworld.Creator.CreateColor(150, 150, 150, 255), sgworld.Creator.CreateColor(150, 150, 150, 255), 3, tempTerrainId, tempName+i);
                    var myLine = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([point1.X, point1.Y, -20, point2.X, point2.Y, -20]);
                    sidePolygon = sgworld.Creator.CreatePolyline(myLine, sgworld.Creator.CreateColor(155, 155, 155, 255), 0, digTerrainGroupId, "临时地形");

                    sidePolygon.FillStyle.Texture.FileName = allurl + "images/dijian.jpg";
                    sidePolygon.FillStyle.Texture.TilingMethod = 1;
                    sidePolygon.ExtendToGround = true;
                    sidePolygon.FillStyle.Texture.ScaleX = 50;
                    sidePolygon.FillStyle.Texture.ScaleY = 50;
                    sidePolygon.LineStyle.Width = -1;
                    sidePolygon.Terrain.GroundObject = false; ;
                }
            }
        }
        gPolyObjDig.Geometry.EndEdit();
        var tempModifier = sgworld.Creator.CreateHoleOnTerrain(gPolyObjDig.Geometry, digTerrainGroupId, "临时地形");
        Polygon = sgworld.Creator.CreatePolygon(gPolyObjDig.Geometry, sgworld.Creator.CreateColor(150, 150, 150, 255), sgworld.Creator.CreateColor(150, 150, 150, 255), 0, digTerrainGroupId, "临时地形");
        Polygon.FillStyle.Texture.FileName = allurl + "images/dimian.jpg";
        Polygon.FillStyle.Texture.TilingMethod = 1;
        Polygon.FillStyle.Texture.ScaleX = 100;
        Polygon.FillStyle.Texture.ScaleY = 100;
        Polygon.Terrain.GroundObject = false; ;
        Polygon.Position.Altitude = -20;
    }
    if (gPolyObjDig != null) {
        sgworld.Creator.DeleteObject(gPolyObjDig.ID);
    }
}

