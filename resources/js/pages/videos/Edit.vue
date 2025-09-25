<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, router } from '@inertiajs/vue3';
import { dashboard } from '@/routes';
import videos from '@/routes/videos';
import interactiveElements from '@/routes/videos/interactive-elements';

import {
    ArrowLeft,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Settings,
    Type,
    Image,
    Square,
    Save,
    Eye,
    Plus,
    Trash2,
    MousePointer,
    RotateCcw,
    Maximize,
    Edit,
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
        title: 'Edit Video',
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

// Toast notifications are available via the imported toast function

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

// Editor state
const selectedElement = ref<any>(null);
const isDragging = ref(false);
const dragOffset = ref({ x: 0, y: 0 });
const isEditingElement = ref(false);
const editingElementId = ref<number | null>(null);
const previewElement = ref<any>(null);
const isPreviewMode = ref(false);

// Element types
const elementTypes = [
    { type: 'text', label: 'Text', icon: Type },
    { type: 'image', label: 'Image', icon: Image },
    { type: 'button', label: 'Button', icon: MousePointer },
    { type: 'quiz', label: 'Quiz', icon: Square },
    { type: 'link', label: 'Link', icon: MousePointer },
];

// Form for video updates
const videoForm = useForm({
    title: props.video.title,
    description: props.video.description,
    is_published: props.video.is_published,
    source_type: props.video.source_type,
    source_url: props.video.source_url,
    video_path: props.video.video_path,
    thumbnail_url: props.video.thumbnail_url,
    duration: props.video.duration,
});

// Form for new element
const elementForm = useForm({
    type: 'text',
    name: '',
    content: { text: 'New Text' } as any,
    position: { x: 100, y: 100, width: 200, height: 50 },
    styling: {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        fontSize: 16,
        fontFamily: 'Arial',
        borderRadius: 4,
        padding: 8,
    },
    start_time: 0,
    end_time: 5,
    duration: 5,
    animation: {
        type: 'fadeIn',
        duration: 1000,
        delay: 0,
    },
    interaction: {
        onClick: 'popup',
        onHover: 'highlight',
        onFocus: 'focus',
    },
    z_index: 1,
});

// Position presets
const positionPresets = [
    { name: 'Top Left', x: 20, y: 20 },
    { name: 'Top Right', x: 80, y: 20 },
    { name: 'Center', x: 50, y: 50 },
    { name: 'Bottom Left', x: 20, y: 80 },
    { name: 'Bottom Right', x: 80, y: 80 },
    { name: 'Custom', x: null, y: null },
];

// Size presets
const sizePresets = [
    { name: 'Label-like', width: 120, height: 30 },
    { name: 'Cover', width: 200, height: 100 },
    { name: 'Moderate', width: 150, height: 60 },
    { name: 'Custom', width: null, height: null },
];

// Selected presets
const selectedPositionPreset = ref('Custom');
const selectedSizePreset = ref('Custom');

// Handle position preset changes
const handlePositionPresetChange = (presetName: string) => {
    selectedPositionPreset.value = presetName;
    const preset = positionPresets.find(p => p.name === presetName);

    if (preset && preset.x !== null && preset.y !== null) {
        // Ensure position object exists
        if (!elementForm.position) {
            elementForm.position = { x: 100, y: 100, width: 200, height: 50 };
        }

        // Convert percentage to pixel values based on video container
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
            const rect = videoContainer.getBoundingClientRect();
            elementForm.position.x = Math.round((preset.x / 100) * rect.width);
            elementForm.position.y = Math.round((preset.y / 100) * rect.height);
        }
    }
};

// Handle size preset changes
const handleSizePresetChange = (presetName: string) => {
    selectedSizePreset.value = presetName;
    const preset = sizePresets.find(p => p.name === presetName);

    if (preset && preset.width !== null && preset.height !== null) {
        // Ensure position object exists
        if (!elementForm.position) {
            elementForm.position = { x: 100, y: 100, width: 200, height: 50 };
        }

        elementForm.position.width = preset.width;
        elementForm.position.height = preset.height;
    }
};

