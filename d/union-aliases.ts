type Combinable = number | string;
type ConvDesc = "as-text" | "as-number";

function combine(n1: Combinable, n2: Combinable, resConv: ConvDesc) {
    let res;
    if (
        (typeof n1 === "number" && typeof n2 === "number") ||
        resConv === "as-number"
    ) {
        res = +n1 + +n2;
    } else {
        res = n1.toString() + n2.toString();
    }

    return res;
}

const combinedAges = combine(30, 26, "as-number");

const combinedStringAges = combine("30", "26", "as-number");

const combinedNames = combine("a", "b", "as-text");

console.log(combinedAges);
console.log(combinedStringAges);
console.log(combinedNames);
