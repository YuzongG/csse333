USE [MitchGaoJim]
GO

/****** Object:  StoredProcedure [dbo].[User_Verification]    Script Date: 4/30/2016 10:40:37 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/**Author: Seongjin Yoon
	Proc Name: User_Verification Proc 
		Verify if user information given is valid in User table.
**/
ALTER PROCEDURE [dbo].[User_Verification]
(@UserEmail varchar(60), @Password varchar(16))
AS
----check if e-mail is in appropriate format----
IF @UserEmail NOT LIKE '_%@__%.__%'
  BEGIN
  PRINT(N'Email Address has to follow _@__.__  format')
  SELECT -1 AS result
  END
------Check if Email address is in User table-------
ELSE IF @UserEmail<> All(SELECT [Email] FROM [User]) 
BEGIN
	PRINT (N'Invalid Email Address')
	SELECT -1 AS result
END
-------Check if password matches with e-mail address----
ELSE IF  @Password = (SELECT [Password] FROM [User] 
			WHERE @UserEmail = [Email])
BEGIN
	PRINT (N'Welcome '+@UserEmail+'!')
	SELECT 0 AS result
END
-------Print when password do not match UserEmail -------
ELSE
	PRINT (N'Invalid Password')
	SELECT 1 AS result
	RETURN 
GO


