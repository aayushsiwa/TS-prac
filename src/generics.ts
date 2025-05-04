const last = <T>(arr: T[]) => {
    return arr[arr.length - 1];
};

const l1 = [1, 2, 3];

const l2 = ["a", "b", "c"];

const l3 = ["a", 1, true];

console.log(last(l1));
console.log(last(l2));
console.log(last(l3));

const makeArray = <X, Y = string>(x: X, y: Y): [X, Y] => {
    return [x, y];
};

const v = makeArray(2, 2);
const v2 = makeArray("a", "b");
const v3 = makeArray<number>(1, "a");
const v4 = makeArray<number, boolean>(1, true);

type Person = {
    firstName: string;
    lastName: string;
};

const makeFullName = <T extends Person>(obj: T) => {
    return {
        ...obj,
        fullName: obj.firstName + " " + obj.lastName,
    };
};

const v5 = makeFullName({
    firstName: "John",
    lastName: "Doe",
    age: 15,
});
console.log(v5);

interface Tab<T> {
    id: number;
    position: string;
    data: T;
}

type numberTab = Tab<number>;
// this is same as
// type numberTab = {
//     id: number;
//     position: string;
//     data: number;
// };

// JSX
// interface FormProps<T> {
//     values: T;
//     children: (values: T) => JSX.Element;
// }

// const Form = <T extends {}>({ values, children }: FormProps<T>) => {
//     return children(values);
// };
