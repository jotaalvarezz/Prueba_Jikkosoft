import cors from "cors";

export const corsMiddleware = (baseUrl) =>
  cors({
    origin: (origin, callback) => {
      const DOMAINS = baseUrl;

      if (DOMAINS.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("No tiene permisos para acceder a esta Api"));
      }
    },
  });
