# iRPA
Learn to use SAP iRPA


02.readOutlook_ExcelAttachment
2020.07.15
INT_RPA_STUDIO00P_11-80004527.MSI
Limitation: 
[1]:ctx.outlook.mail.searchByCriteria 只能读取 Inbox 中的邮件，Inbox中某个文件夹中的邮件，无法被读取
[2]:如果没有符合条件的邮件，后续仍会进行，未处理，会有异常
Open question: ctx.excel.initialize();
[1]:ctx.excel.initialize(); 有时候会抛错，找不到excel，create excel；错误不能稳定重现
[2]:Excel应用程序打开后，无法关闭；当前打开的Excel文件关闭了，但是Excel应用程序未关闭