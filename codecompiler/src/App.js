import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Editor from '@monaco-editor/react'
function App() {
 const [userLang,setUserLang] =useState('Select Language');
 const [userTheme,setUserTheme] =useState('Select Theme');
 const [fontSize,setFontSize] =useState(16);
 const [code,setCode] =useState('');
 const [input,setInput]=useState('');
 const [output,setOutput]=useState('');
 const [loading,setLoading]=useState(false);
 function handleCompile()
 {
    setLoading(true);
    axios.post('http://localhost:8000/compile',{
      code,
      lang:userLang,
      input,
    }).then((res)=>{
      console.log("status:"+res.data.status+"\nexecution time:"+res.data.executionTime+"\nResult:\n"+(res.data.stdout?res.data.stdout:(res.data.stderr?res.data.stderr:res.data.exception)) )//even in resp we have {output:"op value"} we need to fetch it as res.data.output  
      setOutput("Execution Time:"+res.data.executionTime+"\n\nResult:\n"+(res.data.stdout?res.data.stdout:(res.data.stderr?res.data.stderr:res.data.exception)))
    })
    .catch((err)=>{
        console.log(err)
        setOutput(err)
    })
    .then((res)=>setLoading(false))
 }
 function handleClear()
 {
    setOutput("");
 }
 const options = {
  fontSize: fontSize
}
  return (
   <>
   <div className='navbar'>
    <Navbar userLang={userLang} setUserLang={setUserLang}
    userTheme={userTheme} setUserTheme={setUserTheme} 
    fontSize={fontSize} setFontSize={setFontSize}/>
    &nbsp;
    <div className="btns">
      <button onClick={()=>handleCompile()} style={{height:'38px'}}>Compile&Run</button>&nbsp;
      <button onClick={()=>handleClear()} style={{height:'38px'}}>Clear</button>
    </div>
    </div>
    <div className="allboxes">
        <Editor height="90vh" width="80%" theme={userTheme} language={userLang} options={options} defaultLanguage='java' defaultValue='Write your code....' onChange={(value)=>setCode(value)} />
      {/* <textarea spellCheck="false" className='editor' value={code} onChange={(e)=>setCode(e.target.value)} placeholder="Code.."/> */}
      <div className="ip">
       <h4>Input:</h4>
        <textarea spellCheck="false" className='input' value={input} onChange={(e)=>setInput(e.target.value)}/>
        <h4>Output:</h4>
        <textarea spellCheck="false" className='output' value={loading?"compiling.....":output} onChange={(e)=>setOutput(e.target.value)}/>
      </div>
    </div>
   </>
  );
}

export default App;
