
//---------------------------------------------------
// Data Structures
//---------------------------------------------------
// ----------- rootData -------------------
ctx.dataManager({
	rootData :
	{
		ExcelFileName : ''
		, ExcelParameter : 
		{
			EndRow : ''
			, EndCol : ''
		}
		, ExtractedData : ''
	}
});
var rootData = ctx.dataManagers.rootData.create() ;

// ----------- rootData_ExcelParameter -------------------
ctx.dataManager({
	rootData_ExcelParameter :
	{
		EndRow : ''
		, EndCol : ''
	}
});
var rootData_ExcelParameter = ctx.dataManagers.rootData_ExcelParameter.create() ;


//---------------------------------------------------
// Settings Structure
//---------------------------------------------------

//---------------------------------------------------
// Functional Events Declaration
//---------------------------------------------------

//---------------------------------------------------
// 
//---------------------------------------------------
