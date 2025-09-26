# **Vue 3 \+ TypeScript Advanced Assessment (Round 2\)**

## **30 Questions \- 25 Minutes**

---

**Question 1** What is the correct way to type a custom directive in Vue 3 with TypeScript?

A) `const vFocus: Directive = { mounted: (el) => el.focus() }` 

B) `const vFocus: DirectiveBinding<HTMLElement> = { mounted: (el) => el.focus() }` 

C) `const vFocus = { mounted: (el: HTMLElement) => el.focus() } as Directive` 

D) Both A and C are correct

---

**Question 2** In Vue 3 Composition API, what happens if you call `reactive()` on a ref object?

A) It throws an error 

B) It returns the original ref unchanged 

C) It creates a new reactive object wrapping the ref 

D) It unwraps the ref and makes its value reactive

---

**Question 3** How should you properly type a composable that returns both sync and async data?

function useUserData(id: string) {  
  // What should be the return type?  
}

A) `{ user: Ref<User | null>, loading: Ref<boolean>, error: Ref<Error | null> }` 

B) `Promise<{ user: User }>` 

C) `{ user: ComputedRef<User>, isLoading: boolean }` 

D) `UserData | Promise<UserData>`

---

**Question 4** What is the difference between `nextTick()` and `onUpdated()` in Vue 3?

A) No difference, they are aliases 

B) `nextTick()` runs after DOM updates, `onUpdated()` runs before 

C) `nextTick()` is a one-time callback, `onUpdated()` runs after every update 

D) `nextTick()` is synchronous, `onUpdated()` is asynchronous

---

**Question 5** In TypeScript with Vue 3, how do you create a strongly-typed event bus?

A) Use `mitt` library with generic types 

B) Create a custom event emitter with typed methods 

C) Use provide/inject with typed event handlers 

D) All of the above are valid approaches

---

**Question 6** What is the correct way to handle dynamic component typing in Vue 3?

\<component :is="componentType" v-bind="props" /\>

A) `const componentType: Component = MyComponent` 

B) `const componentType: DefineComponent = MyComponent` 

C) `const componentType = shallowRef<Component>(MyComponent)` 

D) `const componentType = markRaw(MyComponent)`

---

**Question 7** How do you properly type a watcher that observes a reactive object's specific property?

A) `watch(() => state.user.name, (newName, oldName) => {})` 

B) `watch(toRef(state.user, 'name'), (newName, oldName) => {})` 

C) `watch(() => state.user, (newUser, oldUser) => {}, { deep: true })` 

D) Both A and B are correct

---

**Question 8** What is the correct TypeScript pattern for creating a plugin in Vue 3?

A) `const plugin = { install: (app: App) => {} }` 

B) `const plugin: Plugin = { install(app) { } }` 

C) `const plugin = (app: App) => {}` 

D) Both A and B are correct

---

**Question 9** In Vue 3 with `<script setup>`, how do you access the component instance?

A) `const instance = getCurrentInstance()` 

B) `const instance = this` 

C) `const instance = useCurrentInstance()` 

D) Component instance is not accessible in `<script setup>`

---

**Question 10** What is the correct way to type a computed property that depends on multiple refs with different types?

const name \= ref\<string\>('')  
const age \= ref\<number\>(0)  
const display \= computed(() \=\> {  
  // What's the proper typing approach?  
})

A) `computed<string>(() => \`${name.value} (${age.value})\`)`

B) `computed(() \=\> \`${name.value} (${age.value})\`) as ComputedRef\<string\>` 

C) TypeScript automatically infers the return type 

D) All of the above work

---

**Question 11** How should you handle errors in async composables with TypeScript?

A) Always throw errors and let components handle them 

B) Return error state as part of the composable return value 

C) Use try/catch internally and provide error refs 

D) Both B and C are valid patterns

---

**Question 12** What is the correct way to type a generic component in Vue 3?

\<script setup lang="ts" generic="T"\>  
interface Props\<T\> {  
  items: T\[\]  
  keyField: keyof T  
}

A) This syntax is correct 

B) `<script setup lang="ts">` with `defineGeneric<T>()` 

C) Generics are not supported in SFC components 

D) Use `defineComponent` with generic constraints

---

**Question 13** In Vue 3, what is the difference between `effectScope()` and regular composables?

