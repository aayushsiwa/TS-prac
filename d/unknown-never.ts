let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";
// userName = userInput; // Error: Type 'unknown' is not assignable to type 'string'.

if (typeof userInput === "string") {
    userName = userInput;
}

function generateError(message: string, code: number) {
    throw { message: message, errorCode: code }; 
    // while (true) {}
}

generateError("An error occurred!", 500); 