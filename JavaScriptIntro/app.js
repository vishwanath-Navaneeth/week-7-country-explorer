//User Interaction

//Handling elements
//&read elements

// console.log(document.body);
// console.log(document.head);
//! querySelector reads any tag elements with by class name /id /tag name in quotes
let element=document.querySelector('h1');
// console.log(element)
// console.log(element.textContent);
let btn=document.querySelector('button');
//^attach event handler
//it has the two parameters: 1) type of the even 2) function calling
btn.addEventListener('click',()=>{
element.textContent="Hello";
element.style.color="red";
element.style.fontSize="5rem";
})



