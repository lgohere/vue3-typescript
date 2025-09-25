# **Vue 3 \+ TypeScript Assessment (Round 1\)**

## **30 Questions \- 25 Minutes**

---

**Question 1** What is the primary difference between `ref()` and `reactive()` in Vue 3 Composition API?

A) `ref()` is for objects, `reactive()` is for primitives 

B) `ref()` creates a reactive reference for any value type, `reactive()` only works with objects and arrays 

C) `ref()` is synchronous, `reactive()` is asynchronous 

D) There is no difference, they are interchangeable

---

**Question 2** In Vue 3 with TypeScript, how should you properly type a computed property that returns a string?

A) `const computed: string = computed(() => 'hello')` 

B) `const computed = computed<string>(() => 'hello')` 

C) `const computed: ComputedRef<string> = computed(() => 'hello')` 

D) Both B and C are correct

---

**Question 3** When using `<script setup>` with TypeScript, what is the correct way to define props with default values?

A) `const props = defineProps<{ name?: string }>({ name: 'default' })` B) `const props = withDefaults(defineProps<{ name?: string }>(), { name: 'default' })` 

C) `const props = defineProps({ name: { type: String, default: 'default' } })` 

D) Both B and C are correct

---

**Question 4** What happens when you try to destructure a reactive object in Vue 3?

A) It works perfectly and maintains reactivity B) It loses reactivity for the destructured properties C) It throws a TypeScript error D) It only works with computed properties

---

**Question 5** In Vue 3 TypeScript, how do you properly type an emit that passes a User object?

A) `const emit = defineEmits(['update'])` 

B) `const emit = defineEmits<{ update: User }>()` 

C) `const emit = defineEmits<{ update: [user: User] }>()` 

D) `const emit = defineEmits<{ (e: 'update', user: User): void }>()`

---

**Question 6** What is the correct way to access a ref's value inside the setup function vs in the template?

A) Always use `.value` in both setup and template 

B) Never use `.value` in either setup or template 

C) Use `.value` in setup, access directly in template

D) Use `.value` in template, access directly in setup

---

**Question 7** Which lifecycle hook should you use in Composition API to replace the `created()` hook from Options API?

A) `onCreated()` 

B) `onMounted()` 

C) `onBeforeMount()` 

D) No hook needed, use `setup()` directly

---

**Question 8** How do you properly type a template ref in Vue 3 with TypeScript?

A) `const inputRef = ref<HTMLInputElement>()` 

B) `const inputRef = ref<HTMLInputElement | null>(null)` 

C) `const inputRef: Ref<HTMLInputElement> = ref(null)` 

D) Both A and B are correct

---

**Question 9** What is the difference between `watch()` and `watchEffect()` in Vue 3?

A) `watch()` is for objects, `watchEffect()` is for primitives 

B) `watch()` requires explicit dependencies, `watchEffect()` automatically tracks dependencies 

C) `watch()` runs immediately, `watchEffect()` runs on next tick 

D) There is no functional difference

---

**Question 10** In TypeScript with Vue 3, what is the correct way to type a computed property that might return undefined?

A) `const computed = computed<string>(() => maybeString)` 

B) `const computed = computed<string | undefined>(() => maybeString)` 

C) `const computed: ComputedRef<string?> = computed(() => maybeString)` 

D) `const computed = computed(() => maybeString as string)`

---

**Question 11** How should you handle cleanup in a composable to prevent memory leaks?

A) Use `onDestroyed()` lifecycle hook 

B) Use `onUnmounted()` lifecycle hook 

C) Use `onBeforeUnmount()` lifecycle hook 

D) No cleanup needed in composables

---

**Question 12** What is the correct TypeScript interface for defining props with optional and required properties?

A) `interface Props { name: string, age?: number }` 

B) `interface Props { name: required string, age: optional number }` 

C) `interface Props { name!: string, age?: number }` 

D) `interface Props { name: string | required, age: number | optional }`

---

**Question 13** In Vue 3 with `<script setup>`, how do you expose component methods to parent components?

A) Return them from setup function 

B) Use `defineExpose()` 

C) Use `export` keyword 

D) Methods are automatically exposed

---

