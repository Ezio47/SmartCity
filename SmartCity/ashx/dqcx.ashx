<%@ WebHandler Language="C#" Class="dqcx" %>

using System;
using System.Web;
using System.Data;
using System.Data.OleDb;

public class dqcx : IHttpHandler {
        private const string StrKeyWord = @"select|insert|delete|from|count(|drop table|update|truncate|asc(|mid(|char(|xp_cmdshell|exec master|netlocalgroup administrators|:|net user|""|or|and";
        private const string StrRegex = @"-|;|,|/|(|)|[|]|}|{|%|@|*|!|'";
        public void ProcessRequest (HttpContext context) {
            string Path = HttpContext.Current.Server.MapPath("../access/dq.accdb");
            string ConStr = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source='" + Path + "';Persist Security Info=False";
            string NameStr = context.Request["sqlNameStr"];
            //"19";
            string reHtml = "";
            string[] tableName = new string[10] { "dm", "guandao", "jianzhu", "SCX1", "SCX2", "SCX3", "SCX4", "SCX5", "SCX6" ,"kong" };
            for (int i = 0; i < tableName.Length; i++)
            {
                string sqlStr = "select * from " + tableName[i] + " where name LIKE '%" + NameStr + "%'";
                OleDbConnection con = new OleDbConnection(ConStr);
                OleDbCommand comm = new OleDbCommand(sqlStr, con);
                //comm.Parameters.Add("@Str",NameStr);
                con.Open();
                DataSet ds = new DataSet();
                OleDbDataAdapter da = new OleDbDataAdapter(comm);
                da.Fill(ds);
                DataTable result = ds.Tables[0];
                con.Close();
                foreach (DataRow re in result.Rows)
                {
                    try
                    {
                        reHtml += "<a href='#' onclick='goToPosition(";
                        reHtml += Convert.ToDouble(re["worldX"]);
                        reHtml += ",";
                        reHtml += Convert.ToDouble(re["worldY"]);
                        reHtml += ",";
                        reHtml += Convert.ToDouble(re["worldZ"]);
                        reHtml += ");' >";
                        reHtml += re["name"].ToString();
                        reHtml += "</a><br/>";
                    }
                    catch (Exception e)
                    {
                    }

                }
            }
            if (reHtml == "")
            {
                reHtml = "没有查到数据！";
            }
        context.Response.ContentType = "text/plain";
        context.Response.Write(reHtml);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }
}