# **Vue 3 \+ TypeScript Expert Assessment (Round 3\)**

## **30 Questions \- 25 Minutes \- HARDCORE LEVEL 🔥**

---

**Question 1** What happens when you use `reactive()` with a Date object in Vue 3?

A) The Date object becomes fully reactive 

B) Only the date value is reactive, methods are not tracked 

C) Date objects cannot be made reactive 

D) It creates a reactive proxy but Date methods may not trigger updates correctly

---

**Question 2** In Vue 3 with TypeScript, what's the correct way to type a composable that conditionally returns different reactive objects?

function useConditionalData\<T extends 'user' | 'product'\>(  
  type: T  
): T extends 'user' ? UserData : ProductData

A) This conditional type syntax is correct 

B) Use function overloads instead 

C) Use union return types 

D) Conditional types don't work with composables

---

**Question 3** What is the performance implication of using `reactive()` vs `ref()` for large arrays in Vue 3?

A) No performance difference 

B) `reactive()` is faster for arrays 

C) `ref()` is faster because it doesn't create deep proxies 

D) `shallowReactive()` should be used for large arrays

---

**Question 4** In Vue 3 Composition API, how do you create a computed property that can throw an error safely?

const riskyComputed \= computed(() \=\> {  
  if (someCondition) throw new Error('Something went wrong')  
  return someValue  
})

A) Wrap in try-catch inside the computed 

B) Use `computed()` with error boundaries 

C) Use a separate error ref and handle in the computed 

D) Computed properties should never throw errors

---

**Question 5** What's the difference between `unref()` and accessing `.value` on a potential ref?

A) No difference, they're identical 

B) `unref()` works on both refs and non-refs safely 

C) `unref()` unwraps nested refs, `.value` doesn't 

D) `unref()` is deprecated in favor of `.value`

---

**Question 6** In Vue 3 with TypeScript, how do you properly type a component that uses the Options API with Composition API functions?

\<script lang="ts"\>  
export default defineComponent({  
  setup() { },  
  data() { },  
  methods: { }  
})  
\</script\>

A) Use `DefineComponent` with proper generic constraints 

B) Separate the concerns \- don't mix APIs 

C) Use intersection types for the component definition 

D) Vue 3 doesn't support mixing APIs with TypeScript

---

**Question 7** What is the correct way to handle reactive prop mutations that should not affect parent component?

const props \= defineProps\<{ user: User }\>()  
// Need to modify user locally without affecting parent

A) `const localUser = reactive({ ...props.user })` 

B) `const localUser = ref(structuredClone(props.user))` 

C) `const localUser = toRef(props, 'user')` 

D) Both A and B are correct

---

**Question 8** In Vue 3, what's the most efficient way to watch for changes in a specific property of all objects in a reactive array?

const users \= reactive(\[  
  { id: 1, name: 'John', active: true },  
  { id: 2, name: 'Jane', active: false }  
\])  
// Watch for active property changes

A) `watch(() => users.map(u => u.active), callback)` 

B) `watch(users, callback, { deep: true })` 

C) `watchEffect(() => { users.forEach(u => u.active) })` 

D) Use a computed property with the mapped values

---

**Question 9** How do you create a typed custom ref that transforms values on get/set operations?

function useTransformRef\<T, U\>(  
  initial: T,  
  transform: (value: T) \=\> U,  
  reverse: (value: U) \=\> T  
) {  
  // Implementation  
}

A) Use `customRef()` with proper typing 

B) Use computed with getter/setter 

C) Use regular ref with transform in computed 

D) Both A and B are valid approaches

---

**Question 10** What's the correct pattern for creating a composable that manages WebSocket connections with TypeScript?

A) Return connection state, send function, and close function 

B) Use reactive state for connection status and message history

C) Implement proper cleanup in `onScopeDispose` 

D) All of the above are important

---

**Question 11** In Vue 3 with `<script setup>`, how do you properly type a component that accepts both v-model and regular props?

\<script setup lang="ts"\>  
// Component needs: modelValue, disabled, placeholder  
\</script\>

A) `defineProps<{ modelValue: string; disabled?: boolean; placeholder?: string }>()` 

B) Use `defineModel()` for modelValue, regular props for others 

C) Separate model and props definitions for clarity 

D) Both B and C are correct

---

**Question 12** What happens when you use `markRaw()` on a reactive object in Vue 3?

A) The object becomes completely non-reactive 

B) Only new properties added after `markRaw()` are non-reactive 

C) The object itself won't be made reactive when passed to reactive() 

D) It throws an error because the object is already reactive

---

**Question 13** How do you create a strongly typed store pattern using Composition API without external libraries?

// Global state management with TypeScript

A) Use `reactive()` with provide/inject and typed injection keys 

B) Create singleton composables with global reactive state 

C) Use Symbol keys for type-safe dependency injection 

