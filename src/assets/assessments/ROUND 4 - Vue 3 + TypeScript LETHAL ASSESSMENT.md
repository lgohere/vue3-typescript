# **Vue 3 \+ TypeScript LETHAL ASSESSMENT (Round 4\)**

# **30 Questions \- 25 Minutes \- COACH'S NIGHTMARE MODE 💀**

**WARNING: This quiz contains the most brutal, career-defining questions that will expose any weakness in your Vue 3 \+ TypeScript knowledge. Only the strongest survive.**

---

**Question 1** What is the EXACT behavior when you assign a new object to a `ref` that contains a reactive object?

const user \= ref(reactive({ name: 'John', age: 30 }))  
user.value \= reactive({ name: 'Jane', age: 25 })

A) The old reactive object maintains its reactivity 

B) Both objects are reactive and tracked 

C) Only the new object maintains reactivity 

D) Vue automatically merges the reactive properties

---

**Question 2** In a PRODUCTION Vue 3 app, what happens to TypeScript generics at runtime?

function useTypedStore\<T extends User\>(): Store\<T\> {  
  // Runtime behavior?  
}

A) Generics are preserved for runtime type checking 

B) Generics are completely erased \- no runtime type information 

C) Vue preserves generic information in development mode only 

D) Generic constraints are converted to runtime validators

---

**Question 3** What is the CRITICAL difference in memory usage between these two approaches?

// Approach A  
const users \= ref\<User\[\]\>(\[\])

// Approach B    
const users \= shallowRef\<User\[\]\>(\[\])

A) No memory difference 

B) `shallowRef` uses significantly less memory for large arrays 

C) `ref` is more memory efficient due to optimization 

D) Memory usage depends on the User object structure

---

**Question 4** When using `provide/inject` with TypeScript, what happens if you inject a key that was never provided?

const userKey \= Symbol() as InjectionKey\<User\>  
const user \= inject(userKey) // No default provided

A) TypeScript error at compile time 

B) Returns `undefined` and causes runtime errors 

C) Vue throws a warning but continues execution 

D) The type is `User | undefined` \- handle accordingly

---

**Question 5** In Vue 3 reactivity system, what is the EXACT execution order of these watchers?

const count \= ref(0)

watch(count, () \=\> console.log('watch'))  
watchEffect(() \=\> console.log('watchEffect', count.value))  
watchPostEffect(() \=\> console.log('watchPostEffect', count.value))

count.value++

A) watchEffect → watch → watchPostEffect 

B) watch → watchEffect → watchPostEffect

C) watchEffect → watchPostEffect → watch 

D) The order is not guaranteed

---

**Question 6** What is the PERFORMANCE impact of this pattern in a component with 1000+ renders?

const expensiveComputed \= computed(() \=\> {  
  return props.items.map(item \=\> ({  
    ...item,  
    processed: heavyCalculation(item)  
  }))  
})

A) Excellent performance due to computed caching 

B) Poor performance \- recalculates on every props.items change 

C) Performance depends on heavyCalculation implementation 

D) Vue optimizes this pattern automatically

---

**Question 7** When using `<script setup>` with TypeScript, what is the EXACT scope of variables?

\<script setup lang="ts"\>  
const local \= ref(0)  
function helper() { return local.value }

defineExpose({ local })  
\</script\>

A) All variables are automatically exposed to template and parent 

B) Only defineExpose variables are available to parent 

C) Template has access to all, parent only to exposed 

D) Variables are scoped to setup function only

---

**Question 8** What happens when you use `reactive()` on a class instance in Vue 3?

class UserClass {  
  constructor(public name: string) {}  
  getName() { return this.name }  
}

const user \= reactive(new UserClass('John'))

A) Full reactivity including method calls 

B) Properties are reactive, methods are not tracked 

C) Class instances cannot be made reactive 

D) Only public properties become reactive

---

**Question 9** In this TypeScript pattern, what is the RUNTIME type of `result`?

function useConditionalReturn\<T extends boolean\>(  
  condition: T  
): T extends true ? User : Product {  
  return condition ? new User() : new Product() as any  
}

const result \= useConditionalReturn(true)

