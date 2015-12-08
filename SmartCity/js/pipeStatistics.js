

var statisticsPolygonId = 0;
var statisticsPolygonName = "area";
var statisticsgPolyObj = null;
function statisticsPolygon() {
    AllEventClean();
    CleanTint();
    variableClean();
    statisticsPolygonId = sgworld.ProjectTree.FindItem("临时区域");
    if (statisticsPolygonId == 0) {
        statisticsPolygonId = sgworld.ProjectTree.CreateGroup("临时区域");
    }
    sgworld.AttachEvent("OnLButtonDown", statisticsPolygon_OnLButtonDown);
    sgworld.AttachEvent("OnRButtonUp", statisticsPolygon_OnRButtonUp);
    sgworld.AttachEvent("OnFrame", statisticsPolygon_OnFrame);
    sgworld.Window.SetInputMode(1);
}
function statisticsPolygon_OnLButtonDown(Flags, X, Y) {
    var CursorCoord = sgworld.Window.PixelToWorld(X, Y);
    if (statisticsgPolyObj == null) {
        var myLine = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([CursorCoord.Position.x, CursorCoord.Position.y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0]);
        statisticsgPolyObj = sgworld.Creator.CreatePolyline(myLine, sgworld.Creator.CreateColor(255, 0, 0, 255), 0, statisticsPolygonId, "temp");
        statisticsgPolyObj.LineStyle.Width = -1;
        statisticsgPolyObj.Geometry.StartEdit();
    }
    else {
        if (statisticsgPolyObj.ObjectType == 1) {
            // Deleting the temporary line
            var x = statisticsgPolyObj.Geometry.Points.Item(0).X;
            var y = statisticsgPolyObj.Geometry.Points.Item(0).Y;
            sgworld.Creator.DeleteObject(statisticsgPolyObj.ID);

            // Creating the polygon
            var myGeometry = sgworld.Creator.GeometryCreator.CreateLinearRingGeometry([x, y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0])
            statisticsgPolyObj = sgworld.Creator.createPolygon(myGeometry, sgworld.Creator.CreateColor(255, 0, 0, 255), sgworld.Creator.CreateColor(0, 255, 0, 26), 0, statisticsPolygonId, "temp");
            statisticsgPolyObj.LineStyle.Width = -2;
            statisticsgPolyObj.Terrain.GroundObject = true;
            statisticsgPolyObj.Geometry.StartEdit();
        }
        else {
            statisticsgPolyObj.Geometry.Rings(0).Points.Item(statisticsgPolyObj.Geometry.Rings(0).Points.count - 1).X = CursorCoord.Position.x;
            statisticsgPolyObj.Geometry.Rings(0).Points.Item(statisticsgPolyObj.Geometry.Rings(0).Points.count - 1).Y = CursorCoord.Position.y;
            statisticsgPolyObj.Geometry.Rings(0).Points.Item(statisticsgPolyObj.Geometry.Rings(0).Points.count - 1).Z = 0;
            statisticsgPolyObj.Geometry.Rings(0).Points.AddPoint(CursorCoord.Position.x, CursorCoord.Position.y, 0);
        }
    }
    return true;
}
function statisticsPolygon_OnFrame() {
    if (statisticsgPolyObj != null) {
        try {
            var mouseInfo = sgworld.Window.GetMouseInfo()
            var CursorCoord = sgworld.Window.pixelToWorld(mouseInfo.X, mouseInfo.Y);
            if (CursorCoord == null)
                return false;
            if (statisticsgPolyObj.ObjectType == 2) {
                statisticsgPolyObj.Geometry.Rings(0).Points.Item(statisticsgPolyObj.Geometry.Rings(0).Points.count - 1).X = CursorCoord.Position.x;
                statisticsgPolyObj.Geometry.Rings(0).Points.Item(statisticsgPolyObj.Geometry.Rings(0).Points.count - 1).Y = CursorCoord.Position.y;
                statisticsgPolyObj.Geometry.Rings(0).Points.Item(statisticsgPolyObj.Geometry.Rings(0).Points.count - 1).Z = 0;
            }
            else {
                statisticsgPolyObj.Geometry.Points.Item(statisticsgPolyObj.Geometry.Points.count - 1).X = CursorCoord.Position.x;
                statisticsgPolyObj.Geometry.Points.Item(statisticsgPolyObj.Geometry.Points.count - 1).Y = CursorCoord.Position.y;
                statisticsgPolyObj.Geometry.Points.Item(statisticsgPolyObj.Geometry.Points.count - 1).Z = 0;
            }
        }
        catch (e) { }
    }
}
// private static ITerrainHole61 tempModifier = null;
function statisticsPolygon_OnRButtonUp(Flags, X, Y) {
    var htmlStr = "";
    statisticsPolygonId = 0;
    statisticsPolygonName = "area";
    sgworld.DetachEvent("OnLButtonDown", statisticsPolygon_OnLButtonDown);
    sgworld.DetachEvent("OnRButtonUp", statisticsPolygon_OnRButtonUp);
    sgworld.DetachEvent("OnFrame", statisticsPolygon_OnFrame);
    sgworld.Window.SetInputMode(0);
try
{
if(statisticsgPolyObj!=null){
    if (statisticsgPolyObj.ObjectType == 1) {
        sgworld.Creator.DeleteObject(statisticsgPolyObj.ID);
    }
    else {
        statisticsgPolyObj.Geometry.Rings(0).Points.DeletePoint(statisticsgPolyObj.Geometry.Rings(0).Points.count - 1);
        if (statisticsgPolyObj.Geometry.Rings(0).Points.count > 2) {
            statisticsgPolyObj.Geometry.EndEdit();
            var AllPath = new Array();
            AllPath.push("管道\\管线数据\\管道\\规划电信\\规划电信Line0");
            AllPath.push("管道\\管线数据\\管道\\规划电力\\规划电力Line0");
            AllPath.push("管道\\管线数据\\管道\\规划给水\\规划给水Line0");
            AllPath.push("管道\\管线数据\\管道\\规划中压燃气\\规划中压燃气Line0");
            AllPath.push("管道\\管线数据\\管道\\规划污水\\规划污水Line0");
            AllPath.push("管道\\管线数据\\管道\\规划雨水\\规划雨水Line0");
            var allName = new Array();
            allName.push("规划电信");
            allName.push("规划电力");
            allName.push("规划给水");
            allName.push("规划中压燃气");
            allName.push("规划污水");
            allName.push("规划雨水");


            htmlStr = "<html><head><title></title>";
            htmlStr += "<style>table{border-right:1px solid #11264f;border-bottom:1px solid #11264f}table td{border-left:1px solid #11264f;border-top:1px solid #11264f}</style>";
            htmlStr += "</head><body style='width:100%;height:100%;  margin:2px; padding:2px;'><table style='width:100%; text-align:center;font-size:12px;' border='0' cellspacing='0' cellpadding='0'><tr style='background-color:#11264f'>";
           // var firstFeature = statisticsedLayer(0);
            htmlStr += "<td style='color:white;'>";
            htmlStr += "管道类型";
            htmlStr += "</td>";
            htmlStr += "<td style='color:white;'>";
            htmlStr += "管段数";
            htmlStr += "</td>";
            htmlStr += "</tr>";
            var m = 0;
            var n = 0;
            
            for (var i = 0; i < AllPath.length; i++) {
	    try{
                var layerItemId = sgworld.ProjectTree.FindItem(AllPath[i]); //管道\\
                if (layerItemId != 0) {
                    var pipeLayer = sgworld.ProjectTree.GetObject(layerItemId);
                    if (pipeLayer.ObjectType == 36) {
                            var statisticsedLayer = pipeLayer.ExecuteSpatialQuery(statisticsgPolyObj.Geometry, 1);
                            if (i == 0) {
                                n = statisticsedLayer.Count;
                            }
                            else {
                                if (i == 1) {
                                    if (m % 2 == 0) { htmlStr += "<tr style='background-color:#90d7ec'>"; }
                                    else { htmlStr += "<tr>"; }
                                    htmlStr += "<td>";
                                    try { htmlStr += allName[i]; } catch (e){ }
                                    htmlStr += "</td>";
                                    htmlStr += "<td>";
                                    try { htmlStr += statisticsedLayer.Count + n; } catch (e){ }
                                    htmlStr += "</td>";
                                    htmlStr += "</tr>";
                                    m++;
                                }
                                else {
                                    if (m % 2 == 0) { htmlStr += "<tr style='background-color:#90d7ec'>"; }
                                    else { htmlStr += "<tr>"; }
                                    htmlStr += "<td>";
                                    try { htmlStr += allName[i]; } catch (e) { }
                                    htmlStr += "</td>";
                                    htmlStr += "<td>";
                                    try { htmlStr += statisticsedLayer.Count;} catch (e){ }
                                    htmlStr += "</td>";
                                    htmlStr += "</tr>";
                                    m++;
                                }
                            }
                    }
                }
	     }catch(e){}
            }

            htmlStr += "</table></body></html>";
            if (htmlStr != "") {
                var ScreenRectHeight = sgworld.Window.Rect.Height;
                var ScreenRectWidth = sgworld.Window.Rect.Width;
                var areaPopup = sgworld.Creator.CreatePopupMessage("管段统计", "", 231, 150, 231, 120);
                areaPopup.InnerText = htmlStr;
                areaPopup.Flags = 512;
                areaPopup.AllowResize = true;
                areaPopup.AllowDrag = true;
                sgworld.Window.ShowPopup(areaPopup);
            }
        }
    }
}
}catch(e){}
    if (statisticsgPolyObj != null) {
        sgworld.Creator.DeleteObject(statisticsgPolyObj.ID);
    }
    statisticsgPolyObj = null;
    return true;
}
        
