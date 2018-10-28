let data = 'I don\'t like C++,I don\'t like C++,I don\'t like C++,I don\'t like C++,I don\'t like C++';

console.log(data);
let prop = {};
for (var i = 0; i < data.length; i++) {
    if (prop.hasOwnProperty(data[i])) {
        prop[data[i]]++;
    } else {
        prop[data[i]] = 1;
    }
}
let tree = sortTree(prop);
console.log(tree)
let newTree = sortTree(prop);
while (newTree.length != 1) {
    treePath(tree, newTree);
}
for (let i = 0; i < tree.length; i++) {
    tree[i][2] = reverseString(tree[i][2]);
}
let encriptedData = encriptData(tree);
console.log(encriptedData);
let count = [];
for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < tree.length; j++) {
        if (data[i] == tree[j][0]) {
            count[i] = tree[j][2].length;
            break;
        }
    }
}
let decriptedData = decriptData(tree,encriptedData,count);
console.log(decriptedData);

function sortTree(prop) {
    let sortable = [];
    for (let value in prop) {
        sortable.push([value, prop[value], '']);
    }

    sortable.sort(function (a, b) {
        return a[1] - b[1];
    });
    return sortable
}
function treePath(tree, newTree) {

    let elem = newTree[0][0] + newTree[1][0];
    let size = newTree[0][1] + newTree[1][1];

    if (newTree[0][1] >= newTree[1][1]) {
        newTree[0][2] = '1';
        newTree[1][2] = '0';
    } else {
        newTree[0][2] = '0';
        newTree[1][2] = '1';
    }

    for (let i = 0; i < tree.length; i++) {
        for (let j = 0; j < newTree[0][0].length; j++) {
            if (tree[i][0] == newTree[0][0][j]) {
                tree[i][2] += newTree[0][2];
                break;
            }
        }
        for (let k = 0; k < newTree[1][0].length; k++) {
            if (tree[i][0] == newTree[1][0][k]) {
                tree[i][2] += newTree[1][2];
                break;
            }
        }
    }

    newTree.splice(0, 2, [elem, size, '']);
    newTree.sort(function (a, b) {
        return a[1] - b[1];
    });

}
function reverseString(str) {
    var splitString = str.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("");
    return joinArray;
}
function encriptData(tree) {
    let dataArray = data.split("");
    let encriptedData = '';
    for (let i = 0; i < dataArray.length; i++) {
        for (let j = 0; j < tree.length; j++) {
            if (tree[j][0] == dataArray[i]) {
                encriptedData += tree[j][2];
                break;
            }
        }
    }
    return encriptedData
}
function decriptData(tree, encriptedData, count) {
    let idx = 0; 
    let decriptedData = '';
    for (let i = 0; i < encriptedData.length; i++) {
        let path = '';
        for (let j = 0; j < count[i]; j++) {
            path+=encriptedData[idx++];
        }
        for (let k = 0; k < tree.length; k++) {
            if(path == tree[k][2]){
                decriptedData += tree[k][0];
                break;
            }
        }
    }
    return decriptedData
}
