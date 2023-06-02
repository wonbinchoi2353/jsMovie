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

// async await로 객체 쓸 수 있게 만드는 함수
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
}


// 검색 input
let searchInput = document.getElementById("search-input")
// 검색 버튼
let searchBtn = document.getElementById("search-btn")

// 이 부분 혼자서 한 번 보고 다시 만들어보기(튜터님이 구현)
searchBtn.addEventListener("click", async () => {
    document.getElementById("grid").innerHTML = "";
    const serachInput = searchInput.value;

    let movies = await getMovies();
    movies = movies.results;
    movies.results = movies.filter(movie => movie.original_title.includes(serachInput))
    moviesRender(movies);
});


// 영화 데이터
async function moviesRender(movies) {
    // getImgs에서 객체 가져오기
    let images = await getImgs()
    let image = imgsRender(images)
    // movies 배열 순회하면서 원하는 데이터 변수에 저장
    movies.results.forEach((movie) => {
        // if () {} include, filter
        let card_id = movie.id;
        let poster_path = movie.poster_path;
        let title = movie.title;
        let overview = movie.overview;
        let vote_average = movie.vote_average;
        let imgPath = image + poster_path;

        // 카드 생성
        cloneCard(card_id, imgPath, title, overview, vote_average);
    });

    // 이 부분 혼자서 한 번 보고 다시 만들어보기(튜터님이 구현)
    // 카드를 클릭했을때 alert을 뛰우는 기능
    // 1. 내가 카드를 선택해야한다.
    // 2. 선택한 카드에 클릭이벤트를 걸어야한다
    // 3. 클릭이 되었을때 alert을 뛰워야한다.
    let cards = document.querySelectorAll(".movie-card");
    console.log(cards)
    cards.forEach(card => {
        card.addEventListener("click", function (event) {
            console.log(event.currentTarget)
            console.dir(event.currentTarget)
            alert(event.currentTarget.id)
        });
    });
};

// 카드 생성
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

// 카드 업데이트
// function cardsRender(movies) {
//     let b = document.querySelector('.card_list')
//     b.innerHTML = '';
// }