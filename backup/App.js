import React, {useState, useEffect} from 'react'; 
import './app.css';
const axios = require('axios').default;



const App = () => {

  const [loading, setLoading] = useState(true); 
  const [data, setData] = useState([]);  
  const [list, setList] = useState([]);
  const [input, setInput] = useState(''); 


    //********************************************************************
//          FUNCTIONS
// *******************************************************************
  
const handleChange = (e) => {

  if(input){

    const filteredData = data.filter(value=> {
      const {name, house} = value;
      return name.toLowerCase().includes(input.toLowerCase())
      || house.toLowerCase().includes(input.toLowerCase());
      
    });

    setList(filteredData); 


    


    // end of input true line
  } else {
    setList(data); 
  }

}

let fetchData = async()=> {
  let resp = await axios.get('https://hp-api.herokuapp.com/api/characters');
  let data = await resp.data;
  setData(data);
  setList(data);
  setLoading(false); 
}



  //********************************************************************
//          HOOKS
// *******************************************************************




  useEffect(()=> {
      fetchData();   
  }, [])

  useEffect(()=> {
    let inputFocus = document.querySelector('#input1');

    if(inputFocus){
      inputFocus.focus();
    }
  }, [loading])



  useEffect(()=> {

    handleChange();

  }, [input])



//********************************************************************
//          HTML CODE
// *******************************************************************
  

  if(loading){
    return (
      <h1>Loading...</h1>
    )
  }


  return       ( 

    <div className='wrapper'>
<h1 className='title'>Search For Your Favorite Character:</h1>

<input type='text' id='input1' value={input} onChange={(e)=> setInput(e.target.value)}  placeholder='enter name or house' title='input1'/>

<br />
<br />
<br />

{list.map((value, index) => {
  const {name, house, image} = value;
  return (
    <div key={index}>
      <hr />
      <h3>Name: {name}</h3>
      <p>House: {house}</p>
      <img src={image ? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp2Af2rEhJORxbTBGM1vOx8vdMo4BrhcEQhw&usqp=CAU'} alt="" />
    </div>
  )
})}
    

    </div>

)
};

export default App;