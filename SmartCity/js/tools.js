var visualDynamic = null;
var toolurl = window.location.href;
var alltoolurl = toolurl.substring(0, toolurl.lastIndexOf("/") + 1);
//放大
function zoomin() {
    sgworld.Navigate.ZoomIn();
}
//时间
function timeProgress() {
    sgworld.Command.Execute(1065, 4);
}
//缩小
function zoomout() {
    sgworld.Navigate.ZoomOut();
}
var freePellucidityShow = true;
//透明度
function freePellucidity() {
    if (freePellucidityShow) {
        freePellucidityShow = false;
        var ScreenRectWidth = sgworld.Window.Rect.Width;
        var leftPosition = 0;
        if (ScreenRectWidth > 150) {
            leftPosition = (ScreenRectWidth - 150) / 2;
        }
        var areaPopup = sgworld.Creator.CreatePopupMessage("透明度", src + "tool/Slider.htm", leftPosition, 0, 158, 25);
        areaPopup.Flags = 512;
        areaPopup.AllowResize = false;
        areaPopup.ShowCaption = false;
        sgworld.Window.ShowPopup(areaPopup);
    }
    else {
        freePellucidityShow = true;
        sgworld.Window.RemovePopupByCaption("透明度");
    }
}


function search() {
    sgworld.Command.Execute(1086, 0);
}

//水平距离
function distance() {
    sgworld.Command.Execute(1034, 0);
}
//空间距离
function distance3D() {
    sgworld.Command.Execute(1035, 0);
}
//垂直距离
function vertical() {
    sgworld.Command.Execute(1036, 0);
}
function facade() {
    sgworld.Command.Execute(1037, 0);
}

//面积测量
function cover() {
    sgworld.Command.Execute(1165, 0);
}
//指北
function north() {
    sgworld.Command.Execute(1056, 0);
}
//旋转
function revolve() {
    sgworld.Command.Execute(1057, 0);
}
//地下模式
function subterranean() {
    if (sgworld.Navigate.UndergroundMode == true) {
        sgworld.Navigate.UndergroundMode = false;
    } else {
        sgworld.Navigate.UndergroundMode = true;
    }
}
//导出图片
function deriveImg() {
    sgworld.Window.GetSnapShot(false, 0, 0, "", 1);
//    var fso = new ActiveXObject("Scripting.FileSystemObject");
//    var f1 = fso.GetFile(imgfile);
//    f1.Move("C:\\" + imgfile.substring(imgfile.lastIndexOf("\\") + 1));
   // alert(imgfile);
}
//function rectangle() {

//}
//地下
function subterraneanPipe(Path) {
    try {
        allClean();
        AllInitialise();
    } catch (e) {
    }
    var InitialiseId = null;
    try {
        InitialiseId = sgworld.ProjectTree.FindItem(allPosition + "深圳\\深圳\\深圳地下管线");

        if (InitialiseId != 0) {
            sgworld.ProjectTree.SetVisibility(InitialiseId, true);
            try {
                showGroupId.push(InitialiseId);
            } catch (e)
        { }
        }
    } catch (e) {
    }
    try {
        InitialiseId = sgworld.ProjectTree.FindItem(allPosition + "深圳\\深圳\\地下浏览");
        if (InitialiseId != 0) {
            sgworld.ProjectTree.SetVisibility(InitialiseId, false);
        }
    } catch (e) {
    }
    sgworld.Navigate.UndergroundMode = true;
    sgworld.Terrain.Opacity = 0.1;
    var itemId = sgworld.ProjectTree.FindItem(Path);
    if (itemId != 0) {
        var obj = sgworld.ProjectTree.GetObject(itemId);
        sgworld.Navigate.FlyTo(obj, 14);
    }
}
//视点
function locationBrowse(Path, Code, showPath) {
    try {
        allClean();
        AllInitialise();
    } catch (e)
            { }
    try {
        if (showPath != "") {
            var showPathId = sgworld.ProjectTree.FindItem(showPath);

            if (showPathId != 0) {
                sgworld.ProjectTree.SetVisibility(showPathId, true);
                try {
                    showGroupId.push(showPathId);
                } catch (e)
               { }
            }
        }
    } catch (e) {
    }
    var itemId = sgworld.ProjectTree.FindItem(Path);
    if (itemId != 0) {
        try {
            var obj = sgworld.ProjectTree.GetObject(itemId);
            sgworld.Navigate.FlyTo(obj, Code);
        } catch (e)
        { }
    }
}

