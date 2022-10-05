let person = {
    name: 'Lee',
    age: 28
}

let swallowCopy = person; // 얕은 복사
let deepCopy = {...person}; // 깊은 복사

people = [];
people.push(swallowCopy);
people.push(deepCopy);
console.log(people); // [ { name: 'Lee', age: 28 }, { name: 'Lee', age: 28 } ]
console.log(people[0] === people[1]); // false

console.log(JSON.stringify(people[0]) === JSON.stringify(people[1])); // true