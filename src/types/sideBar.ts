export interface User {
    name: string;
    email: string;
    avatar: string;
}

interface BaseNavItem {
    title: string;
    badge?: string;
    icon?: React.ElementType;
}

export type NavLink = BaseNavItem & {
    url: string;
    items?: never;
};

export type NavCollapsible = BaseNavItem & {
    items: (BaseNavItem & { url: string })[];
    url?: never;
};

export type NavItem = NavLink | NavCollapsible;

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface SidebarData {
    user: User;
    navGroups: NavGroup[];
}
