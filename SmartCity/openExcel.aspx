<%@ Page Language="C#" AutoEventWireup="true" CodeFile="openExcel.aspx.cs" Inherits="openExcel" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>数据导入</title>
</head>
<body>
    <form id="form1" runat="server">
     <div id="MainArea" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0;">
        <table align="center" style="margin-left: 15%; line-height: 20px; margin-top: 15%">
            <tr>
                <td>
                    <asp:FileUpload ID="FileExcel" CssClass="normalbutton" runat="server"></asp:FileUpload>
                    <a href="../Upload/Excel/模板导出.xlsx" style="text-decoration: none"><span class="normalbutton">
                            模板下载</span></a>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <asp:Button ID="Submit" Style="margin-top: 8%" runat="server" CssClass="normalbutton"
                        Text=" 确 认 " OnClick="Submit_Click" OnClientClick="return confirm('导入列表将会覆盖当前系统中的已有值班成果，是否导入?')" />&nbsp;&nbsp;&nbsp;&nbsp;
                    <asp:Button ID="False" runat="server" CssClass="normalbutton" Text=" 取 消 " OnClientClick="GuanBi();" />
                </td>
            </tr>
            <tr>
                <td align="center">
                    <%--<h3 align="center" style="margin-top: 5%">
                        </h3>--%>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
