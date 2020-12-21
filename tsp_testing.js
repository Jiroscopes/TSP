//  This approach solves the possible paths using recursion.
// Also this way is using a better path system for returning to the starting
// position. 



available = [];     // nodes not visited

function tsp(cities, order, visited, overallBest) {
    if (visited == null) {
        order = [cities.shift()];
        visited = [];
    }

    available = getDifference(cities, visited);

    if (available.length == 0) {
        const fullPath = [...order, order[0]];

        // calc cost here

        console.log("Full Path", fullPath);
    }

    for (const point of available) {
        visited.push(point);
        order.push(point);

        tsp(cities, order, visited, overallBest);

        // Make the point available again
        visited.pop();
        order.pop();
    }
}

// Finds differences between 2 arrays
function getDifference(arr1, arr2) {
    let arrDiff = [];
    
    for (let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) {
            arrDiff.push(arr1[i]);
        }
    }

    return arrDiff;
}

tsp([0, 1, 2, 3], null, null, null);