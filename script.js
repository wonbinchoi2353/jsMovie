// 영화 랭킹 API 요청
let movie_data;
const options1 = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjdmNWM2OGZkY2VhMzJhYTZkOTEzZWE3YThlODNmZCIsInN1YiI6IjY0NzA5NDMzMTNhMzIwMDEzMzg2MGQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H6E-QYJymel6CZVaT0YDHYLWFIctLiVqU1Qv-7gNqe0'
    }
};

// fetch로 요청한 객체 가져오는 함수
// try catch로 에러가 났을 때를 대비하고 async await로 json으로 파싱한 데이터를 쓸 수 있게 한다.
async function getMovies() {
    let movieData;
    let movies;
    try {
        movieData = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options1)
        movies = await movieData.json();
    } catch (error) {
        console.log(movieData);
    }
    return movies;
}

// async await로 객체 쓸 수있게 만드는 함수
async function setMoives() {
    let movies = await getMovies();
    moviesRender(movies);
}
setMoives();


// 영화 이미지 API 요청
let img_data;
const options2 = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjdmNWM2OGZkY2VhMzJhYTZkOTEzZWE3YThlODNmZCIsInN1YiI6IjY0NzA5NDMzMTNhMzIwMDEzMzg2MGQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H6E-QYJymel6CZVaT0YDHYLWFIctLiVqU1Qv-7gNqe0'
    }
};

// fetch로 요청한 객체 가져오는 함수
// try catch로 에러가 났을 때를 대처하고 async await로 json으로 파싱한 데이터를 쓸 수 있게 한다.
async function getImgs() {
    let imgsData;
    let images;
    try {
        imgsData = await fetch('https://api.themoviedb.org/3/configuration', options2)
        // json 형태로 변환
        images = await imgsData.json();
    } catch (error) {
        console.log(imgsData);
    }
    return images;
}

// async await로 객체 쓸 수있게 만드는 함수
async function setImgs() {
    let images = await getImgs();
    imgsRender(images);
}
setImgs();

// 이미지 데이터
function imgsRender(images) {
    // base_url 가져오기
    let base_url = images.images.base_url;
    // 포스터 사이즈 가져오기
    let poster_sizes = images.images.poster_sizes[4];
    // console.log(base_url + poster_sizes);
    return base_url + poster_sizes;

    // 리턴값 다른 함수에서 어떻게 쓰는지 모르겠음
}
// let a = imgsRender(images)
// console.log(a)


// 영화 데이터
function moviesRender(movies) {
    movies.results.forEach((movie) => {
        // if () {}
        let card_id = movie.id;
        let poster_path = movie.poster_path;
        let title = movie.title;
        let overview = movie.overview;
        let vote_average = movie.vote_average;

        // 다른 함수의 리턴값 쓰기 모르겠음
        // let imgPath = images;
        // console.log(imgPath)
        // imgPath = imgPath + poster_path;

        let imgPath = "http://image.tmdb.org/t/p/w500" + poster_path;

        // 카드 복제
        cloneCard(card_id, imgPath, title, overview, vote_average);


        // 클릭하면 검색
        function idAlert(card_id) {
            let card = document.getElementById("card")
            card.addEventListener("click", function () {
                alert(card_id);
            });
        }
    });
}

// id값 경고창
idAlert(card_id);

function cloneCard(card_id, imgPath, title, overview, vote_average) {
    // section 선택
    let section = document.getElementById("grid");

    // card div의 요소 생성
    let setCard = document.createElement("div");
    let setImg = document.createElement("img");
    let setTitle = document.createElement("h3");
    let setOverview = document.createElement("p");
    let setVoteAvg = document.createElement("p");

    // section 하위 요소로 card 생성
    section.appendChild(setCard);

    // 각 요소의 class 설정
    section.setAttribute("class", "card-list");
    setCard.setAttribute("class", "movie-card");
    setCard.setAttribute("class", "movie-card");
    setCard.setAttribute("class", "movie-card");

    // 각 요소의 id 설정
    setCard.setAttribute("id", "card");
    setImg.setAttribute("id", "img");
    setTitle.setAttribute("id", "title");
    setOverview.setAttribute("id", "overview");
    setVoteAvg.setAttribute("id", "vote_average");

    // card 하위 요소로 img, h3, p, p 생성
    setCard.appendChild(setImg);
    setCard.appendChild(setTitle);
    setCard.appendChild(setOverview);
    setCard.appendChild(setVoteAvg);

    // card 요소의 이미지와 텍스트 변경
    setImg.setAttribute("src", imgPath);
    setTitle.textContent = title;
    setOverview.textContent = overview;
    setVoteAvg.textContent = "Rating: " + vote_average;

    // 카드의 id값 설정
    setCard.id = String(card_id);
}






