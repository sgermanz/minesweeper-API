let n = 10;
let range = 10;

let result = new Array(n);
while (n - 1 >= 0) {
    let x = Math.floor(Math.random() * range);
    if(!result.includes(x)){
        result[n-1] = x;
        n--;
    }
}

console.log(result)