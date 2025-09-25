import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VideoController::preview
* @see app/Http/Controllers/VideoController.php:71
* @route '/videos/{video}/preview'
*/
export const preview = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

preview.definition = {
    methods: ["get","head"],
    url: '/videos/{video}/preview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VideoController::preview
* @see app/Http/Controllers/VideoController.php:71
* @route '/videos/{video}/preview'
*/
preview.url = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { video: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { video: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            video: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        video: typeof args.video === 'object'
        ? args.video.id
        : args.video,
    }

    return preview.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VideoController::preview
* @see app/Http/Controllers/VideoController.php:71
* @route '/videos/{video}/preview'
*/
preview.get = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::preview
* @see app/Http/Controllers/VideoController.php:71
* @route '/videos/{video}/preview'
*/
preview.head = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preview.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VideoController::preview
* @see app/Http/Controllers/VideoController.php:71
* @route '/videos/{video}/preview'
*/
const previewForm = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: preview.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::preview
* @see app/Http/Controllers/VideoController.php:71
* @route '/videos/{video}/preview'
*/
previewForm.get = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: preview.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::preview
* @see app/Http/Controllers/VideoController.php:71
* @route '/videos/{video}/preview'
*/
previewForm.head = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: preview.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

preview.form = previewForm

/**
* @see \App\Http\Controllers\VideoController::publish
* @see app/Http/Controllers/VideoController.php:59
* @route '/videos/{video}/publish'
*/
export const publish = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publish.url(args, options),
    method: 'get',
})

publish.definition = {
    methods: ["get","head"],
    url: '/videos/{video}/publish',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VideoController::publish
* @see app/Http/Controllers/VideoController.php:59
* @route '/videos/{video}/publish'
*/
publish.url = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { video: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { video: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            video: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        video: typeof args.video === 'object'
        ? args.video.id
        : args.video,
    }

    return publish.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VideoController::publish
* @see app/Http/Controllers/VideoController.php:59
* @route '/videos/{video}/publish'
*/
publish.get = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publish.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::publish
* @see app/Http/Controllers/VideoController.php:59
* @route '/videos/{video}/publish'
*/
publish.head = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publish.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VideoController::publish
* @see app/Http/Controllers/VideoController.php:59
* @route '/videos/{video}/publish'
*/
const publishForm = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: publish.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::publish
* @see app/Http/Controllers/VideoController.php:59
* @route '/videos/{video}/publish'
*/
publishForm.get = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: publish.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::publish
* @see app/Http/Controllers/VideoController.php:59
* @route '/videos/{video}/publish'
*/
publishForm.head = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: publish.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

publish.form = publishForm

/**
* @see \App\Http\Controllers\VideoController::unpublish
* @see app/Http/Controllers/VideoController.php:65
* @route '/videos/{video}/unpublish'
*/
export const unpublish = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: unpublish.url(args, options),
    method: 'get',
})

