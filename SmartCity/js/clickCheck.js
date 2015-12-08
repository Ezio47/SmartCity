//地震点击查属性
function clickCheckFun() {
    try {
        AllEventClean();
        CleanTint();
        variableClean();
        AllInitialise();
    }
    catch (e)
    { }
    sgworld.Navigate.UndergroundMode = true;
    sgworld.Terrain.Opacity = 0.1;
    var dzt = sgworld.ProjectTree.FindItem(layerPosition+"地震\\dzt1");
    if (dzt != 0) {
        try {
            sgworld.ProjectTree.SetVisibility(dzt, true);
        } catch (e) {
        }
    }
    var itemId = sgworld.ProjectTree.FindItem(layerPosition+"地震\\地震体L");
    if (itemId != 0) {
        var obj = sgworld.ProjectTree.GetObject(itemId);
        sgworld.Navigate.FlyTo(obj, 0);
    }
    sgworld.AttachEvent("OnLButtonUp", clickCheck_OnLButtonUp);
    sgworld.AttachEvent("OnRButtonUp", clickCheck_OnRButtonUp);
    sgworld.Window.SetInputMode(1);
}

function clickCheck_OnLButtonUp(Flags, X, Y) {
    var clickCheckModel = null;
    var CursorCoord = sgworld.Window.PixelToWorld(X, Y);
    var clickPopup;
    var clickGroupId = sgworld.ProjectTree.FindItem("选中网格");
    if (clickGroupId != "") {
        sgworld.ProjectTree.DeleteItem(clickGroupId);
    }
    clickGroupId = sgworld.ProjectTree.CreateGroup("选中网格");
    if (CursorCoord.Type == 1) {
        clickCheckModel = sgworld.Creator.GetObject(CursorCoord.ObjectID);
        var parentId = sgworld.ProjectTree.GetNextItem(clickCheckModel.ID, 15);
        var parentId = sgworld.ProjectTree.GetNextItem(parentId, 15);
        var parentName = null;
        if (parentId != "") {
            parentName = sgworld.ProjectTree.GetItemName(parentId);
        }
        if (clickCheckModel.TreeItem.Name == "dzt1" || parentName == layerPosition+"地震") {
            CursorCoord.Position.AltitudeType = 3;
            var worldCoord = CursorCoord.Position.Copy();
            worldCoord.AltitudeType = 3;
            worldCoord.Altitude = worldCoord.Altitude + 20;
            var checkBox = sgworld.Creator.CreateBox(worldCoord, 20, 20, 20, sgworld.Creator.CreateColor(155, 155, 155, 155), sgworld.Creator.CreateColor(115, 90, 36, 255), clickGroupId);

            var xianhao = 36 + (36 - Math.floor(Math.random() * 72));
            var daohao = 1179 + (1179 - Math.floor(Math.random() * 2358));
            var caiyang = 307 + (307 - Math.floor(Math.random() * 614));
            var boxtext = "地震数据\r\n线号：" + xianhao + "\r\n道号：" + daohao + "\r\n采样点数：" + caiyang + "\r\n坐标X:" + worldCoord.X + "\r\n坐标Y:" + worldCoord.Y;
            //   Math.floor(Math.random() * 10);
            var textCoord = worldCoord.Copy();
            textCoord.Altitude = textCoord.Altitude + 100;
            checkBox.Tooltip.Text = boxtext;

            

            var clickLine = sgworld.Creator.GeometryCreator.CreateLineStringGeometry([CursorCoord.Position.X, CursorCoord.Position.Y, CursorCoord.Position.Altitude, worldCoord.X, worldCoord.Y, worldCoord.Altitude]);
            var checkLine = sgworld.Creator.CreatePolyline(clickLine, sgworld.Creator.CreateColor(255, 255, 255, 255), 3, clickGroupId, "temp");
            checkLine.LineStyle.Width = -1;
//            var checkTextId = sgworld.ProjectTree.FindItem(layerPosition+"地震\\地震属性\\属性");
//            if (checkTextId != 0) {
//                try {
//                    sgworld.ProjectTree.SetVisibility(checkTextId, true);
//                    var checkText = sgworld.Creator.GetObject(checkTextId);
//                    checkText.Position = worldCoord;
//                    checkText.Position.Altitude = checkText.Position.Altitude + 30;
//                } catch (e) { 
//                }
//            }

        }
    }
    return true;
}
function clickCheck_OnRButtonUp(Flags, X, Y) {
    var checkText = sgworld.ProjectTree.FindItem(layerPosition+"地震\\地震属性\\属性");
    if (checkText != 0) {
        try {
            sgworld.ProjectTree.SetVisibility(checkText, false);
        } catch (e) { 
        }
    }
    AllEventClean();
    CleanTint();
    variableClean();

    sgworld.DetachEvent("OnLButtonUp", clickCheck_OnLButtonUp);
    sgworld.DetachEvent("OnRButtonUp", clickCheck_OnRButtonUp);
    sgworld.Window.SetInputMode(0);
    return true;
}
