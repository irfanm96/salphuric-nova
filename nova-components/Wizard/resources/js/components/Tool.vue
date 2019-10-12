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
                                                                    class="w-full form-control form-input form-input-bordered"
                                                                    v-model="project.name">
                                    <!---->
                                    <div class="help-text help-text mt-2 text-danger"></div>
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
                                                                    class="w-full form-control form-input form-input-bordered"
                                                                    v-model="project.description" required>
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
                                                                    class="w-full form-control form-input form-input-bordered"
                                                                    v-model="project.domain" required>
                                    <div class="pt-2">
                                        <label class="cont text-80 ">I own this domain
                                            <input type="checkbox" checked="checked">
                                            <span class="checkmark"></span>
                                        </label>

                                    </div>
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
                                                 track-by="name" required>
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
                                    <h2 class="text-center">Pick a Plan</h2>
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
                                                <h2 class="text-sm text-gray-500 text-center pb-6">€39 /mo</h2>

                                                <!--                                                <h2 class="text-sm text-gray-500 text-center pb-6">FREE</h2>-->

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
                                                                stroke="green"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-sm ml-3">1GB / 1 CPU, 25GB SSD Disk, 1000GB Transfer</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="green"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span
                                                            class="text-gray-700 text-sm ml-3">1000 transaction Emails</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="green"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-sm ml-3">SSL</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="green"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-sm ml-3">Weekly Backup</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="green"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-sm ml-3">Analytics</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="green"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-sm ml-3">Domain</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="green"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-sm ml-3">GSuite</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="gray"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-80 text-sm ml-3 line-through">Push Notifications</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="gray"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-80 text-sm ml-3 line-through">SMS</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="gray"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-80 text-sm ml-3 line-through">Bot Server</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="block flex items-center p-8  uppercase">
                                                <button
                                                    class="mt-3 text-lg font-semibold bg-black w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:bg-gray-700" @click.prevent="quickProject('hobby')">
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
                                                Growth
                                            </h1>
                                            <h2 class="text-sm text-gray-500 text-center pb-6"><span class="text-3xl">€19</span>
                                                /mo</h2>

                                            Stripe offers everything needed to run an online business at
                                            scale. Get in touch for details.
                                        </div>
                                        <div class="flex pl-12 justify-start sm:justify-start mt-3">
                                            <ul>
                                                <li class="flex items-center">
                                                    <div class=" rounded-full p-2 fill-current text-green-700">
                                                        <svg
                                                            class="w-6 h-6 align-middle"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="green"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span class="text-gray-700 text-sm ml-3">2GB / 1 CPU, 50GB SSD Disk,   2TB Transfer</span>
                                                </li>
                                                <li class="flex items-center">
                                                    <div class=" rounded-full p-2 fill-current text-green-700">
                                                        <svg
                                                            class="w-6 h-6 align-middle"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="green"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span
                                                        class="text-gray-700 text-sm ml-3">2500 transaction Emails</span>
                                                </li>
                                                <li class="flex items-center">
                                                    <div class=" rounded-full p-2 fill-current text-green-700">
                                                        <svg
                                                            class="w-6 h-6 align-middle"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="green"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span class="text-gray-700 text-sm ml-3">SSL</span>
                                                </li>
                                                <li class="flex items-center">
                                                    <div class=" rounded-full p-2 fill-current text-green-700">
                                                        <svg
                                                            class="w-6 h-6 align-middle"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="green"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span class="text-gray-700 text-sm ml-3">Daily Backup</span>
                                                </li>
                                                <li class="flex items-center">
                                                    <div class=" rounded-full p-2 fill-current text-green-700">
                                                        <svg
                                                            class="w-6 h-6 align-middle"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="green"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span class="text-gray-700 text-sm ml-3">Analytics</span>
                                                </li>
                                                <li class="flex items-center">
                                                    <div class=" rounded-full p-2 fill-current text-green-700">
                                                        <svg
                                                            class="w-6 h-6 align-middle"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="green"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span class="text-gray-700 text-sm ml-3">Domain</span>
                                                </li>
                                                <li class="flex items-center">
                                                    <div class=" rounded-full p-2 fill-current text-green-700">
                                                        <svg
                                                            class="w-6 h-6 align-middle"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="green"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span class="text-gray-700 text-sm ml-3">GSuite</span>
                                                </li>
                                                <li class="flex items-center">
                                                    <div class=" rounded-full p-2 fill-current">
                                                        <svg
                                                            class="w-6 h-6 align-middle"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="gray"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span class="text-80 text-sm ml-3 line-through">Push Notifications</span>
                                                </li>
                                                <li class="flex items-center">
                                                    <div class=" rounded-full p-2 fill-current">
                                                        <svg
                                                            class="w-6 h-6 align-middle"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="gray"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span class="text-80 text-sm ml-3 line-through">SMS</span>
                                                </li>
                                                <li class="flex items-center">
                                                    <div class=" rounded-full p-2 fill-current">
                                                        <svg
                                                            class="w-6 h-6 align-middle"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="gray"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span class="text-80 text-sm ml-3 line-through">Bot Server</span>
                                                </li>
                                            </ul>

                                        </div>

                                        <div class="block flex items-center p-8  uppercase">
                                            <button
                                                class="mt-3 text-lg font-semibold bg-black w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:bg-gray-700" @click.prevent="quickProject('growth')">
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
                                                    Business
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
                                                                stroke="green"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-sm ml-3">3GB / 1 CPU, 60GB SSD Disk, 3TB Transfer</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="green"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span
                                                            class="text-gray-700 text-sm ml-3">5000 transaction Emails</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="green"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-sm ml-3">SSL</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="green"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-sm ml-3">Daily Backup</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="green"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span
                                                            class="text-gray-700 text-sm ml-3">Push Notifications</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="green"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-sm ml-3">Analytics</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="green"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-sm ml-3">SMS</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="green"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-sm ml-3">Bot Server</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="green"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-sm ml-3">Domain</span>
                                                    </li>
                                                    <li class="flex items-center">
                                                        <div class=" rounded-full p-2 fill-current text-green-700">
                                                            <svg
                                                                class="w-6 h-6 align-middle"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="green"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span class="text-gray-700 text-sm ml-3">GSuite</span>
                                                    </li>
                                                </ul>

                                            </div>

                                            <div class="block flex items-center p-8  uppercase">
                                                <button
                                                    class="mt-3 text-lg font-semibold bg-black w-full text-white rounded-lg
                                                    px-6 py-3 block shadow-xl hover:bg-gray-700"
                                                    @click.prevent="quickProject('business')">
                                                    Select
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section v-else>


                        <div class="card">
                            <div class="border-b border-40">
                                <div class="w-full flex border-b border-40">
                                    <div class="w-1/5 px-8 py-6 my-auto">
                                        <label class="inline-block text-80 pt-2 leading-tight">
                                            Email Subscriptions
                                        </label>
                                    </div>
                                    <div class="py-6 px-8 w-4/5">

                                        <div>
                                            <custom-slider :values="emailSliderValues" raising v-model="emailSlider"/>
                                            {{ emailSlider }}
                                        </div>
                                        <!---->
                                        <div class="help-text help-text mt-2"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="border-b border-40">
                                <div class="w-full flex border-b border-40 items-center">
                                    <div class="w-1/5 px-8 py-6 my-auto ">
                                        <label class="inline-block text-80 pt-2 leading-tight">
                                            SMS Subscriptions
                                        </label>
                                    </div>
                                    <div class="py-6 px-8 w-4/5">

                                        <div>
                                            Pay As You Go
                                        </div>
                                        <!---->
                                        <div class="help-text help-text mt-2"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="border-b border-40 ">
                                <div class="w-full flex border-b border-40 items-center">
                                    <div class="w-1/5 px-8 py-6 my-auto">
                                        <label class="inline-block text-80 pt-2 leading-tight">
                                            Hosting Droplets
                                        </label>
                                    </div>
                                    <div class="py-6 px-8 w-4/5">
                                        <div class="flex-col w-full">

                                            <div class="mr-3 mb-3" v-for="droplet in droplets" :key="droplet.id">

                                                <input :id="'droplet'+droplet.id" :name="'droplet'+droplet.id"
                                                       type="radio"
                                                       :value="droplet.id" class="hidden" v-model="selected_droplet"/>
                                                <label :for="'droplet'+droplet.id"
                                                       class="flex items-center cursor-pointer">
                                                    <span
                                                        class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                                                    {{droplet.description}}</label>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="border-b border-40 ">
                                <div class="w-full flex border-b border-40 items-center">
                                    <div class="w-1/5 px-8 py-6 my-auto">
                                        <label class="inline-block text-80 pt-2 leading-tight">
                                            SSL
                                        </label>
                                    </div>
                                    <div class="py-6 px-8 w-4/5">
                                        <div class="flex-col w-full">

                                            <div class="mr-3 mb-3" v-for="item in sslPacks" :key="item.id">

                                                <input :id="'ssl'+item.id" :name="'ssl'+item.id" type="radio"
                                                       :value="item.id" class="hidden" v-model="selected_ssl"/>
                                                <label :for="'ssl'+item.id" class="flex items-center cursor-pointer">
                                                    <span
                                                        class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                                                    {{item.description}}</label>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="border-b border-40 ">
                                <div class="w-full flex border-b border-40 items-center">
                                    <div class="w-1/5 px-8 py-6 my-auto">
                                        <label class="inline-block text-80 pt-2 leading-tight">
                                            BackUp Packs
                                        </label>
                                    </div>
                                    <div class="py-6 px-8 w-4/5">
                                        <div class="flex-col w-full">

                                            <div class="mr-3 mb-3" v-for="item in backupPacks" :key="item.id">

                                                <input :id="'backup'+item.id" :name="'backup'+item.id" type="radio"
                                                       :value="item.id" class="hidden" v-model="selected_backup"/>
                                                <label :for="'backup'+item.id" class="flex items-center cursor-pointer">
                                                    <span
                                                        class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                                                    {{item.description}}</label>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="border-b border-40 ">
                                <div class="w-full flex border-b border-40 items-center">
                                    <div class="w-1/5 px-8 py-6 my-auto">
                                        <label class="inline-block text-80 pt-2 leading-tight">
                                            Analytics Packs
                                        </label>
                                    </div>
                                    <div class="py-6 px-8 w-4/5">
                                        <div class="flex-col w-full">

                                            <div class="mr-3 mb-3" v-for="item in analyticsPacks" :key="item.id">

                                                <input :id="'analytics'+item.id" :name="'analytics'+item.id"
                                                       type="radio"
                                                       :value="item.id" class="hidden" v-model="selected_analytics"/>
                                                <label :for="'analytics'+item.id"
                                                       class="flex items-center cursor-pointer">
                                                    <span
                                                        class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                                                    {{item.description}}</label>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>


                </tab-content>

                <template slot="footer" slot-scope="props" v-if="props.activeTabIndex===1">
                    <div class=wizard-footer-left>
                       <span role="button" tabindex="0">
                           <button tabindex="-1" type="button" class="wizard-btn"
                                   style="background-color: rgb(155, 89, 182); border-color: rgb(155, 89, 182); color: white;"
                                   @click.prevent="props.prevTab">Back</button>
                       </span>
                    </div>
                </template>

            </form-wizard>

        </card>
    </div>
