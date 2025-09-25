<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/vue3';
import { dashboard } from '@/routes';
import videos from '@/routes/videos';
import {
    ArrowLeft,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Settings,
    Maximize,
    RotateCcw
} from 'lucide-vue-next';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { toast } from 'vue3-toastify';

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
        title: 'Preview Video',
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
            is_active: boolean;
            z_index: number;
        }>;
    };
}>();

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
        } else {
            videoRef.value.play().then(() => {
                isPlaying.value = true;
            }).catch((error) => {
                // Handle play error
            });
        }
    }
};

const seekTo = (time: number) => {
    if (isYouTube.value && youtubePlayer.value) {
        youtubePlayer.value.seekTo(time, true);
        currentTime.value = time;
    } else if (videoRef.value) {
        videoRef.value.currentTime = time;
        currentTime.value = time;
    }
};

const updateVolume = (newVolume: number) => {
    if (isYouTube.value && youtubePlayer.value) {
        youtubePlayer.value.setVolume(newVolume * 100);
        volume.value = newVolume;
        isMuted.value = newVolume === 0;
    } else if (videoRef.value) {
        videoRef.value.volume = newVolume;
        volume.value = newVolume;
        isMuted.value = newVolume === 0;
    }
};

const toggleMute = () => {
    if (isYouTube.value && youtubePlayer.value) {
        if (isMuted.value) {
            youtubePlayer.value.unMute();
            isMuted.value = false;
        } else {
            youtubePlayer.value.mute();
            isMuted.value = true;
        }
    } else if (videoRef.value) {
        if (isMuted.value) {
            videoRef.value.volume = volume.value;
            isMuted.value = false;
        } else {
            videoRef.value.volume = 0;
            isMuted.value = true;
        }
    }
};

const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        isFullscreen.value = true;
    } else {
        document.exitFullscreen();
        isFullscreen.value = false;
    }
};

const restart = () => {
    if (isYouTube.value && youtubePlayer.value) {
        youtubePlayer.value.seekTo(0, true);
        currentTime.value = 0;
    } else if (videoRef.value) {
        videoRef.value.currentTime = 0;
        currentTime.value = 0;
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
};

const onEnded = () => {
    isPlaying.value = false;
};

// Computed properties
const visibleElements = computed(() => {
    return props.video.interactive_elements?.filter(element =>
        element.is_active &&
        currentTime.value >= element.start_time &&
        currentTime.value <= (element.end_time || element.start_time + element.duration)
    ) || [];
});

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Element interaction handlers
const handleElementClick = (element: any) => {
    // Handle different element types
    switch (element.type) {
        case 'button':
            if (element.content?.action === 'popup') {
                alert(element.content?.popupText || 'Button clicked!');
            } else if (element.content?.action === 'link' && element.content?.url) {
                window.open(element.content.url, '_blank');
            }
            break;
        case 'link':
            // Links are handled by the <a> tag
            break;
        case 'quiz':
            // Quiz interactions are handled by handleQuizAnswer
            break;
        default:
            // Handle other element types
    }
};

const handleQuizAnswer = (element: any, selectedIndex: number) => {
    const correctAnswer = element.content?.correctAnswer || 0;
    const isCorrect = selectedIndex === correctAnswer;

    if (isCorrect) {
        alert('Correct answer!');
    } else {
        alert('Incorrect answer. Try again!');
    }
};

// Keyboard shortcuts
const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.code) {
        case 'Space':
            event.preventDefault();
            togglePlay();
            break;
        case 'KeyM':
            toggleMute();
            break;
        case 'KeyF':
            toggleFullscreen();
            break;
        case 'KeyR':
            restart();
            break;
    }
};