const updateVideo = () => {
    videoForm.put(videos.update.url({ video: props.video.id }), {
        onSuccess: () => {
            // Video updated successfully
        },
        onError: (errors) => {
            // Handle update errors
        },
    });
};

const addElement = () => {
    // Initialize content based on element type
    let content = {};
    switch (elementForm.type) {
        case 'text':
            content = { text: elementForm.content.text || 'New Text' };
            break;
        case 'button':
            content = {
                text: elementForm.content.text || 'Click Me',
                action: elementForm.content.action || 'popup'
            };
            break;
        case 'image':
            content = {
                sourceType: elementForm.content.sourceType || 'url',
                url: elementForm.content.url || 'https://picsum.photos/200/100',
                alt: elementForm.content.alt || 'Image',
                uploadedFile: elementForm.content.uploadedFile || null,
                fileName: elementForm.content.fileName || null
            };
            break;
        case 'quiz':
            content = {
                question: elementForm.content.question || 'What is the answer?',
                options: elementForm.content.options || ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: elementForm.content.correctAnswer || 0
            };
            break;
        case 'link':
            content = {
                url: elementForm.content.url || 'https://example.com',
                text: elementForm.content.text || 'Click here'
            };
            break;
    }

    // Update form data with processed content and end_time
    elementForm.content = content;
    elementForm.end_time = elementForm.start_time + elementForm.duration;

    if (isEditingElement.value && editingElementId.value) {
        // Update existing element
        elementForm.put(interactiveElements.update.url({ video: props.video.id, interactive_element: editingElementId.value }), {
            onSuccess: () => {
                resetElementForm();
            },
            onError: (errors) => {
                toast.error('Failed to update element');
            },
        });
    } else {
        // Add new element
        elementForm.post(interactiveElements.store.url({ video: props.video.id }), {
            onSuccess: () => {
                resetElementForm();
            },
            onError: (errors) => {
                toast.error('Failed to add element');
            },
        });
    }
};

const deleteElement = (elementId: number) => {

    router.delete(interactiveElements.destroy.url({ video: props.video.id, interactive_element: elementId }), {
        onSuccess: () => {
            // Refresh the page to get updated elements
            window.location.reload();
        },
        onError: () => {
            toast.error('Failed to delete element');
        },
    });
};

const editElement = (element: any) => {
    isEditingElement.value = true;
    editingElementId.value = element.id;

    // Prefill form with element data
    elementForm.type = element.type;
    elementForm.name = element.name;

    // Handle content based on element type
    if (element.type === 'image') {
        elementForm.content = {
            sourceType: element.content.sourceType || 'url',
            url: element.content.url || '',
            alt: element.content.alt || '',
            uploadedFile: element.content.uploadedFile || null,
            fileName: element.content.fileName || null
        };
    } else {
        elementForm.content = { ...element.content };
    }

    elementForm.position = { ...element.position };
    elementForm.styling = { ...element.styling };
    elementForm.start_time = element.start_time;
    elementForm.end_time = element.end_time;
    elementForm.duration = element.duration;
    elementForm.animation = { ...element.animation };
    elementForm.interaction = { ...element.interaction };
    elementForm.is_active = element.is_active;
    elementForm.z_index = element.z_index;

    // Enable preview mode
    enablePreviewMode(element);
};

const enablePreviewMode = (element: any) => {
    isPreviewMode.value = true;
    previewElement.value = {
        ...element,
        position: { ...element.position },
        styling: { ...element.styling },
        content: { ...element.content }
    };

    // Seek to element start time
    seekTo(element.start_time);
};

const disablePreviewMode = () => {
    isPreviewMode.value = false;
    previewElement.value = null;
};

