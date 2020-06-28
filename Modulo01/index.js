const express = require('express')

const server = express();
server.use(express.json()); // necessario caso queria eniar informações do tipo Json
server.listen(3000) //Informando qual porta sera acessada

const cursos = ['NodeJs', 'Angular', 'React Native']

function checkcurso(req, res, next){  //middlewares
    if(!req.body.name){
        return res.status(400).json({response: "Campo name é obrigatorio"})
    }

    return next();
}


function IndexcheckCurso(req, res, next){
    const curso = cursos[req.params.index]
    if(!curso){
        return res.status(400).json({response: "Curso nao existe"})
    }
    
    req.curso = curso;
    return next();
}



server.get('/cursos/:index', IndexcheckCurso, (req, res) =>{
       return res.json({curso: `Curso: ${req.curso}`})
})

server.get('/cursos', (req, res) =>{
    return res.json(cursos)
})

server.post('/cursos/add', checkcurso, (req,res) =>{
    const { name } = req.body;

    cursos.push(name);
    return res.json(cursos)  
})

server.put('/cursos/:index', checkcurso, IndexcheckCurso,  (req, res) =>{
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;
    return res.json(cursos)
});

server.delete('/cursos/:index', (req, res) =>{
    const { index } = req.params;

    cursos.splice(index, 1);
    return res.json(cursos)
})
