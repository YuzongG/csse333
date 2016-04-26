var sql = require('mssql');
var config = {
    user: 'gaoy1',
    password: 'George321',
    server: 'titan.csse.rose-hulman.edu', // You can use 'localhost\\instance' to connect to named instance
    database: 'MitchGaoJim'

   
}

sql.connect(config).then(function() {
    // Query
    console.log(11);

   // Query 
    var request = new sql.Request();
    request.query(" delete from [User] where UserID = '12345678';", function(err, recordsets) {
    // ... error checks 
    console.log(err); // return 
});
    // ES6 Tagged template literals (experimental)

    //sql.query`select * from mytable where id = ${value}`.then(function(recordset) {
    //    console.dir(recordset);
    //}).catch(function(err) {
        // ... query error checks
    //});
}).catch(function(err) {
    // ... connect error checks
    console.log(1111);
});