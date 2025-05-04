enum Role {
    ADMIN,
    AUTHOR,
    READ_ONLY,
}

const person = {
    name: "M",
    age: 30,
    hobbies: ["Sports", "Cooking"],
    role: Role.AUTHOR,
};

console.log(person.role);