const resetElementForm = () => {
    elementForm.reset();
    elementForm.position = { x: 100, y: 100, width: 200, height: 50 };
    elementForm.start_time = Math.floor(currentTime.value);

    // Initialize content based on element type
    switch (elementForm.type) {
        case 'text':
            elementForm.content = { text: 'New Text' };
            break;
        case 'image':
            elementForm.content = {
                sourceType: 'url',
                url: '',
                alt: '',
                uploadedFile: null,
                fileName: null
            };
            break;
        case 'button':
            elementForm.content = {
                text: 'Click Me',
                action: 'popup'
            };
            break;
        case 'quiz':
            elementForm.content = {
                question: 'What is the answer?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 0
            };
            break;
        case 'link':
            elementForm.content = {
                url: 'https://example.com',
                text: 'Click here'
            };
            break;
        default:
            elementForm.content = { text: 'New Text' };
    }

    isEditingElement.value = false;
    editingElementId.value = null;
    disablePreviewMode();
};

const deleteVideo = () => {
    router.delete(videos.destroy.url({ video: props.video.id }), {
        onSuccess: () => {
            // Video deleted successfully
        },
        onError: () => {
            // Handle delete errors
        },
    });
};

// Video player controls
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

const restartVideo = () => {
    if (isYouTube.value && youtubePlayer.value) {
        youtubePlayer.value.seekTo(0, true);
        currentTime.value = 0;
    } else if (videoRef.value) {
        videoRef.value.currentTime = 0;
        currentTime.value = 0;
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

const handleProgressClick = (event: MouseEvent) => {
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration.value;

    seekTo(newTime);
};

// Enhanced drag and drop functionality
const startDrag = (event: MouseEvent, element: any) => {
    event.preventDefault();
    selectedElement.value = element;
    isDragging.value = true;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    dragOffset.value = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };

    // Add global mouse event listeners
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', endDrag);
};

const handleDrag = (event: MouseEvent) => {
    if (!isDragging.value || !selectedElement.value) return;

    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) return;

    const containerRect = videoContainer.getBoundingClientRect();
    const newX = event.clientX - containerRect.left - dragOffset.value.x;
    const newY = event.clientY - containerRect.top - dragOffset.value.y;

    // Constrain to container bounds
    const constrainedX = Math.max(0, Math.min(newX, containerRect.width - selectedElement.value.position.width));
    const constrainedY = Math.max(0, Math.min(newY, containerRect.height - selectedElement.value.position.height));

    // Update preview element position
    if (isPreviewMode.value && previewElement.value) {
        previewElement.value.position.x = constrainedX;
        previewElement.value.position.y = constrainedY;
    }

    // Update form values in real-time
    if (isEditingElement.value) {
        elementForm.position.x = constrainedX;
        elementForm.position.y = constrainedY;
    }
};

const endDrag = () => {
    if (!isDragging.value) return;

    isDragging.value = false;
    selectedElement.value = null;

    // Remove global event listeners
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', endDrag);
};

const onMouseMove = (event: MouseEvent) => {
    if (!isDragging.value || !selectedElement.value) return;

    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) return;

    const containerRect = videoContainer.getBoundingClientRect();
    const x = event.clientX - containerRect.left - dragOffset.value.x;
    const y = event.clientY - containerRect.top - dragOffset.value.y;

    // Update element position
    selectedElement.value.position.x = Math.max(0, Math.min(x, containerRect.width - selectedElement.value.position.width));
    selectedElement.value.position.y = Math.max(0, Math.min(y, containerRect.height - selectedElement.value.position.height));
};

const stopDrag = () => {
    isDragging.value = false;
    if (selectedElement.value) {
        // Save the new position to the database
        saveElementPosition(selectedElement.value);
        toast.success(`${selectedElement.value.name || selectedElement.value.type} element positioned`);
    }
    selectedElement.value = null;
};

