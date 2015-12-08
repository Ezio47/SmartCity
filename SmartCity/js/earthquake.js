    var dza = null;
    var dzaobj = null;
    var dzaobjPosition = null;
    var status;
    var direction
    function earthquakemovement(Type) {
        allClean();
        AllInitialise();
        stopMovement();
        sgworld.Navigate.UndergroundMode = true;
        sgworld.Terrain.Opacity = 0.1;
        var fileId = sgworld.ProjectTree.FindItem("地震\\地质岩层");
        if (fileId != 0) {
            sgworld.ProjectTree.SetVisibility(fileId, true);
        }
        fileId = sgworld.ProjectTree.FindItem("地震\\dzt1");
        if (fileId != 0) {
            sgworld.ProjectTree.SetVisibility(fileId, true);
        }
        var itemId = sgworld.ProjectTree.FindItem("地震\\地震模型L");
        if (itemId != 0) {
            var obj = sgworld.ProjectTree.GetObject(itemId);
            sgworld.Navigate.FlyTo(obj, 0);
        }
        dza = sgworld.ProjectTree.FindItem("地震\\地质岩层\\dzt6");
        if (dza != 0) {
            dzaobj = sgworld.ProjectTree.GetObject(dza);
            dzaobjPosition = dzaobj.Position.Copy();
        }
        if (Type == 1) {
            status = setInterval("movementX()", 500);
        }
        if (Type == 2) {
            status = setInterval("movementY()", 500);
        }
        if (Type == 3) {
            status = setInterval("movementZ()", 500);
        }


    }
    //clearInterval(time);
    function stopMovement() {
        try {
            if (dzaobj != null) {
                try {
                    dzaobj.Position = dzaobjPosition;
                } catch (e) {
                }
            }
            clearInterval(status);
        } catch (e)
        { }
    }
    function movementX() {
        if (dzaobj != null) {
            try {
                dzaobj.Position.X = dzaobjPosition.X + ((0.5 - Math.random()) / 100000);
            } catch (e) { 
            }
        }
    }
    function movementY() {
        if (dzaobj != null) {
            try {
                dzaobj.Position.Y = dzaobjPosition.Y + ((0.5 - Math.random()) / 100000);
            } catch (e) {
            }
        }
    }
    function movementZ() {
        if (dzaobj != null) {
            try {
                dzaobj.Position.Altitude = dzaobjPosition.Altitude + ((0.5 - Math.random()) / 5);
            } catch (e) {
            }
        }
    }