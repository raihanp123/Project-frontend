`use strict`;

const baseURL = "http://localhost:8081"; // uses the homepage for the base url

function displayCreateMessage() { // function created to add alert when creating a show
    alert("TVShow Created  *QUE FIREWORKS");
}



function displayupdateMessage() { // function created to add alert when creating a show
    alert("TVShow is updated  *QUE FIREWORKS");
}

// homepage (hello world)
axios.get(`${baseURL}/`)
    .then(res => {
        console.log(res);
        console.log("DATA: ", res.data);
    }).catch(err => console.log(err));


    const getAllSection = document.querySelector("#getAllSection");
    
    // used to search for all shows
    const getAllTVShows = () => {
  
        axios.get(`${baseURL}/getAllShows`)
            .then(res => {
                const tvshows = res.data;
                getAllSection.innerHTML = ""; 
                tvshows.forEach(tvshow => renderTVShow(tvshow, getAllSection));
            }).catch(err => console.log(err));
    
        }

        // renders the list for all shows
    const renderTVShow = (tvshow) => {

    
        const newTVShow = document.createElement('div');
        newTVShow.classList.add("card");
    
       const tvshowName = document.createElement("h3");
        tvshowName.innerText = tvshow.name;
        tvshowName.classList.add("card-title");
        newTVShow.appendChild(tvshowName);
    
        const tvshowid = document.createElement("p");
        tvshowid.innerText = `ID: ${tvshow.id}`;
        tvshowid.classList.add("card-title");
        newTVShow.appendChild(tvshowid);
    

        const tvshowGenre = document.createElement("p");
        tvshowGenre.innerText = `Genre: ${tvshow.genre}`;
        tvshowGenre.classList.add("card-text");
        newTVShow.appendChild(tvshowGenre);
    
        const tvshowRating = document.createElement("p");
        tvshowRating.innerText = `Rating (Out of 10): ${tvshow.rating}`;
        tvshowRating.classList.add("card-text");
        newTVShow.appendChild(tvshowRating);
    
        const tvshowEpisodes = document.createElement("p");
        tvshowEpisodes.innerText = `Number of Episodes: ${tvshow.episodes}`;
        tvshowEpisodes.classList.add("card-text");
        newTVShow.appendChild(tvshowEpisodes);
    
    // button for deleting tvshow
        const deleteButton = document.createElement('button');
        deleteButton.innerText = "DELETE TVSHOW";
        deleteButton.classList.add("btn", "btn-secondary");
        deleteButton.addEventListener('click', () => deleteTVShow(tvshow.id));
        
        newTVShow.appendChild(deleteButton);
    
        
    //      // button for updating a tvshow record
    //      const updateButton = document.createElement('button');
    //      updateButton.innerText = "UPDATE TVSHOW";
    //      updateButton.classList.add("btn", "btn-primary" );
    //      updateButton.addEventListener('click', () => updateTVShow(tvshow.id));
         
    //      newTVShow.appendChild(updateButton);
        
        getAllSection.appendChild(newTVShow);
    }

    // used to delete a tvshow
const deleteTVShow = id => {
    axios.delete(`${baseURL}/deleteShow/${id}`)
        .then(res => {
            console.log(res);
            getAllTVShows();
        }).catch(err => console.log(err));
}


// seaches by id to find tv show
const getByID = () => {     
    const TVShowId = document.querySelector("#TVShowId");


    axios.get(`${baseURL}/getShow/${TVShowId.value}`)
        .then(res => {

            const tvshow = res.data;


            renderTVShowId(tvshow);

         

        }).catch(err => console.log(err));

}

const tvshowIdSection = document.querySelector("#tvshowIdSection");  // renders the tvshow when searching by ID
const renderTVShowId = (tvshow) => {

    const newTVShow = document.createElement('div');
        newTVShow.classList.add("card");
    
        const tvshowName = document.createElement("h3");
        tvshowName.innerText = tvshow.name;
        tvshowName.classList.add("card-title");
        newTVShow.appendChild(tvshowName);

        const tvshowid = document.createElement("p");
        tvshowid.innerText = `ID: ${tvshow.id}`;
        tvshowid.classList.add("card-title");
        newTVShow.appendChild(tvshowid);
    
    
        const tvshowGenre = document.createElement("p");
        tvshowGenre.innerText = `Genre: ${tvshow.genre}`;
        tvshowGenre.classList.add("card-text");
        newTVShow.appendChild(tvshowGenre);
    
        const tvshowRating = document.createElement("p");
        tvshowRating.innerText = `Rating (Out of 10): ${tvshow.rating}`;
        tvshowRating.classList.add("card-text");
        newTVShow.appendChild(tvshowRating);
    
        const tvshowEpisodes = document.createElement("p");
        tvshowEpisodes.innerText = `Number of Episodes: ${tvshow.episodes}`;
        tvshowEpisodes.classList.add("card-text");
        newTVShow.appendChild(tvshowEpisodes);

    tvshowIdSection.appendChild(newTVShow);
}


document.querySelector("section#postSection >form").addEventListener('submit', (e) => {
    e.preventDefault(); // stops the form submitting in the default way

    const form = e.target;

    const data = {
        name: form.name.value,
        genre: form.genre.value,
        rating: form.rating.value,
        episodes: form.episodes.value
    }

    console.log("DATA: ", data);

    axios.post(`${baseURL}/createShow`, data)   // creates the show
        .then((res) => {
            console.log(res);
            getAllTVShows();
            displayCreateMessage(); // calls function to display an alert on screen
            form.reset(); //resets form
            form.name.focus(); // selects the name input
        }).catch(err => console.log(err));
});




    document.querySelector("section#putSection > form").addEventListener('submit', (e) => {
        e.preventDefault(); // stops the form submitting in the default way

        const form = e.target;
        const id = form.id.value


        const data = {
            id : form.id.value,
            name: form.name.value,
            genre: form.genre.value,
            rating: form.rating.value,
            episodes: form.episodes.value
        }

        axios.put(`${baseURL}/updateShow/${id}`,data)
        .then((res) => {
            console.log(res);
            getAllTVShows();
            displayupdateMessage();
            form.reset(); //resets form
            form.name.focus(); // selects the name input
        }).catch(err => console.log(err));  
        
});

getAllTVShows() ;
