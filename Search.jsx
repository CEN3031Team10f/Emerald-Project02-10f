import { useRef, useState, } from 'react';

//modified from the bootcamp3 search
function Search({ filterUpdate}) 
{
   const input = useRef(null); 
   //default
   const [filterBy, setFilterBy] = useState("projectName"); 

  function handleChange()
  {
	  filterUpdate(input.current.value); 
  }
  const  handleFilterChange= (event) => {
      setFilterBy(event.target.value);
    };

  return (

    <form>
      <input 
        type="text"
        placeholder="Search GalleryItems"
		onChange={handleChange}
        ref={input}
      />
	  
	  <select value={filterBy} onChange={handleFilterChange}>
        <option value="projectName">Project Name</option>
		<option value="creatorName">Creator Name</option>
		<option value="date">Date</option>
      </select>
	  
		

	  
    </form>
	
  );
} 
console.log("Search .jsx the end"); /////////////////
export default Search;


/*
Search.jsx: In this file you will

Capture the text that is typed into the text box and store this value using the filterUpdate() function
Use the onChange listener function
Note: You will need to understand how to use ref values from form inputs


*/