</template>
<style scoped src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

    /* The container */
    .cont {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        /*font-size: small;*/
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    .cont input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #eee;
    }

    /* On mouse-over, add a grey background color */
    .cont:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .cont input:checked ~ .checkmark {
        background-color: #2196F3;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .cont input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .cont .checkmark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }


</style>
<script>

    import CustomSlider from "vue-custom-range-slider";
    // import the styling, css or scss
    // import "vue-custom-range-slider/dist/vue-custom-range-slider.css";

    import Multiselect from 'vue-multiselect'

    // import 'vue-form-wizard/dist/vue-form-wizard.min.css';
    import {FormWizard, TabContent} from 'vue-form-wizard';

    export default {
        components: {
            FormWizard,
            TabContent,
            Multiselect,
            CustomSlider
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
                mode: 'quick',
                emailSlider: "a",
                emailSliderValues: [
                    {
                        label: "",
                        value: ""
                    }],
                smsSlider: "a",
                smsSliderValues: [
                    {
                        label: "",
                        value: ""
                    }],
                droplets: [
                    {name: '', id: '', description: ''}
                ],
                sslPacks: [
                    {name: '', id: '', description: ''}
                ],
                backupPacks: [
                    {name: '', id: '', description: ''}
                ],
                analyticsPacks: [
                    {name: '', id: '', description: ''}
                ],
                selected_droplet: '',
                selected_ssl: '',
                selected_backup: '',
                selected_analytics: '',
            }
        },
        computed: {
            isQuick: function () {
                return this.mode === 'quick';
            }
        },
        mounted() {
            this.fetchEmailSubscriptions();
            this.fetchData();

        },
        methods: {

            quickProject(plan){
                var data={
                    plan:plan,
                    project:this.project
                };
                Nova.request().post('/nova-vendor/wizard/create-quick-project', data)
                    .then(d => {
                        this.$toasted.show('Congrats Your Project has been created!', {type: 'success'});
                        setTimeout(function () {
                            window.location.href="/dashboard";
                        },1000)
                    }).catch(e => {
                    this.$toasted.show('Something went wrong ,Try Again later', {type: 'error'})
                });
            },

            fetchData() {
                Nova.request().get('/nova-vendor/wizard/fetch')
                    .then(data => {
                        var d = data.data;
                        this.droplets = d.Hosting;
                        this.sslPacks = d.SSL;
                        this.backupPacks = d.BackUp;
                        this.analyticsPacks = d.Analytics;
                        this.smsSliderValues = d.SMS;
                    }).catch(d => {

                    console.log("error ");

                });
            },

            fetchEmailSubscriptions() {
                Nova.request().get('/nova-vendor/wizard/email')
                    .then(data => {
                        this.emailSliderValues = data.data;
                        this.emailSlider = data.data[0].value;
                        console.log(data.data);
                    }).catch(d => {

                    console.log("error ");

                });
            },
            handleProjectMode(btn) {
                this.mode = btn;
                this.$refs['form-wizard'].changeTab(1, 2);
            },

            onComplete: function () {
                if(!this.validateProducts()){
                    console.log("false");
                    return false;
                }
                var data = {};
                console.log(this.emailSlider);
                data.project = this.project;
                data.products = {};
                data.products[0] = this.selected_analytics;
                data.products[1] = this.selected_backup;
                data.products[2] = this.selected_droplet;
                data.products[3] = this.selected_ssl;
                let i = 0;
                for (; i < this.emailSliderValues; i++) {
                    if (this.emailSliderValues[i].value === this.emailSlider) {
                        break;
                    }
                }
                data.products[4] = this.emailSliderValues[i].id;
                console.log(data.products);
                Nova.request().post('/nova-vendor/wizard/create-project', data)
                    .then(d => {
                        this.$toasted.show('Congrats Your Project has been created!', {type: 'success'})
                        setTimeout(function () {
                            window.location.href="/dashboard";
                        },1000)
                    }).catch(e => {
                    this.$toasted.show('Something went wrong ,Try Again later', {type: 'error'})

                });


            }
            ,
            beforeTabSwitch: function () {

                return this.validateProject();
                ;
            },
            validateProject() {
                if (this.project.name === '') {
                    this.$toasted.show('Project Name is required', {type: 'error'})
                    return false;
                }
                if (this.project.description === '') {
                    this.$toasted.show('Project Description is required', {type: 'error'})
                    return false;
                }
                if (this.project.domain === '') {
                    this.$toasted.show('Project Domain is required', {type: 'error'})
                    return false;
                }
                if (this.project.type === '') {
                    this.$toasted.show('Project Type is required', {type: 'error'})
                    return false;
                }
                return true;

            },
            validateProducts() {
                if (this.selected_analytics == '') {
                    this.$toasted.show('Please Select an Analytics Pack to proceed', {type: 'error'})
                    return false;
                }
                if (this.selected_backup == '') {
                    this.$toasted.show('Please Select a Backup Pack to proceed', {type: 'error'})
                    return false;
                }
                if (this.selected_ssl == '') {
                    this.$toasted.show('Please Select a SSL Pack to proceed', {type: 'error'})
                    return false;
                }
                if (this.selected_droplet == '') {
                    this.$toasted.show('Please Select a Droplet Pack to proceed', {type: 'error'})
                    return false;
                }
                return true;

            }
        }
    }
</script>


