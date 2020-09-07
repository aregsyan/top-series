export default {
    mongodb: {
        host: process.env.MONGODB_HOST || 'localhost',
        port: process.env.MONGODB_PORT || '27017',
        user: process.env.MONGODB_USER || 'rwusr',
        password: process.env.MONGODB_PASSWORD || 'password',
        db: process.env.MONGODB_DB || 'top-series',
    },
    tmdb: {
        urls: {
            series_details: process.env.TMDB_SERIES_DETAILS_URL || 'https://api.themoviedb.org/3/tv/',
        },
        bearer_token: process.env.TMDB_BEARER_TOKEN || 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTM2ZGM1Mzc5MWJiOGFhNmEwODFlZjU2MTBhY2E4ZiIsInN1YiI6IjVmNTEwNTJlZmJhNjI1MDAzNTI4Yzk5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._vpJHqp1xuh5qDwUPagQ4T0GjczdW8WbQERXdjzJ8Wk',
    },
    app: {
        port: process.env.PORT || '3000',
    },
};
