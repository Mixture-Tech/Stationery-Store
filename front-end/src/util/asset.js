
/*
nhận dữ liệu từ backend -> dạng kiểu Json 
kiểu Json dạng [
            {
                "src": src,
                "title": title,
                "genre": year,
                "rating": rating,
                "subtitle": subtitle,
                "description": description,
                "episodes": episodes
            },{
                "src": src,
                "title": title,
                "genre": year,
                "rating": rating,
                "subtitle": subtitle,
                "description": description,
                "episodes": episodes
            }

        ]
đó là 1 array gồm các object
require: chúng ta sẽ có những topic riêng để quản lý những ảnh riêng: thể loại khác nhau
vì thế tui đang muốn là khi nhận được dữ liệu thì sẽ dựa vào genre để phân loại
tạo ra các biến khác nhau để lưu những object đó
 */
const actionMovies = [];
const romanceMovies = [];
const horrorMovies = [];
const comedyMovies = [];
const dramaMovies = [];

const infoMovies = (
    src,  title, genre, year, rating, subtitle, description, episodes
  ) => ({
      "src": src,
      "title": title,
      "genre": year,
      "rating": rating,
      "subtitle": subtitle,
      "description": description,
      "episodes": episodes
  });

// eslint-disable-next-line no-unused-vars
const categoriesMovies = (data) => {
    actionMovies.length = 0;
    romanceMovies.length = 0;
    horrorMovies.length = 0;
    comedyMovies.length = 0;
    dramaMovies.length = 0;

    data.forEach(movie => {
        const info = infoMovies(movie.src, movie.title, movie.genre, movie.year, movie.rating
                            , movie.subtitle, movie.description, movie.episodes);

        switch(movie.genre.toLowerCase()){
            case 'action': actionMovies.push(info);
                            break;
            case 'romance': romanceMovies.push(info);
                            break;
            case 'horror': horrorMovies.push(info);
                            break;
            case 'comedy': comedyMovies.push(info);
                            break;
            case 'drama': dramaMovies.push(info);
                            break;
        }
    });

};

// Export tất cả categories trong một object (để dễ quản lý)
export const movieCategories = {
    action: actionMovies,
    romance: romanceMovies,
    horror: horrorMovies,
    comedy: comedyMovies,
    drama: dramaMovies
};
export const getMoviesByGenre = (genre) => {
    return movieCategories[genre.toLowerCase()] || [];
};

export const getAllMovies = () => {
    return [...actionMovies, ...romanceMovies, ...horrorMovies, ...comedyMovies, ...dramaMovies];
};

// Thêm các functions để filter hoặc sort nếu cần
export const getTopRatedMovies = (genre) => {
    const movies = getMoviesByGenre(genre);
    return [...movies].sort((a, b) => b.rating - a.rating);
};

export const getLatestMovies = (genre) => {
    const movies = getMoviesByGenre(genre);
    return [...movies].sort((a, b) => b.year - a.year);
};

