import { types } from '../types/types.ts';

interface User {
    Rol: string;
    user: string;
    Token: string;
  }

interface AuthState {
    logged: boolean;
    user?: User | null;
    token?: string | null;
}

interface AuthAction {
    type: string;
    payload?: { user: User };
}

export const authReducer = (state: AuthState = { logged: false, user: null }, action: AuthAction): AuthState => {
    switch(action.type) {
        case types.login:
            return {
                ...state,
                logged: true,
                user: action.payload?.user || null,
                token: action.payload?.user.Token || null,
            };

        case types.logout:
            return {
                logged: false,
                user: null,
                token: null,
            };

        default:
            return state;
    }
};
