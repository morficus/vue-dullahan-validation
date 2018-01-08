<template>
    <section id="app" class="section">
        <a href="http://placecorgi.com/" target="_blank">
            <img src="http://placecorgi.com/250" />
        </a>

        <form class="container">

            <label>
                Name:
                <input type="text" v-model.trim="name" />
            </label>

            <label>
                Age:
                <input type="number" v-model.number="age" />
            </label>

            <label>
                Password:
                <input type="text" v-model.number="password" />
                <input type="text" v-model.number="passwordConfirm" />
            </label>

            <label>
                Favorite colors:
                <label>
                    Red
                    <input type="checkbox" v-model="colors" value="red">
                </label>
                <label>
                    Blue
                    <input type="checkbox" v-model="colors" value="blue">
                </label>
                <label>
                    Green
                    <input type="checkbox" v-model="colors" value="green">
                </label>
                <label>
                    Black
                    <input type="checkbox" v-model="colors" value="black">
                </label>
                <label>
                    White
                    <input type="checkbox" v-model="colors" value="white">
                </label>
            </label>

            <br/>
            <label>
                Favorite colors:
                <label>
                    Red
                    <input type="checkbox" v-model="colors2" value="red">
                </label>
                <label>
                    Blue
                    <input type="checkbox" v-model="colors2" value="blue">
                </label>
                <label>
                    Green
                    <input type="checkbox" v-model="colors2" value="green">
                </label>
                <label>
                    Black
                    <input type="checkbox" v-model="colors2" value="black">
                </label>
                <label>
                    White
                    <input type="checkbox" v-model="colors2" value="white">
                </label>
            </label>

            <!-- TOOD: why is this not updating right away? -->
            <div style="border: 1px solid red;">
                <pre>{{$validations}}</pre>

            </div>

        </form>
    </section>
</template>

<script>
    import validation from '../../src/mixin-entry-point';

    const ONE_SECOND = 1000,
        TWO_SECONDS = 2000;

    export default {
        mixins: [validation],
        validation: {
            rules: {
                mine: {}, yours: {},
                doubleAge: {
                    numeric: true
                },
                password: {
                    sameAs: 'passwordConfirm',
                    required: true,
                    myTest: true
                },
                name: {
                    required: true,
                    min: 10,
                    alphabetic: true
                },
                age: {
                    required: true,
                    numeric: true,
                    min: {
                        value: 18,
                        message: 'Too young...'
                    },
                    max: {
                        value: 100,
                        message: 'Old fart...'
                    }
                },
                colors: {
                    required: true,
                    list: true,
                    min: 1,
                    max: 3,
                    sameAs: 'colors2'
                }
            },
            customValidations: {
                myTest (ruleValue, dataValue, componentData) {
                    return new Promise(function (resolve, reject) {

                        setTimeout(function () {
                            console.log('times up!');
                            resolve({isValid: false, errorMessage: 'my customer msg'});
                        }, 5000)
                    });

                }
            }
        },

        data () {
            return {
                password: '',
                passwordConfirm: '',
                name: '',
                mine: '',
                yours: '',
                age: 8,
                colors: [],
                colors2: []
            };
        },

        watch: {
            async name () {
                const that = this;
                await function () {
                    let x = async function () {
                        await setTimeout(function () {
                            console.log('yes?');
                            that.mine = 'huh...?';
                        }, 2000);
                    }
                }
            }
        },

        computed: {
            doubleAge () {
                return this.age * 2;
            }
        }
    };
</script>

<style>

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

    h1 {
        color: #42b983;
    }
</style>
