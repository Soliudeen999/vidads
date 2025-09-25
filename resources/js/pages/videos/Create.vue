<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { dashboard } from '@/routes';
import videos from '@/routes/videos';
import { ArrowLeft, Upload, Link as LinkIcon } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard.url(),
    },
    {
        title: 'Create Video',
        href: '#',
    },
];

const form = useForm({
    title: '',
    description: '',
    source_type: 'youtube',
    source_url: '',
    video_file: null as File | null,
    duration: 0,
});

const submit = () => {
    form.post(videos.store.url(), {
        forceFormData: true,
        onSuccess: () => {
            // Redirect will be handled by the controller
        },
        onError: () => {
            console.log('Error submitting form', form.errors);
        },
    });
};

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        form.video_file = target.files[0];
    }
};
</script>

<template>
    <Head title="Create Interactive Video" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
            <!-- Header -->
            <div class="flex items-center gap-4">
                <Link :href="dashboard.url()">
                    <Button variant="outline" size="sm">
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Create Interactive Video</h1>
                    <p class="text-muted-foreground">
                        Add a YouTube video or upload your own to get started
                    </p>
                </div>
            </div>

            <!-- Form -->
            <div class="max-w-2xl">
                <form @submit.prevent="submit" class="space-y-6">
                    <!-- Basic Info -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Video Information</CardTitle>
                            <CardDescription>
                                Provide basic details about your interactive video
                            </CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-4">
                            <div class="space-y-2">
                                <Label for="title">Title *</Label>
                                <Input
                                    id="title"
                                    v-model="form.title"
                                    placeholder="Enter video title"
                                    :class="{ 'border-destructive': form.errors.title }"
                                />
                                <p v-if="form.errors.title" class="text-sm text-destructive">
                                    {{ form.errors.title }}
                                </p>
                            </div>

                            <div class="space-y-2">
                                <Label for="description">Description</Label>
                                <Textarea
                                    id="description"
                                    v-model="form.description"
                                    placeholder="Describe your video (optional)"
                                    rows="3"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Video Source -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Video Source</CardTitle>
                            <CardDescription>
                                Choose how you want to add your video
                            </CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-6">
                            <RadioGroup v-model="form.source_type" class="space-y-4">
                                <div class="flex items-center space-x-2">
                                    <RadioGroupItem value="youtube" id="youtube" />
                                    <Label for="youtube" class="flex items-center gap-2 cursor-pointer">
                                        <LinkIcon class="h-4 w-4" />
                                        YouTube Video
                                    </Label>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <RadioGroupItem value="upload" id="upload" />
                                    <Label for="upload" class="flex items-center gap-2 cursor-pointer">
                                        <Upload class="h-4 w-4" />
                                        Upload Video File
                                    </Label>
                                </div>
                            </RadioGroup>

                            <!-- YouTube URL Input -->
                            <div v-if="form.source_type === 'youtube'" class="space-y-2">
                                <Label for="source_url">YouTube URL *</Label>
                                <Input
                                    id="source_url"
                                    v-model="form.source_url"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    :class="{ 'border-destructive': form.errors.source_url }"
                                />
                                <p v-if="form.errors.source_url" class="text-sm text-destructive">
                                    {{ form.errors.source_url }}
                                </p>
                                <p class="text-sm text-muted-foreground">
                                    Paste any YouTube video URL (watch, youtu.be, embed, etc.)
                                </p>
                            </div>

                            <!-- File Upload -->
                            <div v-if="form.source_type === 'upload'" class="space-y-2">
                                <Label for="video_file">Video File *</Label>
                                <Input
                                    id="video_file"
                                    type="file"
                                    accept="video/*"
                                    @change="handleFileChange"
                                    :class="{ 'border-destructive': form.errors.video_file }"
                                />
                                <p v-if="form.errors.video_file" class="text-sm text-destructive">
                                    {{ form.errors.video_file }}
                                </p>
                                <p class="text-sm text-muted-foreground">
                                    Supported formats: MP4, AVI, MOV, WMV, FLV, WebM (max 100MB)
                                </p>
                            </div>

                            <div class="space-y-2">
                                <Label for="duration">Duration *</Label>
                                <Input
                                    id="duration"
                                    v-model="form.duration"
                                    placeholder="Enter video duration"
                                    :class="{ 'border-destructive': form.errors.duration }"
                                />
                                <p v-if="form.errors.duration" class="text-sm text-destructive">
                                    {{ form.errors.duration }}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Actions -->
                    <div class="flex gap-4">
                        <Button type="submit" :disabled="form.processing">
                            {{ form.processing ? 'Creating...' : 'Create Video' }}
                        </Button>
                        <Link :href="dashboard.url()">
                            <Button variant="outline">Cancel</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
