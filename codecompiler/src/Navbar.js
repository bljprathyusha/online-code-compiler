import React from 'react';
import Select from 'react-select';
import './App.css';
function Navbar({userLang,setUserLang,userTheme,setUserTheme,fontSize,setFontSize})
{
    const lang=[{value:'java',label:'Java'},{value:'c',label:'C'},{value:'cpp',label:'C++'},{value:'python',label:'Python'}]
    const themes=[{value:'light',label:'light'},{value:'vs-dark',label:'vs-dark'}]
    //userTheme
    //fontsize
    return(
        <div className='nav'>
        <Select options={lang} value={userLang} onChange={(e)=>setUserLang(e.value)} placeholder={userLang}/>
        <Select options={themes} value={userTheme} onChange={(e)=>setUserTheme(e.value)} placeholder={userTheme}/>
        Font size:<input type="range" value={fontSize} min={16} max={44} step={2} onChange={(e)=>{setFontSize(e.target.value)
        console.log(fontSize)}}/>
        </div>
    );
}
export default Navbar;