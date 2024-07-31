import { httpService } from "@/providers";
export class UserService {
    sendCode = (data: any) => {
        return httpService.GET("/user/sendCode", data, true);
    };
    register = (data: any) => {
        return httpService.POST("/user/register", data, true);
    };

    restPassword = (data: any) => {
        return httpService.PUT("/user/restPassword", data, true);
    };
    login= (data: any) => {
        return httpService.POST("/user/login", data, true);
    };
    logout=()=>{
        return httpService.POST("/user/logout", {},true);
    }
    checkLogin=()=> {
        return httpService.POST("/user/checkLogin", {},true);
    }
}
export const userService= new UserService();
