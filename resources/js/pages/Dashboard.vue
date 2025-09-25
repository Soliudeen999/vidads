<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/vue3';
import { Plus, Video, Play, Edit } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const props = defineProps<{
    videos: Array<{
        id: number;
        title: string;
        description: string;
        thumbnail_url: string;
        source_type: string;
        source_url: string;
        duration: number;
        is_published: boolean;
        created_at: string;
    }>;
}>();

// Utility functions for thumbnails and duration
const extractYouTubeVideoId = (url: string) => {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
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
};

</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
            <!-- Header Section -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Interactive Videos</h1>
                    <p class="text-muted-foreground">
                        Create engaging videos with interactive elements
                    </p>
                </div>
                <Link href="/videos/create">
                    <Button class="gap-2">
                        <Plus class="h-4 w-4" />
                        Create Interactive Video
                    </Button>
                </Link>
            </div>

            <!-- Quick Actions -->
            <div class="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Videos</CardTitle>
                        <Video class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ props.videos.length || 0 }}</div>
                        <p class="text-xs text-muted-foreground">
                            Interactive videos created
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Published</CardTitle>
                        <Play class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            {{ props.videos.filter((v: any) => v.is_published).length || 0 }}
                        </div>
                        <p class="text-xs text-muted-foreground">
                            Videos ready to share
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">In Progress</CardTitle>
                        <Edit class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            {{ props.videos.filter(v => !v.is_published).length || 0 }}
                        </div>
                        <p class="text-xs text-muted-foreground">
                            Videos being edited
                        </p>
                    </CardContent>
                </Card>
            </div>

            <!-- Recent Videos -->
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-semibold">Recent Videos</h2>
                    <Link href="/videos" class="text-sm text-primary hover:underline">
                        View all
                    </Link>
                </div>

                <div v-if="props.videos.length" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card v-for="video in props.videos.slice(0, 6)" :key="video.id" class="overflow-hidden">
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
                        <CardContent class="pt-0">
                            <div class="flex items-center justify-between">
                                <span class="text-xs text-muted-foreground">
                                    {{ new Date(video.created_at).toLocaleDateString() }}
                                </span>
                                <div class="flex gap-2">
                                    <Link :href="`/videos/${video.id}/edit`">
                                        <Button variant="outline" size="sm">
                                            <Edit class="h-3 w-3" />
                                        </Button>
                                    </Link>
                                    <Link :href="`/videos/${video.id}/preview`">
                                        <Button variant="outline" size="sm">
                                            <Play class="h-3 w-3" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div v-else class="text-center py-12">
                    <Video class="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 class="mt-4 text-lg font-semibold">No videos yet</h3>
                    <p class="text-muted-foreground">Get started by creating your first interactive video</p>
                    <Link href="/videos/create" class="mt-4 inline-block">
                        <Button>Create Your First Video</Button>
                    </Link>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
