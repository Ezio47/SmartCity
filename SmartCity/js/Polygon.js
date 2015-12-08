//绘制面
var Draw_polyGon = null;
var Draw_polyGon_polyline = null;
var Draw_polyGon_boolDrawLine = false;
var chaiqianArea = null;

function DrawPolygon() {
	var newGroup = sgworld.ProjectTree.FindItem("线面");
    if (newGroup == 0) {
        sgworld.ProjectTree.CreateGroup("线面");
        }
    if (sgworld == null) {
        CreateSgworld();
    }
    Draw_polyGon = null;
    Draw_polyGon_polyline = null;
    Draw_polyGon_boolDrawLine = false;
    sgworld.AttachEvent("OnFrame", Draw_polyGon_OnFrame);
    sgworld.AttachEvent("OnLButtonDown", Draw_polyGon_OnLButtonDown);
    sgworld.AttachEvent("OnRButtonDown", Draw_polyGon_OnRButtonDown);
    sgworld.Window.SetInputMode(1);
	return chaiqianArea;
}

//创建面左键事件
function Draw_polyGon_OnLButtonDown(Flags, X, Y) {
    var newGroupID = sgworld.ProjectTree.FindItem("线面");
    var startPosition = sgworld.Window.PixelToWorld(X, Y);
    if (startPosition == null) {
        return false;
    }
    if (Draw_polyGon == null && Draw_polyGon_polyline == null) {
        var lineGeometry = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([startPosition.Position.X, startPosition.Position.Y, 2, startPosition.Position.X, startPosition.Position.Y, 2]);
        Draw_polyGon_polyline = sgworld.Creator.CreatePolyline(lineGeometry, sgworld.Creator.CreateColor(0, 255, 20,255), 0 , newGroupID);
        Draw_polyGon_polyline.LineStyle.Width = -1;
        Draw_polyGon_polyline.Geometry.StartEdit();
    }
    else {
        if (Draw_polyGon == null) {
            var startPoint = null;
            Draw_polyGon_boolDrawLine = true;
            var lineGeometry = Draw_polyGon_polyline.Geometry;
            startPoint = lineGeometry.Points(0);
            var polygonGeometry = sgworld.Creator.GeometryCreator.CreateLinearRingGeometry([startPoint.X, startPoint.Y, 12, startPosition.Position.X, startPosition.Position.Y, 2, startPosition.Position.X, startPosition.Position.Y, 12]);
            Draw_polyGon = sgworld.Creator.CreatePolygon(polygonGeometry, sgworld.Creator.CreateColor(0, 255, 20,255), sgworld.Creator.CreateColor(253, 228, 20,155), 15, newGroupID, "");
            Draw_polyGon.LineStyle.Width = -1;
            Draw_polyGon.Geometry.StartEdit();
            Draw_polyGon.Terrain.GroundObject = true;
            sgworld.Creator.DeleteObject(Draw_polyGon_polyline.ID);
            Draw_polyGon_polyline = null;
        }
        else {
            var polygon = Draw_polyGon.Geometry;
            var polygonGeometry = polygon.Rings(0);
            var endPoint = polygonGeometry.Points(polygonGeometry.Points.Count - 1);
            endPoint.X = startPosition.Position.X;
            endPoint.Y = startPosition.Position.Y;
            endPoint.Z = 2;
            polygonGeometry.Points.AddPoint(startPosition.Position.X, startPosition.Position.Y, 0);
        }
    }
    return true;

}
//画面右键事件
function Draw_polyGon_OnRButtonDown(Flags, X, Y) {
    sgworld.Window.SetInputMode(0);
    if (Draw_polyGon != null) {
        var polygon = Draw_polyGon.Geometry;
        var polygonGeometry = polygon.Rings(0);
        polygonGeometry.Points.DeletePoint(polygonGeometry.Points.Count - 1);
        Draw_polyGon.Geometry.EndEdit();
    }
    //raw_polyGon = null;
    sgworld.DetachEvent("OnLButtonDown", Draw_polyGon_OnLButtonDown);
    sgworld.DetachEvent("OnFrame", Draw_polyGon_OnFrame);
    sgworld.DetachEvent("OnRButtonDown", Draw_polyGon_OnLButtonDown);
	chaiqianArea = sgworld.Analysis.MeasureTerrainArea(Draw_polyGon.Geometry);
    return true;

}

//画面拉伸效果
function Draw_polyGon_OnFrame() {

    var mouseInfo = sgworld.Window.GetMouseInfo();
    if (!Draw_polyGon_boolDrawLine) {
        if (Draw_polyGon_polyline != null) {
            var endposition = sgworld.Window.PixelToWorld(mouseInfo.X, mouseInfo.Y);
            var lineGeometry = Draw_polyGon_polyline.Geometry;
            var endpoint = lineGeometry.EndPoint;
            endpoint.X = endposition.Position.X;
            endpoint.Y = endposition.Position.Y;
            endpoint.Z = 2;
        }
    }
    if (Draw_polyGon != null) {
        var endposition = sgworld.Window.PixelToWorld(mouseInfo.X, mouseInfo.Y);
        var polygon = Draw_polyGon.Geometry;
        var polygonGeometry = polygon.Rings(0);
        var endPoint = polygonGeometry.Points(polygonGeometry.Points.Count - 1);
        endPoint.X = endposition.Position.X;
        endPoint.Y = endposition.Position.Y;
        endPoint.Z = 2;
    }

}






function startDrawing() {
    if (sgworld == null) {
        CreateSgworld();
    }
    sgworld.Window.SetInputMode(1);
    sgworld.AttachEvent("OnLButtonDown", startDrawing_OnLButtonDown);
    sgworld.AttachEvent("OnFrame", startDrawing_OnFrame);
}
var startPosition = null;
var circle = null;
function startDrawing_OnLButtonDown(Flags, X, Y) {
    if (circle == null) {
        var worldPosition = sgworld.Window.PixelToWorld(X, Y);
        startPosition = worldPosition.Position;
        circle = sgworld.Creator.CreateCircle(startPosition, 1, sgworld.Creator.CreateColor(0, 255, 0, 155), sgworld.Creator.CreateColor(255, 255, 0, 155), "", "");
        circle.NumberOfSegments = 60;
        circle.Position.Altitude = circle.Position.Altitude + 2;
    }
    else {
        sgworld.Window.SetInputMode(0);
        sgworld.DetachEvent("OnLButtonDown", startDrawing_OnLButtonDown);
        sgworld.DetachEvent("OnFrame", startDrawing_OnFrame);
         startPosition = null;
         circle = null;
    }
}
function startDrawing_OnFrame() {
    if (circle != null) {
        var mouseInfo = sgworld.Window.GetMouseInfo();
        var endPosition = sgworld.Window.PixelToWorld(mouseInfo.X, mouseInfo.Y);
        var distance = startPosition.DistanceTo(endPosition.Position);
        radius = distance;
        circle.Radius = distance;
    }
}