import React, { useState, useEffect } from 'react'
import { Card, FormField, Loader } from '../components'

const RenderCards = ({ data, title }) => {
  if(data?.length > 0){
    return data.map((post) => <Card key={post._id} {...post}/>)
  }
return (
  <h2 className='mt-5 font-bold text-[#0c4a6e] text-xl uppercase'>{title}</h2>
)
}

const Home = () => {
  const [loading, setLodading] = useState(false); // creating a loading state
  const [allPosts, setAllPosts] = useState(null); // creating a state to store all posts, initialized with NULL
  const [searchText, setSearchText] = useState(''); //createing a searchText state to hold the search text so that it can show results for this text.

  return (
    // <div><b>Home</b></div>
    <section className='max-w-7xl mx-auto'>
      <div> 
        {/* I added the header content */}
      <h1 className='font-extrabold text-[#020617] text-[34px]'>The Gallery Images</h1>
      <p className='mt-2 text-[#475569] text-[16px] max-w [500px]'>
        <i>Collection of visually stunning images generated using DALL-E AI API.</i>
        Generate and add your own images to the gallery by clicking the button below.
      </p>
      </div>

{/* I added the form field */}
<div className='mt-16'>
  <FormField />
</div>

{/* I added the Loader Component. */}
<div className='mt-10'>
  {loading ? 
  <div className='flex justify-center items-center'>
  <Loader /> 
  </div>
  :
  <>
    {searchText && (
      <h2 className='font-medium text-[#475569] text-xl mb-3'>
        Showing results for: <span className='text-[#020617]'>
          {searchText}</span>
      </h2>
    )}
    {/* Bcoz I want to show a gri of images in the gallery so used className='grid' */}
    <div className='grid lg:grid-cols-4 sm:grid-cols-3
    xs:grid-cols-2 grid-cols-1 gap-3'>
      {searchText ? (<RenderCards
        data={[]} //"searchResults"
        title="No search results found!!"
      />)
      :
      <RenderCards 
      data={[]}  //"allPosts"
      title = "No posts found"/>}
    </div>
  </>}

</div>

    </section>
  )
}

export default Home