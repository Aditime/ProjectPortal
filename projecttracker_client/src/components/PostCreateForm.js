import React, { useState } from "react";
import Select from 'react-select';
import Constants from '../utilities/Constants';
import DatePicker from "react-datepicker";
import dateFormat from "dateformat";

import "react-datepicker/dist/react-datepicker.css";

export default function PostCreateForm(props) {
    var today = new Date();
    var todayDate =  (today.getMonth() + 1)+ '-' + today.getDate() + '-' + today.getFullYear();
    var todayTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    
    var Tmonth =  (today.getMonth() + 1)<  10? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    var Tday =  (today.getDate())<  10? '0' + (today.getDate()) : (today.getDate())
    var todayDatenoFormat= Tmonth + Tday + today.getFullYear() + '0' ;
    var local = props.getMaxPNO.toString();
    var getMaxPNO = local.replace(todayDatenoFormat,'');
    if(getMaxPNO.length >2 ){
        var newPNO = todayDatenoFormat + '1';
    }
    else{
        var newPNO = todayDatenoFormat+ (parseInt(getMaxPNO) +1).toString() ;
    }
    const initialFormData = Object.freeze({
        title: "post title",
        pno: newPNO,
        content: "Post description"

    });


    const [startDate, setStartDate] = useState(new Date());
    const [formData, setFormData] = useState(initialFormData);
    const [assignedTo, setAssignedTo] = useState('');
    const [projectStatus, setProjectStatus] = useState('');
    const [dateCreated, setDateCreated] = useState(todayDate + ' ' + todayTime);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


 const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("check here: ", dateCreated );  // I cannot see the date I selected from the calender
    const postToCreate = {
        postId: 0,
        PNO: newPNO,
        Title: formData.title,
        Content: formData.content,
        AssignedTo: assignedTo.value,
        DateCreated:dateFormat(new Date(), "mm/dd/yyyy hh:mm tt").toString(),
        DueDate: dateFormat(startDate, "mm/dd/yyyy").toString(),
        ProjectStatus:projectStatus.value,
    };

    const url = Constants.API_URL_CREATE_POST;
  //  console.log("postToCreate: ",postToCreate);  
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postToCreate)
    })
        .then(response => response.json())
        .then(responseFromServer => {
            console.log(responseFromServer);
        })
        .catch((error) => {
            console.log(error);
            alert(error);
        });

    props.onPostCreated(postToCreate);
};

const options = [
    { value: 'Rachel', label: 'Rachel' },
    { value: 'Ross', label: 'Ross' },
    { value: 'Monica', label: 'Monica' },
    { value: 'Chandler', label: 'Chandler' },
    { value: 'Joey', label: 'Joey' },
    { value: 'Phoebe', label: 'Phoebe' }
  ]


  const optionsForStatus = [
    { value: 'In Progress', label: 'In Progress' },
    { value: 'In Review', label: 'In Review' },
    { value: 'Completed', label: 'Completed' }
  ]



 return (
        <form className="w-100 px-5">
       

       <h1 className="mt-5">Create A New Project</h1>

            
            <div className="mt-4">
                <label className="h3 form-label"> Project ID  </label>
                <input readOnly value={formData.pno} name="title" type="text" className="form-control" />
            </div>

            <div className="mt-5">
                <label className="h3 form-label">Project Title</label>
                <input value={formData.title} name="title" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Project Content</label>
                <textarea value={formData.content} name="content" type="textarea" rows={5} cols={5} className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Assigned To </label>
                <Select options={options} name="AssignedTo" onChange={(values) => setAssignedTo(values)}  />

            </div>

            <div className="mt-4">
                <label className="h3 form-label">Project Created</label>
                <input readOnly value={todayDate + ' ' + todayTime} name="DateCreated" type="text" className="form-control" />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Project Due Date</label>
            <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Project Status </label>
                <Select options={optionsForStatus} name="ProjectStatus" onChange={(values) => setProjectStatus(values)}/>

            </div>

           
            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
            <button onClick={() => props.onPostCreated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
       
       
       
       </form>
    );
}