//倾斜摄影测量
function showAndFly(locPath, filePath) {
    try {
        allClean();
        AllInitialise();
    } catch (e) { 
    }
    try {
        var InitialiseId = sgworld.ProjectTree.FindItem(filePath);

        if (InitialiseId != 0) {
            sgworld.ProjectTree.SetVisibility(InitialiseId, true);
            try {
                showGroupId.push(InitialiseId);
            } catch (e)
        { }
        }
    } catch (e) {
    }
    var itemId = sgworld.ProjectTree.FindItem(locPath);
    if (itemId != 0) {
        var obj = sgworld.ProjectTree.GetObject(itemId);
        sgworld.Navigate.FlyTo(obj, 14);
    }
}


//function well(Path) {
//    try {
//        allClean();
//    } catch (e)
//            { }
//    var itemId = sgworld.ProjectTree.FindItem(Path);
//    if (itemId != 0) {
//        var iId = sgworld.ProjectTree.FindItem("地震\\地震");
//        var jId = sgworld.ProjectTree.FindItem("地震\\地质体");
//        var kId = sgworld.ProjectTree.FindItem("地震\\地质岩层");
//        if (jId != 0) {
//            sgworld.ProjectTree.SetVisibility(jId, false);
//        }
//        if (kId != 0) {
//            sgworld.ProjectTree.SetVisibility(kId, false);
//        }
//        if (iId != 0) {
//            var loc = sgworld.ProjectTree.GetObject(iId);
//            sgworld.Navigate.FlyTo(loc, 0);
//        }
//        var obj = sgworld.ProjectTree.GetVisibility(itemId);
//        if (obj != null) {
//            if (obj == 0) {
//                sgworld.ProjectTree.SetVisibility(itemId, true);
//            } else {
//                sgworld.ProjectTree.SetVisibility(itemId, false);
//            }
//        }
//    }
//}
//地质
function geology(locPath, filePath) {
    try {
        AllEventClean();
        CleanTint();
        variableClean();
        AllInitialise();
    } catch (e) { 
    }
    sgworld.Navigate.UndergroundMode = true;
    sgworld.Terrain.Opacity = 0.1;
    var fileId = sgworld.ProjectTree.FindItem(filePath);

    if (fileId != 0) {
        sgworld.ProjectTree.SetVisibility(fileId, true);
        try {
            showGroupId.push(fileId);
        } catch (e)
    { }
    }
    var itemId = sgworld.ProjectTree.FindItem(locPath);
    if (itemId != 0) {
        var obj = sgworld.ProjectTree.GetObject(itemId);
        sgworld.Navigate.FlyTo(obj, 14);
    }
}
//井筒
function myRockshaft(locPath, filePath) {
    try {
        AllEventClean();
        CleanTint();
        variableClean();
        AllInitialise();
    } catch (e) {
    }
    try {
        sgworld.Navigate.UndergroundMode = true;
        sgworld.Terrain.Opacity = 0.5;
        var earthquakeGroupId = sgworld.ProjectTree.FindItem(layerPosition + "地震");
        if (earthquakeGroupId != 0) {
            if (sgworld.ProjectTree.IsGroup(earthquakeGroupId)) {
                sgworld.ProjectTree.SetVisibility(earthquakeGroupId, false);
            }
        }
        var tempId = sgworld.ProjectTree.FindItem(layerPosition + "钻井");
        if (tempId != 0) {
            sgworld.ProjectTree.SetVisibility(tempId, false);
        }
        tempId = sgworld.ProjectTree.FindItem(layerPosition + "钻井\\Pump Jack");
        if (tempId != 0) {
            sgworld.ProjectTree.SetVisibility(tempId, true);
            showGroupId.push(tempId);
        }
        tempId = sgworld.ProjectTree.FindItem(layerPosition + "钻井\\Pump Jack2");
        if (tempId != 0) {
            sgworld.ProjectTree.SetVisibility(tempId, true);
            showGroupId.push(tempId);
        }

        var GroupId = sgworld.ProjectTree.FindItem(filePath);
        if (GroupId != 0) {
            sgworld.ProjectTree.SetVisibility(GroupId, true);
            try {
                showGroupId.push(GroupId);
            } catch (e)
        { }
        }
        var itemId = sgworld.ProjectTree.FindItem(locPath);
        if (itemId != 0) {
            var obj = sgworld.ProjectTree.GetObject(itemId);
            sgworld.Navigate.FlyTo(obj, 14);
        }
    } catch (e) {
    }

}
//地震
function earthquake(locPath, filePath) {
    try {
        AllEventClean();
        CleanTint();
        variableClean();
        AllInitialise();
    } catch (e) {
    }
    try {
        sgworld.Navigate.UndergroundMode = true;
        sgworld.Terrain.Opacity = 0.1;
        var earthquakeGroupId = sgworld.ProjectTree.FindItem(layerPosition+"地震");
        if (earthquakeGroupId != 0) {
            if (sgworld.ProjectTree.IsGroup(earthquakeGroupId)) {
                sgworld.ProjectTree.SetVisibility(earthquakeGroupId, false);
            }
        }
        var GroupId = sgworld.ProjectTree.FindItem(filePath);

        if (GroupId != 0) {
            sgworld.ProjectTree.SetVisibility(GroupId, true);
            try {
                showGroupId.push(GroupId);
            } catch (e)
        { }
        }
        var itemId = sgworld.ProjectTree.FindItem(locPath);
        if (itemId != 0) {
            var obj = sgworld.ProjectTree.GetObject(itemId);
            sgworld.Navigate.FlyTo(obj, 14);
        }
    } catch (e) {
    }
}
//地震模型
function earthquakeModel() {
    try {
        AllEventClean();
        CleanTint();
        variableClean();
        AllInitialise();
    } catch (e) {
    }
    try {
        sgworld.Navigate.UndergroundMode = true;
        sgworld.Terrain.Opacity = 0.1;
        var earthquakeGroupId = sgworld.ProjectTree.FindItem(layerPosition+"地震");
        if (earthquakeGroupId != 0) {
            if (sgworld.ProjectTree.IsGroup(earthquakeGroupId)) {
                sgworld.ProjectTree.SetVisibility(earthquakeGroupId, false);
            }
        }
        var GroupId = sgworld.ProjectTree.FindItem(layerPosition+"地震\\井筒");

        if (GroupId != 0) {
            sgworld.ProjectTree.SetVisibility(GroupId, true);
            try {
                showGroupId.push(GroupId);
            } catch (e) {
            }
        }
        var GroupId = sgworld.ProjectTree.FindItem(layerPosition+"地震\\dzt1");

        if (GroupId != 0) {
            sgworld.ProjectTree.SetVisibility(GroupId, true);
            try {
                showGroupId.push(GroupId);
            } catch (e)
        { }
        }
    var itemId = sgworld.ProjectTree.FindItem(layerPosition+"地震\\地震模型L");
        if (itemId != 0) {
            var obj = sgworld.ProjectTree.GetObject(itemId);
            sgworld.Navigate.FlyTo(obj, 0);
        }
    } catch (e) {
    }
}
//播放演示
function PresentationPlay(Path) {
/*  try {
    allClean();
    AllInitialise();
    } catch (e)
            { } */
	// try{
	// hideDiv();
	// } catch (e)
            // { }           
    var itemId = sgworld.ProjectTree.FindItem(Path);
    if (itemId != 0) {
        var obj = sgworld.ProjectTree.GetObject(itemId);
        if (obj.ObjectType == 34) {
            try {
                obj.Play(0);
            } catch (e)
            { }
        }
    }
}
function sgworld_PresentationStatusChanged(nowPresentationID,nowStatus) {
if(nowStatus == 1)
{
    var PresentationGroupId;
    try {
        PresentationGroupId = sgworld.ProjectTree.FindItem(allPosition + "大庆\\消防应急预案");// kit-1204okfi\\
        if (PresentationGroupId != 0) {
            sgworld.ProjectTree.SetVisibility(PresentationGroupId, false);
        }
    } catch (e) {
    }
    try {
        PresentationGroupId = sgworld.ProjectTree.FindItem(allPosition + "shiyou2-1layer\\家属区");
        if (PresentationGroupId != 0) {
            sgworld.ProjectTree.SetVisibility(PresentationGroupId, false);
        }
    } catch (e) {
    }
    try {
        PresentationGroupId = sgworld.ProjectTree.FindItem(allPosition + "shiyou2-1layer\\家属区\\建筑");
        if (PresentationGroupId != 0) {
            sgworld.ProjectTree.SetVisibility(PresentationGroupId, true);
        }
    } catch (e) {
    }
}
}
//播放演示
function newPresentationPlay(Path) {
    try {
        allClean();
        AllInitialise();
    } catch (e) { 
    }
    var itemId = sgworld.ProjectTree.FindItem(Path);
    if (itemId != 0) {
        var obj = sgworld.ProjectTree.GetObject(itemId);
        if (obj.ObjectType == 34) {
            try {
                obj.Play(0);
            } catch (e)
            { }
        }
    }
}


