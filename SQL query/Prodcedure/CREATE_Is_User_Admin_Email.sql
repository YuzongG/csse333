USE [MitchGaoJim]
GO
/****** Object:  StoredProcedure [dbo].[Is_User_Admin_Email]    Script Date: 5/4/2016 12:02:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*	Title: [Is_User_Admin_Email
**	@param: @Email varchar(60) - Email address.
**	Return: There is no return value but select 1 if admin, 0 if not.
**	Description: The procedure [Is_User_Admin_Email] function same as 
**			[Is_User_Admin] with changes in parameter from UserID -> Email
*/
CREATE proc [dbo].[Is_User_Admin_Email] (@Email varchar(60))
AS
----------------Checks if input is a valid email format-------------------------
IF @Email NOT LIKE '_%@__%.__%'
BEGIN
	PRINT(N'Invalid input for User email address')
	SELECT -1 as result --Invalid input
END
----------------Checks if input @Email exist in [User] table---------------------
ELSE IF (NOT EXISTS (SELECT Email FROM [User] WHERE @Email=Email))
BEGIN
	PRINT(@Email)
	PRINT(N'User email does not exist')
	SELECT -2 as result -- no matching found
END
-------If conditions fit, matching IsAdmin value will be selected as result-------
ELSE
	BEGIN
	PRINT('')
	SELECT (SELECT IsAdmin FROM [user] WHERE @Email=Email) AS result
END




-----This query can be optimized by combining 2nd and 3rd loops by directly search for match then return, if no match found, throw error/select -2