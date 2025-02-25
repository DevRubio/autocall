import Cookies from 'js-cookie';
import { useCallback, useMemo } from 'react';

type Rol = keyof typeof RolPermissions;
type Route = keyof RoutePermissions;
type Action = 'create' | 'read' | 'update' | 'delete' | 'reset_password';

interface RoutePermissions {
  [key: string]: string[] | boolean;
}

interface RolPermissions {
  [key: string]: {
    [route: string]: string[] | boolean;
  };
}


const RolPermissions: RolPermissions = {
  FrontEndUser: {
    availables: ['create', 'read', 'update', 'delete'],
    users: ['create', 'read', 'update', 'delete'],
    clients: ['create', 'read', 'update', 'delete']
  },
  BackendUser: {
    logcalls: ['read']
  },
  FullAccessUser: {
    availables: ['create', 'read', 'update', 'delete'],
    users: ['create', 'read', 'update', 'delete'],
    clients: ['create', 'read', 'update', 'delete'],
    logcalls: ['read']
  },
  ReadOnlyFrontendUser: {
    availables: ['read'],
    users: ['read'],
    clients: ['read']
  },
  AdminUser: {
    availables: ['create', 'read', 'update', 'delete'],
    users: ['create', 'read', 'update', 'delete'],
    clients: ['create', 'read', 'update', 'delete'],
    logcalls: ['read'],
    reset_password: true
  }
};


const memoizedUser = () => {
  const userCookie = Cookies.get('user');
  return useMemo(() => JSON.parse(userCookie || "null"), [userCookie]);
};

export const usePermissions = () => {
  const user = memoizedUser();

  const hasPermission = useCallback((route: Route, action: Action): boolean => {
    if (!user?.Rol) return false;
    
    if (action === 'reset_password') {
      return user.Rol === 'AdminUser' && !!RolPermissions[user.Rol][route];
    }

    const allowedActions = RolPermissions[user.Rol]?.[route];
    return Array.isArray(allowedActions) ? allowedActions.includes(action) : false;
  }, [user?.Rol]);

  const canAccessRoute = useCallback((route: Route): boolean => {
    if (!user?.Rol) return false;
    return Object.keys(RolPermissions[user.Rol]).includes(String(route));
  }, [user?.Rol]);

  return useMemo(() => ({
    hasPermission,
    canAccessRoute
  }), [hasPermission, canAccessRoute]);
};


export type { Rol, Route, Action };