//飞到
function myflyto(Path) {
    try {
        allClean();
        AllInitialise();
    } catch (e) {
    }
    try {
        var GroupId = sgworld.ProjectTree.FindItem(allPosition + "深圳\\深圳\\建筑模型\\futianluwang");

        if (GroupId != 0) {
            sgworld.ProjectTree.SetVisibility(GroupId, true);
            try {
                showGroupId.push(GroupId);
            } catch (e)
        { }
        }
    } catch (e) {
    }
    try {
        GroupId = sgworld.ProjectTree.FindItem(allPosition + "深圳\\深圳\\地下浏览");

        if (GroupId != 0) {
            sgworld.ProjectTree.SetVisibility(GroupId, false);
            try {
                showGroupId = GroupId;
            } catch (e)
        { }
        }
    } catch (e) {
    }
    try {
        GroupId = sgworld.ProjectTree.FindItem(allPosition + "动态对象");

        if (GroupId != 0) {
            sgworld.ProjectTree.SetVisibility(GroupId, true);
            try {
                showGroupId.push(GroupId);
            } catch (e)
        { }
        }
    } catch (e) {
    }
    var itemId = sgworld.ProjectTree.FindItem(Path);

    if (itemId != 0) {
        try {
            sgworld.ProjectTree.SetVisibility(itemId, true);
            try {
                showGroupId.push(itemId);
            } catch (e)
    { }
        } catch (e) {
        }
        var obj = sgworld.ProjectTree.GetObject(itemId);
        sgworld.Navigate.FlyTo(itemId, 0);
    }
}

