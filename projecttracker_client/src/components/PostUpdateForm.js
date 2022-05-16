import React, { useState } from 'react'
import Constants from '../utilities/Constants';
import Select from 'react-select';
import DatePicker from "react-multi-date-picker";
import dateFormat from "dateformat";

export default function PostUpdateForm(props) {
    const [startDate, setStartDate] = useState(new Date());
    

    const initialFormData = Object.freeze({
        pno: props.post.pno,
        title: props.post.title,
        content: props.post.content,
        AssignedTo: props.post.assignedTo,
        DateCreated: props.post.dateCreated,
        DueDate: props.post.dueDate,
        ProjectStatus:props.post.projectStatus
    });

    //console.log("update: ", props.post);
    const [formData, setFormData] = useState(initialFormData);
    const [assignedTo, setAssignedTo] = useState('');
    const [projectStatus, setProjectStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const postToUpdate = {

            pno: props.post.pno,
            postId: props.post.postId,
            title: formData.title,
            content: formData.content,
            assignedTo: assignedTo.value,
            dateCreated: props.post.dateCreated,
            dueDate: dateFormat(startDate, "mm/dd/yyyy").toString(),
            projectStatus:projectStatus.value,

        };

        const url = Constants.API_URL_UPDATE_POST;
       // console.log("postToUpdate: ",postToUpdate );
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postToUpdate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        props.onPostUpdated(postToUpdate);
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
            <h1 className="mt-5">Updating the post titled " {props.post.title}. </h1>

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
                <Select options={options} value={props.post.assignedTo.value}  name="AssignedTo" onChange={(values) => setAssignedTo(values)}  />

            </div>

            <div className="mt-4">
                <label className="h3 form-label">Project Created</label>
                <input readOnly value= {formData.DateCreated} name="DateCreated" type="text" className="form-control" />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Project Due Date</label>
                <div>
            <DatePicker selected={startDate}    onChange={(date:Date) => setStartDate(date)} />
            </div>
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Project Status </label>
                <Select options={optionsForStatus} defaultValue={formData.ProjectStatus} name="ProjectStatus" onChange={(values) => setProjectStatus(values)}/>

            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
            <button onClick={() => props.onPostUpdated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
        </form>
    );
}