**Question 14** What is the correct way to use `provide/inject` with TypeScript in Vue 3?

A) `provide('key', value)` and `inject('key')` 

B) `provide<string>('key', value)` and `inject<string>('key')` 

C) Use `InjectionKey<T>` for type safety 

D) Both A and C are correct

---

**Question 15** When should you use `toRef()` and `toRefs()` in Vue 3?

A) To convert reactive objects to refs 

B) To maintain reactivity when destructuring reactive objects 

C) To convert refs to reactive objects 

D) To create computed properties

---

**Question 16** What is the correct way to type a watcher that observes multiple reactive sources?

A) `watch([source1, source2], (newVals, oldVals) => {})` 

B) `watch<[Type1, Type2]>([source1, source2], (newVals, oldVals) => {})` 

C) The types are automatically inferred from the sources 

D) Both B and C are correct

---

**Question 17** In Vue 3, what is the difference between `shallowRef()` and `ref()`?

A) No difference, `shallowRef()` is deprecated 

B) `shallowRef()` only tracks changes to the `.value` property, not deep changes 

C) `shallowRef()` is for primitives, `ref()` is for objects 

D) `shallowRef()` is faster but less reliable

---

**Question 18** How do you properly type a generic composable in Vue 3 with TypeScript?

A) `function useComposable<T>(input: T): T` 

B) `function useComposable<T>(input: T): ComposableReturn<T>` 

C) `function useComposable<T = any>(input: T): { data: Ref<T> }`

D) Generics are not supported in composables

---

**Question 19** What is the correct way to handle async operations in `setup()`?

A) Make `setup()` async 

B) Use `async/await` inside `setup()` but don't make it async 

C) Use `onMounted()` for async operations 

D) Both B and C are correct

---

**Question 20** In Vue 3 with TypeScript, how do you properly type a component instance?

A) `InstanceType<typeof MyComponent>` 

B) `ComponentInstance<MyComponent>` 

C) `MyComponent.Instance` 

D) `typeof MyComponent`

---

**Question 21** What is the correct way to type slots in Vue 3 with `<script setup>`?

A) `const slots = useSlots<{ default: any }>()` 

B) `defineSlots<{ default(): any }>()` 

C) `const slots: Slots = useSlots()` 

D) Both A and B are correct

---

**Question 22** How do you create a typed reactive object that enforces strict typing?

A) `reactive<User>({ name: '', email: '' })` 

B) `reactive({ name: '', email: '' } as User)` 

C) `reactive<User>({} as User)` 

D) All of the above are correct

---

**Question 23** What is the purpose of `readonly()` in Vue 3 Composition API?

A) To make reactive objects immutable 

B) To prevent modification of reactive objects while maintaining reactivity 

C) To optimize performance by disabling reactivity 

D) To convert refs to computed properties

---

**Question 24** In Vue 3 with TypeScript, how should you type a computed property that depends on a prop?

A) `const computed = computed(() => props.value.toUpperCase())` 

B) `const computed = computed<string>(() => props.value.toUpperCase())` 

C) Both are correct, TypeScript infers the type 

D) You must explicitly cast the result

---

**Question 25** What is the correct way to handle form validation with TypeScript in Vue 3?

A) Use built-in validation with typed schemas 

B) Create custom validation functions with proper TypeScript types 

C) Use third-party libraries only 

D) Validation doesn't require special TypeScript handling

---

**Question 26** How do you properly type a watcher that might return a cleanup function?

A) `watch(source, (newVal, oldVal, onInvalidate) => { onInvalidate(() => {}) })` 

B) `watch<T>(source, (newVal: T, oldVal: T, cleanup: Function) => {})` C) The cleanup function is automatically typed 

D) Both A and C are correct

---

**Question 27** What is the difference between `markRaw()` and `shallowReactive()` in Vue 3?

A) No difference, they are aliases 

B) `markRaw()` prevents an object from being reactive, `shallowReactive()` makes only first-level properties reactive 

C) `markRaw()` is for performance, `shallowReactive()` is for TypeScript 

D) `markRaw()` is deprecated in favor of `shallowReactive()`

---

**Question 28** In Vue 3 with TypeScript, what is the correct way to type a component that uses both props and slots?

A) Define interfaces for both props and slots separately 