D) All approaches can work with proper implementation

---

**Question 14** In Vue 3, what's the correct way to handle async computed properties?

const asyncData \= computed(async () \=\> {  
  const data \= await fetchData()  
  return processData(data)  
})

A) This syntax works correctly 

B) Computed properties cannot be async 

C) Use `watchEffect` with async function instead 

D) Create a separate composable for async operations

---

**Question 15** What's the difference between `triggerRef()` and modifying a ref's value directly?

A) No functional difference 

B) `triggerRef()` forces reactivity even if value didn't change 

C) `triggerRef()` is used for shallow refs only 

D) `triggerRef()` is deprecated

---

**Question 16** How do you properly type a component that dynamically generates slots based on props?

\<script setup lang="ts" generic="T extends Record\<string, any\>"\>  
interface Props {  
  data: T\[\]  
  columns: (keyof T)\[\]  
}  
// Generate slots for each column  
\</script\>

A) Use mapped types: `{ [K in keyof T]: (value: T[K]) => any }` 

B) Use `Record<string, Function>` for flexibility 

C) Define slots dynamically in the component 

D) Generic slots are not supported

---

**Question 17** What's the most type-safe way to handle form validation errors in Vue 3?

interface FormErrors {  
  \[K in keyof FormData\]?: string\[\]  
}

A) Use mapped types like shown above 

B) Use a generic validation composable 

C) Use discriminated unions for different error states 

D) Both A and B provide good type safety

---

**Question 18** In Vue 3, how do you create a debounced watcher that can be configured with different delays?

function useDebouncedWatch\<T\>(  
  source: Ref\<T\>,  
  callback: (newVal: T, oldVal: T) \=\> void,  
  delay: number \= 300  
) {  
  // Implementation  
}

A) Use `watchEffect` with setTimeout internally 

B) Use `watch` with manual debounce logic 

C) Create a custom effect scope with cleanup 

D) Both B and C are valid approaches

---

**Question 19** What's the correct way to handle TypeScript strict mode with nullable props in Vue 3?

interface Props {  
  user?: User | null  
  callback?: ((data: any) \=\> void) | null  
}

A) Use optional chaining: `props.user?.name` 

B) Use nullish coalescing: `props.user ?? defaultUser` 

C) Use type guards before accessing properties

D) All of the above are correct approaches

---

**Question 20** How do you create a typed middleware pattern for route guards in Vue 3?

type RouteMiddleware\<T \= any\> \= (  
  context: RouteContext  
) \=\> T | Promise\<T\>

A) This generic approach is correct 

B) Use function overloads for different middleware types 

C) Create a middleware registry with typed handlers 

D) Both A and C provide good patterns

---

**Question 21** In Vue 3 Composition API, what's the most efficient way to create a filtered and sorted list?

const items \= ref(\[...\])  
const searchQuery \= ref('')  
const sortBy \= ref('name')

A) Single computed combining filter and sort 

B) Separate computed for filter, then sort 

C) Use `watchEffect` to update a reactive array 

D) Chain multiple computed properties

---

**Question 22** How do you properly handle circular references in reactive objects?

const parent \= reactive({ children: \[\] })  
const child \= reactive({ parent: parent })  
parent.children.push(child)

A) Use `markRaw()` to prevent deep reactivity 

B) Use `shallowReactive()` for parent objects 

C) Avoid circular references in reactive objects 

D) Both A and B can help

---

**Question 23** What's the correct pattern for creating a typed plugin system in Vue 3?

interface Plugin\<T \= any\> {  
  install(app: App, options?: T): void  
}

const myPlugin: Plugin\<MyPluginOptions\> \= {  
  install(app, options) {  
    // Implementation  
  }  
}

A) This pattern is correct 

B) Use module augmentation for global properties 

C) Create a plugin registry with type checking 

D) All of the above contribute to a good plugin system

---

**Question 24** How do you create a composable that automatically manages loading states for multiple async operations?

function useAsyncOperations() {  
  // Manage multiple async operations with loading states  
}

A) Use a Map to track operation states 

B) Use reactive object with operation keys 

C) Return individual loading refs for each operation 

D) All approaches are valid depending on requirements

---

**Question 25** In Vue 3, what's the most type-safe way to handle dynamic component props?

\<component   
  :is="currentComponent"   
  v-bind="currentProps"   
/\>

A) Use union types for all possible prop combinations 

B) Use generic constraints with conditional types 

C) Create a props factory function with overloads 

D) Both B and C provide good type safety

---

**Question 26** How do you properly handle memory leaks in a composable that creates multiple watchers?

function useMultipleWatchers(sources: Ref\<any\>\[\]) {  
  // Create watchers for all sources  
}

A) Store stop handles and clean up manually 

B) Use `effectScope` to group all watchers 

C) Return cleanup function from composable 

D) All approaches can work

