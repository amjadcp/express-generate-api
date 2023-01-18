const router = require("express").Router();
const { login } = require("../controllers/auth/login");
const { optionSchema } = require("../lib/option-schema.js/index.js");

// router.get("/login-admin", optionSchema, login)
router.route('/login-admin').get(login).post(login)
// router.post("/login-admin", optionSchema, login)
optionSchema({
    schema: {
        url: '/login-admin',
        tag: 'auth',
        get: {
            
        }
    }
})
const layer = router.stack.forEach(l=>{
    console.log(l);
    l.route.stack.forEach(s=>{
        s.keys = [{schema: 'hiii'}]
        // console.log(s);
    })
})

module.exports = router