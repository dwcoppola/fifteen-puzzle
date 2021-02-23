const adjacentToBlank = {
    '1': [2, 5], '2': [1,3,6], '3': [2,4,7], '4': [3,8],
    '5': [1,6,9], '6': [2,5,7,10], '7': [3,6,8,11], '8': [4,7,12],
    '9': [5,10,13], '10': [6,9,11,14], '11': [7,10,12,15], '12': [8,11,16],
    '13': [9,14], '14': [10,13,15], '15': [11,14,16], '16': [12,15]
}

function checkForWin() {
    c = 0
    var cells = document.getElementsByClassName('cell');
    for (v=0; v<15; v++) {
        if (cells[v].firstElementChild === null) {
            continue
        } else if (cells[v].firstElementChild.name === cells[v].id) {
            c++;
        }
    }
    if (c === 15) {
        console.log("You win!");
    }
}

function validatePuzzle(list) {
    var copyOfList = list;
    var inversionCount = 0;
    for (i=0; i<14; i++) {
        for (j=i+1; j<15; j++) {
            if (copyOfList[i] > copyOfList[j]) {
                inversionCount++;
            }
        }
    }
    if (inversionCount % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

function lockImages() {
    var images = document.getElementsByClassName('image');
    for (i=0; i<images.length; i++) {
        images[i].setAttribute('draggable', 'false');
        images[i].removeAttribute('ondragstart');
    }
}   

function makeSquaresDraggable() {
    var cells = document.getElementsByClassName('cell');
    for (v in cells) {
        if (cells[v].childElementCount === 0) {
            var list = adjacentToBlank[(Number(v) + 1).toString()];
        }
        for (i in list) {
            var image = document.getElementById(list[i]).firstChild;
            image.setAttribute('draggable', 'true');
            image.setAttribute('ondragstart', 'drag(event)');
        }
    }
}

function changeDropInformation() {
    var cells = document.getElementsByClassName('cell');
    for (i in cells) {
        if (cells[i].childElementCount === 0) {
            cells[i].setAttribute('ondrop', 'drop(event)');
            cells[i].setAttribute('ondragover', 'allowDrop(event)');
        } else if (cells[i].childElementCount === 1) {
            cells[i].removeAttribute('ondrop');
            cells[i].removeAttribute('ondragover');        
        }
    }
    lockImages();
    makeSquaresDraggable();
    checkForWin();
}

function allowDrop(dragEvent) {
    dragEvent.preventDefault();
}
  
function drag(dragEvent) {
    dragEvent.dataTransfer.setData("text", dragEvent.target.id);
}
    
function drop(dragEvent) {
    dragEvent.preventDefault();
    var data = dragEvent.dataTransfer.getData("text");
    dragEvent.target.appendChild(document.getElementById(data));
    changeDropInformation();
}

function fillImages() {
    var imageIDs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    while (true) { 
        if (validatePuzzle(imageIDs.sort(() => Math.random() - 0.5)) === false) {
            continue;
        } else {
            break;
        }
    }
    var cells = document.getElementsByClassName('cell');
    for (i in imageIDs) {
        var img = document.createElement('img');
        img.setAttribute('src', (`images/${imageIDs[i]}.jpg`));
        img.setAttribute('id', `image-${Number(i) + 1}`);
        img.setAttribute('class', 'image');
        img.setAttribute('name', `${Number(imageIDs[i])}`);
        cells[i].appendChild(img);
        if (cells[i].id === '12' || cells[i].id === '15') {
            img.setAttribute('draggable', 'true');
            img.setAttribute('ondragstart', 'drag(event)');
        } else {
            img.setAttribute('draggable', 'false');
        }
    }
    cells[15].setAttribute('ondrop', 'drop(event)'); 
    cells[15].setAttribute('ondragover', 'allowDrop(event)');
}

function makeTable() {
    var idCounter = 1;
    var body = document.getElementsByTagName('body');
    var content = document.createElement('div');
    content.setAttribute('id', 'main-content');
    body[0].appendChild(content);
    for (i=0; i<4; i++) {
        var row = document.createElement('div');
        row.setAttribute('class', 'row');
        content.appendChild(row);
        for (j=0; j<4; j++) {
            cell = document.createElement('div');
            cell.setAttribute('class', 'cell');
            cell.setAttribute('id', `${idCounter}`);
            row.appendChild(cell);
            idCounter++;
        }
    }
    fillImages();
}
