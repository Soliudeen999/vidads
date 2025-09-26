<script setup lang="ts">
import { dashboard, login, register } from '@/routes';
import { Head, Link } from '@inertiajs/vue3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Play, Image, MousePointer, Square, Link as LinkIcon } from 'lucide-vue-next';
</script>

<template>
    <Head title="Welcome to Vidads" />

    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <!-- Header Navigation -->
        <header class="w-full p-6">
            <nav class="flex items-center justify-end gap-4">
                <Link
                    v-if="$page.props.auth.user"
                    :href="dashboard()"
                    class="inline-block rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-700"
                >
                    Dashboard
                </Link>
                <template v-else>
                    <Link
                        :href="login()"
                        class="inline-block rounded-lg border border-transparent px-6 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-700"
                    >
                        Log in
                    </Link>
                    <Link
                        :href="register()"
                        class="inline-block rounded-lg border border-blue-600 bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:border-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        Get Started
                    </Link>
                </template>
            </nav>
        </header>

        <!-- Main Content -->
        <main class="flex items-center justify-center px-6 py-12">
            <div class="w-full max-w-4xl">
                <!-- Hero Section -->
                <div class="text-center mb-12">
                    <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Welcome to <span class="text-blue-600 dark:text-blue-400">Vidads</span>
                    </h1>
                    <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Create interactive videos with clickable elements and engaging content
                    </p>
                </div>

                <!-- App Description Card -->
                <Card class="mb-8">
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2 text-2xl">
                            <Video class="h-8 w-8 text-blue-600" />
                            About Vidads
                        </CardTitle>
                        <CardDescription class="text-lg">
                            A Laravel-based platform for creating interactive videos with clickable elements and engaging content.
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-6">
                        <!-- Features Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div class="flex items-start gap-3">
                                <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <Video class="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900 dark:text-white">Video Management</h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-300">Upload videos or use YouTube URLs</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-3">
                                <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                    <MousePointer class="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900 dark:text-white">Interactive Elements</h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-300">Add text, images, buttons, quizzes, and links</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-3">
                                <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                    <Play class="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900 dark:text-white">Real-time Preview</h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-300">See interactive elements in action while editing</p>
                                </div>
                            </div>
                        </div>

                        <!-- How it Works -->
                        <div class="border-t pt-6">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">How it Works</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div class="text-center">
                                    <div class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                                    <p class="text-sm text-gray-600 dark:text-gray-300">Create Account</p>
                                </div>
                                <div class="text-center">
                                    <div class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                                    <p class="text-sm text-gray-600 dark:text-gray-300">Upload Video</p>
                                </div>
                                <div class="text-center">
                                    <div class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                                    <p class="text-sm text-gray-600 dark:text-gray-300">Add Elements</p>
                                </div>
                                <div class="text-center">
                                    <div class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">4</div>
                                    <p class="text-sm text-gray-600 dark:text-gray-300">Publish & Share</p>
                                </div>
                            </div>
                        </div>

                        <!-- Call to Action -->
                        <div class="text-center pt-6">
                            <template v-if="!$page.props.auth.user">
                                <p class="text-gray-600 dark:text-gray-300 mb-4">Ready to create your first interactive video?</p>
                                <div class="flex gap-4 justify-center">
                                    <Link :href="register()">
                                        <Button size="lg" class="gap-2">
                                            <Video class="h-5 w-5" />
                                            Get Started Free
                                        </Button>
                                    </Link>
                                    <Link :href="login()">
                                        <Button variant="outline" size="lg">
                                            Sign In
                                        </Button>
                                    </Link>
                                </div>
                            </template>
                            <template v-else>
                                <Link :href="dashboard()">
                                    <Button size="lg" class="gap-2">
                                        <Video class="h-5 w-5" />
                                        Go to Dashboard
                                    </Button>
                                </Link>
                            </template>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    </div>
</template>