A) User (correctly narrowed) 

B) User | Product (union type) 

C) any (type assertion overrides) 

D) The conditional type resolves correctly

---

**Question 10** What is the CRITICAL flaw in this composable pattern?

function useAsyncData(url: string) {  
  const data \= ref(null)  
  const loading \= ref(true)  
    
  fetch(url).then(response \=\> {  
    data.value \= response.json()  
    loading.value \= false  
  })  
    
  return { data, loading }  
}

A) Missing error handling 

B) Not awaiting response.json() 

C) Memory leak \- no cleanup 

D) All of the above

---

**Question 11** In Vue 3, what happens when you call `triggerRef()` on a computed property?

const doubled \= computed(() \=\> count.value \* 2\)  
triggerRef(doubled)

A) Forces the computed to recalculate 

B) Throws an error \- computed properties can't be triggered 

C) No effect \- computed properties are read-only 

D) Triggers all dependent watchers

---

**Question 12** What is the EXACT TypeScript inference for this complex scenario?

const items \= ref(\[{ id: 1, name: 'test' }\])  
const mapped \= computed(() \=\>   
  items.value.map(item \=\> ({   
    ...item,   
    upper: item.name.toUpperCase()   
  }))  
)

A) `ComputedRef<{ id: number; name: string; upper: string }[]>` 

B) `ComputedRef<any[]>` 

C) `ComputedRef<(typeof items.value[0] & { upper: string })[]>` 

D) TypeScript inference fails \- explicit typing required

---

**Question 13** When using `effectScope()`, what happens to nested effect scopes when the parent is stopped?

const parentScope \= effectScope()  
parentScope.run(() \=\> {  
  const childScope \= effectScope()  
  childScope.run(() \=\> {  
    watch(source, callback)  
  })  
})  
parentScope.stop()

A) Only parent scope effects are stopped 

B) Both parent and child scopes are stopped 

C) Child scope continues running independently 

D) Throws an error due to nested scopes

---

**Question 14** What is the MEMORY LEAK in this component pattern?

\<script setup lang="ts"\>  
const data \= ref(\[\])

onMounted(() \=\> {  
  const interval \= setInterval(() \=\> {  
    data.value.push(new Date())  
  }, 1000\)  
})  
\</script\>

A) No cleanup of setInterval 

B) Unbounded array growth 

C) Missing onUnmounted cleanup 

D) All of the above create memory leaks

---

**Question 15** In Vue 3 reactivity, what is the PRECISE difference between `toRef` and `toRefs`?

const state \= reactive({ name: 'John', age: 30 })  
const nameRef \= toRef(state, 'name')  
const stateRefs \= toRefs(state)

A) `toRef` creates a single ref, `toRefs` creates multiple refs 

B) `toRef` maintains bidirectional reactivity, `toRefs` is read-only 

C) Both create refs that sync with the original reactive object 

D) `toRefs` is more performant for multiple properties

---

**Question 16** What happens when you use `markRaw()` on an object that's already part of a reactive structure?

const state \= reactive({  
  user: { name: 'John', meta: { score: 100 } }  
})  
markRaw(state.user.meta)

A) The meta object becomes non-reactive immediately 

B) Only new properties on meta become non-reactive 

C) markRaw has no effect on already reactive objects 

D) It breaks the reactivity chain and throws warnings

---

**Question 17** In this TypeScript generic component, what is the EXACT type constraint validation?

\<script setup lang="ts" generic="T extends { id: number }"\>  
interface Props {  
  items: T\[\]  
  onSelect: (item: T) \=\> void  
}

const props \= defineProps\<Props\>()  
\</script\>

A) T must have an id property of type number 

B) T can be any type \- constraint is ignored 

C) Compile-time validation ensures T has id: number 

D) Runtime validation checks the id property

---

**Question 18** What is the CRITICAL issue with this watcher implementation?

const searchQuery \= ref('')  
const results \= ref(\[\])

watch(searchQuery, async (newQuery) \=\> {  
  if (newQuery) {  
    const data \= await searchAPI(newQuery)  
    results.value \= data  
  }  
}, { immediate: true })

