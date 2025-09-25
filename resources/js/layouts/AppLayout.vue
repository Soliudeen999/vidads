<script setup lang="ts">
import AppLayout from '@/layouts/app/AppSidebarLayout.vue';
import type { BreadcrumbItemType } from '@/types';
import { usePage } from '@inertiajs/vue3'
import { toast } from "vue3-toastify";

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

const page = usePage();


if (page.props.flash?.success) {
  toast.success(page.props.flash.success, {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
  })
}

if (page.props.flash?.error) {
  toast.error(page.props.flash.error, {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
  })
}

</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <slot />
    </AppLayout>
</template>
