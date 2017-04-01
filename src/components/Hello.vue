<template>
    <form>
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
        <pre>{{$validation}}</pre>

    </form>
</template>

<script>
    import {Validator as validationMixin} from '../ValidatorEntryPoint';

    const ONE_SECOND = 1000,
        TWO_SECONDS = 2000;

    export default {
        mixins: [validationMixin],
        validation: {
            rules: {
                dog: {
                  required: true
                },
                password: {
                    sameAs: 'passwordConfirm',
                    required: true
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
            validators: {
                myValidator () {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            return resolve({
                                isValid: false,
                                msg: 'error'
                            });
                        }, ONE_SECOND);
                    });
                },
                myOtherValidator () {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            return resolve({
                                isValid: false,
                                msg: 'more errors'
                            });
                        }, TWO_SECONDS);
                    });
                }
            }
        },

        data () {
            return {
                password: '',
                passwordConfirm: '',
                name: '',
                age: 8,
                colors: [],
                colors2: []
            };
        },

        computed: {
            dog () {
                return `${this.name} - dog`;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1 {
        color: #42b983;
    }
</style>
