var bInEdit = false;
var gPolyObj = null;
var r = 8;
//var htmlurlfl = window.location.href;
//var allurlfl = htmlurl.substring(0, htmlurl.lastIndexOf("/") + 1);
//var redSphereModel = allurlfl + "model\\qiu.xpl2";

//var redPipeModel = allurlfl + "model\\1-4.xpl2";
var redSphereModel = "E:\\PipeWeb\\model\\qiu.xpl2";

var redPipeModel = "E:\\PipeWeb\\model\\1-4.xpl2";
var fId;
var flowLine = null;
var flowId;
var time;
function timer() {
    //allClean();
    AllInitialise();
    try {
       var InitialiseId = sgworld.ProjectTree.FindItem("深圳\\深圳\\地下浏览");
        if (InitialiseId != 0) {
            sgworld.ProjectTree.SetVisibility(InitialiseId, false);
        }
    } catch (e) {
    }
    fId = sgworld.ProjectTree.FindItem("管道流动");
    if (fId != 0) {
        try {
            sgworld.ProjectTree.DeleteItem(fId);
        } catch (e)
        { }
    }
    fId = sgworld.ProjectTree.CreateGroup("管道流动");
    sgworld.Terrain.Opacity = 0.1;
    var dynamicObj = sgworld.Creator.CreatePresentation(fId, "演示")
    dynamicObj.LoopRoute = false;
    dynamicObj.PlayAlgorithm = 1;
    dynamicObj.PlaySpeedFactor = 0;
    dynamicObj.PlayMode = 0;
    dynamicObj.CreateShowUndergroundModeStep(1, 0, "", true);
    //alert(fId);
        //var dynamicObj = sgworld.Creator.CreateDynamicObject(null, 2, 3, "", 1, 3, fId, "动态");
        var LineGeometryId = sgworld.ProjectTree.FindItem("流动管线\\管道");
        var LineGeometry = null;
        if (LineGeometryId != 0) {
            LineGeometry = sgworld.ProjectTree.GetObject(LineGeometryId);
            if (LineGeometry.ObjectType == 1) {
                if (LineGeometry != null) {
                    flowLine = LineGeometry.Geometry;
                    flowId = fId;
                    var previousPoint = null;
                    for (var i = 0; i < flowLine.Points.Count; i++) {
                        if (i < flowLine.Points.Count - 1) {
                            var flowPoint = flowLine.Points.Item(i);
                            var behindPoint = flowLine.Points.Item(i + 1);
                            var flowPosition = sgworld.Creator.CreatePosition(flowPoint.X, flowPoint.Y, flowPoint.Z);
                            var behindPosition = sgworld.Creator.CreatePosition(behindPoint.X, behindPoint.Y, behindPoint.Z);
                            flowPosition = flowPosition.AimTo(behindPosition);

                            flowPosition.Altitude = flowPosition.Altitude + 15;
                            flowPosition.Pitch = -45;
                            flowPosition.Distance = 30;
                            flowPosition.AltitudeType = 3;
                            previousPoint = flowPosition.Copy();
                            dynamicObj.CreateLocationStep(1, 0, "", flowPosition);
                            //var objRoute = sgworld.Creator.CreateRouteWaypoint(flowPosition.X, flowPosition.Y, flowPosition.Altitude, 1080, flowPosition.Yaw, flowPosition.Pitch, flowPosition.Roll, 0, 0, "");
                            //dynamicObj.Waypoints.AddWaypoint(objRoute);
                        }
                        if (i == flowLine.Points.Count - 1) {
                            var fPoint = flowLine.Points.Item(i);
                            previousPoint.X = fPoint.X;
                            previousPoint.Y = fPoint.Y;
                            previousPoint.Altitude = fPoint.Altitude;
                            previousPoint.Altitude = previousPoint.Altitude + 15;
                            previousPoint.Pitch = -45;
                            previousPoint.Distance = 30;
                            previousPoint.AltitudeType = 3;
                            //var objbehind = sgworld.Creator.CreateRouteWaypoint(fPoint.X, fPoint.Y, fPoint.Z, 1080, previousPoint.Yaw, previousPoint.Pitch, previousPoint.Roll, 0, 0, "");
                            //dynamicObj.Waypoints.AddWaypoint(objbehind);
                            dynamicObj.CreateLocationStep(1, 0, "", flowPosition);
                        }
                    }
//                    dynamicObj.Acceleration = 5;
//                    dynamicObj.CircularRoute = false;
//                    dynamicObj.Position.Distance = 50;
//                    dynamicObj.Action.Code = 10;
                    //                    dynamicObj.TurnSpeed = 36;
                    sgworld.Navigate.UndergroundMode = true;
                    //dynamicObj.Play(0);
                    //sgworld.Navigate.FlyTo(dynamicObj,14);
    bInEdit = true;
    time = setInterval("CreatorFlowModel()", 1);
               }
           }
      }
}
var drawModel = null;
var joinCount = 0;
var count = 0;
function CreatorFlowModel() {
    try {
        if (!bInEdit) {
            clearInterval(time);
        }
        if (drawModel != null) {
            if (drawModel.ScaleY < SegmentLength - 6) {
                drawModel.ScaleY += 6;
            }
            else {
                drawModel.ScaleY = SegmentLength;
                drawModel = null;
            }
        }
        else {
            var currCoord = null;
            var nextCoord = null;
            var lastCoord = null;
            var previous = null;
            var currently = null;
            var radius = r;
            if (count == 0) {
                previous = flowLine.Points.Item(count);
                currently = flowLine.Points.Item(count + 1);
                currCoord = sgworld.Creator.CreatePosition(previous.X, previous.Y, previous.Z, 3);
                nextCoord = sgworld.Creator.CreatePosition(currently.X, currently.Y, currently.Z, 3);
                currCoord = currCoord.AimTo(nextCoord);

                if (joinCount == 0) {
                    drawModel = sgworld.Creator.CreateModel(currCoord, redSphereModel, 1, 0, flowId, name);
                    drawModel.ScaleX = radius * 1.2;
                    drawModel.ScaleZ = radius * 1.2;
                    drawModel.ScaleY = radius * 1.2;
                    drawModel.Terrain.GroundObject = false;
                    drawModel = null;
                    joinCount++;
                }
                else {
                    if (joinCount == 1) {
                        SegmentLength = radius;
                        drawModel = sgworld.Creator.CreateModel(currCoord, redPipeModel, 1, 0, flowId, name);
                        drawModel.ScaleX = radius * 1.2;
                        drawModel.ScaleZ = radius * 1.2;
                        drawModel.ScaleY = 0;
                        drawModel.Terrain.GroundObject = false;
                        joinCount++;
                    }
                    else {
                        if (joinCount == 2) {
                            SegmentLength = radius * 0.6;
                            currCoord = currCoord.MoveToward(nextCoord, radius);
                            drawModel = sgworld.Creator.CreateModel(currCoord, redPipeModel, 1, 0, flowId, name);
                            drawModel.ScaleX = radius * 1.3;
                            drawModel.ScaleZ = radius * 1.3;
                            drawModel.ScaleY = 0;
                            drawModel.Terrain.GroundObject = false;
                            joinCount = 0;
                            count++;
                        }
                    }
                }
            }
            else {
                previous = flowLine.Points.Item(count - 1);
                currently = flowLine.Points.Item(count);
                currCoord = sgworld.Creator.CreatePosition(previous.X, previous.Y, previous.Z, 3);
                nextCoord = sgworld.Creator.CreatePosition(currently.X, currently.Y, currently.Z, 3);
                currCoord = currCoord.AimTo(nextCoord);
                if (currCoord != null && nextCoord != null) {
                    if (joinCount == 0) {
                        SegmentLength = currCoord.DistanceTo(nextCoord);
                        if (SegmentLength > (radius * 1.6 * 2)) {
                            currCoord = currCoord.MoveToward(nextCoord, (radius * 1.6));
                            SegmentLength = SegmentLength - (radius * 1.6 * 2);
                            drawModel = sgworld.Creator.CreateModel(currCoord, redPipeModel, 1, 0, flowId, name);
                            drawModel.ScaleX = radius * 1.1;
                            drawModel.ScaleZ = radius * 1.1;
                            drawModel.ScaleY = 0;
                            drawModel.Terrain.GroundObject = false;
                        }
                        joinCount++;

                    }
                    else {
                        if (joinCount == 1) {
                            SegmentLength = currCoord.DistanceTo(nextCoord);
                            if (SegmentLength < (radius * 1.6)) {
                                radius = SegmentLength / 1.6;
                            }
                            currCoord = currCoord.MoveToward(nextCoord, SegmentLength - (radius * 1.6));
                            SegmentLength = radius * 0.6;
                            drawModel = sgworld.Creator.CreateModel(currCoord, redPipeModel, 1, 0, flowId, name);
                            drawModel.ScaleX = radius * 1.3;
                            drawModel.ScaleZ = radius * 1.3;
                            drawModel.ScaleY = 0;
                            drawModel.Terrain.GroundObject = false;
                            joinCount++;

                        }
                        else {
                            if (joinCount == 2) {
                                SegmentLength = currCoord.DistanceTo(nextCoord);
                                if (SegmentLength < (radius * 1.6)) {
                                    radius = SegmentLength / 1.6;
                                }
                                currCoord = currCoord.MoveToward(nextCoord, SegmentLength - radius);
                                SegmentLength = radius;
                                drawModel = sgworld.Creator.CreateModel(currCoord, redPipeModel, 1, 0, flowId, name);
                                drawModel.ScaleX = radius * 1.2;
                                drawModel.ScaleZ = radius * 1.2;
                                drawModel.ScaleY = 0;
                                drawModel.Terrain.GroundObject = false;
                                joinCount++;
                            }
                            else {
                                if (joinCount == 3) {
                                    drawModel = sgworld.Creator.CreateModel(nextCoord, redSphereModel, 1, 0, flowId, name);
                                    drawModel.ScaleX = radius * 1.2;
                                    drawModel.ScaleZ = radius * 1.2;
                                    drawModel.ScaleY = radius * 1.2;
                                    drawModel.Terrain.GroundObject = false;
                                    drawModel = null;
                                    joinCount++;
                                    if (count == flowLine.Points.Count - 1) {
                                        joinCount = 0;
                                        count = 0;
                                        //alert("1");
                                        bInEdit = false;
                                        clearInterval(time);
                                    }
                                }
                                else {
                                    var lastPoint = flowLine.Points.Item(count + 1);
                                    lastCoord = sgworld.Creator.CreatePosition(lastPoint.X, lastPoint.Y, lastPoint.Z, 3);
                                    nextCoord = nextCoord.AimTo(lastCoord);
                                    if (lastCoord != null) {
                                        if (joinCount == 4) {
                                            SegmentLength = nextCoord.DistanceTo(lastCoord);
                                            if (SegmentLength < (radius * 1.6)) {
                                                radius = SegmentLength / 1.6;
                                            }
                                            SegmentLength = radius;
                                            drawModel = sgworld.Creator.CreateModel(nextCoord, redPipeModel, 1, 0, flowId, name);
                                            drawModel.ScaleX = radius * 1.2;
                                            drawModel.ScaleZ = radius * 1.2;
                                            drawModel.ScaleY = 0;
                                            drawModel.Terrain.GroundObject = false;
                                            joinCount++;
                                        }
                                        else {
                                            if (joinCount == 5) {
                                                SegmentLength = nextCoord.DistanceTo(lastCoord);
                                                if (SegmentLength < (radius * 1.6)) {
                                                    radius = SegmentLength / 1.6;
                                                }
                                                nextCoord = nextCoord.MoveToward(lastCoord, radius);
                                                SegmentLength = radius * 0.6;
                                                drawModel = sgworld.Creator.CreateModel(nextCoord, redPipeModel, 1, 0, flowId, name);
                                                drawModel.ScaleX = radius * 1.3;
                                                drawModel.ScaleZ = radius * 1.3;
                                                drawModel.ScaleY = 0;
                                                drawModel.Terrain.GroundObject = false;
                                                joinCount = 0;
                                                count++;
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
    }
    catch (e) {
        bInEdit = false;
        clearInterval(time);
    }
}
//          function CreateSGObj() {
//              var obj = document.getElementById("sgworld");
//              if (obj == null) {
//                  obj = document.createElement('object');
//                  document.body.appendChild(obj);
//                  obj.name = "sgworld";
//                  obj.id = "sgworld";
//                  obj.classid = "CLSID:3a4f9197-65a8-11d5-85c1-0001023952c1";
//              }
//              return obj;
//          }