A) `effectScope()` is deprecated 

B) `effectScope()` allows manual control over effect disposal 

C) `effectScope()` is only for computed properties 

D) No difference in functionality

---

**Question 14** How do you properly type a teleport destination in Vue 3 with TypeScript?

A) `<Teleport to="#modal">` 

B) `<Teleport :to="modalRef">` 

C) `<Teleport to={document.getElementById('modal')!}>` 

D) All of the above are valid

---

**Question 15** What is the correct pattern for typing a composable that uses dependency injection?

function useTheme() {  
  const theme \= inject(themeKey)  
  // How to handle potential undefined?  
}

A) `const theme = inject(themeKey)!` 

B) `const theme = inject(themeKey, defaultTheme)` 

C) `const theme = inject(themeKey); if (!theme) throw new Error(...)` 

D) Both B and C are correct

---

**Question 16** In Vue 3 with TypeScript, how do you create a typed global property?

A) Add to `app.config.globalProperties` with module augmentation 

B) Use provide/inject with typed keys 

C) Create a plugin with typed methods 

D) All of the above can work

---

**Question 17** What is the correct way to handle multiple template refs in a loop with TypeScript?

\<div v-for="item in items" :key="item.id" :ref="el \=\> setRef(el, item.id)"\>

A) `const refs = ref<HTMLElement[]>([])` 

B) `const refs = ref<Map<string, HTMLElement>>(new Map())` 

C) `const refs = shallowRef<Record<string, HTMLElement>>({})` 

D) Both B and C are valid patterns

---

**Question 18** How should you type a watcher that might be conditionally created?

if (condition) {  
  watch(source, callback)  
}

A) `let watcher: WatchStopHandle | undefined` 

B) `const watcher: WatchStopHandle | null = condition ? watch(...) : null` 

C) Store the result and call it to stop watching 

D) Both A and C are correct

---

**Question 19** What is the correct way to type slots with specific props in Vue 3?

\<template\>  
  \<slot :item="item" :index="index" /\>  
\</template\>

A) `defineSlots<{ default(props: { item: T, index: number }): any }>()` 

B) `interface Slots { default: (props: { item: T, index: number }) => VNode[] }`

C) Slots are automatically typed from usage 

D) Both A and B are correct

---

**Question 20** In Vue 3 Composition API, what is the correct way to create a debounced ref?

A) Use `watchEffect` with setTimeout 

B) Use `watch` with debounce logic 

C) Create a custom composable with debounced reactivity 

D) Use `computed` with delay

---

**Question 21** How do you properly type a component that accepts dynamic slots?

// Component accepts slots like: header, content, footer

A) `defineSlots<Record<string, any>>()` 

B) `defineSlots<{ [K in 'header' | 'content' | 'footer']?: () => any }>()` 

C) `useSlots()` automatically provides correct types 

D) Slots cannot be dynamically typed

---

**Question 22** What is the correct approach for typing a custom v-model implementation?

\<script setup\>  
// Custom v-model for object property  
\</script\>

A) `defineProps<{ modelValue: T }>()` and `defineEmits<{ 'update:modelValue': [value: T] }>()` 

B) `defineModel<T>()` 

C) Use computed with getter/setter

D) Both A and B are correct

---

**Question 23** In Vue 3, how should you handle typing for dynamic imports of components?

const AsyncComponent \= defineAsyncComponent(() \=\> import('./Component.vue'))

A) `defineAsyncComponent<ComponentType>(() => import('./Component.vue'))` 

B) TypeScript automatically infers the component type 

C) `const AsyncComponent: AsyncComponentLoader = defineAsyncComponent(...)` 

D) Both B and C are correct

---

**Question 24** What is the correct way to type a composable that returns different data based on input type?

function useAPI\<T\>(endpoint: string): APIResult\<T\> {  
  // Conditional return based on T  
}

A) Use function overloads 

B) Use conditional types 

C) Use union types 

D) All of the above can be appropriate

---

**Question 25** How do you properly handle SSR (Server-Side Rendering) types in Vue 3 composables?

A) Use `process.server` checks 

B) Use `import.meta.server` checks 

C) Use `onMounted` to ensure client-side execution 

D) SSR doesn't affect TypeScript typing

---

**Question 26** What is the correct pattern for typing a higher-order component (HOC) in Vue 3?

