const axios = require('axios').default;

let fetchData = async()=> {
    let resp = await axios.get('https://hp-api.herokuapp.com/api/characters');
    let data = await resp.data;
    return data;
  }

  export {fetchData};  