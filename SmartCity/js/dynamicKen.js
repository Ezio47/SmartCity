var kengPolyObj = null;
var kenGroupId = 0;
var kenurl = window.location.href;
var allkenurl = kenurl.substring(0, kenurl.lastIndexOf("/") + 1);
//飞行路径
function kenPath() {
    try {
        AllEventClean();
    } catch (e)
    { }
    try {
        kengPolyObj = null;
        kenGroupId = sgworld.ProjectTree.FindItem("分析工具");
        if (kenGroupId == "") {
            kenGroupId = sgworld.ProjectTree.CreateGroup("分析工具");
        }
        sgworld.AttachEvent("OnLButtonDown", dynamicPath_LButtonDown);
        sgworld.AttachEvent("OnRButtonUp", dynamicPath_RButtonUp);
        sgworld.AttachEvent("OnFrame", dynamicPath_OnFrame);
        sgworld.Window.SetInputMode(1);
    } catch (e) {
    }
}

//----------
function dynamicPath_LButtonDown(Flags, X, Y) {
    var CursorCoord = sgworld.Window.pixelToWorld(X, Y);
    if (CursorCoord == null)
        return false;
    if (kengPolyObj == null) {
        var myGeometry = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([CursorCoord.Position.x, CursorCoord.Position.y, 0, CursorCoord.Position.x, CursorCoord.Position.y, 0])
        kengPolyObj = sgworld.Creator.CreatePolyline(myGeometry, sgworld.Creator.CreateColor(0, 255, 0, 1), 2, kenGroupId, "test");
        kengPolyObj.LineStyle.Width = -2;
        kengPolyObj.Geometry.StartEdit();

    }
    else {
        kengPolyObj.Geometry.Points.Item(kengPolyObj.Geometry.Points.count - 1).X = CursorCoord.Position.x;
        kengPolyObj.Geometry.Points.Item(kengPolyObj.Geometry.Points.count - 1).Y = CursorCoord.Position.y;
        kengPolyObj.Geometry.Points.Item(kengPolyObj.Geometry.Points.count - 1).Z = 0;
        kengPolyObj.Geometry.Points.AddPoint(CursorCoord.Position.x, CursorCoord.Position.y, 0);
    }
    return true;
}
//-----------
// onFrame
//-----------
function dynamicPath_OnFrame() {
    if (kengPolyObj != null) {
        try {
            var mouseInfo = sgworld.Window.GetMouseInfo()
            var CursorCoord = sgworld.Window.pixelToWorld(mouseInfo.X, mouseInfo.Y);
            if (CursorCoord == null)
                return false;
            kengPolyObj.Geometry.Points.Item(kengPolyObj.Geometry.Points.count - 1).X = CursorCoord.Position.x;
            kengPolyObj.Geometry.Points.Item(kengPolyObj.Geometry.Points.count - 1).Y = CursorCoord.Position.y;
            kengPolyObj.Geometry.Points.Item(kengPolyObj.Geometry.Points.count - 1).Z = 0;
        }
        catch (e) { }
    }
}
//-------------
// DrawPolyRButtonUp
//-------------
function dynamicPath_RButtonUp(Flags, X, Y) {
    if (kengPolyObj == null || kengPolyObj.Geometry.Points.count <= 2) {
        dynamicPathReset();
        return false;
    }
    kengPolyObj.Geometry.Points.DeletePoint(kengPolyObj.Geometry.Points.count - 1);
    kengPolyObj.Geometry.EndEdit();
    CreateKenPath();
    dynamicPathReset();
    return true;
}

function dynamicPathReset() {
    try {
        sgworld.DetachEvent("OnLButtonDown", dynamicPath_LButtonDown);
        sgworld.DetachEvent("OnRButtonUp", dynamicPath_RButtonUp);
        sgworld.DetachEvent("OnFrame", dynamicPath_OnFrame);
        if (kengPolyObj != null) {
            sgworld.Creator.DeleteObject(kengPolyObj.ID);
            kengPolyObj = null;
        }
    }
    catch (e) {
    }
    sgworld.Window.SetInputMode(0);
}

function CreateKenPath() {
    if (kengPolyObj != null && kenGroupId != 0) {
        try {
            var waypointDirection = 0;
            var dynamicObj = sgworld.Creator.CreateDynamicObject(null, 0, 0, allkenurl + "car1.xpl2", 1, 0, kenGroupId, "动态视域");
            dynamicObj.CircularRoute = true;
            dynamicObj.TurnSpeed = 400;

            // add waypoints
            var speed = 60 * 0.44704;

            var firstPosition = sgworld.Creator.CreatePosition(kengPolyObj.Geometry.Points.Item(0).X, kengPolyObj.Geometry.Points.Item(0).Y, 0);
            var secondPosition = sgworld.Creator.CreatePosition(kengPolyObj.Geometry.Points.Item(1).X, kengPolyObj.Geometry.Points.Item(1).Y, 0);
            firstPosition = firstPosition.AimTo(secondPosition);
            //firstPosition.Distance = $("#DistanceID").attr("value");

            for (var k = 0; k < kengPolyObj.Geometry.Points.count; k++) {
                if (k == 0) {
                    waypointDirection = firstPosition.Yaw;
                }
                else
                    waypointDirection = 0;
                var a = sgworld.Creator.CreateRouteWaypoint(kengPolyObj.Geometry.Points.Item(k).X, kengPolyObj.Geometry.Points.Item(k).Y, 0, speed, waypointDirection, 0, 0, 0, 0, "");
                dynamicObj.Waypoints.AddWaypoint(a);
            }
            for (var k = kengPolyObj.Geometry.Points.count - 2; k > 0; k--) {
                var a = sgworld.Creator.CreateRouteWaypoint(kengPolyObj.Geometry.Points.Item(k).X, kengPolyObj.Geometry.Points.Item(k).Y, 0, speed, 0, 0, 0, 0, 0, "");
                dynamicObj.Waypoints.AddWaypoint(a);
            }

            // Create 3D Viewshed
            var viewshedObj = sgworld.Analysis.Create3DViewshed(firstPosition, 90, 60, 300, kenGroupId, "视域");
            viewshedObj.RayColor = sgworld.Creator.CreateColor(250, 250, 250, 80);

            viewshedObj.VisibleAreaColor = sgworld.Creator.CreateColor(0, 255, 0, 80);
            viewshedObj.HiddenAreaColor = sgworld.Creator.CreateColor(255, 0, 0, 80);
            //                var red = Math.random() * 255;
            //                var green = Math.random() * 255;
            //                var blue = Math.random() * 255;
            //                viewshedObj.VisibleAreaColor = sgworld.Creator.CreateColor(red, green, blue, 80);
            //                var red = Math.random() * 255;
            //                var green = Math.random() * 255;
            //                var blue = Math.random() * 255;
            //                viewshedObj.HiddenAreaColor = sgworld.Creator.CreateColor(red, green, blue, 80);
            viewshedObj.Attachment.AttachTo(dynamicObj.ID, 0, 0, 2);
        } catch (e) { }
    }
}
