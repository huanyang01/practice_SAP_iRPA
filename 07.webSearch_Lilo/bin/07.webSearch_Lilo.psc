<?xml version="1.0" encoding="utf-8"?>
<ConteXtorStudio Version="Desktop Studio 2.0.0.173" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="XsdStudio.xsd">
	<UpdatePackages />
	<Evolutions>
		<Evolution Version="1.0" Date="7/19/2020"><![CDATA[Project creation]]></Evolution>
		<Evolution Version="..." Date="..."><![CDATA[...]]></Evolution>
	</Evolutions>
	<PROCESSUS>
		<PROCESS Name="GLOBAL" Key="NoKey" Comment="Global Processus" CtxtId="b96ac3bc-e7d1-4b7b-87b2-a0c0fc0688c0">
			<_DECLAREVAR>
				<STRUCTUREDON Name="GLOBAL">
					<OBJDON Name="PrjVersion">1.0</OBJDON>
					<OBJDON Name="PrjClient"><![CDATA[SAP]]></OBJDON>
					<OBJDON Name="PrjName">07.webSearch_Lilo</OBJDON>
					<OBJDON Name="PrjDate">7/19/2020</OBJDON>
					<OBJDON Name="PrjLabel"><![CDATA[07.webSearch_Lilo]]></OBJDON>
					<OBJDON Name="PrjComment"><![CDATA[]]></OBJDON>
					<OBJDON Name="LicenceURL" />
					<STRUCTUREDON Name="Xc_MessBoxHtml">
						<OBJDON Name="Style">style="font-size:12pt;font-family:'Arial'"</OBJDON>
						<OBJDON Name="ErrColor">white</OBJDON>
						<OBJDON Name="InfoColor">white</OBJDON>
						<OBJDON Name="ChoiceColor">white</OBJDON>
						<OBJDON Name="WarningColor">white</OBJDON>
						<OBJDON Name="ErrIcon">Critical.gif</OBJDON>
						<OBJDON Name="InfoIcon">Info.gif</OBJDON>
						<OBJDON Name="ChoiceIcon">Pencil.gif</OBJDON>
						<OBJDON Name="WarningIcon">Warning.gif</OBJDON>
						<OBJDON Name="StyleButton">style="font-size:12px;font-family:'Arial';width:80px"</OBJDON>
						<OBJDON Name="StyleText">style="font-size=11pt;font-family='Arial'"</OBJDON>
						<OBJDON Name="IconSize">32</OBJDON>
					</STRUCTUREDON>
				</STRUCTUREDON>
			</_DECLAREVAR>
			<SCRIPTS>
				<SCRIPT Name="Constants" Src="07.webSearch_Lilo.min.js" Folder="Framework" />
			</SCRIPTS>
			<RESOURCES>
				<RESOURCE Name="popup" Src="%sdk%\templates\resources\popup\" Dest="popup" />
				<RESOURCE Name="agent16px" Src="%sdk%\templates\resources\bmp\agent.png" Dest="bmp" />
				<RESOURCE Name="accept16px" Src="%sdk%\templates\resources\bmp\accept.png" Dest="bmp" />
				<RESOURCE Name="cancel16px" Src="%sdk%\templates\resources\bmp\cancel.png" Dest="bmp" />
				<RESOURCE Name="help16px" Src="%sdk%\templates\resources\bmp\help.png" Dest="bmp" />
				<RESOURCE Name="information16px" Src="%sdk%\templates\resources\bmp\information.png" Dest="bmp" />
				<RESOURCE Name="repeat16px" Src="%sdk%\templates\resources\bmp\repeat.png" Dest="bmp" />
				<RESOURCE Name="stop16px" Src="%sdk%\templates\resources\bmp\stop.png" Dest="bmp" />
				<RESOURCE Name="warning16px" Src="%sdk%\templates\resources\bmp\warning.png" Dest="bmp" />
				<RESOURCE Name="record16px" Src="%sdk%\templates\resources\bmp\record.png" Dest="bmp" />
				<RESOURCE Name="agent32px" Src="%sdk%\templates\resources\bmp32\agent.png" Dest="bmp32" />
				<RESOURCE Name="accept32px" Src="%sdk%\templates\resources\bmp32\accept.png" Dest="bmp32" />
				<RESOURCE Name="cancel32px" Src="%sdk%\templates\resources\bmp32\cancel.png" Dest="bmp32" />
				<RESOURCE Name="help32px" Src="%sdk%\templates\resources\bmp32\help.png" Dest="bmp32" />
				<RESOURCE Name="information32px" Src="%sdk%\templates\resources\bmp32\information.png" Dest="bmp32" />
				<RESOURCE Name="user32px" Src="%sdk%\templates\resources\bmp32\user.png" Dest="bmp32" />
				<RESOURCE Name="warning32px" Src="%sdk%\templates\resources\bmp32\warning.png" Dest="bmp32" />
				<RESOURCE Name="agent64px" Src="%sdk%\templates\resources\bmp64\agent.png" Dest="bmp64" />
				<RESOURCE Name="hello64px" Src="%sdk%\templates\resources\bmp64\hello.png" Dest="bmp64" />
				<RESOURCE Name="hello128px" Src="%sdk%\templates\resources\bmp64\hello128.png" Dest="bmp64" />
				<RESOURCE Name="gif" Src="%sdk%\templates\resources\gif\" Dest="gif" />
			</RESOURCES>
			<_ECRANS />
			<WORKFLOWS>
				<WORKFLOW Name="scFindLilo" Src="%workflows%\scFindLilo.xaml" CtxtId="36c488b2-fff0-42ce-a1d4-cccf01d8cf2b" DisplayName="scFindLilo" StepTimeout="30" ScenarioTimeout="600" GeneratedScenarioName="scFindLilo" />
			</WORKFLOWS>
			<ACTIONS />
			<EVENTS />
			<SCENARII>
				<Steps />
			</SCENARII>
		</PROCESS>
		<PROCESS Name="POPUPS" CtxtId="cc441f61-f346-41c9-b99a-c25fb81ae6f4" Nature="POPUP">
			<SCRIPTS />
			<SCENARII />
			<ACTIONS />
			<EVENTS />
			<_DECLAREVAR>
				<STRUCTUREDON Name="POPUPS" />
			</_DECLAREVAR>
			<_ECRANS />
		</PROCESS>
	</PROCESSUS>
	<APPLICATIONS>
		<APPLI Name="appLilo" CtxtId="618aa707-086e-4a09-a625-24342347a514" Nature="WEB3" TechnoSDK="V3" Sync="250">
			<SCRIPTS />
			<CRITERE>
				<URL Scan="Full"><![CDATA[https://www.lilo.org/#]]></URL>
			</CRITERE>
			<_DECLAREVAR>
				<STRUCTUREDON Name="appLilo" />
			</_DECLAREVAR>
			<_ECRANS>
				<PAGE Name="pHome" Comment="Lilo.org Search Engine - France" CtxtId="ed2786be-b7e0-46dd-9f7b-bba713cab38b">
					<CRITERE>
						<URL Scan="Full"><![CDATA[https://www.lilo.org/#]]></URL>
					</CRITERE>
					<OBJETS>
						<OBJET Name="oQuery" CtxtId="4f5b2f9e-edc4-485f-9e60-4ecbebccb2a7" SpecIndex="1">
							<CRITERE>
								<TAG Name="INPUT" Scope="All" CapturedPos="1.R0R1R1R0R0R1R0R0R1R0">
									<ATT Name="name">
										<VALUE Scan="Full"><![CDATA[q]]></VALUE>
									</ATT>
								</TAG>
							</CRITERE>
						</OBJET>
						<OBJET Name="btSearch" CtxtId="502973c0-5aac-43b3-8178-50a9479ad2b6" SpecIndex="2">
							<CRITERE>
								<TAG Name="path" Scope="All" CapturedPos="1.R0R1R1R0R0R1R0R0R2R0R0R0">
									<ATT Name="id">
										<VALUE Scan="Full"><![CDATA[Shape]]></VALUE>
									</ATT>
								</TAG>
							</CRITERE>
						</OBJET>
					</OBJETS>
				</PAGE>
			</_ECRANS>
		</APPLI>
	</APPLICATIONS>
	<CONTEXT Id="119ead44-9ca5-491d-aaf4-8f6e3ada5156" />
</ConteXtorStudio>