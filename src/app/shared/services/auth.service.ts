import { Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import Swal from "sweetalert2";


export interface JWTPayload {
    exp: number;
    [key: string]: any;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private tokenKey = 'authToken';


    saveToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    clearToken(): void {
        localStorage.removeItem(this.tokenKey);
    }
    logOut(): void {
        this.clearToken();
    }

    //Logout on behlaf of time 

    getTokenExpiry(): number | null {
        const token = this.getToken();
        if (!token) return null;
        try {
            const decoded: JWTPayload = jwtDecode(token);
            return decoded.exp;
        }
        catch (err) {
            Swal.fire({
                title: 'Invalid Token',
                text: 'This is expired Token',
                icon: 'error',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        }
        return null;
    }

    isExpiredToken(): boolean {
        const expiry = this.getTokenExpiry();
        if (!expiry)
            return true;

        const now = Math.floor(Date.now() / 1000);
        return expiry < now;
    }
}