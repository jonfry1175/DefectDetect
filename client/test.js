function test(x, y) {
    let temp = ""
    for(let i = 0; i < y; i++) {
        temp += x
    }
    return temp
    
}
console.log(test("*", 3))