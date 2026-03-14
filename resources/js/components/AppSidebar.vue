<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import {
    Bell,
    BookMarked,
    BookOpen,
    Briefcase,
    Calendar,
    File,
    FileStack,
    FileText,
    Folder,
    GraduationCap,
    HelpCircle,
    Home,
    Inbox,
    LayoutGrid,
    Mail,
    MapPin,
    Menu,
    Newspaper,
    Settings,
    Shield,
    Tag,
    UserCircle,
    Users,
    UsersRound,
} from 'lucide-vue-next';
import { computed } from 'vue';
import AppLogo from './AppLogo.vue';
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';

const iconMap = {
    Bell,
    BookMarked,
    BookOpen,
    Briefcase,
    Calendar,
    File,
    FileStack,
    FileText,
    Folder,
    GraduationCap,
    HelpCircle,
    Home,
    Inbox,
    LayoutGrid,
    Mail,
    MapPin,
    Menu,
    Newspaper,
    Settings,
    Shield,
    Tag,
    UserCircle,
    Users,
    UsersRound,
};

const page = usePage();
const mainNavItems = computed(() => {
    const menu = page.props.adminMenu || [];
    return menu.map((item) => ({
        ...item,
        icon: item.icon && iconMap[item.icon] ? iconMap[item.icon] : LayoutGrid,
    }));
});

const footerNavItems = [
    {
        title: 'Github Repo',
        href: 'https://github.com/laravel/vue-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#vue',
        icon: BookOpen,
    },
];
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="dashboard()">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <!-- <NavFooter :items="footerNavItems" /> -->
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