function selectVisual(code) {
    if (visualDynamic != null) {
        if (visualDynamic.ObjectType == 23) {
            //sgworld.ProjectTree.SelectItem(visualId);
            visualDynamic.RestartRoute(0);
            try {
                sgworld.Navigate.FlyTo(visualDynamic, code);
            } catch (e) { 
            
            }
        }
    }
}
//视角
function visual(code, Path) {
    try {
        allClean();
        AllInitialise();
    } catch (e)
            { }
            try {
                var GroupId = sgworld.ProjectTree.FindItem(allPosition + "深圳\\深圳\\建筑模型\\futianluwang");

                if (GroupId != 0) {
                    sgworld.ProjectTree.SetVisibility(GroupId, true);
                    try {
                        showGroupId.push(GroupId);
                    } catch (e)
        { }
                }
            } catch (e) {
            }
    try {
        GroupId = sgworld.ProjectTree.FindItem(allPosition + "深圳\\深圳\\地下浏览");
        if (InitialiseId != 0) {
            sgworld.ProjectTree.SetVisibility(GroupId, false);
        }
    } catch (e) {
    }
    try {
        GroupId = sgworld.ProjectTree.FindItem(allPosition + "动态对象");

        if (GroupId != 0) {
            sgworld.ProjectTree.SetVisibility(GroupId, true);
            try {
                showGroupId.push(GroupId);
            } catch (e) { }
        }
    } catch (e) {
    }
    var visualId = sgworld.ProjectTree.FindItem(Path);
    if (visualId) {
        var dynamic = sgworld.ProjectTree.GetObject(visualId);
        if (dynamic.ObjectType == 23) {
            visualDynamic = dynamic;
            //sgworld.ProjectTree.SelectItem(visualId);
            dynamic.RestartRoute(0);
            sgworld.Navigate.FlyTo(dynamic, code);
        }
    }
}
//透明度
function pellucidity() {
    try {
        allClean();
        AllInitialise();
    } catch (e) {
    }
    var GroupId = sgworld.ProjectTree.FindItem("管道\\管线数据\\管线");
    if (GroupId != 0) {
        sgworld.ProjectTree.SetVisibility(GroupId, true);
        try {
            showGroupId.push(GroupId);
        } catch (e) { }
    }
    var GroupId3 = sgworld.ProjectTree.FindItem("管道\\管线数据\\地形");
    if (GroupId3 != 0) {
        sgworld.ProjectTree.SetVisibility(GroupId3, false);
        try {
            showGroupId.push(GroupId3);
        } catch (e) { }
    }
    var GroupId2 = sgworld.ProjectTree.FindItem("管道\\管线数据\\管道");
    if (GroupId2 != 0) {
        sgworld.ProjectTree.SetVisibility(GroupId2, true);
        try {
            showGroupId.push(GroupId2);
        } catch (e) { }
    }

    var itemId = sgworld.ProjectTree.FindItem("管道\\半透明视点");
    if (itemId != 0) {
        var obj = sgworld.ProjectTree.GetObject(itemId);
        sgworld.Navigate.FlyTo(obj, 0);
    }
    sgworld.Navigate.UndergroundMode = true;
    sgworld.Terrain.Opacity = 0.5;
}
//点选查询
function clickSelect() {
    try {
        AllEventClean();
        CleanTint();
        variableClean();
    } catch (e)
            { }
    sgworld.AttachEvent("OnLButtonUp", select_OnLButtonUp);
    sgworld.AttachEvent("OnRButtonUp", select_OnRButtonUp);
    sgworld.Window.SetInputMode(1);
}