// YouTube API integration
const initializeYouTubeAPI = () => {
    if (typeof window !== 'undefined' && window.YT && window.YT.Player) {
        const videoId = extractYouTubeVideoId(props.video.source_url);
        if (videoId) {
            youtubePlayer.value = new window.YT.Player('youtube-player-preview', {
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

const onYouTubeReady = (event: any) => {
    duration.value = event.target.getDuration();
    isYouTube.value = true;

    // Start polling for time updates
    startTimePolling();
};

const onYouTubeStateChange = (event: any) => {
    const state = event.data;
    if (state === window.YT.PlayerState.PLAYING) {
        isPlaying.value = true;
    } else if (state === window.YT.PlayerState.PAUSED) {
        isPlaying.value = false;
    } else if (state === window.YT.PlayerState.ENDED) {
        isPlaying.value = false;
    }
};

const onYouTubeError = (event: any) => {
    // Handle YouTube error
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

onMounted(() => {
    document.addEventListener('keydown', handleKeyPress);

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
    document.removeEventListener('keydown', handleKeyPress);
    stopTimePolling();
    if (youtubePlayer.value) {
        youtubePlayer.value.destroy();
    }
});
</script>

<template>
    <Head title="Preview Video" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <Link :href="videos.edit.url({ video: video.id })">
                        <Button variant="outline" size="sm">
                            <ArrowLeft class="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 class="text-3xl font-bold tracking-tight">Preview Video</h1>
                        <p class="text-muted-foreground">{{ video.title }}</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <Link :href="videos.edit.url({ video: video.id })">
                        <Button variant="outline" class="gap-2">
                            <Settings class="h-4 w-4" />
                            Edit Video
                        </Button>
                    </Link>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <!-- Video Player -->
                <div class="lg:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Interactive Video Preview</CardTitle>
                            <CardDescription>
                                Test your interactive elements in real-time
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <!-- Video Container -->
                            <div class="video-container relative aspect-video bg-black rounded-lg overflow-hidden group">
                                <!-- YouTube Video with API -->
                                <div
                                    v-if="video.source_type === 'youtube'"
                                    id="youtube-player-preview"
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
                                            transition: 'all 0.3s ease',
                                            border: element.styling?.borderColor ? `2px solid ${element.styling.borderColor}` : 'none',
                                            textAlign: element.styling?.textAlign || 'center',
                                        }"
                                        class="hover:scale-105 hover:shadow-lg"
                                        @click="handleElementClick(element)"
                                    >
                                        <!-- Text Element -->
                                        <div v-if="element.type === 'text'" class="h-full flex items-center justify-center">
                                            {{ element.content?.text || 'Text Element' }}
                                        </div>

                                        <!-- Image Element -->
                                        <img
                                            v-else-if="element.type === 'image'"
                                            :src="getElementImageSrc(element)"
                                            :alt="element.content?.alt || 'Image'"
                                            class="w-full h-full object-cover rounded"
                                        />

                                        <!-- Button Element -->
                                        <button
                                            v-else-if="element.type === 'button'"
                                            class="w-full h-full flex items-center justify-center font-medium hover:opacity-80 transition-opacity"
                                            :style="{
                                                backgroundColor: element.styling?.backgroundColor || '#007bff',
                                                color: element.styling?.textColor || '#ffffff',
                                            }"
                                        >
                                            {{ element.content?.text || 'Click Me' }}
                                        </button>

                                        <!-- Quiz Element -->
                                        <div v-else-if="element.type === 'quiz'" class="w-full h-full flex flex-col justify-center p-2">
                                            <div class="text-sm font-medium mb-2">{{ element.content?.question || 'Quiz Question' }}</div>
                                            <div class="space-y-1">
                                                <div
                                                    v-for="(option, index) in (element.content?.options || [])"
                                                    :key="index"
                                                    class="text-xs p-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                                                    @click.stop="handleQuizAnswer(element, index)"
                                                >
                                                    {{ option }}
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Link Element -->
                                        <a
                                            v-else-if="element.type === 'link'"
                                            :href="element.content?.url"
                                            target="_blank"
                                            class="w-full h-full flex items-center justify-center text-blue-600 hover:text-blue-800 underline"
                                        >
                                            {{ element.content?.text || 'Click Here' }}
                                        </a>

                                        <!-- Shape Element -->
                                        <div v-else-if="element.type === 'shape'" class="w-full h-full"></div>

                                        <!-- Fallback for unknown types -->
                                        <div v-else class="w-full h-full flex items-center justify-center text-xs text-gray-500">
                                            {{ element.type }} Element
                                        </div>
                                    </div>
                                </div>

                                <!-- Play/Pause Overlay -->
                                <div
                                    v-if="!isPlaying"
                                    class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                    @click="togglePlay"
                                >
                                    <Play class="h-16 w-16 text-white" />
                                </div>

                                <!-- Loading State -->
                                <div v-if="duration === 0" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div class="text-white">Loading video...</div>
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
                                    <div class="relative">
                                        <div class="w-full h-2 bg-muted rounded-full">
                                            <div
                                                class="h-2 bg-primary rounded-full transition-all duration-100"
                                                :style="{ width: duration > 0 ? (currentTime / duration) * 100 + '%' : '0%' }"
                                            />
                                        </div>
                                        <input
                                            type="range"
                                            :value="currentTime"
                                            :max="duration"
                                            :step="0.1"
                                            @input="seekTo(parseFloat(($event.target as HTMLInputElement).value))"
                                            class="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <!-- Control Buttons -->
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-4">
                                        <Button @click="togglePlay" variant="outline" size="sm">
                                            <Play v-if="!isPlaying" class="h-4 w-4" />
                                            <Pause v-else class="h-4 w-4" />
                                        </Button>

                                        <Button @click="restart" variant="outline" size="sm">
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
                                                    :value="volume"
                                                    min="0"
                                                    max="1"
                                                    step="0.1"
                                                    @input="updateVolume(parseFloat(($event.target as HTMLInputElement).value))"
                                                    class="w-full"
                                                />
                                            </div>
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
                            <CardTitle>Video Info</CardTitle>
                        </CardHeader>
                        <CardContent class="space-y-2">
                            <div>
                                <h3 class="font-semibold">{{ video.title }}</h3>
                                <p class="text-sm text-muted-foreground">{{ video.description || 'No description' }}</p>
                            </div>
                            <div class="text-sm text-muted-foreground">
                                <p>Duration: {{ formatTime(duration) }}</p>
                                <p>Elements: {{ video.interactive_elements?.length || 0 }}</p>
                                <p>Source: {{ video.source_type === 'youtube' ? 'YouTube' : 'Upload' }}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Active Elements -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Elements</CardTitle>
                            <CardDescription>
                                Elements currently visible
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div v-if="visibleElements.length" class="space-y-2">
                                <div
                                    v-for="element in visibleElements"
                                    :key="element.id"
                                    class="p-2 border rounded text-sm"
                                >
                                    <div class="font-medium">{{ element.name || element.type }}</div>
                                    <div class="text-muted-foreground capitalize">{{ element.type }}</div>
                                    <div class="text-xs text-muted-foreground mt-1">
                                        {{ element.start_time }}s - {{ element.end_time || element.start_time + element.duration }}s
                                    </div>
                                    <div v-if="element.content?.text" class="text-xs text-muted-foreground truncate">
                                        "{{ element.content.text }}"
                                    </div>
                                </div>
                            </div>
                            <div v-else class="text-sm text-muted-foreground text-center py-4">
                                No elements active at {{ formatTime(currentTime) }}
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Debug Info -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Debug Info</CardTitle>
                            <CardDescription>
                                Current video state
                            </CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span>Current Time:</span>
                                <span class="font-mono">{{ formatTime(currentTime) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Duration:</span>
                                <span class="font-mono">{{ formatTime(duration) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Playing:</span>
                                <span class="font-mono">{{ isPlaying ? 'Yes' : 'No' }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>YouTube:</span>
                                <span class="font-mono">{{ isYouTube ? 'Yes' : 'No' }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Total Elements:</span>
                                <span class="font-mono">{{ video.interactive_elements?.length || 0 }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Visible Elements:</span>
                                <span class="font-mono">{{ visibleElements.length }}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Keyboard Shortcuts -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Shortcuts</CardTitle>
                        </CardHeader>
                        <CardContent class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Play/Pause:</span>
                                <kbd class="px-2 py-1 bg-muted rounded text-xs">Space</kbd>
                            </div>
                            <div class="flex justify-between">
                                <span>Mute:</span>
                                <kbd class="px-2 py-1 bg-muted rounded text-xs">M</kbd>
                            </div>
                            <div class="flex justify-between">
                                <span>Fullscreen:</span>
                                <kbd class="px-2 py-1 bg-muted rounded text-xs">F</kbd>
                            </div>
                            <div class="flex justify-between">
                                <span>Restart:</span>
                                <kbd class="px-2 py-1 bg-muted rounded text-xs">R</kbd>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
