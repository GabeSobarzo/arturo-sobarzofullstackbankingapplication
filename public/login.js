// import { initializeApp } from "firebase/app"

function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    
  
  /*const firebaseConfig = {
    apiKey: "AIzaSyAk9l-SXBojk-fK81_eUl37WAYY8WMDwps",
    authDomain: "arturo-sobarzofullstackbankapp.firebaseapp.com",
    projectId: "arturo-sobarzofullstackbankapp",
    storageBucket: "arturo-sobarzofullstackbankapp.appspot.com",
    messagingSenderId: "1051827377272",
    appId: "1:1051827377272:web:5cdc24ee85bc73a823c98d",
    measurementId: "G-16YMQXV80L"
  }

 // Initialize Firebase
const app = initializeApp(firebaseConfig); */
  
  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Log Out/Switch Users
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}