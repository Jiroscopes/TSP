function recursionTest(n) {
    if (n == 1) {
        return;
    }

    for (var i = 0; i < n; i++) {
        console.log("CALLING WITH ", n);
        recursionTest(n-1);
    }

    console.log(n);
    return recursionTest(n-1);
}

recursionTest(3);