

var numberOfPoints = 3;
var points = [];
var order = [];

var recordDistance;
var bestPath;

attemptCount = 0;
maxAttempts = factorial(numberOfPoints);

function setup() {
    createCanvas(windowWidth - 10, windowHeight - 10);
    frameRate(30);

    // Creates random points
    for(i = 0; i < numberOfPoints; i++) {
        var v = createVector(random(width), random(height));
        points[i] = v;
        order[i] = i;
    }

    recordDistance = calculateDistance(points, order);
    // Create a copy of the array
    bestPath = order.slice();
}

function draw() {
    // clears previous frame
    background(220);
    strokeWeight(2);
    noFill();

    // Draw points
    for(i = 0; i < numberOfPoints; i++) {
        ellipse(points[i].x, points[i].y, 40);
    }

    // Render best path
    stroke(51);
    strokeWeight(5);
    noFill();
    beginShape();
    // Draw lines
    for(i = 0; i < numberOfPoints; i++) {
        var index = bestPath[i];
        vertex(points[index].x, points[index].y);
    }
    endShape(CLOSE);

    // Render attempts
    stroke(255, 204, 0);
    strokeWeight(4);
    noFill();
    beginShape();
    // Draw lines
    for(i = 0; i < numberOfPoints; i++) {
        var n = order[i];
        vertex(points[n].x, points[n].y);
    }
    endShape(CLOSE);
    
    // Render Node Text
    strokeWeight(0);
    fill(51);
    textSize(32);
    textAlign(RIGHT, CENTER);
    for(i = 0; i < numberOfPoints; i++) {
        text(i + 1, points[bestPath[i]].x, points[bestPath[i]].y, 50);
    }

    var d = calculateDistance(points, order);

    if (d < recordDistance) {
        recordDistance = d;
        bestPath = order.slice();
        console.log('New best!', d);
    }

    textSize(32);
    fill(51);
    var percentComplete = 100 * (attemptCount / maxAttempts);
    text(nf(percentComplete, 0, 2) + '% completed', width - 50, height - 50);
    console.log(attemptCount);
    console.log(order);
    nextOrder();
}

function calculateDistance(points, order) {
    var sum = 0;

    for (i = 0; i < numberOfPoints; i++) {

        var pointAIndex = order[i];
        var pointA = points[pointAIndex];
        var pointBIndex = order[i + 1];
        var pointB = points[pointBIndex];
        
        // if we reach last element, wrap to begininng
        if (i == numberOfPoints - 1) {
            sum += dist(pointA.x, pointA.y, points[0].x, points[0].y);
            return sum;
        }

        sum += dist(pointA.x, pointA.y, pointB.x, pointB.y);
    }
    return sum;
}

// Lexical ordering
function nextOrder() {

    // STEP 1
    //https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
    var largestX = -1;
    for (var i = 0; i < order.length - 1; i++) {
        if (order[i] < order[i + 1]) {
            largestX = i;
        }
    }

    if (largestX == -1) {
        noLoop();
        console.log('Finished');
    }

    // Step 2
    var largestY = -1;
    for (var j = 0; j < order.length; j++) {
        if (order[largestX] < order[j]) {
            largestY = j;
        }
    }

    // Step 3
    console.log("Swapping", order[largestX], order[largestY]);
    swap(order, largestX, largestY);

    // Step 4
    var endArray = order.splice(largestX + 1);
    endArray.reverse();
    order = order.concat(endArray);

    attemptCount++;
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function factorial(num) {
    if (num < 0) {
        return -1;
    }

    if (num == 0) {
        return 1;
    }

    return num * factorial(num - 1);
}