---

**Question 27** What's the correct way to type a component that accepts render functions as props?

interface Props {  
  renderItem: (item: T, index: number) \=\> VNode  
  renderEmpty?: () \=\> VNode  
}

A) This typing is correct 

B) Use `() => JSX.Element` instead of `VNode` 

C) Use `Slot` type from Vue 

D) Both A and B work depending on context

---

**Question 28** How do you create a type-safe event emitter pattern in Vue 3 composables?

function useEventEmitter\<TEvents extends Record\<string, any\>\>() {  
  // Type-safe event emission and listening  
}

A) Use generic constraints with mapped types 

B) Use function overloads for different events 

C) Create a strongly typed event registry 

D) All approaches can provide type safety

---

**Question 29** In Vue 3, what's the most efficient way to handle large datasets with virtual scrolling and TypeScript?

A) Use `shallowRef` for the dataset array 

B) Implement proper memoization for visible items 

C) Use intersection observer for performance 

D) All of the above are important considerations

---

**Question 30** What's the correct pattern for handling complex state machines in Vue 3 with TypeScript?

type State \= 'idle' | 'loading' | 'success' | 'error'  
type Event \=   
  | { type: 'FETCH' }  
  | { type: 'SUCCESS'; data: any }  
  | { type: 'ERROR'; error: Error }

A) Use discriminated unions for events and states 

B) Create a finite state machine with typed transitions 

C) Use computed properties for state derivation 

D) All of the above contribute to a robust state machine

---

## **Answer Key**

1. **D** \- Date objects can be reactive but methods like `getTime()` might not trigger updates reliably. Use primitives or custom wrappers.

2. **A** \- Conditional types with extends work correctly in TypeScript for composable return types.

3. **D** \- For large arrays, `shallowReactive()` avoids deep proxy overhead while maintaining reactivity for array operations.

4. **C** \- Handle errors with separate error refs. Computed properties throwing errors can cause issues with reactivity.

5. **B** \- `unref()` safely unwraps refs and returns non-refs unchanged, avoiding the need to check if something is a ref.

6. **B** \- While technically possible to mix APIs, it's not recommended. Keep them separate for clarity and maintainability.

7. **D** \- Both approaches work: `reactive({...props.user})` for shallow copy or `ref(structuredClone(props.user))` for deep copy.

8. **A** \- Mapping to the specific properties you want to watch is most efficient, avoiding unnecessary deep watching.

9. **D** \- Both `customRef()` and computed with getter/setter work for transforming values with different use cases.

10. **D** \- WebSocket composables need connection state, send function, cleanup, and proper error handling.

11. **D** \- Both `defineModel()` (Vue 3.3+) and separating concerns provide good patterns for v-model components.

12. **C** \- `markRaw()` prevents an object from being made reactive in future `reactive()` calls.

13. **D** \- All approaches work: provide/inject with keys, singleton composables, or Symbol-based injection.

14. **B** \- Computed properties must be synchronous. Use separate composables or `watchEffect` for async operations.

15. **B** \- `triggerRef()` manually triggers reactivity even when the value hasn't changed, useful for forcing updates.

16. **A** \- Use mapped types to create type-safe slots based on generic constraints.

17. **D** \- Both mapped types and generic validation composables provide excellent type safety for forms.

18. **D** \- Both manual debounce logic and effect scopes work, with effect scopes providing better cleanup.

19. **D** \- All approaches (optional chaining, nullish coalescing, type guards) are correct for handling nullable props.

20. **D** \- Both generic middleware functions and typed registries provide good patterns for route guards.

21. **A** \- A single computed combining filter and sort is most efficient, avoiding intermediate arrays.

22. **D** \- Both `markRaw()` and `shallowReactive()` can help prevent issues with circular references.

23. **D** \- The plugin pattern plus module augmentation and registries create a robust typed plugin system.

24. **D** \- Different approaches work: Maps for dynamic keys, reactive objects for known operations, individual refs for simplicity.

25. **D** \- Both generic constraints with conditionals and factory functions with overloads provide type safety.

26. **D** \- All approaches work: manual cleanup, effect scopes for grouping, or returning cleanup functions.

27. **D** \- Both `VNode` and `JSX.Element` work depending on whether you're using JSX or render functions.

28. **D** \- Generic constraints, overloads, and registries all contribute to type-safe event systems.

29. **D** \- Virtual scrolling with large datasets requires shallow refs, memoization, and intersection observers.

30. **D** \- Discriminated unions, typed transitions, and computed state derivation all contribute to robust state machines.

---

## **🎯 CONGRATULATIONS\! YOU'VE MASTERED 90 QUESTIONS\!**

You now have **COMPLETE MASTERY** of Vue 3 \+ TypeScript at Mid/Senior level. This expert round covered the most advanced topics that separate good developers from exceptional ones\!

