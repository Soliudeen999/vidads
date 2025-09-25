<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/vue3';
import { dashboard } from '@/routes';
import videos from '@/routes/videos';
import { toast } from 'vue3-toastify';
import {
    ArrowLeft,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Settings,
    Maximize,
    RotateCcw,
    Share2,
    Heart,
    MessageCircle,
    ThumbsUp,
    ExternalLink
} from 'lucide-vue-next';
import { ref, computed, onMounted, onUnmounted } from 'vue';

// YouTube API types
declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard.url(),
    },
    {
        title: 'Videos',
        href: videos.index.url(),
    },
    {
        title: 'View Video',
        href: '#',
    },
];

const props = defineProps<{
    video: {
        id: number;
        title: string;
        description: string;
        source_type: string;
        source_url: string;
        video_path: string;
        thumbnail_url: string;
        duration: number;
        is_published: boolean;
        created_at: string;
        updated_at: string;
        interactive_elements: Array<{
            id: number;
            type: string;
            name: string;
            content: any;
            position: any;
            styling: any;
            start_time: number;
            end_time: number;
            duration: number;
            animation: any;
            interaction: any;
            is_active: boolean;
            z_index: number;
        }>;
    };
}>();

// Toast notifications

// Video player state
const videoRef = ref<HTMLVideoElement | null>(null);
const youtubePlayer = ref<any>(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);
const isMuted = ref(false);
const isFullscreen = ref(false);
const isYouTube = ref(false);

