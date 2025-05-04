function add(n1:number, n2:number,sr:Boolean) {
  if(sr){
    console.log(n1)
  }
    return n1 + n2;
}

const nu1 = '2';
const nu2 = 3.8;
const pr=true;

const res = add(+nu1, nu2,pr);
console.log(res);