const saveElementPosition = (element: any) => {
    // Use Inertia to update the element position
    router.put(elements.update.url({ video: props.video.id, element: element.id }), {
        type: element.type,
        name: element.name,
        content: element.content,
        position: element.position,
        styling: element.styling,
        start_time: element.start_time,
        duration: element.duration,
        animation: element.animation,
        interaction: element.interaction,
        is_active: element.is_active,
        z_index: element.z_index,
    }, {
        onSuccess: () => {
            // Position updated successfully
        },
        onError: () => {
            toast.error('Failed to save element position');
        }
    });
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

// Computed properties
const visibleElements = computed(() => {
    const elements = props.video.interactive_elements.filter(element =>
        element.is_active &&
        currentTime.value >= element.start_time &&
        currentTime.value <= (element.end_time || element.start_time + element.duration)
    );

    // Add preview element if in preview mode
    if (isPreviewMode.value && previewElement.value) {
        return [previewElement.value];
    }

    return elements;
});

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// YouTube URL conversion
const getYouTubeEmbedUrl = (url: string) => {
    const videoId = extractYouTubeVideoId(url);
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}&autoplay=0&controls=1&showinfo=0&rel=0&modestbranding=1`;
    }
    return url;
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

// YouTube API integration for Edit page
const initializeYouTubeAPI = () => {
    if (typeof window !== 'undefined' && window.YT && window.YT.Player) {
        const videoId = extractYouTubeVideoId(props.video.source_url);
        if (videoId) {
            youtubePlayer.value = new window.YT.Player('youtube-player-edit', {
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
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', stopDrag);

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

// Image upload handling
const handleImageUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please select a valid image file (JPG, PNG, GIF, WebP)');
            input.value = '';
            return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert('Image file size must be less than 5MB');
            input.value = '';
            return;
        }

        // Create preview URL
        const reader = new FileReader();
        reader.onload = (e) => {
            elementForm.content.uploadedFile = e.target?.result as string;
            elementForm.content.fileName = file.name;
        };
        reader.readAsDataURL(file);
    }
};

// Get image preview for display
const getImagePreview = () => {
    if (elementForm.content.sourceType === 'upload' && elementForm.content.uploadedFile) {
        return elementForm.content.uploadedFile;
    } else if (elementForm.content.sourceType === 'url' && elementForm.content.url) {
        return elementForm.content.url;
    }
    return null;
};

onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', stopDrag);
    stopTimePolling();
    if (youtubePlayer.value) {
        youtubePlayer.value.destroy();
    }
});
</script>

<template>
    <Head title="Edit Video" />

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
                        <h1 class="text-3xl font-bold tracking-tight">Edit Video</h1>
                        <p class="text-muted-foreground">{{ video.title }}</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <Link :href="videos.preview.url({ video: video.id })">
                        <Button variant="outline" class="gap-2">
                            <Eye class="h-4 w-4" />
                            Preview
                        </Button>
                    </Link>
                    <Button @click="updateVideo" :disabled="videoForm.processing" class="gap-2">
                        <Save class="h-4 w-4" />
                        {{ videoForm.processing ? 'Saving...' : 'Save' }}
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger as-child>
                            <Button variant="destructive" class="gap-2">
                                <Trash2 class="h-4 w-4" />
                                Delete Video
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Video</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete "{{ video.title }}"? This action cannot be undone.
                                    All interactive elements will also be deleted.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction @click="deleteVideo" class="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    Delete Video
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <!-- Video Player -->
                <div class="lg:col-span-3 space-y-4">
                    <Card>
                        <CardHeader>
                            <div class="flex items-center justify-between">
                                <div>
                                    <CardTitle>Video Editor</CardTitle>
                                    <CardDescription>
                                        Add interactive elements to your video
                                    </CardDescription>
                                </div>
                                <div v-if="isPreviewMode" class="flex items-center gap-2">
                                    <div class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        Preview Mode
                                    </div>
                                    <Button @click="disablePreviewMode" variant="outline" size="sm">
                                        Exit Preview
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <!-- Video Container -->
                            <div class="video-container relative aspect-video bg-black rounded-lg overflow-hidden">
                                <!-- YouTube Video with API -->
                                <div
                                    v-if="video.source_type === 'youtube'"
                                    id="youtube-player-edit"
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
                                            cursor: 'move',
                                            pointerEvents: 'all',
                                        }"
                                        @mousedown="startDrag($event, element)"
                                        :class="{
                                            'border-2 border-dashed border-blue-500 bg-blue-50': isPreviewMode && previewElement?.id === element.id,
                                            'border-2 border-dashed border-transparent hover:border-blue-500': !isPreviewMode || previewElement?.id !== element.id
                                        }"
                                        class="transition-all duration-200"
                                    >
                                        <div v-if="element.type === 'text'" class="h-full flex items-center justify-center p-2">
                                            {{ element.content.text }}
                                        </div>
                                        <img
                                            v-else-if="element.type === 'image'"
                                            :src="element.content.sourceType === 'upload' ? element.content.uploadedFile : element.content.url"
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
                                                @input="updateVolume(($event.target as HTMLInputElement).value / 100)"
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
                            <CardTitle>Video Info</CardTitle>
                        </CardHeader>
                        <CardContent class="space-y-4">
                            <div class="space-y-2">
                                <Label for="title">Title</Label>
                                <Input
                                    id="title"
                                    v-model="videoForm.title"
                                    placeholder="Video title"
                                />
                            </div>

                            <div class="space-y-2">
                                <Label for="description">Description</Label>
                                <textarea
                                    id="description"
                                    v-model="videoForm.description"
                                    placeholder="Video description"
                                    class="w-full min-h-[80px] px-3 py-2 border border-input bg-background rounded-md text-sm"
                                />
                            </div>

                            <div class="space-y-2">
                                <Label for="duration">Duration</Label>
                                <Input
                                    id="duration"
                                    v-model="videoForm.duration"
                                    placeholder="Video duration"
                                />
                            </div>

                            <div class="flex items-center space-x-2">
                                <input
                                    id="published"
                                    v-model="videoForm.is_published"
                                    type="checkbox"
                                    class="rounded border-input"
                                />
                                <Label for="published">Published</Label>
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Element List -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Elements</CardTitle>
                            <CardDescription>
                                {{ isPreviewMode ? 'Preview mode active - drag element to reposition' : 'Manage interactive elements' }}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div class="space-y-2">
                                <div
                                    v-for="element in video.interactive_elements"
                                    :key="element.id"
                                    class="flex items-center justify-between p-2 border rounded cursor-pointer hover:bg-muted/50 transition-colors"
                                    :class="{
                                        'bg-blue-50 border-blue-200': editingElementId === element.id,
                                        'bg-green-50 border-green-200': isPreviewMode && previewElement?.id === element.id
                                    }"
                                    @click="editElement(element)"
                                >
                                    <div class="flex items-center gap-2">
                                        <component
                                            :is="elementTypes.find(t => t.type === element.type)?.icon || Type"
                                            class="h-4 w-4"
                                        />
                                        <div>
                                            <span class="text-sm font-medium">{{ element.name || element.type }}</span>
                                            <div class="text-xs text-muted-foreground">
                                                {{ element.start_time }}s - {{ element.end_time }}s
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex gap-1" @click.stop>
                                        <Button
                                            @click="selectedElement = element"
                                            variant="outline"
                                            size="sm"
                                            title="Select on video"
                                        >
                                            <MousePointer class="h-3 w-3" />
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger as-child>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    title="Delete element"
                                                >
                                                    <Trash2 class="h-3 w-3" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Delete Element</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to delete "{{ element.name || element.type }}"?
                                                        This action cannot be undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction @click="deleteElement(element.id as number)" class="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                                        Delete Element
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div class="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Add Element</CardTitle>
                            <CardDescription>
                                Drag elements onto your video
                            </CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-3">
                            <!-- Element Type Selection -->
                            <div class="space-y-2">
                                <Label class="text-sm font-medium">Element Type</Label>
                                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    <Button
                                        v-for="elementType in elementTypes"
                                        :key="elementType.type"
                                        :variant="elementForm.type === elementType.type ? 'default' : 'outline'"
                                        size="sm"
                                        @click="elementForm.type = elementType.type"
                                        class="flex flex-col gap-1 h-auto py-2"
                                    >
                                        <component :is="elementType.icon" class="h-4 w-4" />
                                        <span class="text-xs">{{ elementType.label }}</span>
                                    </Button>
                                </div>
                            </div>

                            <!-- Basic Info - Side by side on large screens -->
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                <div class="space-y-5">
                                    <Label for="element_name" class="text-sm">Name</Label>
                                <Input
                                    id="element_name"
                                    v-model="elementForm.name"
                                    placeholder="Element name"
                                        class="h-8"
                                    />
                                </div>
                                <div class="space-y-1">
                                    <Label class="text-sm">Timing</Label>
                                    <div class="grid grid-cols-2 gap-2">
                                        <div>
                                            <Label for="start_time" class="text-xs text-muted-foreground">Start (s)</Label>
                                            <Input
                                                id="start_time"
                                                v-model.number="elementForm.start_time"
                                                type="number"
                                                min="0"
                                                class="h-8"
                                            />
                                        </div>
                                        <div>
                                            <Label for="duration" class="text-xs text-muted-foreground">Duration (s)</Label>
                                            <Input
                                                id="duration"
                                                v-model.number="elementForm.duration"
                                                type="number"
                                                min="1"
                                                class="h-8"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Element Content -->
                            <div v-if="elementForm.type === 'text'" class="space-y-1">
                                <Label for="element_text" class="text-sm">Text Content</Label>
                                <Input
                                    id="element_text"
                                    v-model="elementForm.content.text"
                                    placeholder="Enter text"
                                    class="h-8"
                                />
                            </div>

                            <div v-if="elementForm.type === 'button'" class="space-y-2">
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    <div class="space-y-1">
                                        <Label for="button_text" class="text-sm">Button Text</Label>
                                <Input
                                    id="button_text"
                                    v-model="elementForm.content.text"
                                    placeholder="Button text"
                                            class="h-8"
                                        />
                                    </div>
                                    <div class="space-y-1">
                                        <Label for="button_action" class="text-sm">Action</Label>
                                        <select v-model="elementForm.content.action" class="w-full px-3 py-2 border border-input bg-background rounded-md text-sm h-8">
                                    <option value="subscribe">Subscribe</option>
                                    <option value="like">Like</option>
                                    <option value="share">Share</option>
                                    <option value="redirect">Redirect</option>
                                    <option value="popup">Popup</option>
                                </select>
                                    </div>
                                </div>
                            </div>

                            <div v-if="elementForm.type === 'image'" class="space-y-3">
                                <!-- Image Source Type Selection -->
                                <div class="space-y-1">
                                    <Label class="text-sm">Image Source</Label>
                                    <select v-model="elementForm.content.sourceType" class="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                        <option value="url">Image URL</option>
                                        <option value="upload">Upload Image</option>
                                    </select>
                                </div>

                                <!-- URL Input (when sourceType is 'url') -->
                                <div v-if="elementForm.content.sourceType === 'url'" class="space-y-1">
                                    <Label for="image_url" class="text-sm">Image URL</Label>
                                    <Input
                                        id="image_url"
                                        v-model="elementForm.content.url"
                                        placeholder="https://example.com/image.jpg"
                                        class="h-8"
                                    />
                                </div>

                                <!-- File Upload (when sourceType is 'upload') -->
                                <div v-if="elementForm.content.sourceType === 'upload'" class="space-y-1">
                                    <Label for="image_file" class="text-sm">Upload Image</Label>
                                    <Input
                                        id="image_file"
                                        type="file"
                                        accept="image/*"
                                        @change="handleImageUpload"
                                        class="h-8"
                                    />
                                    <p class="text-xs text-muted-foreground">Supported formats: JPG, PNG, GIF, WebP</p>
                                </div>

                                <!-- Alt Text -->
                                <div class="space-y-1">
                                    <Label for="image_alt" class="text-sm">Alt Text</Label>
                                    <Input
                                        id="image_alt"
                                        v-model="elementForm.content.alt"
                                        placeholder="Image description"
                                        class="h-8"
                                    />
                                </div>

                                <!-- Image Preview -->
                                <div v-if="getImagePreview()" class="space-y-1">
                                    <Label class="text-sm">Preview</Label>
                                    <div class="border rounded-md p-2 bg-muted/50">
                                        <img
                                            :src="getImagePreview()"
                                            :alt="elementForm.content.alt || 'Preview'"
                                            class="max-w-full h-32 object-contain rounded"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div v-if="elementForm.type === 'quiz'" class="space-y-2">
                                <div class="space-y-1">
                                    <Label for="quiz_question" class="text-sm">Question</Label>
                                <Input
                                    id="quiz_question"
                                    v-model="elementForm.content.question"
                                    placeholder="Quiz question"
                                        class="h-8"
                                    />
                                </div>
                                <div class="space-y-1">
                                    <Label class="text-sm">Options</Label>
                                    <div class="grid grid-cols-2 gap-2">
                                    <Input
                                        v-for="(option, index) in elementForm.content.options"
                                        :key="index"
                                        v-model="elementForm.content.options[index]"
                                        :placeholder="`Option ${String.fromCharCode(65 + index)}`"
                                            class="h-8"
                                    />
                                </div>
                                </div>
                                <div class="space-y-1">
                                    <Label for="correct_answer" class="text-sm">Correct Answer (0-3)</Label>
                                <Input
                                    id="correct_answer"
                                    v-model.number="elementForm.content.correctAnswer"
                                    type="number"
                                    min="0"
                                    max="3"
                                        class="h-8"
                                />
                                </div>
                            </div>

                            <div v-if="elementForm.type === 'link'" class="space-y-2">
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    <div class="space-y-1">
                                        <Label for="link_url" class="text-sm">URL</Label>
                                <Input
                                    id="link_url"
                                    v-model="elementForm.content.url"
                                    placeholder="https://example.com"
                                            class="h-8"
                                />
                                    </div>
                                    <div class="space-y-1">
                                        <Label for="link_text" class="text-sm">Link Text</Label>
                                <Input
                                    id="link_text"
                                    v-model="elementForm.content.text"
                                    placeholder="Click here"
                                            class="h-8"
                                />
                            </div>
                                </div>
                            </div>

                            <!-- Position & Size Controls - Side by side on large screens -->
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            <!-- Position Controls -->
                            <div class="space-y-2">
                                    <Label class="text-sm font-medium">Position</Label>
                                <div class="space-y-1">
                                        <Label for="position-preset" class="text-xs text-muted-foreground">Preset</Label>
                                    <select
                                        id="position-preset"
                                        v-model="selectedPositionPreset"
                                        @change="handlePositionPresetChange(selectedPositionPreset)"
                                            class="w-full px-3 py-2 border border-input bg-background rounded-md text-sm h-8"
                                    >
                                        <option v-for="preset in positionPresets" :key="preset.name" :value="preset.name">
                                            {{ preset.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="grid grid-cols-2 gap-2">
                                    <div>
                                            <Label for="pos_x" class="text-xs text-muted-foreground">X (px)</Label>
                                        <Input
                                            id="pos_x"
                                            v-model.number="elementForm.position.x"
                                            type="number"
                                            min="0"
                                            @input="selectedPositionPreset = 'Custom'"
                                                class="h-8"
                                        />
                                    </div>
                                    <div>
                                            <Label for="pos_y" class="text-xs text-muted-foreground">Y (px)</Label>
                                        <Input
                                            id="pos_y"
                                            v-model.number="elementForm.position.y"
                                            type="number"
                                            min="0"
                                            @input="selectedPositionPreset = 'Custom'"
                                                class="h-8"
                                        />
                                    </div>
                                </div>
                            </div>

                            <!-- Size Controls -->
                            <div class="space-y-2">
                                    <Label class="text-sm font-medium">Size</Label>
                                <div class="space-y-1">
                                        <Label for="size-preset" class="text-xs text-muted-foreground">Preset</Label>
                                    <select
                                        id="size-preset"
                                        v-model="selectedSizePreset"
                                        @change="handleSizePresetChange(selectedSizePreset)"
                                            class="w-full px-3 py-2 border border-input bg-background rounded-md text-sm h-8"
                                    >
                                        <option v-for="preset in sizePresets" :key="preset.name" :value="preset.name">
                                            {{ preset.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="grid grid-cols-2 gap-2">
                                    <div>
                                            <Label for="pos_width" class="text-xs text-muted-foreground">Width (px)</Label>
                                        <Input
                                            id="pos_width"
                                            v-model.number="elementForm.position.width"
                                            type="number"
                                            min="50"
                                            @input="selectedSizePreset = 'Custom'"
                                                class="h-8"
                                        />
                                    </div>
                                    <div>
                                            <Label for="pos_height" class="text-xs text-muted-foreground">Height (px)</Label>
                                        <Input
                                            id="pos_height"
                                            v-model.number="elementForm.position.height"
                                            type="number"
                                            min="20"
                                            @input="selectedSizePreset = 'Custom'"
                                                class="h-8"
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Styling & Animation Controls - Side by side on large screens -->
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            <!-- Styling Controls -->
                            <div class="space-y-2">
                                    <Label class="text-sm font-medium">Styling</Label>
                                <div class="grid grid-cols-2 gap-2">
                                    <div>
                                            <Label for="bg_color" class="text-xs text-muted-foreground">Background</Label>
                                        <Input
                                            type="color"
                                            format="hex"
                                            id="bg_color"
                                            v-model="elementForm.styling.backgroundColor"
                                            placeholder="#ffffff"
                                                class="h-8"
                                        />
                                    </div>
                                    <div>
                                            <Label for="text_color" class="text-xs text-muted-foreground">Text Color</Label>
                                        <Input
                                            type="color"
                                            format="hex"
                                            id="text_color"
                                            v-model="elementForm.styling.textColor"
                                            placeholder="#000000"
                                                class="h-8"
                                        />
                                    </div>
                                    <div>
                                            <Label for="font_size" class="text-xs text-muted-foreground">Font Size</Label>
                                        <Input
                                            id="font_size"
                                            v-model.number="elementForm.styling.fontSize"
                                            type="number"
                                            min="8"
                                            max="72"
                                                class="h-8"
                                        />
                                    </div>
                                    <div>
                                            <Label for="border_radius" class="text-xs text-muted-foreground">Border Radius</Label>
                                        <Input
                                            id="border_radius"
                                            v-model.number="elementForm.styling.borderRadius"
                                            type="number"
                                            min="0"
                                            max="50"
                                                class="h-8"
                                        />
                                    </div>
                                </div>
                            </div>

                            <!-- Animation Controls -->
                            <div class="space-y-2">
                                    <Label class="text-sm font-medium">Animation</Label>
                                    <div class="space-y-2">
                                    <div>
                                            <Label for="anim_type" class="text-xs text-muted-foreground">Type</Label>
                                            <select v-model="elementForm.animation.type" class="w-full px-3 py-2 border border-input bg-background rounded-md text-sm h-8">
                                            <option value="fadeIn">Fade In</option>
                                            <option value="slideIn">Slide In</option>
                                            <option value="bounce">Bounce</option>
                                            <option value="pulse">Pulse</option>
                                        </select>
                                    </div>
                                    <div>
                                            <Label for="anim_duration" class="text-xs text-muted-foreground">Duration (ms)</Label>
                                        <Input
                                            id="anim_duration"
                                            v-model.number="elementForm.animation.duration"
                                            type="number"
                                            min="100"
                                            max="5000"
                                                class="h-8"
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex gap-2">
                                <Button @click="addElement" class="flex-1 gap-2">
                                    <Plus v-if="!isEditingElement" class="h-4 w-4" />
                                    <Edit v-else class="h-4 w-4" />
                                    {{ isEditingElement ? 'Update Element' : 'Add Element' }}
                                </Button>
                                <Button v-if="isEditingElement" @click="resetElementForm" variant="outline" class="gap-2">
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
            </div>
        </div>
    </AppLayout>
</template>