function tance() {
    sgworld.Command.Execute(1034, 0);
}
//挖填方分析
function volume() {
    try {
        allClean();
    } catch (e)
            { }
    creatorEarth();
    //sgworld.Command.Execute(1045, 0);
}
//剖面分析
function section() {
    sgworld.Command.Execute(1043, 0);
}
//通视分析
function intervisibility() {
    try {
        AllEventClean();
    } catch (e)
    { }
    try {
        var arrId = sgworld.ProjectTree.FindItem("分析工具");
        if (arrId == 0) {
            arrId = sgworld.ProjectTree.CreateGroup("分析工具");
        }
        sgworld.ProjectTree.SelectItem(arrId);
        sgworld.Command.Execute(1046, 0);
    } catch (e) {
    }
}
//视域分析
function ken() {
    try {
        AllEventClean();
    } catch (e)
    { }
    try {
        var arrId = sgworld.ProjectTree.FindItem("分析工具");
        if (arrId == 0) {
            arrId = sgworld.ProjectTree.CreateGroup("分析工具");
        }
        sgworld.ProjectTree.SelectItem(arrId);
        sgworld.Command.Execute(2117, 0);
    } catch (e) {
    }
}
//控高分析
function high() {
    try {
        allClean();
    } catch (e)
            { }
    sgworld.AttachEvent("OnLButtonUp", high_OnLButtonUp);
    sgworld.AttachEvent("OnRButtonUp", high_OnRButtonUp);
    sgworld.Window.SetInputMode(1);
}
//危险域分析
function danger() {
    try {
        AllEventClean();
    } catch (e)
    { }
    try {
        var arrId = sgworld.ProjectTree.FindItem("分析工具");
        if (arrId == 0) {
            arrId = sgworld.ProjectTree.CreateGroup("分析工具");
        }
        sgworld.ProjectTree.SelectItem(arrId);
        sgworld.Command.Execute(1048, 0);
    } catch (e) { 
    }
}
//等高线分析
function isohypse() {
    try {
        AllEventClean();
    } catch (e)
    { }
    var arrId = sgworld.ProjectTree.FindItem("分析工具");
    if (arrId == 0) {
        arrId = sgworld.ProjectTree.CreateGroup("分析工具");
    }
    sgworld.ProjectTree.SelectItem(arrId);
    sgworld.Command.Execute(1039, 0);
}
//阴影分析
function shadow() {
    sgworld.Command.Execute(2118, 0);
}
//淹没分析
function submerge() {
    try {
        AllEventClean();
    } catch (e)
    { }
    var arrId = sgworld.ProjectTree.FindItem("分析工具");
    if (arrId == 0) {
        arrId = sgworld.ProjectTree.CreateGroup("分析工具");
    }
    sgworld.ProjectTree.SelectItem(arrId);
    sgworld.Command.Execute(1044, 0);
}
//最短路径分析
function route() {
    try {
        AllEventClean();
    } catch (e)
    { }
    var arrId = sgworld.ProjectTree.FindItem("分析工具");
    if (arrId == 0) {
        arrId = sgworld.ProjectTree.CreateGroup("分析工具");
    }
    sgworld.ProjectTree.SelectItem(arrId);
    sgworld.Command.Execute(1042, 0);
}
//控高
function high_OnLButtonUp(Flags, X, Y) {
    var arrId = sgworld.ProjectTree.FindItem("分析工具");
    if (arrId == 0) {
        arrId = sgworld.ProjectTree.CreateGroup("分析工具");
    }
    var CursorCoord = sgworld.Window.PixelToWorld(X, Y);
    var high = 20;
    var posit = CursorCoord.Position.Copy();
    posit.Altitude = 0;
    posit.AltitudeType = 0;
    sgworld.Creator.CreateBox(posit, 1000, 1000, high, sgworld.Creator.CreateColor(155, 155, 155, 200), sgworld.Creator.CreateColor(155, 155, 155, 200), arrId, "temp");
    //document.getElementById("TerraExplorerInformationWindow").style.display = "none";
    return true;
}
function high_OnRButtonUp(Flags, X, Y) {
    var highBox = 0;
    for (var i = 0; ; i++) {
        highBox = sgworld.ProjectTree.FindItem("temp");
        if (highBox == 0) {
            break;
        }
        else {
            sgworld.ProjectTree.DeleteItem(highBox);
            highBox = 0;
        }
    }
    sgworld.DetachEvent("OnLButtonUp", high_OnLButtonUp);
    sgworld.DetachEvent("OnRButtonUp", high_OnRButtonUp);
    sgworld.Window.SetInputMode(0);
    return true;
}
//管道地上模式
function pipeoverground() {
    try {
        allClean();
        AllInitialise();
    } catch (e) {
    }
    var GroupId = sgworld.ProjectTree.FindItem(allPosition + "深圳\\深圳\\深圳地下管线");
    if (GroupId != 0) {
        sgworld.ProjectTree.SetVisibility(GroupId, true);
        try { showGroupId.push(GroupId); } catch (e) { }
    }
    var itemId = sgworld.ProjectTree.FindItem(allPosition + "定位点\\地下管线");
    if (itemId != 0) {
        var obj = sgworld.ProjectTree.GetObject(itemId);
        sgworld.Navigate.FlyTo(obj, 0);
    }
    sgworld.Navigate.UndergroundMode = true;
    sgworld.Terrain.Opacity = 0.1;
}
//管道地下模式
function pipeunderground() {
    try {
        allClean();
        AllInitialise();
    } catch (e) {
    }
    var GroupId = sgworld.ProjectTree.FindItem(allPosition + "深圳\\深圳\\深圳地下管线");
    
    if (GroupId != 0) {
        sgworld.ProjectTree.SetVisibility(GroupId, true);
        try { showGroupId.push(GroupId); } catch (e) { }
    }
    var itemId = sgworld.ProjectTree.FindItem(allPosition + "定位点\\地下管线");
    if (itemId != 0) {
        var obj = sgworld.ProjectTree.GetObject(itemId);
        sgworld.Navigate.FlyTo(obj, 0);
    }
    GroupId = sgworld.ProjectTree.FindItem(allPosition + "深圳\\深圳\\地下浏览");
    if (GroupId != 0) {
        sgworld.ProjectTree.SetVisibility(GroupId, false);
    }

    subterraneanPipe(allPosition + '定位点\\管线视点2');
    sgworld.Navigate.UndergroundMode = true;
    sgworld.Terrain.Opacity = 1;
    //sgworld.Navigate.UndergroundMode = true;
    // 
}
//属性查询
function allclickinformation() {

    sgworld.Command.Execute(1023, 0);
}

