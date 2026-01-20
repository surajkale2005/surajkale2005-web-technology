/* 
const: Used to declare constants. Once a value is assigned, it cannot be reassigned.

var: Function-scoped variable. It can be redeclared and updated, which may affect the entire project scope.

let: Block-scoped variable. Its value can be updated, but it is limited to the block in which it is declared.
*/








var ar=200;
let ab=300;
console.log(ar);
document.writeln(ar);
console.log(ab);
document.writeln(ab);





{
    var az=10; 
    let abc=20;

    console.log(az)
    document.writeln(az);
    console.log(abc)
    document.writeln(abc);
}
    
    console.log(az)
    document.writeln(az);
    // console.log(abc)
    // document.rightln(abc);
    







//activity 1 (student information)
let student = {
    name: "Suraj Kale",
    rollNo: 101,
    course: "B.Tech AIML",
    year: "3rd Year",
    college: "ABC Engineering College"
};

// Printing student information
console.log("Student Information");
document.writeln("Student Information");
console.log(student);
document.writeln(student);






//activity 2(odd even)
let number = 7;

if (number % 2 === 0) {
    console.log(number + " is Even");
    document.writeln(number + " is Even");

} else {
    console.log(number + " is Odd");
    document.writeln(number + " is Odd");
}




//activity 3(pass or faile)

let ax=40;
if (ax<35)
{
    console.log("student is faile");
    document.writeln("student is faile");
}
else{
    console.log("student is pass");
    document.writeln("student is pass");
}



//activity 4(1 to 10)
for (let i = 1; i <= 10; i++) {
    console.log(i);
    document.writeln(i);
}



//activity 5
let am=20;
let bl=am;
am=10;
console.log(am);
document.writeln(am);
console.log(bl);
document.writeln(bl);






