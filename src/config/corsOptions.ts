import allowedOrigins from "./allowedOrigins"

/*
!origin is undefined, we use it  when we are working 
on our computer(localhost shown in undifind), make sure 
to delete that when we are hosting it on a server. 
*/
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

export default corsOptions;