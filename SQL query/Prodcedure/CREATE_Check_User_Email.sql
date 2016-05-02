use MitchGaoJim
go

CREATE PROC [dbo].[Check_User_Email](@UserEmail varchar(60))
AS
IF @UserEmail NOT LIKE '_%@__%.__%'
  BEGIN
  PRINT(N'Email Address has to follow __@_._  format.')
  SELECT -1 AS result
  END

ELSE IF @UserEmail= ANY(SELECT [Email] FROM [User])
BEGIN
	PRINT (N''+@UserEmail+' is already registered as an user')
	SELECT 1 AS result -- @UserEmail exist in database.
END
ELSE
BEGIN
	PRINT (N'Valid Email Address for new user.')
	SELECT 0 AS result -- @UserEmail passed is not in database
END