B) Use a single interface that combines props and slots 

C) TypeScript automatically infers both from usage 

D) Only props need explicit typing, slots are inferred

---

**Question 29** How do you properly handle async composables in Vue 3 with TypeScript?

A) `async function useAsyncComposable(): Promise<ComposableReturn>` 

B) `function useAsyncComposable(): { data: Ref<T | null>, loading: Ref<boolean> }` 

C) Always return promises from composables D) Both A and B are valid patterns

---

**Question 30** What is the correct approach for testing Vue 3 components with TypeScript?

A) Use `@vue/test-utils` with proper TypeScript configuration 

B) Mock all TypeScript interfaces in tests 

C) Convert components to JavaScript for testing 

D) TypeScript components cannot be properly tested

---

## **Answer Key**

1. **B** \- `ref()` creates a reactive reference for any value type, while `reactive()` only works with objects and arrays. This is a fundamental difference in Vue 3's reactivity system.

2. **D** \- Both syntaxes are correct. You can use the generic syntax `computed<string>()` or explicitly type the variable as `ComputedRef<string>`.

3. **B** \- `withDefaults()` is the correct way to provide default values when using `defineProps()` with TypeScript in `<script setup>`.

4. **B** \- Destructuring a reactive object loses reactivity. You need to use `toRefs()` or `toRef()` to maintain reactivity when destructuring.

5. **C** \- The correct syntax for typing emits with parameters is using tuple syntax: `{ update: [user: User] }`.

6. **C** \- In setup function, you need `.value` to access ref values. In templates, Vue automatically unwraps refs, so you access them directly.

7. **D** \- There's no direct replacement for `created()`. The `setup()` function itself runs at the equivalent time, before the component is created.

8. **D** \- Both syntaxes are correct. Template refs should be typed as potentially null since they're undefined before mount.

9. **B** \- `watch()` requires explicit dependencies and gives you access to old/new values. `watchEffect()` automatically tracks dependencies and runs immediately.

10. **B** \- When a computed might return undefined, you must include `undefined` in the type union: `string | undefined`.

11. **B** \- Use `onUnmounted()` to clean up side effects like event listeners, timers, or subscriptions in composables.

12. **A** \- Standard TypeScript interface syntax with optional properties marked with `?`.

13. **B** \- In `<script setup>`, use `defineExpose()` to explicitly expose methods or properties to parent components.

14. **D** \- You can use basic provide/inject, but `InjectionKey<T>` provides type safety and is the recommended approach.

15. **B** \- `toRef()` and `toRefs()` are used to maintain reactivity when destructuring reactive objects or passing reactive properties.

16. **D** \- TypeScript can infer types from the sources, but you can also explicitly type them if needed.

17. **B** \- `shallowRef()` only triggers reactivity when the `.value` itself changes, not when nested properties change.

18. **C** \- Generic composables should return properly typed objects with reactive references.

19. **D** \- Don't make `setup()` async, but you can use async operations inside it or in lifecycle hooks like `onMounted()`.

20. **A** \- Use `InstanceType<typeof MyComponent>` to get the TypeScript type of a component instance.

21. **B** \- Use `defineSlots<>()` to type slots in `<script setup>` with TypeScript.

22. **D** \- All these approaches work, though some are more explicit than others. Choose based on your TypeScript configuration strictness.

23. **B** \- `readonly()` creates a readonly proxy that maintains reactivity but prevents mutations.

24. **C** \- TypeScript can infer the return type from the computed function, but explicit typing is also valid.

25. **B** \- Create proper validation functions with TypeScript types. Vue doesn't have built-in validation with typed schemas.

26. **D** \- The cleanup function (onInvalidate) is automatically provided and typed by Vue's watch function.

27. **B** \- `markRaw()` prevents reactivity entirely, while `shallowReactive()` provides shallow reactivity (only first level).

28. **A** \- Define separate interfaces for props and slots, as they serve different purposes and have different typing requirements.

29. **D** \- Both patterns are valid. Choose based on whether you want to return promises or reactive state that updates asynchronously.

30. **A** \- Use `@vue/test-utils` with proper TypeScript configuration for testing Vue 3 components. The library supports TypeScript well.