// include





// // DOM api
// // `document.createElement(tagName)` : 새로운 HTML 요소를 생성합니다.
// // `document.getElementById(id)` : id 속성을 기준으로 요소를 선택합니다.
// // `document.getElementsByTagName(name)` : 태그 이름을 기준으로 요소를 선택합니다.
// // `document.getElementsByClassName(name)` : 클래스 이름을 기준으로 요소를 선택합니다.
// // `document.querySelector(selector)` : CSS 선택자를 이용하여 요소를 선택합니다.
// // `document.querySelectorAll(selector)` : CSS 선택자를 이용하여 모든 요소를 선택합니다.
// //  문서 객체 조작
// // `element.innerHTML` : 해당 요소 내부의 HTML 코드를 변경합니다.
// // `element.textContent` : 해당 요소 내부의 텍스트를 변경합니다.
// // `element.setAttribute(attr, value)` : 해당 요소의 속성 값을 변경합니다.
// // `element.getAttribute(attr)` : 해당 요소의 속성 값을 가져옵니다.
// // `element.style.property` : 해당 요소의 스타일 값을 변경합니다.
// // `element.appendChild(child)` : 해당 요소의 하위 요소로 child를 추가합니다.
// // `element.removeChild(child)` : 해당 요소의 하위 요소 중 child를 삭제합니다.
// // `element.classList.add(class)` : 해당 요소의 클래스에 새로운 클래스를 추가합니다.
// // `element.classList.remove(class)` : 해당 요소의 클래스 중에서 특정 클래스를 제거합니다.
// // `element.classList.toggle(class)` : 해당 요소의 클래스 중에서 특정 클래스를 추가 또는 제거합니다.
// //  이벤트 처리
// // `element.addEventListener(type, listener)` : 해당 요소에서 이벤트가 발생했을 때 호출할 함수를 등록합니다.
// // `element.removeEventListener(type, listener)` : 해당 요소에서 등록된 함수를 제거합니다.
// // `event.preventDefault()` : 이벤트가 발생했을 때 기본 동작을 취소합니다.
// // `event.stopPropagation()` : 이벤트의 버블링을 방지하기 위해 이벤트 전파를 중지합니다.
// //  기타
// // `window.location.href` : 현재 페이지의 URL을 가져옵니다.
// // `window.alert(message)` : 경고 메시지를 출력합니다.
// // `window.confirm(message)` : 확인 메시지를 출력하고 사용자의 답변에 따라 Boolean 값을 반환합니다.






// // // 카드 복제
// function cloneCard(card_id, img_path, title, overview, vote_average) {
//     // 원본 card 선택
//     let card = document.getElementById("card");
//     // 해당 node의 children 까지 복제
//     let copy = card.cloneNode(true);
//     // 카드 section 선택
//     let section = document.getElementById("grid");
//     // 해당 요소의 하위 요소로 copy 추가
//     section.appendChild(copy);

//     // 이미지, 제목, 설명, 평점 id를 선택
//     let chg_img = document.getElementById("img");
//     let chg_title = document.getElementById("title");
//     let chg_overview = document.getElementById("overview");
//     let chg_vote_average = document.getElementById("vote_average");

//     // 해당 요소 내부의 이미지, 텍스트 변경
//     chg_img.setAttribute("src", img_path);
//     chg_title.textContent = title;
//     chg_overview.textContent = overview;
//     chg_vote_average.textContent = "Rating: " + vote_average;

//     // 새로운 카드의 id 부여
//     copy.id = String(card_id);
// };


// // let element = document.createElement(div)