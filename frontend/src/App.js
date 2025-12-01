import { useState ,useEffect } from "react"
import TableTasks from "./components/TableTasks";
import './App.css';
import axios from "axios";
import Confirmation from "./components/Confirmation";
import Form from "./components/Form";
import UpdateForm from "./components/UpdateForm";
function App() {

  const [backend , setabackend] = useState([{}]) ;
  const [isLoading , setisLoading] = useState(true) ;
  const [showConfirm , setshowConfirm] = useState(false) ;
  const [validDeleteId , setvalidDeleteId] = useState(null) ;
  const [formData , setformData] = useState({
    title: "",
    description: ""
  }) ;
  const [showForm , setshowForm] = useState(false) ;
  const [updateTask , setupdateTask] = useState({}) ;
  // get data from backend 
      useEffect
      (() =>{
        const fetchData = async () => {
          try {
            const response = await axios.get('/api/tasks');
            setabackend(response.data);
            setisLoading(false);
          } catch (error) {
            setisLoading(false);
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      } , [] ) ;

      // show connfirmation modal to delete task
      const showConfirmtoDeleteTask = (id) => {
        setshowConfirm(true) ;
        setvalidDeleteId(id) ;
        console.log("delete task with id: " + id);
      } ;

      const deleteTask = async () => {
        if (validDeleteId) {
             try {
              await axios.delete(`/api/tasks/${validDeleteId}`);
              setabackend(backend.filter(task => task.id !== validDeleteId));
              setshowConfirm(false) ;
            } catch (error) {
              console.error('Error deleting task:', error);
            }
          }
      } ;

      // insert in data to backend
        const handleformChange = (e) => { 
        const { name, value } = e.target;
        setformData((prevData) => ({
          ...prevData,
          [name]: value
        })) ;
      } ;

      const  validFormData = {
        title: formData.title.length >= 3 && formData.title.length < 255,
        description: formData.description.length > 5
      };
      const validFields = Object.values(validFormData).some(value => value === false) ;
      

      async function addNewTask(){
        try{
          const response = await axios.post('/api/tasks', formData );

          setabackend([...backend, {id: response.data.insertId, 
            ...formData, is_completed: 0, created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')}]);
          
          setformData({ title: "", description: "" }) ;
          
        }catch(error){
          console.error('Error creating task:', error);
       }
        
      } 

      const handleSubmit = (e) => {
        e.preventDefault();
        addNewTask() ;

    };

      // update task by form
      const showUpdateForm = (id) => {
        setshowForm(true) ;
        const taskToUpdate = backend.find(task => task.id === id) ;
        setupdateTask(taskToUpdate) ;

      } ;

      const hideForm = () => {
        setshowForm(false) ;
        setupdateTask({}) ;
      } ;

      const handleUpdate = (e) => {  
        const { name, value } = e.target;
        setupdateTask((prevData) => ({
          ...prevData,
          id : updateTask.id,
          [name]: value ,
          is_completed: name === "status" ? (value === "1" ? 1 : 0) : prevData.is_completed
        })) ;

      } ;
            
      const handleSubmitofupdate = async (e) => {
        e.preventDefault();
        console.log("Submitting update for task id: " + updateTask.id);
        try {
          const { id, title, description, is_completed } = updateTask;
          await axios.put(`/api/tasks/${id}`, { title, description, is_completed });
          setabackend(backend.map(task => task.id === id ? updateTask : task));
          hideForm();
        } catch (error) {
          console.error('Error updating task:', error);
        }
      } ;
  return (
    <div className="container d-flex flex-column  mt-5">

      <Form  handleformChange={handleformChange} handleSubmit={handleSubmit} validFields={validFields} formData={formData} />
      { isLoading ? <h1>Loading...</h1>
      : <TableTasks listTasks={backend} showConfirmtoDeleteTask={(id)=>showConfirmtoDeleteTask(id)} showUpdateForm={(id)=>showUpdateForm(id)} /> 
       }
       <Confirmation show={showConfirm} onClose={()=>setshowConfirm(false) } onConfirm={deleteTask} />
        {showForm && <UpdateForm  updateTask={updateTask} hideForm={hideForm} 
         handleUpdate={handleUpdate} handleSubmitofupdate={handleSubmitofupdate} />}
    </div>
  )
}

export default App
