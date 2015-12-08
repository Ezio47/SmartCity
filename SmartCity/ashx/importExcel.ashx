<%@ WebHandler Language="C#" Class="importExcel" %>

using System;
using System.Data;
using System.Text;
using System.Web;
using 

public class importExcel : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        context.Response.Write("Hello World");
    }

    public string ReadExcelFromExcelFile()
    {
        StringBuilder str=new StringBuilder();
        string excelPath = "";
        DataTable dt = ExcelHelper.ReadFromExcelFile(excelPath);

        return str.ToString();
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}