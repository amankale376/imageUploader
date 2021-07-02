const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(fileUpload());

app.get('/getImg/:path', (req, res)=>{
    res.download(__dirname+'/public/uploads/'+req.params.path);
});

app.post('/upload',(req,res)=>{
    if(req.files === null){
        return res.staus(400).json({msg:"No file uploaded"});
    }

    const file = req.files.file;
    
        file.mv(__dirname+'./public/uploads/'+file.name, err=>{
            if(err){
                console.log(err);
                return res.status(500).send(err);
            }

            res.json({fileName:file.name});
        });
});


app.listen(5000, ()=>console.log('server up..'));
