const movies = [
  {
    id: '1',
    title: 'Oceans 8',
    category: 'Comedy',
    img_url:
      'https://m.media-amazon.com/images/M/MV5BMjAyNDEyMzc4Ml5BMl5BanBnXkFtZTgwMjEzNjM0NTM@._V1_.jpg',

    likes: 4,
    dislikes: 1,
  },
  {
    id: '2',
    title: 'Midnight Sun',
    category: 'Comedy',
    img_url:
      'https://m.media-amazon.com/images/M/MV5BMjg0NjU1MjgyNF5BMl5BanBnXkFtZTgwNzc5NjYyNDM@._V1_.jpg',

    likes: 2,
    dislikes: 0,
  },
  {
    id: '3',
    title: 'Les indestructibles 2',
    category: 'Animation',
    img_url:
      'https://media.services.cinergy.ch/media/box1600/1910831fe84d3e5cfb00edfe099cdb65bde4beca.jpg',

    likes: 3,
    dislikes: 1,
  },
  {
    id: '4',
    title: 'Sans un bruit',
    category: 'Thriller',
    img_url:
      'https://fr.web.img3.acsta.net/pictures/18/03/22/16/48/2454348.jpg',

    likes: 6,
    dislikes: 6,
  },
  {
    id: '5',
    title: 'Creed II',
    category: 'Drame',
    img_url:
      'https://m.media-amazon.com/images/M/MV5BYmEyNWZhM2YtZDAyNi00ZjYzLWI2ZWMtOWM4ZmI1MDE0OWNmXkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_.jpg',

    likes: 16,
    dislikes: 2,
  },
  {
    id: '6',
    title: 'Pulp Fiction',
    category: 'Thriller',
    img_url: 'https://image.posterlounge.com/images/l/1895909.jpg',

    likes: 11,
    dislikes: 3,
  },
  {
    id: '7',
    title: 'Pulp Fiction',
    category: 'Thriller',
    img_url: 'https://image.posterlounge.com/images/l/1895909.jpg',

    likes: 12333,
    dislikes: 32,
  },
  {
    id: '8',
    title: 'Seven',
    category: 'Thriller',
    img_url:
      'https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg',

    likes: 2,
    dislikes: 1,
  },
  {
    id: '9',
    title: 'Inception',
    category: 'Thriller',
    img_url:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg',

    likes: 2,
    dislikes: 1,
  },
  {
    id: '10',
    title: 'Gone Girl',
    category: 'Thriller',
    img_url:
      'https://m.media-amazon.com/images/M/MV5BMTk0MDQ3MzAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_FMjpg_UX1000_.jpg',

    likes: 22,
    dislikes: 12,
  },
];

export const movies$ = new Promise((resolve, reject) =>
  setTimeout(resolve, 100, movies)
);
