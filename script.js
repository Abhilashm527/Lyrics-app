const APIURL="https://api.lyrics.ovh/suggest/";
const APILYR="https://api.lyrics.ovh/";
const ultag=document.getElementById("listofSongs");
const form=document.getElementById("form");
const searchSong=document.getElementById("searchSong");
const result= document.getElementById("results");
async function getSong(data)
{
    const resp=await fetch(APIURL+data);
    const respData=await resp.json();
    displayData(respData);
}

function displayData(data)
{
    document.getElementById("results").innerHTML= `
    <ul class="songs">
    ${data.data.map(song=>`
        <li>
            <div>
                <strong>${song.artist.name}</strong>-${song.title}
            </div>
            <button data-artist="${song.artist.name}" data-songtitle="${song.title}">
                Get Lyrics
            </button>
        </li>
    `)
    .join('')}
    </ul>`;
}
    result.addEventListener("click", e=>{
        const clickedElement = e.target;
        if(clickedElement.tagName === 'BUTTON'){
            const artist= clickedElement.getAttribute('data-artist');
            const songTitle= clickedElement.getAttribute('data-songtitle');
            getLyrics(artist, songTitle);
        }
    })



form.addEventListener("click",(e)=>
{  
    e.preventDefault();
    const user=searchSong.value;
    if(user)
     getSong(user);
})

async function getLyrics(artist, songTitle){
    const response= await fetch(`${APILYR}/v1/${artist}/${songTitle}`);
    const data= await response.json();
    if(data.lyrics){
        const lyrics= data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
        result.innerHTML=`<h2 style="text-align:center;"><u><strong>${artist}</strong>-${songTitle}</u></h2>
        <p style="font-size:1.4rem; text-align:center; font-family: cursive;">${lyrics}</p>`;  
    } else{
        alert("Sorry Lyrics not found. Please try another link");
    }
     
}    
