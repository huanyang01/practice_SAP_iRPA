# iRPA
Learn to use SAP iRPA



00.hello world
-----------------------------------------------
2020.07.18
INT_RPA_STUDIO00P_11-80004527.MSI
读取 C:\SAP\rpa\Sample.config
弹窗显示 Hello World

参见
https://help.sap.com/viewer/515fae5c9d04482d98c8fa9138975328/Cloud/en-US/eb62a00fd911425cb9bfc450d0c597b4.html
https://www.youtube.com/watch?v=ai21r8daOg0 



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



05.use_flow_loop
-----------------------------------------------
2020.07.18
INT_RPA_STUDIO00P_11-80004527.MSI
使用 loop 进行循环处理

注：
[1] 先添加 start loop，紧跟着设置 exit loop 并在其中设置循环结束的条件，然后是循环体，最后是 loop to start
[2] exit loop 中通常用一个变量进行循环退出的判断，这个变量通常在 loop to start 中进行 ++ 或 --

Open question: log
    循环退出时，为何是以下的顺序
    12:39:25.855 Log: Start --- Step: Exit_loop
    12:39:25.880 Log: Start --- Step: Loops_to_the_start_bl
    12:39:25.911 Log: End --- Step: Loops_to_the_start_bl
    12:39:25.914 Log: End --- Step: Start_loop
    12:39:25.920 Log: End --- Step: Exit_loop
    12:39:25.928 Log: End --- Step: Start_loop
    12:39:25.934 Log: End --- Step: Exit_loop
    12:39:25.942 Log: End --- Step: Start_loop
    12:39:25.949 Log: End --- Step: Exit_loop
    12:39:25.955 Log: End --- Step: Start_loop
    12:39:25.961 Log: End --- Step: Exit_loop
    12:39:25.968 Log: End --- Step: Start_loop
    12:39:25.975 Log: Index value is: -1



06.calculator
-----------------------------------------------
2020.07.18
INT_RPA_STUDIO00P_11-80004527.MSI

注：
[1] Select the Screenshot radio button in the Capture mode area
[2] In the properties of application, enter calc.exe as the launch path to finalize.
[3] In the Parameters window, set the Refresh Mode to Polling.
    Refresh Mode
    Sets the way page recognition is refreshed
    - No: no refresh needed
    - Window: refresh on WINDOWOPENED event notification
    - Polling: refresh by polling
[4] Don't forget to add calc.exe to the properties in the page. (经测试，在application层面设置了calc.exe，就不需要在page中设置)
[5] In the Activities window, find the Wait Exist activity under Item - Wait and drag and drop it to button 4. （否则，界面还没出来，点击事件捕获不到控件，将失效）

参见
https://help.sap.com/viewer/515fae5c9d04482d98c8fa9138975328/Cloud/en-US/90c6ba59a0a843a89a073df65360e3b7.html
