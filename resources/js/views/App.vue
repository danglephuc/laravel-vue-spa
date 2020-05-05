<template>
    <div id="app">
        <nav-bar></nav-bar>
        <main class="py-4">
            <app-main></app-main>
        </main>
    </div>
</template>

<script>
    import AppMain from "./layouts/AppMain";
    import NavBar from "./layouts/NavBar";
    export default {
        name: 'App',
        components: {NavBar, AppMain},
    };
</script>
