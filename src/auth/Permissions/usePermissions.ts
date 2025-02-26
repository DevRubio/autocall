import { RouteType } from '@/autoCall/components/Interfaces/RouteType';
import Cookies from 'js-cookie';
import { useCallback, useMemo} from 'react';
import { RolPermissions } from './roles';


type Rol = keyof typeof RolPermissions;
type Route = RouteType;
type Action = 'create' | 'read' | 'update' | 'delete';


const memoizedUser = () => {
  const userCookie = Cookies.get('user');
  return useMemo(() => JSON.parse(userCookie || "null"), [userCookie]);
};

export const usePermissions = () => {
  const user = memoizedUser();

  const hasPermission = useCallback((route: Route, action: Action): boolean => {
    if (!user?.Rol) return false;   
   

    const allowedActions = RolPermissions[user.Rol]?.[route];
    return Array.isArray(allowedActions) ? allowedActions.includes(action) : false;
  }, [user?.Rol]);

  const canAccessRoute = useCallback((route: Route): boolean => {
    if (!user?.Rol) return false;
    return route === "/" || Object.keys(RolPermissions[user.Rol]).includes(route);
  }, [user?.Rol]);

  return useMemo(() => ({
    hasPermission,
    canAccessRoute
  }), [hasPermission, canAccessRoute]);
};

export type { Rol, Route, Action };