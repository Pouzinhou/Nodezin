import { sql} from './db.js';

// sql`Drop table if exists videos`.then(() =>{ // Deletar a tabela se ela já existir
//    console.log('Tabela deletada com sucesso!')
// }) 

 sql`
    CREATE TABLE videos (
        id              TEXT PRIMARY KEY,
        title           TEXT,
        description     TEXT,
        duration        INTEGER
    );
`.then(() => {
    console.log('Tabela criada com sucesso!')
})