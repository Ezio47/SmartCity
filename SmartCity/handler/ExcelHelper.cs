using System;
using System.IO;
using System.Text;
using System.Data;
using System.Reflection;
using System.Diagnostics;
using System.Collections;
using Microsoft.Office.Interop;
using System.Data.OleDb;
using NPOI.SS.UserModel;
using NPOI.HSSF.UserModel;
using NPOI.XSSF.UserModel;
using System.Windows.Forms;
using Microsoft.Office.Interop.Excel;
using TestProject.UC_Control;
using System.Text.RegularExpressions;
//导出读取Excel
namespace TestProject
{

    public class ExcelHelper
    {
        #region 成员变量
        private string templetFile = null;
        private string outputFile = null;
        private object missing = Missing.Value;
        private DateTime beforeTime;   //Excel启动之前时间
        private DateTime afterTime;    //Excel启动之后时间
        Microsoft.Office.Interop.Excel.Application app;
        Microsoft.Office.Interop.Excel.Workbook workBook;
        Microsoft.Office.Interop.Excel.Worksheet workSheet;
        Microsoft.Office.Interop.Excel.Range range;
        Microsoft.Office.Interop.Excel.Range range1;
        Microsoft.Office.Interop.Excel.Range range2;
        Microsoft.Office.Interop.Excel.TextBox textBox;
        private int sheetCount = 1;   //WorkSheet数量
        private string sheetPrefixName = "页";
        PopBox p = new PopBox("");
        #endregion

        #region 公共属性
        /// <summary>
        /// WorkSheet前缀名，比如：前缀名为“页”，那么WorkSheet名称依次为“页-1，页-2...”
        /// </summary>
        public string SheetPrefixName
        {
            set { this.sheetPrefixName = value; }
        }

        /// <summary>
        /// WorkSheet数量
        /// </summary>
        public int WorkSheetCount
        {
            get { return workBook.Sheets.Count; }
        }

        /// <summary>
        /// Excel模板文件路径
        /// </summary>
        public string TempletFilePath
        {
            set { this.templetFile = value; }
        }

        /// <summary>
        /// 输出Excel文件路径
        /// </summary>
        public string OutputFilePath
        {
            set { this.outputFile = value; }
        }
        #endregion


        #region ExcelHelper构造函数
        /// <summary>
        /// 构造函数，将一个已有Excel工作簿作为模板，并指定输出路径
        /// </summary>
        /// <param name="templetFilePath">Excel模板文件路径</param>
        /// <param name="outputFilePath">输出Excel文件路径</param>
        public ExcelHelper(string templetFilePath, string outputFilePath)
        {
            if (templetFilePath == null)
                throw new Exception("Excel模板文件路径不能为空！");


            if (outputFilePath == null)
                throw new Exception("输出Excel文件路径不能为空！");

            if (!File.Exists(templetFilePath))
                throw new Exception("指定路径的Excel模板文件不存在！");

            this.templetFile = templetFilePath;
            this.outputFile = outputFilePath;

            //创建一个Application对象并使其可见
            beforeTime = DateTime.Now;
            app = new Microsoft.Office.Interop.Excel.ApplicationClass();
            app.Visible = true;
            afterTime = DateTime.Now;

            //打开模板文件，得到WorkBook对象
            workBook = app.Workbooks.Open(templetFile, missing, missing, missing, missing, missing,
                missing, missing, missing, missing, missing, missing, missing);

            //得到WorkSheet对象
            workSheet = (Microsoft.Office.Interop.Excel.Worksheet)workBook.Sheets.get_Item(1);

        }

        /// <summary>
        /// 构造函数，打开一个已有的工作簿
        /// </summary>
        /// <param name="fileName">Excel文件名</param>
        public ExcelHelper(string fileName)
        {
            if (!File.Exists(fileName))
                throw new Exception("指定路径的Excel文件不存在！");

            //创建一个Application对象并使其可见
            beforeTime = DateTime.Now;
            app = new Microsoft.Office.Interop.Excel.ApplicationClass();
            app.Visible = false;
            afterTime = DateTime.Now;

            //打开一个WorkBook
            workBook = app.Workbooks.Open(fileName,
                Type.Missing, Type.Missing, Type.Missing, Type.Missing,
                Type.Missing, Type.Missing, Type.Missing, Type.Missing,
                Type.Missing, Type.Missing, Type.Missing, Type.Missing);

            //得到WorkSheet对象
            workSheet = (Microsoft.Office.Interop.Excel.Worksheet)workBook.Sheets.get_Item(1);

        }

        /// <summary>
        /// 构造函数，新建一个工作簿
        /// </summary>
        public ExcelHelper()
        {
            //创建一个Application对象并使其可见
            beforeTime = DateTime.Now;
            app = new Microsoft.Office.Interop.Excel.ApplicationClass();
            //app.Visible = true; 不自动打开
            afterTime = DateTime.Now;

            //新建一个WorkBook
            workBook = app.Workbooks.Add(Type.Missing);

            //得到WorkSheet对象
            workSheet = (Microsoft.Office.Interop.Excel.Worksheet)workBook.Sheets.get_Item(1);

        }
        #endregion