A) Race condition \- newer requests may arrive before older ones 

B) Missing error handling 

C) No debouncing for API calls 

D) All of the above are serious issues

---

**Question 19** When using Vue 3 with TypeScript strict mode, what is the EXACT behavior of this pattern?

interface User {  
  name: string  
  email?: string  
}

const user \= ref\<User\>({ name: 'John' })  
const email \= computed(() \=\> user.value.email.toLowerCase())

A) Compile error \- email might be undefined 

B) Runtime error when email is undefined 

C) TypeScript allows it \- assumes email exists 

D) Computed returns undefined when email is missing

---

**Question 20** What is the PERFORMANCE bottleneck in this reactive pattern?

const largeDataset \= reactive(  
  Array.from({ length: 10000 }, (\_, i) \=\> ({  
    id: i,  
    data: new Array(100).fill(Math.random())  
  }))  
)

A) Large array creation 

B) Deep reactivity proxy overhead 

C) Math.random() calculations 

D) Memory allocation for nested arrays

---

**Question 21** In Vue 3 lifecycle, what is the EXACT timing difference between `onMounted` and `nextTick`?

onMounted(() \=\> {  
  console.log('mounted')  
})

nextTick(() \=\> {  
  console.log('nextTick')  
})

A) Both execute at the same time 

B) onMounted runs first, then nextTick 

C) nextTick runs first, then onMounted 

D) Timing depends on component rendering

---

**Question 22** What is the HIDDEN DANGER in this composable pattern?

function useGlobalState() {  
  const state \= reactive({ count: 0 })  
    
  return {  
    state: readonly(state),  
    increment: () \=\> state.count++  
  }  
}

A) Multiple instances create separate states 

B) readonly can be bypassed with type assertion 

C) No singleton pattern for global state 

D) All composable instances share the same state incorrectly

---

**Question 23** When using `defineModel` in Vue 3.3+, what is the EXACT TypeScript inference?

\<script setup lang="ts"\>  
const model \= defineModel\<string\>({ required: true })  
\</script\>

A) `WritableComputedRef<string>` 

B) `Ref<string>` 

C) `ModelRef<string>` 

D) `ComputedRef<string>` with setter

---

**Question 24** What is the CRITICAL flaw in this error handling pattern?

const { data, error } \= await useAsyncComposable()

if (error.value) {  
  throw new Error(error.value)  
}

A) Composables shouldn't be awaited 

B) Throwing errors in setup breaks the component 

C) Error handling should be reactive, not imperative 

D) Missing try-catch for the thrown error

---

**Question 25** In Vue 3 reactivity internals, what happens with this circular dependency?

const a \= ref(0)  
const b \= computed(() \=\> a.value \+ c.value)  
const c \= computed(() \=\> b.value \+ 1\)

A) Infinite loop \- application crashes 

B) Vue detects circular dependency and throws error 

C) Last computed wins \- c becomes NaN 

D) Vue handles it gracefully with dependency tracking

---

**Question 26** What is the MEMORY IMPLICATION of this template ref pattern?

const itemRefs \= ref\<HTMLElement\[\]\>(\[\])

const setItemRef \= (el: HTMLElement | null, index: number) \=\> {  
  if (el) {  
    itemRefs.value\[index\] \= el  
  }  
}

A) Perfect pattern \- no memory issues 

B) Potential memory leak \- old elements not cleaned up 

C) Array grows indefinitely 

D) References prevent garbage collection

---

**Question 27** When using TypeScript with Vue 3 plugins, what is the EXACT module augmentation pattern?

declare module '@vue/runtime-core' {  
  interface ComponentCustomProperties {  
    $myPlugin: MyPluginType  
  }  
}

A) This pattern is correct for global properties 

B) Should use 'vue' module instead 

C) ComponentCustomProperties is deprecated 

D) Plugin types are automatically inferred

---

**Question 28** What is the EXACT execution context of this async setup?

// Component setup  
const data \= ref(null)

const loadData \= async () \=\> {  
  data.value \= await fetchAPI()  
}

loadData()

A) Async operation continues after component unmount 

B) Component waits for async completion before mounting 

