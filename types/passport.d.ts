import "express-session";

declare global {
    namespace Express { //folder that you types into so they do not clash with types of other libaries
        interface User{
                    id: number;
                    name: string;
                    email:string;
                    password: string;
                    role: "user" | "admin";
        }
    }
}

interface AppUser{
                        id: number;
                        name: string;
                        email?:string;
                        password?: string;
        }

//idk

declare module "express-session" {
    interface SessionData {
        messages?: string[];
    }
}

export {};