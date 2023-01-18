
const OPTION_KEY = 'schema'
const STACK_NAME = 'optionSchema'

const optionSchema=(obj)=>{
    try{
        console.log(obj);
    }catch{
        console.error("Not a proper option-schema");
    }
}
// console.log(a.stack[0].handle.stack[0].route.stack[0].handle({schemsa: 'hii'}));

const generateDoc =({route})=>{
    // route.forEach(r =>{
    //     r.stack.forEach(s1 =>{
    //         s1.handle.stack.forEach(s2 =>{
    //             s2.route.stack.forEach(s3 =>{
    //                 // check our function name ( currently optionSchema )
    //                 // if(s3.name===STACK_NAME) s3.handle({
    //                 //     schema: {
    //                 //         url: '/api/v1'
    //                 //     }
    //                 // }) // call our function
    //                 // console.log(s3);
    //             })
    //         })
    //     })
    // })
}

module.exports = {
    optionSchema,
    generateDoc
}