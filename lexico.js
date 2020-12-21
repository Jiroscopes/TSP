
var vals = [0, 1, 2, 3, 4, 5];
// var vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


function setup() {
    createCanvas(windowWidth - 10, windowHeight - 10);
    // noLoop();
}


function draw() {

    console.log(vals);

    // STEP 1
    //https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
    var largestX = -1;
    for (var i = 0; i < vals.length - 1; i++) {
        if (vals[i] < vals[i + 1]) {
            largestX = i;
        }
    }

    if (largestX == -1) {
        noLoop();
        console.log('Finished');
    }

    // Step 2
    var largestY = -1;
    for (var j = 0; j < vals.length; j++) {
        if (vals[largestX] < vals[j]) {
            largestY = j;
        }
    }

    // Step 3
    swap(vals, largestX, largestY);

    // Step 4
    var endArray = vals.splice(largestX + 1);
    endArray.reverse();
    vals = vals.concat(endArray);

    background(0);
    textSize(64);
    var s = '';
    for (var i = 0; i < vals.length; i++) {
      s += vals[i];
    }
    fill(255);
    text(s, 20, height / 2);
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
