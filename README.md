# iRPA
Learn to use SAP iRPA



01.readLocalConfigurationFile
-----------------------------------------------
2020.07.15
INT_RPA_STUDIO00P_11-80004527.MSI
读取 C:\SAP\rpa\Sample.config
根据其指定的Excel文件夹位置，打开 C:\SAP\rpa\Excel\Reminder0627.xlsx



02.readOutlook_ExcelAttachment
-----------------------------------------------
2020.07.15
INT_RPA_STUDIO00P_11-80004527.MSI
拷贝Reminder:开头的未读邮件，将其中的Excel附件拷贝到C:\SAP\rpa，并读取其中的内容

Limitation: 
[1] ctx.outlook.mail.searchByCriteria 只能读取 Inbox 中的邮件，Inbox中某个文件夹中的邮件，无法被读取
[2] 如果没有符合条件的邮件，后续仍会进行，未处理，会有异常

Open question: ctx.excel.initialize();
[1] ctx.excel.initialize(); 有时候会抛错，找不到excel，create excel；错误不能稳定重现
[2] Excel应用程序打开后，无法关闭；当前打开的Excel文件关闭了，但是Excel应用程序未关闭



03.readECCdata_writeExcel
-----------------------------------------------
2020.07.15
INT_RPA_STUDIO00P_11-80004527.MSI
在ECC中读取数据，将其填写到Excel文件中



04.use_credentials_variables
-----------------------------------------------
2020.07.15
INT_RPA_STUDIO00P_11-80004527.MSI
读取 Intelligent Robotic Process Automation Factory  中设置的 Credential 和 Variable

注：
[1] Factory  中设置的 Name 需要与 Studio 中 Declare credential / Declare setting 中的 Setting Name 一致
[2] Studio 中 Declare setting 的 Local (false) or server (true) storage 记得勾选
[3] Factory  中设置的 Environment 要与 Agent 中 选取的 Environment 一致

参见  
https://blogs.sap.com/2020/04/16/how-to-use-credentials-and-variables-with-cloud-factory-in-sap-intelligent-rpa/
https://www.youtube.com/watch?v=14WBpDyKrs8&feature=youtu.be