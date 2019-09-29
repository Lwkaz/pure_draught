const house_length = 45;
const house_color_a = '#8C5821';
const house_color_a_light = '#E4B24F';
const house_color_b = 'white';

//houses
const empty = 1;
const white_house = 0;
//pieces
const black_piece = 2;
const white_piece = 3;
//possible house 
const possible_house = 11;
const origin = 22;

const directions = [-1, 1];

matrix = [];

var rounds = 0;

console.log(matrix);

for(var i = 0 ; i < 10; i++) {
    matrix[i] = [];
    for(var j = 0; j < 10; j++) {
        var newDiv = document.createElement('div');
        newDiv.style.position = 'absolute';
        newDiv.style.width = house_length;
        newDiv.style.height = house_length;
        newDiv.style.marginLeft = j * house_length;
        newDiv.style.marginTop = i * house_length;
        newDiv.style.border = 'solid';
        newDiv.style.borderColor = house_color_a;
        newDiv.id = i + '-' + j;
        newDiv.setAttribute('onclick', "where_to_move(" + i + ", " + j + ")");

        var img = document.createElement('img');
        img.src = 'transparent_piece.png';

        var img2 = document.createElement('img');
        img2.src = 'transparent_piece2.png';

        if(i %  2 == 0) {
            if(j %  2 == 0) {
                matrix[i][j] = empty;
                newDiv.style.backgroundColor = house_color_a;
                if(i > 6) {
                    matrix[i][j] = black_piece;
                    newDiv.appendChild(img);
                }
                if(i < 3) {
                    matrix[i][j] = white_piece;
                    newDiv.appendChild(img2);
                }
            } else {
                matrix[i][j] = white_house;
                newDiv.style.backgroundColor = house_color_b;
            }
        } else {
            if(j %  2 == 0) {
                matrix[i][j] = white_house;
                newDiv.style.backgroundColor = house_color_b;
            } else {
                matrix[i][j] = empty;
                newDiv.style.backgroundColor = house_color_a;
                if(i > 6) {
                    matrix[i][j] = black_piece;
                    newDiv.appendChild(img);
                }
                if(i < 3) {
                    matrix[i][j] = white_piece;
                    newDiv.appendChild(img2);
                }
            }
        }
        
        var div = document.getElementById('board');
        div.appendChild(newDiv);
    }
}

function where_to_move(a, b) {
    
    if(matrix[a][b] != 0 && matrix[a][b] != 1&& matrix[a][b] != possible_house) {
        for(var i = 0 ; i < 10; i++) {
            for(var j = 0; j < 10; j++) {
                if(matrix[i][j] == possible_house){
                    document.getElementById(i + '-' + j).style.backgroundColor = house_color_a;
                    matrix[i][j] = 1;
                } else if(matrix[i][j] == origin) {
                    matrix[i][j] = black_piece;
                }
            }
        }

        //alert(a + ", " + b);
        var possible_moves = [];
        if(matrix[a - 1][b - 1] == 1) {
            matrix[a - 1][b - 1] = possible_house;
            matrix[a][b] = origin;
            possible_moves[0] = document.getElementById((a - 1) + '-' + (b - 1));
            possible_moves[0].style.backgroundColor = house_color_a_light;
        } 
        if(matrix[a - 1][b + 1] == 1) {
            matrix[a - 1][b + 1] = possible_house;
            matrix[a][b] = origin;
            possible_moves[1] = document.getElementById((a - 1) + '-' + (b + 1));
            possible_moves[1].style.backgroundColor = house_color_a_light;
        }
    } else if(matrix[a][b] == possible_house) {

        for(var i = 0 ; i < 10; i++) {
            for(var j = 0; j < 10; j++) {
                if(matrix[i][j] == origin) {
                    document.getElementById(i + '-' + j).innerHTML = '';
                    matrix[i][j] = 1;
                }
            }
        }

        var piece = document.createElement('img');
        piece.src = 'transparent_piece.png';
        document.getElementById(a + '-' + b).appendChild(piece);
        matrix[a][b] = black_piece;
        rounds++;
        //console.log(rounds);
        machines_turn();
    }
}

function machines_turn() {
    var pieces_list = [];
    var pieces_list_index = 0;

    //while(1 == 1) {
    
        if(rounds % 2 != 0) {
    
            for(var i = 0 ; i < 10; i++) {
                for(var j = 0; j < 10; j++) {
                    if(matrix[i][j] == white_piece && matrix[i + 1][j + 1] == empty && matrix[i + 1][j - 1] == empty){
                        pieces_list[pieces_list_index] = [i, j];
                    } 
                }
            }

            console.log(pieces_list[Math.floor(Math.random() * pieces_list.length)]);
    
            mov = directions[Math.floor(Math.random() * 2)];
            //move_robot_move(a, b, mov)
        }
    //}
}


function move_robot_move(a, b, m) {
    if(matrix[a][b] == 1) {

        document.getElementById(a + '-' + b).innerHTML = '';
        matrix[a][b] = 1;
         
        var piece = document.createElement('img');
        piece.src = 'transparent_piece.png';
        document.getElementById((a + m) + '-' + (b + m)).appendChild(piece);
        matrix[a + m][b + m] = black_piece;
        rounds++;
        console.log(rounds);

    }
}