// YouTube URL conversion with API support
const getYouTubeEmbedUrl = (url: string) => {
    const videoId = extractYouTubeVideoId(url);
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}&autoplay=0&controls=1&showinfo=0&rel=0&modestbranding=1&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=0`;
    }
    return url;
};


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

const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        isFullscreen.value = true;
        toast.info('Entered fullscreen');
    } else {
        document.exitFullscreen();
        isFullscreen.value = false;
        toast.info('Exited fullscreen');
    }
};

// Video event handlers
const onTimeUpdate = () => {
    if (!videoRef.value) return;
    currentTime.value = videoRef.value.currentTime;
};

const onLoadedMetadata = () => {
    if (!videoRef.value) return;
    duration.value = videoRef.value.duration;
    toast.success(`Video loaded: ${formatTime(duration.value)}`);
};

const onEnded = () => {
    isPlaying.value = false;
    toast.info('Video ended');
};

// Computed properties
const visibleElements = computed(() => {
    return props.video.interactive_elements.filter(element =>
        element.is_active &&
        currentTime.value >= element.start_time &&
        currentTime.value <= (element.end_time || element.start_time + element.duration)
    );
});

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Interactive element handlers
const handleElementClick = (element: any) => {
    toast.info(`Clicked ${element.name || element.type} element`);

    // Handle different interaction types
    if (element.interaction?.onClick === 'popup') {
        toast.info(`Popup: ${element.content.text || element.content.question || 'Interactive element'}`);
    } else if (element.interaction?.onClick === 'redirect' && element.content.url) {
        window.open(element.content.url, '_blank');
        toast.info('Opened external link');
    } else if (element.interaction?.onClick === 'subscribe') {
        toast.success('Subscribed to channel!');
    } else if (element.interaction?.onClick === 'like') {
        toast.success('Liked the video!');
    } else if (element.interaction?.onClick === 'share') {
        toast.info('Share functionality would be implemented here');
    }
};

const handleElementHover = (element: any) => {
    // Add hover effects or tooltips
    console.log(`Hovering over ${element.name || element.type}`);
};

// Social actions
const handleLike = () => {
    toast.success('Liked the video!');
};

const handleShare = () => {
    if (navigator.share) {
        navigator.share({
            title: props.video.title,
            text: props.video.description,
            url: window.location.href,
        }).then(() => {
            toast.success('Video shared successfully!');
        }).catch(() => {
            toast.error('Failed to share video');
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            toast.success('Video link copied to clipboard!');
        }).catch(() => {
            toast.error('Failed to copy link');
        });
    }
};

const handleComment = () => {
    toast.info('Comment functionality would be implemented here');
};

// YouTube API integration
const initializeYouTubeAPI = () => {
    if (typeof window !== 'undefined' && window.YT && window.YT.Player) {
        const videoId = extractYouTubeVideoId(props.video.source_url);
        if (videoId) {
            youtubePlayer.value = new window.YT.Player('youtube-player', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    'autoplay': 0,
                    'controls': 1,
                    'showinfo': 0,
                    'rel': 0,
                    'modestbranding': 1,
                    'fs': 1,
                    'cc_load_policy': 0,
                    'iv_load_policy': 3,
                    'autohide': 0,
                    'enablejsapi': 1,
                    'origin': window.location.origin
                },
                events: {
                    'onReady': onYouTubeReady,
                    'onStateChange': onYouTubeStateChange,
                    'onError': onYouTubeError
                }
            });
        }
    }
};

const onYouTubeReady = (event: any) => {
    duration.value = event.target.getDuration();
    isYouTube.value = true;
    startTimePolling();
};

const onYouTubeStateChange = (event: any) => {
    const state = event.data;
    if (state === window.YT.PlayerState.PLAYING) {
        isPlaying.value = true;
        toast.success('Video started playing');
    } else if (state === window.YT.PlayerState.PAUSED) {
        isPlaying.value = false;
        toast.info('Video paused');
    } else if (state === window.YT.PlayerState.ENDED) {
        isPlaying.value = false;
        toast.info('Video ended');
    }
};

const onYouTubeError = (event: any) => {
    toast.error('YouTube video failed to load');
    console.error('YouTube error:', event);
};

// Time polling for YouTube videos
let timePollingInterval: NodeJS.Timeout | null = null;

const startTimePolling = () => {
    if (timePollingInterval) {
        clearInterval(timePollingInterval);
    }

    timePollingInterval = setInterval(() => {
        if (youtubePlayer.value && youtubePlayer.value.getCurrentTime) {
            currentTime.value = youtubePlayer.value.getCurrentTime();
        }
    }, 100); // Update every 100ms for smooth element transitions
};

const stopTimePolling = () => {
    if (timePollingInterval) {
        clearInterval(timePollingInterval);
        timePollingInterval = null;
    }
};

// Enhanced video player controls
const togglePlay = () => {
    if (isYouTube.value && youtubePlayer.value) {
        if (isPlaying.value) {
            youtubePlayer.value.pauseVideo();
        } else {
            youtubePlayer.value.playVideo();
        }
    } else if (videoRef.value) {
        if (isPlaying.value) {
            videoRef.value.pause();
            isPlaying.value = false;
            toast.info('Video paused');
        } else {
            videoRef.value.play().then(() => {
                isPlaying.value = true;
                toast.success('Video started playing');
            }).catch((error) => {
                toast.error('Failed to play video');
                console.error('Play error:', error);
            });
        }
    }
};

const seekTo = (time: number) => {
    if (isYouTube.value && youtubePlayer.value) {
        youtubePlayer.value.seekTo(time, true);
        currentTime.value = time;
        toast.info(`Seeked to ${formatTime(time)}`);
    } else if (videoRef.value) {
        videoRef.value.currentTime = time;
        currentTime.value = time;
        toast.info(`Seeked to ${formatTime(time)}`);
    }
};

const updateVolume = (newVolume: number) => {
    if (isYouTube.value && youtubePlayer.value) {
        youtubePlayer.value.setVolume(newVolume * 100);
        volume.value = newVolume;
        isMuted.value = newVolume === 0;
        toast.info(`Volume set to ${Math.round(newVolume * 100)}%`);
    } else if (videoRef.value) {
        videoRef.value.volume = newVolume;
        volume.value = newVolume;
        isMuted.value = newVolume === 0;
        toast.info(`Volume set to ${Math.round(newVolume * 100)}%`);
    }
};

const toggleMute = () => {
    if (isYouTube.value && youtubePlayer.value) {
        if (isMuted.value) {
            youtubePlayer.value.unMute();
            isMuted.value = false;
            toast.info('Volume unmuted');
        } else {
            youtubePlayer.value.mute();
            isMuted.value = true;
            toast.info('Volume muted');
        }
    } else if (videoRef.value) {
        if (isMuted.value) {
            videoRef.value.volume = volume.value;
            isMuted.value = false;
            toast.info('Volume unmuted');
        } else {
            videoRef.value.volume = 0;
            isMuted.value = true;
            toast.info('Volume muted');
        }
    }
};

const restartVideo = () => {
    if (isYouTube.value && youtubePlayer.value) {
        youtubePlayer.value.seekTo(0, true);
        currentTime.value = 0;
        toast.info('Video restarted');
    } else if (videoRef.value) {
        videoRef.value.currentTime = 0;
        currentTime.value = 0;
        toast.info('Video restarted');
    }
};

const handleProgressClick = (event: MouseEvent) => {
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration.value;

    seekTo(newTime);
};

onMounted(() => {
    // Check if this is a YouTube video
    isYouTube.value = props.video.source_type === 'youtube';

    // Load YouTube API if needed
    if (isYouTube.value) {
        if (typeof window !== 'undefined' && window.YT && window.YT.Player) {
            initializeYouTubeAPI();
        } else {
            // Load YouTube API
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

            // Set up global callback
            window.onYouTubeIframeAPIReady = () => {
                initializeYouTubeAPI();
            };
        }
    }
});

// Get image source for element based on source type
const getElementImageSrc = (element: any) => {
    if (element.type !== 'image') return '';

    // Handle new structure with sourceType
    if (element.content?.sourceType === 'upload' && element.content?.uploadedFile) {
        return element.content.uploadedFile; // Base64 data
    } else if (element.content?.sourceType === 'url' && element.content?.url) {
        return element.content.url; // External URL
    }

    // Fallback to old structure for backward compatibility
    if (element.content?.url) {
        return element.content.url;
    } else if (element.content?.imageUrl) {
        return element.content.imageUrl;
    }

    // Default fallback
    return 'https://picsum.photos/200/100';
};

onUnmounted(() => {
    stopTimePolling();
    if (youtubePlayer.value) {
        youtubePlayer.value.destroy();
    }
});
</script>

<template>
    <Head :title="video.title" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <Link :href="videos.index.url()">
                        <Button variant="outline" size="sm">
                            <ArrowLeft class="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 class="text-3xl font-bold tracking-tight">{{ video.title }}</h1>
                        <p class="text-muted-foreground">{{ video.description || 'No description' }}</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <Link :href="videos.edit.url({ video: video.id })">
                        <Button variant="outline" class="gap-2">
                            <Settings class="h-4 w-4" />
                            Edit
                        </Button>
                    </Link>
                    <Link :href="videos.preview.url({ video: video.id })">
                        <Button variant="outline" class="gap-2">
                            <Play class="h-4 w-4" />
                            Preview
                        </Button>
                    </Link>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <!-- Video Player -->
                <div class="lg:col-span-3 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Interactive Video Player</CardTitle>
                            <CardDescription>
                                Watch and interact with the video elements
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <!-- Video Container -->
                            <div class="video-container relative aspect-video bg-black rounded-lg overflow-hidden">
                                <!-- YouTube Video with API -->
                                <div
                                    v-if="video.source_type === 'youtube'"
                                    id="youtube-player"
                                    class="w-full h-full"
                                ></div>

                                <!-- Regular Video Element -->
                                <video
                                    v-else
                                    ref="videoRef"
                                    :src="`/storage/${video.video_path}`"
                                    class="w-full h-full object-contain"
                                    @timeupdate="onTimeUpdate"
                                    @loadedmetadata="onLoadedMetadata"
                                    @ended="onEnded"
                                    @click="togglePlay"
                                />

                                <!-- Interactive Elements Overlay -->
                                <div class="absolute inset-0 pointer-events-none">
                                    <div
                                        v-for="element in visibleElements"
                                        :key="element.id"
                                        :style="{
                                            position: 'absolute',
                                            left: element.position.x + 'px',
                                            top: element.position.y + 'px',
                                            width: element.position.width + 'px',
                                            height: element.position.height + 'px',
                                            backgroundColor: element.styling?.backgroundColor || '#ffffff',
                                            color: element.styling?.textColor || '#000000',
                                            fontSize: (element.styling?.fontSize || 16) + 'px',
                                            fontFamily: element.styling?.fontFamily || 'Arial',
                                            borderRadius: (element.styling?.borderRadius || 4) + 'px',
                                            padding: (element.styling?.padding || 8) + 'px',
                                            zIndex: element.z_index,
                                            cursor: 'pointer',
                                            pointerEvents: 'all',
                                        }"
                                        @click="handleElementClick(element)"
                                        @mouseenter="handleElementHover(element)"
                                        class="border-2 border-dashed border-transparent hover:border-blue-500 transition-colors"
                                    >
                                        <div v-if="element.type === 'text'" class="h-full flex items-center justify-center p-2">
                                            {{ element.content.text }}
                                        </div>
                                        <img
                                            v-else-if="element.type === 'image'"
                                            :src="getElementImageSrc(element)"
                                            class="w-full h-full object-cover"
                                            :alt="element.content.alt || 'Interactive element'"
                                        />
                                        <button
                                            v-else-if="element.type === 'button'"
                                            class="w-full h-full flex items-center justify-center font-medium"
                                            :style="{ backgroundColor: element.styling?.backgroundColor, color: element.styling?.textColor }"
                                        >
                                            {{ element.content.text }}
                                        </button>
                                        <div
                                            v-else-if="element.type === 'quiz'"
                                            class="w-full h-full p-2 flex flex-col justify-center"
                                        >
                                            <div class="text-sm font-medium mb-2">{{ element.content.question }}</div>
                                            <div class="space-y-1">
                                                <div v-for="(option, index) in element.content.options" :key="index" class="text-xs">
                                                    {{ String.fromCharCode(65 + index) }}. {{ option }}
                                                </div>
                                            </div>
                                        </div>
                                        <a
                                            v-else-if="element.type === 'link'"
                                            :href="element.content.url"
                                            target="_blank"
                                            class="w-full h-full flex items-center justify-center text-blue-600 underline"
                                        >
                                            {{ element.content.text }}
                                        </a>
                                        <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600">
                                            {{ element.type }}
                                        </div>
                                    </div>
                                </div>

                                <!-- Play/Pause Overlay -->
                                <div
                                    v-if="!isPlaying && video.source_type !== 'youtube'"
                                    class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
                                    @click="togglePlay"
                                >
                                    <Play class="h-16 w-16 text-white" />
                                </div>
                            </div>

                            <!-- Video Controls -->
                            <div class="mt-4 space-y-4">
                                <!-- Progress Bar -->
                                <div class="space-y-2">
                                    <div class="flex justify-between text-sm text-muted-foreground">
                                        <span>{{ formatTime(currentTime) }}</span>
                                        <span>{{ formatTime(duration) }}</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2 cursor-pointer" @click="handleProgressClick">
                                        <div
                                            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            :style="{ width: duration > 0 ? (currentTime / duration) * 100 + '%' : '0%' }"
                                        ></div>
                                    </div>
                                </div>

                                <!-- Control Buttons -->
                                <div class="flex items-center gap-4">
                                    <Button @click="togglePlay" variant="outline" size="sm">
                                        <Play v-if="!isPlaying" class="h-4 w-4" />
                                        <Pause v-else class="h-4 w-4" />
                                    </Button>

                                    <Button @click="restartVideo" variant="outline" size="sm">
                                        <RotateCcw class="h-4 w-4" />
                                    </Button>

                                    <div class="flex items-center gap-2">
                                        <Button @click="toggleMute" variant="outline" size="sm">
                                            <Volume2 v-if="!isMuted" class="h-4 w-4" />
                                            <VolumeX v-else class="h-4 w-4" />
                                        </Button>
                                        <div class="w-20">
                                            <input
                                                type="range"
                                                :value="volume * 100"
                                                @input="updateVolume($event.target.value / 100)"
                                                min="0"
                                                max="100"
                                                class="w-full"
                                            />
                                        </div>
                                    </div>

                                    <Button @click="toggleFullscreen" variant="outline" size="sm">
                                        <Maximize class="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <!-- Sidebar -->
                <div class="space-y-4">
                    <!-- Video Info -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Video Information</CardTitle>
                        </CardHeader>
                        <CardContent class="space-y-4">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-muted-foreground">Status</span>
                                <Badge :variant="video.is_published ? 'default' : 'secondary'">
                                    {{ video.is_published ? 'Published' : 'Draft' }}
                                </Badge>
                            </div>

                            <div class="flex items-center justify-between">
                                <span class="text-sm text-muted-foreground">Source</span>
                                <span class="text-sm">{{ video.source_type === 'youtube' ? 'YouTube' : 'Upload' }}</span>
                            </div>

                            <div class="flex items-center justify-between">
                                <span class="text-sm text-muted-foreground">Created</span>
                                <span class="text-sm">{{ new Date(video.created_at).toLocaleDateString() }}</span>
                            </div>

                            <div class="flex items-center justify-between">
                                <span class="text-sm text-muted-foreground">Updated</span>
                                <span class="text-sm">{{ new Date(video.updated_at).toLocaleDateString() }}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Interactive Elements -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Interactive Elements</CardTitle>
                            <CardDescription>
                                {{ video.interactive_elements.length }} elements
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div class="space-y-2">
                                <div
                                    v-for="element in video.interactive_elements"
                                    :key="element.id"
                                    class="flex items-center justify-between p-2 border rounded"
                                    :class="{ 'bg-blue-50 border-blue-200': visibleElements.some(e => e.id === element.id) }"
                                >
                                    <div class="flex items-center gap-2">
                                        <div class="w-2 h-2 rounded-full" :class="{
                                            'bg-green-500': element.is_active,
                                            'bg-gray-300': !element.is_active
                                        }"></div>
                                        <span class="text-sm">{{ element.name || element.type }}</span>
                                    </div>
                                    <Badge variant="outline" class="text-xs">
                                        {{ element.type }}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Social Actions -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent class="space-y-2">
                            <Button @click="handleLike" variant="outline" class="w-full gap-2">
                                <Heart class="h-4 w-4" />
                                Like
                            </Button>
                            <Button @click="handleShare" variant="outline" class="w-full gap-2">
                                <Share2 class="h-4 w-4" />
                                Share
                            </Button>
                            <Button @click="handleComment" variant="outline" class="w-full gap-2">
                                <MessageCircle class="h-4 w-4" />
                                Comment
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
