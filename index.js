const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const sql = require('mssql');
const connStr = "Server=SP2DBI01;Database=SQL_XP_RELATORIOS;User Id=USR_XP_REDE;Password=usr_xp_rede;"

// Simple-git without promise 
const simpleGit = require('simple-git')();

// Simple Git with Promise for handling success and failure
const simpleGitPromise = require('simple-git/promise')();
//fazendo a conexão global
sql.connect(connStr)
   .then(conn => GLOBAL.conn = conn)
   .catch(err => console.log(err));
   
//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionou!' }));
router.get('/clientes', (req, res) =>{execSQLQuery("SELECT Count(CD_ESCRITORIO) FROM SQL_XP_RELATORIOS.dbo.TB_RELATORIO_POSITIVADOR AS POS", res)});

app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API Teste!');
function execSQLQuery(sqlQry, res){
	console.log("entrou no método");
    GLOBAL.conn.request()
               .query(sqlQry)
               .then(result => res.json(result.recordset))
               .catch(err => res.json(err));
}