        #region 公共方法
        /// <summary>
        /// 将DataTable数据写入Excel文件（不分页）
        /// </summary>
        /// <param name="dt">DataTable</param>
        /// <param name="top">表格数据起始行索引</param>
        /// <param name="left">表格数据起始列索引</param>
        public void DataTableToExcel(System.Data.DataTable dt, int top, int left)
        {
            int rowCount = dt.Rows.Count;  //DataTable行数
            int colCount = dt.Columns.Count; //DataTable列数

            //利用二维数组批量写入
            string[,] arr = new string[rowCount + 1, colCount + 1];
            for (int i = 0; i < colCount; i++)
            {
                arr[0, i] = dt.Columns[i].ColumnName.ToString();
            }

            for (int j = 0; j < rowCount; j++)
            {
                for (int k = 0; k < colCount; k++)
                {
                    arr[j + 1, k] = dt.Rows[j][k].ToString();
                }
            }

            range = (Microsoft.Office.Interop.Excel.Range)workSheet.Cells[top, left];
            range = range.get_Resize(rowCount + 1, colCount + 1);
            range.Value = arr;
        }
        /// <summary>
        /// 读取execl文件，以第一列为列名字不需转化时间格式
        /// </summary>
        /// <param name="filePath">路径</param>
        /// <returns></returns>
        public static System.Data.DataTable ReadExcelFile(string filePath)
        {
            System.Data.DataTable dt = new System.Data.DataTable();
            IWorkbook wk = null;
            string extension = System.IO.Path.GetExtension(filePath);
            try
            {
                FileStream fs = File.OpenRead(filePath);
                //把xls文件中的数据写入wk中
                if (extension.Equals(".xls"))
                {
                    //把xls文件中的数据写入wk中
                    wk = new HSSFWorkbook(fs);
                }
                else
                {
                    //把xlsx文件中的数据写入wk中
                    wk = new XSSFWorkbook(fs);
                }
                fs.Close();
                fs.Dispose();
                //读取当前表数据
                ISheet sheet = wk.GetSheetAt(0);
                IRow row = sheet.GetRow(0);  //读取当前行数据
                //LastRowNum 是当前表的总行数-1（注意）
                for (int i = 0; i <= sheet.LastRowNum; i++)
                {
                    row = sheet.GetRow(i);  //读取当前行数据
                    if (row != null)
                    {
                        //LastCellNum 是当前行的总列数
                        if (i != 0)
                        {
                            ICell cell2 = row.GetCell(0);
                            if (cell2 != null && cell2.ToString() != "")
                            {
                                DataRow dr = dt.NewRow();
                                for (int j = 0; j < row.LastCellNum; j++)
                                {
                                    ICell cell = row.GetCell(j);
                                    string value = string.Empty;
                                    if (cell != null)
                                    {
                                        value = cell.ToString();
                                    }
                                    dr[j] = value;
                                }
                                dt.Rows.Add(dr);
                            }
                        }
                        else
                        {
                            for (int j = 0; j < row.LastCellNum; j++)
                            {
                                string value = row.GetCell(j).ToString();
                                //读取该行的第j列数据
                                if (string.IsNullOrEmpty(value))
                                {
                                    continue;
                                }
                                dt.Columns.Add(value);
                            }
                        }
                    }
                }
            }

            catch (Exception e)
            {
                MessageBox.Show("格式不正确!");
                //只在Debug模式下才输出
                return null;
            }
            return dt;
        }
        /// <summary>
        /// 读取execl文件，以第一列为列名字
        /// </summary>
        /// <param name="filePath">路径</param>
        /// <returns></returns>
        public static System.Data.DataTable ReadFromExcelFile(string filePath)
        {
            System.Data.DataTable dt = new System.Data.DataTable();
            IWorkbook wk = null;
            string extension = System.IO.Path.GetExtension(filePath);
            try
            {
                FileStream fs = File.OpenRead(filePath);
                if (extension.Equals(".xls"))
                {
                    //把xls文件中的数据写入wk中
                    wk = new HSSFWorkbook(fs);
                }
                else
                {
                    //把xlsx文件中的数据写入wk中
                    wk = new XSSFWorkbook(fs);
                }

                fs.Close();
                fs.Dispose();
                //读取当前表数据
                ISheet sheet = wk.GetSheetAt(0);
                IRow row = sheet.GetRow(0);  //读取当前行数据
                //LastRowNum 是当前表的总行数-1（注意）
                for (int i = 0; i <= sheet.LastRowNum; i++)
                {
                    row = sheet.GetRow(i);  //读取当前行数据
                    if (row != null)
                    {
                        //LastCellNum 是当前行的总列数
                        if (i != 0)
                        {
                            ICell cell2 = row.GetCell(0);
                            if (cell2 != null && cell2.ToString() != "")
                            {
                                DataRow dr = dt.NewRow();
                                for (int j = 0; j < row.LastCellNum; j++)
                                {
                                    ICell cell = row.GetCell(j);
                                    string value = string.Empty;
                                    if (cell != null)
                                    {
                                        value = cell.ToString();
                                        if (value != "" && j == 2)//时间转换
                                        {
                                            if (value.Length < 15)
                                            {
                                                if (cell.DateCellValue.Second == 59)
                                                {
                                                    value = cell.DateCellValue.AddSeconds(1).ToString();
                                                }
                                                else
                                                {
                                                    value = cell.DateCellValue.ToString();
                                                }
                                            }
                                            else
                                            {
                                                value = DateTime.Parse(value).ToString("yyyy/MM/dd HH:mm");
                                            }
                                        }
                                    }
                                    dr[j] = value;
                                }
                                dt.Rows.Add(dr);
                            }
                        }
                        else
                        {
                            for (int j = 0; j < row.LastCellNum; j++)
                            {
                                string value = row.GetCell(j).ToString();
                                //读取该行的第j列数据
                                if (string.IsNullOrEmpty(value))
                                {
                                    continue;
                                }
                                dt.Columns.Add(value);
                            }
                        }
                    }
                }
            }

            catch (Exception e)
            {
                MessageBox.Show("格式不正确!");
                
                //只在Debug模式下才输出
                return null;
            }
            return dt;
        }
        /// <summary>
        /// 将二维数组数据写入Excel文件（不分页）
        /// </summary>
        /// <param name="arr">二维数组</param>
        /// <param name="top">行索引</param>
        /// <param name="left">列索引</param>
        public void ArrayToExcel(string[,] arr, int top, int left, float val_fontSize)
        {
            int rowCount = arr.GetLength(0);  //二维数组行数（一维长度）
            int colCount = arr.GetLength(1); //二维数据列数（二维长度）

            range = (Microsoft.Office.Interop.Excel.Range)workSheet.Cells[top, left];
            range = range.get_Resize(rowCount, colCount);
            range.Borders.LineStyle = Microsoft.Office.Interop.Excel.XlLineStyle.xlContinuous; ;
            range.Font.Size = val_fontSize;
            range.Font.Bold = true;
            range.HorizontalAlignment = XlHAlign.xlHAlignCenter;//居中
            range.FormulaArray = arr;

        }

