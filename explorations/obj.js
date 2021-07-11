const obj = {
    data: {
        name: "Max",
        age: 30,
        email: "test@test.com"
    }
}

const str = "Hello this is a test string {{data_name}} {{data_age}}"
const rawKeys = str.match(/{{(\w+)}}/g)

const keys = rawKeys.map(key => key.replace(/[{}]/g, "").split("_"))

console.log(keys)

// function to retrieve value using a key array
const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}

console.log(getNestedObject(obj, keys[1]))

// function to retrieve value using string
function resolve(path, obj) {
    return path.split('_').reduce(function (prev, curr) {
        return prev ? prev[curr] : null
    }, obj || self)
}

console.log(resolve("data_name", obj))

const newString = str.replace(/{{(\w+)}}/g, function (all) {
    return resolve(all.replace(/[{}]/g, ""), obj) || all
});

console.log(newString)