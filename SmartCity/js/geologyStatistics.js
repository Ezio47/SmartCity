var geologyStatisticsPolygonId = 0;
var geologyStatisticsPolygonName = "area";
var geologyStatisticsgPolyObj = null;
var pieMapping = 0; 
function geologyStatisticsPolygon() {
    AllEventClean();
    CleanTint();
    variableClean();
    geologyStatisticsPolygonId = sgworld.ProjectTree.FindItem("临时区域");
    if (geologyStatisticsPolygonId == 0) {
        geologyStatisticsPolygonId = sgworld.ProjectTree.CreateGroup("临时区域");
    }
    sgworld.AttachEvent("OnLButtonDown", geologyStatisticsPolygon_OnLButtonDown);
    sgworld.AttachEvent("OnRButtonUp", geologyStatisticsPolygon_OnRButtonUp);
    sgworld.AttachEvent("OnFrame", geologyStatisticsPolygon_OnFrame);
    sgworld.Window.SetInputMode(1);
}
function geologyStatisticsPolygon_OnLButtonDown(Flags, X, Y) {
    var CursorCoord = sgworld.Window.PixelToWorld(X, Y);
    if (geologyStatisticsgPolyObj == null) {
        var myLine = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([CursorCoord.Position.x, CursorCoord.Position.y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0]);
        geologyStatisticsgPolyObj = sgworld.Creator.CreatePolyline(myLine, sgworld.Creator.CreateColor(255, 0, 0, 255), 2, geologyStatisticsPolygonId, "temp");
        geologyStatisticsgPolyObj.LineStyle.Width = -1;
        geologyStatisticsgPolyObj.Geometry.StartEdit();
    }
    else {
	try
	{
        if (geologyStatisticsgPolyObj.ObjectType == 1) {
            // Deleting the temporary line
            var x = geologyStatisticsgPolyObj.Geometry.Points.Item(0).X;
            var y = geologyStatisticsgPolyObj.Geometry.Points.Item(0).Y;
            sgworld.Creator.DeleteObject(geologyStatisticsgPolyObj.ID);

            // Creating the polygon
            var myGeometry = sgworld.Creator.GeometryCreator.CreateLinearRingGeometry([x, y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0])
            geologyStatisticsgPolyObj = sgworld.Creator.createPolygon(myGeometry, sgworld.Creator.CreateColor(255, 0, 0, 255), sgworld.Creator.CreateColor(0, 255, 0, 26), 2, geologyStatisticsPolygonId, "temp");
            geologyStatisticsgPolyObj.LineStyle.Width = -2;
            geologyStatisticsgPolyObj.Terrain.GroundObject = true;
            geologyStatisticsgPolyObj.Geometry.StartEdit();
        }
        else {
            geologyStatisticsgPolyObj.Geometry.Rings(0).Points.Item(geologyStatisticsgPolyObj.Geometry.Rings(0).Points.count - 1).X = CursorCoord.Position.x;
            geologyStatisticsgPolyObj.Geometry.Rings(0).Points.Item(geologyStatisticsgPolyObj.Geometry.Rings(0).Points.count - 1).Y = CursorCoord.Position.y;
            geologyStatisticsgPolyObj.Geometry.Rings(0).Points.Item(geologyStatisticsgPolyObj.Geometry.Rings(0).Points.count - 1).Z = 0;
            geologyStatisticsgPolyObj.Geometry.Rings(0).Points.AddPoint(CursorCoord.Position.x, CursorCoord.Position.y, 0);
        }
	}catch(e){}
    }
    return true;
}
function geologyStatisticsPolygon_OnFrame() {
    if (geologyStatisticsgPolyObj != null) {
        try {
            var mouseInfo = sgworld.Window.GetMouseInfo()
            var CursorCoord = sgworld.Window.pixelToWorld(mouseInfo.X, mouseInfo.Y);
            if (CursorCoord == null)
                return false;
            if (geologyStatisticsgPolyObj.ObjectType == 2) {
                geologyStatisticsgPolyObj.Geometry.Rings(0).Points.Item(geologyStatisticsgPolyObj.Geometry.Rings(0).Points.count - 1).X = CursorCoord.Position.x;
                geologyStatisticsgPolyObj.Geometry.Rings(0).Points.Item(geologyStatisticsgPolyObj.Geometry.Rings(0).Points.count - 1).Y = CursorCoord.Position.y;
                geologyStatisticsgPolyObj.Geometry.Rings(0).Points.Item(geologyStatisticsgPolyObj.Geometry.Rings(0).Points.count - 1).Z = 0;
            }
            else {
                geologyStatisticsgPolyObj.Geometry.Points.Item(geologyStatisticsgPolyObj.Geometry.Points.count - 1).X = CursorCoord.Position.x;
                geologyStatisticsgPolyObj.Geometry.Points.Item(geologyStatisticsgPolyObj.Geometry.Points.count - 1).Y = CursorCoord.Position.y;
                geologyStatisticsgPolyObj.Geometry.Points.Item(geologyStatisticsgPolyObj.Geometry.Points.count - 1).Z = 0;
            }
        }
        catch (e) { }
    }
}
// private static ITerrainHole61 tempModifier = null;
function geologyStatisticsPolygon_OnRButtonUp(Flags, X, Y) {
    try {
        if ((pieMapping % 2) == 0) {
            pieMapping++;
            var showPathId = sgworld.ProjectTree.FindItem(layerPosition + "地质\\地质统计饼状\\饼状1");
            if (showPathId != "") {
            try{
                showGroupId.push(showPathId);
                }catch(e)
                {}
                sgworld.ProjectTree.SetVisibility(showPathId, true);
            }
        }
        else {
            pieMapping++;
            var showPathId = sgworld.ProjectTree.FindItem(layerPosition + "地质\\地质统计饼状\\饼状2");
            if (showPathId != "") {
            try{
                showGroupId.push(showPathId);
                }catch(e)
                {}
                sgworld.ProjectTree.SetVisibility(showPathId, true);
            }
        }
    } catch (e)
    { }
    try {
        var myjPolygonId = sgworld.ProjectTree.FindItem("临时区域");
        if (myjPolygonId != "") {
            sgworld.ProjectTree.DeleteItem(myjPolygonId);
        }
    } catch (e)
    { }
    try {
        geologyStatisticsPolygonId = 0;
        geologyStatisticsPolygonName = "area";
        sgworld.DetachEvent("OnLButtonDown", geologyStatisticsPolygon_OnLButtonDown);
        sgworld.DetachEvent("OnRButtonUp", geologyStatisticsPolygon_OnRButtonUp);
        sgworld.DetachEvent("OnFrame", geologyStatisticsPolygon_OnFrame);
        sgworld.Window.SetInputMode(0);
    } catch (e)
    { }
    try {
        if (geologyStatisticsgPolyObj != null) {
            sgworld.Creator.DeleteObject(geologyStatisticsgPolyObj.ID);
        }
    } catch (e) { 
    }
    geologyStatisticsgPolyObj = null;  
}