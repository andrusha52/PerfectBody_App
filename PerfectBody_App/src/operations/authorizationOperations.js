import axios from "axios";

export const register = (registerData, {userData}) => async dispatch => {
const getPost = {...registerData, userData}

  const data = await axios.post(
    "https://slim-moms.goit.co.ua/api/v1/register",
    getPost,
    {
        headers: {
          "Content-Type": "application/json"
        }
    }
  )
  dispatch({type: 'REGISTER_SUCCESS', payload: data.data.user})
}

export const login =registerData=>async dispatch=>{
  const data = await axios.post(
    "https://slim-moms.goit.co.ua/api/v1/login",
    registerData,
    {
        headers: {
          "Content-Type": "application/json"
        }
    }
   
  
  )

  dispatch({type: 'LOGIN_SUCCESS', payload: data.data.user})
}

export const logout =()=> async  (dispatch)=>{
  dispatch({type: 'LOGOUT_SUCCESS'})
}

export const postInfo=(userData)=>async (dispatch)=>{
  const data=await axios.put('https://slim-moms.goit.co.ua/api/v1/user', userData, 
  {
    headers: {
      "Content-Type": "application/json"
    }
}
  )
}

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVkMGI5MmY0ZTlhNjQxNjE3MjkwOWUiLCJjcmVhdGVkRGF0ZSI6MTU4MzE3ODkxMTA3MiwiZXhwIjoxNTg1NzcwOTExfQ.qmwQKQ0KlTsXiy9vxS7kjKRE6w5ZkmABlehN5EMjgDs",






