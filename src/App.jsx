import axios from "axios";
import { useEffect, useState } from "react";


function App() {

  const [posts, setPosts] = useState([])

  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const [isUpdate, setUpdate] = useState(false)

  const [currentId, setCurrentId] = useState(null)


  //GET MEtHOD
  useEffect(() => {
    axios.get("http://localhost:3000/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(`something wrong:${err}`))
  }, [])


  //POST METHOD
  const addTask = () => {
    axios.post("http://localhost:3000/posts", newPost)
      .then((res) => {
        setPosts([...posts, res.data])

        setNewPost({ title: "", content: "" })

      }).catch((err) => console.log(`something wrong:${err}`))
  }

  //PUT METHOD

  const updateTask = () => {

    axios.put(`http://localhost:3000/posts/${currentId}`,newPost)
      .then((res) => {
        setPosts(posts.map((post) => (post.id===currentId ? res.data : post)))
        setNewPost({ title: "", content: "" })
        setUpdate(false);
        setCurrentId(null)

      }).catch((err) => {
        console.log(`something wrong:${err}`)
      })
  }

  //DELETE METHOD
  const deletePost = (id) => {
    axios.delete(`http://localhost:3000/posts/${id}`)
      .then(() => {
      

        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((err) => console.log(`something wrong:${err}`))
  }




  const handleSubmit = () => {

    if(isUpdate){
      updateTask();
    } else {
addTask();
    }
  }

  const handleEdit = (post) => {
    setNewPost({ title: post.title, content: post.content });
    setUpdate(true);
    setCurrentId(post.id);
  }

  return (
    <>
      <div className="bg-green-500 w-screen">

        <div className="p-10 flex">
          <h1 className="font-bold text-white text-3xl ">CRUD OPERATIONS</h1>
        </div>
      </div>

      <div className="m-4" >
        <div className="border to-black border-solid p-5 rounded-md flex flex-col align-middle justify-center m-5">
          <input type="text" value={newPost.title} placeholder="Title" className=" p-4 m-2 border rounded-sm bg-transparent grow" onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
          <input type="text" value={newPost.content} placeholder="Content" className=" p-4 m-2 border rounded-sm bg-transparent grow" onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} />
          <button className="bg-green-500 text-zinc-50 text-1xl font-medium m-2 p-1 w-24 rounded-md" onClick={handleSubmit}>{isUpdate?"Updating":"AddTask"}</button>
        </div>
      </div>
      <hr className="mt-3 p-2" />
      <br />
      <div className=" p-4  m-2 flex gap-5 flex-wrap border-2 box-border rounded-md">
        {posts.map((post) => (
          <div key={post.id} className="p-3 bg-slate-400 border-collapse rounded-md  flex flex-col flex-wrap w-60">
            <h2 className="text-3xl text-zinc-900">{post.title}</h2>
            <p className="test-2xl text-zinc-900 font-semibold">{post.content}</p>
            <div className="mt-3 flex gap-4 ">
              <button className="bg-yellow-400 text-black p-3 rounded-md font-bold" onClick={() => handleEdit(post)}>Update</button>
              <button className="bg-red-600 text-black p-3 rounded-md font-bold" onClick={() => deletePost(post.id)}>delete</button>
            </div>
          </div>

        ))}



      </div>

    </>
  );
}

export default App;
