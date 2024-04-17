import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { Loader, FormField } from '../components'

const CreatePost = () => {
  // hooks to return/naviagte back to my home page.
  const naviagte = useNavigate();
  // state to hold the form data.
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  });
  const [generateImg, setGenerateImg] = useState(false);
  const [loading, setLoading] = useState(false);

  // to call the api to work.
  const generateImage = async () => {
    if(form.prompt){
      try{
        setGenerateImg(true);
        const response = await fetch('http://localhost:8000/api/v1/dalle', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`});
      }
      catch(error){
        alter(error);
      }
      finally{
        setGenerateImg(false);
      }
    }
    else{
      alert('Please enter a prompt to generate the image!');
    }
  }

  // to handle the form submission.
  const handleSubmit = () => {

  }

  // to handle the errors.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value})
  }

  // to handle the surprise me button.
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt})
  }

  return (
    // <div><b>Create Post</b></div>
    <section>
      <div> 
        {/* I added the header content */}
      <h1 className='font-extrabold text-[#020617] text-[34px]'>The Gallery Images</h1>
      <p className='mt-2 text-[#475569] text-[16px] max-w [500px]'>
        <i>Create visually stunning images using DALL-E AI API.</i>
        Generate your own images and add to the Image Gallery.
      </p>
      </div>
{/* form component to handle the data of the users!*/}
<form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
  <div className='flex flex-col gap-5'>
    <FormField
    lableName = "User Name"
    type = "text"
    name = "name"
    value = {form.name}
    placeholder = "Kristina Barooah"
    handleChange = {handleChange}
    />

<FormField
    lableName = "Your Prompt"
    type = "text"
    name = "prompt"
    value = {form.prompt}
    placeholder = "Girl dancing in the rain."
    handleChange = {handleChange}
    isSurpriseMe
    handleSurpriseMe = {handleSurpriseMe}
    />
 {/* Creating a container for the generated image to be previewed!*/}
      <div className='relative bg-gray-50 border border-gray-300
      text-gray-900 text-[12px] rounded-lg focus:ring-blue-500
      focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
        {/* if I have the image generated by Open AI the i'll display it else display a preview!*/}
        {
          form.photo? (
            <img 
            src = {form.photo}
            alt = {form.prompt}
            className = 'w-full h-full object-contain'/>
          ):(
            <img
            src = {preview}
            alt = "preview"
            className = 'w-9/12 h-9/12 object-contain opacity-40'
            />
          )}

          {generateImg && (
            <div className='absolute insert-0 z-0 flex justify-center
            items-center bg-black bg-opacity-50 rounded-lg'>
              <Loader/>
            </div>
          )}
      </div>
  </div>
  <div className='mt-5 flex gap-5'>
    <button
    type='button'
    onClick={generateImage}
    className='text-white bg-[#3b0764] font-semibold rounded-md
    text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-[#ddd6fe] hover:text-black'
    >
      {generateImg? "Generating...": "Generate Image"}
    </button>
  </div>
  <div className='mt-10'>
  <p className='mt-2 text-[#475569] text-[16px]'>After generating the Image, you can add it to the gallery!</p>
  </div>
  <br/>
    <button
    type='submit'
    className='mt-3 text-white bg-[#082f49] font-medium rounded-md
    text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-[#ECECF1] hover:text-black'>
    
    {loading ? 'Adding' : 'Add to the Gallery'}
    </button>
</form>
</section>
  )
}

export default CreatePost