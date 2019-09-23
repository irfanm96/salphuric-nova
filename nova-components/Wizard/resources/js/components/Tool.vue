<template>


    <div>
        <card class="bg-white   items-center justify-center" style="min-height: 300px">
            <form-wizard @on-complete="onComplete"
                         shape="tab"
                         color="#9b59b6" class="p-3" subtitle="" ref="form-wizard">
                <h2 slot="title">New Project Wizard</h2>
                <tab-content
                    icon="fa fa-user" :before-change="beforeTabSwitch">

                    <div class="card">
                        <div class="border-b border-40">
                            <div class="w-full flex border-b border-40">
                                <div class="w-1/5 px-8 py-6">
                                    <label for="name"
                                           class="inline-block text-80 pt-2 leading-tight">
                                        Project Name
                                    </label>
                                </div>
                                <div class="py-6 px-8 w-3/5"><input id="name" dusk="name" type="text" placeholder="Name"
                                                                    class="w-full form-control form-input form-input-bordered">
                                    <!---->
                                    <div class="help-text help-text mt-2"></div>
                                </div>
                            </div>
                            <div class="w-full flex border-b border-40">
                                <div class="w-1/5 px-8 py-6">
                                    <label for="description" class="inline-block text-80 pt-2 leading-tight">
                                        Description
                                    </label>
                                </div>
                                <div class="py-6 px-8 w-3/5"><input id="description" dusk="description" type="text"
                                                                    placeholder="Description"
                                                                    class="w-full form-control form-input form-input-bordered">
                                    <!---->
                                    <div class="help-text help-text mt-2"></div>
                                </div>
                            </div>
                            <div class="w-full flex border-b border-40">
                                <div class="w-1/5 px-8 py-6"><label for="domain"
                                                                    class="inline-block text-80 pt-2 leading-tight">
                                    Domain
                                </label></div>
                                <div class="py-6 px-8 w-3/5"><input id="domain" dusk="domain" type="text"
                                                                    placeholder="Domain"
                                                                    class="w-full form-control form-input form-input-bordered">
                                    <!---->
                                    <div class="help-text help-text mt-2"></div>
                                </div>
                            </div>
                            <div class="w-full flex border-b border-40">
                                <div class="w-1/5 px-8 py-6"><label for="type"
                                                                    class="inline-block text-80 pt-2 leading-tight">
                                    Type
                                </label></div>
                                <div class="py-6 px-8 w-3/5">
                                    <multiselect id="type" v-model="project.type"
                                                 :options="options"
                                                 :multiple="true"
                                                 :close-on-select="true"
                                                 placeholder="Choose the project types"
                                                 label="name"
                                                 track-by="name">
                                    </multiselect>
                                </div>
                            </div>
                        </div>
                    </div>
                </tab-content>
                <tab-content
                    icon="fa fa-cog">
                    <div class="card">
                        <div class="w-full flex border-b border-40">
                            <div class="w-1/2 flex border-b border-40" @click.prevent="handleProjectMode('quick')">
                                <div class="w-full p-4 bg-gray-200 p-8">
                                    <div
                                        class="group hover:bg-blue-500 p-4 cursor-pointer rounded max-w-xs w-full shadow-lg select-none overflow-hidden mx-auto hover:bg-primary-70% hover:text-white">
                                        <p class="font-semibold text-lg mb-1 text-gray-900 ">
                                            Quick wizard</p>
                                        <p class="text-gray-700 mb-2">Create a new project
                                            from a provided plans.</p></div>
                                </div>


                            </div>
                            <div class="w-1/2 flex border-b border-40" @click.prevent="handleProjectMode('custom')">
                                <div class="w-full p-4 bg-gray-200 p-8">
                                    <div
                                        class="group hover:bg-blue-500 p-4 cursor-pointer rounded max-w-xs w-full shadow-lg select-none overflow-hidden mx-auto hover:bg-primary-50% hover:text-white">
                                        <p class="font-semibold text-lg mb-1 text-gray-900 ">
                                            Custom Wizard</p>
                                        <p class="text-gray-700 mb-2">Create a new project
                                            from a variety of products and services.</p></div>
                                </div>

                            </div>
                        </div>
                    </div>

                </tab-content>
                <tab-content
                    icon="fa fa-check-circle">
                    <section v-if="isQuick">
                        <div class="flex w-full container mx-auto">
                            <div class="w-full">
                                <div class="bg-white items-center justify-center">
                                    <h2 class="text-center">Pricing Schemes</h2>
                                </div>
                                <div class="relative block flex items-center">
                                    <div class="w-1/3  sm:my-5 my-8 relative z-0 rounded-lg shadow-lg md:-mr-4">
                                        <div
                                            class="bg-white text-black rounded-lg shadow-inner shadow-lg overflow-hidden">
                                            <div
                                                class="block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6">
                                                <h1 class="text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide">
                                                    Hobby
                                                </h1>
                                                <h2 class="text-sm text-gray-500 text-center pb-6">FREE</h2>

                                                Stripe offers everything needed to run an online business
                                                at scale. Get in touch for details.
                                            </div>

                                            <div class="flex flex-wrap mt-3 px-6">
                                                <ul>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-lg ml-3">No setup</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-lg ml-3"
                                                        >No setups</span
                                                        >
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-lg ml-3">Speed</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="block flex items-center p-8  uppercase">
                                                <button class="mt-3 text-lg font-semibold
	bg-black w-full text-white rounded-lg
	px-6 py-3 block shadow-xl hover:bg-gray-700">
                                                    Select
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-1/3  sm:my-5 my-8 relative z-10 bg-white rounded-lg shadow-lg">
                                        <div
                                            class="text-sm leading-none rounded-t-lg bg-gray-200 text-black font-semibold uppercase py-4 text-center tracking-wide">
                                            Most Popular
                                        </div>
                                        <div
                                            class="block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6">
                                            <h1 class="text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide">
                                                Expert
                                            </h1>
                                            <h2 class="text-sm text-gray-500 text-center pb-6"><span class="text-3xl">€19</span>
                                                /mo</h2>

                                            Stripe offers everything needed to run an online business at
                                            scale. Get in touch for details.
                                        </div>
                                        <div class="flex pl-12 justify-start sm:justify-start mt-3">
                                            <ul>
                                                <li class="flex items-center">
                                                    <div
                                                        class="rounded-full p-2 fill-current text-green-700">
                                                        <svg
                                                            class="w-6 h-6 align-middle"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span class="text-gray-700 text-lg ml-3">No setup</span>
                                                </li>
                                                <li class="flex items-center">
                                                    <div class=" rounded-full p-2 fill-current text-green-700">
                                                        <svg
                                                            class="w-6 h-6 align-middle"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span class="text-gray-700 text-lg ml-3"
                                                    >Hidden fees</span
                                                    >
                                                </li>
                                                <li class="flex items-center">
                                                    <div class=" rounded-full p-2 fill-current text-green-700">
                                                        <svg
                                                            class="w-6 h-6 align-middle"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span class="text-gray-700 text-lg ml-3">Original</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="block flex items-center p-8  uppercase">
                                            <button class="mt-3 text-lg font-semibold
	bg-black w-full text-white rounded-lg
	px-6 py-3 block shadow-xl hover:bg-gray-700">
                                                Select
                                            </button>
                                        </div>
                                    </div>
                                    <div class="w-1/3  sm:my-5 my-8 relative z-0 rounded-lg shadow-lg md:-ml-4">
                                        <div
                                            class="bg-white text-black rounded-lg shadow-inner shadow-lg overflow-hidden">
                                            <div
                                                class="block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6">
                                                <h1 class="text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide">
                                                    Enteprise
                                                </h1>
                                                <h2 class="text-sm text-gray-500 text-center pb-6">€39 /mo</h2>

                                                Stripe offers everything needed to run an online business
                                                at scale. Get in touch for details.
                                            </div>
                                            <div class="flex flex-wrap mt-3 px-6">
                                                <ul>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-lg ml-3"
                                                        >Electric</span
                                                        >
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div
                                                            class=" rounded-full p-2 fill-current text-green-700"
                                                        >
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            >
                                                                <path
                                                                    d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                                ></path>
                                                                <polyline
                                                                    points="22 4 12 14.01 9 11.01"
                                                                ></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-lg ml-3"
                                                        >Monthly</span
                                                        >
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div
                                                            class=" rounded-full p-2 fill-current text-green-700"
                                                        >
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            >
                                                                <path
                                                                    d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                                ></path>
                                                                <polyline
                                                                    points="22 4 12 14.01 9 11.01"
                                                                ></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-lg ml-3"
                                                        >No setup</span
                                                        >
                                                    </li>
                                                </ul>
                                            </div>

                                            <div class="block flex items-center p-8  uppercase">
                                                <button
                                                    class="mt-3 text-lg font-semibold
	bg-black w-full text-white rounded-lg
	px-6 py-3 block shadow-xl hover:bg-gray-700"
                                                >
                                                    Select
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </tab-content>


            </form-wizard>

        </card>
    </div>
</template>
<style scoped src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>

    import Multiselect from 'vue-multiselect'

    // import 'vue-form-wizard/dist/vue-form-wizard.min.css';
    import {FormWizard, TabContent} from 'vue-form-wizard';

    export default {
        components: {
            FormWizard,
            TabContent,
            Multiselect
        },
        data() {
            return {
                selected: null,
                options: [{name: 'Web'},
                    {name: 'API'},
                    {name: 'Android'},
                    {name: 'IOS'}],
                project: {
                    name: '',
                    description: '',
                    domain: '',
                    type: ''
                },
                mode:'quick'
            }
        },

        computed: {
            isQuick: function () {
                return this.mode==='quick';
            }
        },
        methods: {

            handleProjectMode(btn) {
                this.mode=btn;
                this.$refs['form-wizard'].changeTab(1,2);
            },

            onComplete: function () {
                alert('Yay. Done!');
            }
            ,
            beforeTabSwitch: function () {
                // alert("This is called before switching tabs")
                return true;
            }
        }
        ,
    }
</script>


