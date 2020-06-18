const connStr = "Server=SP2DBI01;Database=SQL_XP_RELATORIOS;User Id=USR_XP_REDE;Password=usr_xp_rede;"
const sql = require("mssql");
sql.connect(connStr)
   .then(conn => console.log("conectou!"))
   .catch(err => console.log("erro! " + err));
   


   