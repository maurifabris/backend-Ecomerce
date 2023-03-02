module.exports = {
    apps:[
        {
            name:"ProyectNode1",
            script: "src/app.js",
            env:{
                PORT:8080
            },
            args:"prueba",
            node_args:"--expose-gc"
        },
        {
            name:"test",
            script:"src/app.js",
            env:{
                PORT:8081
            },
            exec_mode:"cluster",
            instances: 2,
        },
    ]
}

