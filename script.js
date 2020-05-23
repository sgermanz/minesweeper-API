var repository = require('./repositories/init')
repository.initialize()
var gameModel = require('./models/game')

function generateGameData(rows, columns, mines){
    let field_rows = new Array(rows);
    for(var i = 0; i < field_rows.length; i++){
        let field_columns = new Array(columns);
        for(var j = 0; j < field_columns.length; j++){
            let cell = {
                flagged: false,
                mined: false,
                question: false,
                revealed: false
            }
            field_columns[j] = cell;
        }
        field_rows[i] = field_columns;
    }
    return {
        rows: rows,
        columns: columns,
        mines: mines,
        field: field_rows
    }
}

async function insertGame(){
    let gameData = generateGameData(5,5,0)
    let insertResponse = await gameModel.create(gameData);
    console.log("insertResponse", insertResponse);
}

insertGame()


