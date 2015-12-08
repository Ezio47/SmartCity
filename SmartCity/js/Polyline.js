//---------------
//2014.3.19金磊
//---------------
//绘制线
var Draw_polyGon = null;
var Draw_polyGon_polyline = null;
var Draw_polyGon_boolDrawLine = false;
var htmlurl = window.location.href;
var url = htmlurl.substring(0, htmlurl.lastIndexOf("/tool") + 1);
function DrawPolyline() {
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
}

//创建线左键事件
function Draw_polyGon_OnLButtonDown(Flags, X, Y) {
	var newGroupID = sgworld.ProjectTree.FindItem("线面");
    var startPosition = sgworld.Window.PixelToWorld(X, Y);
    if (startPosition == null) {
        return false;
    }
    if (Draw_polyGon_polyline == null) {
        var lineGeometry = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([startPosition.Position.X, startPosition.Position.Y, 2, startPosition.Position.X, startPosition.Position.Y, 2]);
        Draw_polyGon_polyline = sgworld.Creator.CreatePolyline(lineGeometry, sgworld.Creator.CreateColor(0, 255, 20, 255), 0, newGroupID);
        Draw_polyGon_polyline.LineStyle.Width = -1; 
        Draw_polyGon_polyline.Geometry.StartEdit();
    }
    else {
        var polygon = Draw_polyGon_polyline.Geometry;
        var endPoint = polygon.Points(polygon.Points.Count - 1);
        endPoint.X = startPosition.Position.X;
        endPoint.Y = startPosition.Position.Y;
        endPoint.Z = 2;
        polygon.Points.AddPoint(startPosition.Position.X, startPosition.Position.Y, 0);
    }
    return true;

}
//画线右键事件
function Draw_polyGon_OnRButtonDown(Flags, X, Y) {
    sgworld.Window.SetInputMode(0);
    if (Draw_polyGon_polyline != null) {
        var polygon = Draw_polyGon_polyline.Geometry;
        polygon.Points.DeletePoint(polygon.Points.Count - 1);
        Draw_polyGon_polyline.Geometry.EndEdit();
    }
    //raw_polyGon = null;
    sgworld.DetachEvent("OnLButtonDown", Draw_polyGon_OnLButtonDown);
    sgworld.DetachEvent("OnFrame", Draw_polyGon_OnFrame);
    sgworld.DetachEvent("OnRButtonDown", Draw_polyGon_OnLButtonDown);	 
	
	if (after == 1) {			
        var areaPopup = sgworld.Creator.CreatePopupMessage("断面", url +　"pipe.htm", 231, 0, 500, 350 );
        areaPopup.AllowResize = false;
        areaPopup.ShowCaption = false;
        sgworld.Window.ShowPopup(areaPopup);		
	}
	var xianGroup = sgworld.ProjectTree.FindItem("线面");
	if (xianGroup != 0) {
        sgworld.ProjectTree.DeleteItem(xianGroup);
    }
    return true;

}

//画面拉伸效果

function Draw_polyGon_OnFrame() {
    var mouseInfo = sgworld.Window.GetMouseInfo();
    if (Draw_polyGon_polyline != null) {
        var endposition = sgworld.Window.PixelToWorld(mouseInfo.X, mouseInfo.Y);		
        var lineGeometry = Draw_polyGon_polyline.Geometry;
        var endpoint = lineGeometry.EndPoint;
        endpoint.X = endposition.Position.X;
        endpoint.Y = endposition.Position.Y;
        endpoint.Z = 2;
    }
}