function withAuth\<T\>(component: T): T & AuthProps

A) This syntax is correct 

B) `function withAuth<T extends Component>(component: T): Component` 

C) Use `DefineComponent` with generic constraints 

D) HOCs are not recommended in Vue 3

---

**Question 27** In Vue 3 with TypeScript, how do you create a typed custom hook that manages local storage?

function useLocalStorage\<T\>(key: string, defaultValue: T) {  
  // Implementation  
}

A) Return `[Ref<T>, (value: T) => void]` 

B) Return `{ value: Ref<T>, setValue: (value: T) => void }` 

C) Return `ComputedRef<T>` with setter 

D) All patterns are valid depending on use case

---

**Question 28** What is the correct way to type a component that conditionally renders different child components?

\<component :is="currentComponent" v-bind="currentProps" /\>

A) Use union types for component and props 

B) Use generic constraints with conditional types 

C) Use `any` type for flexibility 

D) Both A and B are valid approaches

---

**Question 29** How should you type a watcher that observes changes in a complex nested object?

const state \= reactive({  
  user: {  
    profile: {  
      name: string  
    }  
  }  
})

A) `watch(() => state.user.profile.name, callback)` 

B) `watch(() => state.user, callback, { deep: true })` 

C) `watch(state, callback, { deep: true })` 

D) All of the above work but with different performance implications

---

**Question 30** What is the most type-safe way to handle dynamic component registration in Vue 3?

A) Use string literals with component map 

B) Use const assertions with as const 

C) Create a typed registry with proper component interfaces 

D) Use module augmentation to extend global components

---

## **Answer Key**

1. **D** \- Both `Directive` type and `as Directive` assertion work. The `DirectiveBinding` in option B is incorrect usage.

2. **B** \- Vue 3 automatically unwraps refs when passed to `reactive()`, returning the original ref unchanged.

3. **A** \- Async composables should return reactive state including loading and error states, not promises directly.

4. **C** \- `nextTick()` is a one-time callback after next DOM update, while `onUpdated()` runs after every component update.

5. **D** \- All approaches are valid: mitt with types, custom typed emitters, or provide/inject patterns.

6. **C** \- Use `shallowRef<Component>()` for dynamic components to avoid deep reactivity on the component object.

7. **D** \- Both getter functions and `toRef()` work correctly for watching specific object properties.

8. **D** \- Both explicit `Plugin` typing and object with install method work correctly.

9. **A** \- Use `getCurrentInstance()` in setup, but be careful about timing and null checks.

10. **D** \- All approaches work. TypeScript inference is usually sufficient, but explicit typing is also valid.

11. **D** \- Both returning error state and using error refs are valid patterns for error handling in composables.

12. **A** \- The generic syntax with `<script setup lang="ts" generic="T">` is correct for generic components.

13. **B** \- `effectScope()` provides manual control over when effects are disposed, useful for advanced scenarios.

14. **D** \- Teleport accepts strings, refs, or DOM elements as destinations.

15. **D** \- Both providing defaults and explicit error handling are correct patterns for inject.

16. **A** \- Module augmentation is the proper TypeScript way to type global properties.

17. **D** \- Both Map and Record patterns work for managing multiple template refs with keys.

18. **D** \- Store the watch stop handle and call it when needed to stop watching.

19. **A** \- Use `defineSlots` with proper prop typing for scoped slots.

20. **C** \- Create a custom composable that handles debouncing with proper reactivity.

21. **B** \- Use mapped types with specific slot names for better type safety.

22. **D** \- Both traditional props/emits and `defineModel()` (Vue 3.3+) work for v-model.

23. **B** \- TypeScript can infer component types from dynamic imports automatically.

24. **D** \- Function overloads, conditional types, and union types can all be appropriate.

25. **C** \- Use `onMounted` to ensure client-side execution; SSR affects runtime but not TypeScript typing directly.

26. **D** \- HOCs are not the recommended pattern in Vue 3; use composables instead.

27. **D** \- All patterns are valid; choose based on your API preference and use case.

28. **D** \- Both union types and generic constraints with conditionals work for dynamic component typing.

29. **D** \- All work but have different performance: specific property watching is most efficient.

30. **C** \- A typed registry with proper interfaces provides the best type safety for dynamic components.

