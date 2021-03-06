import './App.css';
import {useState, useEffect} from 'react'
import faceimg from './a.jpg'

// imports
import Navbar from './components/Navbar'
import NewPost from './components/NewPost'

function App() {
  const [image, setImage] = useState();
  const [file, setFile] = useState();

  useEffect(() =>
  {
    const getImage = ()=>{
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () =>
      {
        setImage(
          {
            url : img.src,
            width : img.width,
            height: img.height
          }
          );
        }
      }
      file && getImage();
  },[file]);


  return (
    <div className="App">
        <Navbar />
        { image ? (<NewPost image={image} />):(
          <div className="newPostCard">
                    <div className="addPost">
                        <img 
                          src={faceimg} 
                          alt="" 
                          className="avatar"
                          />
                          <div className="postForm">
                            <input type="text" 
                                     placeholder="What's on your mind?"
                                     className="postInput"
                            />
                            <div>

                            <label htmlFor="file"  className="p2">
                                  <img 
                                    className="addImg"
                                    src="https://cdn.icon-icons.com/icons2/564/PNG/512/Add_Image_icon-icons.com_54218.png" alt="" />
                                  <img 
                                    className="addImg"
                                    src="https://icon-library.com/images/maps-icon-png/maps-icon-png-5.jpg" alt="" />
                                  <img 
                                    className="addImg"
                                    src="https://d29fhpw069ctt2.cloudfront.net/icon/image/84451/preview.svg" alt="" />
                                    <button>Send</button>
                            </label>
                            <input type="file" id="file" hidden
                              onChange={(e)=> setFile(e.target.files[0])}
                              />
                              </div>
                          </div>
                    </div>
          </div>
        ) }


    </div>
  );
}

export default App;
