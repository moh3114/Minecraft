const gameWindow = document.querySelector('#gameWindow');
const startBtn = document.querySelector('#startBtn'); 
let sizeInput = document.querySelector('#sizeInput'); 
let gamedrow = document.querySelectorAll('.gamedrow'); 
let matrix, gameSizeX = 0, gameSizeY = 0;
let availableBlocks = ['dirt', 'cobblestone', 'grass', 'leaves', 'wood', 'sky'];
let  dirtCounter = gressCounter =  LeavesCounter = WoodCounter = cobblestoneCounter = 0;  
let selectedTool = '', selectedElement;
let clickables = document.querySelectorAll('.clickable');
let gameTiles = document.querySelectorAll('.gameTile');

let grassCnt = document.querySelector('#grassCount');
let dirtCnt = document.querySelector('#dirtCount');
let woodCnt = document.querySelector('#woodCount');
let leavesCnt = document.querySelector('#leavesCount');
let cobblestoneCnt = document.querySelector('#cobblestoneCount');

startBtn.addEventListener('click', () => {
        gameSizeX = 20;
        gameSizeY = 20; 
        CreateWorld(gameSizeX, gameSizeY);
})


function CreateWorld(x, y) {
    matrix = Array.from(Array(y), () => new Array(x));  

    for (let i = 0; i < 11; i++) 
        for (let j = 0; j < matrix[i].length; j++)
            matrix[i][j] = 'sky'; 


    for (let i = 11; i < 12; i++)
        for (let j = 0; j < matrix[i].length; j++)
            matrix[i][j] = 'gress';


    for (let i = 12; i < 13; i++)
        for (let j = 0; j < matrix[i].length; j++)
            matrix[i][j] = 'cobblestone';



    for (let i = 13; i < 19; i++) 
        for (let j = 0; j < matrix[i].length; j++)
            matrix[i][j] = 'dirt';

    generateTree(3, 11);
    generateTree(15, 11); 
    drawWorld();
}

function drawWorld() {
    for (let i = 0; i < gameSizeY; i++) {
        for (let j = 0; j < gameSizeX; j++) {
            let div = document.createElement('div');
            div.style.gridRowStart = i ;
            div.style.gridColumnStart = j ;
            div.style.height = `5vh`;
            div.style.minWidth = `3vh`;
            div.style.backgroundRepeat = 'no-repeat';
            div.style.backgroundPosition = 'center';
            div.style.backgroundSize = 'cover';
            gameWindow.appendChild(div); 
            div.addEventListener('click', itemClick); 
            div.classList.add('gamedrow');
            switch (matrix[i][j]) {
                case 'dirt':
                    div.classList.add('dirt')
                    break;
                case 'gress':
                    div.classList.add('gress')
                    break;
                case 'wood':
                    div.classList.add('wood')
                    break;
                case 'cobblestone':
                    div.classList.add('cobblestone')
                    break;
                case 'leaves':
                    div.classList.add('leaves')
                    break;
                case 'sky':
                    div.classList.add('sky')
                    break;
                case 'head':
                    div.classList.add('head')
                    break;
                case 'body':
                    div.classList.add('body')
                    break;
                    case 'hand':
                    div.classList.add('hand')
                    break;
            }
        }
    }
}
function generateTree(x, y) {
    matrix[y][x] = 'wood';
    matrix[y+1][x]='wood'
    matrix[y - 1][x] = 'wood';
    matrix[y - 2][x] = 'leaves';
    matrix[y - 2][x - 1] = 'leaves';
    matrix[y - 2][x + 1] = 'leaves';
    matrix[y - 3][x] = 'leaves';
    matrix[y - 3][x - 1] = 'leaves';
    matrix[y - 3][x + 1] = 'leaves';
    matrix[y - 4][x] = 'leaves';
}

function itemClick() {
    if (selectedTool == 'pickaxe' && this.classList[1] == 'cobblestone') { 
        cobblestoneCounter++;
        cobblestoneCnt.textContent = cobblestoneCounter; 
        updateclass(this, 'cobblestone', 'sky');
    }

    if (selectedTool == 'axe' && (this.classList[1] == 'wood' || this.classList[1] == 'leaves')) { 
        if (this.classList[1] == 'wood') {
            WoodCounter++;
            woodCnt.textContent = WoodCounter;
            updateclass(this, 'wood', 'sky');
        }
        else {
            LeavesCounter++;
            leavesCnt.textContent =  LeavesCounter;
            updateclass(this, 'leaves', 'sky');
        }
    }

    if (selectedTool == 'shovel' && (this.classList[1] == 'dirt' || this.classList[1] == 'gress')) {
        if (this.classList[1] == 'dirt') {
            dirtCounter++;
            dirtCnt.textContent = dirtCounter;
            updateclass(this, 'dirt', 'sky');
        }
        else {
            gressCounter++;
            grassCnt.textContent = gressCounter;
            updateclass(this, 'gress', 'sky');
        }
    }

    // remove item
    if( selectedElement.classList[1] == 'dirt' && this.classList[1] == 'sky' && dirtCounter>= 1)
    {
        dirtCounter--;
        dirtCnt.textContent = dirtCounter;
        updateclass(this,'sky','dirt');
    }
    if( selectedElement.classList[1] == 'gress' && this.classList[1] == 'sky'  && gressCounter >= 1)
    {
        gressCounter--;
        grassCnt.textContent = gressCounter;
        updateclass(this,'sky','gress');
    }
    
    if(selectedElement.classList[1] == 'wood'&& this.classList[1] == 'sky' && WoodCounter >= 1)
    {
        WoodCounter--;
        woodCnt.textContent = WoodCounter;
        updateclass(this,'sky','wood');
    }
    if( selectedElement.classList[1] == 'leaves'&& this.classList[1] == 'sky' && LeavesCounter >= 1)
    {
        LeavesCounter--;
        leavesCnt.textContent = LeavesCounter;
        updateclass(this,'sky','leaves');
    }
    if(selectedElement.classList[1] == 'cobblestone'&& this.classList[1] == 'sky' && cobblestoneCounter >= 1)
    {
        cobblestoneCounter--;
        cobblestoneCnt.textContent = cobblestoneCounter;
        updateclass(this,'sky','cobblestone');
    }



}
// array from[dirt , gress , axe , pickaxe...]
clickables.forEach((element) => {
    element.addEventListener('click', () => {
        if (selectedElement) 
            selectedElement.classList.remove('selected');
        element.classList.add('selected');
        selectedElement = element;
        selectedTool = element.classList[1];
        console.log(classList[1]);
        console.log(clickables)  
    })
})

function updateclass(obj, toRemove, toAdd) { 
    obj.classList.remove(toRemove);
    obj.classList.add(toAdd);
}