        /// <summary>
        /// 合并单元格
        /// </summary>
        /// <param name="x1">行号</param>
        /// <param name="y1">列号</param>
        /// <param name="x2">行号</param>
        /// <param name="y2">列号</param>
        public void MerMergeCells(int x1, int y1, int x2, int y2)
        {
            workSheet.Range[workSheet.Cells[x1, y1], workSheet.Cells[x2, y2]].Merge();
        }
        #endregion

        /// <summary>
        /// 保存文件
        /// </summary>
        public void SaveFile()
        {
            try
            {
                workBook.Save();
            }
            catch (Exception e)
            {
                p.BindLoad(e.Message);
                p.ShowDialog();
                throw e;
            }
            finally
            {
                this.Dispose();
            }
        }

        /// <summary>
        /// 另存文件
        /// </summary>
        public void SaveAsFile()
        {
            if (this.outputFile == null)
                throw new Exception("没有指定输出文件路径！");

            try
            {
                workBook.SaveAs(outputFile, missing, missing, missing, missing, missing, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, missing, missing, missing, missing);
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message);
                throw e;
            }
            finally
            {
                this.Dispose();
            }
        }

        /// <summary>
        /// 结束Excel进程
        /// </summary>
        public void KillExcelProcess()
        {
            Process[] myProcesses;
            DateTime startTime;
            myProcesses = Process.GetProcessesByName("Excel");

            //得不到Excel进程ID，暂时只能判断进程启动时间
            foreach (Process myProcess in myProcesses)
            {
                startTime = myProcess.StartTime;

                if (startTime > beforeTime && startTime < afterTime)
                {
                    myProcess.Kill();
                }
            }
        }
        private void Dispose()
        {
            workBook.Close(null, null, null);
            app.Workbooks.Close();
            app.Quit();

            if (range != null)
            {
                System.Runtime.InteropServices.Marshal.ReleaseComObject(range);
                range = null;
            }
            if (range1 != null)
            {
                System.Runtime.InteropServices.Marshal.ReleaseComObject(range1);
                range1 = null;
            }
            if (range2 != null)
            {
                System.Runtime.InteropServices.Marshal.ReleaseComObject(range2);
                range2 = null;
            }
            if (textBox != null)
            {
                System.Runtime.InteropServices.Marshal.ReleaseComObject(textBox);
                textBox = null;
            }
            if (workSheet != null)
            {
                System.Runtime.InteropServices.Marshal.ReleaseComObject(workSheet);
                workSheet = null;
            }
            if (workBook != null)
            {
                System.Runtime.InteropServices.Marshal.ReleaseComObject(workBook);
                workBook = null;
            }
            if (app != null)
            {
                System.Runtime.InteropServices.Marshal.ReleaseComObject(app);
                app = null;
            }

            GC.Collect();

            this.KillExcelProcess();

        }//end Dispose



    }//end class

}