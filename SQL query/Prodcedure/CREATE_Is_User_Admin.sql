Use MitchGaoJim
go

create proc [dbo].[Is_User_Admin] (@UserID int)
AS
IF @UserID = null OR @UserID<0
BEGIN
	PRINT(N'Invalid input for UserID')
	SELECT -1 as result --Invalid input
END

ELSE IF (NOT EXISTS (SELECT UserID FROM [User] WHERE @UserID=UserID))
BEGIN
	PRINT(@UserID)
	PRINT(N'UserID does not exist')
	SELECT -2 as result -- no matching found
END
ELSE
	BEGIN
	PRINT('')
	SELECT (SELECT IsAdmin FROM [user] WHERE @UserID=UserID) AS result
	END