function add(a: number, b: number) {
    return a + b;
}

function addAndHandle(a: number, b: number, cb: (num: number) => void) {
    const result = a + b;
    console.log(cb(result));
    // console.log(val);
}

addAndHandle(10, 20, (result) => {
    console.log(result);
    // return result;
});
