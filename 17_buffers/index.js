//Buffers are objects,
//help in handling of binary data.

const buff1 = Buffer.alloc(10);

console.log(buff1);

//string -> buffer   .from() method

const buff2 = Buffer.from("Hello");
const buff3 = Buffer.from([1, 2, 3, 4, 5, 6]);
console.log(buff2);
console.log(buff3);

buff1.write("Helloworld");
console.log(buff1.toString()[0]);

//Add 2 buffers
const buff4 = Buffer.concat([buff1, buff2]);
console.log(buff4.toString());

//Streams -- 4 types of Streams,
//read,
// write,
// duplex(can be used for both read and write) TCP socket
//
