import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\InteractiveElementController::activate
* @see app/Http/Controllers/InteractiveElementController.php:31
* @route '/interactive-elements/{interactiveElement}/activate'
*/
export const activate = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activate.url(args, options),
    method: 'get',
})

activate.definition = {
    methods: ["get","head"],
    url: '/interactive-elements/{interactiveElement}/activate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InteractiveElementController::activate
* @see app/Http/Controllers/InteractiveElementController.php:31
* @route '/interactive-elements/{interactiveElement}/activate'
*/
activate.url = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { interactiveElement: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { interactiveElement: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            interactiveElement: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        interactiveElement: typeof args.interactiveElement === 'object'
        ? args.interactiveElement.id
        : args.interactiveElement,
    }

    return activate.definition.url
            .replace('{interactiveElement}', parsedArgs.interactiveElement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InteractiveElementController::activate
* @see app/Http/Controllers/InteractiveElementController.php:31
* @route '/interactive-elements/{interactiveElement}/activate'
*/
activate.get = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activate.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::activate
* @see app/Http/Controllers/InteractiveElementController.php:31
* @route '/interactive-elements/{interactiveElement}/activate'
*/
activate.head = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: activate.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::activate
* @see app/Http/Controllers/InteractiveElementController.php:31
* @route '/interactive-elements/{interactiveElement}/activate'
*/
const activateForm = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: activate.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::activate
* @see app/Http/Controllers/InteractiveElementController.php:31
* @route '/interactive-elements/{interactiveElement}/activate'
*/
activateForm.get = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: activate.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::activate
* @see app/Http/Controllers/InteractiveElementController.php:31
* @route '/interactive-elements/{interactiveElement}/activate'
*/
activateForm.head = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: activate.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

activate.form = activateForm

/**
* @see \App\Http\Controllers\InteractiveElementController::deactivate
* @see app/Http/Controllers/InteractiveElementController.php:37
* @route '/interactive-elements/{interactiveElement}/deactivate'
*/
export const deactivate = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: deactivate.url(args, options),
    method: 'get',
})

deactivate.definition = {
    methods: ["get","head"],
    url: '/interactive-elements/{interactiveElement}/deactivate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InteractiveElementController::deactivate
* @see app/Http/Controllers/InteractiveElementController.php:37
* @route '/interactive-elements/{interactiveElement}/deactivate'
*/
deactivate.url = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { interactiveElement: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { interactiveElement: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            interactiveElement: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        interactiveElement: typeof args.interactiveElement === 'object'
        ? args.interactiveElement.id
        : args.interactiveElement,
    }

    return deactivate.definition.url
            .replace('{interactiveElement}', parsedArgs.interactiveElement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InteractiveElementController::deactivate
* @see app/Http/Controllers/InteractiveElementController.php:37
* @route '/interactive-elements/{interactiveElement}/deactivate'
*/
deactivate.get = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: deactivate.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::deactivate
* @see app/Http/Controllers/InteractiveElementController.php:37
* @route '/interactive-elements/{interactiveElement}/deactivate'
*/
deactivate.head = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: deactivate.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::deactivate
* @see app/Http/Controllers/InteractiveElementController.php:37
* @route '/interactive-elements/{interactiveElement}/deactivate'
*/
const deactivateForm = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: deactivate.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::deactivate
* @see app/Http/Controllers/InteractiveElementController.php:37
* @route '/interactive-elements/{interactiveElement}/deactivate'
*/
deactivateForm.get = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: deactivate.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::deactivate
* @see app/Http/Controllers/InteractiveElementController.php:37
* @route '/interactive-elements/{interactiveElement}/deactivate'
*/
deactivateForm.head = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: deactivate.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

deactivate.form = deactivateForm

/**
* @see \App\Http\Controllers\InteractiveElementController::reorder
* @see app/Http/Controllers/InteractiveElementController.php:43
* @route '/videos/{video}/reorder-elements'
*/
export const reorder = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reorder.url(args, options),
    method: 'get',
})

reorder.definition = {
    methods: ["get","head"],
    url: '/videos/{video}/reorder-elements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InteractiveElementController::reorder
* @see app/Http/Controllers/InteractiveElementController.php:43
* @route '/videos/{video}/reorder-elements'
*/
reorder.url = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return reorder.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InteractiveElementController::reorder
* @see app/Http/Controllers/InteractiveElementController.php:43
* @route '/videos/{video}/reorder-elements'
*/
reorder.get = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reorder.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::reorder
* @see app/Http/Controllers/InteractiveElementController.php:43
* @route '/videos/{video}/reorder-elements'
*/
reorder.head = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reorder.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::reorder
* @see app/Http/Controllers/InteractiveElementController.php:43
* @route '/videos/{video}/reorder-elements'
*/
const reorderForm = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reorder.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::reorder
* @see app/Http/Controllers/InteractiveElementController.php:43
* @route '/videos/{video}/reorder-elements'
*/
reorderForm.get = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reorder.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::reorder
* @see app/Http/Controllers/InteractiveElementController.php:43
* @route '/videos/{video}/reorder-elements'
*/
reorderForm.head = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reorder.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

reorder.form = reorderForm

/**
* @see \App\Http\Controllers\InteractiveElementController::copy
* @see app/Http/Controllers/InteractiveElementController.php:52
* @route '/interactive-elements/{interactiveElement}/copy'
*/
export const copy = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: copy.url(args, options),
    method: 'get',
})

copy.definition = {
    methods: ["get","head"],
    url: '/interactive-elements/{interactiveElement}/copy',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InteractiveElementController::copy
* @see app/Http/Controllers/InteractiveElementController.php:52
* @route '/interactive-elements/{interactiveElement}/copy'
*/
copy.url = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { interactiveElement: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { interactiveElement: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            interactiveElement: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        interactiveElement: typeof args.interactiveElement === 'object'
        ? args.interactiveElement.id
        : args.interactiveElement,
    }

    return copy.definition.url
            .replace('{interactiveElement}', parsedArgs.interactiveElement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InteractiveElementController::copy
* @see app/Http/Controllers/InteractiveElementController.php:52
* @route '/interactive-elements/{interactiveElement}/copy'
*/
copy.get = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: copy.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::copy
* @see app/Http/Controllers/InteractiveElementController.php:52
* @route '/interactive-elements/{interactiveElement}/copy'
*/
copy.head = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: copy.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::copy
* @see app/Http/Controllers/InteractiveElementController.php:52
* @route '/interactive-elements/{interactiveElement}/copy'
*/
const copyForm = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: copy.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::copy
* @see app/Http/Controllers/InteractiveElementController.php:52
* @route '/interactive-elements/{interactiveElement}/copy'
*/
copyForm.get = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: copy.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::copy
* @see app/Http/Controllers/InteractiveElementController.php:52
* @route '/interactive-elements/{interactiveElement}/copy'
*/
copyForm.head = (args: { interactiveElement: string | number | { id: string | number } } | [interactiveElement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: copy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

copy.form = copyForm

/**
* @see \App\Http\Controllers\InteractiveElementController::create
* @see app/Http/Controllers/InteractiveElementController.php:0
* @route '/videos/{video}/interactive-elements/create'
*/
export const create = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/videos/{video}/interactive-elements/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InteractiveElementController::create
* @see app/Http/Controllers/InteractiveElementController.php:0
* @route '/videos/{video}/interactive-elements/create'
*/
create.url = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InteractiveElementController::create
* @see app/Http/Controllers/InteractiveElementController.php:0
* @route '/videos/{video}/interactive-elements/create'
*/
create.get = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::create
* @see app/Http/Controllers/InteractiveElementController.php:0
* @route '/videos/{video}/interactive-elements/create'
*/
create.head = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::create
* @see app/Http/Controllers/InteractiveElementController.php:0
* @route '/videos/{video}/interactive-elements/create'
*/
const createForm = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::create
* @see app/Http/Controllers/InteractiveElementController.php:0
* @route '/videos/{video}/interactive-elements/create'
*/
createForm.get = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::create
* @see app/Http/Controllers/InteractiveElementController.php:0
* @route '/videos/{video}/interactive-elements/create'
*/
createForm.head = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\InteractiveElementController::store
* @see app/Http/Controllers/InteractiveElementController.php:13
* @route '/videos/{video}/interactive-elements'
*/
export const store = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/videos/{video}/interactive-elements',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InteractiveElementController::store
* @see app/Http/Controllers/InteractiveElementController.php:13
* @route '/videos/{video}/interactive-elements'
*/
store.url = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InteractiveElementController::store
* @see app/Http/Controllers/InteractiveElementController.php:13
* @route '/videos/{video}/interactive-elements'
*/
store.post = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::store
* @see app/Http/Controllers/InteractiveElementController.php:13
* @route '/videos/{video}/interactive-elements'
*/
const storeForm = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::store
* @see app/Http/Controllers/InteractiveElementController.php:13
* @route '/videos/{video}/interactive-elements'
*/
storeForm.post = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\InteractiveElementController::edit
* @see app/Http/Controllers/InteractiveElementController.php:0
* @route '/videos/{video}/interactive-elements/{interactive_element}/edit'
*/
export const edit = (args: { video: string | number, interactive_element: string | number } | [video: string | number, interactive_element: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/videos/{video}/interactive-elements/{interactive_element}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InteractiveElementController::edit
* @see app/Http/Controllers/InteractiveElementController.php:0
* @route '/videos/{video}/interactive-elements/{interactive_element}/edit'
*/
edit.url = (args: { video: string | number, interactive_element: string | number } | [video: string | number, interactive_element: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            video: args[0],
            interactive_element: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        video: args.video,
        interactive_element: args.interactive_element,
    }

    return edit.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace('{interactive_element}', parsedArgs.interactive_element.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InteractiveElementController::edit
* @see app/Http/Controllers/InteractiveElementController.php:0
* @route '/videos/{video}/interactive-elements/{interactive_element}/edit'
*/
edit.get = (args: { video: string | number, interactive_element: string | number } | [video: string | number, interactive_element: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::edit
* @see app/Http/Controllers/InteractiveElementController.php:0
* @route '/videos/{video}/interactive-elements/{interactive_element}/edit'
*/
edit.head = (args: { video: string | number, interactive_element: string | number } | [video: string | number, interactive_element: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::edit
* @see app/Http/Controllers/InteractiveElementController.php:0
* @route '/videos/{video}/interactive-elements/{interactive_element}/edit'
*/
const editForm = (args: { video: string | number, interactive_element: string | number } | [video: string | number, interactive_element: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::edit
* @see app/Http/Controllers/InteractiveElementController.php:0
* @route '/videos/{video}/interactive-elements/{interactive_element}/edit'
*/
editForm.get = (args: { video: string | number, interactive_element: string | number } | [video: string | number, interactive_element: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::edit
* @see app/Http/Controllers/InteractiveElementController.php:0
* @route '/videos/{video}/interactive-elements/{interactive_element}/edit'
*/
editForm.head = (args: { video: string | number, interactive_element: string | number } | [video: string | number, interactive_element: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\InteractiveElementController::update
* @see app/Http/Controllers/InteractiveElementController.php:19
* @route '/videos/{video}/interactive-elements/{interactive_element}'
*/
export const update = (args: { video: string | number | { id: string | number }, interactive_element: string | number } | [video: string | number | { id: string | number }, interactive_element: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/videos/{video}/interactive-elements/{interactive_element}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\InteractiveElementController::update
* @see app/Http/Controllers/InteractiveElementController.php:19
* @route '/videos/{video}/interactive-elements/{interactive_element}'
*/
update.url = (args: { video: string | number | { id: string | number }, interactive_element: string | number } | [video: string | number | { id: string | number }, interactive_element: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            video: args[0],
            interactive_element: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        video: typeof args.video === 'object'
        ? args.video.id
        : args.video,
        interactive_element: args.interactive_element,
    }

    return update.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace('{interactive_element}', parsedArgs.interactive_element.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InteractiveElementController::update
* @see app/Http/Controllers/InteractiveElementController.php:19
* @route '/videos/{video}/interactive-elements/{interactive_element}'
*/
update.put = (args: { video: string | number | { id: string | number }, interactive_element: string | number } | [video: string | number | { id: string | number }, interactive_element: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::update
* @see app/Http/Controllers/InteractiveElementController.php:19
* @route '/videos/{video}/interactive-elements/{interactive_element}'
*/
update.patch = (args: { video: string | number | { id: string | number }, interactive_element: string | number } | [video: string | number | { id: string | number }, interactive_element: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::update
* @see app/Http/Controllers/InteractiveElementController.php:19
* @route '/videos/{video}/interactive-elements/{interactive_element}'
*/
const updateForm = (args: { video: string | number | { id: string | number }, interactive_element: string | number } | [video: string | number | { id: string | number }, interactive_element: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::update
* @see app/Http/Controllers/InteractiveElementController.php:19
* @route '/videos/{video}/interactive-elements/{interactive_element}'
*/
updateForm.put = (args: { video: string | number | { id: string | number }, interactive_element: string | number } | [video: string | number | { id: string | number }, interactive_element: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::update
* @see app/Http/Controllers/InteractiveElementController.php:19
* @route '/videos/{video}/interactive-elements/{interactive_element}'
*/
updateForm.patch = (args: { video: string | number | { id: string | number }, interactive_element: string | number } | [video: string | number | { id: string | number }, interactive_element: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\InteractiveElementController::destroy
* @see app/Http/Controllers/InteractiveElementController.php:25
* @route '/videos/{video}/interactive-elements/{interactive_element}'
*/
export const destroy = (args: { video: string | number | { id: string | number }, interactive_element: string | number } | [video: string | number | { id: string | number }, interactive_element: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/videos/{video}/interactive-elements/{interactive_element}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\InteractiveElementController::destroy
* @see app/Http/Controllers/InteractiveElementController.php:25
* @route '/videos/{video}/interactive-elements/{interactive_element}'
*/
destroy.url = (args: { video: string | number | { id: string | number }, interactive_element: string | number } | [video: string | number | { id: string | number }, interactive_element: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            video: args[0],
            interactive_element: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        video: typeof args.video === 'object'
        ? args.video.id
        : args.video,
        interactive_element: args.interactive_element,
    }

    return destroy.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace('{interactive_element}', parsedArgs.interactive_element.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InteractiveElementController::destroy
* @see app/Http/Controllers/InteractiveElementController.php:25
* @route '/videos/{video}/interactive-elements/{interactive_element}'
*/
destroy.delete = (args: { video: string | number | { id: string | number }, interactive_element: string | number } | [video: string | number | { id: string | number }, interactive_element: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::destroy
* @see app/Http/Controllers/InteractiveElementController.php:25
* @route '/videos/{video}/interactive-elements/{interactive_element}'
*/
const destroyForm = (args: { video: string | number | { id: string | number }, interactive_element: string | number } | [video: string | number | { id: string | number }, interactive_element: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InteractiveElementController::destroy
* @see app/Http/Controllers/InteractiveElementController.php:25
* @route '/videos/{video}/interactive-elements/{interactive_element}'
*/
destroyForm.delete = (args: { video: string | number | { id: string | number }, interactive_element: string | number } | [video: string | number | { id: string | number }, interactive_element: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const InteractiveElementController = { activate, deactivate, reorder, copy, create, store, edit, update, destroy }

export default InteractiveElementController