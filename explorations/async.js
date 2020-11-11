let wait = async (num) => {
    return new Promise(resolve => setTimeout(() => resolve(`${num}, Waited one second`), 1000))
}

wait(1).then(res => console.log(res))


let arr = [1,2,3,4,5,6,7]

 Promise.all(arr.map(e => wait(e))).then(val => console.log(val))