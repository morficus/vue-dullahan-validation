<template>
    <div id="app">
        <a href="http://placecorgi.com/" target="_blank">
            <img src="http://placecorgi.com/250" />
        </a>
        <hello></hello>
    </div>
</template>

<script>
    import Hello from './components/Hello';

    export default {
        components: {
            Hello
        }
    };
</script>

<style>
    html {
        height: 100%;
    }

    body {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    #app {
        color: #2c3e50;
        margin-top: -100px;
        max-width: 600px;
        font-family: Source Sans Pro, Helvetica, sans-serif;
    }

    #app a {
        color: #42b983;
        text-decoration: none;
    }

    .logo {
        width: 100px;
        height: 100px
    }
</style>
