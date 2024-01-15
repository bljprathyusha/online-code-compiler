const axios=require('axios')
const cors=require('cors')
const express=require('express')
const app=express();
app.use(cors({
    origin:'*'
}))
app.use(express.json());
app.post("/compile",(req,resp)=>{
    let code =""+ req.body.code;
    let language =""+req.body.lang;
    let input =""+ req.body.input;
    let fname={'c':'Main.c','python':'index.py','java':'Main.java','cpp':'Main.cpp'}
    console.log(code);
    console.log(language);
    console.log(fname[language]);
   // console.log(fname)
// let config={
//     method:'post',
//     url:'https://codexweb.netlify.app/.netlify/functions/enforceCode',
//     headers:{'Content-Type': 'application/json'},
//     data:{
//       code:code,
//       input:input,
//       language:language
//     }
//   }
//   axios(config)
//   .then((res)=>{
//     console.log('success'+res.data)
//     resp.send(res.data)
//   })
//   .catch((err)=>{
//       console.log(err)
//       resp.send(err)
//   })
// })



const options = {
  method: 'POST',
  url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'd3b7582235mshd063d188ae19bfbp1a361bjsn96fa6112ffcd',
    'X-RapidAPI-Host': 'onecompiler-apis.p.rapidapi.com'
  },
  data: {
    language:language,
    stdin:input,
    files: [
      {
        name:fname[language],
        content:code
      }
    ]
  }
};

axios(options)
.then((res)=>{
  resp.send(res.data)
  console.log(res.data)
})
.catch((err)=>{
  resp.send(err)
 // console.log(err)
})
})
app.listen(8000,()=>{
    console.log("Listenin to sport 8000")
});
