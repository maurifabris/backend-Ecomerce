module.exports = {
    apps:[
        {
            name:"Proyect Node 1",
            script: "./src/app.js",
            env:{
                PORT:8081
            }
            
        },
        {
            name:"Proyect Node 1",
            script: "./src/app.js",
            env:{
                PORT:8082
            }
            
        },
        {
            name:"test",
            script:"./src/app.js",
            watch:true,
            env:{
                PORT:8083
            },
            exec_mode:"cluster",
            instances: 4,
            node_args: "--harmony"
        },
    ]
}