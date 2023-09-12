import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
//let simpleLightBox;

// let lightbox  = new SimpleLightbox(".js-movie-list a", {
//   captionsData: "alt",
//   captionDelay: 250,
//   captionPosition: "bottom",
// });


 // fetch(`${BASE_URL}/search?query=people&${1}`, {
//   headers: {
//     Authorization: API_KEY,
//   },
// }).then(response => {
//   return response.json();
// })
// .then (data => {
//   console.log(data.photos[1].src.medium);
// })
//Базоовый код ниже, выше пробный запрос(проверка)
// import { BASE_URL, API_KEY } from './api'

const filmListEl = document.querySelector(".js-movie-list");


let page = 1;
const simpleLightBox = new SimpleLightbox('.js-movie-list a');
const renderList = (arr, container) => {
  
  const markup = arr
    .map(
      (item) => `<li class="movie-card"><a class="gallery__link" href="${item.src.large}">
    <img src="${item.src.medium}"alt="photo id:${item.id}"/><div class="movie-info"><p>photographer: ${item.photographer}</p></div></a></li>`)
    .join("");
    simpleLightBox.refresh()
  container.insertAdjacentHTML("beforeend", markup);
};

// // *********************** Кнопка "Load More" ************************** \\
// const loadMoreEl = document.querySelector(".js-load-more");

// const fetchFilms = (page) => {
//   return fetch(`${BASE_URL}/search?query=people&page=${page}`,{
//     headers: {
//       Authorization: API_KEY,
//     },
//   })
//     .then((res) => {
//       if (res.status === 200) {
//         return res.json();
//       }
//       throw new Error(res.statusText);
//     })
//     .then((res) => {
//       loadMoreEl.classList.replace("load-more-hidden", "load-more");

//       if (res.page === res.total_pages) {
//         loadMoreEl.classList.replace("load-more", "load-more-hidden");
//       }
//       return res; 
//     });
// };
//*Ниже 2 строки проверка 
//fetchFilms(page).then (data => {
     //console.log(data.photos)});
// const loadMoreHandler = () => {
//   page += 1;
//    fetchFilms(page).then((res) => renderList(res.photos, filmListEl));
// };
// fetchFilms(page).then((res) => renderList(res.photos, filmListEl));
// loadMoreEl.addEventListener("click", loadMoreHandler);

// ********************************Infinity scroll ********************** \\

// const guardEl = document.querySelector(".js-guard");
// const options = {
//   root: null,
//   rootMargin: "300px",
//   threshold: 0,
// };

// const handleIntersection = (entries, observer) => {
//   //   console.log(entries);
//   //   console.log(observer);
//   entries.forEach((intersection) => {
//     if (intersection.isIntersecting) {
//       page += 1;

//       fetchFilms(page)
//         .then((res) => {
//           if (res.page === res.total_pages) {
//             observer.unobserve(intersection.target);
//           }
//         })
//         .catch((err) => console.log(err));
//     }
//   });
// };

// const observer = new IntersectionObserver(handleIntersection, options);

// const fetchFilms = (page) => {
//   return fetch(`${BASE_URL}/search?query=people&page=${page}`,{
//     headers: {
//       Authorization: API_KEY,
//     },
//   })
//     .then((res) => {
//       if (res.status === 200) {
//         return res.json();
//       }
//       throw new Error(res.statusText);
//     })
//     .then((res) => {
//       renderList(res.photos, filmListEl);
//       return res;
//     });
// };

// fetchFilms(page)
//   .then(() => {
//     observer.observe(guardEl);
//   })
//   .catch((err) => console.log(err));

//***axios */
import axios from "axios";

axios.defaults.headers.common['Authorization'] = "RUutV9o6Wsaxt6MdwROcNBNPiyCS3A3gcUpA2RtcIDURKF9e1pdE1bDF";
axios.defaults.baseURL = "https://api.pexels.com/v1"

    //  axios.get(`/search?query=people&page=${page}`)
    //     .then(response => {
    //         console.log(response.data); 
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })  
        
  const guardEl = document.querySelector(".js-guard");
const options = {
  root: null,
  rootMargin: "300px",
  threshold: 0,
};

const handleIntersection = (entries, observer) => {
  //   console.log(entries);
  //   console.log(observer);
  entries.forEach((intersection) => {
    if (intersection.isIntersecting) {
      page += 1;
     
      fetchFilms(page)
        .then((res) => {
          if (res.page === res.total_pages) {
            observer.unobserve(intersection.target);
          }
        })
        .catch((err) => console.log(err));
    }
  });
};

const observer = new IntersectionObserver(handleIntersection, options);

const fetchFilms = (page) => {
  return axios.get(`/search?query=Tigers&page=${page}&per_page=10`)
  //     .then(response => {
  //         console.log(response.data); 
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      throw new Error(res.statusText);
    })
    .then((res) => {
      renderList(res.photos, filmListEl);
      
      return res;
    });
};

fetchFilms(page)
  .then(() => {
    observer.observe(guardEl);
  })
  .catch((err) => console.log(err));

  
  
