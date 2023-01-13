import Comments from "./components/Comments"
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [User, setUser] = useState<string>('0');
  const [customUser, setCustomUser] = useState<string>('');
  const Jack = () => {
    setUser("1");
    
    toast.success('Now You\'re Jack', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    console.log(User);
  }

  const John = () => {
    setUser("2");
    toast.success('Now You\'re John', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    console.log(User);
  }

  let name = '';


  return (
    <>
    <div className="btns-box">
    <button className="btns"  onClick={() => Jack()}>Jack</button>
    <button className="btns"  onClick={() => John()}>John</button>
  
    </div>
    <div>
      <Comments customUser={customUser} currentUserId={User} setCustomUser={setCustomUser} username={ User === "1" ? "Jack" : User === "2" ? "John" : customUser}/>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </div>
    </>
  )
}

export default App