C) Async operation is automatically cancelled on unmount 

D) Vue handles async setup automatically

---

**Question 29** In this TypeScript pattern, what is the RUNTIME vs COMPILE-TIME behavior?

const props \= withDefaults(defineProps\<{  
  items: T\[\]  
  validator?: (item: T) \=\> boolean  
}\>(), {  
  validator: (item: T) \=\> true  
})

A) Generic T is preserved at runtime 

B) Validator function loses type information at runtime 

C) TypeScript provides runtime type checking 

D) Default functions maintain generic constraints

---

**Question 30** What is the ULTIMATE test of Vue 3 \+ TypeScript mastery in this pattern?

function createTypedComposable\<  
  TState extends Record\<string, any\>,  
  TActions extends Record\<string, (...args: any\[\]) \=\> any\>  
\>(  
  initialState: TState,  
  actions: (state: TState) \=\> TActions  
): {  
  readonly state: DeepReadonly\<TState\>  
  actions: TActions  
  reset: () \=\> void  
} {  
  // Implementation that preserves full type safety  
}

A) This pattern is impossible to implement correctly 

B) Requires advanced TypeScript features beyond Vue's scope 

C) Can be implemented with proper generic constraints 

D) Vue 3 doesn't support this level of type safety

---

## **Answer Key \- LETHAL EDITION 💀**

1. **B** \- Both objects remain reactive. Vue maintains reactivity for both the old and new reactive objects.

2. **B** \- TypeScript generics are completely erased at runtime. No runtime type information exists.

3. **B** \- `shallowRef` avoids deep proxy creation, using significantly less memory for large nested structures.

4. **D** \- Without a default, the type is `User | undefined`. Always handle the undefined case.

5. **A** \- Execution order: `watchEffect` (immediate) → `watch` → `watchPostEffect` (post-render).

6. **B** \- Poor performance. The entire array is recalculated whenever `props.items` changes, even if individual items haven't changed.

7. **C** \- Template accesses all variables, parent only accesses `defineExpose` variables.

8. **B** \- Properties become reactive, but method calls are not tracked for reactivity.

9. **A** \- Conditional types resolve correctly at compile time when the condition is a literal.

10. **D** \- Missing error handling, not awaiting `response.json()`, and potential memory leak from unhandled promises.

11. **B** \- `triggerRef()` cannot be used on computed properties. Computed properties are read-only reactive values.

12. **A** \- TypeScript correctly infers the spread operation and additional `upper` property.

13. **B** \- Stopping parent scope automatically stops all nested child scopes.

14. **D** \- No `clearInterval` cleanup, unbounded array growth, and missing `onUnmounted` \- triple memory leak.

15. **C** \- Both create refs that maintain bidirectional sync with the original reactive object.

16. **A** \- `markRaw()` immediately prevents the object from being reactive, even if already in a reactive structure.

17. **C** \- Generic constraints are validated at compile-time, ensuring type safety.

18. **D** \- Race conditions with concurrent requests, no error handling, and no debouncing \- all critical issues.

19. **A** \- TypeScript strict mode catches potential undefined access at compile time.

20. **B** \- Deep reactivity proxy overhead for 10,000 objects with nested arrays is the primary bottleneck.

21. **C** \- `nextTick` runs in the current tick, `onMounted` runs after DOM is mounted.

22. **A** \- Each call creates a separate state instance. Need singleton pattern for true global state.

23. **A** \- `defineModel` returns `WritableComputedRef<T>` with getter/setter functionality.

24. **C** \- Error handling should be reactive and declarative, not imperative throwing in setup.

25. **B** \- Vue detects circular dependencies in computed properties and throws an error to prevent infinite loops.

26. **B** \- Old elements may not be cleaned up, potentially causing memory leaks in dynamic lists.

27. **A** \- This is the correct pattern for augmenting Vue's global properties with TypeScript.

28. **A** \- Async operations in setup continue after unmount unless manually cancelled.

29. **B** \- Generic information is erased; validator functions lose compile-time type information at runtime.

30. **C** \- This advanced pattern can be implemented using TypeScript's conditional types, mapped types, and proper generic constraints.

