import { RouteType } from '@/autoCall/components/Interfaces/RouteType';

type Route = RouteType;

interface RolPermissions {
    [key: string]: {
      [route in Route]?: string[] | boolean;
    } & {
      home: string[];
    };
  }
  
export const RolPermissions: RolPermissions = {
    FrontEndUser: {
      home: ['read'],
      availables: ['create', 'read', 'update', 'delete'],
      users: ['create', 'read', 'update', 'delete'],
      clients: ['create', 'read', 'update', 'delete']
    },
    BackendUser: {
      home: ['read'],
      logcalls: ['read']
    },
    FullAccessUser: {
      home: ['read'],
      availables: ['create', 'read', 'update', 'delete'],
      users: ['create', 'read', 'update', 'delete'],
      clients: ['create', 'read', 'update', 'delete'],
      logcalls: ['read']
    },
    ReadOnlyFrontendUser: {
      home: ['read'],
      availables: ['read'],
      users: ['read'],
      clients: ['read']
    },
    AdminUser: {
      home: ['read'],
      availables: ['create', 'read', 'update', 'delete'],
      users: ['create', 'read', 'update', 'delete'],
      clients: ['create', 'read', 'update', 'delete'],
      logcalls: ['read'],
    }
  };
  