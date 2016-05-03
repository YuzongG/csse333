
DECLARE @html nvarchar(MAX);
EXEC spQueryToHtmlTable @html = @html OUTPUT,  @query = N'SELECT * FROM Place', @orderBy = N'ORDER BY PlaceID';

EXEC msdb.dbo.sp_send_dbmail
    @profile_name = 'Foo',
    @recipients = 'bar@baz.com;',
    @subject = 'HTML email',
    @body = @html,
    @body_format = 'HTML',
    @query_no_truncate = 1,
    @attach_query_result_as_file = 0;