// zhaohe 2015-05-21
function hideLeftDivPanel() {
    window.parent.document.getElementById("leftTab").style.display = 'none';   
}

function removePopupByName(Caption) {
    try {
        sgworld.Window.RemovePopupByCaption(Caption);        
    } catch (e) { 
    }
}

function hideDiv() {
    try {
        removePopupByName("场景展示");
    } catch (e) {
    } try {
        removePopupByName("浏览");
    } catch (e) {
    } try {
        removePopupByName("地下地质");
    } catch (e) {
    } try {
        removePopupByName("地下管线");
    } catch (e) {
    } try {
        removePopupByName("应急预案");
    } catch (e) {
    } try {
        removePopupByName("工具箱");
    } catch (e) {
    } try {
        removePopupByName("图层管理");
    } catch (e) {
    }
}
//编辑预案
function my_EditPresentation(Path) {
    try {
        var EditId = sgworld.ProjectTree.FindItem(Path);
        if (EditId != 0) {
            sgworld.ProjectTree.SelectItem(EditId);
            sgworld.Command.Execute(1111, 0);
        }
    } catch (e) {
    }
}

function editObject(Path) {
    try {
        var editObjId = sgworld.ProjectTree.FindItem(Path);
        if (editObjId != "") {
            sgworld.ProjectTree.EditItem(editObjId, 0);
        }
    } catch (e)
    { }
}