unpublish.definition = {
    methods: ["get","head"],
    url: '/videos/{video}/unpublish',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VideoController::unpublish
* @see app/Http/Controllers/VideoController.php:65
* @route '/videos/{video}/unpublish'
*/
unpublish.url = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { video: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { video: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            video: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        video: typeof args.video === 'object'
        ? args.video.id
        : args.video,
    }

    return unpublish.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VideoController::unpublish
* @see app/Http/Controllers/VideoController.php:65
* @route '/videos/{video}/unpublish'
*/
unpublish.get = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: unpublish.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::unpublish
* @see app/Http/Controllers/VideoController.php:65
* @route '/videos/{video}/unpublish'
*/
unpublish.head = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: unpublish.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VideoController::unpublish
* @see app/Http/Controllers/VideoController.php:65
* @route '/videos/{video}/unpublish'
*/
const unpublishForm = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: unpublish.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::unpublish
* @see app/Http/Controllers/VideoController.php:65
* @route '/videos/{video}/unpublish'
*/
unpublishForm.get = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: unpublish.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::unpublish
* @see app/Http/Controllers/VideoController.php:65
* @route '/videos/{video}/unpublish'
*/
unpublishForm.head = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: unpublish.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

unpublish.form = unpublishForm

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:13
* @route '/videos'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/videos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:13
* @route '/videos'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:13
* @route '/videos'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:13
* @route '/videos'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:13
* @route '/videos'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:13
* @route '/videos'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:13
* @route '/videos'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\VideoController::create
* @see app/Http/Controllers/VideoController.php:25
* @route '/videos/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/videos/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VideoController::create
* @see app/Http/Controllers/VideoController.php:25
* @route '/videos/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VideoController::create
* @see app/Http/Controllers/VideoController.php:25
* @route '/videos/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::create
* @see app/Http/Controllers/VideoController.php:25
* @route '/videos/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VideoController::create
* @see app/Http/Controllers/VideoController.php:25
* @route '/videos/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::create
* @see app/Http/Controllers/VideoController.php:25
* @route '/videos/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::create
* @see app/Http/Controllers/VideoController.php:25
* @route '/videos/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\VideoController::store
* @see app/Http/Controllers/VideoController.php:30
* @route '/videos'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/videos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VideoController::store
* @see app/Http/Controllers/VideoController.php:30
* @route '/videos'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VideoController::store
* @see app/Http/Controllers/VideoController.php:30
* @route '/videos'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VideoController::store
* @see app/Http/Controllers/VideoController.php:30
* @route '/videos'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VideoController::store
* @see app/Http/Controllers/VideoController.php:30
* @route '/videos'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\VideoController::show
* @see app/Http/Controllers/VideoController.php:0
* @route '/videos/{video}'
*/
export const show = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/videos/{video}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VideoController::show
* @see app/Http/Controllers/VideoController.php:0
* @route '/videos/{video}'
*/
show.url = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { video: args }
    }

    if (Array.isArray(args)) {
        args = {
            video: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        video: args.video,
    }

    return show.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VideoController::show
* @see app/Http/Controllers/VideoController.php:0
* @route '/videos/{video}'
*/
show.get = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::show
* @see app/Http/Controllers/VideoController.php:0
* @route '/videos/{video}'
*/
show.head = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VideoController::show
* @see app/Http/Controllers/VideoController.php:0
* @route '/videos/{video}'
*/
const showForm = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::show
* @see app/Http/Controllers/VideoController.php:0
* @route '/videos/{video}'
*/
showForm.get = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::show
* @see app/Http/Controllers/VideoController.php:0
* @route '/videos/{video}'
*/
showForm.head = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\VideoController::edit
* @see app/Http/Controllers/VideoController.php:36
* @route '/videos/{video}/edit'
*/
export const edit = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/videos/{video}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VideoController::edit
* @see app/Http/Controllers/VideoController.php:36
* @route '/videos/{video}/edit'
*/
edit.url = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { video: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { video: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            video: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        video: typeof args.video === 'object'
        ? args.video.id
        : args.video,
    }

    return edit.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VideoController::edit
* @see app/Http/Controllers/VideoController.php:36
* @route '/videos/{video}/edit'
*/
edit.get = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::edit
* @see app/Http/Controllers/VideoController.php:36
* @route '/videos/{video}/edit'
*/
edit.head = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VideoController::edit
* @see app/Http/Controllers/VideoController.php:36
* @route '/videos/{video}/edit'
*/
const editForm = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::edit
* @see app/Http/Controllers/VideoController.php:36
* @route '/videos/{video}/edit'
*/
editForm.get = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::edit
* @see app/Http/Controllers/VideoController.php:36
* @route '/videos/{video}/edit'
*/
editForm.head = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\VideoController::update
* @see app/Http/Controllers/VideoController.php:43
* @route '/videos/{video}'
*/
export const update = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/videos/{video}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\VideoController::update
* @see app/Http/Controllers/VideoController.php:43
* @route '/videos/{video}'
*/
update.url = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { video: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { video: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            video: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        video: typeof args.video === 'object'
        ? args.video.id
        : args.video,
    }

    return update.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VideoController::update
* @see app/Http/Controllers/VideoController.php:43
* @route '/videos/{video}'
*/
update.put = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\VideoController::update
* @see app/Http/Controllers/VideoController.php:43
* @route '/videos/{video}'
*/
update.patch = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VideoController::update
* @see app/Http/Controllers/VideoController.php:43
* @route '/videos/{video}'
*/
const updateForm = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VideoController::update
* @see app/Http/Controllers/VideoController.php:43
* @route '/videos/{video}'
*/
updateForm.put = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VideoController::update
* @see app/Http/Controllers/VideoController.php:43
* @route '/videos/{video}'
*/
updateForm.patch = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\VideoController::destroy
* @see app/Http/Controllers/VideoController.php:49
* @route '/videos/{video}'
*/
export const destroy = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/videos/{video}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VideoController::destroy
* @see app/Http/Controllers/VideoController.php:49
* @route '/videos/{video}'
*/
destroy.url = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { video: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { video: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            video: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        video: typeof args.video === 'object'
        ? args.video.id
        : args.video,
    }

    return destroy.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VideoController::destroy
* @see app/Http/Controllers/VideoController.php:49
* @route '/videos/{video}'
*/
destroy.delete = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\VideoController::destroy
* @see app/Http/Controllers/VideoController.php:49
* @route '/videos/{video}'
*/
const destroyForm = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VideoController::destroy
* @see app/Http/Controllers/VideoController.php:49
* @route '/videos/{video}'
*/
destroyForm.delete = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const VideoController = { preview, publish, unpublish, index, create, store, show, edit, update, destroy }

export default VideoController