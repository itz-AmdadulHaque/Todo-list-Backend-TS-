import allowedOrigins from "./allowedOrigins"

/*
!origin is undefined, we use it  when we are working 
on our computer(localhost shown in undifind), make sure 
to delete that when we are hosting it on a server. 
*/
const corsOptions = {
    origin: (origin: unknown, callback: (error: Error | null, success: boolean) => void) => {
      if (typeof origin === "string" && (allowedOrigins.indexOf(origin) !== -1 || !origin)) {
        callback(null, true); // Provide both error (null) and success (true) arguments
      } else {
        callback(new Error("Not allowed by CORS"), false); // Provide an error and indicate failure
      }
    },
    optionsSuccessStatus: 200,
  };
  
  export default corsOptions;