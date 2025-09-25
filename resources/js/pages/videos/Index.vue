<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/vue3';
import { dashboard } from '@/routes';
import videoRoutes from '@/routes/videos';
import { Plus, Video, Play, Edit, Eye } from 'lucide-vue-next';
import { computed } from 'vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard.url(),
    },
    {
        title: 'Videos',
        href: videoRoutes.index.url(),
    },
];

const props = defineProps<{
    videos: {
        data: Array<{
            id: number;
            title: string;
            description: string;
            thumbnail_url: string;
            source_type: string;
            source_url: string;
            duration: number;
            is_published: boolean;
            created_at: string;
            updated_at: string;
        }>;
        links: any;
        current_page: number;
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
}>();


// YouTube utility functions
const extractYouTubeVideoId = (url: string) => {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            return match[1];
        }
    }
    return null;
};

const getYouTubeThumbnail = (url: string) => {
    const videoId = extractYouTubeVideoId(url);
    if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return null;
};

const formatDuration = (seconds: number) => {
    if (!seconds) return 'Unknown';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

const handleThumbnailError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    // The fallback div will show instead
};

// Pagination helper computed property
const visiblePages = computed(() => {
    if (!props.videos?.current_page) {
        return [];
    }

    const currentPage = props.videos.current_page;
    const lastPage = props.videos.last_page;
    const pages = [];

    // Show pages around current page (2 pages before and after)
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(lastPage, currentPage + 2);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
});
</script>

<template>
    <Head title="My Videos" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">My Videos</h1>
                    <p class="text-muted-foreground">
                        Manage your interactive videos
                    </p>
                </div>
                <Link :href="videoRoutes.create.url()">
                    <Button class="gap-2">
                        <Plus class="h-4 w-4" />
                        Create Video
                    </Button>
                </Link>
            </div>

            <!-- Videos Grid -->
            <div v-if="videos?.data?.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card v-for="video in videos?.data" :key="video.id" class="overflow-hidden">
                    <div class="aspect-video bg-muted relative">
                        <img
                            v-if="video.thumbnail_url || (video.source_type === 'youtube' && video.source_url)"
                            :src="video.thumbnail_url || getYouTubeThumbnail(video.source_url) || ''"
                            :alt="video.title"
                            class="h-full w-full object-cover"
                            @error="handleThumbnailError"
                        />
                        <div v-else class="flex h-full w-full items-center justify-center">
                            <Video class="h-8 w-8 text-muted-foreground" />
                        </div>

                        <!-- Status Badge -->
                        <div class="absolute top-2 right-2">
                            <Badge :variant="video.is_published ? 'default' : 'secondary'">
                                {{ video.is_published ? 'Published' : 'Draft' }}
                            </Badge>
                        </div>

                        <!-- Duration Badge -->
                        <div v-if="video.duration" class="absolute bottom-2 right-2">
                            <Badge variant="secondary" class="bg-black bg-opacity-75 text-white">
                                {{ formatDuration(video.duration) }}
                            </Badge>
                        </div>
                    </div>

                    <CardHeader>
                        <CardTitle class="line-clamp-1">{{ video.title }}</CardTitle>
                        <CardDescription class="line-clamp-2">
                            {{ video.description || 'No description' }}
                        </CardDescription>
                    </CardHeader>

                    <CardContent class="space-y-4">
                        <div class="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{{ video.source_type === 'youtube' ? 'YouTube' : 'Upload' }}</span>
                            <span>{{ formatDuration(video.duration) }}</span>
                        </div>

                        <div class="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Created</span>
                            <span>{{ new Date(video.created_at).toLocaleDateString() }}</span>
                        </div>

                        <div class="flex gap-2">
                            <Link :href="videoRoutes.edit.url({ video: video.id })" class="flex-1">
                                <Button variant="outline" size="sm" class="w-full gap-2">
                                    <Edit class="h-3 w-3" />
                                    Edit
                                </Button>
                            </Link>

                            <Link :href="videoRoutes.preview.url({ video: video.id })">
                                <Button variant="outline" size="sm" class="gap-2">
                                    <Play class="h-3 w-3" />
                                    Preview
                                </Button>
                            </Link>

                            <Link :href="videoRoutes.show.url({ video: video.id })">
                                <Button variant="outline" size="sm">
                                    <Eye class="h-3 w-3" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Pagination Info -->
            <div v-if="videos?.data?.length && videos?.last_page > 1" class="flex items-center justify-between text-sm text-muted-foreground">
                <div>
                    Showing {{ videos.from }} to {{ videos.to }} of {{ videos.total }} videos
                </div>
                <div>
                    Page {{ videos.current_page }} of {{ videos.last_page }}
                </div>
            </div>

            <!-- Pagination -->
            <div v-if="videos?.data?.length && videos?.last_page > 1" class="flex justify-center">
                <nav class="flex items-center space-x-1">
                    <!-- Previous Button -->
                    <Link
                        v-if="videos.prev_page_url"
                        :href="videos.prev_page_url"
                        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                        <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Previous
                    </Link>
                    <span v-else class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background h-10 px-4 py-2 opacity-50 cursor-not-allowed">
                        <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Previous
                    </span>

                    <!-- First page -->
                    <Link
                        v-if="videos?.current_page > 3"
                        :href="videos.first_page_url"
                        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
                    >
                        1
                    </Link>

                    <!-- Ellipsis after first page -->
                    <span v-if="videos?.current_page > 4" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 w-10">
                        ...
                    </span>

                    <!-- Page numbers around current page -->
                    <template v-for="page in visiblePages" :key="page">
                        <Link
                            :href="videoRoutes.index.url() + `?page=${page}`"
                            :class="[
                                'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10',
                                page === videos?.current_page
                                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                    : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                            ]"
                        >
                            {{ page }}
                        </Link>
                    </template>

                    <!-- Ellipsis before last page -->
                    <span v-if="videos?.current_page < videos?.last_page - 3" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 w-10">
                        ...
                    </span>

                    <!-- Last page -->
                    <Link
                        v-if="videos?.current_page < videos?.last_page - 2"
                        :href="videos.last_page_url"
                        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
                    >
                        {{ videos?.last_page }}
                    </Link>

                    <!-- Next Button -->
                    <Link
                        v-if="videos.next_page_url"
                        :href="videos.next_page_url"
                        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                        Next
                        <svg class="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </Link>
                    <span v-else class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background h-10 px-4 py-2 opacity-50 cursor-not-allowed">
                        Next
                        <svg class="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </span>
                </nav>
            </div>

            <!-- Empty State -->
            <div v-else-if="!videos?.data?.length" class="text-center py-12">
                <Video class="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 class="mt-4 text-lg font-semibold">No videos yet</h3>
                <p class="text-muted-foreground">Get started by creating your first interactive video</p>
                <Link :href="videoRoutes.create.url()" class="mt-4 inline-block">
                    <Button class="gap-2">
                        <Plus class="h-4 w-4" />
                        Create Your First Video
                    </Button>
                </Link>
            </div>
        </div>
    </AppLayout>
</template>
